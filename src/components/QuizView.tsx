import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ContentCard } from './ContentCard';
import { mockContent } from './mockData';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface QuizViewProps {
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
  onShowLiveTV?: () => void;
}

type TVOrStreamingOption = 'livetv' | 'streaming';
type ContentTypeOption = 'serie' | 'film';
type TimeOption = '30min' | '1time' | '2timer' | '3timer+';
type GenreOption = 'drama' | 'komedie' | 'thriller' | 'scifi' | 'dokumentar' | 'romantikk';
type IntensityOption = 'lett' | 'balansert' | 'utfordrende';
type CompanyOption = 'alene' | 'partner' | 'venner' | 'familie_barn' | 'bare_voksne';

export function QuizView({ watchLater, toggleWatchLater, onShowLiveTV }: QuizViewProps) {
  const [step, setStep] = useState(1);
  const [tvOrStreaming, setTvOrStreaming] = useState<TVOrStreamingOption | null>(null);
  const [contentType, setContentType] = useState<ContentTypeOption | null>(null);
  const [time, setTime] = useState<TimeOption | null>(null);
  const [genre, setGenre] = useState<GenreOption | null>(null);
  const [intensity, setIntensity] = useState<IntensityOption | null>(null);
  const [company, setCompany] = useState<CompanyOption | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  
  const totalSteps = 6;

  const handleFinish = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setStep(1);
    setTvOrStreaming(null);
    setContentType(null);
    setTime(null);
    setGenre(null);
    setIntensity(null);
    setCompany(null);
    setShowResults(false);
    setShowTrailer(false);
  };

  const getRecommendations = () => {
    // Advanced filtering based on all quiz answers
    let filtered = [...mockContent];
    let scores = mockContent.map(content => ({ content, score: 0 }));

    // Content type filtering
    if (contentType) {
      filtered = filtered.filter(c => c.type === contentType);
    }

    // Time filtering (hard filter)
    if (time === '30min') {
      filtered = filtered.filter(c => c.duration && c.duration <= 45);
    } else if (time === '1time') {
      filtered = filtered.filter(c => c.duration && c.duration <= 90);
    } else if (time === '2timer') {
      filtered = filtered.filter(c => !c.duration || c.duration <= 150);
    }

    // Score-based matching
    scores = filtered.map(content => {
      let score = 0;
      
      // Genre matching
      if (genre && content.genres?.includes(genre)) score += 4;
      
      // Intensity matching
      if (intensity === 'lett' && content.intensity === 'lett') score += 3;
      if (intensity === 'balansert' && content.intensity === 'medium') score += 3;
      if (intensity === 'utfordrende' && content.intensity === 'intense') score += 3;
      
      // Company context
      if (company === 'familie_barn' && content.familyFriendly) score += 2;
      
      return { content, score };
    });

    // Sort by score and return top 5
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.content);
  };

  if (showResults) {
    const recommendations = getRecommendations();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-foreground text-3xl">Dine T-mood anbefalinger</h2>
          </div>
          <p className="text-muted-foreground">
            Basert på dine svar har vi funnet disse perfekte matchene til deg
          </p>
          <Button 
            onClick={resetQuiz}
            variant="outline"
            className="mt-4"
          >
            Start på nytt
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              isInWatchLater={watchLater.includes(content.id)}
              onToggleWatchLater={toggleWatchLater}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <Card className="p-8 bg-card border-border shadow-xl">
          <div className="mb-8">
            {/* Progress Bar */}
            <div className="relative h-2 bg-muted rounded-full mb-4 overflow-hidden">
              <div 
                className="absolute h-full bg-gradient-to-r from-primary to-[#00C8C8] transition-all duration-300 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Spørsmål {step} av {totalSteps}</p>
              <span className="text-xs text-primary">AI-matching</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-foreground text-2xl mb-2">Føler du live TV eller Streaming?</h2>
                <p className="text-muted-foreground">Velg hva du har lyst til å se på</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'livetv', label: '📺 Live TV' },
                  { value: 'streaming', label: '🎬 Streaming' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setTvOrStreaming(option.value as TVOrStreamingOption)}
                    variant={tvOrStreaming === option.value ? 'default' : 'outline'}
                    className="h-16 text-base"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => {
                  if (tvOrStreaming === 'livetv' && onShowLiveTV) {
                    onShowLiveTV();
                  } else {
                    setStep(2);
                  }
                }}
                disabled={!tvOrStreaming}
                className="w-full mt-4"
              >
                {tvOrStreaming === 'livetv' ? 'Se Live TV' : 'Neste'}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-foreground text-2xl mb-2">Serie eller film?</h2>
                <p className="text-muted-foreground">Velg hva du vil se på</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'serie', label: '📺 Serie' },
                  { value: 'film', label: '🎬 Film' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setContentType(option.value as ContentTypeOption)}
                    variant={contentType === option.value ? 'default' : 'outline'}
                    className="h-16"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Tilbake
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!contentType}
                  className="flex-1"
                >
                  Neste
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-foreground text-2xl mb-2">Hvor lang tid har du?</h2>
                <p className="text-muted-foreground">Velg hvor mye tid du har tilgjengelig</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '30min', label: '30 min' },
                  { value: '1time', label: '1 time' },
                  { value: '2timer', label: '2 timer' },
                  { value: '3timer+', label: '3+ timer' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setTime(option.value as TimeOption)}
                    variant={time === option.value ? 'default' : 'outline'}
                    className="h-16"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  Tilbake
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={!time}
                  className="flex-1"
                >
                  Neste
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-foreground text-2xl mb-2">Hvilken sjanger?</h2>
                <p className="text-muted-foreground">Velg din foretrukne sjanger</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'drama', label: 'Drama' },
                  { value: 'komedie', label: 'Komedie' },
                  { value: 'thriller', label: 'Thriller' },
                  { value: 'scifi', label: 'Sci-Fi' },
                  { value: 'dokumentar', label: 'Dokumentar' },
                  { value: 'romantikk', label: 'Romantikk' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setGenre(option.value as GenreOption)}
                    variant={genre === option.value ? 'default' : 'outline'}
                    className="h-16"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => setStep(3)}
                  variant="outline"
                  className="flex-1"
                >
                  Tilbake
                </Button>
                <Button
                  onClick={() => setStep(5)}
                  disabled={!genre}
                  className="flex-1"
                >
                  Neste
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-foreground text-2xl mb-2">Hvor "krevende" vil du at det skal være?</h2>
                <p className="text-muted-foreground">Velg intensitetsnivå</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'lett', label: 'Lett underholdning', desc: 'Jeg vil ikke tenke for mye' },
                  { value: 'balansert', label: 'Balansert', desc: 'En god blanding av underholdning og dybde' },
                  { value: 'utfordrende', label: 'Utfordrende', desc: 'Komplekse plott, tunge temaer, subtilitet' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setIntensity(option.value as IntensityOption)}
                    variant={intensity === option.value ? 'default' : 'outline'}
                    className="h-auto py-4 flex flex-col gap-1 items-start"
                  >
                    <span className="text-base">{option.label}</span>
                    <span className="text-xs opacity-70 text-left">{option.desc}</span>
                  </Button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => setStep(4)}
                  variant="outline"
                  className="flex-1"
                >
                  Tilbake
                </Button>
                <Button
                  onClick={() => setStep(6)}
                  disabled={!intensity}
                  className="flex-1"
                >
                  Neste
                </Button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-foreground text-2xl mb-2">Hvem ser du med?</h2>
                <p className="text-muted-foreground">(Kontekst er alt!)</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'alene', label: 'Alene' },
                  { value: 'partner', label: 'Partner / Kjæreste' },
                  { value: 'venner', label: 'Venner' },
                  { value: 'familie_barn', label: 'Familie (med barn)' },
                  { value: 'bare_voksne', label: 'Bare voksne' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setCompany(option.value as CompanyOption)}
                    variant={company === option.value ? 'default' : 'outline'}
                    className="h-14"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => setStep(5)}
                  variant="outline"
                  className="flex-1"
                >
                  Tilbake
                </Button>
                <Button
                  onClick={handleFinish}
                  disabled={!company}
                  className="flex-1 bg-gradient-to-r from-primary to-[#00C8C8] hover:opacity-90"
                >
                  Finn match
                </Button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
