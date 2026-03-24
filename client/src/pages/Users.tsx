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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { Shield, UserCog, User, Plus } from "lucide-react";

const ROLE_LABELS = {
  admin: "Administrateur",
  worker: "Travailleur",
  client: "Client",
};

const ROLE_ICONS = {
  admin: Shield,
  worker: UserCog,
  client: User,
};

type UserFormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "worker" | "client";
};

export default function Users() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "client",
  });

  const utils = trpc.useUtils();
  const { data: users, isLoading } = trpc.users.list.useQuery();

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      utils.users.list.invalidate();
      toast.success("Utilisateur créé avec succès");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const updateRoleMutation = trpc.users.updateRole.useMutation({
    onSuccess: () => {
      utils.users.list.invalidate();
      toast.success("Rôle mis à jour avec succès");
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const toggleActiveMutation = trpc.users.toggleActive.useMutation({
    onSuccess: () => {
      utils.users.list.invalidate();
      toast.success("Statut mis à jour avec succès");
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      setLocation("/");
      toast.error("Accès refusé. Réservé aux administrateurs.");
    }
  }, [user, authLoading, setLocation]);

  const handleOpenDialog = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "client",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handleRoleChange = (userId: number, newRole: "admin" | "worker" | "client") => {
    if (confirm(`Êtes-vous sûr de vouloir changer le rôle de cet utilisateur ?`)) {
      updateRoleMutation.mutate({ userId, role: newRole });
    }
  };

  const handleToggleActive = (userId: number, currentStatus: boolean) => {
    toggleActiveMutation.mutate({ userId, isActive: !currentStatus });
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
              <h1 className="text-3xl font-serif font-bold text-primary">
                Gestion des Utilisateurs
              </h1>
              <p className="text-muted-foreground mt-1">
                Gérer les rôles et permissions
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setLocation("/admin")} variant="outline">
                Retour aux Produits
              </Button>
              <Button onClick={handleOpenDialog} className="gap-2">
                <Plus className="w-4 h-4" />
                Nouvel Utilisateur
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
            {/* Stats Header */}
            <div className="p-6 border-b border-border/40">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>{users?.filter(u => u.role === "admin").length || 0} Admins</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCog className="w-4 h-4 text-blue-500" />
                  <span>{users?.filter(u => u.role === "worker").length || 0} Travailleurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{users?.filter(u => u.role === "client").length || 0} Clients</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Actif</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.length > 0 ? (
                  users.map((u) => {
                    const RoleIcon = ROLE_ICONS[u.role as keyof typeof ROLE_ICONS];
                    return (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <RoleIcon className="w-4 h-4" />
                            {u.name}
                          </div>
                        </TableCell>
                        <TableCell>{u.email || "—"}</TableCell>
                        <TableCell>{u.phone || "—"}</TableCell>
                        <TableCell>
                          <Select
                            value={u.role || "client"}
                            onValueChange={(value: "admin" | "worker" | "client") =>
                              handleRoleChange(u.id!, value)
                            }
                            disabled={u.id === user.id}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4" />
                                  Administrateur
                                </div>
                              </SelectItem>
                              <SelectItem value="worker">
                                <div className="flex items-center gap-2">
                                  <UserCog className="w-4 h-4" />
                                  Travailleur
                                </div>
                              </SelectItem>
                              <SelectItem value="client">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  Client
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{u.loginMethod || "oauth"}</Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={u.isActive || false}
                            onCheckedChange={() => handleToggleActive(u.id!, u.isActive || false)}
                            disabled={u.id === user.id}
                          />
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {u.lastSignedIn
                            ? new Date(
                                typeof u.lastSignedIn === "number"
                                  ? u.lastSignedIn * 1000
                                  : u.lastSignedIn
                              ).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Jamais"}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      Aucun utilisateur trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Add User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nouvel Utilisateur</DialogTitle>
            <DialogDescription>
              Créer un nouveau compte utilisateur
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="jean@exemple.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  placeholder="Au moins 6 caractères"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+352 123 456 789"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Rôle *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: "admin" | "worker" | "client") =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Client
                      </div>
                    </SelectItem>
                    <SelectItem value="worker">
                      <div className="flex items-center gap-2">
                        <UserCog className="w-4 h-4" />
                        Travailleur
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Administrateur
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Annuler
              </Button>
              <Button type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "Création..." : "Créer l'utilisateur"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}