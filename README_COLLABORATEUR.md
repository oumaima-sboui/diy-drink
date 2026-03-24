# DIY - Drink It Yourself
## Guide de Configuration pour Collaborateur

Bienvenue sur le projet **DIY - Drink It Yourself**, un site web full-stack pour un bar à jus haut de gamme avec interface d'administration.

---

## 📋 Vue d'ensemble du projet

**Type :** Application web full-stack (React + Node.js + PostgreSQL)  
**Style :** "L'Atelier d'Art" - Design éditorial luxe  
**Fonctionnalités principales :**
- Site vitrine avec design éditorial élégant
- Interface d'administration pour gérer le menu dynamiquement
- Base de données PostgreSQL pour les produits
- Authentification OAuth Manus
- API tRPC type-safe

---

## 🛠️ Stack Technique

### Frontend
- **React 19** avec TypeScript
- **Tailwind CSS 4** pour le styling
- **Wouter** pour le routing
- **Framer Motion** pour les animations
- **shadcn/ui** pour les composants UI
- **tRPC** pour les appels API type-safe

### Backend
- **Node.js** avec Express
- **tRPC 11** pour l'API
- **Drizzle ORM** pour la base de données
- **PostgreSQL** (MySQL/TiDB compatible)
- **Authentification OAuth Manus**

### Outils de développement
- **Vite** pour le bundling
- **pnpm** pour la gestion des packages
- **Vitest** pour les tests
- **TypeScript** pour le typage

---

## 🚀 Installation et Configuration

### Prérequis
- **Node.js** version 22.x ou supérieure
- **pnpm** (installé automatiquement si absent)
- **Accès à une base de données PostgreSQL** (ou compatible MySQL/TiDB)

### Étapes d'installation

1. **Décompresser l'archive**
   ```bash
   unzip diy-drink-it-yourself.zip
   cd diy-drink-it-yourself
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Configurer les variables d'environnement**
   
   Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   
   ```env
   # Base de données
   DATABASE_URL="mysql://user:password@host:port/database"
   
   # JWT pour les sessions
   JWT_SECRET="votre-secret-jwt-aleatoire-tres-long"
   
   # OAuth Manus (si vous utilisez l'authentification Manus)
   VITE_APP_ID="votre-app-id"
   OAUTH_SERVER_URL="https://api.manus.im"
   VITE_OAUTH_PORTAL_URL="https://oauth.manus.im"
   OWNER_OPEN_ID="votre-open-id"
   OWNER_NAME="Votre Nom"
   
   # APIs intégrées Manus (optionnel)
   BUILT_IN_FORGE_API_URL="https://forge-api.manus.im"
   BUILT_IN_FORGE_API_KEY="votre-api-key"
   VITE_FRONTEND_FORGE_API_KEY="votre-frontend-key"
   VITE_FRONTEND_FORGE_API_URL="https://forge-api.manus.im"
   
   # Configuration de l'app
   VITE_APP_TITLE="DIY - Drink It Yourself"
   VITE_APP_LOGO="/logo.svg"
   ```

4. **Initialiser la base de données**
   ```bash
   pnpm db:push
   ```
   
   Cette commande va :
   - Générer les migrations depuis le schéma Drizzle
   - Appliquer les migrations à la base de données
   - Créer les tables `users` et `products`

5. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   ```
   
   Le site sera accessible sur `http://localhost:3000`

---

## 📁 Structure du Projet

```
diy-drink-it-yourself/
├── client/                    # Frontend React
│   ├── public/               # Assets statiques
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── contexts/         # Contextes React (Cart, Theme)
│   │   ├── pages/            # Pages de l'application
│   │   │   ├── Home.tsx      # Page d'accueil
│   │   │   ├── Admin.tsx     # Interface d'administration
│   │   │   ├── Menu.tsx      # Page menu
│   │   │   └── ...
│   │   ├── lib/              # Utilitaires et configuration tRPC
│   │   ├── App.tsx           # Routes principales
│   │   └── main.tsx          # Point d'entrée
│   └── index.html
│
├── server/                    # Backend Node.js
│   ├── _core/                # Infrastructure (OAuth, tRPC, etc.)
│   ├── db.ts                 # Fonctions d'accès à la base de données
│   ├── routers.ts            # Définition des routes tRPC
│   ├── storage.ts            # Gestion du stockage S3
│   └── *.test.ts             # Tests unitaires
│
├── drizzle/                   # Schéma et migrations de la base de données
│   ├── schema.ts             # Définition des tables
│   └── migrations/           # Fichiers de migration
│
├── shared/                    # Code partagé frontend/backend
│   ├── const.ts              # Constantes
│   └── types.ts              # Types TypeScript partagés
│
├── package.json              # Dépendances et scripts
├── vite.config.ts            # Configuration Vite
├── tailwind.config.ts        # Configuration Tailwind
├── tsconfig.json             # Configuration TypeScript
└── todo.md                   # Liste des tâches et fonctionnalités
```

---

## 🎯 Fonctionnalités Implémentées

### ✅ Site Public
- Page d'accueil avec design éditorial "L'Atelier d'Art"
- Navigation fluide avec bouton retour intelligent
- Pages : Composer, Menu, Cafés, Thé & Boissons, Eau, Assiette, Blog, Notre Histoire
- Panier d'achat fonctionnel
- Newsletter "Club DIY"
- Assistant Vitamine (FAB flottant)
- Badges de confiance (Luxembourg Times)
- Responsive design

