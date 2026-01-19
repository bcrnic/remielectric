import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "38163312579";
  const whatsappMessage = encodeURIComponent(
    "Zdravo! Zanima me zakazivanje termina za elektro usluge.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />

      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Pišite nam!
      </div>
    </a>
  );
};

export default WhatsAppButton;
