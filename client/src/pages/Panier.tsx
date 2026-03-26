import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { analyzeTaste, TasteWarning } from '@/lib/tasteWarnings';
import TasteWarningDialog from '@/components/TasteWarningDialog';
import { toast } from 'sonner';

export default function Panier() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getItemTotalPrice, updateCartItemIngredients, updateCartItemPrice } = useCart();
  
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [tasteWarnings, setTasteWarnings] = useState<TasteWarning[]>([]);

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  useEffect(() => {
    if (showWarningDialog && cart.length > 0) {
      let allWarnings: TasteWarning[] = [];
      
      cart.forEach(item => {
        if (item.ingredients && item.ingredients.length > 0) {
          const warnings = analyzeTaste(item.ingredients);
          allWarnings = [...allWarnings, ...warnings];
        }
      });

      const uniqueWarnings = allWarnings.reduce((acc: TasteWarning[], current) => {
        const exists = acc.find(w => w.type === current.type && w.titleKey === current.titleKey);
        if (!exists) {
          return [...acc, current];
        } else {
          exists.ingredients = [...new Set([...exists.ingredients, ...current.ingredients])];
          return acc;
        }
      }, []);

      if (uniqueWarnings.length === 0) {
        setShowWarningDialog(false);
      } else {
        setTasteWarnings(uniqueWarnings);
      }
    } else if (showWarningDialog && cart.length === 0) {
      setShowWarningDialog(false);
    }
  }, [cart, showWarningDialog]);

  const handleCheckout = () => {
    let allWarnings: TasteWarning[] = [];

    cart.forEach(item => {
      if (item.ingredients && item.ingredients.length > 0) {
        const warnings = analyzeTaste(item.ingredients);
        allWarnings = [...allWarnings, ...warnings];
      }
    });

    const uniqueWarnings = allWarnings.reduce((acc: TasteWarning[], current) => {
      const exists = acc.find(w => 
        w.type === current.type && 
        w.titleKey === current.titleKey
      );
      if (!exists) {
        return [...acc, current];
      } else {
        exists.ingredients = [...new Set([...exists.ingredients, ...current.ingredients])];
        return acc;
      }
    }, []);

    if (uniqueWarnings.length > 0) {
      setTasteWarnings(uniqueWarnings);
      setShowWarningDialog(true);
    } else {
      setLocation('/payment');
    }
  };

  const handleContinueToPayment = () => {
    setShowWarningDialog(false);
    setLocation('/payment');
  };

  const handleGoBackToModify = () => {
    setShowWarningDialog(false);
  };

  const handleRemoveIngredient = (ingredientName: string) => {
    let somethingChanged = false;

    cart.forEach(item => {
      if (item.customizations?.productName === ingredientName && !item.ingredients) {
        removeFromCart(item.id);
        somethingChanged = true;
        return;
      }

      if (item.ingredients && item.ingredients.length > 0) {
        const hasIngredient = item.ingredients.some(ing => ing.name === ingredientName);
        
        if (hasIngredient) {
          if (item.ingredients.length === 1) {
            removeFromCart(item.id);
            somethingChanged = true;
          } else {
            const updatedIngredients = item.ingredients.filter(
              ing => ing.name !== ingredientName
            );
            
            const removedIngredient = item.ingredients.find(ing => ing.name === ingredientName);
            
            // Si c'est un add-on (price > 0), on le retire du basePrice
            if (removedIngredient && removedIngredient.price > 0) {
              const newBasePrice = item.basePrice; // basePrice ne change PAS
              updateCartItemIngredients(item.id, updatedIngredients);
            } else {
              // Si c'est un ingrédient de base, juste retirer de la liste
              updateCartItemIngredients(item.id, updatedIngredients);
            }
            
            somethingChanged = true;
          }
        }
      }
    });

    if (somethingChanged) {
      toast.success(`${ingredientName} ${t('taste.warning.removed')}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] botanical-pattern pt-28">
        <header className="bg-white border-b-2 border-[#E5E5E5]">
          <div className="container py-4 flex items-center justify-between">
            <Button variant="ghost" className="text-[#004D40]" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('cart.back')}
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-[#004D40]">{t('cart.title')}</h1>
            <div className="w-24"></div>
          </div>
        </header>

        <div className="container py-16 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold mb-4 text-[#004D40]">{t('cart.empty')}</h2>
          <p className="text-gray-600 mb-8">{t('cart.emptyDesc')}</p>
          <Button className="bg-[#FF6F00] hover:bg-[#E65100] text-white" size="lg" asChild>
            <Link href="/composer">
              {t('cart.compose')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.03;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#FAF8F3] botanical-pattern pt-28">
      <header className="bg-white border-b-2 border-[#E5E5E5]">
        <div className="container py-4 flex items-center justify-between">
          <Button variant="ghost" className="text-[#004D40]" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('cart.back')}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-[#004D40]">
            {t('cart.title')} ({getTotalItems()})
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        <div className="space-y-4 mb-8">
          {cart.map((item) => {
            const itemTotal = getItemTotalPrice(item);
       
            return (
              <Card key={item.id} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#004D40] text-lg">
                        {item.customizations?.productName || t(`composer.${item.type}`)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.size && `${item.size} • `}
                        {item.ingredients && item.ingredients.length > 0 && (
                          <>
                            {item.ingredients
                              .filter(ing => ing.price === 0) 
                              .map(ing => ing.name)
                              .join(', ')}
                          </>
                        )}
                      </p>
                      
                      {/* Add-ons */}

                      {item.ingredients && item.ingredients.filter(ing => ing.price > 0).length > 0 && (
                        <div className="mt-2 mb-3">
                          <p className="text-xs font-semibold text-[#FF6F00] mb-1">⚡ Add-ons:</p>
                          <div className="space-y-1">
                            
                            {item.ingredients
                              .filter(ing => ing.price > 0)
                              .map((addon, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-[#FF6F00]/10 px-2 py-1 rounded">
                                  <span className="text-xs font-medium text-[#FF6F00]">
                                    {addon.emoji} {t(addon.nameKey)}
                                  </span>
                                  <span className="text-xs font-bold text-[#FF6F00]">
                                    +{addon.price.toFixed(2)}€
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Prix unitaire et total */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Prix unitaire:</span>
                          <span className="font-semibold text-[#004D40]">
                            {itemTotal.toFixed(2)}€
                          </span>
                        </div>
                        {item.quantity > 1 && (
                          <div className="flex justify-between items-center text-sm mt-1">
                            <span className="text-gray-600">Total ({item.quantity}x):</span>
                            <span className="font-bold text-[#FF6F00]">
                              {(itemTotal * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#FF6F00]">
                          {(itemTotal * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-4 border-[#004D40] shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-[#004D40]">{t('cart.summary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-lg">
                <span>{t('cart.subtotal')}</span>
                <span className="font-semibold">{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>{t('cart.tax')} (3%)</span>
                <span className="font-semibold">{tax.toFixed(2)}€</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-2xl font-bold text-[#004D40]">
                <span>{t('cart.total')}</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>

            <Button 
              className="w-full bg-[#FF6F00] hover:bg-[#E65100] text-white text-lg py-6" 
              size="lg"
              onClick={handleCheckout}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('cart.checkout')}
            </Button>

            <Button variant="outline" className="w-full mt-3 border-2 border-[#004D40] text-[#004D40]" asChild>
              <Link href="/composer">
                {t('cart.addMore')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <TasteWarningDialog
        open={showWarningDialog}
        warnings={tasteWarnings}
        onContinue={handleContinueToPayment}
        onGoBack={handleGoBackToModify}
        onRemoveIngredient={handleRemoveIngredient}
      />
    </div>
  );
}