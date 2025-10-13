import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Star, ChevronLeft, ChevronRight, UserPlus, Heart } from 'lucide-react';
import { friendsRecommendations } from './mockData';
import { PlatformIcon } from './PlatformIcons';
import { motion, AnimatePresence } from 'motion/react';

interface FriendsCarouselProps {
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
}

export function FriendsCarousel({ watchLater, toggleWatchLater }: FriendsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % friendsRecommendations.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + friendsRecommendations.length) % friendsRecommendations.length);
  };

  const currentRec = friendsRecommendations[currentIndex];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {currentRec.isConnected ? (
              <Card className="relative overflow-hidden bg-gradient-to-br from-card via-primary/5 to-[#00C8C8]/10 border-primary/20 shadow-xl">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Left: Movie Poster */}
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg group">
                    <img
                      src={currentRec.contentImage}
                      alt={currentRec.contentTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Watch Later Button */}
                    <button
                      onClick={() => toggleWatchLater(currentRec.contentId)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-lg"
                    >
                      <Heart 
                        className={`w-5 h-5 ${watchLater.includes(currentRec.contentId) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
                      />
                    </button>

                    {/* Platform Badge */}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/70 backdrop-blur-sm text-white border-0">
                        {currentRec.platform}
                      </Badge>
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="flex flex-col justify-center space-y-4">
                    {/* Friend Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-primary">
                        <div className="w-full h-full bg-gradient-to-br from-primary to-[#00C8C8] flex items-center justify-center text-white">
                          {currentRec.friendAvatar}
                        </div>
                      </Avatar>
                      <div>
                        <p className="text-foreground">
                          <span className="font-medium">{currentRec.friendName}</span> anbefaler
                        </p>
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          {currentRec.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Title */}
                    <div>
                      <h3 className="text-foreground text-2xl mb-2">{currentRec.contentTitle}</h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-primary/10 to-[#00C8C8]/10 px-3 py-1 rounded-full border border-primary/20">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-foreground">{currentRec.rating}</span>
                          <span className="text-muted-foreground text-xs">/10</span>
                        </div>
                        <span className="text-muted-foreground text-sm">fra {currentRec.friendName}</span>
                      </div>
                    </div>

                    {/* Comment */}
                    {currentRec.comment && (
                      <Card className="p-4 bg-muted/50 border-0">
                        <p className="text-foreground italic">"{currentRec.comment}"</p>
                      </Card>
                    )}

                    {/* CTA Button */}
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-[#00C8C8] hover:opacity-90 shadow-lg">
                      Se nå på {currentRec.platform}
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              // Not Connected Friend Card
              <Card className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border-dashed border-2 border-muted-foreground/30">
                <div className="p-8 text-center space-y-4">
                  <Avatar className="w-20 h-20 mx-auto border-2 border-dashed border-muted-foreground/30">
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-2xl">
                      {currentRec.friendAvatar}
                    </div>
                  </Avatar>
                  
                  <div>
                    <h3 className="text-foreground text-xl mb-2">{currentRec.friendName}</h3>
                    <p className="text-muted-foreground mb-4">
                      Denne vennen har samme T-mood som deg! Elsker {currentRec.category.toLowerCase()}!
                    </p>
                    <p className="text-sm text-muted-foreground/80 mb-6">
                      Koble til for å dele T-mood og se hva {currentRec.friendName.split(' ')[0]} anbefaler
                    </p>
                  </div>

                  <Button size="lg" variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                    <UserPlus className="w-5 h-5" />
                    Send forespørsel
                  </Button>

                  <p className="text-xs text-muted-foreground/60">
                    De trenger å godkjenne før du kan se deres anbefalinger
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          onClick={prev}
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 border-primary/20 hover:bg-primary hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex gap-2">
          {friendsRecommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-primary to-[#00C8C8] w-8' 
                  : 'bg-muted hover:bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={next}
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 border-primary/20 hover:bg-primary hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} av {friendsRecommendations.length} anbefalinger
        </p>
      </div>
    </div>
  );
}