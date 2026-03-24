import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Coffee } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BoissonsChauds() {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const BOISSONS_CHAUDES = [
    {
      id: 'cafe-espresso',
      nameKey: 'menu.espresso',
      descKey: 'menu.espressoDesc',
      price: 2.50,
      image: "/images/coffees/coffee_1_espresso.png",
      tags: ["Café", "Intense"],
      color: "from-amber-900 to-orange-800"
    },
    {
      id: 'cafe-doppio',
      nameKey: 'menu.doppio',
      descKey: 'menu.doppioDesc',
      price: 3.00,
      image: "/images/coffees/coffee_2_doppio.png",
      tags: ["Café", "Double"],
      color: "from-amber-900 to-brown-900"
    },
    {
      id: 'cafe-americano',
      nameKey: 'menu.americano',
      descKey: 'menu.americanoDesc',
      price: 2.80,
      image: "/images/coffees/coffee_3_americano.png",
      tags: ["Café", "Allongé"],
      color: "from-amber-900 to-orange-900"
    },
    {
      id: 'cafe-creme',
      nameKey: 'menu.cafeCreme',
      descKey: 'menu.cafeCremeDesc',
      price: 3.20,
      image: "/images/coffees/coffee_4_cafe_creme.png",
      tags: ["Café", "Crémeux"],
      color: "from-amber-700 to-orange-600"
    },
    {
      id: 'cafe-ristretto',
      nameKey: 'menu.ristretto',
      descKey: 'menu.ristrettoDesc',
      price: 2.50,
      image: "/images/coffees/coffee_5_ristretto.png",
      tags: ["Café", "Court"],
      color: "from-amber-900 to-red-900"
    },
    {
      id: 'cafe-cappuccino',
      nameKey: 'menu.cappuccino',
      descKey: 'menu.cappuccinoDesc',
      price: 3.50,
      image: "/images/coffees/coffee_6_cappuccino.png",
      tags: ["Café", "Onctueux"],
      color: "from-amber-700 to-orange-600"
    },
    {
      id: 'cafe-lait-russe',
      nameKey: 'menu.laitRusse',
      descKey: 'menu.laitRusseDesc',
      price: 4.20,
      image: "/images/coffees/coffee_7_lait_russe.png",
      tags: ["Café", "Traditionnel"],
      color: "from-amber-600 to-orange-500"
    },
    {
      id: 'cafe-flatwhite',
      nameKey: 'menu.flatWhite',
      descKey: 'menu.flatWhiteDesc',
      price: 3.90,
      image: "/images/coffees/coffee_8_flat_white.png",
      tags: ["Café", "Velouté"],
      color: "from-amber-800 to-orange-700"
    },
    {
      id: 'cafe-latte',
      nameKey: 'menu.latte',
      descKey: 'menu.latteDesc',
      price: 3.80,
      image: "/images/coffees/coffee_9_latte.png",
      tags: ["Café", "Doux"],
      color: "from-amber-600 to-orange-500"
    },
    {
      id: 'cafe-macchiato',
      nameKey: 'menu.macchiato',
      descKey: 'menu.macchiatoDesc',
      price: 3.20,
      image: "/images/coffees/coffee_10_macchiato.png",
      tags: ["Café", "Marqué"],
      color: "from-amber-900 to-orange-800"
    },
    {
      id: 'cafe-iced-latte',
      nameKey: 'menu.icedLatte',
      descKey: 'menu.icedLatteDesc',
      price: 4.20,
      image: "/images/coffees/coffee_11_iced_latte.png",
      tags: ["Café", "Glacé"],
      color: "from-blue-400 to-amber-500"
    },
    {
      id: 'cafe-cold-brew',
      nameKey: 'menu.coldBrew',
      descKey: 'menu.coldBrewDesc',
      price: 4.50,
      image: "/images/coffees/coffee_12_cold_brew.png",
      tags: ["Café", "Infusion"],
      color: "from-amber-900 to-gray-800"
    },
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: `boisson-chaude-${product.id}-${Date.now()}`,
      type: 'boisson_chaude' as any,
      size: 'moyen',
      basePrice: product.price,
      quantity: 1,
      customizations: {
        description: t(product.descKey),
        productName: t(product.nameKey)
      },
      ingredients: [{
        id: product.id,
        name: t(product.nameKey),
        emoji: '☕',
        category: 'bases',
        price: 0,
        calories: 0,
        allergens: []
      }]
    });
    toast.success(`${t(product.nameKey)} ${t('menu.addedToCart')}`);
  };

  const ProductCard = ({ product }: { product: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow border-none">
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20 z-10`} />
<img 
  src={product.image} 
  alt={t(product.nameKey)}
  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 scale-75"
/>
          <div className="absolute top-3 right-3 z-20 flex gap-2">
            {product.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-white/90 backdrop-blur-sm text-[#004D40] font-bold shadow-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-[#004D40] font-serif">{t(product.nameKey)}</h3>
            <span className="text-lg font-bold text-[#FF6F00]">{product.price.toFixed(2)}€</span>
          </div>
          
          <p className="text-gray-600 mb-6 flex-1 text-sm leading-relaxed">
            {t(product.descKey)}
          </p>
          
          <Button 
            onClick={() => handleAddToCart(product)}
            className="w-full bg-[#004D40] hover:bg-[#00695C] text-white rounded-full group"
          >
            <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            {t('menu.addToCart')}
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Coffee className="w-16 h-16 mx-auto mb-4 text-[#004D40]" />
          <h1 className="text-5xl font-bold text-[#004D40] mb-4 font-serif">
            {t('menu.hotDrinks')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cafés d'exception pour moments réconfortants
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BOISSONS_CHAUDES.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}