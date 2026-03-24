import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Droplet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function EauBoissons() {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const EAU_BOISSONS = [
    {
      id: 'eau-plate',
      name: t('menu.stillWater'),
      description: t('menu.stillWaterDesc'),
      price: 1.50,
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500",
      tags: ["Eau", "Naturelle"],
      color: "from-blue-300 to-cyan-400"
    },
    {
      id: 'eau-gazeuse',
      name: t('menu.sparklingWater'),
      description: t('menu.sparklingWaterDesc'),
      price: 1.80,
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500",
      tags: ["Eau", "Gazeuse"],
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: 'eau-citron',
      name: t('menu.lemonWater'),
      description: t('menu.lemonWaterDesc'),
      price: 2.50,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
      tags: ["Eau", "Citron"],
      color: "from-yellow-300 to-lime-400"
    },
    {
      id: 'eau-menthe',
      name: t('menu.mintWater'),
      description: t('menu.mintWaterDesc'),
      price: 2.50,
      image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=500",
      tags: ["Eau", "Menthe"],
      color: "from-green-300 to-emerald-400"
    },
    {
      id: 'the-glace',
      name: t('menu.icedTea'),
      description: t('menu.icedTeaDesc'),
      price: 3.50,
      image: "https://images.unsplash.com/photo-1499638309848-e9968540da83?w=500",
      tags: ["Frais", "Thé"],
      color: "from-amber-400 to-orange-500"
    },
    {
      id: 'limonade',
      name: t('menu.lemonade'),
      description: t('menu.lemonadeDesc'),
      price: 3.80,
      image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=500",
      tags: ["Frais", "Artisanal"],
      color: "from-yellow-400 to-amber-500"
    },
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: `eau-boisson-${product.id}-${Date.now()}`,
      type: 'eau_boisson' as any,
      size: 'moyen',
      basePrice: product.price,
      quantity: 1,
      customizations: {
        description: product.description,
        productName: product.name
      },
      ingredients: [{
        id: product.id,
        name: product.name,
        emoji: '💧',
        category: 'bases',
        price: 0,
        calories: 0,
        allergens: []
      }]
    });
    toast.success(`${product.name} ${t('menu.addedToCart')}`);
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
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
            <h3 className="text-xl font-bold text-[#004D40] font-serif">{product.name}</h3>
            <span className="text-lg font-bold text-[#FF6F00]">{product.price.toFixed(2)}€</span>
          </div>
          
          <p className="text-gray-600 mb-6 flex-1 text-sm leading-relaxed">
            {product.description}
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
          <Droplet className="w-16 h-16 mx-auto mb-4 text-[#004D40]" />
          <h1 className="text-5xl font-bold text-[#004D40] mb-4 font-serif">
            {t('menu.waterDrinks')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hydratation pure et boissons fraîches naturelles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EAU_BOISSONS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}