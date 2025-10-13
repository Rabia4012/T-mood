import { Users, ThumbsUp, MessageCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ContentCard } from './ContentCard';
import { mockContent, friendActivity } from './mockData';

interface SocialViewProps {
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
}

export function SocialView({ watchLater, toggleWatchLater }: SocialViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-foreground text-3xl">T-mood venner</h2>
        </div>
        <p className="text-muted-foreground">
          Oppdag hva vennene dine ser på og del deres T-mood!
        </p>
      </div>

      {/* Friend Activity Feed */}
      <section>
        <h3 className="text-foreground text-xl mb-4">📱 Aktivitet fra venner</h3>
        
        <div className="space-y-3">
          {friendActivity.map((activity) => (
            <Card key={activity.id} className="p-4 bg-card border-border shadow-sm">
              <div className="flex gap-4">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                    {activity.friendName.charAt(0)}
                  </div>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-foreground">{activity.friendName}</span>
                      <span className="text-muted-foreground text-sm ml-2">{activity.action}</span>
                    </div>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">{activity.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-muted text-muted-foreground border-border">
                      {activity.platform}
                    </Badge>
                    <span className="text-foreground">{activity.contentTitle}</span>
                  </div>
                  
                  {activity.comment && (
                    <p className="text-muted-foreground text-sm mb-3 italic">"{activity.comment}"</p>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{activity.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{activity.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Among Friends */}
      <section>
        <h3 className="text-foreground text-xl mb-4">🔥 Populært blant venner</h3>
        <p className="text-muted-foreground mb-4">Det vennene dine ser mest på nå</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockContent.slice(0, 4).map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              isInWatchLater={watchLater.includes(content.id)}
              onToggleWatchLater={toggleWatchLater}
            />
          ))}
        </div>
      </section>

      {/* Friends List */}
      <section>
        <h3 className="text-foreground text-xl mb-4">👥 Dine venner</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {['Emma Larsen', 'Magnus Berg', 'Sofie Hansen', 'Jonas Nilsen', 'Maria Olsen', 'Henrik Johansen'].map((friend, index) => (
            <Card key={friend} className="p-4 bg-card border-border hover:border-primary/50 transition-all shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                    {friend.charAt(0)}
                  </div>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">{friend}</p>
                  <p className="text-muted-foreground text-xs">Ser nå: {index % 2 === 0 ? 'Netflix' : 'Viaplay'}</p>
                </div>
                <Button size="sm" variant="outline">
                  Se profil
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
