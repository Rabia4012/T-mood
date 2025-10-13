import { ContentCard } from './ContentCard';
import { mockContent } from './mockData';
import { Heart } from 'lucide-react';

interface WatchLaterViewProps {
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
}

export function WatchLaterView({ watchLater, toggleWatchLater }: WatchLaterViewProps) {
  const watchLaterContent = mockContent.filter(content => watchLater.includes(content.id));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-destructive fill-destructive" />
          <h2 className="text-foreground text-3xl">Min T-mood liste</h2>
        </div>
        <p className="text-muted-foreground">
          Dine lagrede favoritter fra alle Telenor sine strømmetjenester
        </p>
      </div>

      {watchLaterContent.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">{watchLaterContent.length} titler lagret</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {watchLaterContent.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                isInWatchLater={true}
                onToggleWatchLater={toggleWatchLater}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-muted-foreground/40" />
          </div>
          <h3 className="text-foreground text-xl mb-2">Listen din er tom</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Begynn å legge til filmer og serier du vil se senere ved å klikke på hjertet
          </p>
        </div>
      )}
    </div>
  );
}
