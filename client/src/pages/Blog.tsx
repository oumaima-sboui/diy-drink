import { useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Logo from '@/components/Logo';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export default function Blog() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(t('blog.all'));

  // 👇 DÉPLACER LES ARTICLES ICI (dans le composant)
  const articles: BlogArticle[] = [
    {
      id: 'superfoods-guide',
      title: t('blog.article1.title'),
      excerpt: t('blog.article1.excerpt'),
      category: 'Nutrition',
      date: t('blog.article1.date'),
      readTime: '8 min',
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800",
      tags: ['Superfoods', 'Nutrition', 'Santé'],
      content: [
        'Les superfoods, ou superaliments, sont des aliments naturels exceptionnellement riches en nutriments essentiels...',
      ],
    },
    {
      id: 'cold-pressed-benefits',
      title: t('blog.article2.title'),
      excerpt: t('blog.article2.excerpt'),
      category: 'Santé',
      date: t('blog.article2.date'),
      readTime: '6 min',
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800",
      tags: ['Jus', 'Nutrition', 'Pressage à Froid'],
      content: [
        'Le pressage à froid est bien plus qu\'une simple tendance...',
      ],
    },
    {
      id: 'smoothie-combinations',
      title: t('blog.article3.title'),
      excerpt: t('blog.article3.excerpt'),
      category: 'Recettes',
      date: t('blog.article3.date'),
      readTime: '7 min',
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800",
      tags: ['Smoothies', 'Recettes', 'Nutrition'],
      content: [
        'Créer un smoothie parfait est à la fois un art et une science...',
      ],
    },
    {
      id: 'vitamins-minerals-guide',
      title: t('blog.article4.title'),
      excerpt: t('blog.article4.excerpt'),
      category: 'Nutrition',
      date: t('blog.article4.date'),
      readTime: '9 min',
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800",
      tags: ['Vitamines', 'Minéraux', 'Santé'],
      content: [
        'Les vitamines et minéraux sont des micronutrients essentiels...',
      ],
    },
    {
      id: 'seasonal-ingredients',
      title: t('blog.article5.title'),
      excerpt: t('blog.article5.excerpt'),
      category: 'Écologie',
      date: t('blog.article5.date'),
      readTime: '8 min',
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800",
      tags: ['Bio', 'Saison', 'Écologie'],
      content: [
        'Manger de saison n\'est pas seulement une mode...',
      ],
    },
  ];

  // Catégories traduites
  const getCategoryLabel = (cat: string) => {
    const categoryMap: { [key: string]: string } = {
      'Tous': t('blog.all'),
      'Nutrition': t('blog.nutrition'),
      'Santé': t('blog.health'),
      'Recettes': t('blog.recipes'),
      'Écologie': t('blog.ecology'),
    };
    return categoryMap[cat] || cat;
  };

  const categories = [t('blog.all'), ...Array.from(new Set(articles.map(a => a.category)))];
  const filteredArticles = selectedCategory === t('blog.all')
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  if (selectedArticle) {
    return (
      <div className="min-h-screen botanical-pattern pt-28">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Logo size={32} />
              <span>DIY</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('blog.title')}</h1>
            <div className="w-24" />
          </div>
        </header>

        {/* Article Content */}
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedArticle(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('blog.backToArticles')}
          </Button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{getCategoryLabel(selectedArticle.category)}</Badge>
                {selectedArticle.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedArticle.title}</h1>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedArticle.readTime} {t('blog.readTime')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{t('blog.team')}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                {selectedArticle.content.map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h2 key={idx} className="text-2xl font-bold mt-8 mb-4 text-primary">
                        {paragraph.replace(/\*\*/g, '')}
                      </h2>
                    );
                  }
                  return (
                    <p 
                      key={idx} 
                      className="mb-4 text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen botanical-pattern pt-28">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Logo size={32} />
            <span>DIY</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('blog.title')}</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FAF8F3] via-[#F5F5DC] to-[#FAF8F3] py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('blog.subtitle')}
          </h2>
          <p className="text-lg text-gray-700">
            {t('blog.description')}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'gradient-energy text-white' : ''}
            >
              {getCategoryLabel(category)}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <Card 
              key={article.id} 
              className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 gradient-energy text-white">
                  {getCategoryLabel(article.category)}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}