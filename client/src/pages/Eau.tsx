import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { waterDrinks } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import type { ClassicDrink } from '@/lib/types';

export default function Eau() {
  const { t } = useTranslation();
  const { getTotalItems, addToCart } = useCart();

  const handleAddToCart = (drink: ClassicDrink) => {
    addToCart({
      id: `water-${Date.now()}`,
      type: 'classique',
      basePrice: drink.price,
      classicDrink: drink,
      quantity: 1,
    });
    toast.success(`${drink.name} ${t('common.addedToCart')}`);
  };

  const renderWaterCard = (drink: ClassicDrink) => {
    return (
      <Card
        key={drink.id}
        className="cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-[#7CB342]"
        onClick={() => handleAddToCart(drink)}
      >
        <CardContent className="p-8 text-center">
          <div className="text-7xl mb-4">{drink.icon}</div>
          <h3 className="text-xl font-bold mb-1 text-[#004D40]">{drink.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{drink.size}</p>
          <Badge className="bg-[#7CB342] text-white text-xl px-5 py-2">
            {drink.price.toFixed(2)}€
          </Badge>
          <div className="mt-6">
            <Button
              className="w-full bg-[#FF6F00] hover:bg-[#E65100] text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(drink);
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t('common.addToCart')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] botanical-pattern pt-20">
      <header className="bg-white border-b-2 border-[#E5E5E5] fixed top-0 left-0 right-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Button variant="ghost" className="text-[#004D40]" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back')}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-[#004D40]">{t('water.title')}</h1>
          <Button variant="outline" className="border-2 border-[#004D40] text-[#004D40]" asChild>
            <Link href="/panier">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t('nav.cart')} ({getTotalItems()})
            </Link>
          </Button>
        </div>
      </header>

      <div className="container py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">💧</div>
          <h2 className="text-4xl font-bold text-[#004D40] mb-3">{t('water.mineralWater')}</h2>
          <p className="text-lg text-gray-600">{t('water.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {waterDrinks.map(renderWaterCard)}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#E8F5E9] to-[#E0F2F1] p-8 rounded-xl border-2 border-[#7CB342]">
          <h3 className="text-2xl font-bold text-[#004D40] mb-3">{t('water.hydrationTitle')}</h3>
          <p className="text-gray-700 leading-relaxed">
            {t('water.hydrationDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}