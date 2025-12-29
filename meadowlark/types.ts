export interface InvestmentPreferences {
  region: string;
  investmentAmount: number;
  sdgs: number[];
  riskTolerance: 'low' | 'medium' | 'high';
  investmentHorizon: 'short' | 'medium' | 'long';
  minimumReturn: number;
}

export interface EnvironmentalMetrics {
  biodiversityScore: number;
  climate: number;
  waterQualityIndex?: number;
  carbonSequestrationTons?: number;
  climateResilienceScore?: number;
}

export interface FinancialMetrics {
  projectROI: number;
  riskLevel: string;
  investmentYieldPercent: number;
}

export interface InvestmentOpportunity {
  id: string;
  name: string;
  region: string;
  registry?: string;
  link?: string;
  verified?: boolean;
  investmentAmount: number;
  conservationScore: number;
  economicScore: number;
  projectedReturn: number;
  biodiversityIndex: number;
  climateScore: number;
  carbonOffset: number;
  speciesProtected: number;
  landRestored: number;
  sdgAlignment: number[];
  riskLevel: string;
  timeline: string;
  description: string;
  highlights: string[];
  environmentalMetrics?: EnvironmentalMetrics;
  financialMetrics?: FinancialMetrics;
}

export type Language = 'en' | 'es' | 'fr' | 'zh';

