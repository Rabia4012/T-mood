import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Star, Heart, Play, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { mockContent } from './mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { PlatformIcon } from './PlatformIcons';

interface FriendProfileViewProps {
  friendName: string;
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
  onBack: () => void;
}

// Mock data for friend's ratings
const getFriendRatings = (friendName: string) => {
  const friendData: Record<string, any[]> = {
    'Emma Larsen': [
      { contentId: '1', rating: 9.5, comment: 'Fantastisk film! Må sees! 🔥', watchedDate: '2 dager siden' },
      { contentId: '6', rating: 8.2, comment: 'Spennende thriller!', watchedDate: '1 uke siden' },
      { contentId: '10', rating: 8.8, comment: 'Utrolig sci-fi!', watchedDate: '2 uker siden' },
      { contentId: '3', rating: 7.5, comment: 'Morsom standup! 😂', watchedDate: '3 uker siden' },
    ],
    'Magnus Berg': [
      { contentId: '2', rating: 10, comment: 'Utrolig vakre bilder! 🌍', watchedDate: '1 dag siden' },
      { contentId: '12', rating: 9.0, comment: 'Fascinerende dokumentar!', watchedDate: '5 dager siden' },
      { contentId: '9', rating: 7.3, comment: 'Kjekt kokeprogram!', watchedDate: '1 uke siden' },
      { contentId: '5', rating: 8.9, comment: 'Spennende fremtidsvisjon', watchedDate: '2 uker siden' },
    ],
    'Sofie Hansen': [
      { contentId: '3', rating: 9.0, comment: 'Så morsom! 😂', watchedDate: '3 timer siden' },
      { contentId: '6', rating: 9.0, comment: 'Wow, hvilken slutt! 🤯', watchedDate: '2 dager siden' },
      { contentId: '4', rating: 8.0, comment: 'Koselig romantikk 💕', watchedDate: '1 uke siden' },
      { contentId: '11', rating: 8.1, comment: 'Flott standup!', watchedDate: '2 uker siden' },
    ],
    'Jonas Nilsen': [
      { contentId: '4', rating: 8.5, comment: 'Perfekt kosekveId! 💕', watchedDate: '1 dag siden' },
      { contentId: '7', rating: 7.0, comment: 'Morsom familiefilm!', watchedDate: '3 dager siden' },
      { contentId: '3', rating: 7.8, comment: 'Gøy komedie!', watchedDate: '1 uke siden' },
    ],
    'Maria Olsen': [
      { contentId: '5', rating: 8.8, comment: 'Veldig spennende', watchedDate: '12 timer siden' },
      { contentId: '8', rating: 8.7, comment: 'Stilig noir-serie!', watchedDate: '4 dager siden' },
      { contentId: '1', rating: 8.5, comment: 'Action på sitt beste!', watchedDate: '1 uke siden' },
    ],
    'Henrik Johansen': [
      { contentId: '6', rating: 8.2, comment: 'Wow! 🤯', watchedDate: '6 timer siden' },
      { contentId: '2', rating: 9.2, comment: 'Nydelig naturdokumentar!', watchedDate: '2 dager siden' },
      { contentId: '10', rating: 8.8, comment: 'Episk romfilm!', watchedDate: '1 uke siden' },
    ],
  };

  return friendData[friendName] || [];
};

export function FriendProfileView({ 
  friendName, 
  watchLater, 
  toggleWatchLater, 
  onBack 
}: FriendProfileViewProps) {
  const [showWatchDialog, setShowWatchDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);

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

  const friendRatings = getFriendRatings(friendName);
  const friendAvatar = friendName.charAt(0);
  
  // Get full content data for each rating
  const ratedContent = friendRatings.map(rating => {
    const content = mockContent.find(c => c.id === rating.contentId);
    return { ...content, ...rating };
  });

  const averageRating = (friendRatings.reduce((sum, r) => sum + r.rating, 0) / friendRatings.length).toFixed(1);

  return (
    <>
      <div className="space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tilbake
        </Button>

        {/* Profile Header */}
        <Card className="p-6 bg-gradient-to-br from-card to-primary/5 border-border">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <div 
                className="w-full h-full flex items-center justify-center text-white text-2xl"
                style={{ background: 'linear-gradient(135deg, #0060E7 0%, #00C8C8 100%)' }}
              >
                {friendAvatar}
              </div>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-foreground text-2xl mb-1">{friendName}</h2>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                  <span>{averageRating} gjennomsnitt</span>
                </div>
                <span>•</span>
                <span>{friendRatings.length} anmeldelser</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Ratings Grid */}
        <div>
          <h3 className="text-foreground text-xl mb-4">Alle anmeldelser</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratedContent.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all group"
              >
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <p className="text-white text-sm mb-3 line-clamp-2 italic">
                        "{item.comment}"
                      </p>
                      <Button 
                        className="w-full"
                        style={{ backgroundColor: '#0060E7' }}
                        onClick={() => {
                          setSelectedContent(item);
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchLater(item.id);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-lg z-10"
                  >
                    <Heart 
                      className={`w-5 h-5 ${watchLater.includes(item.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
                    />
                  </button>

                  {/* Platform Badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge 
                      className="backdrop-blur-sm border-0"
                      style={{ 
                        backgroundColor: platformColors[item.platform] || '#666',
                        color: '#000000'
                      }}
                    >
                      {item.platform}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Title */}
                  <h3 className="text-foreground text-lg">{item.title}</h3>

                  {/* Rating */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating / 2)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-foreground">
                      {item.rating}/10
                    </span>
                  </div>

                  {/* Comment */}
                  {item.comment && (
                    <p className="text-sm text-muted-foreground italic line-clamp-2">
                      "{item.comment}"
                    </p>
                  )}

                  {/* Watched date */}
                  <p className="text-xs text-muted-foreground">
                    Sett {item.watchedDate}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Watch Now Dialog */}
      {selectedContent && (
        <Dialog open={showWatchDialog} onOpenChange={setShowWatchDialog}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Se {selectedContent.title} nå</DialogTitle>
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
