import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Globe, 
  ChevronDown, 
  Briefcase, 
  Shield 
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from "@/_core/hooks/useAuth";
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/menu', label: t('nav.menu') },
    { href: '/composer', label: t('nav.workshop') },
    { href: '/notre-histoire', label: t('nav.concept') },
    { href: '/blog', label: t('nav.blog') },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t('message.success'));
      setLocation('/');
    } catch (error) {
      toast.error(t('message.error'));
    }
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'worker') return '/workers';
    return '/';
  };

  const languages = [
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  ];

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-white shadow-sm py-4'
  }`}
>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Logo size={scrolled ? 32 : 40} />
              <span className={`font-bold text-[#004D40] ${scrolled ? 'text-xl' : 'text-2xl'}`}>
                DIY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`text-sm font-semibold transition-colors cursor-pointer relative group ${
  location === link.href ? 'text-[#FF6F00]' : 'text-gray-800 hover:text-[#FF6F00]'
}`}>
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6F00] transform origin-left transition-transform duration-300 ${
                    location === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#004D40] hover:text-[#FF6F00] hover:bg-transparent">
                  <Globe className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent   align="end" 
  sideOffset={5}
  className="z-[9999] bg-white shadow-lg pointer-events-auto"
>
                <DropdownMenuLabel>Language / Langue</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                  >
                    <span className="mr-2">{lang.flag}</span> 
                    {lang.name}
                    {i18n.language === lang.code && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu / Login Button */}
            {isAuthenticated && user ? (
            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="flex items-center gap-2">
      <User className="h-5 w-5" />
      <span className="hidden md:inline">{user.name}</span>
      <ChevronDown className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent   align="end" 
  sideOffset={5}
 className="z-[9999] bg-white shadow-lg pointer-events-auto"
>
    {user.role === 'worker' && (
      <DropdownMenuItem onClick={() => setLocation('/workers')}>
        <Briefcase className="mr-2 h-4 w-4" />
        {t('navbar.workersPanel')}
      </DropdownMenuItem>
    )}
    {user.role === 'admin' && (
      <DropdownMenuItem onClick={() => setLocation('/admin')}>
        <Shield className="mr-2 h-4 w-4" />
        {t('navbar.adminPanel')}
      </DropdownMenuItem>
    )}
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      {t('navbar.logout')}
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                className="gap-2 text-[#004D40] hover:text-[#FF6F00] hover:bg-transparent"
                onClick={() => setLocation('/login')}
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline font-medium">{t('nav.login')}</span>
              </Button>
            )}

            {/* Cart */}
            <Link href="/panier">
              <Button variant="ghost" size="icon" className="relative text-[#004D40] hover:text-[#FF6F00] hover:bg-transparent">
                <ShoppingBag className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6F00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#004D40]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block text-lg font-medium py-2 ${
                      location === link.href ? 'text-[#FF6F00]' : 'text-[#004D40]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-2 py-2">
                  <p className="text-xs text-muted-foreground mb-2">Language / Langue</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={`px-3 py-2 rounded text-sm flex items-center gap-2 ${
                          i18n.language === lang.code 
                            ? 'bg-[#FF6F00] text-white' 
                            : 'bg-gray-100 text-[#004D40]'
                        }`}
                      >
                        {lang.flag} {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile User Menu */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-2 py-3 text-sm">
                      <p className="font-medium text-[#004D40]">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    {(user.role === 'admin' || user.role === 'worker') && (
                      <button
                        onClick={() => {
                          setLocation(getDashboardLink());
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-2 py-2 text-[#004D40] hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {user.role === 'admin' ? t('nav.admin') : t('nav.dashboard')}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100 rounded flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setLocation('/login');
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 text-[#004D40] hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    {t('nav.login')}
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}