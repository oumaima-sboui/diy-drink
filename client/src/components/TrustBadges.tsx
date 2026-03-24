import { motion } from 'framer-motion';
import { MapPin, Leaf, Recycle, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TrustBadges() {
  const { t } = useTranslation();

const badges = [
    {
      icon: MapPin,
      title: t('home.localProducers'),
      description: t('home.localProducersDesc'),
      color: 'red',
    },
    {
      icon: Leaf,
      title: t('home.organicCertified'),
      description: t('home.organicCertifiedDesc'),
      color: 'green',
    },
    {
      icon: Recycle,
      title: t('home.freshDaily'),
      description: t('home.freshDailyDesc'),
      color: 'blue',
    },
    {
      icon: Award,
      title: t('home.zeroWaste'),
      description: t('home.zeroWasteDesc'),
      color: 'emerald',
    },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#004D40] mb-4">
            {t("trust.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t("trust.subtitle")}
          </p>
        </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {badges.map((badge, index) => {
    const Icon = badge.icon;
    const bgColorClass = `bg-${badge.color}-50`;
    const textColorClass = `text-${badge.color}-500`;
    
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
      >
        <div className={`w-16 h-16 ${bgColorClass} rounded-full flex items-center justify-center mb-6 shadow-sm`}>
          <Icon className={`w-8 h-8 ${textColorClass}`} />
        </div>
        <h3 className="text-xl font-bold text-[#004D40] mb-3">
          {badge.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {badge.description}
        </p>
      </motion.div>
    );
  })}
</div>
      </div>
    </section>
  );
}