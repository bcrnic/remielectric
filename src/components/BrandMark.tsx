import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  /** Wordmark color scheme: "light" for white backgrounds, "dark" for dark sections. */
  tone?: "light" | "dark";
  showTagline?: boolean;
}

const BrandMark = ({ className, tone = "light", showTagline = true }: BrandMarkProps) => (
  <span className={cn("flex items-center gap-2.5", className)}>
    <svg width="38" height="42" viewBox="0 0 40 44" aria-hidden="true" className="shrink-0">
      <path
        d="M20 1 38 8v14c0 11-8 18-18 21C10 40 2 33 2 22V8z"
        className={tone === "light" ? "fill-ink dark:fill-white" : "fill-white"}
      />
      <path d="M22 9 12 25h8l-2 11 10-16h-8l2-11z" className="fill-signal" />
    </svg>
    <span className="flex flex-col leading-none">
      <span
        className={cn(
          "font-display font-extrabold text-2xl md:text-[28px] tracking-wide",
          tone === "light" ? "text-foreground" : "text-white",
        )}
      >
        REMI<span className="text-signal-text dark:text-signal">ELECTRIC</span>
      </span>
      {showTagline && (
        <span
          className={cn(
            "text-[11px] font-semibold tracking-[0.3em] mt-1",
            tone === "light" ? "text-muted-foreground" : "text-white/60",
          )}
        >
          NOVI SAD
        </span>
      )}
    </span>
  </span>
);

export default BrandMark;
