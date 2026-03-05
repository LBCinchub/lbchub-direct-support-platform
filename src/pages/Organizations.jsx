import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import OrgCard from "../components/OrgCard";

const CATEGORIES = ["All", "Humanitarian", "Education", "Healthcare", "Environment", "Disaster Relief", "Children & Youth", "Food Security", "Human Rights", "Other"];

export default function Organizations() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    base44.entities.Organization.filter({ status: "approved" }, "-click_count", 100)
      .then(setOrgs)
      .finally(() => setLoading(false));
  }, []);

  const filtered = [...orgs].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).filter((o) => {
    const matchSearch =
      search === "" ||
      o.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.description?.toLowerCase().includes(search.toLowerCase()) ||
      o.country?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || o.category === category;
    const matchVerified = !verifiedOnly || o.verified;
    return matchSearch && matchCat && matchVerified;
  });

  const handleClickUpdate = (id, newCount) => {
    setOrgs((prev) => prev.map((o) => (o.id === id ? { ...o, click_count: newCount } : o)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "#e8f4ff" }}>
          Verified Organizations
        </h1>
        <p className="text-sm" style={{ color: "rgba(130, 170, 205, 0.65)" }}>
          Every organization below has been manually reviewed and approved by the LBCHUB team.
        </p>
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        style={{
          background: "rgba(12, 15, 26, 0.8)",
          border: "1px solid rgba(30, 50, 80, 0.4)",
        }}
      >
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "rgba(120, 160, 190, 0.5)" }}
          />
          <input
            type="text"
            placeholder="Search organizations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{
              background: "rgba(8, 10, 18, 0.7)",
              border: "1px solid rgba(30, 50, 80, 0.5)",
              color: "#c8dff0",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(20, 184, 166, 0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(30, 50, 80, 0.5)")}
          />
        </div>

        {/* Category select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
          style={{
            background: "rgba(8, 10, 18, 0.7)",
            border: "1px solid rgba(30, 50, 80, 0.5)",
            color: "#c8dff0",
          }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} style={{ background: "#0a0c16" }}>
              {c}
            </option>
          ))}
        </select>

        {/* Verified toggle */}
        <button
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
          style={{
            background: verifiedOnly ? "rgba(20, 184, 166, 0.15)" : "rgba(8, 10, 18, 0.7)",
            border: verifiedOnly ? "1px solid rgba(20, 184, 166, 0.35)" : "1px solid rgba(30, 50, 80, 0.5)",
            color: verifiedOnly ? "#14b8a6" : "rgba(130, 170, 205, 0.6)",
          }}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Verified Only
        </button>
      </div>

      {/* Count */}
      <p className="text-xs mb-6" style={{ color: "rgba(100, 140, 180, 0.5)" }}>
        Showing {filtered.length} organization{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl h-72 animate-pulse"
              style={{ background: "rgba(12, 15, 26, 0.6)", border: "1px solid rgba(30, 50, 80, 0.3)" }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(20, 184, 166, 0.07)", border: "1px solid rgba(20, 184, 166, 0.15)" }}
          >
            <Search className="w-6 h-6" style={{ color: "rgba(20, 184, 166, 0.5)" }} />
          </div>
          <p className="font-medium mb-1" style={{ color: "#c8dff0" }}>
            No organizations found
          </p>
          <p className="text-sm" style={{ color: "rgba(100, 140, 180, 0.5)" }}>
            Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((org) => (
            <OrgCard key={org.id} org={org} onClickUpdate={handleClickUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}