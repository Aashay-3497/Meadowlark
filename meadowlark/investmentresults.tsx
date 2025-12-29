import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  Leaf, 
  MapPin, 
  DollarSign, 
  Target,
  BarChart3,
  CheckCircle2,
  Sprout,
  Trees,
  Fish,
  ExternalLink,
  Database
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import type { InvestmentPreferences, InvestmentOpportunity } from '../types';

interface InvestmentResultsProps {
  preferences: InvestmentPreferences;
  opportunities: InvestmentOpportunity[];
  onNewSearch: () => void;
}

export default function InvestmentResults({ preferences, opportunities, onNewSearch }: InvestmentResultsProps) {
  const { t } = useLanguage();

  const getRegionName = (region: string) => {
    const regionMap: Record<string, string> = {
      'North America': t.northAmerica,
      'South America': t.southAmerica,
      'Europe': t.europe,
      'Africa': t.africa,
      'Asia': t.asia,
      'Oceania': t.oceania,
    };
    return regionMap[region] || region;
  };

  const getProjectName = (name: string, region: string) => {
    const translatedRegion = getRegionName(region);
    if (name.includes('Reforestation')) {
      return `${translatedRegion} ${t.reforestationInitiative}`;
    } else if (name.includes('Agriculture')) {
      return `${translatedRegion} ${t.sustainableAgFund}`;
    } else if (name.includes('Marine')) {
      return `${translatedRegion} ${t.marineConservation}`;
    }
    return name;
  };

  const getProjectDescription = (name: string, region: string) => {
    const translatedRegion = getRegionName(region);
    if (name.includes('Reforestation')) {
      return t.reforestationDesc.replace('in North America', `in ${translatedRegion}`);
    } else if (name.includes('Agriculture')) {
      return t.sustainableAgDesc.replace('in North America', `in ${translatedRegion}`);
    } else if (name.includes('Marine')) {
      return t.marineConservationDesc.replace('in North America', `in ${translatedRegion}`);
    }
    return '';
  };

  const getHighlights = (opportunity: InvestmentOpportunity) => {
    if (opportunity.name.includes('Reforestation')) {
      return [
        `${opportunity.speciesProtected} ${t.protectedSpecies}`,
        `${opportunity.carbonOffset.toLocaleString()} ${t.offsetAnnually}`,
        `${opportunity.landRestored.toLocaleString()} ${t.hectaresRestored}`,
        t.communityLed
      ];
    } else if (opportunity.name.includes('Agriculture')) {
      return [
        `${opportunity.speciesProtected} ${t.protectedSpecies}`,
        `${opportunity.carbonOffset.toLocaleString()} ${t.offsetAnnually}`,
        t.regenerativeFarming,
        t.farmerPartnerships
      ];
    } else if (opportunity.name.includes('Marine')) {
      return [
        `${opportunity.speciesProtected} ${t.marineSpeciesProtected}`,
        t.coralReef,
        t.sustainableFisheries,
        t.blueCarbon
      ];
    }
    return opportunity.highlights;
  };

  const getRiskLabel = (risk: string) => {
    if (risk === 'low') return t.low;
    if (risk === 'medium') return t.medium;
    if (risk === 'high') return t.high;
    return risk;
  };

  const getTimelineLabel = (timeline: string) => {
    if (timeline === 'short') return t.shortTerm;
    if (timeline === 'medium') return t.mediumTerm;
    if (timeline === 'long') return t.longTerm;
    return timeline;
  };

  const isValidUrl = (url?: string): boolean => {
    if (!url || url === '#' || url.trim() === '') return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const ensureProtocol = (url: string): string => {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return 'https://' + trimmed;
  };

  const handleInvestNowClick = (url: string) => {
    const safeUrl = ensureProtocol(url);
    if (isValidUrl(safeUrl)) {
      window.open(safeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {t.opportunities}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.basedOnPreferences} {opportunities.length} {t.foundMatching}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={onNewSearch}
              className="border-emerald-300 dark:border-emerald-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.newSearch}
            </Button>
          </div>

          <div className="grid gap-8">
            {opportunities.map((opportunity, index) => {
              const hasValidUrl = opportunity.link && isValidUrl(ensureProtocol(opportunity.link));
              
              return (
                <Card 
                  key={opportunity.id} 
                  className="shadow-xl border-emerald-200/50 dark:border-emerald-800/50 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border-b border-emerald-200/50 dark:border-emerald-800/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-white dark:bg-emerald-950">
                            <MapPin className="h-3 w-3 mr-1" />
                            {getRegionName(opportunity.region)}
                          </Badge>
                          <Badge 
                            variant={
                              opportunity.riskLevel === 'low' ? 'secondary' : 
                              opportunity.riskLevel === 'medium' ? 'default' : 
                              'destructive'
                            }
                          >
                            {getRiskLabel(opportunity.riskLevel)} {t.riskTolerance}
                          </Badge>
                          {opportunity.verified && (
                            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
                            <Database className="h-3 w-3 mr-1" />
                            Real-time Data
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl mb-2">{getProjectName(opportunity.name, opportunity.region)}</CardTitle>
                        <CardDescription className="text-base">
                          {getProjectDescription(opportunity.name, opportunity.region)}
                        </CardDescription>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-muted-foreground mb-1">{t.investmentAmount}</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          ${opportunity.investmentAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                        <TabsTrigger value="environmental">{t.environmental}</TabsTrigger>
                        <TabsTrigger value="economic">{t.economic}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span className="font-medium">{t.conservationScore}</span>
                              </div>
                              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                {opportunity.conservationScore}
                              </span>
                            </div>
                            <Progress value={opportunity.conservationScore} className="h-3" />
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Database className="h-3 w-3" />
                              Calculated from GBIF biodiversity data
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                <span className="font-medium">{t.economicScore}</span>
                              </div>
                              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                {opportunity.economicScore}
                              </span>
                            </div>
                            <Progress value={opportunity.economicScore} className="h-3" />
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Database className="h-3 w-3" />
                              Calculated from Open-Meteo climate data
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-border pt-6">
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            {t.keyHighlights}
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {getHighlights(opportunity).map((highlight, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">{highlight}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                            onClick={() => hasValidUrl && opportunity.link && handleInvestNowClick(opportunity.link)}
                            disabled={!hasValidUrl}
                          >
                            <DollarSign className="mr-2 h-4 w-4" />
                            {t.investNow}
                            {hasValidUrl && <ExternalLink className="ml-2 h-4 w-4" />}
                          </Button>
                          <Button variant="outline" className="flex-1 border-emerald-300 dark:border-emerald-700">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            {t.viewDetails}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="environmental" className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Sprout className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                {t.biodiversityIndex}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {(opportunity.biodiversityIndex * 100).toFixed(0)}
                                  </span>
                                  <span className="text-sm text-muted-foreground">/ 100</span>
                                </div>
                                <Progress value={opportunity.biodiversityIndex * 100} className="h-2" />
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Database className="h-3 w-3" />
                                  {t.biodiversityDesc}
                                </p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Trees className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                {t.climateScore}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                                    {(opportunity.climateScore * 100).toFixed(0)}
                                  </span>
                                  <span className="text-sm text-muted-foreground">/ 100</span>
                                </div>
                                <Progress value={opportunity.climateScore * 100} className="h-2" />
                                <p className="text-xs text-muted-foreground">
                                  {t.climateDesc}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200/50 dark:border-emerald-800/50">
                            <CardContent className="pt-6">
                              <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-3">
                                  <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <p className="text-2xl font-bold">{opportunity.carbonOffset.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">{t.carbonOffset}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200/50 dark:border-teal-800/50">
                            <CardContent className="pt-6">
                              <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-3">
                                  <Fish className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                                </div>
                                <p className="text-2xl font-bold">{opportunity.speciesProtected}</p>
                                <p className="text-sm text-muted-foreground">{t.speciesProtected}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-cyan-50 to-emerald-50 dark:from-cyan-950/30 dark:to-emerald-950/30 border-cyan-200/50 dark:border-cyan-800/50">
                            <CardContent className="pt-6">
                              <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center mb-3">
                                  <Target className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <p className="text-2xl font-bold">{opportunity.landRestored.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">{t.landRestored}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-muted/50">
                          <CardHeader>
                            <CardTitle className="text-base">{t.sdgAlignment}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {opportunity.sdgAlignment.map((sdg) => (
                                <Badge key={sdg} variant="secondary" className="text-sm">
                                  {t.goal} {sdg}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="economic" className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200/50 dark:border-emerald-800/50">
                            <CardHeader>
                              <CardTitle className="text-base">{t.projectedAnnualReturn}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {opportunity.projectedReturn}%
                                  </span>
                                  <span className="text-sm text-muted-foreground">{t.perYear}</span>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{t.annualIncome}</span>
                                    <span className="font-semibold">
                                      ${((opportunity.investmentAmount * opportunity.projectedReturn) / 100).toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{t.yearProjection}</span>
                                    <span className="font-semibold">
                                      ${((opportunity.investmentAmount * opportunity.projectedReturn * 5) / 100).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200/50 dark:border-teal-800/50">
                            <CardHeader>
                              <CardTitle className="text-base">{t.investmentTimeline}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                                  </div>
                                  <div>
                                    <p className="font-semibold capitalize">
                                      {getTimelineLabel(opportunity.timeline)}
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-2 pt-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-muted-foreground">{t.quarterlyReporting}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-muted-foreground">{t.annualImpact}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-muted-foreground">{t.exitFlexibility}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">{t.riskAssessment}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{t.marketRisk}</span>
                                <Badge variant={opportunity.riskLevel === 'low' ? 'secondary' : 'default'}>
                                  {getRiskLabel(opportunity.riskLevel)}
                                </Badge>
                              </div>
                              <Progress 
                                value={opportunity.riskLevel === 'low' ? 30 : opportunity.riskLevel === 'medium' ? 60 : 85} 
                                className="h-2" 
                              />
                              <p className="text-sm text-muted-foreground">
                                {t.riskDescription} {getRiskLabel(opportunity.riskLevel).toLowerCase()} risk based on market volatility, 
                                regulatory environment, and project maturity. Returns are projected based on 
                                historical performance and real-time environmental data analysis.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
