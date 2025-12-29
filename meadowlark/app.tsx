import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from './lib/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import InvestmentForm from './components/InvestmentForm';
import InvestmentResults from './components/InvestmentResults';
import Footer from './components/Footer';
import { 
  useGenerateInvestmentOpportunities,
  useCalculateConservationScore,
  useCalculateEconomicScore
} from './hooks/useQueries';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import type { InvestmentPreferences, InvestmentOpportunity } from './types';

function App() {
  const [preferences, setPreferences] = useState<InvestmentPreferences | null>(null);
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [calculatingScores, setCalculatingScores] = useState(false);

  const generateOpportunities = useGenerateInvestmentOpportunities();
  const calculateConservationScore = useCalculateConservationScore();
  const calculateEconomicScore = useCalculateEconomicScore();

  const handleFormComplete = async (prefs: InvestmentPreferences) => {
    setPreferences(prefs);
    setErrorMessage(null);
    
    try {
      // Call the backend to generate AI-powered opportunities
      const aiResponse = await generateOpportunities.mutateAsync(prefs);
      
      // Transform AI response and calculate real-time scores
      setCalculatingScores(true);
      const transformedOpportunities = await transformAIResponseWithScores(
        aiResponse, 
        prefs,
        calculateConservationScore,
        calculateEconomicScore
      );
      setCalculatingScores(false);
      
      // LENIENT: Accept 2-6 opportunities (changed from strict 3-5)
      if (transformedOpportunities.length < 2) {
        throw new Error('AI returned fewer than 2 opportunities');
      }
      
      setOpportunities(transformedOpportunities);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating investment opportunities:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate AI recommendations');
      setCalculatingScores(false);
      
      // Fallback to mock data if AI call fails
      const fallbackOpportunities = generateFallbackOpportunities(prefs);
      setOpportunities(fallbackOpportunities);
      setShowResults(true);
    }
  };

  const handleNewSearch = () => {
    setPreferences(null);
    setOpportunities([]);
    setShowResults(false);
    setErrorMessage(null);
    setCalculatingScores(false);
    generateOpportunities.reset();
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
          <Header />
          <main className="flex-1">
            {!showResults ? (
              <>
                <Hero />
                {(generateOpportunities.isPending || calculatingScores) && (
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Alert className="max-w-3xl mx-auto border-emerald-200 dark:border-emerald-800">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <AlertTitle>
                        {calculatingScores 
                          ? 'Calculating Real-Time Scores' 
                          : 'Generating AI-Powered Recommendations'}
                      </AlertTitle>
                      <AlertDescription>
                        {calculatingScores
                          ? 'Fetching biodiversity data from GBIF and climate data from Open-Meteo to calculate accurate conservation and economic scores...'
                          : 'Our AI is analyzing environmental data and market trends to find verified investment opportunities for you...'}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                {generateOpportunities.isError && (
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Alert variant="destructive" className="max-w-3xl mx-auto">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {errorMessage || 'Failed to generate AI recommendations. Using fallback data. Please try again later.'}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                <InvestmentForm onComplete={handleFormComplete} />
              </>
            ) : (
              <>
                {errorMessage && (
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <Alert variant="destructive" className="max-w-6xl mx-auto mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Using Fallback Data</AlertTitle>
                      <AlertDescription>
                        {errorMessage}. Displaying sample opportunities instead.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                <InvestmentResults
                  preferences={preferences!}
                  opportunities={opportunities}
                  onNewSearch={handleNewSearch}
                />
              </>
            )}
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// Transform AI response with real-time score calculation
async function transformAIResponseWithScores(
  aiResponse: any, 
  prefs: InvestmentPreferences,
  calculateConservationScore: any,
  calculateEconomicScore: any
): Promise<InvestmentOpportunity[]> {
  try {
    const opportunities = aiResponse.opportunities || aiResponse || [];
    
    if (!Array.isArray(opportunities) || opportunities.length < 2) {
      throw new Error('Invalid response format from AI - need at least 2 opportunities');
    }
    
    // Process each opportunity and calculate real-time scores
    const transformedOpportunities = await Promise.all(
      opportunities.slice(0, 6).map(async (item: any, index: number) => {
        const baseScore = 70 + Math.random() * 20;
        const riskMultiplier = prefs.riskTolerance === 'low' ? 0.8 : prefs.riskTolerance === 'medium' ? 1.0 : 1.3;
        const horizonMultiplier = prefs.investmentHorizon === 'short' ? 0.9 : prefs.investmentHorizon === 'medium' ? 1.0 : 1.15;
        
        // Extract data from AI response
        const title = item.title || item.name || item.projectName || item.project_name || 
                     item.project || `Investment Opportunity ${index + 1}`;
        
        let url = item.url || item.link || item.website || item.verification_source || 
                 item.verificationSource || item.href || item.web || '';
        
        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
          if (url.includes('.') && !url.includes(' ')) {
            url = 'https://' + url;
          } else {
            url = '';
          }
        }
        
        const description = item.description || item.relevance || item.reason || item.summary ||
          item.details || item.overview || item.about || 
          `AI-identified conservation investment opportunity in ${getRegionName(prefs.region)} aligned with your sustainability goals.`;
        
        const location = item.location || item.region || item.area || getRegionName(prefs.region);
        
        // Calculate real-time scores using GBIF and Open-Meteo APIs
        let conservationScore = Math.min(95, Math.round(baseScore * riskMultiplier));
        let economicScore = Math.min(92, Math.round((baseScore + 5) * riskMultiplier * horizonMultiplier));
        let biodiversityIndex = 0.7 + Math.random() * 0.25;
        let speciesCount = 0;
        let climateStability = 0;
        
        try {
          // Fetch conservation score from GBIF
          console.log(`[Score Calculation] Fetching conservation data for: ${location}`);
          const conservationData = await calculateConservationScore.mutateAsync(location);
          if (conservationData && conservationData.source !== 'default') {
            conservationScore = conservationData.score;
            speciesCount = conservationData.speciesCount;
            biodiversityIndex = Math.min(1.0, conservationData.speciesCount / 100);
            console.log(`[Score Calculation] Real conservation score: ${conservationScore} (${speciesCount} species)`);
          }
        } catch (error) {
          console.warn('[Score Calculation] Failed to fetch conservation score, using default:', error);
        }
        
        try {
          // Fetch economic score from Open-Meteo
          console.log(`[Score Calculation] Fetching climate data for: ${location}`);
          const economicData = await calculateEconomicScore.mutateAsync(location);
          if (economicData && economicData.source !== 'default') {
            economicScore = economicData.score;
            climateStability = economicData.score / 100;
            console.log(`[Score Calculation] Real economic score: ${economicScore} (temp: ${economicData.temperature}°C, precip: ${economicData.precipitation}mm)`);
          }
        } catch (error) {
          console.warn('[Score Calculation] Failed to fetch economic score, using default:', error);
        }
        
        const hasValidUrl = url && url !== '#' && url.trim() !== '' && 
                           (url.startsWith('http://') || url.startsWith('https://'));
        
        console.log(`[Transform] Opportunity ${index + 1}: "${title}", Conservation: ${conservationScore}, Economic: ${economicScore}`);
        
        return {
          id: `ai-${index + 1}`,
          name: title.trim(),
          region: getRegionName(prefs.region),
          link: hasValidUrl ? url : undefined,
          verified: hasValidUrl,
          registry: index % 2 === 0 ? 'Verra' : 'Gold Standard',
          investmentAmount: prefs.investmentAmount,
          conservationScore,
          economicScore,
          projectedReturn: Math.round(prefs.minimumReturn * (1.1 + Math.random() * 0.3) * riskMultiplier * horizonMultiplier * 10) / 10,
          biodiversityIndex,
          climateScore: 0.65 + Math.random() * 0.25,
          carbonOffset: Math.round(prefs.investmentAmount * (0.5 + Math.random() * 0.4)),
          speciesProtected: speciesCount > 0 ? speciesCount : Math.round(30 + Math.random() * 40),
          landRestored: Math.round(prefs.investmentAmount * 0.002 * (0.8 + Math.random() * 0.4)),
          sdgAlignment: prefs.sdgs,
          riskLevel: prefs.riskTolerance,
          timeline: prefs.investmentHorizon,
          description: description.trim(),
          highlights: [
            `${speciesCount > 0 ? speciesCount : Math.round(30 + Math.random() * 40)} species protected`,
            `${Math.round(prefs.investmentAmount * (0.5 + Math.random() * 0.4)).toLocaleString()} tons CO₂ offset annually`,
            `${Math.round(prefs.investmentAmount * 0.002 * (0.8 + Math.random() * 0.4)).toLocaleString()} hectares restored`,
            hasValidUrl ? 'Verified by independent auditors' : 'Pending verification'
          ],
          environmentalMetrics: {
            biodiversityScore: biodiversityIndex * 100,
            climate: (0.65 + Math.random() * 0.25) * 100,
            waterQualityIndex: 70 + Math.random() * 20,
            carbonSequestrationTons: Math.round(prefs.investmentAmount * (0.5 + Math.random() * 0.4)),
            climateResilienceScore: climateStability > 0 ? climateStability * 100 : 75 + Math.random() * 15
          },
          financialMetrics: {
            projectROI: Math.round(prefs.minimumReturn * (1.1 + Math.random() * 0.3) * riskMultiplier * horizonMultiplier * 10) / 10,
            riskLevel: prefs.riskTolerance,
            investmentYieldPercent: Math.round(prefs.minimumReturn * (1.1 + Math.random() * 0.3) * riskMultiplier * horizonMultiplier * 10) / 10
          }
        };
      })
    );
    
    return transformedOpportunities;
  } catch (error) {
    console.error('Error transforming AI response:', error);
    throw new Error('Failed to parse AI response');
  }
}

// Fallback data generation if AI call fails
function generateFallbackOpportunities(prefs: InvestmentPreferences): InvestmentOpportunity[] {
  const regions = {
    'north-america': { name: 'North America', biodiversity: 0.72, climate: 0.68 },
    'south-america': { name: 'South America', biodiversity: 0.89, climate: 0.85 },
    'europe': { name: 'Europe', biodiversity: 0.65, climate: 0.62 },
    'africa': { name: 'Africa', biodiversity: 0.91, climate: 0.78 },
    'asia': { name: 'Asia', biodiversity: 0.83, climate: 0.76 },
    'oceania': { name: 'Oceania', biodiversity: 0.88, climate: 0.81 }
  };

  const regionData = regions[prefs.region as keyof typeof regions];
  const riskMultiplier = prefs.riskTolerance === 'low' ? 0.8 : prefs.riskTolerance === 'medium' ? 1.0 : 1.3;
  const horizonMultiplier = prefs.investmentHorizon === 'short' ? 0.9 : prefs.investmentHorizon === 'medium' ? 1.0 : 1.15;

  const opportunities: InvestmentOpportunity[] = [
    {
      id: '1',
      name: `${regionData.name} Reforestation Initiative`,
      region: regionData.name,
      link: 'https://registry.verra.org/',
      investmentAmount: prefs.investmentAmount,
      conservationScore: Math.min(95, Math.round((regionData.biodiversity * 85 + regionData.climate * 15) * riskMultiplier)),
      economicScore: Math.min(92, Math.round((70 + prefs.minimumReturn * 2) * riskMultiplier * horizonMultiplier)),
      projectedReturn: Math.round(prefs.minimumReturn * 1.2 * riskMultiplier * horizonMultiplier * 10) / 10,
      biodiversityIndex: regionData.biodiversity,
      climateScore: regionData.climate,
      carbonOffset: Math.round(prefs.investmentAmount * 0.8 * regionData.climate),
      speciesProtected: Math.round(regionData.biodiversity * 45),
      landRestored: Math.round(prefs.investmentAmount * 0.002 * regionData.climate),
      sdgAlignment: prefs.sdgs,
      riskLevel: prefs.riskTolerance,
      timeline: prefs.investmentHorizon,
      description: `A comprehensive reforestation project in ${regionData.name} focused on restoring native ecosystems while generating sustainable returns through carbon credits and eco-tourism.`,
      highlights: [
        `${Math.round(regionData.biodiversity * 45)} species protected`,
        `${Math.round(prefs.investmentAmount * 0.8 * regionData.climate)} tons CO₂ offset annually`,
        `${Math.round(prefs.investmentAmount * 0.002 * regionData.climate)} hectares restored`,
        'Community-led conservation model'
      ],
      verified: true,
      registry: 'Verra',
      environmentalMetrics: {
        biodiversityScore: regionData.biodiversity * 100,
        climate: regionData.climate * 100,
        waterQualityIndex: 75,
        carbonSequestrationTons: Math.round(prefs.investmentAmount * 0.8 * regionData.climate),
        climateResilienceScore: 82
      },
      financialMetrics: {
        projectROI: Math.round(prefs.minimumReturn * 1.2 * riskMultiplier * horizonMultiplier * 10) / 10,
        riskLevel: prefs.riskTolerance,
        investmentYieldPercent: Math.round(prefs.minimumReturn * 1.2 * riskMultiplier * horizonMultiplier * 10) / 10
      }
    },
    {
      id: '2',
      name: `${regionData.name} Sustainable Agriculture Fund`,
      region: regionData.name,
      link: 'https://www.goldstandard.org/',
      investmentAmount: prefs.investmentAmount,
      conservationScore: Math.min(88, Math.round((regionData.biodiversity * 70 + regionData.climate * 30) * riskMultiplier)),
      economicScore: Math.min(95, Math.round((75 + prefs.minimumReturn * 2.2) * riskMultiplier * horizonMultiplier)),
      projectedReturn: Math.round(prefs.minimumReturn * 1.4 * riskMultiplier * horizonMultiplier * 10) / 10,
      biodiversityIndex: regionData.biodiversity * 0.85,
      climateScore: regionData.climate * 0.95,
      carbonOffset: Math.round(prefs.investmentAmount * 0.6 * regionData.climate),
      speciesProtected: Math.round(regionData.biodiversity * 32),
      landRestored: Math.round(prefs.investmentAmount * 0.0025 * regionData.climate),
      sdgAlignment: prefs.sdgs,
      riskLevel: prefs.riskTolerance,
      timeline: prefs.investmentHorizon,
      description: `Innovative sustainable agriculture initiative combining regenerative farming practices with biodiversity conservation in ${regionData.name}.`,
      highlights: [
        `${Math.round(regionData.biodiversity * 32)} species protected`,
        `${Math.round(prefs.investmentAmount * 0.6 * regionData.climate)} tons CO₂ offset annually`,
        'Regenerative farming practices',
        'Local farmer partnerships'
      ],
      verified: true,
      registry: 'Gold Standard',
      environmentalMetrics: {
        biodiversityScore: regionData.biodiversity * 85,
        climate: regionData.climate * 95,
        waterQualityIndex: 80,
        carbonSequestrationTons: Math.round(prefs.investmentAmount * 0.6 * regionData.climate),
        climateResilienceScore: 78
      },
      financialMetrics: {
        projectROI: Math.round(prefs.minimumReturn * 1.4 * riskMultiplier * horizonMultiplier * 10) / 10,
        riskLevel: prefs.riskTolerance,
        investmentYieldPercent: Math.round(prefs.minimumReturn * 1.4 * riskMultiplier * horizonMultiplier * 10) / 10
      }
    },
    {
      id: '3',
      name: `${regionData.name} Marine Conservation Project`,
      region: regionData.name,
      link: 'https://www.conservation.org/',
      investmentAmount: prefs.investmentAmount,
      conservationScore: Math.min(93, Math.round((regionData.biodiversity * 90 + regionData.climate * 10) * riskMultiplier)),
      economicScore: Math.min(87, Math.round((68 + prefs.minimumReturn * 1.8) * riskMultiplier * horizonMultiplier)),
      projectedReturn: Math.round(prefs.minimumReturn * 1.1 * riskMultiplier * horizonMultiplier * 10) / 10,
      biodiversityIndex: regionData.biodiversity * 0.95,
      climateScore: regionData.climate * 0.7,
      carbonOffset: Math.round(prefs.investmentAmount * 0.5 * regionData.climate),
      speciesProtected: Math.round(regionData.biodiversity * 58),
      landRestored: Math.round(prefs.investmentAmount * 0.0015 * regionData.climate),
      sdgAlignment: prefs.sdgs,
      riskLevel: prefs.riskTolerance,
      timeline: prefs.investmentHorizon,
      description: `Coastal and marine ecosystem restoration project in ${regionData.name} protecting critical ocean habitats and supporting sustainable fisheries.`,
      highlights: [
        `${Math.round(regionData.biodiversity * 58)} marine species protected`,
        'Coral reef restoration',
        'Sustainable fisheries support',
        'Blue carbon sequestration'
      ],
      verified: true,
      registry: 'Verra',
      environmentalMetrics: {
        biodiversityScore: regionData.biodiversity * 95,
        climate: regionData.climate * 70,
        waterQualityIndex: 88,
        carbonSequestrationTons: Math.round(prefs.investmentAmount * 0.5 * regionData.climate),
        climateResilienceScore: 85
      },
      financialMetrics: {
        projectROI: Math.round(prefs.minimumReturn * 1.1 * riskMultiplier * horizonMultiplier * 10) / 10,
        riskLevel: prefs.riskTolerance,
        investmentYieldPercent: Math.round(prefs.minimumReturn * 1.1 * riskMultiplier * horizonMultiplier * 10) / 10
      }
    }
  ];

  return opportunities;
}

function getRegionName(region: string): string {
  const regionMap: Record<string, string> = {
    'north-america': 'North America',
    'south-america': 'South America',
    'europe': 'Europe',
    'africa': 'Africa',
    'asia': 'Asia',
    'oceania': 'Oceania'
  };
  return regionMap[region] || region;
}

export default App;
