import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function VitaminFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [, setLocation] = useLocation();

  // Afficher le tooltip après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Tooltip d'invitation */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100 max-w-[200px] relative"
          >
            <p className="text-sm text-[#004D40] font-medium">
              Besoin d'un conseil vitaminé ? 🥝
            </p>
            <div className="absolute -right-2 bottom-4 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -left-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu étendu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            <Button
              onClick={() => setLocation('/composer?type=jus')}
              className="bg-white text-[#004D40] hover:bg-gray-50 shadow-lg rounded-full px-6 py-6 flex items-center gap-3 justify-end border border-gray-100"
            >
              <span className="font-bold">Créer un Jus</span>
              <div className="w-8 h-8 bg-[#7CB342] rounded-full flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
            </Button>
            
            <Button
              onClick={() => setLocation('/composer?type=smoothie')}
              className="bg-white text-[#004D40] hover:bg-gray-50 shadow-lg rounded-full px-6 py-6 flex items-center gap-3 justify-end border border-gray-100"
            >
              <span className="font-bold">Créer un Smoothie</span>
              <div className="w-8 h-8 bg-[#FF6F00] rounded-full flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton Principal */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300 ${
          isOpen ? 'bg-[#004D40] text-white' : 'bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
