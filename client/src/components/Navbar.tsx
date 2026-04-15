import { useState, useEffect, useRef } from 'react';
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

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  // États pour les dropdowns
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Refs pour détecter les clics extérieurs
  const langMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer les menus au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      setUserMenuOpen(false);
    } catch (error) {
      toast.error(t('message.error'));
    }
  };

  const languages = [
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLangMenuOpen(false);
  };

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
            <div className="relative" ref={langMenuRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#004D40] hover:text-[#FF6F00] hover:bg-transparent"
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                  setUserMenuOpen(false);
                }}
              >
                <Globe className="w-5 h-5" />
              </Button>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-[100]"
                  >
                    <div className="p-2">
                      <p className="text-xs font-semibold text-gray-500 px-2 py-1.5">
                        Language / Langue
                      </p>
                      <div className="border-t border-gray-100 my-1" />
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm transition-colors"
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                          {i18n.language === lang.code && (
                            <span className="ml-auto text-[#FF6F00] font-bold">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu / Login Button */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setLangMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-[100]"
                    >
                      <div className="p-2">
                        {user.role === 'worker' && (
                          <button
                            onClick={() => {
                              setLocation('/workers');
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm transition-colors"
                          >
                            <Briefcase className="h-4 w-4" />
                            Workers
                          </button>
                        )}
                        {user.role === 'admin' && (
                          <button
                            onClick={() => {
                              setLocation('/admin');
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm transition-colors"
                          >
                            <Shield className="h-4 w-4" />
                            Admin
                          </button>
                        )}
                        {(user.role === 'worker' || user.role === 'admin') && (
                          <div className="border-t border-gray-100 my-1" />
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-2 py-2 hover:bg-red-50 text-red-600 rounded flex items-center gap-2 text-sm transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          {t('nav.logout')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={`px-3 py-2 rounded text-sm flex items-center justify-center gap-2 ${
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
                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setLocation('/admin');
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-2 py-2 text-[#004D40] hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        {t('nav.admin')}
                      </button>
                    )}
                    {user.role === 'worker' && (
                      <button
                        onClick={() => {
                          setLocation('/workers');
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-2 py-2 text-[#004D40] hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <Briefcase className="w-4 h-4" />
                        Workers
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