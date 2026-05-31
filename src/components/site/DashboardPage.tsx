import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Users, CalendarCheck, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { api } from "../../utils/api";
import type { Reservation, ReservationStats } from "../../types";

interface KPI {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  bg: string;
  path: string;
}

interface StatusCard {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<ReservationStats | null>(null);
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [clientCount, setClientCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.getReservationStats(),
      api.getReservations({ limit: "5" }),
      api.getProducts(),
      api.getClients(),
    ]).then(([s, r, p, c]) => {
      setStats(s);
      setRecentReservations(r.slice(0, 6));
      setProductCount(p.length);
      setClientCount(c.length);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const kpis: KPI[] = [
    { label: "Produits",        value: productCount,                                   icon: Package,       color: "#6366f1", bg: "rgba(99,102,241,0.1)",  path: "/admin/products" },
    { label: "Clients",         value: clientCount,                                    icon: Users,         color: "#10b981", bg: "rgba(16,185,129,0.1)",  path: "/admin/clients" },
    { label: "Réservations",    value: stats?.total ?? 0,                              icon: CalendarCheck, color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  path: "/admin/reservations" },
    { label: "Revenu complété", value: `${(stats?.revenue ?? 0).toLocaleString()} DT`, icon: TrendingUp,    color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",  path: "/admin/reservations" },
  ];

  const statusCards: StatusCard[] = [
    { label: "En attente", value: stats?.pending   ?? 0, icon: Clock,       color: "#f59e0b" },
    { label: "Confirmés",  value: stats?.confirmed ?? 0, icon: CheckCircle, color: "#10b981" },
    { label: "Annulés",    value: stats?.cancelled ?? 0, icon: XCircle,     color: "#ef4444" },
    { label: "Complétés",  value: stats?.completed ?? 0, icon: AlertCircle, color: "#6366f1" },
  ];

  return (
    <div style={{ animation: "fadeIn .3s ease" }}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Tableau de bord</h1>
          <p style={styles.pageSubtitle}>Vue d'ensemble de votre activité</p>
        </div>
      </div>

      <div style={styles.kpiGrid}>
        {kpis.map(({ label, value, icon: Icon, color, bg, path }) => (
          <div key={label} style={styles.kpiCard} onClick={() => navigate(path)}>
            <div style={{ ...styles.kpiIcon, background: bg }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <div style={styles.kpiValue}>{value}</div>
              <div style={styles.kpiLabel}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Statut des réservations</h2>
        <div style={styles.statusGrid}>
          {statusCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={styles.statusCard}>
              <Icon size={16} color={color} />
              <span style={styles.statusValue}>{value}</span>
              <span style={styles.statusLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Réservations récentes</h2>
          <button style={styles.seeAllBtn} onClick={() => navigate("/admin/reservations")}>
            Voir tout →
          </button>
        </div>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Client", "Produit", "Quantité", "Montant", "Date", "Statut"].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentReservations.map((r) => (
                <tr key={r.id} style={styles.tr} onClick={() => navigate("/admin/reservations")}>
                  <td style={styles.td}>{r.client?.name ?? "—"}</td>
                  <td style={styles.td}>{r.product?.name ?? "—"}</td>
                  <td style={styles.td}>{r.quantity}</td>
                  <td style={styles.td}>{r.totalPrice?.toLocaleString()} DT</td>
                  <td style={styles.td}>{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td style={styles.td}><StatusBadge status={r.status} /></td>
                </tr>
              ))}
              {recentReservations.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ ...styles.td, textAlign: "center", color: "var(--text3)", padding: 32 }}>
                    Aucune réservation pour l'instant
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: Reservation["status"] }) {
  const map: Record<Reservation["status"], { label: string; color: string; bg: string }> = {
    pending:   { label: "En attente", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    confirmed: { label: "Confirmé",   color: "#10b981", bg: "rgba(16,185,129,0.12)" },
    cancelled: { label: "Annulé",     color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
    completed: { label: "Complété",   color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  };
  const s = map[status];
  return (
    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
      {s.label}
    </span>
  );
}

function Loader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
      <div style={{ width: 32, height: 32, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  pageHeader:   { marginBottom: 28 },
  pageTitle:    { fontFamily: "var(--font-display)", fontSize: 28, color: "var(--text)", marginBottom: 4 },
  pageSubtitle: { color: "var(--text2)", fontSize: 14 },
  kpiGrid:      { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 },
  kpiCard:      { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "border-color .2s, transform .2s" },
  kpiIcon:      { width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  kpiValue:     { fontSize: 24, fontWeight: 700, color: "var(--text)", lineHeight: 1 },
  kpiLabel:     { fontSize: 13, color: "var(--text2)", marginTop: 4 },
  section:      { marginBottom: 32 },
  sectionHeader:{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: 600, color: "var(--text)" },
  seeAllBtn:    { background: "none", border: "none", color: "var(--accent2)", fontSize: 13, cursor: "pointer" },
  statusGrid:   { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 },
  statusCard:   { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px", display: "flex", flexDirection: "column", gap: 6 },
  statusValue:  { fontSize: 28, fontWeight: 700, color: "var(--text)" },
  statusLabel:  { fontSize: 13, color: "var(--text2)" },
  tableWrap:    { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" },
  table:        { width: "100%", borderCollapse: "collapse" },
  th:           { padding: "12px 16px", textAlign: "left", fontSize: 12, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid var(--border)", background: "var(--bg2)" },
  tr:           { cursor: "pointer", transition: "background .15s" },
  td:           { padding: "13px 16px", fontSize: 14, color: "var(--text)", borderBottom: "1px solid var(--border)" },
};