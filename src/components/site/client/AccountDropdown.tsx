import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";import { useNavigate } from "react-router-dom";
import { User, Package, LogOut } from "lucide-react";

export default function AccountDropdown({ textColor }: { textColor: string }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <button
        onClick={() => navigate("/login")}
        className={`p-2.5 ${textColor} hover:opacity-60`}
      >
        <User size={18} />
      </button>
    );
  }

  return (
    <div className="relative">

      {/* trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative p-2.5 ${textColor} hover:opacity-60`}
      >
        <User size={18} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white" />
      </button>

      {/* dropdown */}
      {open && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-56 bg-white border border-[#ebebeb] shadow-lg rounded-xl z-50 overflow-hidden">

            {/* header */}
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-[#999]">{user.email}</p>
            </div>

            {/* items */}
            <button
              onClick={() => {
                navigate("/my-reservations");
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#f9f9f9]"
            >
              <Package size={16} />
              Mes réservations
            </button>

            {/* logout */}
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        </>
      )}
    </div>
  );
}