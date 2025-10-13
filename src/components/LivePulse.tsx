import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Clock, Users, Play, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { PlatformIcon } from './PlatformIcons';

interface LiveContent {
  id: string;
  title: string;
  platform: string;
  image: string;
  category: string;
  currentViewers: number;
  startedMinutesAgo: number;
  totalDuration: number;
  description: string;
  summary30sec: string;
}

const liveContent: LiveContent[] = [
  {
    id: 'live1',
    title: 'Skal vi danse - Finale',
    platform: 'TV 2 Play',
    image: 'https://images.unsplash.com/photo-1628676306092-1238ef1dc851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaGlsZHJlbiUyMGhhcHB5fGVufDF8fHx8MTc2MDEyMjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Underholdning',
    currentViewers: 45200,
    startedMinutesAgo: 15,
    totalDuration: 90,
    description: 'Den store finalen! Hvem vinner årets konkurranse?',
    summary30sec: 'De tre finalistene har allerede gjort to danser hver. Emma leder med 39 poeng, tett fulgt av Marcus med 38. Nå skal de gjøre sin siste dans før publikum stemmer!'
  },
  {
    id: 'live2',
    title: 'Planet Earth III - Episode 4',
    platform: 'Viaplay',
    image: 'https://images.unsplash.com/photo-1603016129004-c7539f86b53f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBkb2N1bWVudGFyeXxlbnwxfHx8fDE3NjAwNDk0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Dokumentar',
    currentViewers: 12800,
    startedMinutesAgo: 8,
    totalDuration: 50,
    description: 'Utrolige opptak fra verdens dypeste hav',
    summary30sec: 'Episoden utforsker Marianergropen. Vi har sett bioluminescerende skapninger på 8000 meters dyp. David Attenborough forklarer nettopp hvordan disse dyrene overlever det ekstreme trykket.'
  },
  {
    id: 'live3',
    title: 'The Last Expedition',
    platform: 'Netflix',
    image: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjAwNzA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Action',
    currentViewers: 28500,
    startedMinutesAgo: 22,
    totalDuration: 142,
    description: 'Årets mest spennende actionfilm',
    summary30sec: 'Teamet har akkurat oppdaget en hemmelig base i Himalaya. Sarah (hovedpersonen) mistet kontakten med hovedkvarteret for 5 minutter siden. Vi vet nå at fienden har funnet deres posisjon!'
  },
  {
    id: 'live4',
    title: 'Dark Secrets - S01E05',
    platform: 'Netflix',
    image: 'https://images.unsplash.com/photo-1647264157150-491bfd016aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMGRhcmslMjBteXN0ZXJ5fGVufDF8fHx8MTc2MDEyMjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Thriller',
    currentViewers: 8900,
    startedMinutesAgo: 5,
    totalDuration: 48,
    description: 'Sannheten begynner å avsløres',
    summary30sec: 'Detektiv Jensen fant nettopp et kritisk bevis i den forlatede hytta. Vi har lært at den savnede jenta var i live til for 3 dager siden. Hovedmistenkte har alibi som ikke stemmer!'
  },
  {
    id: 'live5',
    title: 'Dagsrevyen',
    platform: 'TV 2 Play',
    image: 'https://images.unsplash.com/photo-1603016129004-c7539f86b53f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBkb2N1bWVudGFyeXxlbnwxfHx8fDE3NjAwNDk0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Nyheter',
    currentViewers: 34100,
    startedMinutesAgo: 3,
    totalDuration: 30,
    description: 'Dagens viktigste nyheter',
    summary30sec: 'Toppsaker: Ny klimaavtale signert i dag. Norsk økonomi vokser mer enn ventet. Været: Snø på vei til Østlandet i kveld. Sport: Norge vinner gull i VM!'
  },
  {
    id: 'live6',
    title: 'Love in Paris',
    platform: 'Disney+',
    image: 'https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldHxlbnwxfHx8fDE3NjAwODE4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Romantikk',
    currentViewers: 5600,
    startedMinutesAgo: 35,
    totalDuration: 98,
    description: 'En romantisk komedie i hjertet av Paris',
    summary30sec: 'Sophie og Marc møttes tilfeldig på kafé i går. De har nettopp innrømmet at de kjenner en spesiell forbindelse. Marc har et mørkt hemmelighet han ikke har fortalt enda. Sophie planlegger å reise tilbake til New York i morgen!'
  }
];

