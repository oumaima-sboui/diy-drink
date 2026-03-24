import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { classicCoffees, signatureCoffees } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import type { CoffeeItem } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllergenIcons } from '@/lib/helpers';

export default function Cafes() {
  const { t } = useTranslation();
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);
  const { getTotalItems, addToCart } = useCart();

  const handleAddToCart = (coffee: CoffeeItem) => {
    addToCart({
      id: `cafe-${Date.now()}`,
      type: 'cafe',
      basePrice: coffee.basePrice,
      coffee,
      quantity: 1,
    });
    toast.success(`${coffee.name} ajouté au panier !`);
    setSelectedCoffee(null);
  };

  const renderCoffeeCard = (coffee: CoffeeItem) => {
    return (
      <Card
        key={coffee.id}
        className="cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-[#D4AF37]"
        onClick={() => setSelectedCoffee(coffee)}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-[#004D40]">{coffee.name}</h3>
            <Badge className="bg-[#D4AF37] text-white text-lg px-3 py-1">
              {coffee.basePrice.toFixed(2)}€
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4">{coffee.description}</p>
          
          {coffee.allergens && coffee.allergens.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-orange-600 cursor-help">
                      <Info className="h-4 w-4" />
                      <span className="text-xs font-semibold">Allergènes</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold mb-1">Allergènes présents :</p>
                    <p className="text-sm">{coffee.allergens.join(', ')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-lg">{getAllergenIcons(coffee.allergens)}</span>
            </div>
          )}

          <Button
            className="w-full bg-[#FF6F00] hover:bg-[#E65100] text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(coffee);
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
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
          <h1 className="text-3xl font-bold text-[#004D40]">Cafés</h1>
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
            <div className="text-5xl">☕</div>
            <div>
              <h2 className="text-3xl font-bold text-[#004D40]">Cafés Classiques</h2>
              <p className="text-gray-600">Nos grands classiques préparés avec soin</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classicCoffees.map(renderCoffeeCard)}
          </div>
        </div>

        <div className="border-4 border-[#D4AF37] rounded-xl p-8 bg-gradient-to-br from-[#FFF9E6] to-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl">✨</div>
            <div>
              <h2 className="text-3xl font-bold text-[#004D40]">Cafés Signatures DIY</h2>
              <p className="text-gray-600">Nos créations originales et exclusives</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {signatureCoffees.map(renderCoffeeCard)}
          </div>
        </div>
      </div>
    </div>
  );
}
