import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./local.db" });

console.log('Suppression de toutes les commandes...');

const variations = [
  'orderItems',
  'order_items', 
  'OrderItems',
  'ORDER_ITEMS'
];

for (const tableName of variations) {
  try {
    await client.execute(`DELETE FROM ${tableName}`);
    console.log(`OK: ${tableName} supprime`);
  } catch (e) {
    console.log(`Essai: ${tableName} - pas trouve`);
  }
}

const paymentVariations = ['payments', 'payment', 'Payments'];
for (const tableName of paymentVariations) {
  try {
    await client.execute(`DELETE FROM ${tableName}`);
    console.log(`OK: ${tableName} supprime`);
  } catch (e) {
    console.log(`Essai: ${tableName} - pas trouve`);
  }
}

const orderVariations = ['orders', 'order', 'Orders'];
for (const tableName of orderVariations) {
  try {
    await client.execute(`DELETE FROM ${tableName}`);
    console.log(`OK: ${tableName} supprime`);
  } catch (e) {
    console.log(`Essai: ${tableName} - pas trouve`);
  }
}

console.log('Terminé!');
client.close();