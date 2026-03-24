const { createClient } = require("@libsql/client");
const { drizzle } = require("drizzle-orm/libsql");

async function resetOrders() {
  const client = createClient({ 
    url: process.env.DATABASE_URL || "file:./local.db" 
  });
  const db = drizzle(client);

  console.log("🗑️  Suppression de toutes les commandes...");

  try {
    // Requête SQL directe
    await db.run("DELETE FROM order_items");
    console.log("✅ Order items supprimés");
    
    await db.run("DELETE FROM payments");
    console.log("✅ Payments supprimés");
    
    await db.run("DELETE FROM orders");
    console.log("✅ Orders supprimés");
    
    console.log("🎉 Toutes les commandes ont été supprimées !");
    
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
  
  process.exit(0);
}

resetOrders();