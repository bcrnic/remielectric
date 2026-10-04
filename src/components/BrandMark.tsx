import { cn, withBase } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  /** Wordmark color scheme: "light" for white backgrounds, "dark" for dark sections. */
  tone?: "light" | "dark";
  showTagline?: boolean;
  /** Hide the text next to the badge (the badge itself already spells REMI ELECTRIC). */
  badgeOnly?: boolean;
  /** Size classes for the badge image, e.g. "h-24". */
  badgeClassName?: string;
}

const BrandMark = ({
  className,
  tone = "light",
  showTagline = true,
  badgeOnly = false,
  badgeClassName,
}: BrandMarkProps) => (
  <span className={cn("flex items-center gap-3", className)}>
    <img
      src={withBase(badgeOnly ? "/brand/logo-512.png" : "/brand/logo-256.png")}
      alt={badgeOnly ? "REMI ELECTRIC" : ""}
      width={256}
      height={256}
      className={cn("h-12 md:h-14 w-auto shrink-0", badgeClassName)}
    />
    {!badgeOnly && (
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-extrabold text-2xl md:text-[28px] tracking-wide",
            tone === "light" ? "text-foreground" : "text-white",
          )}
        >
          REMI
          <span className={tone === "light" ? "text-signal-text dark:text-signal" : "text-signal"}>
            ELECTRIC
          </span>
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
    )}
  </span>
);

export default BrandMark;
