import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation();

  const faqs = t("faq.list", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-blue-light mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("faq.subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t("faq.moreQuestions", "Imate još pitanja?")}
          </p>
          <a
            href="tel:+38163312579"
            className="inline-flex items-center gap-2 text-primary hover:text-electric-blue-dark font-semibold transition-colors"
          >
            {t("faq.callUs", "Pozovite nas: ")} 063 312 579
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
