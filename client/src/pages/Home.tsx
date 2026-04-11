import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, Leaf, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import TrustBadges from '@/components/TrustBadges';

export default function Home() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const SIGNATURE_DRINKS = [
    {
      name: t('menu.goldKirchberg'),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/ERBaGJORnrtFBHjP.jpg",
      color: "from-orange-400 to-yellow-400"
    },
    {
      name: t('menu.emeraldTonic'),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/QxzkGPhvWuXIqfrb.jpg",
      color: "from-green-400 to-emerald-500"
    },
    {
      name: t('menu.powerGreen'),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/93675899/vllnoKqARjyYRBNM.jpg",
      color: "from-green-500 to-emerald-700"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#004D40] via-[#00695C] to-[#00897B] pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <span className="bg-[#FF6F00]/20 text-[#FFE0B2] px-6 py-2 rounded-full text-sm font-bold backdrop-blur-sm border border-[#FF6F00]/30">
                {t('home.heroSubtitle')}
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 font-serif leading-tight">
              {t('home.heroTitle')}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              {t('home.heroDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setLocation('/composer')}
                className="bg-[#FF6F00] hover:bg-[#E65100] text-white px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all group"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                {t('home.heroCTA')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation('/menu')}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-10 py-7 text-lg rounded-full backdrop-blur-sm"
              >
                {t('home.heroSecondaryCTA')}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#FF6F00]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#FFE0B2]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Concept DIY - 4 Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-5xl font-bold text-[#004D40] mb-4 font-serif">
              {t('home.conceptTitle')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.conceptSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🥛", titleKey: "home.step1Title", descKey: "home.step1Desc" },
              { icon: "🍓", titleKey: "home.step2Title", descKey: "home.step2Desc" },
              { icon: "⚡", titleKey: "home.step3Title", descKey: "home.step3Desc" },
              { icon: "✨", titleKey: "home.step4Title", descKey: "home.step4Desc" }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-8 text-center h-full hover:shadow-xl transition-shadow border-2 border-gray-100">
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-[#004D40] mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-gray-600">
                    {t(step.descKey)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DIY */}
      <section className="py-20 bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-5xl font-bold text-[#004D40] mb-4 font-serif">
              {t('home.whyDIYTitle')}
            </h2>
            <p className="text-xl text-gray-700">
              {t('home.whyDIYSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[

         

              { icon: CheckCircle, titleKey: "home.reason1Title", descKey: "home.reason1Desc" },
              { icon: Users, titleKey: "home.reason2Title", descKey: "home.reason2Desc" },
              { icon: Leaf, titleKey: "home.reason3Title", descKey: "home.reason3Desc" },
              { icon: Sparkles, titleKey: "home.reason4Title", descKey: "home.reason4Desc" }

            ].map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-8 bg-white h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  <reason.icon className="w-12 h-12 text-[#FF6F00] mb-4" />
                  <h3 className="text-2xl font-bold text-[#004D40] mb-3">
                    {t(reason.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(reason.descKey)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Creations Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-5xl font-bold text-[#004D40] mb-4 font-serif">
              {t('home.signaturesTitle')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.signaturesSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {SIGNATURE_DRINKS.map((drink, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-64">
                    <div className={`absolute inset-0 bg-gradient-to-br ${drink.color} opacity-20`} />
                    <img 
                      src={drink.image} 
                      alt={drink.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#004D40]">{drink.name}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setLocation('/menu')}
              className="bg-[#004D40] hover:bg-[#00695C] text-white px-10 py-6 text-lg rounded-full"
            >
              {t('home.viewAll')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-5xl font-bold text-[#004D40] mb-4 font-serif">
              {t('home.testimonialTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { text: "home.testimonial1", author: "home.testimonial1Author" },
              { text: "home.testimonial2", author: "home.testimonial2Author" },
              { text: "home.testimonial3", author: "home.testimonial3Author" }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-8 bg-white h-full">
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    {t(testimonial.text)}
                  </p>
                  <p className="font-bold text-[#004D40]">
                    — {t(testimonial.author)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#004D40] to-[#00897B] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-2xl mb-10 text-white/90">
              {t('home.ctaSubtitle')}
            </p>
            <Button
              size="lg"
              onClick={() => setLocation('/composer')}
              className="bg-[#FF6F00] hover:bg-[#E65100] text-white px-12 py-8 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all group"
            >
              <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              {t('home.ctaButton')}
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}