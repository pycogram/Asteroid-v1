import { useState, useEffect, useCallback } from "react";
import { TrendingUp, ArrowUpRight, Clock, Users, RefreshCw } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Transaction {
  id: string;
  type: "buy" | "sell";
  amount: string;
  wallet: string;
  time: string;
}

interface DexData {
  marketCap: number | null;
  price: number | null;
  holders: number | null;
  liquidity: number | null;
  priceChange24h: number | null;
  volume24h: number | null;
}

const PAIR_ADDRESS = "91tdwYGDuRPEkG8jCWCFZJn7AgFLgB9Zb711FhpYGr2J";
const TOKEN_CA = "F1ppSHedBsGGwEKH78JVgoqr4xkQHswtsGGLpgM7bCP2";

async function fetchDexData(): Promise<DexData> {
  const res = await fetch(
    `https://api.dexscreener.com/latest/dex/pairs/solana/${PAIR_ADDRESS}`
  );
  if (!res.ok) throw new Error("DexScreener fetch failed");
  const json = await res.json();
  const pair = json?.pairs?.[0];
  if (!pair) throw new Error("No pair data");

  return {
    price: pair.priceUsd ? parseFloat(pair.priceUsd) : null,
    marketCap: pair.marketCap ?? pair.fdv ?? null,
    liquidity: pair.liquidity?.usd ?? null,
    holders: null, // DexScreener doesn't return holders
    priceChange24h: pair.priceChange?.h24 ?? null,
    volume24h: pair.volume?.h24 ?? null,
  };
}

async function fetchHolders(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.helius.xyz/v0/token-metadata?api-key=demo`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mintAccounts: [TOKEN_CA] }),
      }
    );
    // Helius free demo key often rate-limits; fall back gracefully
    if (!res.ok) return null;
    const json = await res.json();
    return json?.[0]?.onChainMetadata?.metadata?.tokenStandard ?? null;
  } catch {
    return null;
  }
}

function formatNumber(n: number | null, prefix = ""): string {
  if (n === null) return "—";
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1)}K`;
  return `${prefix}${n.toLocaleString()}`;
}

function formatPrice(n: number | null): string {
  if (n === null) return "—";
  if (n < 0.000001) return `$${n.toExponential(3)}`;
  if (n < 0.01) return `$${n.toFixed(7)}`;
  return `$${n.toFixed(4)}`;
}

const LiveActivityFeed = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "buy", amount: "0.5 Sol", wallet: "BT7a3...f2d9", time: "2s ago" },
    { id: "2", type: "buy", amount: "1.2 Sol", wallet: "vt3b2...a4c1", time: "15s ago" },
    { id: "3", type: "buy", amount: "0.8 Sol", wallet: "aa9c4...e7f3", time: "32s ago" },
    { id: "4", type: "buy", amount: "2.0 Sol", wallet: "8i1d5...b8a2", time: "1m ago" },
    { id: "5", type: "buy", amount: "0.3 Sol", wallet: "xT6e8...c9d4", time: "2m ago" },
  ]);

  const [dexData, setDexData] = useState<DexData>({
    marketCap: null,
    price: null,
    holders: null,
    liquidity: null,
    priceChange24h: null,
    volume24h: null,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDexData();
      setDexData(data);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Failed to fetch DexScreener data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + poll every 30s
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30_000);
    return () => clearInterval(interval);
  }, [refresh]);

  // Simulate live tx feed
  useEffect(() => {
    const interval = setInterval(() => {
      const amounts = ["0.2 Sol", "0.5 Sol", "0.8 Sol", "1.0 Sol", "1.5 Sol", "2.0 Sol"];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randomWallet = `${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;

      const newTx: Transaction = {
        id: Date.now().toString(),
        type: "buy",
        amount: randomAmount,
        wallet: randomWallet,
        time: "Just now",
      };

      setTransactions((prev) => {
        const updated = [newTx, ...prev.slice(0, 4)];
        return updated.map((tx, i) => ({
          ...tx,
          time: i === 0 ? "Just now" : `${i * 15 + Math.floor(Math.random() * 10)}s ago`,
        }));
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const priceUp =
    dexData.priceChange24h !== null && dexData.priceChange24h >= 0;

  const stats = [
    {
      icon: <TrendingUp className="w-5 h-5 text-success" />,
      label: "Market Cap",
      value: formatNumber(dexData.marketCap, "$"),
    },
    {
      icon: <span className="text-base">💧</span>,
      label: "Liquidity",
      value: formatNumber(dexData.liquidity, "$"),
    },
    {
      icon: <span className="text-base">💹</span>,
      label: "Price",
      value: formatPrice(dexData.price),
      sub:
        dexData.priceChange24h !== null ? (
          <span
            className={`text-xs font-semibold ${priceUp ? "text-success" : "text-red-400"}`}
          >
            {priceUp ? "▲" : "▼"} {Math.abs(dexData.priceChange24h).toFixed(2)}% 24h
          </span>
        ) : null,
    },
    {
      icon: <span className="text-base">📊</span>,
      label: "Vol 24h",
      value: formatNumber(dexData.volume24h, "$"),
    },
  ];

  return (
    <section id="chart" className="py-12 bg-gradient-to-b from-[#03020a] to-[#060b2e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container md:w-[90%] place-self-center mx-auto px-4 relative z-10">

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">
              Live data · DexScreener
            </span>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-muted-foreground hidden sm:block">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={refresh}
              disabled={loading}
              className="p-1.5 rounded-lg border border-border hover:border-primary/50 transition-colors"
              title="Refresh"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-muted-foreground ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative bg-background rounded-3xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl h-full p-4 sm:p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <span className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </span>
                </div>
                {loading && !lastUpdated ? (
                  <div className="h-7 w-24 bg-muted/40 animate-pulse rounded-lg" />
                ) : (
                  <>
                    <p className="font-display text-xl sm:text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    {stat.sub && <div className="mt-1">{stat.sub}</div>}
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* DexScreener chart embed */}
        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-border overflow-hidden mb-8">
            <iframe
              src={`https://dexscreener.com/solana/${PAIR_ADDRESS}?embed=1&theme=dark&trades=0&info=0`}
              title="Live Price Chart"
              className="w-full h-[360px] md:h-[440px]"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        {/* Live Transaction Feed */}
        <ScrollReveal delay={0.2}>
          <div className="bg-background rounded-2xl py-4 px-4 border-2 border-border hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-success animate-pulse" />
                Live Transactions
              </h3>
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Simulated
              </span>
            </div>

            <div className="space-y-2 overflow-hidden">
              {transactions.map((tx, index) => (
                <div
                  key={tx.id}
                  className={`flex items-center justify-between p-3 rounded-xl bg-success/10 border border-success/20 transition-all ${
                    index === 0 ? "animate-slide-up" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {tx.wallet} <span className="text-success">bought</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{tx.amount}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <a
                href={`https://dexscreener.com/solana/${PAIR_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                View all transactions on DexScreener →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LiveActivityFeed;