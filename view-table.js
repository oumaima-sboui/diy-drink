import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:dev.db"
});

const tableName = process.argv[2] || "users";

try {
  const result = await client.execute(`SELECT * FROM ${tableName}`);
  console.log(`\n📋 Table: ${tableName}\n`);
  console.table(result.rows);
} catch (error) {
  console.error("❌ Erreur:", error.message);
  console.log("\n📋 Tables disponibles:");
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table'");
  console.log(tables.rows.map(r => r.name).join(", "));
}