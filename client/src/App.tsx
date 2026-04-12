import { CartProvider } from '@/contexts/CartContext';
import { Router, Route } from 'wouter';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Composer from '@/pages/Composer';
import ComposerDuo from '@/pages/ComposerDuo';
import Panier from '@/pages/Panier';
import Payment from '@/pages/Payment';
import Workers from '@/pages/Workers';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';
import NotreHistoire from '@/pages/NotreHistoire';
import Blog from '@/pages/Blog';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FAF8F3]">
          <Navbar />
          <main className="flex-grow">
            <Route path="/" component={Home} />
            <Route path="/menu" component={Menu} />
            <Route path="/composer" component={Composer} />
            <Route path="/composer-duo" component={ComposerDuo} />
            <Route path="/panier" component={Panier} />
            <Route path="/payment" component={Payment} />
            <Route path="/workers" component={Workers} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
<Route path="/notre-histoire" component={NotreHistoire} />
<Route path="/blog" component={Blog} />
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;