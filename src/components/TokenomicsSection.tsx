import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const TokenomicsSection = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "CR8w8WPtu1eeHj3UTTNYXVe8WX81iT1JexvLemTrpump";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenInfo = [
    { label: "Token Name", value: "ASTEROID" },
    { label: "Symbol", value: "$ASTEROID" },
    { label: "Blockchain", value: "Solana" },
    { label: "Token Type", value: "Token 2099" },
    { label: "Project Type", value: "Community Driven" },
  ];

  return (
    <section id="tokenomics" className="py-16 lg:py-24 relative overflow-hidden" style={{background: '#03020a'}}>
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--accent)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/30 text-foreground px-4 py-2 rounded-full mb-6 border border-accent/50">
              <span className="text-lg">🛰️</span>
              <span className="font-semibold text-sm">DeepSpace</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              The <span className="text-gradient-gold">Blueprint</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For effective growth, drift with precision, lol.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Blueprint Card */}
            <div className="blueprint-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
              {/* Corner decorations */}

              <h3 className="font-display text-2xl font-bold text-center mb-8 text-foreground">
                $Asteroid Specifications
              </h3>

              {/* Token Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {tokenInfo.map((item, index) => (
                  <div
                    key={index}
                    className="bg-background/80 backdrop-blur-sm rounded-2xl p-4 border border-border"
                  >
                    <p className="text-xs text-muted-foreground font-medium mb-1">{item.label}</p>
                    <p className="font-display font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Distribution visual */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-2xl border border-border">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <p className="font-display font-bold text-foreground">LP Burned</p>
                  <p className="text-sm text-muted-foreground">$ASTEROID is tradable</p>
                </div>

                <div className="text-center p-4 bg-background/50 rounded-2xl border border-border">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">🌌</span>
                  </div>
                  <p className="font-display font-bold text-foreground">Community</p>
                  <p className="text-sm text-muted-foreground">Owned by Explorers</p>
                </div>

                <div className="text-center p-4 bg-background/50 rounded-2xl border border-border">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-bnb/20 flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className="font-display font-bold text-foreground">Cashback</p>
                  <p className="text-sm text-muted-foreground">Holders are getting rewarded</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TokenomicsSection;
