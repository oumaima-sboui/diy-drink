import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { Eye } from "lucide-react";

const STATUS_LABELS = {
  pending_payment: "En attente de paiement",
  paid: "Payée",
  preparing: "En préparation",
  ready: "Prête",
  completed: "Terminée",
  cancelled: "Annulée",
};

const STATUS_COLORS = {
  pending_payment: "secondary",
  paid: "default",
  preparing: "default",
  ready: "default",
  completed: "default",
  cancelled: "destructive",
} as const;

export default function Workers() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const utils = trpc.useUtils();
  const { data: orders, isLoading } = trpc.orders.list.useQuery();

  const updateStatusMutation = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      utils.orders.list.invalidate();
      toast.success("Statut mis à jour avec succès");
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  useEffect(() => {
    if (!authLoading && (!user || (user.role !== "worker" && user.role !== "admin"))) {
      setLocation("/");
      toast.error("Accès refusé. Réservé aux travailleurs.");
    }
  }, [user, authLoading, setLocation]);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    updateStatusMutation.mutate({
      orderId,
      status: newStatus as any,
    });
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  if (authLoading || !user || (user.role !== "worker" && user.role !== "admin")) {
    return null;
  }

  const stats = {
    pending: orders?.filter(o => o.status === "pending_payment").length || 0,
    paid: orders?.filter(o => o.status === "paid").length || 0,
    preparing: orders?.filter(o => o.status === "preparing").length || 0,
    ready: orders?.filter(o => o.status === "ready").length || 0,
    completed: orders?.filter(o => o.status === "completed").length || 0,
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-20">
        <div className="container mx-auto px-4 max-w-6xl"> 
      <header className="border-b border-border/40 bg-white">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary">
                Gestion des Commandes
              </h1>
              <p className="text-muted-foreground mt-1">
                Suivre et traiter les commandes
              </p>
            </div>
            {user.role === "admin" && (
              <Button onClick={() => setLocation("/admin")} variant="outline">
                Retour Admin
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="border-b border-border/40 bg-white">
        <div className="container py-4">
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-muted-foreground">En attente: <strong>{stats.pending}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground">Payées: <strong>{stats.paid}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-muted-foreground">En préparation: <strong>{stats.preparing}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-muted-foreground">Prêtes: <strong>{stats.ready}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-muted-foreground">Terminées: <strong>{stats.completed}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <main className="container py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-border/40 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Commande</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders && orders.length > 0 ? (
                  orders
                    .sort((a, b) => {
                      const dateA = typeof a.createdAt === 'number' ? a.createdAt : new Date(a.createdAt).getTime();
                      const dateB = typeof b.createdAt === 'number' ? b.createdAt : new Date(b.createdAt).getTime();
                      return dateB - dateA;
                    })
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell className="font-semibold text-lg">
                         {parseFloat(order.totalAmount).toFixed(2)}€
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status || "pending_payment"}
                            onValueChange={(value) => handleStatusChange(order.id!, value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending_payment">En attente de paiement</SelectItem>
                              <SelectItem value="paid">Payée</SelectItem>
                              <SelectItem value="preparing">En préparation</SelectItem>
                              <SelectItem value="ready">Prête</SelectItem>
                              <SelectItem value="completed">Terminée</SelectItem>
                              <SelectItem value="cancelled">Annulée</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(
                            typeof order.createdAt === "number"
                              ? order.createdAt * 1000
                              : order.createdAt
                          ).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(order)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      Aucune commande pour le moment.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Détails de la commande {selectedOrder?.orderNumber}
            </DialogTitle>
            <DialogDescription>
              Informations complètes de la commande
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Statut</p>
                  <Badge variant={STATUS_COLORS[selectedOrder.status as keyof typeof STATUS_COLORS]}>
                    {STATUS_LABELS[selectedOrder.status as keyof typeof STATUS_LABELS]}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                 <p className="font-semibold text-lg">{parseFloat(selectedOrder.totalAmount).toFixed(2)}€</p>
                </div>
              </div>

              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                <div>
                  <p className="font-bold text-lg text-[#004D40] mb-4">🛒 Articles de la commande</p>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item: any, idx: number) => {
                      const basePrice = item.price || 0;
                      const addonsPrice = item.ingredients
                        ?.filter((ing: any) => ing.price > 0)
                        .reduce((sum: number, ing: any) => sum + ing.price, 0) || 0;
                      const itemTotal = (basePrice + addonsPrice) * item.quantity;

                      return (
                        <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <p className="font-bold text-[#004D40] text-lg">
                                {item.productName || item.type}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {item.size && `${item.size} • `}
                                Quantité: {item.quantity}
                              </p>
                            </div>
                            <p className="font-bold text-[#FF6F00] text-xl ml-4">
                              {itemTotal.toFixed(2)}€
                            </p>
                          </div>

                          {item.ingredients && item.ingredients.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-semibold text-gray-600 mb-2">
                                📋 Composition:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {item.ingredients
                                  .filter((ing: any) => ing.price === 0)
                                  .map((ing: any, i: number) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                      {ing.emoji} {ing.name}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          )}

                          {item.ingredients && item.ingredients.some((ing: any) => ing.price > 0) && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs font-semibold text-[#FF6F00] mb-2">
                                ⚡ Add-ons:
                              </p>
                              <div className="space-y-2">
                                {item.ingredients
                                  .filter((ing: any) => ing.price > 0)
                                  .map((addon: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between bg-[#FF6F00]/10 px-3 py-2 rounded-lg">
                                      <span className="text-sm font-medium text-[#FF6F00]">
                                        {addon.emoji} {addon.name}
                                      </span>
                                      <span className="text-sm font-bold text-[#FF6F00]">
                                        +{addon.price.toFixed(2)}€
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : selectedOrder.notes ? (
                <div>
                  <p className="font-medium mb-2 text-[#004D40]">📝 Notes</p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedOrder.notes}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun détail disponible
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  </div>
  );
}