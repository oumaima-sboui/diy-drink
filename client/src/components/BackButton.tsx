import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackButton() {
  const [location] = useLocation();

  // Ne pas afficher sur la page d'accueil
  if (location === '/') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="fixed top-24 left-4 z-[100] md:top-28"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.history.back()}
          className="bg-white/80 backdrop-blur-sm border-2 border-[#004D40]/20 hover:bg-[#004D40] hover:text-white hover:border-[#004D40] transition-all duration-300 rounded-full shadow-lg w-12 h-12"
          title="Retour"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
