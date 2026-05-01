import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/21694703066"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="
        fixed bottom-6 right-6 z-40
        w-14 h-14 rounded-full
        bg-[#25D366] text-white
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
        active:scale-95
      "
    >
      {/* soft glow instead of aggressive ping */}
<span className="
  absolute inset-0 rounded-full
  bg-[#25D366]
  opacity-20 blur-xl
  animate-pulse
  scale-125
" />
      <MessageCircle className="w-6 h-6 relative" />
    </a>
  );
}