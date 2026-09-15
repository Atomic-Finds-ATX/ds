import React, { useEffect } from 'react';
import { MotifSparkle } from './Motifs.jsx';

const CSS = `
.af-marquee {
  --ink: #2A4D3C;
  --bg:  #EAE3D5;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: clamp(0.1rem, 0.4vw, 0.35rem);
  background: var(--bg);
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  padding-block: clamp(1rem, 2vw, 2.5rem);
  padding-inline: clamp(1rem, 3vw, 3rem);
  overflow: hidden;
}

.af-marquee-stars {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-inline: clamp(0.75rem, 2vw, 2rem);
  gap: 0.5rem;
}

.af-marquee-stars--left  { flex-direction: row; }
.af-marquee-stars--right { flex-direction: row-reverse; }

.af-marquee-star-a {
  transform: translateY(-30%);
}
.af-marquee-star-b {
  transform: translateY(30%);
}

.af-reel-col {
  flex: 1 1 0;
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1.15;
  max-width: clamp(2.8rem, 16vw, 13rem);
  font-size: clamp(1.6rem, 12vw, 10rem);
}

.af-reel-strip {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  animation: af-drop 7s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  will-change: transform;
}

.af-reel-col:nth-child(2) .af-reel-strip { animation-delay: 0.00s; }
.af-reel-col:nth-child(3) .af-reel-strip { animation-delay: 0.22s; }
.af-reel-col:nth-child(4) .af-reel-strip { animation-delay: 0.44s; }
.af-reel-col:nth-child(5) .af-reel-strip { animation-delay: 0.66s; }
.af-reel-col:nth-child(6) .af-reel-strip { animation-delay: 0.88s; }

.af-reel-glyph {
  width: 100%;
  aspect-ratio: 1 / 1.15;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82em;
  line-height: 1;
  flex-shrink: 0;
  color: var(--ink);
  user-select: none;
}

.af-reel-glyph.f-monoton   { font-family: "Monoton", sans-serif;         font-size: 0.6em; }
.af-reel-glyph.f-bungee    { font-family: "Bungee Inline", sans-serif;   font-size: 0.9em; }
.af-reel-glyph.f-fascinate { font-family: "Fascinate Inline", system-ui; font-size: 0.72em; }
.af-reel-glyph.f-chango    { font-family: "Chango", cursive;             font-size: 0.82em; }
.af-reel-glyph.f-erica     { font-family: "Erica One", sans-serif;       font-size: 0.9em; }
.af-reel-glyph.f-mamba     { font-family: "Alfa Slab One", serif;        font-size: 0.82em; }

@keyframes af-drop {
  0%        { transform: translateY(-75%); }
  42%, 100% { transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .af-reel-strip { animation: none !important; transform: translateY(0); }
}
`;

// Per-column strip: [Turn1/rest, Turn3, Turn2, Turn1-dup]
const STRIPS = [
  [{ f: 'f-mamba', l: 'A' }, { f: 'f-erica', l: 'A' }, { f: 'f-fascinate', l: 'A' }, { f: 'f-mamba', l: 'A' }],
  [{ f: 'f-bungee', l: 'F' }, { f: 'f-mamba', l: 'F' }, { f: 'f-chango', l: 'F' }, { f: 'f-bungee', l: 'F' }],
  [{ f: 'f-monoton', l: 'A' }, { f: 'f-chango', l: 'A' }, { f: 'f-mamba', l: 'A' }, { f: 'f-monoton', l: 'A' }],
  [{ f: 'f-chango', l: 'T' }, { f: 'f-bungee', l: 'T' }, { f: 'f-erica', l: 'T' }, { f: 'f-chango', l: 'T' }],
  [{ f: 'f-erica', l: 'X' }, { f: 'f-fascinate', l: 'X' }, { f: 'f-chango', l: 'X' }, { f: 'f-erica', l: 'X' }],
];

export function AnimatedLogoMarquee({ className = '', style = {} }) {
  useEffect(() => {
    const id = 'af-marquee-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = CSS;
      document.head.appendChild(el);
    }
  }, []);

  return (
    <section
      className={`af-marquee ${className}`}
      style={style}
      aria-label="Atomic Finds ATX"
    >
      {/* Left stars — larger coral anchored high, smaller forest offset low */}
      <div className="af-marquee-stars af-marquee-stars--left" aria-hidden="true">
        <span className="af-marquee-star-a">
          <MotifSparkle width={22} height={36} color="#C93C30" />
        </span>
        <span className="af-marquee-star-b">
          <MotifSparkle width={14} height={22} color="#2A4D3C" />
        </span>
      </div>

      {STRIPS.map((items, i) => (
        <div key={i} className="af-reel-col">
          <div className="af-reel-strip">
            {items.map((item, j) => (
              <div key={j} className={`af-reel-glyph ${item.f}`}>{item.l}</div>
            ))}
          </div>
        </div>
      ))}

      {/* Right stars — mirrored: smaller forest high, larger coral low */}
      <div className="af-marquee-stars af-marquee-stars--right" aria-hidden="true">
        <span className="af-marquee-star-a">
          <MotifSparkle width={22} height={36} color="#C93C30" />
        </span>
        <span className="af-marquee-star-b">
          <MotifSparkle width={14} height={22} color="#2A4D3C" />
        </span>
      </div>
    </section>
  );
}
