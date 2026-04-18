import { CheckCircle, Shield, Users, Eye, Hammer, Building } from "lucide-react";
import squirrelHead from "@/assets/squirrel-head.png";
import squirrelMascot from "@/assets/squirrel-mascot.png";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: <Hammer className="w-6 h-6" />,
    title: "Fair Launch - CTO",
    description: "Community Driven - Built by the explorers, for the explorers",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community-Owned",
    description: "We build together as one united space crew",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Transparent",
    description: "Open mission for all — no hidden agendas",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Solid Foundation",
    description: "Built on the reliable Solana Chain infrastructure",
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Main Purpose",
    description: "Built for orbit — not designed for Earth",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gradient-to-b from-[#03020a] to-[#060b2e] relative overflow-hidden">
      
      {/* 🌌 Space Background */}
      <div className="w-full h-full" style={{
        background: 'radial-gradient(ellipse at top left, #1a0a3e 0%, #060b2e 40%, #03020a 100%)'
      }} />

      {/* 🌙 Floating particles */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">🌙</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "2s" }}>🌒</div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <ScrollReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-foreground px-4 py-2 rounded-full mb-6 border border-primary/30">
                <span className="text-lg">🐶</span>
                <span className="font-semibold text-sm">About $Asteroid</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Asteroids,
                <br />
                <span className="text-gradient-gold">it’s time to leave orbit</span> 🚀🌌
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed space-y-2">
                Asteroid is a space mascot that flew on a SpaceX mission. <br />
                It gained attention through Elon Musk and its designer, Liv. <br />
                Plush sales support St. Jude Children’s Research Hospital. <br />
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                It traveled far into space with Polaris astronauts. <br />
                It inspires kids to dream big and chase their goals.
              </p>

              {/* FEATURES */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all group hover:shadow-lg hover:shadow-purple-500/10"
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

          {/* RIGHT VISUAL */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative flex justify-center">
              <div className="relative">

                {/* 🌠 Glow instead of blueprint */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl rounded-3xl" />

                {/* HEAD */}
                <div className="relative z-10 w-72 sm:w-80 lg:w-96 aspect-square flex items-center justify-center">
                  <img
                    src={squirrelHead}
                    alt="asteroid"
                    className="w-64 sm:w-72 lg:w-80 drop-shadow-xl rounded-3xl"
                  />
                </div>

                {/* FLOATING MASCOT */}
                <div className="absolute -bottom-16 -right-8 w-32 sm:w-40">
                  <img
                    src={squirrelMascot}
                    alt="asteroid"
                    className="drop-shadow-xl animate-float"
                  />
                </div>

                {/* BADGES */}
                <div className="absolute -top-4 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg z-20">
                  ✓ ASTEROIDED
                </div>

                <div className="absolute -bottom-4 left-0 bg-black/60 border border-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2 z-20">
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
