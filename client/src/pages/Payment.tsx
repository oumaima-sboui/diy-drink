import { useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CreditCard, Wallet, Banknote, Loader2, CheckCircle } from "lucide-react";
import Logo from "@/components/Logo";

export default function Payment() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
 const { cart, getTotalPrice, getItemTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "mobile">("card");
  const [clientInfo, setClientInfo] = useState({
    notes: "",
  });

  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiration: "",
    cvv: "",
  });

  const utils = trpc.useUtils();
  const createOrderMutation = trpc.orders.create.useMutation();
  const createPaymentMutation = trpc.payments.create.useMutation();

  // Validation de carte bancaire (simulation)
  const validateCard = (): boolean => {
    if (paymentMethod !== "card") return true;

    const cleanNumber = cardInfo.number.replace(/\s/g, '');

    if (!/^[0-9]{13,19}$/.test(cleanNumber)) {
      toast.error(t('payment.invalidCard', "Numéro de carte invalide (13-19 chiffres)"));
      return false;
    }

    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(cardInfo.expiration)) {
      toast.error(t('payment.invalidExpiration', "Date d'expiration invalide (MM/AA)"));
      return false;
    }

    if (!/^[0-9]{3,4}$/.test(cardInfo.cvv)) {
      toast.error(t('payment.invalidCvv', "CVV invalide (3-4 chiffres)"));
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error(t('payment.cartEmpty'));
      return;
    }

    if (!validateCard()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Calculer les totaux
      const subtotal = getTotalPrice();
      const tax = subtotal * 0.03;
      const total = subtotal + tax;

      console.log('🛒 CART:', cart);
      console.log('💰 SUBTOTAL:', subtotal.toFixed(2));
      console.log('💰 TAX:', tax.toFixed(2));
      console.log('💰 TOTAL:', total.toFixed(2));

      // Créer les items pour la commande
     const orderItems = cart.map((cartItem, index) => {
  const itemTotalPrice = getItemTotalPrice(cartItem);
  
  let itemDescription = '';
  
  if (cartItem.ingredients && cartItem.ingredients.length > 0) {
    const baseIngredients = cartItem.ingredients
      .filter(ing => ing.price === 0)
      .map(ing => ing.name)
      .join(', ');
    
    const addons = cartItem.ingredients
      .filter(ing => ing.price > 0)
      .map(ing => `${ing.name} (+${ing.price.toFixed(2)}€)`)
      .join(', ');
    
    itemDescription = baseIngredients;
    if (addons) {
      itemDescription += ` | Add-ons: ${addons}`;
    }
  }

  return {
    productId: index + 1,
    productName: cartItem.customizations?.productName || t(`composer.${cartItem.type}`),
    quantity: cartItem.quantity,
    price: itemTotalPrice, // ✅ Prix TOTAL (base + add-ons)
    size: cartItem.size || 'medium',
    description: itemDescription,
    ingredients: cartItem.ingredients || []
  };
});

      console.log('📦 ORDER ITEMS:', orderItems);

      // Préparer les détails pour les notes
      const cartDetails = cart.map(cartItem => {
        const productName = cartItem.customizations?.productName || t(`composer.${cartItem.type}`);
        
        if (cartItem.ingredients && cartItem.ingredients.length > 0) {
          const allIngredients = cartItem.ingredients.map(ing => ing.name).join(', ');
          return `${cartItem.quantity}x ${productName}: ${allIngredients}`;
        }
        
        return `${cartItem.quantity}x ${productName} ${cartItem.size || ''}`;
      }).join('\n');

      const fullNotes = clientInfo.notes 
        ? `${clientInfo.notes}\n\nDétails:\n${cartDetails}`
        : `Détails:\n${cartDetails}`;

      // Créer la commande
      const orderData = {
        clientName: "Client",
        clientPhone: "-",
        items: orderItems,
        totalAmount: parseFloat(total.toFixed(2)),
        notes: fullNotes
      };

      console.log('📝 ORDER DATA:', orderData);

      const orderResult = await createOrderMutation.mutateAsync(orderData);

      console.log('✅ Commande créée:', orderResult.order.orderNumber);

      // Rafraîchir la liste des commandes
      await utils.orders.list.invalidate();

      // Créer le paiement
      const paymentData = {
        orderId: orderResult.order.id!,
        amount: parseFloat(total.toFixed(2)),
        paymentMethod: paymentMethod
      };

      console.log('💳 PAYMENT DATA:', paymentData);

      await createPaymentMutation.mutateAsync(paymentData);

      console.log('✅ Paiement enregistré');

      // Simuler le traitement du paiement
      if (paymentMethod === "card") {
        console.log('💳 Simulation traitement carte...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('✅ Paiement carte validé (simulation)');
      }

      // Afficher le succès
      setPaymentSuccess(true);
      
      // Vider le panier et rediriger après 3 secondes
      setTimeout(() => {
        clearCart();
        toast.success(`${t('payment.orderCreated')} ${orderResult.order.orderNumber}`);
        setLocation('/');
      }, 3000);

    } catch (error: any) {
      console.error('❌ Erreur paiement:', error);
      toast.error(error.message || t('payment.error'));
      setIsProcessing(false);
    }
  };

  // Écran de succès
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 pt-28">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-primary mb-2">{t('payment.success')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('payment.successDesc')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('payment.redirecting')}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Si panier vide, retour au panier
  if (cart.length === 0) {
    setLocation('/panier');
    return null;
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.03;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setLocation('/panier')} className="flex items-center gap-2">
              <Logo size={32} />
              <span className="text-2xl font-bold text-primary">DIY</span>
            </button>
            <h1 className="text-2xl font-bold text-primary">{t('payment.title')}</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire Client */}
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="notes">{t('payment.notes')}</Label>
                  <textarea
                    id="notes"
                    value={clientInfo.notes}
                    onChange={(e) => setClientInfo({ notes: e.target.value })}
                    placeholder={t('payment.notesPlaceholder')}
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40] resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('payment.method')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        {t('payment.card')}
                      </div>
                    </SelectItem>
                    <SelectItem value="mobile">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        {t('payment.mobile')}
                      </div>
                    </SelectItem>
                    <SelectItem value="cash">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4" />
                        {t('payment.cash')}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      💳 {t('payment.testCard', 'Mode test - Utilisez : 4242 4242 4242 4242')}
                    </p>
                    <div className="space-y-2">
                      <Label>{t('payment.cardNumber')}</Label>
                      <Input 
                        placeholder="4242 4242 4242 4242"
                        value={cardInfo.number}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\s/g, '');
                          value = value.match(/.{1,4}/g)?.join(' ') || value;
                          setCardInfo({...cardInfo, number: value});
                        }}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('payment.expiration')}</Label>
                        <Input 
                          placeholder="12/25"
                          value={cardInfo.expiration}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setCardInfo({...cardInfo, expiration: value});
                          }}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('payment.cvv')}</Label>
                        <Input 
                          placeholder="123" 
                          type="password" 
                          maxLength={4}
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value.replace(/\D/g, '')})}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "mobile" && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      📱 {t('payment.mobileInfo', 'Paiement mobile via Apple Pay, Google Pay, etc.')}
                    </p>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      💵 {t('payment.cashInfo', 'Vous paierez en espèces à la livraison')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Récapitulatif */}
          <div>
            <Card className="sticky top-28">
              <CardHeader>
                <CardTitle>{t('payment.summary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((cartItem) => (
                    <div key={cartItem.id} className="pb-3 border-b">
                    <div className="flex justify-between text-sm mb-1">
  <span className="font-medium text-gray-700">
    {cartItem.quantity}x {cartItem.customizations?.productName || t(`composer.${cartItem.type}`)}
  </span>
  <span className="font-semibold text-[#004D40]">
    {(getItemTotalPrice(cartItem) * cartItem.quantity).toFixed(2)}€
  </span>
</div>
                      {cartItem.size && (
                        <p className="text-xs text-gray-500">{cartItem.size}</p>
                      )}
                      {cartItem.ingredients && cartItem.ingredients.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-600">
                            {cartItem.ingredients
                              .filter(ing => ing.price === 0)
                              .map(ing => ing.name)
                              .join(', ')}
                          </p>
                          {cartItem.ingredients.some(ing => ing.price > 0) && (
                            <p className="text-xs text-[#FF6F00] mt-1">
                              + {cartItem.ingredients
                                .filter(ing => ing.price > 0)
                                .map(ing => `${ing.name} (+${ing.price.toFixed(2)}€)`)
                                .join(', ')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{t('cart.tax')} (3%)</span>
                    <span>{tax.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-primary border-t pt-2">
                    <span>{t('cart.total')}</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-[#FF6F00] hover:bg-[#E65100] text-white py-6 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t('payment.processing')}
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      {t('payment.pay')} {total.toFixed(2)}€
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  🔒 {t('payment.secure')}
                </p>

                {paymentMethod === "card" && (
                  <p className="text-xs text-center text-orange-600">
                    ⚠️ {t('payment.testMode', 'Mode test - Aucun paiement réel ne sera effectué')}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}