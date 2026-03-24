import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { teaDrinks, sodaDrinks } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import type { ClassicDrink } from '@/lib/types';

export default function TheBoissons() {
  const { t } = useTranslation();
  const { getTotalItems, addToCart } = useCart();

  const handleAddToCart = (drink: ClassicDrink) => {
    addToCart({
      id: `drink-${Date.now()}`,
      type: 'classique',
      basePrice: drink.price,
      classicDrink: drink,
      quantity: 1,
    });
    toast.success(`${drink.name} ajouté au panier !`);
  };

  const renderDrinkCard = (drink: ClassicDrink) => {
    return (
      <Card
        key={drink.id}
        className="cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-[#7CB342]"
        onClick={() => handleAddToCart(drink)}
      >
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">{drink.icon}</div>
          <h3 className="text-lg font-bold mb-2 text-[#004D40]">{drink.name}</h3>
          {drink.size && (
            <p className="text-xs text-gray-500 mb-2">{drink.size}</p>
          )}
          <Badge className="bg-[#7CB342] text-white text-lg px-4 py-1">
            {drink.price.toFixed(2)}€
          </Badge>
          <div className="mt-4">
            <Button
              className="w-full bg-[#FF6F00] hover:bg-[#E65100] text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(drink);
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] botanical-pattern">
      <header className="bg-white border-b-2 border-[#E5E5E5] sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Button variant="ghost" className="text-[#004D40]" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-[#004D40]">Thé & Boissons Gazeuses</h1>
          <Button variant="outline" className="border-2 border-[#004D40] text-[#004D40]" asChild>
            <Link href="/panier">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Panier ({getTotalItems()})
            </Link>
          </Button>
        </div>
      </header>

      <div className="container py-8 max-w-7xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl">🍵</div>
            <div>
              <h2 className="text-3xl font-bold text-[#004D40]">Thés & Infusions</h2>
              <p className="text-gray-600">Sélection de thés et infusions bio</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teaDrinks.map(renderDrinkCard)}
          </div>
        </div>

        <div className="border-4 border-[#FF6F00] rounded-xl p-8 bg-gradient-to-br from-[#FFF3E0] to-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl">🥤</div>
            <div>
              <h2 className="text-3xl font-bold text-[#004D40]">Boissons Gazeuses</h2>
              <p className="text-gray-600">Les grands classiques rafraîchissants</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sodaDrinks.map(renderDrinkCard)}
          </div>
        </div>
      </div>
    </div>
  );
}