### ✅ Interface d'Administration (`/admin`)
- **Accès sécurisé** : Réservé aux administrateurs uniquement
- **Gestion des produits** :
  - Créer de nouveaux produits
  - Modifier les produits existants
  - Supprimer des produits
  - Activer/désactiver la disponibilité
- **Catégories supportées** : Jus, Smoothie, Snack, Café, Boisson, Thé, Eau
- **Champs gérés** : Nom, Description, Prix, Catégorie, Image URL, Disponibilité

### ✅ Backend & Base de Données
- API tRPC type-safe avec procédures publiques et protégées
- Base de données PostgreSQL avec Drizzle ORM
- Authentification OAuth Manus
- Contrôle d'accès basé sur les rôles (admin/user)
- Tests unitaires avec Vitest

---

## 🔧 Scripts Disponibles

```bash
# Développement
pnpm dev              # Lance le serveur de développement (frontend + backend)

# Base de données
pnpm db:push          # Génère et applique les migrations

# Tests
pnpm test             # Lance tous les tests unitaires

# Build
pnpm build            # Compile le projet pour la production
pnpm start            # Lance le serveur en mode production

# Qualité de code
pnpm check            # Vérifie les erreurs TypeScript
pnpm format           # Formate le code avec Prettier
```

---

## 👨‍💻 Guide de Développement

### Ajouter une nouvelle page

1. Créer le composant dans `client/src/pages/NomPage.tsx`
2. Ajouter la route dans `client/src/App.tsx` :
   ```tsx
   import NomPage from "./pages/NomPage";
   // ...
   <Route path={"/nom-page"} component={NomPage} />
   ```

### Ajouter une nouvelle table à la base de données

1. Définir le schéma dans `drizzle/schema.ts` :
   ```ts
   export const maTable = mysqlTable("ma_table", {
     id: int("id").autoincrement().primaryKey(),
     nom: varchar("nom", { length: 255 }).notNull(),
     createdAt: timestamp("createdAt").defaultNow().notNull(),
   });
   ```

2. Appliquer les migrations :
   ```bash
   pnpm db:push
   ```

3. Ajouter les fonctions d'accès dans `server/db.ts`

### Ajouter une nouvelle route API (tRPC)

1. Définir la procédure dans `server/routers.ts` :
   ```ts
   maFeature: router({
     list: publicProcedure.query(async () => {
       return await db.getMaFeatureList();
     }),
     create: protectedProcedure
       .input(z.object({ nom: z.string() }))
       .mutation(async ({ input }) => {
         return await db.createMaFeature(input);
       }),
   }),
   ```

2. Utiliser dans le frontend :
   ```tsx
   const { data } = trpc.maFeature.list.useQuery();
   const create = trpc.maFeature.create.useMutation();
   ```

### Modifier le design

- **Couleurs globales** : `client/src/index.css` (variables CSS)
- **Composants UI** : `client/src/components/ui/` (shadcn/ui)
- **Styles Tailwind** : Classes utilitaires directement dans les composants
- **Animations** : Framer Motion dans les composants

---

## 🔐 Gestion des Rôles

### Rôle Administrateur
- Le propriétaire du projet (défini par `OWNER_OPEN_ID`) est automatiquement admin
- Les admins ont accès à `/admin` et aux procédures `adminProcedure`
- Pour promouvoir un utilisateur en admin, modifier directement le champ `role` dans la table `users`

### Rôle Utilisateur
- Rôle par défaut pour tous les nouveaux utilisateurs
- Accès aux procédures `protectedProcedure` (nécessite connexion)
- Pas d'accès à l'interface d'administration

---

## 📦 Tâches Restantes

Consultez le fichier `todo.md` pour voir les fonctionnalités en cours et à venir :

### Priorités
- [ ] Implémenter l'upload d'images S3 dans le formulaire produit
- [ ] Connecter les pages menu publiques à la base de données
- [ ] Créer un script de migration pour importer les produits existants
- [ ] Ajouter des filtres de recherche dans l'interface admin
- [ ] Implémenter un système de favoris pour les clients

---

## 🐛 Résolution de Problèmes

### Le serveur ne démarre pas
- Vérifiez que toutes les variables d'environnement sont définies dans `.env`
- Assurez-vous que la base de données est accessible
- Vérifiez les logs dans la console

### Erreurs TypeScript
- Lancez `pnpm check` pour voir toutes les erreurs
- Les erreurs de bibliothèque manquante peuvent être ignorées si le serveur fonctionne

### La base de données ne se connecte pas
- Vérifiez le format de `DATABASE_URL`
- Format attendu : `mysql://user:password@host:port/database`
- Testez la connexion avec un client MySQL/PostgreSQL

### Les tests échouent
- Assurez-vous que la base de données de test est configurée
- Lancez `pnpm db:push` avant les tests
- Vérifiez les logs de test pour plus de détails

---

## 📞 Support

Pour toute question ou problème :
1. Consultez d'abord la documentation dans ce README
2. Vérifiez le fichier `todo.md` pour les fonctionnalités connues
3. Examinez les tests dans `server/*.test.ts` pour des exemples d'utilisation
4. Consultez la documentation officielle :
   - [React](https://react.dev/)
   - [tRPC](https://trpc.io/)
   - [Drizzle ORM](https://orm.drizzle.team/)
   - [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 Licence

Projet privé - Tous droits réservés

---

**Bon développement ! 🚀**
