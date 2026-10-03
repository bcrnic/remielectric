import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { contactLinks } from "@/lib/utils";

const ViberButton = () => {
  const { t } = useTranslation();

  return (
    <a
      href={contactLinks.viber}
      aria-label={t("common.viber")}
      title={t("common.viber")}
      className="fixed bottom-24 right-8 z-50 w-14 h-14 rounded-full bg-[#7360F2] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default ViberButton;
