import { useState } from "react";
import avatar from "../../assets/agent-avatar.png";
export function AIAgent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* WRAPPER */}
      <div className="fixed top-6 right-6 z-[9999] flex items-end gap-2">

        {/* MINI BUBBLE (toujours visible) */}
        {!open && (
          <div className="
            text-xs bg-white/90 backdrop-blur
            px-3 py-2 rounded-full shadow-md
            border border-gray-200
            animate-pulse
          ">
            Besoin d’aide ? 👋
          </div>
        )}

        {/* AVATAR BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="
            w-14 h-14 rounded-full
            overflow-hidden
            border border-white/20
            shadow-[0_10px_30px_rgba(0,0,0,0.25)]
            hover:scale-110 transition
          "
        >
          <img src={avatar} 
            alt="AI Agent"
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* CHAT */}
      {open && (
        <div className="
          fixed top-24 right-6 z-[9999]
          w-80 bg-white border rounded-xl shadow-xl p-3
        ">
          <div className="text-sm font-medium mb-2">
            Assistant Meta Meca
          </div>

          <div className="text-xs text-gray-500">
            Posez vos questions sur nos cuisines et structures métalliques.
          </div>
        </div>
      )}
    </>
  );
}