import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:dev.db"
});

const categories = [
  { name: "Jus Frais", description: "Jus de fruits et légumes pressés à froid", displayOrder: 1 },
  { name: "Smoothies", description: "Mélanges onctueux de fruits et superaliments", displayOrder: 2 },
  { name: "Cafés", description: "Cafés de spécialité et boissons chaudes", displayOrder: 3 },
  { name: "Thés & Infusions", description: "Thés premium et infusions naturelles", displayOrder: 4 },
  { name: "Eaux", description: "Eaux aromatisées et detox", displayOrder: 5 },
  { name: "Snacks", description: "Accompagnements sains et gourmands", displayOrder: 6 },
];

try {
  for (const cat of categories) {
    await client.execute({
      sql: "INSERT INTO categories (name, description, displayOrder, isActive) VALUES (?, ?, ?, 1)",
      args: [cat.name, cat.description, cat.displayOrder]
    });
    console.log(`✅ Catégorie créée : ${cat.name}`);
  }
  
  console.log("\n🎉 Toutes les catégories ont été créées !");
  
  const result = await client.execute("SELECT * FROM categories");
  console.log("\n📋 Catégories dans la base :");
  console.table(result.rows);
  
} catch (error) {
  console.error("❌ Erreur :", error.message);
}