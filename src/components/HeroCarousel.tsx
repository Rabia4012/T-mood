import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Play, Info, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlatformIcon } from './PlatformIcons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface HeroContent {
  id: string;
  title: string;
  description: string;
  platform: string;
  image: string;
  category: string;
  rating: number;
  year: number;
  trailer?: string;
}

const heroContent: HeroContent[] = [
  {
    id: 'hero1',
    title: 'The Last Expedition',
    description: 'En episk actionfilm om en gruppe utforskere som må redde verden fra en global katastrofe.',
    platform: 'Netflix',
    image: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjAwNzA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Action & Thriller',
    rating: 8.5,
    year: 2024,
  },
  {
    id: 'hero2',
    title: 'Dark Secrets',
    description: 'En spennende thriller om mysterier som avdekkes i en liten by. Intet er som det ser ut til.',
    platform: 'HBO Max',
    image: 'https://images.unsplash.com/photo-1647264157150-491bfd016aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMGRhcmslMjBteXN0ZXJ5fGVufDF8fHx8MTc2MDEyMjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Drama & Mystery',
    rating: 8.2,
    year: 2024,
  },
  {
    id: 'hero3',
    title: 'Family Adventure',
    description: 'En morsom familiefilm om eventyr og vennskap. Perfekt for hele familien!',
    platform: 'Disney+',
    image: 'https://images.unsplash.com/photo-1628676306092-1238ef1dc851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaGlsZHJlbiUyMGhhcHB5fGVufDF8fHx8MTc2MDEyMjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Familie & Eventyr',
    rating: 7.0,
    year: 2024,
  },
];

interface HeroCarouselProps {
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
}

export function HeroCarousel({ watchLater, toggleWatchLater }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWatchDialog, setShowWatchDialog] = useState(false);

  const platformColors: Record<string, string> = {
    'Netflix': '#E50914',
    'Viaplay': '#FF4D00',
    'HBO Max': '#00A3DC',
    'Disney+': '#113CCF',
    'Prime Video': '#00A8E1',
    'TV 2 Play': '#0C5AA8',
    'Apple TV+': '#000000',
    'TV 2': '#0C5AA8',
    'TV3': '#00B8E5',
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % heroContent.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length);
  };

  const current = heroContent[currentIndex];

  return (
    <>
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Background Image with Gradient Overlay */}
            <div className="relative aspect-[21/9] md:aspect-[21/7] overflow-hidden bg-muted">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Heart button */}
            <button
              onClick={() => toggleWatchLater(current.id)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
            >
              <Heart 
                className={`w-6 h-6 ${watchLater.includes(current.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
              />
            </button>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div className="max-w-2xl space-y-4">
                  {/* Platform Badge */}
                  <Badge 
                    className="border-0 mb-2"
                    style={{ 
                      backgroundColor: platformColors[current.platform] || '#666',
                      color: '#000000'
                    }}
                  >
                    {current.platform}
                  </Badge>

                  {/* Title */}
                  <h1 className="text-white text-4xl md:text-6xl">
                    {current.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-white/80">
                    <span className="flex items-center gap-1">
                      ⭐ {current.rating}
                    </span>
                    <span>•</span>
                    <span>{current.year}</span>
                    <span>•</span>
                    <span>{current.category}</span>
                  </div>

                  {/* Description */}
                  <p className="text-white/90 text-lg max-w-xl">
                    {current.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button 
                      size="lg"
                      className="text-white hover:opacity-90"
                      style={{ backgroundColor: '#0060E7' }}
                      onClick={() => setShowWatchDialog(true)}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Se nå
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                    >
                      <Info className="w-5 h-5 mr-2" />
                      Mer info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/40 w-1.5 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>

    {/* Watch Now Dialog */}
    <Dialog open={showWatchDialog} onOpenChange={setShowWatchDialog}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Se {current.title} nå</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Velg hvor du vil se innholdet
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <Button 
            className="w-full justify-start h-auto py-4 border-0"
            style={{ 
              backgroundColor: platformColors[current.platform] || '#0060E7',
              color: '#000000'
            }}
            onClick={() => {
              window.open(`https://www.${current.platform.toLowerCase().replace(/\s+/g, '')}.com`, '_blank');
              setShowWatchDialog(false);
            }}
          >
            <div className="flex items-center gap-3">
              <PlatformIcon platform={current.platform} className="w-6 h-6" />
              <div className="text-left">
                <div>Åpne i {current.platform}</div>
                <div className="text-xs opacity-70">Krever abonnement</div>
              </div>
            </div>
          </Button>
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => setShowWatchDialog(false)}
          >
            Avbryt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
}
