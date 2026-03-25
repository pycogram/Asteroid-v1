import { CheckCircle, Shield, Users, Eye, Hammer, Building } from "lucide-react";
import squirrelHead from "@/assets/squirrel-head.png";
import squirrelMascot from "@/assets/squirrel-mascot.png";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: <Hammer className="w-6 h-6" />,
    title: "Fair Launch - CTO",
    description: "Community Driven - Built by the vapers, for the vapers",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community-Owned",
    description: "We build together as one united vaping crew",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Transparent",
    description: "Open blueprint for all - no hidden agendas",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Solid Foundation",
    description: "Built on the reliable Soalana Chain infrastructure",
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Main Purpose",
    description: "Always vaping, never ever stop vaping",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">💨</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "2s" }}>💨</div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <ScrollReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-foreground px-4 py-2 rounded-full mb-6 border border-primary/30">
                <span className="text-lg">🐿️</span>
                <span className="font-semibold text-sm">About $NUT</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                More Than a Meme,
                <br />
                <span className="text-gradient-gold">A Movement</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Squirrels, it’s time to level up 🐿️💨
                No fear, no panic, just pure vibes
                Stack nuts, blow clouds, stay chill
                If you’re not vaping, what are you even doing
                We don’t chase charts, we float above them
                Cloud gang only, no exceptions
                Join the vibe or stay grounded
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The Vaping foundation is super solid, the blueprint is clear, and the future is being built 
                right now. Just fkn join the crew and grab your Vape!
              </p>

              {/* Features Grid */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border border-border hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground mb-1 flex items-center gap-2">
                        {feature.title}
                        <CheckCircle className="w-4 h-4 text-success" />
                      </h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Visual */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Blueprint background */}
                <div className="absolute inset-0 blueprint-card scale-110 rounded-3xl" />
                
                {/* Horse head badge */}
                <div className="relative z-10 w-72 sm:w-80 lg:w-96 aspect-square flex items-center justify-center">
                  <img
                    src={squirrelHead}
                    alt="VNUT"
                    className="w-64 sm:w-72 lg:w-80 drop-shadow-xl rounded-3xl"
                  />
                </div>

                {/* Full body mascot floating below */}
                <div className="absolute -bottom-16 -right-8 w-32 sm:w-40">
                  <img
                    src={squirrelMascot}
                    alt="VNUT Builder"
                    className="drop-shadow-xl animate-float"
                  />
                </div>

                {/* Stats badges */}
                <div className="absolute -top-4 right-0 bg-success text-success-foreground px-4 py-2 rounded-xl font-bold shadow-lg z-20">
                  ✓ Vaped
                </div>

                <div className="absolute -bottom-4 left-0 bg-bnb text-bnb-foreground px-4 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2 z-20">
                  <span className="text-xl">⛓️</span>
                  Solana Chain
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
