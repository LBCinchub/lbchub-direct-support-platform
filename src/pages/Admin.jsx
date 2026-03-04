import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import {
  CheckCircle, XCircle, Shield, ShieldCheck, ShieldOff,
  Star, StarOff, Trash2, ExternalLink, Clock, TrendingUp,
  Users, MousePointerClick, BarChart2, RefreshCw
} from "lucide-react";

const TABS = ["pending", "approved", "rejected"];

const tabLabel = { pending: "Pending Review", approved: "Approved", rejected: "Rejected" };

export default function Admin() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");
  const [stats, setStats] = useState({ total: 0, verified: 0, totalClicks: 0, pending: 0 });

  const loadOrgs = async () => {
    setLoading(true);
    const all = await base44.entities.Organization.list("-created_date", 200);
    setOrgs(all);
    setStats({
      total: all.filter(o => o.status === "approved").length,
      verified: all.filter(o => o.verified).length,
      totalClicks: all.reduce((s, o) => s + (o.click_count || 0), 0),
      pending: all.filter(o => o.status === "pending").length,
    });
    setLoading(false);
  };

  useEffect(() => { loadOrgs(); }, []);

  const update = async (id, data) => {
    await base44.entities.Organization.update(id, data);
    setOrgs(prev => prev.map(o => o.id === id ? { ...o, ...data } : o));
    // Recompute stats
    const updated = orgs.map(o => o.id === id ? { ...o, ...data } : o);
    setStats({
      total: updated.filter(o => o.status === "approved").length,
      verified: updated.filter(o => o.verified).length,
      totalClicks: updated.reduce((s, o) => s + (o.click_count || 0), 0),
      pending: updated.filter(o => o.status === "pending").length,
    });
  };

  const deleteOrg = async (id) => {
    if (!window.confirm("Delete this organization? This cannot be undone.")) return;
    await base44.entities.Organization.delete(id);
    setOrgs(prev => prev.filter(o => o.id !== id));
  };

  const filtered = orgs.filter(o => o.status === tab);

  const statCards = [
    { icon: Users, label: "Approved Orgs", value: stats.total, color: "#14b8a6" },
    { icon: ShieldCheck, label: "Verified", value: stats.verified, color: "#60a5fa" },
    { icon: MousePointerClick, label: "Total Donate Clicks", value: stats.totalClicks, color: "#a78bfa" },
    { icon: Clock, label: "Pending Review", value: stats.pending, color: "#f59e0b" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "#e8f4ff" }}>Admin Dashboard</h1>
          <p className="text-sm" style={{ color: "rgba(130, 170, 205, 0.6)" }}>
            Manage organizations, verify listings, and track performance.
          </p>
        </div>
        <button
          onClick={loadOrgs}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
          style={{
            background: "rgba(20, 184, 166, 0.07)",
            border: "1px solid rgba(20, 184, 166, 0.18)",
            color: "#14b8a6",
          }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5"
            style={{ background: "rgba(12, 15, 26, 0.8)", border: "1px solid rgba(30, 50, 80, 0.4)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
            >
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-bold mb-0.5" style={{ color: s.color }}>
              {loading ? "—" : s.value.toLocaleString()}
            </div>
            <div className="text-xs" style={{ color: "rgba(120, 160, 190, 0.55)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6 w-fit"
        style={{ background: "rgba(8, 10, 18, 0.7)", border: "1px solid rgba(30, 50, 80, 0.35)" }}
      >
        {TABS.map((t) => {
          const count = orgs.filter(o => o.status === t).length;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              style={{
                background: tab === t ? "rgba(20, 184, 166, 0.12)" : "transparent",
                border: tab === t ? "1px solid rgba(20, 184, 166, 0.25)" : "1px solid transparent",
                color: tab === t ? "#14b8a6" : "rgba(130, 170, 205, 0.55)",
              }}
            >
              {tabLabel[t]}
              <span
                className="px-1.5 py-0.5 rounded-md text-xs"
                style={{
                  background: tab === t ? "rgba(20, 184, 166, 0.2)" : "rgba(30, 50, 80, 0.4)",
                  color: tab === t ? "#14b8a6" : "rgba(130, 170, 205, 0.4)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl h-20 animate-pulse" style={{ background: "rgba(12, 15, 26, 0.6)" }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="rounded-2xl py-16 text-center"
          style={{ background: "rgba(12, 15, 26, 0.5)", border: "1px solid rgba(30, 50, 80, 0.3)" }}
        >
          <p className="text-sm" style={{ color: "rgba(130, 170, 205, 0.5)" }}>
            No {tabLabel[tab].toLowerCase()} organizations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((org) => (
            <div
              key={org.id}
              className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all"
              style={{
                background: "rgba(12, 15, 26, 0.8)",
                border: "1px solid rgba(30, 50, 80, 0.35)",
              }}
            >
              {/* Logo */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base font-bold"
                style={{
                  background: "rgba(20, 184, 166, 0.08)",
                  border: "1px solid rgba(20, 184, 166, 0.18)",
                  color: "#14b8a6",
                }}
              >
                {org.logo_url ? (
                  <img src={org.logo_url} alt="" className="w-7 h-7 object-contain rounded" onError={(e) => { e.target.style.display = "none"; }} />
                ) : (
                  org.name?.charAt(0)
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-sm" style={{ color: "#deeaf7" }}>{org.name}</span>
                  {org.verified && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(20, 184, 166, 0.1)", color: "#14b8a6", border: "1px solid rgba(20, 184, 166, 0.2)" }}>
                      ✓ Verified
                    </span>
                  )}
                  {org.featured && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                      ★ Featured
                    </span>
                  )}
                </div>
                <p className="text-xs truncate" style={{ color: "rgba(120, 160, 190, 0.55)" }}>
                  {org.country && <span>{org.country} · </span>}
                  {org.category && <span>{org.category} · </span>}
                  <span className="inline-flex items-center gap-0.5">
                    <MousePointerClick className="w-2.5 h-2.5 inline" /> {org.click_count || 0} clicks
                  </span>
                </p>
              </div>

              {/* Links */}
              <div className="flex items-center gap-2 flex-wrap">
                {org.donation_url && (
                  <a
                    href={org.donation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-all"
                    style={{ background: "rgba(20, 184, 166, 0.07)", border: "1px solid rgba(20, 184, 166, 0.15)", color: "#14b8a6" }}
                  >
                    <ExternalLink className="w-3 h-3" /> Donate URL
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                {tab === "pending" && (
                  <>
                    <button
                      onClick={() => update(org.id, { status: "approved", verified: true })}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all font-medium"
                      style={{ background: "rgba(20, 184, 166, 0.12)", border: "1px solid rgba(20, 184, 166, 0.25)", color: "#14b8a6" }}
                    >
                      <CheckCircle className="w-3 h-3" /> Approve
                    </button>
                    <button
                      onClick={() => update(org.id, { status: "rejected" })}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all font-medium"
                      style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#f87171" }}
                    >
                      <XCircle className="w-3 h-3" /> Reject
                    </button>
                  </>
                )}

                {tab === "approved" && (
                  <>
                    <button
                      onClick={() => update(org.id, { verified: !org.verified })}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all font-medium"
                      style={{
                        background: org.verified ? "rgba(239, 68, 68, 0.07)" : "rgba(20, 184, 166, 0.1)",
                        border: org.verified ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(20, 184, 166, 0.22)",
                        color: org.verified ? "#f87171" : "#14b8a6",
                      }}
                    >
                      {org.verified ? <ShieldOff className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                      {org.verified ? "Unverify" : "Verify"}
                    </button>
                    <button
                      onClick={() => update(org.id, { featured: !org.featured })}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all font-medium"
                      style={{
                        background: org.featured ? "rgba(245, 158, 11, 0.1)" : "rgba(30, 50, 80, 0.3)",
                        border: org.featured ? "1px solid rgba(245, 158, 11, 0.2)" : "1px solid rgba(30, 50, 80, 0.4)",
                        color: org.featured ? "#f59e0b" : "rgba(130, 170, 205, 0.5)",
                      }}
                    >
                      {org.featured ? <StarOff className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                      {org.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      onClick={() => update(org.id, { status: "rejected" })}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all"
                      style={{ background: "rgba(239, 68, 68, 0.07)", border: "1px solid rgba(239, 68, 68, 0.15)", color: "#f87171" }}
                    >
                      <XCircle className="w-3 h-3" /> Remove
                    </button>
                  </>
                )}

                {tab === "rejected" && (
                  <button
                    onClick={() => update(org.id, { status: "approved" })}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all font-medium"
                    style={{ background: "rgba(20, 184, 166, 0.1)", border: "1px solid rgba(20, 184, 166, 0.22)", color: "#14b8a6" }}
                  >
                    <CheckCircle className="w-3 h-3" /> Re-approve
                  </button>
                )}

                <button
                  onClick={() => deleteOrg(org.id)}
                  className="p-1.5 rounded-lg transition-all"
                  style={{ color: "rgba(239, 68, 68, 0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(239, 68, 68, 0.4)")}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}