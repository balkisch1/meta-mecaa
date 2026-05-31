// src/components/site/client/MyReservationsPage.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../utils/api";



// Match your backend's formatRes output
type MyReservation = {
  _id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  notes?: string;
  quantity: number;
  totalPrice: number;
  product?: { name: string; category?: string };
};

const STATUS_LABEL: Record<MyReservation["status"], string> = {
  pending:   "En attente",
  confirmed: "Confirmée",
  completed: "Terminée",
  cancelled: "Annulée",
};

const STATUS_COLOR: Record<MyReservation["status"], string> = {
  pending:   "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function MyReservationsPage() {
  const { user, logout } = useAuth();
  const [reservations, setReservations] = useState<MyReservation[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");

useEffect(() => {
    if (!user) return;
    api
      .getMyReservations()
      .then((data) => setReservations(data as unknown as MyReservation[]))
      .catch(() => setError("Impossible de charger vos réservations."))
      .finally(() => setLoading(false));
  }, [user]);

  return (
   
    <div className="min-h-screen bg-[#f9f9f9] pt-28 pb-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#999] mb-2">
            Espace client
          </p>
          <h1 className="text-3xl font-light text-[#1a1a1a] tracking-tight">
            Mes réservations
          </h1>
          {user && (
            <p className="mt-1 text-sm text-[#aaa]">{user.name} · {user.email}</p>
          )}
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-[#999] text-sm py-12">
            <span className="w-4 h-4 rounded-full border-2 border-[#ccc] border-t-[#1a1a1a] animate-spin" />
            Chargement…
          </div>
        )}

        {!loading && error && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className="text-center py-20 text-[#bbb]">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-sm tracking-wide">Aucune réservation pour le moment.</p>
          </div>
        )}

        {!loading && !error && reservations.length > 0 && (
          <ul className="flex flex-col gap-4">
            {reservations.map((r) => (
              <li
                key={r._id}
                className="bg-white border border-[#ebebeb] rounded-xl px-6 py-5
                           flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
                           hover:shadow-sm transition-shadow"
              >
                <div>
                  {r.product && (
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#bbb] mb-1">
                      {r.product.category ?? "Produit"}
                    </p>
                  )}
                  <p className="text-[#1a1a1a] text-sm font-medium">
                    {r.product?.name ?? "—"}
                  </p>
                  <p className="text-xs text-[#aaa] mt-0.5">
                    {r.quantity} unité{r.quantity > 1 ? "s" : ""} ·{" "}
                    {r.totalPrice.toLocaleString("fr-TN")} TND
                  </p>
                  {r.notes && (
                    <p className="text-xs text-[#bbb] mt-1 italic">{r.notes}</p>
                  )}
                  <p className="text-xs text-[#ccc] mt-1">
                    {new Date(r.createdAt).toLocaleDateString("fr-TN", {
                      day: "2-digit", month: "long", year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`self-start sm:self-center text-[11px] font-semibold
                              tracking-[0.12em] uppercase px-3 py-1.5 rounded-full
                              ${STATUS_COLOR[r.status]}`}
                >
                  {STATUS_LABEL[r.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );


  
}
  