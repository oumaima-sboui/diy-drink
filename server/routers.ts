const COOKIE_NAME = 'diy-drink-session';
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const appRouter = router({
  system: systemRouter,

  // ========================================
  // AUTH - Authentification
  // RAISON: Gérer connexion, inscription, déconnexion
  // ========================================
  auth: router({
    /**
     * RAISON: Récupérer l'utilisateur connecté
     * Utilisé pour afficher le profil, vérifier le rôle
     */
    me: publicProcedure.query(opts => opts.ctx.user),

    /**
     * RAISON: Inscription avec email/password
     * Pour créer un nouveau compte client, travailleur ou admin
     */
    register: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
          email: z.string().email("Email invalide"),
          password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
          phone: z.string().optional(),
          role: z.enum(["admin", "worker", "client"]).default("client"),
        })
      )
      .mutation(async ({ input }) => {
        // Vérifier si l'email existe déjà
        const existing = await db.getUserByEmail(input.email);
        if (existing) {
          throw new Error("Cet email est déjà utilisé");
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // Créer l'utilisateur
        const user = await db.createUser({
          name: input.name,
          email: input.email,
          password: hashedPassword,
          phone: input.phone,
          role: input.role,
          loginMethod: "email",
          openId: `email_${input.email}`, // ID unique pour compatibilité
        });

        return {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      }),

/**
     * RAISON: Connexion avec email/password
     * Crée une vraie session avec cookie JWT
     */
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Récupérer l'utilisateur
        const user = await db.getUserByEmail(input.email);
        if (!user || !user.password) {
          throw new Error("Email ou mot de passe incorrect");
        }

        // Vérifier le mot de passe
        const isValid = await bcrypt.compare(input.password, user.password);
        if (!isValid) {
          throw new Error("Email ou mot de passe incorrect");
        }

// Créer un JWT simple
        const { ENV } = await import("./_core/env");
        
        const sessionToken = jwt.sign(
          { 
            openId: user.openId,
            email: user.email,
            role: user.role 
          },
          ENV.jwtSecret || "votre-secret-temporaire-a-changer",
          { expiresIn: "365d" }
        );
 
        // Créer le cookie de session
        const cookieOptions = getSessionCookieOptions(ctx.req);
// LOGS DE DEBUG
        console.log("=== LOGIN DEBUG ===");
        console.log("Session token créé:", sessionToken.substring(0, 20) + "...");
        console.log("COOKIE_NAME:", COOKIE_NAME);
        console.log("cookieOptions:", cookieOptions);
        console.log("===================");
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        // Mettre à jour la date de dernière connexion
        await db.updateUser(user.id!, { lastSignedIn: new Date() });

        return {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      }),
    /**
     * RAISON: Déconnexion
     * Supprimer le cookie de session
     */
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    }),
  }),

  // ========================================
  // USERS - Gestion des utilisateurs
  // RAISON: L'admin peut gérer tous les utilisateurs
  // ========================================
  users: router({
    /**
     * RAISON: Lister tous les utilisateurs (admin uniquement)
     */
    list: adminProcedure.query(async () => {
      return await db.getAllUsers();
    }),

    /**
     * RAISON: Mettre à jour le rôle d'un utilisateur
     */
    updateRole: adminProcedure
      .input(
        z.object({
          userId: z.number(),
          role: z.enum(["admin", "worker", "client"]),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateUser(input.userId, { role: input.role });
        return { success: true };
      }),

    /**
     * RAISON: Activer/désactiver un utilisateur
     */
    toggleActive: adminProcedure
      .input(
        z.object({
          userId: z.number(),
          isActive: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateUser(input.userId, { isActive: input.isActive });
        return { success: true };
      }),
  }),

  // ========================================
  // CATEGORIES - Gestion des catégories
  // RAISON: Organiser le menu par type de boisson
  // ========================================
  categories: router({
    /**
     * RAISON: Lister les catégories actives (public)
     * Pour afficher le menu aux clients
     */
    list: publicProcedure.query(async () => {
      return await db.getActiveCategories();
    }),

    /**
     * RAISON: Lister toutes les catégories (admin)
     */
    listAll: adminProcedure.query(async () => {
      return await db.getAllCategories();
    }),

    /**
     * RAISON: Créer une catégorie
     */
    create: adminProcedure
      .input(
        z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          displayOrder: z.number().default(0),
        })
      )
      .mutation(async ({ input }) => {
        const category = await db.createCategory(input);
        return { success: true, category };
      }),

    /**
     * RAISON: Mettre à jour une catégorie
     */
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          displayOrder: z.number().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        await db.updateCategory(id, updates);
        return { success: true };
      }),
  }),

  // ========================================
  // PRODUCTS - Gestion des boissons
  // RAISON: Gérer le menu complet
  // ========================================
  products: router({
    /**
     * RAISON: Lister les produits disponibles (public)
     */
    list: publicProcedure.query(async () => {
      return await db.getAvailableProducts();
    }),

    /**
     * RAISON: Lister tous les produits (admin)
     */
    listAll: adminProcedure.query(async () => {
      return await db.getAllProducts();
    }),

    /**
     * RAISON: Récupérer un produit par ID
     */
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductById(input.id);
      }),

    /**
     * RAISON: Créer un produit
     */
    create: adminProcedure
      .input(
        z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          price: z.number().positive(),
          categoryId: z.number(),
          imageUrl: z.string().optional(),
          preparationTime: z.number().default(5),
          isAvailable: z.boolean().default(true),
        })
      )
      .mutation(async ({ input }) => {
        const id = await db.createProduct(input);
        return { success: true, id };
      }),

    /**
     * RAISON: Mettre à jour un produit
     */
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          price: z.number().optional(),
          categoryId: z.number().optional(),
          imageUrl: z.string().optional(),
          preparationTime: z.number().optional(),
          isAvailable: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        await db.updateProduct(id, updates);
        return { success: true };
      }),

    /**
     * RAISON: Supprimer un produit
     */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProduct(input.id);
        return { success: true };
      }),

    /**
     * RAISON: Activer/désactiver un produit
     */
    toggleAvailability: adminProcedure
      .input(z.object({ id: z.number(), isAvailable: z.boolean() }))
      .mutation(async ({ input }) => {
        await db.toggleProductAvailability(input.id, input.isAvailable);
        return { success: true };
      }),
  }),

  // ========================================
  // INGREDIENTS - Gestion du stock
  // RAISON: Suivre les ingrédients disponibles
  // ========================================
  ingredients: router({
    /**
     * RAISON: Lister tous les ingrédients
     */
    list: adminProcedure.query(async () => {
      return await db.getAllIngredients();
    }),

    /**
     * RAISON: Alertes de stock bas
     */
    lowStock: adminProcedure.query(async () => {
      return await db.getLowStockIngredients();
    }),

    /**
     * RAISON: Créer un ingrédient
     */
    create: adminProcedure
      .input(
        z.object({
          name: z.string().min(1),
          unit: z.enum(["ml", "g", "piece", "kg", "l"]),
          stockQuantity: z.number().default(0),
          minStockLevel: z.number().default(10),
          costPerUnit: z.number().positive(),
          supplier: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const ingredient = await db.createIngredient(input);
        return { success: true, ingredient };
      }),

    /**
     * RAISON: Mettre à jour le stock
     */
    updateStock: adminProcedure
      .input(
        z.object({
          id: z.number(),
          quantity: z.number(),
          reason: z.enum(["purchase", "usage", "waste", "adjustment", "return"]),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Récupérer l'ingrédient actuel
        const ingredients = await db.getAllIngredients();
        const ingredient = ingredients.find(i => i.id === input.id);
        if (!ingredient) {
          throw new Error("Ingrédient introuvable");
        }

        const previousQuantity = ingredient.stockQuantity;
        const changeAmount = input.quantity - previousQuantity;

        // Mettre à jour le stock
        await db.updateIngredientStock(input.id, input.quantity);

        // Enregistrer dans l'historique
        await db.createInventoryLog({
          ingredientId: input.id,
          changeAmount,
          previousQuantity,
          newQuantity: input.quantity,
          reason: input.reason,
          userId: ctx.user?.id,
          notes: input.notes,
        });

        return { success: true };
      }),
  }),

  // ========================================
  // RECIPES - Composition des boissons
  // RAISON: Savoir comment préparer chaque boisson
  // ========================================
  recipes: router({
    /**
     * RAISON: Récupérer la recette d'un produit
     */
    getByProductId: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input }) => {
        return await db.getRecipeByProductId(input.productId);
      }),

    /**
     * RAISON: Créer/Ajouter un ingrédient à une recette
     */
    create: adminProcedure
      .input(
        z.object({
          productId: z.number(),
          ingredientId: z.number(),
          quantity: z.number().positive(),
        })
      )
      .mutation(async ({ input }) => {
        const recipe = await db.createRecipe(input);
        return { success: true, recipe };
      }),
  }),

  // ========================================
  // ORDERS - Gestion des commandes
  // RAISON: Traiter les commandes des clients
  // ========================================
 
