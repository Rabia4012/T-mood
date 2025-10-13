import { useState } from 'react';
import { Search, Heart, Users, Home, TrendingUp, Plus, Star } from 'lucide-react';
import { QuizView } from './components/QuizView';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { WatchLaterView } from './components/WatchLaterView';
import { SocialView } from './components/SocialView';
import { FriendsTopPicksView } from './components/FriendsTopPicksView';
import { FriendProfileView } from './components/FriendProfileView';
import { LiveTVGuide } from './components/LiveTVGuide';
import { Button } from './components/ui/button';
import { TelenorLogo } from './components/TelenorLogo';
import { PlatformIcon } from './components/PlatformIcons';


export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'quiz' | 'search' | 'watchlater' | 'social' | 'friendstoppicks' | 'friendprofile'>('home');
  const [watchLater, setWatchLater] = useState<string[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string>('');
  const [showLiveTVDialog, setShowLiveTVDialog] = useState(false);

  const toggleWatchLater = (contentId: string) => {
    setWatchLater(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="max-w-full px-6 py-3 flex items-center justify-between gap-4">
          {/* Left: Logo and Brand */}
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-6 hover:opacity-80 transition-opacity"
          >
            <TelenorLogo className="h-8" />
            <div>
              <h1 style={{ color: '#0060E7' }}>T-mood</h1>
              <p className="text-xs text-muted-foreground">Streaming Guide</p>
            </div>
          </button>

          {/* Center: Platform Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E50914]/10 hover:bg-[#E50914]/20 transition-colors">
              <span className="text-xs text-foreground/70">Netflix</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00A3DC]/10 hover:bg-[#00A3DC]/20 transition-colors">
              <span className="text-xs text-foreground/70">HBO Max</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF4D00]/10 hover:bg-[#FF4D00]/20 transition-colors">
              <span className="text-xs text-foreground/70">Viaplay</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0C5AA8]/10 hover:bg-[#0C5AA8]/20 transition-colors">
              <span className="text-xs text-foreground/70">TV 2</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
              <PlatformIcon platform="Apple TV+" className="w-5 h-5 text-foreground/70" />
              <span className="text-xs text-foreground/70">Apple TV+</span>
            </div>
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('watchlater')}
              className="relative hover:opacity-80 transition-opacity"
            >
              <Heart 
                className="w-6 h-6" 
                style={{ color: '#0060E7' }}
                fill={activeView === 'watchlater' ? '#0060E7' : 'none'}
              />
              {watchLater.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center text-xs text-white">
                  {watchLater.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveView('social')}
              className="hover:opacity-80 transition-opacity"
            >
              <Users 
                className="w-6 h-6" 
                style={{ color: '#0060E7' }}
                fill={activeView === 'social' ? '#0060E7' : 'none'}
              />
            </button>

            <button
              onClick={() => setActiveView('quiz')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="text-sm text-foreground">Hva skal vi se?</span>
            </button>
            
            <button
              onClick={() => setActiveView('search')}
              className="hover:opacity-80 transition-opacity"
            >
              <Search 
                className="w-6 h-6" 
                style={{ color: '#0060E7' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeView === 'home' && (
          <HomeView 
            watchLater={watchLater} 
            toggleWatchLater={toggleWatchLater}
            onStartQuiz={() => setActiveView('quiz')}
            onFriendsTopPicks={() => setActiveView('friendstoppicks')}
            onFriendProfile={(friendName) => {
              setSelectedFriend(friendName);
              setActiveView('friendprofile');
            }}
          />
        )}
        {activeView === 'friendprofile' && selectedFriend && (
          <FriendProfileView 
            friendName={selectedFriend}
            watchLater={watchLater}
            toggleWatchLater={toggleWatchLater}
            onBack={() => setActiveView('home')}
          />
        )}
        {activeView === 'friendstoppicks' && (
          <FriendsTopPicksView 
            watchLater={watchLater}
            toggleWatchLater={toggleWatchLater}
          />
        )}
        {activeView === 'quiz' && (
          <QuizView 
            watchLater={watchLater}
            toggleWatchLater={toggleWatchLater}
            onShowLiveTV={() => setShowLiveTVDialog(true)}
          />
        )}
        {activeView === 'search' && (
          <SearchView 
            watchLater={watchLater}
            toggleWatchLater={toggleWatchLater}
          />
        )}
        {activeView === 'watchlater' && (
          <WatchLaterView 
            watchLater={watchLater}
            toggleWatchLater={toggleWatchLater}
          />
        )}
        {activeView === 'social' && (
          <SocialView 
            watchLater={watchLater}
            toggleWatchLater={toggleWatchLater}
          />
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveView('home')}
            className={`flex flex-col items-center gap-1 ${activeView === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Hjem</span>
          </button>
          <button
            onClick={() => setActiveView('search')}
            className={`flex flex-col items-center gap-1 ${activeView === 'search' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs">Søk</span>
          </button>
          <button
            onClick={() => setActiveView('quiz')}
            className="flex flex-col items-center gap-1 -mt-8 bg-primary rounded-full p-4 shadow-lg"
          >
            <span className="text-2xl">✨</span>
          </button>
          <button
            onClick={() => setActiveView('watchlater')}
            className={`flex flex-col items-center gap-1 relative ${activeView === 'watchlater' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">Favoritter</span>
            {watchLater.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-destructive rounded-full flex items-center justify-center text-xs text-white">
                {watchLater.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveView('friendstoppicks')}
            className={`flex flex-col items-center gap-1 ${activeView === 'friendstoppicks' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Star className="w-5 h-5" />
            <span className="text-xs">Toppvalg</span>
          </button>
        </div>
      </nav>

      {/* Live TV Dialog - accessible from quiz */}
      <LiveTVGuide 
        isOpen={showLiveTVDialog}
        onOpenChange={setShowLiveTVDialog}
      />
    </div>
  );
}