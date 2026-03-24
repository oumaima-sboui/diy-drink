import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

type ProductFormData = {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  isAvailable: boolean;
};

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    categoryId: 1,
    imageUrl: "",
    isAvailable: true,
  });

  const utils = trpc.useUtils();
  const { data: products, isLoading } = trpc.products.listAll.useQuery();
  const { data: categories } = trpc.categories.listAll.useQuery();

  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      utils.products.listAll.invalidate();
      toast.success("Produit créé avec succès");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const updateMutation = trpc.products.update.useMutation({
    onSuccess: () => {
      utils.products.listAll.invalidate();
      toast.success("Produit mis à jour avec succès");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const deleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => {
      utils.products.listAll.invalidate();
      toast.success("Produit supprimé avec succès");
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const toggleAvailabilityMutation = trpc.products.toggleAvailability.useMutation({
    onSuccess: () => {
      utils.products.listAll.invalidate();
      toast.success("Disponibilité mise à jour");
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      setLocation("/");
      toast.error("Accès refusé. Réservé aux administrateurs.");
    }
  }, [user, authLoading, setLocation]);

  const handleOpenDialog = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl || "",
        isAvailable: product.isAvailable,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: 0,
        categoryId: categories?.[0]?.id || 1,
        imageUrl: "",
        isAvailable: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateMutation.mutate(formData);
    } else {
      const { id, ...createData } = formData;
      createMutation.mutate(createData);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleToggleAvailability = (id: number, isAvailable: boolean) => {
    toggleAvailabilityMutation.mutate({ id, isAvailable: !isAvailable });
  };

  if (authLoading || !user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-20">
      {/* Header */}
      <header className="border-b border-border/40 bg-white">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary">Administration</h1>
              <p className="text-muted-foreground mt-1">Gestion du menu et des produits</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setLocation("/users")} variant="outline">
                Utilisateurs
              </Button>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Nouveau Produit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
                  <TableHead>Image</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Disponible</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products && products.length > 0 ? (
                  products.map((product) => {
                    const category = categories?.find(c => c.id === product.categoryId);
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                              N/A
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{category?.name || "—"}</TableCell>
                        <TableCell>{product.price}€</TableCell>
                        <TableCell>
                          <Switch
                            checked={product.isAvailable}
                            onCheckedChange={() =>
                              handleToggleAvailability(product.id, product.isAvailable)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialog(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      Aucun produit. Cliquez sur "Nouveau Produit" pour commencer.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Modifier le produit" : "Nouveau produit"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du produit ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Prix (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="categoryId">Catégorie *</Label>
                  <Select
                    value={formData.categoryId.toString()}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id!.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imageUrl">URL de l'image</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => setFormData({ ...formData, isAvailable: checked })}
                />
                <Label htmlFor="isAvailable">Produit disponible</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingProduct ? "Mettre à jour" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}