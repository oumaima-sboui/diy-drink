# TODO - Refonte Site DIY Drink It Yourself

## 🎨 Charte Graphique (IMPÉRATIF)
- [ ] Couleurs officielles :
  - Émeraude Signature: #004D40 (primaire)
  - Rose Gold Premium: #D4AF37 (secondaire luxe)
  - Vert Wellness: #7CB342 (fraîcheur)
  - Orange Énergie: #FF6F00 (vitalité)
- [ ] Typographie :
  - Cormorant Garamond (titres H1-H3)
  - Montserrat (corps de texte, UI)
- [ ] Logo botanique avec feuilles tropicales
- [ ] Motifs botaniques en arrière-plan (feuilles, fruits)
- [ ] Fond crème/beige (#F5F5DC) au lieu de blanc

## ☕ Café
- [ ] Supprimer le choix de taille pour le café (taille standard uniquement)
- [ ] Diviser en 2 sections :
  - Cafés Classiques (Espresso, Americano, Cappuccino, Latte, etc.)
  - Cafés Signatures (Espresso Tonic Orange, Mushroom Coffee, etc.)
- [ ] Design plus attractif pour les cartes café

## 🥤 Boissons Classiques
- [ ] Créer un nouvel onglet "Boissons Classiques"
- [ ] Ajouter : Eau plate, Eau gazeuse, Sodas, Thé glacé, Limonade

## 🍓 Assiette de Fruits
- [ ] Créer un nouveau produit "Assiette de Fruits"
- [ ] Composition libre de fruits frais coupés
- [ ] Prix selon taille et nombre de fruits

## 🚨 Allergènes
- [ ] Ajouter les allergènes pour chaque ingrédient
- [ ] Afficher les icônes d'allergènes lors de la sélection
- [ ] Liste complète : Gluten, Lactose, Fruits à coque, Soja, etc.

## 💡 Conseils Automatiques
- [ ] Détecter les combinaisons incompatibles (ex: lait + citron)
- [ ] Afficher un avertissement avec suggestion alternative
- [ ] Logique de détection des mauvais mélanges

## 📋 Page Menu
- [ ] Créer la page /menu avec tous les produits
- [ ] Sections : Jus, Smoothies, Cafés, Boissons Classiques, Assiettes
- [ ] Design catalogue avec filtres

## 🎯 Design Général
- [ ] Rendre les choix plus attractifs et originaux
- [ ] Cartes avec hover effects élégants
- [ ] Animations subtiles
- [ ] Photos/illustrations botaniques

## 🆕 NOUVELLES MODIFICATIONS

### Cafés Classiques
- [ ] Ajouter plus d'options : Americano, Cortado, Flat White, Ristretto, Lungo, Macchiato Caramel
- [ ] Allergènes clairs pour chaque café

### Boissons Gazeuses
- [ ] Ajouter : Coca-Cola, Coca Zero, Sprite, Fanta Orange/Citron, Ice Tea Pêche/Citron, Schweppes
- [ ] Tailles : 33cl, 50cl

### Thé
- [ ] Créer catégorie complète avec : Thé Vert, Noir, Blanc, Earl Grey, Jasmin, Infusions (Menthe, Verveine, Camomille)

### Eau
- [ ] Nouvelle rubrique séparée : Eau Plate/Gazeuse en 500ml et 1L

### Structure Navigation
- [ ] Renommer "Classiques" → "Thé & Boissons Gazeuses"
- [ ] Séparer les rubriques :
  1. "Composer ma boisson" (Jus, Smoothies, Assiettes UNIQUEMENT)
  2. "Cafés" (page séparée, pas de composition)
  3. "Thé & Boissons Gazeuses" (page séparée)
  4. "Eau" (page séparée)

### Page Composer
- [ ] Supprimer le mot "Composer" en haut
- [ ] Assiettes : Ajouter option chocolat (noir/blanc/lait)

### Design Tailles
- [ ] Cartes plus petites, cozy et cute
- [ ] Icônes de verres


## 🆕 NOUVELLES AMÉLIORATIONS UX ET DESIGN

### Assiettes - Mode Direct
- [ ] Créer route /assiette dédiée
- [ ] Redirection directe vers fruits + chocolat (pas de sélection de type)
- [ ] Supprimer la sélection de taille pour assiettes (pas de taille de boisson)
- [ ] Supprimer les légumes pour assiettes (uniquement fruits + chocolat)

### Design Luxueux
- [ ] Arrière-plan avec motifs botaniques de la charte graphique
- [ ] Utiliser plus de couleurs de la charte (émeraude, rose gold, orange)
- [ ] Ajouter dégradés subtils
- [ ] Ombres douces et élégantes
- [ ] Textures premium
- [ ] Espacements généreux

### Prix Cafés Luxembourgeois
- [ ] Cafés classiques : 2,80€ - 4,50€
- [ ] Cafés signatures : 5,50€ - 7,50€

### Épices & Boosters
- [ ] Ajouter catégorie "Épices & Boosters" :
  - Curcuma
  - Gingembre
  - Cayenne
  - Cannelle
  - Cardamome

### Conseils Barista Visibles
- [ ] Rendre les conseils barista plus visibles pendant la composition
- [ ] Afficher un panneau latéral ou section dédiée
- [ ] Suggestions en temps réel basées sur sélection
- [ ] Conseils proactifs (pas seulement dans tooltips)


## 🚨🚨🚨 BUGS CRITIQUES DE NAVIGATION - PRIORITÉ ABSOLUE

### Bug 1: Assiette redirige vers /composer au lieu de /assiette
- **Symptôme**: Cliquer sur "Assiette" dans /composer redirige vers /composer
- **Solution**: Supprimer complètement "Assiette" de /composer

### Bug 2: Café redirige vers /composer au lieu de /cafes
- **Symptôme**: Cliquer sur "Café" redirige vers /composer
- **Solution**: Supprimer complètement "Café" de /composer

### Bug 3: /cafes ne permet pas de commander directement
- **Symptôme**: Impossible de commander un café depuis /cafes
- **Solution**: Ajouter boutons "Commander" dans /cafes

## ✅ CORRECTIONS À APPLIQUER IMMÉDIATEMENT

1. **/composer** : Garder UNIQUEMENT Jus et Smoothie
2. **/cafes** : Ajouter système de commande directe
3. **/home** : Assiette doit rediriger vers /assiette (pas /composer)


## 🔧 ADMIN INTERFACE - Menu Management System

- [x] Create database schema for products (juices, smoothies, snacks, cafes, drinks)
- [x] Add database helper functions for product CRUD operations
- [x] Create tRPC procedures for product management (list, create, update, delete, toggle availability)
- [x] Build admin dashboard layout with navigation
- [x] Create product management UI (table with add/edit/delete actions)
- [x] Add form for creating/editing products (name, description, price, category, image, availability)
- [ ] Implement image upload functionality with S3
- [ ] Update public Menu page to fetch products from database dynamically
- [ ] Add role-based access control (admin only access to dashboard)
- [x] Write tests for product CRUD operations
- [ ] Seed database with existing menu items from current static data


## 🐛 BUG FIXES

- [x] Fix nested anchor tag error on homepage (Link wrapping <a> elements)
