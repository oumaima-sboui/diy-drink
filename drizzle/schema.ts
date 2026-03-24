import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

/**
 * ========================================
 * USERS - Gestion des utilisateurs
 * ========================================
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  openId: text("openId").unique(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password"), // Hash du mot de passe
  phone: text("phone"),
  loginMethod: text("loginMethod", { enum: ["oauth", "email"] }).default("email").notNull(),
  role: text("role", { enum: ["admin", "worker", "client"] }).default("client").notNull(),
  isActive: integer("isActive", { mode: "boolean" }).default(true).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * ========================================
 * CATEGORIES - Catégories de boissons
 * ========================================
 */
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  displayOrder: integer("displayOrder").default(0),
  isActive: integer("isActive", { mode: "boolean" }).default(true).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * ========================================
 * PRODUCTS - Boissons du menu
 * ========================================
 */
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  categoryId: integer("categoryId").references(() => categories.id).notNull(),
  imageUrl: text("imageUrl"),
  preparationTime: integer("preparationTime").default(5), // en minutes
  isAvailable: integer("isAvailable", { mode: "boolean" }).default(true).notNull(),
  isFeatured: integer("isFeatured", { mode: "boolean" }).default(false),
  displayOrder: integer("displayOrder").default(0),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * ========================================
 * INGREDIENTS - Ingrédients
 * ========================================
 */
export const ingredients = sqliteTable("ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  unit: text("unit", { enum: ["ml", "g", "piece", "kg", "l"] }).notNull(),
  stockQuantity: real("stockQuantity").default(0).notNull(),
  minStockLevel: real("minStockLevel").default(10).notNull(),
  maxStockLevel: real("maxStockLevel"),
  costPerUnit: real("costPerUnit").notNull(),
  supplier: text("supplier"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Ingredient = typeof ingredients.$inferSelect;
export type InsertIngredient = typeof ingredients.$inferInsert;

/**
 * ========================================
 * RECIPES - Composition des boissons
 * ========================================
 */
export const recipes = sqliteTable("recipes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("productId").references(() => products.id).notNull(),
  ingredientId: integer("ingredientId").references(() => ingredients.id).notNull(),
  quantity: real("quantity").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = typeof recipes.$inferInsert;

/**
 * ========================================
 * ORDERS - Commandes
 * ========================================
 */
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderNumber: text("orderNumber").notNull().unique(),
  clientId: integer("clientId").references(() => users.id),
  clientName: text("clientName"),
  clientPhone: text("clientPhone"),
  status: text("status", { 
    enum: ["pending_payment", "paid", "preparing", "ready", "completed", "cancelled"] 
  }).default("pending_payment").notNull(),
  totalAmount: real("totalAmount").notNull(),
  notes: text("notes"),
  assignedTo: integer("assignedTo").references(() => users.id),
  preparationStartedAt: integer("preparationStartedAt", { mode: "timestamp" }),
  readyAt: integer("readyAt", { mode: "timestamp" }),
  completedAt: integer("completedAt", { mode: "timestamp" }),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * ========================================
 * ORDER_ITEMS - Articles des commandes
 * ========================================
 */
export const orderItems = sqliteTable("orderItems", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("orderId").references(() => orders.id).notNull(),
  productId: integer("productId").references(() => products.id).notNull(),
  productName: text("productName").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: real("unitPrice").notNull(),
  subtotal: real("subtotal").notNull(),
  specialInstructions: text("specialInstructions"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * ========================================
 * PAYMENTS - Paiements
 * ========================================
 */
export const payments = sqliteTable("payments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("orderId").references(() => orders.id).notNull(),
  amount: real("amount").notNull(),
  paymentMethod: text("paymentMethod", { 
    enum: ["cash", "card", "mobile", "stripe", "paypal"] 
  }).notNull(),
  status: text("status", { 
    enum: ["pending", "completed", "failed", "refunded"] 
  }).default("pending").notNull(),
  transactionId: text("transactionId"),
  stripePaymentIntentId: text("stripePaymentIntentId"),
  paypalOrderId: text("paypalOrderId"),
  paidAt: integer("paidAt", { mode: "timestamp" }),
  refundedAt: integer("refundedAt", { mode: "timestamp" }),
  failureReason: text("failureReason"),
  metadata: text("metadata"), // JSON pour infos supplémentaires
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * ========================================
 * INVENTORY_LOGS - Historique du stock
 * ========================================
 */
export const inventoryLogs = sqliteTable("inventoryLogs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ingredientId: integer("ingredientId").references(() => ingredients.id).notNull(),
  changeAmount: real("changeAmount").notNull(),
  previousQuantity: real("previousQuantity").notNull(),
  newQuantity: real("newQuantity").notNull(),
  reason: text("reason", { 
    enum: ["purchase", "usage", "waste", "adjustment", "return"] 
  }).notNull(),
  orderId: integer("orderId").references(() => orders.id),
  userId: integer("userId").references(() => users.id),
  notes: text("notes"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type InventoryLog = typeof inventoryLogs.$inferSelect;
export type InsertInventoryLog = typeof inventoryLogs.$inferInsert;