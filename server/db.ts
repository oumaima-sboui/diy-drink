import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import {
  InsertProduct,
  InsertUser,
  InsertCategory,
  InsertIngredient,
  InsertRecipe,
  InsertOrder,
  InsertOrderItem,
  InsertPayment,
  InsertInventoryLog,
  products,
  users,
  categories,
  ingredients,
  recipes,
  orders,
  orderItems,
  payments,
  inventoryLogs,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

/**
 * RAISON : Créer une connexion unique à SQLite
 * On ne crée qu'une seule instance pour éviter les connexions multiples
 */
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = createClient({
        url: process.env.DATABASE_URL,
      });
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ========================================
// USERS - Gestion des utilisateurs
// RAISON : Permettre inscription, connexion, gestion des rôles
// ========================================

/**
 * RAISON : Créer ou mettre à jour un utilisateur OAuth
 * Utilisé lors de la connexion via Google, GitHub, etc.
 */
export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const existing = user.openId ? await getUserByOpenId(user.openId) : null;

    if (existing) {
      // Mise à jour de l'utilisateur existant
      await db
        .update(users)
        .set({
          ...user,
          updatedAt: sql`(unixepoch())`,
        })
        .where(eq(users.openId, user.openId!));
    } else {
      // Création d'un nouvel utilisateur
      await db.insert(users).values({
        ...user,
        role: user.role || (user.openId === ENV.ownerOpenId ? "admin" : "client"),
      });
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

/**
 * RAISON : Récupérer un utilisateur par son OpenID (pour OAuth)
 */
export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * RAISON : Récupérer un utilisateur par email
 * Utilisé pour la connexion classique email/password
 */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * RAISON : Créer un nouvel utilisateur (inscription classique)
 */
export async function createUser(user: InsertUser) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(users).values(user).returning();
  return result[0];
}

/**
 * RAISON : Récupérer tous les utilisateurs
 * Utilisé par l'admin pour gérer les utilisateurs
 */
export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(users).orderBy(desc(users.createdAt));
}

/**
 * RAISON : Mettre à jour un utilisateur
 * Pour modifier le rôle, les infos, etc.
 */
export async function updateUser(id: number, user: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(users).set({ ...user, updatedAt: sql`(unixepoch())` }).where(eq(users.id, id));
}

// ========================================
// CATEGORIES - Gestion des catégories de boissons
// RAISON : Organiser le menu par type (Jus, Smoothies, Cafés...)
// ========================================

/**
 * RAISON : Récupérer toutes les catégories actives
 * Pour afficher le menu aux clients
 */
export async function getActiveCategories() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(categories.displayOrder);
}

/**
 * RAISON : Récupérer toutes les catégories (admin)
 */
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(categories).orderBy(categories.displayOrder);
}

/**
 * RAISON : Créer une nouvelle catégorie
 */
export async function createCategory(category: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(categories).values(category).returning();
  return result[0];
}

/**
 * RAISON : Mettre à jour une catégorie
 */
export async function updateCategory(id: number, category: Partial<InsertCategory>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(categories).set(category).where(eq(categories.id, id));
}

// ========================================
// PRODUCTS - Gestion des boissons du menu
// RAISON : Gérer le catalogue complet des boissons
// ========================================

/**
 * RAISON : Récupérer tous les produits (pour l'admin)
 */
export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(products).orderBy(products.displayOrder);
}

/**
 * RAISON : Récupérer les produits disponibles
 * Pour afficher le menu public aux clients
 */
export async function getAvailableProducts() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(products)
    .where(eq(products.isAvailable, true))
    .orderBy(products.displayOrder);
}

/**
 * RAISON : Récupérer un produit par ID
 * Pour afficher les détails d'une boisson
 */
export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * RAISON : Créer un nouveau produit
 */
export async function createProduct(product: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(products).values(product).returning();
  return result[0].id;
}

/**
 * RAISON : Mettre à jour un produit
 */
export async function updateProduct(id: number, product: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(products).set({ ...product, updatedAt: sql`(unixepoch())` }).where(eq(products.id, id));
}

/**
 * RAISON : Supprimer un produit
 */
export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(products).where(eq(products.id, id));
}

/**
 * RAISON : Activer/désactiver un produit
 * Pour marquer une boisson comme indisponible temporairement
 */
export async function toggleProductAvailability(id: number, isAvailable: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(products).set({ isAvailable, updatedAt: sql`(unixepoch())` }).where(eq(products.id, id));
}

// ========================================
// INGREDIENTS - Gestion des ingrédients
// RAISON : Suivre le stock pour préparer les boissons
// ========================================

/**
 * RAISON : Récupérer tous les ingrédients
 */
