import { Dumbbell } from "lucide-react";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3" aria-label="Roberta Sabrina Personal Trainer">
      <div className="relative flex size-11 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
        <span className="font-display text-xl font-black text-primary">R</span>
        <Dumbbell className="mx-[-3px] size-5 -rotate-12 text-brand-pink" strokeWidth={3} />
        <span className="font-display text-xl font-black text-primary">S</span>
      </div>
      {!compact && <div className="leading-none"><strong className="block font-display text-sm font-black text-foreground">ROBERTA SABRINA</strong><span className="text-[10px] font-bold text-brand-pink">PERSONAL TRAINER</span></div>}
    </div>
  );
}