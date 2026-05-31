import { styles } from "../styles";
import { Modal } from "./ui";

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <Modal title="Confirmer la suppression" onClose={onCancel}>
      <p style={{ color: "#6b7280", marginBottom: 24 }}>Cette action est irréversible.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button style={styles.cancelBtn} onClick={onCancel}>Annuler</button>
        <button style={{ ...styles.saveBtn, background: "#ef4444" }} onClick={onConfirm}>
          Supprimer
        </button>
      </div>
    </Modal>
  );
}