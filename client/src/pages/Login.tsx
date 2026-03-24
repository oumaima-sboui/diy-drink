import { useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const utils = trpc.useUtils();

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      toast.success(`${t('auth.welcome')} ${data.user.name} !`);
      utils.auth.me.invalidate();
      
      if (data.user.role === "admin") {
        setLocation("/admin");
      } else if (data.user.role === "worker") {
        setLocation("/workers");
      } else {
        setLocation("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      toast.success(`${t('auth.welcome')} ${data.user.name} !`);
      utils.auth.me.invalidate();
      
      if (data.user.role === "admin") {
        setLocation("/admin");
      } else if (data.user.role === "worker") {
        setLocation("/workers");
      } else {
        setLocation("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    registerMutation.mutate(registerData);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    loginMutation.mutate(loginData);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-primary mb-2">DIY Drink Eat Yourserf</h1>
          <p className="text-muted-foreground">{t('hero.tagline', 'L\'Art du Végétal')}</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
            <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>
          </TabsList>

          {/* TAB CONNEXION */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.login')}</CardTitle>
                <CardDescription>
                  {t('auth.loginToAccount')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t('auth.email')}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={t('auth.email')}
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t('auth.password')}</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('common.loading')}...
                      </>
                    ) : (
                      t('auth.signIn')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB INSCRIPTION */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.register')}</CardTitle>
                <CardDescription>
                  {t('auth.createAccount')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">{t('auth.name')}</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder={t('auth.name')}
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, name: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t('auth.email')}</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder={t('auth.email')}
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t('auth.password')}</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                      }
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                    <p className="text-xs text-muted-foreground">
                      {t('auth.passwordMin')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">{t('auth.phoneOptional')}</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="+352 123 456 789"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, phone: e.target.value })
                      }
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('common.loading')}...
                      </>
                    ) : (
                      t('auth.signUp')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="text-muted-foreground hover:text-primary"
          >
            ← {t('auth.backHome')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}