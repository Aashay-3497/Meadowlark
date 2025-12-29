import { Leaf } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200/50 dark:border-emerald-800/50 bg-white/80 dark:bg-emerald-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/meadowlark-logo-transparent.dim_200x200.png" 
              alt="Meadowlark Logo" 
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                {t.appName}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <a 
              href="#about" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hidden md:inline-block"
            >
              {t.about}
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hidden md:inline-block"
            >
              {t.howItWorks}
            </a>
            <LanguageSelector />
            <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </nav>
        </div>
      </div>
    </header>
  );
}
