import { MessageCircle } from "lucide-react";
import { useCallback } from "react";

const ViberButton = () => {
  const viberNumber = "38163312579";
  const viberMessage = encodeURIComponent(
    "Zdravo! Zanima me zakazivanje termina za elektro usluge.",
  );
  // Viber deep link: viber://pa?contact=NUMBER&text=MESSAGE
  const viberLink = `viber://pa?contact=${viberNumber}&text=${viberMessage}`;
  const fallback = "https://www.viber.com/";

  const openViber = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      // On mobile try the deep link. If the app is installed the OS should handle it.
      window.location.href = viberLink;
    } else {
      // On desktop open Viber's website instead of attempting the custom scheme
      window.open(fallback, "_blank", "noopener,noreferrer");
    }
  }, [viberLink]);

  return (
    <a
      href={fallback}
      onClick={openViber}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-24 z-50 w-14 h-14 bg-[#7360F2] hover:bg-[#5B4AC9] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on Viber"
    >
      <MessageCircle className="w-7 h-7 text-white" />

      <div className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Pišite nam na Viber!
      </div>
    </a>
  );
};

export default ViberButton;