import { useState } from 'react';
import { Heart, Play, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PlatformIcon } from './PlatformIcons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Content {
  id: string;
  title: string;
  platform: string;
  image: string;
  rating: number;
  year: number;
  type: 'film' | 'serie';
  description: string;
  duration?: number;
  mood: string[];
}

interface ContentCardProps {
  content: Content;
  isInWatchLater: boolean;
  onToggleWatchLater: (id: string) => void;
}

export function ContentCard({ content, isInWatchLater, onToggleWatchLater }: ContentCardProps) {
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

  return (
    <>
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={content.image}
          alt={content.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <p className="text-white text-sm mb-3 line-clamp-2">{content.description}</p>
            <Button 
              className="w-full"
              style={{ backgroundColor: '#0060E7' }}
              onClick={() => setShowWatchDialog(true)}
            >
              <Play className="w-4 h-4 mr-2" />
              Se nå
            </Button>
          </div>
        </div>

        {/* Platform Badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            className="border-0 text-xs shadow-md flex items-center gap-1 px-2 py-1"
            style={{ 
              backgroundColor: platformColors[content.platform] || '#666',
              color: '#000000'
            }}
          >
            <span>{content.platform}</span>
          </Badge>
        </div>

        {/* Watch Later Button */}
        <button
          onClick={() => onToggleWatchLater(content.id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-md"
        >
          <Heart 
            className={`w-4 h-4 ${isInWatchLater ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
          />
        </button>

        {/* Type Badge */}
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-black/70 backdrop-blur-sm text-white border-0 text-xs">
            {content.type === 'film' ? '🎬 Film' : '📺 Serie'}
          </Badge>
        </div>
      </div>

      <div className="p-3 bg-card">
        <h3 className="text-foreground mb-1 line-clamp-1">{content.title}</h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span>⭐ {content.rating}</span>
          <span>•</span>
          <span>{content.year}</span>
          {content.duration && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {content.duration} min
              </span>
            </>
          )}
        </div>
      </div>
    </Card>

    {/* Watch Now Dialog */}
    <Dialog open={showWatchDialog} onOpenChange={setShowWatchDialog}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Se {content.title} nå</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Velg hvor du vil se innholdet
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <Button 
            className="w-full justify-start h-auto py-4 border-0"
            style={{ 
              backgroundColor: platformColors[content.platform] || '#0060E7',
              color: '#000000'
            }}
            onClick={() => {
              window.open(`https://www.${content.platform.toLowerCase().replace(/\s+/g, '')}.com`, '_blank');
              setShowWatchDialog(false);
            }}
          >
            <div className="flex items-center gap-3">
              <PlatformIcon platform={content.platform} className="w-6 h-6" />
              <div className="text-left">
                <div>Åpne i {content.platform}</div>
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