
export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3" aria-label="Roberta Sabrina Personal Trainer">
      <div className="relative flex size-11 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
        <svg viewBox="0 0 100 80" className="size-10" aria-hidden="true"><text x="3" y="63" className="fill-primary font-display text-[52px] font-black">R</text><text x="62" y="72" className="fill-primary font-display text-[50px] font-black">S</text><g className="fill-brand-pink"><circle cx="51" cy="30" r="7"/><path d="M48 39 Q35 43 33 52 L43 47 46 53 34 66 20 72 38 68 54 56 57 62 51 76 60 73 66 59 56 47 65 36 69 17 63 16 60 33Z"/></g><g className="stroke-brand-pink" strokeWidth="4" strokeLinecap="round"><path d="M35 18 76 8 M36 9 40 25 M30 13 34 26 M71 1 76 18 M78 3 82 15"/></g></svg>
      </div>
      {!compact && <div className="leading-none"><strong className="block font-display text-sm font-black text-foreground">ROBERTA SABRINA</strong><span className="text-[10px] font-bold text-brand-pink">PERSONAL TRAINER</span></div>}
    </div>
  );
}