import { X } from "lucide-react";
import { mStyles } from "../styles";

/* ── Modal wrapper ── */
interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div style={mStyles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={mStyles.modal}>
        <div style={mStyles.mHeader}>
          <h2 style={mStyles.mTitle}>{title}</h2>
          <button style={mStyles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <div style={{ padding: "20px 24px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

/* ── Labelled field wrapper ── */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

/* ── Two-column row ── */
export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {children}
    </div>
  );
}