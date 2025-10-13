import {
  Lightbulb,
  Sparkles,
  Users,
  Calendar,
  Zap,
  Flame,
  Target,
  Radio,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ContentCard } from "./ContentCard";
import { mockContent } from "./mockData";
import { LivePulse } from "./LivePulse";
import { HeroCarousel } from "./HeroCarousel";
import { CompactCarousel } from "./CompactCarousel";
import { LiveTVGuide } from "./LiveTVGuide";
import { motion } from "motion/react";

interface HomeViewProps {
  watchLater: string[];
  toggleWatchLater: (id: string) => void;
  onStartQuiz: () => void;
  onFriendsTopPicks: () => void;
  onFriendProfile?: (friendName: string) => void;
}

export function HomeView({
  watchLater,
  toggleWatchLater,
  onStartQuiz,
  onFriendsTopPicks,
  onFriendProfile,
}: HomeViewProps) {
  // Prepare data for compact carousels with friend information
  const friendsTopPicks = [
    {
      id: mockContent[0].id,
      image: mockContent[0].image,
      title: mockContent[0].title,
      platform: mockContent[0].platform,
      friendName: "Emma Larsen",
      friendAvatar: "E",
      rating: 9.5,
      comment: "Fantastisk film! 🔥",
    },
    {
      id: mockContent[1].id,
      image: mockContent[1].image,
      title: mockContent[1].title,
      platform: mockContent[1].platform,
      friendName: "Magnus Berg",
      friendAvatar: "M",
      rating: 10,
      comment: "Utrolig vakre bilder! 🌍",
    },
    {
      id: mockContent[2].id,
      image: mockContent[2].image,
      title: mockContent[2].title,
      platform: mockContent[2].platform,
      friendName: "Sofie Hansen",
      friendAvatar: "S",
      rating: 9.0,
      comment: "Så morsom! 😂",
    },
    {
      id: mockContent[3].id,
      image: mockContent[3].image,
      title: mockContent[3].title,
      platform: mockContent[3].platform,
      friendName: "Jonas Nilsen",
      friendAvatar: "J",
      rating: 8.5,
      comment: "Perfekt kosekveId! 💕",
    },
    {
      id: mockContent[4].id,
      image: mockContent[4].image,
      title: mockContent[4].title,
      platform: mockContent[4].platform,
      friendName: "Maria Olsen",
      friendAvatar: "M",
      rating: 8.8,
      comment: "Veldig spennende",
    },
    {
      id: mockContent[5].id,
      image: mockContent[5].image,
      title: mockContent[5].title,
      platform: mockContent[5].platform,
      friendName: "Henrik Johansen",
      friendAvatar: "H",
      rating: 8.2,
      comment: "Wow! 🤯",
    },
  ];

  const weeklyPicks = mockContent
    .slice(6, 12)
    .map((content) => ({
      id: content.id,
      image: content.image,
      title: content.title,
      platform: content.platform,
    }));

  // Live Puls data
  const livePulseItems = mockContent
    .slice(0, 6)
    .map((content, index) => ({
      id: content.id,
      image: content.image,
      title: content.title,
      platform: content.platform,
      friendName: [
        "Emma",
        "Magnus",
        "Sofie",
        "Jonas",
        "Maria",
        "Henrik",
      ][index],
      friendAvatar: ["E", "M", "S", "J", "M", "H"][index],
      rating: [9.2, 8.8, 9.5, 8.0, 9.1, 8.7][index],
      comment: [
        "Ser på nå! 💓",
        "Så bra! 🔥",
        "Elsker den! ❤️",
        "Spennende! ⚡",
        "Fantastisk! ✨",
        "Helt rå! 💯",
      ][index],
    }));

  // Popular now data
  const popularNow = mockContent
    .slice(0, 6)
    .map((content, index) => ({
      id: content.id,
      image: content.image,
      title: content.title,
      platform: content.platform,
      friendName: [
        "Sofie Hansen",
        "Jonas Nilsen",
        "Emma Larsen",
        "Henrik Johansen",
        "Maria Olsen",
        "Magnus Berg",
      ][index],
      friendAvatar: ["S", "J", "E", "H", "M", "M"][index],
      rating: [9.3, 8.9, 9.6, 8.4, 9.0, 8.8][index],
      comment: [
        "Topp underholdning! 🎬",
        "Anbefales! 👍",
        "Helt episk! 🔥",
        "Koselig! 💕",
        "Mesterlig! 🌟",
        "Fengende! ⚡",
      ][index],
    }));

  // Recommended for you data
  const recommendedForYou = mockContent
    .slice(8, 14)
    .map((content, index) => ({
      id: content.id,
      image: content.image,
      title: content.title,
      platform: content.platform,
      friendName: [
        "Magnus Berg",
        "Emma Larsen",
        "Henrik Johansen",
        "Sofie Hansen",
        "Jonas Nilsen",
        "Maria Olsen",
      ][index],
      friendAvatar: ["M", "E", "H", "S", "J", "M"][index],
      rating: [9.4, 9.7, 8.6, 9.2, 8.3, 9.0][index],
      comment: [
        "Perfekt for deg! 🎯",
        "Du vil elske den! 💖",
        "Stemmer for deg! ✨",
        "Din type! 👌",
        "Må se! 🌟",
        "Passer deg! 💎",
      ][index],
    }));

  // Live TV data - Norwegian TV channels
  const liveTVItems = [
    {
      id: "livetv1",
      image:
        "https://images.unsplash.com/photo-1628676306092-1238ef1dc851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaGlsZHJlbiUyMGhhcHB5fGVufDF8fHx8MTc2MDEyMjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Skal vi danse - Finale",
      platform: "TV 2 Play",
    },
    {
      id: "livetv2",
      image:
        "https://images.unsplash.com/photo-1603016129004-c7539f86b53f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBkb2N1bWVudGFyeXxlbnwxfHx8fDE3NjAwNDk0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Nyhetene - Direkte",
      platform: "TV 2",
    },
    {
      id: "livetv3",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzb2NjZXJ8ZW58MXx8fHwxNzYwMTIyMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Eliteserien - Fotball",
      platform: "TV3",
    },
    {
      id: "livetv4",
      image:
        "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwc2hvd3xlbnwxfHx8fDE3NjAxMjIwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Norske talenter",
      platform: "TV 2 Play",
    },
    {
      id: "livetv5",
      image:
        "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzJTIwc3R1ZGlvfGVufDF8fHx8MTc2MDEyMjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "God morgen Norge",
      platform: "TV 2",
    },
    {
      id: "livetv6",
      image:
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2MDEyMjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Luksusfellen",
      platform: "TV3",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Nytt på T-mood - Hero Carousel */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles
              className="w-6 h-6"
              style={{ color: "#0060E7" }}
            />
            <h2 className="font-bold" style={{ color: "#0060E7" }}>
              Nytt på T-mood
            </h2>
          </div>
          <LiveTVGuide />
        </div>
        <HeroCarousel 
          watchLater={watchLater}
          toggleWatchLater={toggleWatchLater}
        />
      </section>

      {/* Venners topp-valg */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users
            className="w-6 h-6"
            style={{ color: "#0060E7" }}
          />
          <h2 className="font-bold" style={{ color: "#0060E7" }}>
            Venners topp-valg
          </h2>
        </div>
        <CompactCarousel
          items={friendsTopPicks}
          showFriendInfo={true}
          watchLater={watchLater}
          toggleWatchLater={toggleWatchLater}
          onFriendClick={onFriendProfile}
        />
      </section>

      {/* Quiz CTA */}
      <section className="flex justify-center">
        <Button
          onClick={onStartQuiz}
          className="max-w-lg py-12 shadow-lg text-white"
          style={{ backgroundColor: "#0060E7" }}
        >
          <div className="flex items-center justify-center gap-3">
            <Lightbulb className="w-6 h-6" />
            <div className="flex flex-col items-start gap-0">
              <span>Usikker? La T-Quiz finne noe for deg!</span>
              <span className="text-sm opacity-90">
                Ta Quizen nå!
              </span>
            </div>
          </div>
        </Button>
      </section>

      {/* Ukens valg */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar
            className="w-6 h-6"
            style={{ color: "#0060E7" }}
          />
          <h2 className="font-bold" style={{ color: "#0060E7" }}>
            Ukens valg
          </h2>
        </div>
        <CompactCarousel
          items={weeklyPicks}
          showFriendInfo={false}
          watchLater={watchLater}
          toggleWatchLater={toggleWatchLater}
        />
      </section>

      {/* Live TV */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Radio
            className="w-6 h-6"
            style={{ color: "#FF0000" }}
          />
          <h2 className="font-bold" style={{ color: "#FF0000" }}>Live TV</h2>
        </div>
        <CompactCarousel
          items={liveTVItems}
          showFriendInfo={false}
          showLiveBadge={true}
          watchLater={watchLater}
          toggleWatchLater={toggleWatchLater}
        />
      </section>

      {/* Popular Now */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Flame
            className="w-6 h-6"
            style={{ color: "#FF5F00" }}
          />
          <h2 className="font-bold" style={{ color: "#FF5F00" }}>
            Populært akkurat nå
          </h2>
        </div>
        <CompactCarousel
          items={popularNow}
          showFriendInfo={false}
          watchLater={watchLater}
          toggleWatchLater={toggleWatchLater}
        />
      </section>

      {/* Recommended for You */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Target
            className="w-6 h-6"
            style={{ color: "#00C8C8" }}
          />
          <h2 className="font-bold" style={{ color: "#00C8C8" }}>
            Anbefalt for deg
          </h2>
        </div>
        <CompactCarousel
          items={recommendedForYou}
          showFriendInfo={false}
          watchLater={watchLater}
          toggleWatchLater={toggleWatchLater}
        />
      </section>
    </div>
  );
}