import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ChevronRight, ChevronLeft, Target, DollarSign, Globe2, TrendingUp, Calendar, Percent } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import type { InvestmentPreferences } from '../types';

interface InvestmentFormProps {
  onComplete: (preferences: InvestmentPreferences) => void;
}

export default function InvestmentForm({ onComplete }: InvestmentFormProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<InvestmentPreferences>>({
    region: '',
    investmentAmount: 50000,
    sdgs: [],
    riskTolerance: 'medium',
    investmentHorizon: 'medium',
    minimumReturn: 8
  });

  const totalSteps = 6;

  const SDG_OPTIONS = [
    { value: 2, label: t.sdg2, description: t.sdg2Desc },
    { value: 6, label: t.sdg6, description: t.sdg6Desc },
    { value: 7, label: t.sdg7, description: t.sdg7Desc },
    { value: 13, label: t.sdg13, description: t.sdg13Desc },
    { value: 14, label: t.sdg14, description: t.sdg14Desc },
    { value: 15, label: t.sdg15, description: t.sdg15Desc }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData as InvestmentPreferences);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSDGToggle = (sdg: number) => {
    const currentSDGs = formData.sdgs || [];
    if (currentSDGs.includes(sdg)) {
      setFormData({ ...formData, sdgs: currentSDGs.filter(s => s !== sdg) });
    } else {
      setFormData({ ...formData, sdgs: [...currentSDGs, sdg] });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.region !== '';
      case 2:
        return formData.investmentAmount && formData.investmentAmount > 0;
      case 3:
        return formData.sdgs && formData.sdgs.length > 0;
      case 4:
        return formData.riskTolerance !== undefined;
      case 5:
        return formData.investmentHorizon !== undefined;
      case 6:
        return formData.minimumReturn !== undefined;
      default:
        return false;
    }
  };

  return (
    <section id="investment-form" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.formTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.formSubtitle}
            </p>
          </div>

          <Card className="shadow-xl border-emerald-200/50 dark:border-emerald-800/50">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-xl">{t.step} {currentStep} {t.of} {totalSteps}</CardTitle>
                <div className="flex gap-1">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-8 rounded-full transition-all ${
                        i < currentStep
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="min-h-[300px]">
                {currentStep === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <Globe2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t.targetRegion}</h3>
                        <p className="text-sm text-muted-foreground">{t.whereInvest}</p>
                      </div>
                    </div>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t.selectRegion} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north-america">{t.northAmerica}</SelectItem>
                        <SelectItem value="south-america">{t.southAmerica}</SelectItem>
                        <SelectItem value="europe">{t.europe}</SelectItem>
                        <SelectItem value="africa">{t.africa}</SelectItem>
                        <SelectItem value="asia">{t.asia}</SelectItem>
                        <SelectItem value="oceania">{t.oceania}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t.investmentAmount}</h3>
                        <p className="text-sm text-muted-foreground">{t.howMuchInvest}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="amount">{t.amountUSD}</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="10000"
                        step="10000"
                        value={formData.investmentAmount}
                        onChange={(e) => setFormData({ ...formData, investmentAmount: Number(e.target.value) })}
                        className="text-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        {t.currentAmount}: ${formData.investmentAmount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t.sdgSelection}</h3>
                        <p className="text-sm text-muted-foreground">{t.selectPrioritySDGs}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {SDG_OPTIONS.map((sdg) => (
                        <div
                          key={sdg.value}
                          className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                          onClick={() => handleSDGToggle(sdg.value)}
                        >
                          <Checkbox
                            id={`sdg-${sdg.value}`}
                            checked={formData.sdgs?.includes(sdg.value)}
                            onCheckedChange={() => handleSDGToggle(sdg.value)}
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={`sdg-${sdg.value}`}
                              className="font-medium cursor-pointer"
                            >
                              {sdg.label}
                            </Label>
                            <p className="text-sm text-muted-foreground">{sdg.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t.riskTolerance}</h3>
                        <p className="text-sm text-muted-foreground">{t.riskAppetite}</p>
                      </div>
                    </div>
                    <RadioGroup
                      value={formData.riskTolerance}
                      onValueChange={(value) => setFormData({ ...formData, riskTolerance: value as 'low' | 'medium' | 'high' })}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <RadioGroupItem value="low" id="risk-low" />
                        <div className="flex-1">
                          <Label htmlFor="risk-low" className="font-medium cursor-pointer">
                            {t.lowRisk}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t.lowRiskDesc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <RadioGroupItem value="medium" id="risk-medium" />
                        <div className="flex-1">
                          <Label htmlFor="risk-medium" className="font-medium cursor-pointer">
                            {t.mediumRisk}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t.mediumRiskDesc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <RadioGroupItem value="high" id="risk-high" />
                        <div className="flex-1">
                          <Label htmlFor="risk-high" className="font-medium cursor-pointer">
                            {t.highRisk}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t.highRiskDesc}
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <Calendar className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t.investmentHorizon}</h3>
                        <p className="text-sm text-muted-foreground">{t.howLongInvest}</p>
                      </div>
                    </div>
                    <RadioGroup
                      value={formData.investmentHorizon}
                      onValueChange={(value) => setFormData({ ...formData, investmentHorizon: value as 'short' | 'medium' | 'long' })}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <RadioGroupItem value="short" id="horizon-short" />
                        <div className="flex-1">
                          <Label htmlFor="horizon-short" className="font-medium cursor-pointer">
                            {t.shortTerm}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t.shortTermDesc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <RadioGroupItem value="medium" id="horizon-medium" />
                        <div className="flex-1">
                          <Label htmlFor="horizon-medium" className="font-medium cursor-pointer">
                            {t.mediumTerm}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t.mediumTermDesc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <RadioGroupItem value="long" id="horizon-long" />
                        <div className="flex-1">
                          <Label htmlFor="horizon-long" className="font-medium cursor-pointer">
                            {t.longTerm}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t.longTermDesc}
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <Percent className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t.minimumReturn}</h3>
                        <p className="text-sm text-muted-foreground">{t.targetReturn}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>{t.annualReturn}</Label>
                          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {formData.minimumReturn}%
                          </span>
                        </div>
                        <Slider
                          value={[formData.minimumReturn || 8]}
                          onValueChange={(value) => setFormData({ ...formData, minimumReturn: value[0] })}
                          min={3}
                          max={20}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>3%</span>
                          <span>20%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <p className="text-sm text-muted-foreground">
                          {t.basedOnReturn} {formData.minimumReturn}% {t.targetReturn.toLowerCase()} ${formData.investmentAmount?.toLocaleString()}, {t.couldEarn} <span className="font-semibold text-foreground">
                            ${((formData.investmentAmount || 0) * (formData.minimumReturn || 0) / 100).toLocaleString()}
                          </span> {t.annually}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-emerald-300 dark:border-emerald-700"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {t.previous}
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {currentStep === totalSteps ? t.findOpportunities : t.next}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
