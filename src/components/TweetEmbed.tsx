import { useEffect, useRef, useState } from "react";
import { Tweet } from "react-tweet";

export default function TweetEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 40, y: 40 });
  const velRef = useRef({ x: 2.2, y: 1.8 });
  const rafRef = useRef<number>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait a tick for the tweet to render so we can measure it
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const animate = () => {
      const el = containerRef.current;
      if (!el) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = el.getBoundingClientRect();
      const w = rect.width || 320;
      const h = rect.height || 200;

      const maxX = window.innerWidth - w;
      const maxY = window.innerHeight - h;

      let { x, y } = posRef.current;
      let { x: vx, y: vy } = velRef.current;

      x += vx;
      y += vy;

      // Bounce off edges — must touch the screen edge before changing direction
      if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
      }

      if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
      }

      posRef.current = { x, y };
      velRef.current = { x: vx, y: vy };

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      posRef.current.x = Math.min(posRef.current.x, window.innerWidth - rect.width);
      posRef.current.y = Math.min(posRef.current.y, window.innerHeight - rect.height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [ready]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-[9999] w-[320px] will-change-transform pointer-events-none"
      style={{ transform: "translate3d(40px, 40px, 0)" }}
    >
      <div className="pointer-events-auto" data-theme="dark">
        <Tweet id="2044986783700860974" />
      </div>
    </div>
  );
}