export async function getAllIngredients() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(ingredients).orderBy(ingredients.name);
}

/**
 * RAISON : Récupérer les ingrédients en stock bas
 * Pour alerter quand il faut commander
 */
export async function getLowStockIngredients() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(ingredients)
    .where(sql`${ingredients.stockQuantity} <= ${ingredients.minStockLevel}`);
}

/**
 * RAISON : Créer un ingrédient
 */
export async function createIngredient(ingredient: InsertIngredient) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(ingredients).values(ingredient).returning();
  return result[0];
}

/**
 * RAISON : Mettre à jour le stock d'un ingrédient
 * Appelé après chaque commande ou réapprovisionnement
 */
export async function updateIngredientStock(id: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(ingredients)
    .set({ stockQuantity: quantity, updatedAt: sql`(unixepoch())` })
    .where(eq(ingredients.id, id));
}

// ========================================
// RECIPES - Composition des boissons
// RAISON : Savoir quels ingrédients utiliser pour chaque boisson
// ========================================

/**
 * RAISON : Récupérer la recette d'un produit
 * Pour savoir comment préparer la boisson
 */
export async function getRecipeByProductId(productId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(recipes).where(eq(recipes.productId, productId));
}

/**
 * RAISON : Créer une recette (lien produit-ingrédient)
 */
export async function createRecipe(recipe: InsertRecipe) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(recipes).values(recipe).returning();
  return result[0];
}

// ========================================
// ORDERS - Gestion des commandes
// RAISON : Traiter les commandes des clients
// ========================================

/**
 * RAISON : Créer une nouvelle commande
 */
export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(orders).values(order).returning();
  return result[0];
}

/**
 * RAISON : Récupérer toutes les commandes
 * Pour l'admin et les travailleurs
 */
export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orders).orderBy(desc(orders.id));
}

/**
 * RAISON : Récupérer les commandes par statut
 * Pour afficher les commandes en attente, en préparation, etc.
 */
export async function getOrdersByStatus(status: string) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orders).where(eq(orders.status, status)).orderBy(desc(orders.createdAt));
}

/**
 * RAISON : Récupérer les commandes d'un client
 */
export async function getOrdersByClient(clientId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orders).where(eq(orders.clientId, clientId)).orderBy(desc(orders.createdAt));
}

/**
 * RAISON : Mettre à jour le statut d'une commande
 * Pour passer de "en attente" à "en préparation" à "prête"
 */
export async function updateOrderStatus(orderId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(orders).set({ status, updatedAt: sql`(unixepoch())` }).where(eq(orders.id, orderId));
}
/**
 * RAISON : Récupérer toutes les commandes (alias pour getAllOrders)
 * Utilisé par le frontend Workers
 */
export async function getOrders() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orders).orderBy(desc(orders.id));
}

/**
 * RAISON : Récupérer une commande par ID
 */
export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
// ========================================
// ORDER_ITEMS - Articles des commandes
// RAISON : Détails de ce qu'il y a dans chaque commande
// ========================================

/**
 * RAISON : Ajouter un article à une commande
 */
export async function createOrderItem(item: InsertOrderItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(orderItems).values(item).returning();
  return result[0];
}

/**
 * RAISON : Récupérer les articles d'une commande
 * Pour voir ce qui a été commandé
 */
export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

// ========================================
// PAYMENTS - Gestion des paiements
// RAISON : Suivre les paiements (espèces, carte, mobile...)
// ========================================

/**
 * RAISON : Créer un paiement
 */
export async function createPayment(payment: InsertPayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(payments).values(payment).returning();
  return result[0];
}

/**
 * RAISON : Récupérer le paiement d'une commande
 */
export async function getPaymentByOrderId(orderId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(payments).where(eq(payments.orderId, orderId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * RAISON : Mettre à jour le statut d'un paiement
 */
export async function updatePaymentStatus(paymentId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(payments).set({ status, updatedAt: sql`(unixepoch())` }).where(eq(payments.id, paymentId));
}

// ========================================
// INVENTORY_LOGS - Historique du stock
// RAISON : Tracer tous les mouvements de stock
// ========================================

/**
 * RAISON : Enregistrer un mouvement de stock
 * Pour savoir qui a ajouté/retiré du stock et pourquoi
 */
export async function createInventoryLog(log: InsertInventoryLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(inventoryLogs).values(log).returning();
  return result[0];
}

/**
 * RAISON : Récupérer l'historique d'un ingrédient
 */
export async function getInventoryLogsByIngredient(ingredientId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(inventoryLogs)
    .where(eq(inventoryLogs.ingredientId, ingredientId))
    .orderBy(desc(inventoryLogs.createdAt));
}