import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Star, Heart, Play } from 'lucide-react';
import { Button } from './ui/button';
import { friendsRecommendations } from './mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { PlatformIcon } from './PlatformIcons';

interface FriendsTopPicksViewProps {
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
}

export function FriendsTopPicksView({ watchLater, toggleWatchLater }: FriendsTopPicksViewProps) {
  const connectedFriends = friendsRecommendations.filter(r => r.isConnected);
  const [showWatchDialog, setShowWatchDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState<typeof connectedFriends[0] | null>(null);

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
      <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-3xl mb-2">Venners toppvalg</h2>
        <p className="text-muted-foreground">
          Anbefalinger basert på venners vurderinger
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectedFriends.map((rec) => (
          <Card 
            key={rec.id} 
            className="overflow-hidden bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all group"
          >
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] overflow-hidden bg-muted">
              <img
                src={rec.contentImage}
                alt={rec.contentTitle}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-white text-sm mb-3 line-clamp-2 italic">
                    "{rec.comment}"
                  </p>
                  <Button 
                    className="w-full hover:opacity-90"
                    style={{ backgroundColor: '#0060E7' }}
                    onClick={() => {
                      setSelectedContent(rec);
                      setShowWatchDialog(true);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Se nå
                  </Button>
                </div>
              </div>

              {/* Watch Later Button */}
              <button
                onClick={() => toggleWatchLater(rec.contentId)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-lg"
              >
                <Heart 
                  className={`w-5 h-5 ${watchLater.includes(rec.contentId) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
                />
              </button>

              {/* Platform Badge */}
              <div className="absolute bottom-3 left-3">
                <Badge 
                  className="backdrop-blur-sm border-0"
                  style={{ 
                    backgroundColor: platformColors[rec.platform] || '#666',
                    color: '#000000'
                  }}
                >
                  {rec.platform}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <h3 className="text-foreground text-lg">{rec.contentTitle}</h3>

              {/* Friend Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <div className="w-full h-full bg-gradient-to-br from-primary to-[#00C8C8] flex items-center justify-center text-white">
                    {rec.friendAvatar}
                  </div>
                </Avatar>
                <div className="flex-1">
                  <p className="text-foreground text-sm">{rec.friendName}</p>
                  <p className="text-muted-foreground text-xs">Anbefaler</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rec.rating / 2)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground">
                  {rec.rating}/10
                </span>
              </div>

              {/* Category */}
              <Badge className="bg-primary/10 text-primary border-0 text-xs">
                {rec.category}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>

    {/* Watch Now Dialog */}
    {selectedContent && (
      <Dialog open={showWatchDialog} onOpenChange={setShowWatchDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Se {selectedContent.contentTitle} nå</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Velg hvor du vil se innholdet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button 
              className="w-full justify-start h-auto py-4 border-0"
              style={{ 
                backgroundColor: platformColors[selectedContent.platform] || '#0060E7',
                color: '#000000'
              }}
              onClick={() => {
                window.open(`https://www.${selectedContent.platform.toLowerCase().replace(/\s+/g, '')}.com`, '_blank');
                setShowWatchDialog(false);
              }}
            >
              <div className="flex items-center gap-3">
                <PlatformIcon platform={selectedContent.platform} className="w-6 h-6" />
                <div className="text-left">
                  <div>Åpne i {selectedContent.platform}</div>
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
  </>
  );
}