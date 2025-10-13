import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { ContentCard } from './ContentCard';
import { mockContent } from './mockData';
import { Badge } from './ui/badge';

interface SearchViewProps {
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
}

export function SearchView({ watchLater, toggleWatchLater }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = ['Netflix', 'Viaplay', 'HBO Max', 'Disney+', 'Prime Video', 'TV 2 Play'];

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const filteredContent = mockContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(content.platform);
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-foreground text-3xl mb-2">🔍 Søk i T-mood</h2>
          <p className="text-muted-foreground">Søk gjennom alle Telenor sine strømmetjenester samtidig</p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Søk etter filmer, serier, skuespillere..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 bg-card border-border focus:border-primary"
          />
        </div>

        {/* Platform Filters */}
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">Filtrer etter tjeneste:</p>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Badge
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`cursor-pointer transition-all ${
                  selectedPlatforms.includes(platform)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                }`}
              >
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">
            {searchQuery ? `Resultater for "${searchQuery}"` : 'Alle titler'}
          </h3>
          <span className="text-muted-foreground text-sm">{filteredContent.length} resultater</span>
        </div>

        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredContent.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                isInWatchLater={watchLater.includes(content.id)}
                onToggleWatchLater={toggleWatchLater}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Ingen resultater funnet</p>
            <p className="text-muted-foreground/60 text-sm mt-2">Prøv et annet søkeord eller juster filtrene</p>
          </div>
        )}
      </div>
    </div>
  );
}
