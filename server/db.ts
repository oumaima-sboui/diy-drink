import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { 
  pgTable, 
  serial, 
  text, 
  integer, 
  boolean, 
  timestamp, 
  decimal 
} from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';

// ============================================
// SCHÉMA POSTGRESQL
// ============================================

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  phone: text('phone'),
  role: text('role').notNull().default('client'),
  loginMethod: text('login_method').notNull().default('email'),
  openId: text('open_id').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  lastSignedIn: timestamp('last_signed_in'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  displayOrder: integer('display_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  imageUrl: text('image_url'),
  preparationTime: integer('preparation_time').default(5),
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  clientName: text('client_name'),
  clientPhone: text('client_phone'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull().default('pending_payment'),
  notes: text('notes'),
  items: text('items'), // JSON stringifié
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  productId: integer('product_id'),
  productName: text('product_name').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text('payment_method').notNull(),
  status: text('status').notNull().default('pending'),
  transactionId: text('transaction_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  unit: text('unit').notNull(),
  stockQuantity: decimal('stock_quantity', { precision: 10, scale: 2 }).default('0'),
  minStockLevel: decimal('min_stock_level', { precision: 10, scale: 2 }).default('10'),
  costPerUnit: decimal('cost_per_unit', { precision: 10, scale: 4 }).notNull(),
  supplier: text('supplier'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// CONNEXION POSTGRESQL
// ============================================

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:IiTxweabGAljNRIPmTooLqAPuVSIhHEY@gondola.proxy.rlwy.net:47906/railway';

if (!connectionString) {
  throw new Error('❌ DATABASE_URL is not set');
}

console.log('🔗 Connexion à PostgreSQL...');

const client = postgres(connectionString, {
  max: 10,
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false
});

export const db = drizzle(client);

console.log('✅ PostgreSQL connecté');

// ============================================
// FONCTIONS D'ACCÈS AUX DONNÉES
// ============================================

// USERS
export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

export async function getUserByOpenId(openId: string) {
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0] || null;
}

export async function createUser(data: any) {
  const result = await db.insert(users).values(data).returning();
  return result[0];
}

export async function updateUser(id: number, data: any) {
  await db.update(users).set({ ...data, updatedAt: new Date() }).where(eq(users.id, id));
}

export async function getAllUsers() {
  return await db.select().from(users);
}

// CATEGORIES
export async function getActiveCategories() {
  return await db.select().from(categories).where(eq(categories.isActive, true));
}

export async function getAllCategories() {
  return await db.select().from(categories);
}

export async function createCategory(data: any) {
  const result = await db.insert(categories).values(data).returning();
  return result[0];
}

export async function updateCategory(id: number, data: any) {
  await db.update(categories).set(data).where(eq(categories.id, id));
}

// PRODUCTS
export async function getAvailableProducts() {
  return await db.select().from(products).where(eq(products.isAvailable, true));
}

export async function getAllProducts() {
  return await db.select().from(products);
}

export async function getProductById(id: number) {
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0] || null;
}

export async function createProduct(data: any) {
  const result = await db.insert(products).values(data).returning();
  return result[0].id;
}

export async function updateProduct(id: number, data: any) {
  await db.update(products).set({ ...data, updatedAt: new Date() }).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export async function toggleProductAvailability(id: number, isAvailable: boolean) {
  await db.update(products).set({ isAvailable }).where(eq(products.id, id));
}

// ORDERS
export async function getOrders() {
  return await db.select().from(orders);
}

export async function getOrderById(id: number) {
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result[0] || null;
}

export async function createOrder(data: any) {
  const result = await db.insert(orders).values(data).returning();
  return result[0];
}

export async function updateOrderStatus(id: number, status: string) {
  await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, id));
}

export async function getOrderItems(orderId: number) {
  return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

export async function createOrderItem(data: any) {
  const result = await db.insert(orderItems).values(data).returning();
  return result[0];
}

// PAYMENTS
export async function createPayment(data: any) {
  const result = await db.insert(payments).values(data).returning();
  return result[0];
}

export async function getPaymentByOrderId(orderId: number) {
  const result = await db.select().from(payments).where(eq(payments.orderId, orderId)).limit(1);
  return result[0] || null;
}

export async function updatePaymentStatus(id: number, status: string) {
  await db.update(payments).set({ status, updatedAt: new Date() }).where(eq(payments.id, id));
}

// INGREDIENTS
export async function getAllIngredients() {
  return await db.select().from(ingredients);
}

export async function getLowStockIngredients() {
  // Cette requête nécessite une logique SQL custom
  const allIngredients = await db.select().from(ingredients);
  return allIngredients.filter(i => 
    parseFloat(i.stockQuantity as string) < parseFloat(i.minStockLevel as string)
  );
}

export async function createIngredient(data: any) {
  const result = await db.insert(ingredients).values(data).returning();
  return result[0];
}

export async function updateIngredientStock(id: number, quantity: number) {
  await db.update(ingredients).set({ 
    stockQuantity: quantity.toString(),
    updatedAt: new Date() 
  }).where(eq(ingredients.id, id));
}

export async function createInventoryLog(data: any) {
  // Pour l'instant, on skip l'historique
  console.log('📝 Inventory log:', data);
}

export async function getRecipeByProductId(productId: number) {
  // Pour l'instant, retourner un tableau vide
  return [];
}

export async function createRecipe(data: any) {
  // Pour l'instant, skip
  console.log('📝 Recipe:', data);
  return {};
}

// ============================================
// INITIALISATION DE LA BASE
// ============================================

export async function initDatabase() {
  try {
    console.log('🔧 Initialisation de la base de données...');

    // Créer les tables
    await client`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        phone TEXT,
        role TEXT NOT NULL DEFAULT 'client',
        login_method TEXT NOT NULL DEFAULT 'email',
        open_id TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        last_signed_in TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    await client`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    await client`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category_id INTEGER REFERENCES categories(id),
        image_url TEXT,
        preparation_time INTEGER DEFAULT 5,
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    await client`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number TEXT NOT NULL UNIQUE,
        client_name TEXT,
        client_phone TEXT,
        total_amount DECIMAL(10,2) NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending_payment',
        notes TEXT,
        items TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    await client`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) NOT NULL,
        product_id INTEGER,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    await client`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        transaction_id TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    await client`
      CREATE TABLE IF NOT EXISTS ingredients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        unit TEXT NOT NULL,
        stock_quantity DECIMAL(10,2) DEFAULT 0,
        min_stock_level DECIMAL(10,2) DEFAULT 10,
        cost_per_unit DECIMAL(10,4) NOT NULL,
        supplier TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    console.log('✅ Tables créées');

    // Créer un admin par défaut
    const adminExists = await getUserByEmail('admin@diy-drink.com');
    if (!adminExists) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await createUser({
        name: 'Admin',
        email: 'admin@diy-drink.com',
        password: hashedPassword,
        role: 'admin',
        loginMethod: 'email',
        openId: 'email_admin@diy-drink.com'
      });
      
      console.log('✅ Admin créé (email: admin@diy-drink.com, password: admin123)');
    }

    console.log('✅ Base de données initialisée');
  } catch (error) {
    console.error('❌ Erreur initialisation DB:', error);
  }
}