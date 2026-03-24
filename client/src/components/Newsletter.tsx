import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulation d'envoi
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background avec dégradé sophistiqué */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#004D40] to-[#00695C]" />
      
      {/* Motifs décoratifs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF6F00]/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 text-center shadow-2xl"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-[#FF6F00]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
            Rejoignez le Club DIY
          </h2>
          
          <p className="text-gray-200 text-lg mb-10 max-w-2xl mx-auto">
            Recevez nos recettes exclusives, invitations aux ateliers dégustation et offres VIP avant tout le monde.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Input 
                type="email" 
                placeholder="votre@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 px-6 rounded-full bg-white/90 border-0 text-[#004D40] placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#FF6F00] text-lg shadow-inner"
              />
            </div>
            <Button 
              type="submit" 
              disabled={status !== 'idle'}
              className={`h-14 px-8 rounded-full text-lg font-bold transition-all duration-300 shadow-lg ${
                status === 'success' 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-[#FF6F00] hover:bg-[#E65100] text-white hover:scale-105'
              }`}
            >
              {status === 'loading' ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : status === 'success' ? (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5" /> Inscrit !
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  S'inscrire <Send className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>
          
          <p className="text-white/60 text-sm mt-6">
            Pas de spam, promis. Désinscription en un clic.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