orders: router({
      /**
       * Créer une commande
       */
      create: publicProcedure
        .input(
          z.object({
            clientName: z.string().optional(),
            clientPhone: z.string().optional(),
            items: z.array(
              z.object({
                 productId: z.number().optional(), // Optionnel car composer n'a pas de productId
            productName: z.string(),
            quantity: z.number().positive(),
            price: z.number(), // Prix TOTAL de l'item (base + add-ons)
            size: z.string().optional(),
            description: z.string().optional(),
            ingredients: z.array(z.any()).optional()
              })
            ),
            totalAmount: z.number(),
            notes: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
    // Générer un numéro de commande incrémental
          const allOrders = await db.getOrders();
         const maxId = allOrders.length > 0 
  ? Math.max(...allOrders.map(o => o.id || 0))
  : 0;
const orderNumber = `CMD-${maxId + 1}`;
          // Calculer le montant total
          let totalAmount = 0;
          const orderItemsData = [];
          
          for (const item of input.items) {
            const product = await db.getProductById(item.productId);
            if (!product) {
              throw new Error(`Produit ${item.productId} introuvable`);
            }
            const subtotal = product.price * item.quantity;
            totalAmount += subtotal;
            orderItemsData.push({
              productId: item.productId,
              productName: product.name,
              quantity: item.quantity,
              unitPrice: product.price,
              subtotal,
            });
          }

          // Créer la commande
          const order = await db.createOrder({
            orderNumber,
            clientName: input.clientName || "Client anonyme",
            clientPhone: input.clientPhone || "",
          totalAmount: input.totalAmount,
            status: "paid", // Statut initial : payée
            notes: input.notes,
          });

          // Ajouter les items de la commande
          for (const itemData of orderItemsData) {
            await db.createOrderItem({
              orderId: order.id!,
              ...itemData,
            });
          }

          console.log("✅ Commande créée:", orderNumber);
          return { order, items: orderItemsData };
        }),

      /**
       * Récupérer toutes les commandes
       */
      list: publicProcedure.query(async () => {
        try {
          const orders = await db.getOrders();
          console.log("📦 Orders récupérées:", orders?.length || 0);
          return orders || [];
        } catch (error) {
          console.error("❌ Erreur récupération commandes:", error);
          return [];
        }
      }),

      /**
       * Récupérer une commande avec ses items
       */
      getById: publicProcedure
        .input(z.object({ orderId: z.number() }))
        .query(async ({ input }) => {
          const order = await db.getOrderById(input.orderId);
          if (!order) {
            throw new Error("Commande introuvable");
          }
          const items = await db.getOrderItems(input.orderId);
          return { order, items };
        }),

      /**
       * Mettre à jour le statut d'une commande
       */
      updateStatus: publicProcedure
        .input(
          z.object({
            orderId: z.number(),
            status: z.enum([
              "pending_payment",
              "paid",
              "preparing",
              "ready",
              "completed",
              "cancelled",
            ]),
          })
        )
        .mutation(async ({ input }) => {
          await db.updateOrderStatus(input.orderId, input.status);
          const order = await db.getOrderById(input.orderId);
          console.log("✅ Statut commande mis à jour:", input.orderId, "->", input.status);
          return { order };
        }),
    }),
  // ========================================
  // PAYMENTS - Gestion des paiements
  // RAISON: Traiter les paiements avant préparation
  // ========================================
  payments: router({
    /**
     * RAISON: Créer un paiement pour une commande
     */
    create: publicProcedure
      .input(
        z.object({
          orderId: z.number(),
          amount: z.number().positive(),
          paymentMethod: z.enum(["cash", "card", "mobile", "stripe", "paypal"]),
        })
      )
      .mutation(async ({ input }) => {
        // Créer le paiement
        const payment = await db.createPayment({
          orderId: input.orderId,
          amount: input.amount,
          paymentMethod: input.paymentMethod,
          status: "pending",
        });

        // Si paiement en espèces, marquer comme complété directement
        if (input.paymentMethod === "cash") {
          await db.updatePaymentStatus(payment.id!, "completed");
          await db.updateOrderStatus(input.orderId, "paid");
        }

        return { success: true, payment };
      }),

    /**
     * RAISON: Vérifier le statut d'un paiement
     */
    getByOrderId: publicProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        return await db.getPaymentByOrderId(input.orderId);
      }),

    /**
     * RAISON: Confirmer un paiement (pour carte, mobile, etc.)
     */
    confirm: adminProcedure
      .input(
        z.object({
          paymentId: z.number(),
          orderId: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updatePaymentStatus(input.paymentId, "completed");
        await db.updateOrderStatus(input.orderId, "paid");
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;