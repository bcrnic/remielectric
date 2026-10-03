import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const Bolt = () => (
  <svg width="14" height="20" viewBox="0 0 18 24" aria-hidden="true" className="fill-ink shrink-0">
    <path d="M11 0 0 14h7l-2 10L18 9h-7l2-9z" />
  </svg>
);

const BenefitsRibbon = () => {
  const { t } = useTranslation();
  const items = t("ribbon", { returnObjects: true }) as string[];

  // Rendered twice so the marquee loops seamlessly
  const row = (hidden: boolean) => (
    <div className="flex items-center gap-7 pr-7 shrink-0" aria-hidden={hidden}>
      {items.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <Bolt />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="relative h-24 -mt-12 overflow-hidden z-10">
      <div className="absolute -left-[2%] -right-[2%] top-6 -rotate-[1.8deg] bg-signal shadow-[0_6px_18px_rgba(0,0,0,0.15)] py-3.5 overflow-hidden">
        <div className="flex w-max animate-marquee font-display font-extrabold uppercase text-2xl tracking-wide text-ink whitespace-nowrap">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
};

export default BenefitsRibbon;
