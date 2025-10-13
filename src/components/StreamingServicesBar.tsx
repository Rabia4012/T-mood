import { Card } from './ui/card';
import { PlatformIcon } from './PlatformIcons';

const platforms = [
  { name: 'Netflix', color: '#E50914' },
  { name: 'Viaplay', color: '#1A1A1A' },
  { name: 'TV 2 Play', color: '#FF6B00' },
  { name: 'HBO Max', color: '#7B2CBF' },
  { name: 'Disney+', color: '#113CCF' },
  { name: 'Discovery+', color: '#0075DB' },
];

export function StreamingServicesBar() {
  return (
    <Card className="p-4 bg-gradient-to-r from-card to-muted/30 border-border shadow-sm">
      <div className="flex items-center justify-between gap-4 overflow-x-auto">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Tilgjengelig på:
        </span>
        <div className="flex items-center gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: platform.color }}
              >
                <PlatformIcon platform={platform.name} className="w-full h-full text-white" />
              </div>
              <span className="text-sm text-foreground whitespace-nowrap hidden md:inline">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
