import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./local.db" });

try {
  const result = await client.execute(`
    SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
  `);

  console.log('Tables disponibles:');
  console.log(JSON.stringify(result.rows, null, 2));
} catch (error) {
  console.error('Erreur:', error.message);
}

client.close();