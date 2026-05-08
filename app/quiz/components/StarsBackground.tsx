function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  top: number;
  left: number;
  size: number;
  opacity: number;
  tint: "white" | "lavender";
}

function generateStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed);
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      top: rand() * 100,
      left: rand() * 100,
      size: rand() < 0.85 ? 1 + rand() * 1.2 : 2 + rand() * 1.5,
      opacity: 0.35 + rand() * 0.55,
      tint: rand() < 0.78 ? "white" : "lavender",
    });
  }
  return stars;
}

const STARS = generateStars(90, 0x4d6e7c11);

export default function StarsBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            background:
              s.tint === "lavender" ? "#C4B7FF" : "#FFFFFF",
            boxShadow:
              s.size > 2
                ? `0 0 ${s.size * 2}px ${
                    s.tint === "lavender"
                      ? "rgba(196,183,255,0.6)"
                      : "rgba(255,255,255,0.5)"
                  }`
                : undefined,
          }}
        />
      ))}
    </div>
  );
}
