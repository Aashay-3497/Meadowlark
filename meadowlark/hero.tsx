import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToForm = () => {
    const formElement = document.getElementById('investment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-teal-100/30 to-cyan-100/50 dark:from-emerald-900/20 dark:via-teal-900/10 dark:to-cyan-900/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
              <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                AI-Powered Alternative Data Analysis
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {t.heroTitle}
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              {t.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {t.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              >
                {t.learnMore}
              </Button>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/generated/meadowlark-hero.dim_1200x600.jpg" 
                alt="Conservation landscape" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl opacity-20" />
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