function getPulseLevel(viewers: number): { level: 'low' | 'medium' | 'high', icon: string, color: string } {
  if (viewers > 30000) return { level: 'high', icon: '💗', color: 'from-pink-500 to-red-500' };
  if (viewers > 10000) return { level: 'medium', icon: '💓', color: 'from-pink-400 to-pink-600' };
  return { level: 'low', icon: '💓', color: 'from-pink-300 to-pink-500' };
}

function formatViewers(viewers: number): string {
  if (viewers >= 1000) {
    return `${(viewers / 1000).toFixed(1)}k`;
  }
  return viewers.toString();
}

export function LivePulse() {
  const [selectedContent, setSelectedContent] = useState<LiveContent | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleJumpIn = (content: LiveContent) => {
    setSelectedContent(content);
    setShowSummary(true);
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <Zap className="w-6 h-6 text-primary" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
        <h2 className="text-foreground text-2xl">Live Puls</h2>
      </div>
      <p className="text-muted-foreground mb-4">Se hva som skjer akkurat nå - sammen med tusenvis av andre!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveContent.map((content) => {
          const pulse = getPulseLevel(content.currentViewers);
          const progressPercent = (content.startedMinutesAgo / content.totalDuration) * 100;
          
          return (
            <Card 
              key={content.id} 
              className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Live Badge */}
                <div className="absolute top-2 left-2">
                  <Badge className="bg-destructive text-white border-0 animate-pulse">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full mr-1"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    LIVE
                  </Badge>
                </div>

                {/* Platform */}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm">
                    {content.platform}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-[#00C8C8]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Overlay for "Hopp Inn" */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-white text-sm mb-3">{content.description}</p>
                    <Button 
                      onClick={() => handleJumpIn(content)}
                      className="w-full bg-gradient-to-r from-primary to-[#00C8C8] hover:opacity-90"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Hopp Inn
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-foreground mb-2 line-clamp-1">{content.title}</h3>
                
                <div className="flex items-center justify-between">
                  {/* Pulse Indicator */}
                  <motion.div 
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r"
                    style={{ 
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    }}
                    animate={{ 
                      scale: pulse.level === 'high' ? [1, 1.05, 1] : [1, 1.02, 1] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: pulse.level === 'high' ? 1 : 1.5 
                    }}
                  >
                    <motion.span 
                      className="text-xl"
                      animate={{ 
                        scale: pulse.level === 'high' ? [1, 1.2, 1] : [1, 1.1, 1] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: pulse.level === 'high' ? 0.8 : 1.2 
                      }}
                    >
                      {pulse.icon}
                    </motion.span>
                    <span className="text-white text-sm">
                      {formatViewers(content.currentViewers)}
                    </span>
                  </motion.div>

                  {/* Time Info */}
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="w-3 h-3" />
                    <span>Startet for {content.startedMinutesAgo} min siden</span>
                  </div>
                </div>

                <Badge className="mt-2 bg-muted text-muted-foreground border-0 text-xs">
                  {content.category}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Jump In Modal */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Hopp Inn - {selectedContent?.title}
            </DialogTitle>
            <DialogDescription>
              Her er en rask oppsummering av hva du har gått glipp av!
            </DialogDescription>
          </DialogHeader>

          {selectedContent && (
            <div className="space-y-4">
              {/* Summary Card */}
              <Card className="p-4 bg-gradient-to-br from-primary/5 to-[#00C8C8]/5 border-primary/20">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">30-sekunders oppsummering</h4>
                    <p className="text-muted-foreground text-sm">
                      Startet for {selectedContent.startedMinutesAgo} minutter siden
                    </p>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed">
                  {selectedContent.summary30sec}
                </p>
              </Card>

              {/* Live Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 bg-muted/50 border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Ser på nå</span>
                  </div>
                  <p className="text-foreground text-xl">
                    {formatViewers(selectedContent.currentViewers)}
                  </p>
                </Card>
                <Card className="p-3 bg-muted/50 border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Gjenstår</span>
                  </div>
                  <p className="text-foreground text-xl">
                    {selectedContent.totalDuration - selectedContent.startedMinutesAgo} min
                  </p>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowSummary(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Avbryt
                </Button>
                <Button 
                  onClick={() => {
                    // Simulate starting playback
                    setShowSummary(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-primary to-[#00C8C8] hover:opacity-90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start nå på {selectedContent.platform}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                💡 Du hopper inn der {formatViewers(selectedContent.currentViewers)} andre ser på akkurat nå!
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
