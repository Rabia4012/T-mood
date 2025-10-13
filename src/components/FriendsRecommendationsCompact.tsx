import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Star } from 'lucide-react';
import { friendsRecommendations } from './mockData';

interface FriendsRecommendationsCompactProps {
  onSeeMore: () => void;
}

export function FriendsRecommendationsCompact({ onSeeMore }: FriendsRecommendationsCompactProps) {
  // Show only first 3 connected friends
  const topThree = friendsRecommendations.filter(r => r.isConnected).slice(0, 3);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-foreground text-2xl">Anbefalt av venner</h2>
          <p className="text-muted-foreground text-sm">Se hva vennene dine elsker</p>
        </div>
        <button 
          onClick={onSeeMore}
          className="text-primary hover:underline"
        >
          Se mer →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topThree.map((rec) => (
          <Card 
            key={rec.id} 
            className="overflow-hidden bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all group cursor-pointer"
          >
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] overflow-hidden bg-muted">
              <img
                src={rec.contentImage}
                alt={rec.contentTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Friend Info */}
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border border-primary/20">
                  <div className="w-full h-full bg-gradient-to-br from-primary to-[#00C8C8] flex items-center justify-center text-white text-sm">
                    {rec.friendAvatar}
                  </div>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm truncate">{rec.friendName}</p>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-foreground line-clamp-1">{rec.contentTitle}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
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
                <span className="text-sm text-muted-foreground">
                  {rec.rating}/10
                </span>
              </div>

              {/* Platform */}
              <Badge className="bg-muted text-muted-foreground border-0 text-xs">
                {rec.platform}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
