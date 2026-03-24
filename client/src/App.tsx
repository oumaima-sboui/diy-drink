import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import BackButton from "./components/BackButton";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Composer from "./pages/Composer";
import Menu from "./pages/Menu";
import Panier from "./pages/Panier";
import Cafes from "./pages/Cafes";
import TheBoissons from "./pages/TheBoissons";
import Eau from "./pages/Eau";
import Assiette from "./pages/Assiette";
import Blog from "./pages/Blog";
import NotreHistoire from "./pages/NotreHistoire";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Workers from "./pages/Workers";
import Payment from "./pages/Payment";
import ComposerDuo from "./pages/ComposerDuo";
import BoissonsChauds from "./pages/BoissonsChauds";
import EauBoissons from "./pages/EauBoissons";

import './i18n';

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/composer"} component={Composer} />
      <Route path={"/assiette"} component={Assiette} />
      <Route path={"/cafes"} component={Cafes} />
      <Route path={"/the-boissons"} component={TheBoissons} />
      <Route path={"/eau"} component={Eau} />
      <Route path={"/menu"} component={Menu} />
      <Route path={"/panier"} component={Panier} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/notre-histoire"} component={NotreHistoire} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/login"} component={Login} />
      <Route path={"/users"} component={Users} />
      <Route path={"/workers"} component={Workers} />
      <Route path="/composer-duo" component={ComposerDuo} />
             <Route path={"/payment"} component={Payment} />
                   <Route path={"/boissons-chaudes"} component={BoissonsChauds} />
      <Route path={"/eau-boissons"} component={EauBoissons} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />

    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Navbar />
            <BackButton />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;