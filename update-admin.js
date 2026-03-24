import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:dev.db"
});


const email = "oumaima.sbouii@edu.isetcom.tn";

try {
  // D'abord, lister toutes les tables
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table'");
  console.log("📋 Tables disponibles :", tables.rows);
  
  // Essayer avec "users" au lieu de "app_users"
  await client.execute({
    sql: "UPDATE users SET role = 'admin' WHERE email = ?",
    args: [email]
  });
  
  const result = await client.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email]
  });
  
  console.log("✅ Rôle mis à jour :", result.rows[0]);
} catch (error) {
  console.error("❌ Erreur :", error.message);
}