import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:dev.db"
});

// D'abord, récupérer les IDs des catégories
const getCategoryId = async (name) => {
  const result = await client.execute({
    sql: "SELECT id FROM categories WHERE name = ?",
    args: [name]
  });
  return result.rows[0].id;
};

try {
  const jusId = await getCategoryId("Jus Frais");
  const smoothieId = await getCategoryId("Smoothies");
  const cafeId = await getCategoryId("Cafés");
  
  const products = [
    // Jus Frais
    {
      name: "Green Detox",
      description: "Céleri, concombre, pomme verte, citron, gingembre",
      price: 6.50,
      categoryId: jusId,
      imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400",
      preparationTime: 5,
      isAvailable: 1
    },
    {
      name: "Carrot Glow",
      description: "Carotte, orange, curcuma, gingembre",
      price: 5.90,
      categoryId: jusId,
      imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      preparationTime: 5,
      isAvailable: 1
    },
    {
      name: "Beetroot Power",
      description: "Betterave, pomme, citron, menthe",
      price: 6.20,
      categoryId: jusId,
      imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      preparationTime: 5,
      isAvailable: 1
    },
    
    // Smoothies
    {
      name: "Berry Bliss",
      description: "Fraises, myrtilles, banane, lait d'amande, açaï",
      price: 7.50,
      categoryId: smoothieId,
      imageUrl: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
      preparationTime: 7,
      isAvailable: 1
    },
    {
      name: "Tropical Sunrise",
      description: "Mangue, ananas, passion, lait de coco",
      price: 7.20,
      categoryId: smoothieId,
      imageUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400",
      preparationTime: 7,
      isAvailable: 1
    },
    
    // Cafés
    {
      name: "Espresso",
      description: "Espresso pur arabica",
      price: 2.50,
      categoryId: cafeId,
      imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400",
      preparationTime: 3,
      isAvailable: 1
    },
    {
      name: "Cappuccino",
      description: "Espresso, lait mousseux, cacao",
      price: 4.20,
      categoryId: cafeId,
      imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
      preparationTime: 5,
      isAvailable: 1
    },
    {
      name: "Flat White",
      description: "Double espresso, microfoam de lait",
      price: 4.50,
      categoryId: cafeId,
      imageUrl: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=400",
      preparationTime: 5,
      isAvailable: 1
    }
  ];
  
  for (const product of products) {
    await client.execute({
      sql: `INSERT INTO products 
            (name, description, price, categoryId, imageUrl, preparationTime, isAvailable, displayOrder) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      args: [
        product.name,
        product.description,
        product.price,
        product.categoryId,
        product.imageUrl,
        product.preparationTime,
        product.isAvailable
      ]
    });
    console.log(`✅ Produit créé : ${product.name} - ${product.price}€`);
  }
  
  console.log("\n🎉 Tous les produits ont été créés !");
  console.log("\n📋 Rendez-vous sur http://localhost:3000/admin pour les voir !");
  
} catch (error) {
  console.error("❌ Erreur :", error.message);
}