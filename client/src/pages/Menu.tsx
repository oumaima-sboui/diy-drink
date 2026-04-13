import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { ShoppingCart, Leaf, Coffee, Cookie } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ingredients } from '@/lib/data';
export default function Menu() {
  const { t } = useTranslation();
    const [location, setLocation] = useLocation();
const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('jus');
const ADDONS_JUS = [
  { id: 'shot-gingembre', nameKey: 'addon.gingerShot', descKey: 'addon.gingerShotDesc', price: 1.50, emoji: '🔥', allergens: [] },
  { id: 'curcuma', nameKey: 'addon.turmeric', descKey: 'addon.turmericDesc', price: 1.50, emoji: '🟡', allergens: [] },
];

const ADDONS_SMOOTHIE = [
  // PROTÉINES
  { id: 'whey-protein', nameKey: 'addon.wheyProtein', descKey: 'addon.wheyProteinDesc', price: 2.50, emoji: '💪', allergens: ['dairy'] },
  { id: 'beurre-cacahuete', nameKey: 'addon.peanutButter', descKey: 'addon.peanutButterDesc', price: 2.00, emoji: '🥜', allergens: ['peanuts'] },
  { id: 'beurre-amande', nameKey: 'addon.almondButter', descKey: 'addon.almondButterDesc', price: 2.50, emoji: '🌰', allergens: ['nuts'] },
  
  // SUPERFOODS
  { id: 'spiruline', nameKey: 'addon.spirulina', descKey: 'addon.spirulinaDesc', price: 2.50, emoji: '🌀', allergens: [] },
  { id: 'graines-chia', nameKey: 'addon.chiaSeeds', descKey: 'addon.chiaSeedsDesc', price: 1.50, emoji: '🌾', allergens: [] },
  { id: 'graines-lin', nameKey: 'addon.flaxSeeds', descKey: 'addon.flaxSeedsDesc', price: 1.50, emoji: '🌾', allergens: [] },
  { id: 'maca', nameKey: 'addon.maca', descKey: 'addon.macaDesc', price: 2.00, emoji: '🍠', allergens: [] },
  
  // SANTÉ & IMMUNITÉ
  { id: 'shot-gingembre', nameKey: 'addon.gingerShot', descKey: 'addon.gingerShotDesc', price: 1.50, emoji: '🔥', allergens: [] },
  { id: 'curcuma', nameKey: 'addon.turmeric', descKey: 'addon.turmericDesc', price: 1.50, emoji: '🟡', allergens: [] },
  { id: 'matcha', nameKey: 'addon.matcha', descKey: 'addon.matchaDesc', price: 2.50, emoji: '🍵', allergens: ['caffeine'] },
  { id: 'cacao-cru', nameKey: 'addon.rawCacao', descKey: 'addon.rawCacaoDesc', price: 2.00, emoji: '🍫', allergens: [] },
];
  const SIGNATURE_PRODUCTS = {
    jus: [
      {
        id: 'jus-kirchberg',
        name: t('menu.goldKirchberg'),
        description: t('menu.goldKirchbergDesc'),
        price: 7.50,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/ERBaGJORnrtFBHjP.jpg",
        tags: ["Detox", "Immunité"],
        color: "from-orange-400 to-yellow-400",
        allergens: ["celery"],
        ingredientsList: ["Ananas", "Carotte", "Gingembre", "Citron"]
      },
      {
        id: 'jus-emeraude',
        name: t('menu.emeraldTonic'),
        description: t('menu.emeraldTonicDesc'),
        price: 7.50,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/QxzkGPhvWuXIqfrb.jpg",
        tags: ["Hydratation", "Fraîcheur"],
        color: "from-green-400 to-emerald-500",
        allergens: ["celery"],
        ingredientsList: ["Concombre", "Pomme verte", "Menthe", "Gingembre"]
      },
      {
        id: 'jus-rubis',
        name: t('menu.ruby'),
        description: t('menu.rubyDesc'),
        price: 7.90,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/KZyhDqCjegMWyHEp.jpg",
        tags: ["Antioxydant", "Énergie"],
        color: "from-red-500 to-purple-600",
        allergens: [],
        ingredientsList: ["Betterave", "Grenade", "Fraise", "Citron"]
      },
      {
        id: 'jus-arlon',
        name: t('menu.exoticArlon'),
        description: t('menu.exoticArlonDesc'),
        price: 8.50,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/BRjUUZLrmphsouat.jpg",
        tags: ["Vitaminé", "Exotique"],
        color: "from-yellow-400 to-orange-500",
        allergens: [],
        ingredientsList: ["Ananas", "fruit de la passion", "citron vert", "pointe de basilic thaï"]
      },
      {
        id: 'jus-alzette',
        name: t('menu.alzetteSweetness'),
        description: t('menu.alzetteSweetnessDesc'),
        price: 7.50,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/VkJfprIlpiVBoNHT.jpg",
        tags: ["Digestion", "Douceur"],
        color: "from-green-200 to-green-400",
        allergens: ["celery"],
        ingredientsList: ["Pomme", "Fenouil", "Menthe", "Citron"]
      },
      {
        id: 'jus-zeste',
        name: t('menu.balancingZest'),
        description: t('menu.balancingZestDesc'),
        price: 7.50,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/jprKRMFeQdFhXPhO.jpg",
        tags: ["Vitalité", "Agrumes"],
        color: "from-orange-300 to-pink-400",
        allergens: [],
        ingredientsList: ["Pamplemousse", "Orange", "Citron", "Gingembre"]
      }
    ],
    smoothies: [
      {
        id: 'smoothie-mosellan',
        name: t('menu.mosellanVelvet'),
        description: t('menu.mosellanVelvetDesc'),
        price: 8.90,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/gMtawzSnhglYhCZP.jpg",
        tags: ["Gourmand", "Réconfort"],
        color: "from-purple-400 to-indigo-500",
        allergens: ["dairy"],
        ingredientsList: ["Myrtille", "Banane", "Yaourt grec", "Lait d'amande"]
      },
      {
        id: 'smoothie-power',
        name: t('menu.powerGreen'),
        description: t('menu.powerGreenDesc'),
        price: 9.50,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/vllnoKqARjyYRBNM.jpg",
        tags: ["Protéiné", "Superfood"],
        color: "from-green-500 to-emerald-700",
        allergens: ["dairy"],
        ingredientsList: ["Épinards", "Spiruline", "Banane", "Protéine whey", "Lait d'amande"]
      },
      {
        id: 'smoothie-framboise',
        name: t('menu.raspberryPie'),
        description: t('menu.raspberryPieDesc'),
        price: 8.90,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/psXpqLlRGJOkzDjJ.jpg",
        tags: ["Petit-déj", "Fibres"],
        color: "from-pink-400 to-rose-500",
        allergens: ["gluten", "nuts"],
        ingredientsList: ["Framboise", "Avoine", "Amandes", "Banane", "Miel"]
      },
      {
        id: 'smoothie-mangue',
        name: t('menu.spicyMango'),
        description: t('menu.spicyMangoDesc'),
        price: 8.90,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/UEpCYrKkFKDwfaXF.jpg",
        tags: ["Épicé", "Métabolisme"],
        color: "from-yellow-500 to-orange-600",
        allergens: [],
        ingredientsList: ["Mangue", "Cayenne", "Curcuma", "Gingembre", "Orange"]
      },
      {
        id: 'smoothie-cafe',
        name: t('menu.coffeeBanana'),
        description: t('menu.coffeeBananaDesc'),
        price: 8.50,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/NtiUBaEmlZhCeQFs.jpg",
        tags: ["Énergie", "Caféine"],
        color: "from-amber-700 to-orange-900",
        allergens: ["dairy", "caffeine"],
        ingredientsList: ["Café", "Banane", "Lait d'avoine", "Cacao", "Miel"]
      },
      {
        id: 'smoothie-mure',
        name: t('menu.blackberryLavender'),
        description: t('menu.blackberryLavenderDesc'),
        price: 9.50,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/XxHOTsRZVegWOPiX.jpg",
        tags: ["Relaxant", "Floral"],
        color: "from-purple-500 to-indigo-600",
        allergens: ["dairy"],
        ingredientsList: ["Mûre", "Lavande", "Yaourt", "Miel", "Lait d'amande"]
      }
    ],
    snacks: [
  {
    id: 'snack-givre-petrusse',
    name: t('menu.petrusseFrozen'),
    description: t('menu.petrusseFrozenDesc'),
    price: 8.90,
    image: "/images/Snacks/Givrée-de-la-pétrusse.png",
    tags: ["Frais", "Gourmand"],
    color: "from-blue-200 to-purple-300",
    allergens: ["nuts"]
  },
  {
    id: 'snack-bowl-grund',
    name: t('menu.grundBowl'),
    description: t('menu.grundBowlDesc'),
    price: 9.50,
    image: "/images/Snacks/Bowl-du-Grund.png",
    tags: ["Équilibré", "Énergie"],
    color: "from-purple-200 to-pink-300",
    allergens: ["nuts", "dairy", "gluten"]
  },
  {
    id: 'snack-croquants-corniche',
    name: t('menu.cornicheCrunch'),
    description: t('menu.cornicheCrunchDesc'),
    price: 7.90,
    image: "/images/Snacks/Les-Croquants-de-la-Corniche.png",
    tags: ["Croquant", "Artisanal"],
    color: "from-orange-200 to-amber-400",
    allergens: ["nuts", "gluten"]
  },
  {
    id: 'snack-fruit-salad',
    name: t('menu.fruitSalad'),
    description: t('menu.fruitSaladDesc'),
    price: 6.90,
    image: "/images/Snacks/Salade-fruit.jpg",
    tags: ["Frais", "Vitaminé"],
    color: "from-white-300 to-pink-400",
    allergens: []
  },
  {
    id: 'snack-acai-bowl',
    name: t('menu.acaiBowl'),
    description: t('menu.acaiBowlDesc'),
    price: 9.50,
    image: "/images/Snacks/Acai-bowl.jpg",
    tags: ["Superfood", "Énergisant"],
    color: "from-white-300 to-indigo-600",
    allergens: ["nuts", "gluten"]
  },
  {
    id: 'snack-strawberries-cream',
    name: t('menu.strawberriesCream'),
    description: t('menu.strawberriesCreamDesc'),
    price: 7.50,
    image: "/images/Snacks/Fraise-cream.jpg",
    tags: ["Gourmand", "Dessert"],
    color: "from-red-100 to-red-500",
    allergens: ["dairy"]
  }
],
    boissons_chaudes: [
      {
        id: 'cafe-espresso',
        nameKey: 'menu.espresso',
        descKey: 'menu.espressoDesc',
        price: 2.50,
        image: "/images/coffees/coffee_1_espresso.png",
        tags: ["Café", "Intense"],
        color: "from-amber-900 to-orange-800",
        allergens: ["caffeine"]
      },
      {
        id: 'cafe-doppio',
        nameKey: 'menu.doppio',
        descKey: 'menu.doppioDesc',
        price: 3.00,
        image: "/images/coffees/coffee_2_doppio.png",
        tags: ["Café", "Double"],
        color: "from-amber-900 to-brown-900",
        allergens: ["caffeine"]
      },
      {
        id: 'cafe-americano',
        nameKey: 'menu.americano',
        descKey: 'menu.americanoDesc',
        price: 2.80,
        image: "/images/coffees/coffee_3_americano.png",
        tags: ["Café", "Allongé"],
        color: "from-amber-900 to-orange-900",
        allergens: ["caffeine"]
      },
      {
        id: 'cafe-creme',
        nameKey: 'menu.cafeCreme',
        descKey: 'menu.cafeCremeDesc',
        price: 3.20,
        image: "/images/coffees/coffee_4_cafe_creme.png",
        tags: ["Café", "Crémeux"],
        color: "from-amber-700 to-orange-600",
        allergens: ["caffeine", "dairy"]
      },
      {
        id: 'cafe-ristretto',
        nameKey: 'menu.ristretto',
        descKey: 'menu.ristrettoDesc',
        price: 2.50,
        image: "/images/coffees/coffee_5_ristretto.png",
        tags: ["Café", "Court"],
        color: "from-amber-900 to-red-900",
        allergens: ["caffeine"]
      },
      {
        id: 'cafe-cappuccino',
        nameKey: 'menu.cappuccino',
        descKey: 'menu.cappuccinoDesc',
        price: 3.50,
        image: "/images/coffees/coffee_6_cappuccino.png",
        tags: ["Café", "Onctueux"],
        color: "from-amber-700 to-orange-600",
        allergens: ["caffeine", "dairy"]
      },
      {
        id: 'cafe-lait-russe',
        nameKey: 'menu.laitRusse',
        descKey: 'menu.laitRusseDesc',
        price: 4.20,
        image: "/images/coffees/coffee_7_lait_russe.png",
        tags: ["Café", "Traditionnel"],
        color: "from-amber-600 to-orange-500",
        allergens: ["caffeine", "dairy"]
      },
      {
        id: 'cafe-flatwhite',
        nameKey: 'menu.flatWhite',
        descKey: 'menu.flatWhiteDesc',
        price: 3.90,
        image: "/images/coffees/coffee_8_flat_white.png",
        tags: ["Café", "Velouté"],
        color: "from-amber-800 to-orange-700",
        allergens: ["caffeine", "dairy"]
      },
      {
        id: 'cafe-latte',
        nameKey: 'menu.latte',
        descKey: 'menu.latteDesc',
        price: 3.80,
        image: "/images/coffees/coffee_9_latte.png",
        tags: ["Café", "Doux"],
        color: "from-amber-600 to-orange-500",
        allergens: ["caffeine", "dairy"]
      },
      {
        id: 'cafe-macchiato',
        nameKey: 'menu.macchiato',
        descKey: 'menu.macchiatoDesc',
        price: 3.20,
        image: "/images/coffees/coffee_10_macchiato.png",
        tags: ["Café", "Marqué"],
        color: "from-amber-900 to-orange-800",
        allergens: ["caffeine", "dairy"]
      },
      {
        id: 'cafe-iced-latte',
        nameKey: 'menu.icedLatte',
        descKey: 'menu.icedLatteDesc',
        price: 4.20,
        image: "/images/coffees/coffee_11_iced_latte.png",
        tags: ["Café", "Glacé"],
        color: "from-blue-400 to-amber-500",
        allergens: ["caffeine", "dairy"]
      },
      {
        id: 'cafe-cold-brew',
        nameKey: 'menu.coldBrew',
        descKey: 'menu.coldBrewDesc',
        price: 4.50,
        image: "/images/coffees/coffee_12_cold_brew.png",
        tags: ["Café", "Infusion"],
        color: "from-amber-900 to-gray-800",
        allergens: ["caffeine"]
      },
       {
    id: 'the-menthe',
    nameKey: 'menu.mintTea',
    descKey: 'menu.mintTeaDesc',
    price: 3.50,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
    tags: ["Thé", "Frais"],
    color: "from-green-400 to-emerald-500",
    allergens: []
  },
  {
    id: 'the-earl-grey',
    nameKey: 'menu.earlGrey',
    descKey: 'menu.earlGreyDesc',
    price: 3.50,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500",
    tags: ["Thé", "Classique"],
    color: "from-amber-800 to-orange-900",
    allergens: []
  },
  {
    id: 'the-gingembre-citron',
    nameKey: 'menu.gingerLemonTea',
    descKey: 'menu.gingerLemonTeaDesc',
    price: 3.80,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500",
    tags: ["Thé", "Épicé"],
    color: "from-yellow-500 to-orange-600",
    allergens: []
  },
  {
    id: 'the-camomille',
    nameKey: 'menu.chamomileTea',
    descKey: 'menu.chamomilleTeaDesc',
    price: 3.50,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    tags: ["Thé", "Apaisant"],
    color: "from-yellow-200 to-amber-300",
    allergens: []
  },
  {
    id: 'the-rooibos',
    nameKey: 'menu.rooibosVanilla',
    descKey: 'menu.rooibosVanillaDesc',
    price: 3.80,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500",
    tags: ["Thé", "Doux"],
    color: "from-red-400 to-orange-500",
    allergens: []
  },
  {
    id: 'the-matcha-latte',
    nameKey: 'menu.matchaLatte',
    descKey: 'menu.matchaLatteDesc',
    price: 4.50,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500",
    tags: ["Thé", "Matcha"],
    color: "from-green-500 to-emerald-600",
    allergens: ["dairy"],
    ingredientsList: ["Matcha"]
  }
    ],
   eau_boissons: [
  {
    id: 'eau-plate',
    name: t('menu.stillWater'),
    description: t('menu.stillWaterDesc'),
    price: 1.50,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500",
    tags: ["Eau", "Naturelle"],
    color: "from-blue-300 to-cyan-400",
    allergens: []
  },
  {
    id: 'eau-gazeuse',
    name: t('menu.sparklingWater'),
    description: t('menu.sparklingWaterDesc'),
    price: 1.80,
    image: "https://images.unsplash.com/photo-1622543925917-763c34f6f86a?w=500",
    tags: ["Eau", "Gazeuse"],
    color: "from-blue-400 to-cyan-500",
    allergens: []
  },
  // SODAS
  {
    id: 'coca-cola',
    nameKey: 'menu.cocaCola',
    descKey: 'menu.colaDesc',
    price: 2.50,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500",
    tags: ["Soda", "Classique"],
    color: "from-red-600 to-red-800",
    allergens: []
  },
  {
    id: 'coca-zero',
    nameKey: 'menu.colaZero',
    descKey: 'menu.colaZeroDesc',
    price: 2.50,
    image:  "/images/coffees/cola-zero.png",
    tags: ["Soda", "Zéro"],
    color: "from-gray-800 to-black",
    allergens: []
  },
  {
    id: 'seven-up',
    nameKey: 'menu.sevenUp',
    descKey: 'menu.sevenUpDesc',
    price: 2.50,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500",
    tags: ["Soda", "Citron"],
    color: "from-green-400 to-lime-500",
    allergens: []
  },
  {
    id: 'fanta',
    nameKey: 'menu.fanta',
    descKey: 'menu.fantaDesc',
    price: 2.50,
    image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=500",
    tags: ["Soda", "Orange"],
    color: "from-orange-500 to-orange-600",
    allergens: []
  },
  {
    id: 'sprite',
    nameKey: 'menu.sprite',
    descKey: 'menu.spriteDesc',
    price: 2.50,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500",
    tags: ["Soda", "Citron"],
    color: "from-green-300 to-lime-400",
    allergens: []
  },
  {
    id: 'ice-tea-peche',
    nameKey: 'menu.iceTea',
    descKey: 'menu.iceTeaDesc', 
    price: 2.80,
    image: "/images/coffees/ice-tea.png",
    tags: ["Thé", "Glacé"],
    color: "from-amber-400 to-orange-500",
    allergens: ["caffeine"]
  }
],
  };

// Fonction pour ajouter un produit SANS add-ons
const handleAddToCart = (product: any) => {
  const productIngredients = product.ingredientsList?.map((ingName: string) => {
    const foundIng = ingredients.find(i => i.name === ingName);
    return {
      id: foundIng?.id || ingName.toLowerCase().replace(/\s+/g, '-'),
      name: ingName,
      emoji: foundIng?.emoji || '🥤',
      category: foundIng?.category || 'fruits',
      price: 0, // ✅ Ingrédients de base = 0€
      calories: foundIng?.calories || 0,
      allergens: foundIng?.allergens || []
    };
  }) || [];

  addToCart({
    id: `menu-${product.id}-${Date.now()}`,
    type: product.category === 'jus' ? 'jus' : 'smoothie',
    size: 'medium',
    basePrice: product.price, // ✅ Prix de base SEULEMENT
    quantity: 1,
    customizations: {
      productName: t(product.nameKey),
      description: product.ingredientsList?.join(', ')
    },
    ingredients: productIngredients
  });

  toast.success(`${t(product.nameKey)} ${t('menu.addedToCart')}`);
  setLocation('/panier');
};

// Fonction pour ajouter un produit AVEC add-ons
const handleAddToCartWithAddons = (product: any, selectedAddons: any[]) => {
  const productIngredients = product.ingredientsList?.map((ingName: string) => {
    const foundIng = ingredients.find(i => i.name === ingName);
    return {
      id: foundIng?.id || ingName.toLowerCase().replace(/\s+/g, '-'),
      name: ingName,
      emoji: foundIng?.emoji || '🥤',
      category: foundIng?.category || 'fruits',
      price: 0, // ✅ Ingrédients de base = 0€
      calories: foundIng?.calories || 0,
      allergens: foundIng?.allergens || []
    };
  }) || [];

  console.log('🛒 AJOUT AU PANIER:', {
    produit: t(product.nameKey),
    prixBase: product.price,
    addons: selectedAddons.map(a => `${a.name}: ${a.price}€`),
    totalAddons: selectedAddons.reduce((sum, a) => sum + a.price, 0)
  });

  addToCart({
    id: `menu-${product.id}-${Date.now()}`,
    type: product.category === 'jus' ? 'jus' : 'smoothie',
    size: 'medium',
    basePrice: product.price, 
    quantity: 1,
    customizations: {
      productName: t(product.nameKey),
      description: product.ingredientsList?.join(', ')
    },
    ingredients: [
      ...productIngredients, // Ingrédients de base (price = 0)
      ...selectedAddons // Add-ons (price > 0)
    ]
  });

  toast.success(`${t(product.nameKey)} ${t('menu.addedToCart')}`);
  setLocation('/panier');
};
const AddOnSelector = ({ addons, onAddonsChange }: { 
  addons: any[], 
  onAddonsChange: (selected: any[]) => void 
}) => {
  const { t } = useTranslation();
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);

  const toggleAddon = (addon: any) => {
    let updated;
    if (selectedAddons.find(a => a.id === addon.id)) {
      updated = selectedAddons.filter(a => a.id !== addon.id);
    } else {
      updated = [...selectedAddons, addon];
    }
    setSelectedAddons(updated);
    onAddonsChange(updated);
  };

  return (
    <div className="mt-4 pt-4 border-t-2 border-gray-100">
      <p className="text-sm font-bold text-[#004D40] mb-3 flex items-center gap-2">
        ⚡ {t('composer.addons')}
      </p>
      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
        {addons.map((addon) => {
          const isSelected = selectedAddons.find(a => a.id === addon.id);
          return (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon)}
              className={`text-left p-2 rounded-lg border transition-all text-xs ${
                isSelected
                  ? 'border-[#FF6F00] bg-[#FF6F00]/10'
                  : 'border-gray-200 hover:border-[#FF6F00]/30'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-base">{addon.emoji}</span>
                  <span className="font-medium text-[#004D40] text-[10px]">
                    {t(addon.nameKey)}
                  </span>
                </div>
                <span className="text-[#FF6F00] font-bold text-[10px]">
                  +{addon.price.toFixed(2)}€
                </span>
              </div>
              {isSelected && (
                <div className="mt-1 text-[9px] text-green-600 font-medium">
                  ✓ Ajouté
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
const ProductCard = ({ product, type }: { product: any, type: string }) => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  
  const displayName = product.name || t(product.nameKey || '');
  const displayDescription = product.description || t(product.descKey || '');
  const displayTags = product.tags || ["Café"];
  const displayColor = product.color || "from-amber-700 to-orange-600";
  const allergens = product.allergens || [];
  
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  
  const availableAddons = type === 'jus' ? ADDONS_JUS : type === 'smoothie' ? ADDONS_SMOOTHIE : [];
  
  const handleAddToCartClick = () => {
    console.log('🔵 BOUTON CLIQUÉ');
    console.log('🔵 PRODUIT:', product);
    console.log('🔵 ADD-ONS SÉLECTIONNÉS:', selectedAddons);
    
    const basePrice = product.price;
    
    // Préparer les ingrédients de base
    let productIngredients: any[] = [];
    
    if (product.ingredientsList && Array.isArray(product.ingredientsList)) {
      productIngredients = product.ingredientsList.map((ingName: string) => {
        const foundIng = ingredients.find(i => i.name === ingName);
        return {
          id: foundIng?.id || ingName.toLowerCase().replace(/\s+/g, '-'),
          name: ingName,
          emoji: foundIng?.emoji || '🥤',
          category: foundIng?.category || 'fruits',
          price: 0, // Ingrédients de base = 0€
          calories: foundIng?.calories || 0,
          allergens: foundIng?.allergens || []
        };
      });
    }

    console.log('🔵 INGRÉDIENTS DE BASE:', productIngredients);
    console.log('🔵 TYPE:', type);

    const cartItem = {
      id: `menu-${product.id}-${Date.now()}`,
      type: (type === 'jus' || type === 'smoothie') ? type as 'jus' | 'smoothie' : 'jus',
      size: 'medium',
      basePrice: basePrice,
      quantity: 1,
      customizations: {
        productName: product.name || t(product.nameKey || ''),
        description: product.ingredientsList?.join(', ') || ''
      },
      ingredients: [
        ...productIngredients, // Ingrédients de base (price = 0)
        ...selectedAddons // Add-ons (price > 0)
      ]
    };

    console.log('🔵 ITEM FINAL À AJOUTER:', cartItem);

    try {
      addToCart(cartItem);
      console.log('✅ AJOUT RÉUSSI');
      const productName = product.name || t(product.nameKey || '');
      toast.success(`${productName} ajouté au panier !`);
      setLocation('/panier');
    } catch (error) {
      console.error('❌ ERREUR LORS DE L\'AJOUT:', error);
      toast.error('Erreur lors de l\'ajout au panier');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow border-none">
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${displayColor} opacity-20 z-10`} />
          <img 
            src={product.image} 
            alt={displayName}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 right-3 z-20 flex gap-2">
            {displayTags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-white/90 backdrop-blur-sm text-[#004D40] font-bold shadow-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-[#004D40] font-serif">{displayName}</h3>
            <span className="text-lg font-bold text-[#FF6F00]">
              {(product.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)).toFixed(2)}€
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 flex-1 text-sm leading-relaxed">
            {displayDescription}
          </p>

          {allergens && allergens.length > 0 && (
            <div className="mb-4 pb-4 border-t pt-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Allergènes
              </p>
              <div className="flex flex-wrap gap-1">
                {allergens.map((allergen: string) => (
                  <span 
                    key={allergen}
                    className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full border border-red-200 font-medium"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          {availableAddons.length > 0 && (
            <AddOnSelector 
              addons={availableAddons} 
              onAddonsChange={setSelectedAddons}
            />
          )}
          
          <Button 
            onClick={handleAddToCartClick}
            className="w-full bg-[#004D40] hover:bg-[#00695C] text-white rounded-full group mt-4"
          >
            <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Ajouter au panier
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#004D40] mb-4 font-serif">
            {t('menu.signatureTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('menu.signatureDesc')}
          </p>
        </div>

        <Tabs defaultValue="jus" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white p-1 rounded-full shadow-md border border-gray-100">
              <TabsTrigger 
                value="jus"
                className="rounded-full px-6 py-3 data-[state=active]:bg-[#004D40] data-[state=active]:text-white transition-all"
              >
                <Leaf className="w-4 h-4 mr-2" />{t('menu.extractedJuices')}
              </TabsTrigger>
              <TabsTrigger 
                value="smoothies"
                className="rounded-full px-6 py-3 data-[state=active]:bg-[#004D40] data-[state=active]:text-white transition-all"
              >
                <Coffee className="w-4 h-4 mr-2" />{t('menu.smoothies')}
              </TabsTrigger>
              <TabsTrigger 
                value="snacks"
                className="rounded-full px-6 py-3 data-[state=active]:bg-[#004D40] data-[state=active]:text-white transition-all"
              >
                <Cookie className="w-4 h-4 mr-2" />{t('menu.snacks')}
              </TabsTrigger>
              <TabsTrigger value="boissons_chaudes">
  <Coffee className="w-4 h-4 mr-2" />{t('menu.coffeeTea')}
</TabsTrigger>
<TabsTrigger value="eau_boissons">
  <Leaf className="w-4 h-4 mr-2" />{t('menu.waterSodas')}
</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="jus" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SIGNATURE_PRODUCTS.jus.map((product) => (
                <ProductCard key={product.id} product={product} type="jus" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="smoothies" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SIGNATURE_PRODUCTS.smoothies.map((product) => (
                <ProductCard key={product.id} product={product} type="smoothie" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="snacks" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SIGNATURE_PRODUCTS.snacks.map((product) => (
                <ProductCard key={product.id} product={product} type="snack" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="boissons_chaudes" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SIGNATURE_PRODUCTS.boissons_chaudes.map((product) => (
                <ProductCard key={product.id} product={product} type="boisson_chaude" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eau_boissons" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SIGNATURE_PRODUCTS.eau_boissons.map((product) => (
                <ProductCard key={product.id} product={product} type="eau_boisson" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}