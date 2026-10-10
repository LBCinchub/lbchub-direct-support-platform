import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search, SlidersHorizontal } from "lucide-react";
import OrgCard from "../components/OrgCard";

const CATEGORIES = ["All", "Humanitarian", "Education", "Healthcare", "Environment", "Disaster Relief", "Children & Youth", "Food Security", "Human Rights", "Other"];

const fieldCls = "rounded-xl text-sm outline-none bg-background border border-input text-foreground focus:border-primary transition-all";

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
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">Verified Organizations</h1>
        <p className="text-sm text-muted-foreground">
          Every organization below has been manually reviewed and approved by the LBCHUB team.
        </p>
      </div>

      <div className="rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-card border border-border">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search organizations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-4 py-2.5 ${fieldCls}`}
          />
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className={`px-3 py-2.5 cursor-pointer ${fieldCls}`}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${
            verifiedOnly ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-input"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Verified Only
        </button>
      </div>

      <p className="text-xs mb-6 text-muted-foreground">
        Showing {filtered.length} organization{filtered.length !== 1 ? "s" : ""}
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl h-72 animate-pulse bg-secondary" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-secondary">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <p className="font-medium mb-1 text-foreground">No organizations found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
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