export interface Translations {
  appName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  learnMore: string;
  formTitle: string;
  formSubtitle: string;
  step: string;
  of: string;
  next: string;
  previous: string;
  findOpportunities: string;
  newSearch: string;
  targetRegion: string;
  selectRegion: string;
  whereInvest: string;
  investmentAmount: string;
  howMuchInvest: string;
  amountUSD: string;
  currentAmount: string;
  sdgSelection: string;
  selectPrioritySDGs: string;
  sdg2: string;
  sdg2Desc: string;
  sdg6: string;
  sdg6Desc: string;
  sdg7: string;
  sdg7Desc: string;
  sdg13: string;
  sdg13Desc: string;
  sdg14: string;
  sdg14Desc: string;
  sdg15: string;
  sdg15Desc: string;
  riskTolerance: string;
  riskAppetite: string;
  lowRisk: string;
  lowRiskDesc: string;
  mediumRisk: string;
  mediumRiskDesc: string;
  highRisk: string;
  highRiskDesc: string;
  investmentHorizon: string;
  howLongInvest: string;
  shortTerm: string;
  shortTermDesc: string;
  mediumTerm: string;
  mediumTermDesc: string;
  longTerm: string;
  longTermDesc: string;
  minimumReturn: string;
  targetReturn: string;
  annualReturn: string;
  basedOnReturn: string;
  couldEarn: string;
  annually: string;
  opportunities: string;
  basedOnPreferences: string;
  foundMatching: string;
  overview: string;
  environmental: string;
  economic: string;
  conservationScore: string;
  conservationScoreDesc: string;
  economicScore: string;
  projectedReturn: string;
  projectedReturnDesc: string;
  keyHighlights: string;
  investNow: string;
  viewDetails: string;
  biodiversityIndex: string;
  biodiversityDesc: string;
  climateScore: string;
  climateDesc: string;
  carbonOffset: string;
  speciesProtected: string;
  landRestored: string;
  tonsPerYear: string;
  species: string;
  hectares: string;
  sdgAlignment: string;
  goal: string;
  projectedAnnualReturn: string;
  perYear: string;
  annualIncome: string;
  yearProjection: string;
  investmentTimeline: string;
  termInvestment: string;
  quarterlyReporting: string;
  annualImpact: string;
  exitFlexibility: string;
  riskAssessment: string;
  marketRisk: string;
  riskDescription: string;
  low: string;
  medium: string;
  high: string;
  about: string;
  howItWorks: string;
  privacy: string;
  terms: string;
  contact: string;
  builtWith: string;
  northAmerica: string;
  southAmerica: string;
  europe: string;
  africa: string;
  asia: string;
  oceania: string;
  reforestationInitiative: string;
  reforestationDesc: string;
  sustainableAgFund: string;
  sustainableAgDesc: string;
  marineConservation: string;
  marineConservationDesc: string;
  protectedSpecies: string;
  offsetAnnually: string;
  hectaresRestored: string;
  communityLed: string;
  regenerativeFarming: string;
  farmerPartnerships: string;
  marineSpeciesProtected: string;
  coralReef: string;
  sustainableFisheries: string;
  blueCarbon: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Meadowlark',
    tagline: 'Conservation Investment Platform',
    heroTitle: 'Invest in Nature, Secure the Future',
    heroSubtitle: 'Discover conservation investment opportunities powered by biodiversity indices, climate data, and AI-driven insights. Make an impact while achieving your financial goals.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    formTitle: 'Find Your Conservation Investment',
    formSubtitle: 'Answer a few questions to discover personalized opportunities',
    step: 'Step',
    of: 'of',
    next: 'Next',
    previous: 'Previous',
    findOpportunities: 'Find Opportunities',
    newSearch: 'New Search',
    targetRegion: 'Target Region',
    selectRegion: 'Select a region',
    whereInvest: 'Where would you like to invest?',
    investmentAmount: 'Investment Amount',
    howMuchInvest: 'How much would you like to invest?',
    amountUSD: 'Amount (USD)',
    currentAmount: 'Current amount',
    sdgSelection: 'Sustainable Development Goals',
    selectPrioritySDGs: 'Select your priority SDGs',
    sdg2: 'Goal 2: Zero Hunger',
    sdg2Desc: 'End hunger and promote sustainable agriculture',
    sdg6: 'Goal 6: Clean Water',
    sdg6Desc: 'Ensure water and sanitation for all',
    sdg7: 'Goal 7: Clean Energy',
    sdg7Desc: 'Affordable and clean energy access',
    sdg13: 'Goal 13: Climate Action',
    sdg13Desc: 'Combat climate change and its impacts',
    sdg14: 'Goal 14: Life Below Water',
    sdg14Desc: 'Conserve oceans and marine resources',
    sdg15: 'Goal 15: Life on Land',
    sdg15Desc: 'Protect terrestrial ecosystems',
    riskTolerance: 'Risk Tolerance',
    riskAppetite: "What's your risk appetite?",
    lowRisk: 'Low Risk',
    lowRiskDesc: 'Conservative approach with stable, predictable returns',
    mediumRisk: 'Medium Risk',
    mediumRiskDesc: 'Balanced approach with moderate growth potential',
    highRisk: 'High Risk',
    highRiskDesc: 'Aggressive approach with higher return potential',
    investmentHorizon: 'Investment Horizon',
    howLongInvest: 'How long can you invest?',
    shortTerm: 'Short-term (1-3 years)',
    shortTermDesc: 'Quick impact projects with near-term returns',
    mediumTerm: 'Medium-term (4-7 years)',
    mediumTermDesc: 'Balanced timeline for sustainable growth',
    longTerm: 'Long-term (7+ years)',
    longTermDesc: 'Maximum impact with compounding benefits',
    minimumReturn: 'Minimum Expected Return',
    targetReturn: "What's your target annual return?",
    annualReturn: 'Annual Return (%)',
    basedOnReturn: 'Based on your',
    couldEarn: 'you could earn approximately',
    annually: 'annually',
    opportunities: 'Your Investment Opportunities',
    basedOnPreferences: 'Based on your preferences, we found',
    foundMatching: 'matching opportunities',
    overview: 'Overview',
    environmental: 'Environmental',
    economic: 'Economic',
    conservationScore: 'Conservation Score',
    conservationScoreDesc: 'Based on biodiversity index and climate data analysis',
    economicScore: 'Economic Score',
    projectedReturn: 'Projected return',
    projectedReturnDesc: 'annually',
    keyHighlights: 'Key Highlights',
    investNow: 'Invest Now',
    viewDetails: 'View Details',
    biodiversityIndex: 'Biodiversity Index',
    biodiversityDesc: 'Measures ecosystem health and species diversity',
    climateScore: 'Climate Score',
    climateDesc: 'Climate stability and resilience index',
    carbonOffset: 'Tons CO₂ Offset/Year',
    speciesProtected: 'Species Protected',
    landRestored: 'Hectares Restored',
    tonsPerYear: 'tons CO₂ offset annually',
    species: 'species protected',
    hectares: 'hectares restored',
    sdgAlignment: 'SDG Alignment',
    goal: 'Goal',
    projectedAnnualReturn: 'Projected Annual Return',
    perYear: 'per year',
    annualIncome: 'Annual Income',
    yearProjection: '5-Year Projection',
    investmentTimeline: 'Investment Timeline',
    termInvestment: '-term Investment',
    quarterlyReporting: 'Quarterly reporting',
    annualImpact: 'Annual impact assessment',
    exitFlexibility: 'Exit flexibility',
    riskAssessment: 'Risk Assessment',
    marketRisk: 'Market Risk',
    riskDescription: 'This investment carries',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    about: 'About',
    howItWorks: 'How It Works',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    builtWith: 'Built with',
    northAmerica: 'North America',
    southAmerica: 'South America',
    europe: 'Europe',
    africa: 'Africa',
    asia: 'Asia',
    oceania: 'Oceania',
    reforestationInitiative: 'Reforestation Initiative',
    reforestationDesc: 'A comprehensive reforestation project focused on restoring native ecosystems while generating sustainable returns through carbon credits and eco-tourism.',
    sustainableAgFund: 'Sustainable Agriculture Fund',
    sustainableAgDesc: 'Innovative sustainable agriculture initiative combining regenerative farming practices with biodiversity conservation.',
    marineConservation: 'Marine Conservation Project',
    marineConservationDesc: 'Coastal and marine ecosystem restoration project protecting critical ocean habitats and supporting sustainable fisheries.',
    protectedSpecies: 'species protected',
    offsetAnnually: 'tons CO₂ offset annually',
    hectaresRestored: 'hectares restored',
    communityLed: 'Community-led conservation model',
    regenerativeFarming: 'Regenerative farming practices',
    farmerPartnerships: 'Local farmer partnerships',
    marineSpeciesProtected: 'marine species protected',
    coralReef: 'Coral reef restoration',
    sustainableFisheries: 'Sustainable fisheries support',
    blueCarbon: 'Blue carbon sequestration',
  },
  es: {
    appName: 'Meadowlark',
    tagline: 'Plataforma de Inversión en Conservación',
    heroTitle: 'Invierte en la Naturaleza, Asegura el Futuro',
    heroSubtitle: 'Descubre oportunidades de inversión en conservación impulsadas por índices de biodiversidad, datos climáticos e información basada en IA. Genera impacto mientras alcanzas tus objetivos financieros.',
    getStarted: 'Comenzar',
    learnMore: 'Saber Más',
    formTitle: 'Encuentra Tu Inversión en Conservación',
    formSubtitle: 'Responde algunas preguntas para descubrir oportunidades personalizadas',
    step: 'Paso',
    of: 'de',
    next: 'Siguiente',
    previous: 'Anterior',
    findOpportunities: 'Buscar Oportunidades',
    newSearch: 'Nueva Búsqueda',
    targetRegion: 'Región Objetivo',
    selectRegion: 'Selecciona una región',
    whereInvest: '¿Dónde te gustaría invertir?',
    investmentAmount: 'Monto de Inversión',
    howMuchInvest: '¿Cuánto te gustaría invertir?',
    amountUSD: 'Monto (USD)',
    currentAmount: 'Monto actual',
    sdgSelection: 'Objetivos de Desarrollo Sostenible',
    selectPrioritySDGs: 'Selecciona tus ODS prioritarios',
    sdg2: 'Objetivo 2: Hambre Cero',
    sdg2Desc: 'Acabar con el hambre y promover la agricultura sostenible',
    sdg6: 'Objetivo 6: Agua Limpia',
    sdg6Desc: 'Garantizar agua y saneamiento para todos',
    sdg7: 'Objetivo 7: Energía Limpia',
    sdg7Desc: 'Acceso a energía asequible y limpia',
    sdg13: 'Objetivo 13: Acción Climática',
    sdg13Desc: 'Combatir el cambio climático y sus impactos',
    sdg14: 'Objetivo 14: Vida Submarina',
    sdg14Desc: 'Conservar océanos y recursos marinos',
    sdg15: 'Objetivo 15: Vida Terrestre',
    sdg15Desc: 'Proteger ecosistemas terrestres',
    riskTolerance: 'Tolerancia al Riesgo',
    riskAppetite: '¿Cuál es tu apetito de riesgo?',
    lowRisk: 'Riesgo Bajo',
    lowRiskDesc: 'Enfoque conservador con retornos estables y predecibles',
    mediumRisk: 'Riesgo Medio',
    mediumRiskDesc: 'Enfoque equilibrado con potencial de crecimiento moderado',
    highRisk: 'Riesgo Alto',
    highRiskDesc: 'Enfoque agresivo con mayor potencial de retorno',
    investmentHorizon: 'Horizonte de Inversión',
    howLongInvest: '¿Por cuánto tiempo puedes invertir?',
    shortTerm: 'Corto plazo (1-3 años)',
    shortTermDesc: 'Proyectos de impacto rápido con retornos a corto plazo',
    mediumTerm: 'Mediano plazo (4-7 años)',
    mediumTermDesc: 'Cronograma equilibrado para crecimiento sostenible',
    longTerm: 'Largo plazo (7+ años)',
    longTermDesc: 'Máximo impacto con beneficios compuestos',
    minimumReturn: 'Retorno Mínimo Esperado',
    targetReturn: '¿Cuál es tu retorno anual objetivo?',
    annualReturn: 'Retorno Anual (%)',
    basedOnReturn: 'Basado en tu objetivo de',
    couldEarn: 'podrías ganar aproximadamente',
    annually: 'anualmente',
    opportunities: 'Tus Oportunidades de Inversión',
    basedOnPreferences: 'Según tus preferencias, encontramos',
    foundMatching: 'oportunidades coincidentes',
    overview: 'Resumen',
    environmental: 'Ambiental',
    economic: 'Económico',
    conservationScore: 'Puntuación de Conservación',
    conservationScoreDesc: 'Basado en índice de biodiversidad y análisis de datos climáticos',
    economicScore: 'Puntuación Económica',
    projectedReturn: 'Retorno proyectado',
    projectedReturnDesc: 'anualmente',
    keyHighlights: 'Aspectos Destacados',
    investNow: 'Invertir Ahora',
    viewDetails: 'Ver Detalles',
    biodiversityIndex: 'Índice de Biodiversidad',
    biodiversityDesc: 'Mide la salud del ecosistema y diversidad de especies',
    climateScore: 'Puntuación Climática',
    climateDesc: 'Índice de estabilidad y resiliencia climática',
    carbonOffset: 'Toneladas CO₂ Compensadas/Año',
    speciesProtected: 'Especies Protegidas',
    landRestored: 'Hectáreas Restauradas',
    tonsPerYear: 'toneladas CO₂ compensadas anualmente',
    species: 'especies protegidas',
    hectares: 'hectáreas restauradas',
    sdgAlignment: 'Alineación con ODS',
    goal: 'Objetivo',
    projectedAnnualReturn: 'Retorno Anual Proyectado',
    perYear: 'por año',
    annualIncome: 'Ingreso Anual',
    yearProjection: 'Proyección a 5 Años',
    investmentTimeline: 'Cronograma de Inversión',
    termInvestment: ' plazo',
    quarterlyReporting: 'Informes trimestrales',
    annualImpact: 'Evaluación de impacto anual',
    exitFlexibility: 'Flexibilidad de salida',
    riskAssessment: 'Evaluación de Riesgo',
    marketRisk: 'Riesgo de Mercado',
    riskDescription: 'Esta inversión conlleva un riesgo',
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
    about: 'Acerca de',
    howItWorks: 'Cómo Funciona',
    privacy: 'Privacidad',
    terms: 'Términos',
    contact: 'Contacto',
    builtWith: 'Construido con',
    northAmerica: 'América del Norte',
    southAmerica: 'América del Sur',
    europe: 'Europa',
    africa: 'África',
    asia: 'Asia',
    oceania: 'Oceanía',
    reforestationInitiative: 'Iniciativa de Reforestación',
    reforestationDesc: 'Un proyecto integral de reforestación enfocado en restaurar ecosistemas nativos mientras genera retornos sostenibles a través de créditos de carbono y ecoturismo.',
    sustainableAgFund: 'Fondo de Agricultura Sostenible',
    sustainableAgDesc: 'Iniciativa innovadora de agricultura sostenible que combina prácticas de agricultura regenerativa con conservación de biodiversidad.',
    marineConservation: 'Proyecto de Conservación Marina',
    marineConservationDesc: 'Proyecto de restauración de ecosistemas costeros y marinos que protege hábitats oceánicos críticos y apoya la pesca sostenible.',
    protectedSpecies: 'especies protegidas',
    offsetAnnually: 'toneladas CO₂ compensadas anualmente',
    hectaresRestored: 'hectáreas restauradas',
    communityLed: 'Modelo de conservación liderado por la comunidad',
    regenerativeFarming: 'Prácticas de agricultura regenerativa',
    farmerPartnerships: 'Asociaciones con agricultores locales',
    marineSpeciesProtected: 'especies marinas protegidas',
    coralReef: 'Restauración de arrecifes de coral',
    sustainableFisheries: 'Apoyo a la pesca sostenible',
    blueCarbon: 'Secuestro de carbono azul',
  },
  fr: {
    appName: 'Meadowlark',
    tagline: "Plateforme d'Investissement en Conservation",
    heroTitle: "Investissez dans la Nature, Sécurisez l'Avenir",
    heroSubtitle: "Découvrez des opportunités d'investissement en conservation alimentées par des indices de biodiversité, des données climatiques et des informations basées sur l'IA. Ayez un impact tout en atteignant vos objectifs financiers.",
    getStarted: 'Commencer',
    learnMore: 'En Savoir Plus',
    formTitle: 'Trouvez Votre Investissement en Conservation',
    formSubtitle: 'Répondez à quelques questions pour découvrir des opportunités personnalisées',
    step: 'Étape',
    of: 'sur',
    next: 'Suivant',
    previous: 'Précédent',
    findOpportunities: 'Trouver des Opportunités',
    newSearch: 'Nouvelle Recherche',
    targetRegion: 'Région Cible',
    selectRegion: 'Sélectionnez une région',
    whereInvest: 'Où souhaitez-vous investir ?',
    investmentAmount: "Montant d'Investissement",
    howMuchInvest: 'Combien souhaitez-vous investir ?',
    amountUSD: 'Montant (USD)',
    currentAmount: 'Montant actuel',
    sdgSelection: 'Objectifs de Développement Durable',
    selectPrioritySDGs: 'Sélectionnez vos ODD prioritaires',
    sdg2: 'Objectif 2 : Faim Zéro',
    sdg2Desc: "Éliminer la faim et promouvoir l'agriculture durable",
    sdg6: 'Objectif 6 : Eau Propre',
    sdg6Desc: "Garantir l'eau et l'assainissement pour tous",
    sdg7: 'Objectif 7 : Énergie Propre',
    sdg7Desc: 'Accès à une énergie abordable et propre',
    sdg13: 'Objectif 13 : Action Climatique',
    sdg13Desc: 'Lutter contre le changement climatique et ses impacts',
    sdg14: 'Objectif 14 : Vie Aquatique',
    sdg14Desc: 'Conserver les océans et les ressources marines',
    sdg15: 'Objectif 15 : Vie Terrestre',
    sdg15Desc: 'Protéger les écosystèmes terrestres',
    riskTolerance: 'Tolérance au Risque',
    riskAppetite: 'Quel est votre appétit pour le risque ?',
    lowRisk: 'Risque Faible',
    lowRiskDesc: 'Approche conservatrice avec des rendements stables et prévisibles',
    mediumRisk: 'Risque Moyen',
    mediumRiskDesc: 'Approche équilibrée avec un potentiel de croissance modéré',
    highRisk: 'Risque Élevé',
    highRiskDesc: 'Approche agressive avec un potentiel de rendement plus élevé',
    investmentHorizon: "Horizon d'Investissement",
    howLongInvest: 'Combien de temps pouvez-vous investir ?',
    shortTerm: 'Court terme (1-3 ans)',
    shortTermDesc: 'Projets à impact rapide avec des rendements à court terme',
    mediumTerm: 'Moyen terme (4-7 ans)',
    mediumTermDesc: 'Calendrier équilibré pour une croissance durable',
    longTerm: 'Long terme (7+ ans)',
    longTermDesc: 'Impact maximal avec des avantages composés',
    minimumReturn: 'Rendement Minimum Attendu',
    targetReturn: 'Quel est votre rendement annuel cible ?',
    annualReturn: 'Rendement Annuel (%)',
    basedOnReturn: 'Sur la base de votre objectif de',
    couldEarn: 'vous pourriez gagner environ',
    annually: 'annuellement',
    opportunities: "Vos Opportunités d'Investissement",
    basedOnPreferences: 'Selon vos préférences, nous avons trouvé',
    foundMatching: 'opportunités correspondantes',
    overview: 'Aperçu',
    environmental: 'Environnemental',
    economic: 'Économique',
    conservationScore: 'Score de Conservation',
    conservationScoreDesc: "Basé sur l'indice de biodiversité et l'analyse des données climatiques",
    economicScore: 'Score Économique',
    projectedReturn: 'Rendement projeté',
    projectedReturnDesc: 'annuellement',
    keyHighlights: 'Points Clés',
    investNow: 'Investir Maintenant',
    viewDetails: 'Voir les Détails',
    biodiversityIndex: 'Indice de Biodiversité',
    biodiversityDesc: "Mesure la santé de l'écosystème et la diversité des espèces",
    climateScore: 'Score Climatique',
    climateDesc: 'Indice de stabilité et de résilience climatique',
    carbonOffset: 'Tonnes CO₂ Compensées/An',
    speciesProtected: 'Espèces Protégées',
    landRestored: 'Hectares Restaurés',
    tonsPerYear: 'tonnes CO₂ compensées annuellement',
    species: 'espèces protégées',
    hectares: 'hectares restaurés',
    sdgAlignment: 'Alignement ODD',
    goal: 'Objectif',
    projectedAnnualReturn: 'Rendement Annuel Projeté',
    perYear: 'par an',
    annualIncome: 'Revenu Annuel',
    yearProjection: 'Projection sur 5 Ans',
    investmentTimeline: "Calendrier d'Investissement",
    termInvestment: ' terme',
    quarterlyReporting: 'Rapports trimestriels',
    annualImpact: "Évaluation d'impact annuelle",
    exitFlexibility: 'Flexibilité de sortie',
    riskAssessment: 'Évaluation du Risque',
    marketRisk: 'Risque de Marché',
    riskDescription: 'Cet investissement comporte un risque',
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
    about: 'À Propos',
    howItWorks: 'Comment Ça Marche',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    contact: 'Contact',
    builtWith: 'Construit avec',
    northAmerica: 'Amérique du Nord',
    southAmerica: 'Amérique du Sud',
    europe: 'Europe',
    africa: 'Afrique',
    asia: 'Asie',
    oceania: 'Océanie',
    reforestationInitiative: 'Initiative de Reforestation',
    reforestationDesc: 'Un projet complet de reforestation axé sur la restauration des écosystèmes natifs tout en générant des rendements durables grâce aux crédits carbone et à l\'écotourisme.',
    sustainableAgFund: 'Fonds d\'Agriculture Durable',
    sustainableAgDesc: 'Initiative innovante d\'agriculture durable combinant des pratiques agricoles régénératives avec la conservation de la biodiversité.',
    marineConservation: 'Projet de Conservation Marine',
    marineConservationDesc: 'Projet de restauration des écosystèmes côtiers et marins protégeant les habitats océaniques critiques et soutenant la pêche durable.',
    protectedSpecies: 'espèces protégées',
    offsetAnnually: 'tonnes CO₂ compensées annuellement',
    hectaresRestored: 'hectares restaurés',
    communityLed: 'Modèle de conservation communautaire',
    regenerativeFarming: 'Pratiques agricoles régénératives',
    farmerPartnerships: 'Partenariats avec les agriculteurs locaux',
    marineSpeciesProtected: 'espèces marines protégées',
    coralReef: 'Restauration des récifs coralliens',
    sustainableFisheries: 'Soutien à la pêche durable',
    blueCarbon: 'Séquestration du carbone bleu',
  },
  zh: {
    appName: 'Meadowlark',
    tagline: '保护投资平台',
    heroTitle: '投资自然，保障未来',
    heroSubtitle: '发现由生物多样性指数、气候数据和人工智能驱动的保护投资机会。在实现财务目标的同时产生影响。',
    getStarted: '开始',
    learnMore: '了解更多',
    formTitle: '找到您的保护投资',
    formSubtitle: '回答几个问题以发现个性化机会',
    step: '步骤',
    of: '/',
    next: '下一步',
    previous: '上一步',
    findOpportunities: '寻找机会',
    newSearch: '新搜索',
    targetRegion: '目标地区',
    selectRegion: '选择一个地区',
    whereInvest: '您想在哪里投资？',
    investmentAmount: '投资金额',
    howMuchInvest: '您想投资多少？',
    amountUSD: '金额（美元）',
    currentAmount: '当前金额',
    sdgSelection: '可持续发展目标',
    selectPrioritySDGs: '选择您的优先SDG',
    sdg2: '目标2：零饥饿',
    sdg2Desc: '消除饥饿并促进可持续农业',
    sdg6: '目标6：清洁水',
    sdg6Desc: '确保所有人都能获得水和卫生设施',
    sdg7: '目标7：清洁能源',
    sdg7Desc: '获得负担得起的清洁能源',
    sdg13: '目标13：气候行动',
    sdg13Desc: '应对气候变化及其影响',
    sdg14: '目标14：水下生物',
    sdg14Desc: '保护海洋和海洋资源',
    sdg15: '目标15：陆地生物',
    sdg15Desc: '保护陆地生态系统',
    riskTolerance: '风险承受能力',
    riskAppetite: '您的风险偏好是什么？',
    lowRisk: '低风险',
    lowRiskDesc: '保守方法，回报稳定可预测',
    mediumRisk: '中等风险',
    mediumRiskDesc: '平衡方法，具有适度增长潜力',
    highRisk: '高风险',
    highRiskDesc: '激进方法，具有更高的回报潜力',
    investmentHorizon: '投资期限',
    howLongInvest: '您可以投资多长时间？',
    shortTerm: '短期（1-3年）',
    shortTermDesc: '快速影响项目，短期回报',
    mediumTerm: '中期（4-7年）',
    mediumTermDesc: '可持续增长的平衡时间表',
    longTerm: '长期（7年以上）',
    longTermDesc: '最大影响与复合收益',
    minimumReturn: '最低预期回报',
    targetReturn: '您的目标年回报率是多少？',
    annualReturn: '年回报率（%）',
    basedOnReturn: '基于您的',
    couldEarn: '目标回报率，您每年可以赚取约',
    annually: '',
    opportunities: '您的投资机会',
    basedOnPreferences: '根据您的偏好，我们找到了',
    foundMatching: '个匹配的机会',
    overview: '概览',
    environmental: '环境',
    economic: '经济',
    conservationScore: '保护评分',
    conservationScoreDesc: '基于生物多样性指数和气候数据分析',
    economicScore: '经济评分',
    projectedReturn: '预计回报',
    projectedReturnDesc: '每年',
    keyHighlights: '关键亮点',
    investNow: '立即投资',
    viewDetails: '查看详情',
    biodiversityIndex: '生物多样性指数',
    biodiversityDesc: '衡量生态系统健康和物种多样性',
    climateScore: '气候评分',
    climateDesc: '气候稳定性和韧性指数',
    carbonOffset: '每年抵消的二氧化碳吨数',
    speciesProtected: '受保护物种',
    landRestored: '恢复的公顷数',
    tonsPerYear: '每年抵消的二氧化碳吨数',
    species: '受保护物种',
    hectares: '恢复的公顷数',
    sdgAlignment: 'SDG对齐',
    goal: '目标',
    projectedAnnualReturn: '预计年回报',
    perYear: '每年',
    annualIncome: '年收入',
    yearProjection: '5年预测',
    investmentTimeline: '投资时间表',
    termInvestment: '期投资',
    quarterlyReporting: '季度报告',
    annualImpact: '年度影响评估',
    exitFlexibility: '退出灵活性',
    riskAssessment: '风险评估',
    marketRisk: '市场风险',
    riskDescription: '此投资具有',
    low: '低',
    medium: '中',
    high: '高',
    about: '关于',
    howItWorks: '如何运作',
    privacy: '隐私',
    terms: '条款',
    contact: '联系',
    builtWith: '构建于',
    northAmerica: '北美',
    southAmerica: '南美',
    europe: '欧洲',
    africa: '非洲',
    asia: '亚洲',
    oceania: '大洋洲',
    reforestationInitiative: '重新造林倡议',
    reforestationDesc: '一个全面的重新造林项目，专注于恢复本地生态系统，同时通过碳信用和生态旅游产生可持续回报。',
    sustainableAgFund: '可持续农业基金',
    sustainableAgDesc: '创新的可持续农业倡议，将再生农业实践与生物多样性保护相结合。',
    marineConservation: '海洋保护项目',
    marineConservationDesc: '沿海和海洋生态系统恢复项目，保护关键海洋栖息地并支持可持续渔业。',
    protectedSpecies: '受保护物种',
    offsetAnnually: '每年抵消的二氧化碳吨数',
    hectaresRestored: '恢复的公顷数',
    communityLed: '社区主导的保护模式',
    regenerativeFarming: '再生农业实践',
    farmerPartnerships: '与当地农民的合作伙伴关系',
    marineSpeciesProtected: '受保护的海洋物种',
    coralReef: '珊瑚礁恢复',
    sustainableFisheries: '可持续渔业支持',
    blueCarbon: '蓝碳封存',
  },
};
