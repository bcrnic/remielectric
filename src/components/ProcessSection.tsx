import { useTranslation } from "react-i18next";

const ProcessSection = () => {
  const { t } = useTranslation();
  const steps = t("process.steps", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;

  return (
    <section className="pt-12 pb-20 md:pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-signal-text font-bold text-sm uppercase tracking-[0.2em]">
            {t("process.label")}
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase leading-none text-foreground mt-3">
            {t("process.title")}
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-border bg-card p-8 shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
            >
              <span className="w-[52px] h-[52px] rounded-full bg-signal text-ink flex items-center justify-center font-display font-extrabold text-2xl">
                {index + 1}
              </span>
              <h3 className="font-sans font-bold text-xl text-foreground mt-5 mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
