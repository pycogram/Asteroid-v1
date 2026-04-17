import { useState, useEffect } from "react";
import { ExternalLink, Wallet, Users, Copy, Check } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";
import squirrelMascot from "@/assets/squirrel-mascot.png";
 
const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [holders, setHolders] = useState(1247);
  const [transactions, setTransactions] = useState(8934);

  const contractAddress = "F1ppSHedBsGGwEKH78JVgoqr4xkQHswtsGGLpgM7bCP2";

  // Simulate live counters
  useEffect(() => {
    const interval = setInterval(() => {
      setHolders((prev) => prev + Math.floor(Math.random() * 3));
      setTransactions((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
    <style>
      {`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
      @keyframes floatBob {
        0%, 100% { transform: translateY(0);     }
        50%       { transform: translateY(-12px); }
      }
      @keyframes pulseBadge {
        0%, 100% { transform: scale(1);    }
        50%       { transform: scale(1.15); }
      }

      /* ── Add these ── */
      @keyframes tweetRoam {
        0%   { transform: translate(0px,    0px);   }
        12%  { transform: translate(120px, -60px);  }
        25%  { transform: translate(60px,  140px);  }
        37%  { transform: translate(-80px,  80px);  }
        50%  { transform: translate(-140px,-40px);  }
        62%  { transform: translate(-60px,-130px);  }
        75%  { transform: translate(100px, -100px); }
        87%  { transform: translate(150px,  60px);  }
        100% { transform: translate(0px,    0px);   }
      }
      .tweet-roam {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
        pointer-events: none;
        animation: tweetRoam 18s ease-in-out infinite;
      }
      .tweet-roam > * {
        pointer-events: auto;
      }
      /* ── End add ── */

      .anim-title  { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s  both; }
      .anim-char   { animation: floatBob 4s ease-in-out infinite; }
      .anim-card-1 { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s  both; }
      .anim-card-2 { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.32s both; }
      .anim-card-3 { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
      .anim-card-4 { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.56s both; }
      .badge-pulse { animation: pulseBadge 2.4s ease-in-out infinite; }
    `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Construction site background"
          className="w-full h-full object-cover"
        />

    <div className="absolute inset-0 bg-gradient-to-r from-[#03020a]/95 via-[#060b2e]/75 to-[#03020a]/40" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#03020a]/60 via-transparent to-[#03020a]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-primary/60 animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container place-items-center mx-auto px-4 py-12 lg:py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center w-[80%] sm:w-auto place-self-center sm:place-self-auto lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-bnb/20 text-foreground px-4 py-2 rounded-full mb-6 border border-bnb/30">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-semibold text-sm">Live on Solana Chain</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              SpaceX Mascot,
              <br />
              <span className="text-gradient-gold">$ASTEROID</span>
              <span className="inline-block ml-2 animate-wiggle">🚀🐶</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              <strong className="text-foreground">$ASTEROID</strong> ~ 
                A space-born mascot designed for orbit, representing motion, resilience, and culture.  
                Floating above the noise, built for something bigger.
            </p>

            {/* Contract Address */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-border max-w-xl mx-auto lg:mx-0">
              <p className="text-xs text-start text-muted-foreground mb-2 font-medium">Contract Address</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs sm:text-sm font-mono text-foreground truncate">
                  {contractAddress}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-xl bg-primary/20 border-gray-300 border hover:bg-primary/30 transition-colors flex-shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-dark" />
                  )}
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="https://pump.fun/coin/F1ppSHedBsGGwEKH78JVgoqr4xkQHswtsGGLpgM7bCP2"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero flex items-center w-fit md:w-auto justify-center gap-2 text-lg"
              >
                Buy on Pumpfun
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/i/communities/2019568206269280468"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-hero flex w-fit md:w-auto items-center justify-center gap-2 text-lg"
              >
                <Users className="w-5 h-5" />
                Join Us
              </a>
            </div>

            {/* Live Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {holders.toLocaleString()}+
                </p>
                <p className="text-sm text-muted-foreground font-medium">Holders</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {transactions.toLocaleString()}+
                </p>
                <p className="text-sm text-muted-foreground font-medium">Explorers</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold text-primary">CTO</p>
                <p className="text-sm text-muted-foreground font-medium">Community Driven</p>
              </div>
            </div>
          </div>

          {/* Mascot */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              {/* Glow effect behind mascot */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/40 via-bnb/20 to-transparent blur-3xl rounded-full scale-90" />
              
              <img
                src={squirrelMascot}
                alt="Squirrel Mascot"
                className="relative z-10 w-80 sm:w-96 lg:w-[450px] drop-shadow-2xl animate-float cursor-pointer hover:scale-105 transition-transform rounded-3xl"
              />

              {/* Floating elements around mascot */}
              <div className="absolute -top-4 -right-4 bg-bnb text-bnb-foreground px-4 py-2 rounded-xl font-bold shadow-lg animate-bounce-slow z-20">
                🌌✨ Exploration!
              </div>
              
              <div className="absolute -bottom-2 -left-4 bg-card border border-border px-4 py-2 rounded-xl shadow-lg animate-bounce-slow z-20" style={{ animationDelay: "0.5s" }}>
                <span className="text-2xl">🐶</span>
                <span className="font-bold ml-1">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
