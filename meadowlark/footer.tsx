import { Heart } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-emerald-200/50 dark:border-emerald-800/50 bg-white/50 dark:bg-emerald-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025. {t.builtWith}</span>
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span>using</span>
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              caffeine.ai
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground transition-colors">
              {t.privacy}
            </a>
            <a href="#terms" className="hover:text-foreground transition-colors">
              {t.terms}
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              {t.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
