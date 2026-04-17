import { CheckCircle, Circle, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const phases = [
  {
    phase: "Phase 1",
    title: "Ignition",
    status: "completed",
    icon: "🚀",
    items: [
      "Launch on Pumpfun",
      "Core Community Formation",
      "Brand & Mascot Identity Established",
      "Website V1 Deployment",
      "Initial Liquidity Bonded",
    ],
  },
  {
    phase: "Phase 2",
    title: "Orbit Entry",
    status: "in-progress",
    icon: "🛰️",
    items: [
      "Strategic Marketing Campaigns",
      "Influencer & Community Collaborations",
      "Holder Growth to 3,000+",
      "Ecosystem Awareness Expansion",
      "CoinGecko & CMC Listings",
    ],
  },
  {
    phase: "Phase 3",
    title: "Deep Space Expansion",
    status: "upcoming",
    icon: "🌌",
    items: [
      "CEX Listing Applications",
      "Asteroid NFT Collection",
      "Merch & Brand Assets Launch",
      "Partnership Integrations",
      "Community Events & Missions",
    ],
  },
  {
    phase: "Phase 4",
    title: "Interstellar Scaling",
    status: "upcoming",
    icon: "🌠",
    items: [
      "Major CEX Listings",
      "Ecosystem Expansion",
      "Cross-chain Integrations",
      "Global Marketing Push",
    ],
  },
  {
    phase: "Phase 5",
    title: "Beyond Orbit",
    status: "upcoming",
    icon: "🪐",
    items: [
      "Full Ecosystem Activation",
      "Top-Tier Exchange Listings",
      "Global Community Events",
      "Long-Term Brand Evolution",
      "Sustained Growth Beyond Hype",
    ],
  },
];

const RoadmapSection = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground border-success";
      case "in-progress":
        return "bg-primary text-primary-foreground border-primary animate-pulse";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "in-progress":
        return <Clock className="w-5 h-5 animate-spin-slow" />;
      default:
        return <Circle className="w-5 h-5" />;
    }
  };

  return (
    <section id="roadmap" className="py-16 lg:py-24 relative overflow-hidden" style={{background: '#03020a'}}>
      {/* Blueprint background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-construction-pattern" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/50 text-secondary-foreground px-4 py-2 rounded-full mb-6 border border-secondary">
              <span className="text-lg">🗺️</span>
              <span className="font-semibold text-sm">Roadmap</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Space <span className="text-gradient-gold">Timeline</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our blueprint to transporting to $Asteroid ecosystem
            </p>
          </div>
        </ScrollReveal>

        {/* Roadmap Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-success via-primary to-muted rounded-full hidden md:block" />

            <div className="space-y-8">
              {phases.map((phase, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <div className="relative flex gap-6">
                    {/* Timeline dot */}
                    <div className={`hidden md:flex w-16 h-16 rounded-2xl items-center justify-center flex-shrink-0 border-4 ${getStatusColor(phase.status)} shadow-lg z-10`}>
                      <span className="text-2xl">{phase.icon}</span>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 bg-background rounded-3xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-x p-6 ${phase.status === 'in-progress' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(phase.status)} mb-2`}>
                            {getStatusIcon(phase.status)}
                            {phase.status === 'completed' && 'Completed'}
                            {phase.status === 'in-progress' && 'In Progress'}
                            {phase.status === 'upcoming' && 'Upcoming'}
                          </span>
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {phase.phase}: {phase.title}
                          </h3>
                        </div>
                        <span className="text-3xl md:hidden">{phase.icon}</span>
                      </div>

                      <ul className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2 text-muted-foreground">
                            <span className={`w-1.5 h-1.5 rounded-full ${phase.status === 'completed' ? 'bg-success' : phase.status === 'in-progress' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
