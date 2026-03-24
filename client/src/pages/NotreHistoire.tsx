import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { Heart, Leaf, Users, Award, Sparkles, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo';

export default function NotreHistoire() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen botanical-pattern">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Logo size={32} />
              <span>DIY</span>
            </button>
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t('story.header')}
          </h1>

          <div className="w-24" />
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FAF8F3] via-[#F5F5DC] to-[#FAF8F3] py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <Logo size={100} className="mx-auto mb-6" />

          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            DIY - Drink It Yourself
          </h2>

          <p
            className="text-xl text-gray-700 mb-6"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            {t('story.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container max-w-5xl mx-auto px-4 py-12 space-y-12">

        {/* Origin */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-[#7CB342]" />
            <h3 className="text-3xl font-bold text-primary">
              {t('story.origin.title')}
            </h3>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">{t('story.origin.p1')}</p>
            <p className="mb-4">{t('story.origin.p2')}</p>
            <p>{t('story.origin.p3')}</p>
          </div>
        </section>

        {/* Philosophy */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-[#FF6F00]" />
            <h3 className="text-3xl font-bold text-primary">
              {t('story.philosophy.title')}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7CB342] to-[#558B2F] rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-primary">
                  {t('story.philosophy.transparency.title')}
                </h4>
                <p className="text-gray-700">
                  {t('story.philosophy.transparency.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6F00] to-[#D84315] rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-primary">
                  {t('story.philosophy.creativity.title')}
                </h4>
                <p className="text-gray-700">
                  {t('story.philosophy.creativity.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#004D40] to-[#00695C] rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-primary">
                  {t('story.philosophy.environment.title')}
                </h4>
                <p className="text-gray-700">
                  {t('story.philosophy.ecology.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Engagement */}
        <section className="bg-gradient-to-r from-[#7CB342]/10 to-[#FF6F00]/10 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="w-8 h-8 text-[#7CB342]" />
            <h3 className="text-3xl font-bold text-primary">
              {t('story.engagement.title')}
            </h3>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">{t('story.engagement.p1')}</p>
            <p className="mb-4">{t('story.engagement.p2')}</p>
            <p>{t('story.engagement.p3')}</p>
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-[#004D40]" />
            <h3 className="text-3xl font-bold text-primary">
              {t('story.team.title')}
            </h3>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">{t('story.team.p1')}</p>
            <p>{t('story.team.p2')}</p>
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-3xl font-bold text-primary">
              {t('story.values.title')}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-4">🌱</div>
              <h4 className="text-xl font-bold mb-2 text-primary">
                {t('story.values.sustainability.title')}
              </h4>
              <p className="text-gray-700">
                {t('story.values.sustainability.text')}
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-4">💚</div>
              <h4 className="text-xl font-bold mb-2 text-primary">
                {t('story.values.health.title')}
              </h4>
              <p className="text-gray-700">
                {t('story.values.health.text')}
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-4">✨</div>
              <h4 className="text-xl font-bold mb-2 text-primary">
                {t('story.values.creativity.title')}
              </h4>
              <p className="text-gray-700">
                {t('story.values.creativity.text')}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h3 className="text-3xl font-bold text-primary mb-6">
            {t('story.cta.title')}
          </h3>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            {t('story.cta.text')}
          </p>

          <Link href="/composer">
            <Button className="gradient-energy text-white font-semibold py-6 px-8 text-lg btn-luxury">
              <Sparkles className="w-5 h-5 mr-2" />
              {t('story.cta.button')}
            </Button>
          </Link>
        </section>

      </div>
    </div>
  );
}