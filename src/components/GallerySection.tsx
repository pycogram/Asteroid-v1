import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";

import squirrel8 from "@/assets/squirrel-8.jpg"
import squirrel7 from "@/assets/squirrel-7.jpg"
import squirrel6 from "@/assets/squirrel-6.jpg";
import squirrel5 from "@/assets/squirrel-5.jpg";
import squirrel4 from "@/assets/squirrel-4.jpg";
import squirrel3 from "@/assets/squirrel-3.jpg";
import squirrel2 from "@/assets/squirrel-2.jpg";
import squirrel1 from "@/assets/squirrel-1.jpg";


interface Sighting {
  id: number;
  src: string;
  caption: string;
  community?: boolean;
}

const baseSightings: Sighting[] = [
  { id: 1, src: squirrel1, caption: "this was NOT in the food chain 💀", community: false },
  { id: 2, src: squirrel2, caption: "he found the blueberry 💀", community: true },
  { id: 3, src: squirrel3, caption: "not food. still hitting it.", community: false },
  { id: 4, src: squirrel4, caption: "first puff, no regrets", community: true },
  { id: 5, src: squirrel5, caption: "he smelled destiny 🐿️", community: false },
  { id: 6, src: squirrel6, caption: "community sighting #42", community: true },
  { id: 7, src: squirrel7, caption: "puff-puffing ", community: true },
  { id: 8, src: squirrel8, caption: "vaping harder #42", community: true },
];

const GallerySection = () => {
  const [selected, setSelected] = useState<Sighting | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const sightings = useMemo(() => {
    const shuffled = [...baseSightings].sort(() => Math.random() - 0.5);
    return [...shuffled, ...shuffled]; // duplicate for infinite feel
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isPaused) return;
    const interval = setInterval(() => {
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="gallery" className="py-8 md:py-24 w-[90%] overflow-hidden place-self-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,hsl(50_100%_55%/0.06),transparent_60%)]" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 mb-10 mt-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl text-foreground text-glow mb-3"
          >
            $VNUTting 🐿️💨
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg"
          >
            Real ones spotted in the wild...
          </motion.p>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-5 overflow-x-auto scrollbar-hide px-4 py-8 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sightings.map((s, i) => (
            <motion.div
              key={`${s.id}-${i}`}
              whileHover={{ scale: 1.06, y: -8 }}
              whileTap={{ scale: 0.97, rotate: Math.random() > 0.5 ? 3 : -3 }}
              onClick={() => setSelected(s)}
              className="shrink-0 w-60 sm:w-72 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden cursor-pointer box-glow hover:box-glow-pink transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={s.src}
                  alt={s.caption}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover"
                />
                {s.community && (
                  <span className="absolute top-2 right-2 rounded-full bg-primary/80 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    COMMUNITY
                  </span>
                )}
              </div>
              <p className="p-3 text-sm text-muted-foreground text-center font-body">
                {s.caption}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-2xl border border-border bg-card overflow-hidden box-glow"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 rounded-full bg-background/50 p-1.5"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
              <img src={selected.src} alt={selected.caption} className="w-full" />
              <p className="p-4 text-center text-foreground font-body text-lg">
                {selected.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
