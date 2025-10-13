import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, Play } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { PlatformIcon } from './PlatformIcons';

interface CompactCarouselProps {
  items: {
    id: string;
    image: string;
    title: string;
    platform: string;
    friendName?: string;
    friendAvatar?: string;
    rating?: number;
    comment?: string;
  }[];
  showFriendInfo?: boolean;
  showLiveBadge?: boolean;
  watchLater?: string[];
  toggleWatchLater?: (id: string) => void;
  onFriendClick?: (friendName: string) => void;
}

export function CompactCarousel({ 
  items, 
  showFriendInfo = false, 
  showLiveBadge = false,
  watchLater = [],
  toggleWatchLater,
  onFriendClick
}: CompactCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWatchDialog, setShowWatchDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);

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

  const itemsPerView = 3;
  const totalSlides = Math.ceil(items.length / itemsPerView);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleItems = items.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-card border border-border shadow-md hover:bg-secondary transition-colors flex items-center justify-center"
          style={{ color: '#0060E7' }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 grid grid-cols-3 gap-3">
          {visibleItems.map((item) => (
            <div key={item.id} className="space-y-2">
              <Card
                className="group cursor-pointer overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Live Badge */}
                  {showLiveBadge && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-destructive text-white border-0 flex items-center gap-1">
                        <motion.div
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                        LIVE
                      </Badge>
                    </div>
                  )}

                  {/* Heart button */}
                  {toggleWatchLater && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchLater(item.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                    >
                      <Heart 
                        className={`w-4 h-4 ${watchLater.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                      />
                    </button>
                  )}

                  {/* Hover overlay with play button */}
                  <div 
                    className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowWatchDialog(true);
                    }}
                  >
                    <Button 
                      size="sm"
                      style={{ backgroundColor: '#0060E7' }}
                      className="text-white hover:opacity-90"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Se nå
                    </Button>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                    <p className="text-white text-sm truncate">{item.title}</p>
                    <p className="text-white/80 text-xs">{item.platform}</p>
                  </div>
                </div>
              </Card>
              
              {showFriendInfo && item.friendName && (
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:bg-secondary/50 p-1 rounded transition-colors"
                  onClick={() => onFriendClick?.(item.friendName!)}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: '#0060E7' }}
                  >
                    {item.friendAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{item.friendName}</p>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                        <span className="text-xs text-muted-foreground">{item.rating}/10</span>
                      </div>
                    )}
                    {item.comment && (
                      <p className="text-xs text-muted-foreground truncate italic">"{item.comment}"</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-card border border-border shadow-md hover:bg-secondary transition-colors flex items-center justify-center"
          style={{ color: '#0060E7' }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary w-6'
                : 'bg-border hover:bg-primary/50'
            }`}
          />
        ))}
      </div>

      {/* Watch Now Dialog */}
      {selectedItem && (
        <Dialog open={showWatchDialog} onOpenChange={setShowWatchDialog}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Se {selectedItem.title} nå</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Velg hvor du vil se innholdet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <Button 
                className="w-full justify-start h-auto py-4 border-0"
                style={{ 
                  backgroundColor: platformColors[selectedItem.platform] || '#0060E7',
                  color: '#000000'
                }}
                onClick={() => {
                  window.open(`https://www.${selectedItem.platform.toLowerCase().replace(/\s+/g, '')}.com`, '_blank');
                  setShowWatchDialog(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={selectedItem.platform} className="w-6 h-6" />
                  <div className="text-left">
                    <div>Åpne i {selectedItem.platform}</div>
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
      )}
    </div>
  );
}