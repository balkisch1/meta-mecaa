import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 15,  suffix: "+", label: "Années d'expérience" },
  { value: 500, suffix: "+", label: "Projets livrés" },
  { value: 98,  suffix: "%", label: "Clients satisfaits" },
  { value: 9,   suffix: "",  label: "Expertises métier" },
];

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, duration = 1200, triggered: boolean) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [triggered, target, duration]);

  return triggered ? count : 0;
}

function StatItem({
  value,
  suffix,
  label,
  delay,
  triggered,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  triggered: boolean;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [triggered, delay]);

  const count = useCountUp(value, 1200, active);

  return (
    <div
      className={`
        lg:border-l lg:border-white/10 lg:pl-8 first:border-0 first:pl-0
        text-center lg:text-left
        transition-all duration-700 ease-out
        ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}
    >
      <div className="font-display text-5xl md:text-6xl font-semibold text-gradient-gold mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm tracking-[0.2em] uppercase text-white/50">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-gradient-dark text-primary-foreground py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatItem
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={i * 120}
              triggered={triggered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}