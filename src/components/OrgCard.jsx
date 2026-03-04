import { ExternalLink, MapPin, Tag } from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";
import { base44 } from "@/api/base44Client";

export default function OrgCard({ org, onClickUpdate }) {
  const handleDonate = async () => {
    // Increment click count
    const newCount = (org.click_count || 0) + 1;
    base44.entities.Organization.update(org.id, { click_count: newCount });
    if (onClickUpdate) onClickUpdate(org.id, newCount);
    window.open(org.donation_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="card-glow rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group"
      style={{
        background: "rgba(12, 15, 26, 0.8)",
        border: "1px solid rgba(30, 50, 80, 0.5)",
      }}
    >
      {/* Logo / Header */}
      <div
        className="relative h-28 flex items-center justify-center overflow-hidden"
        style={{ background: "rgba(8, 12, 22, 0.9)", borderBottom: "1px solid rgba(20, 184, 166, 0.07)" }}
      >
        {/* Glow blob */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 120%, rgba(20, 184, 166, 0.06) 0%, transparent 70%)",
          }}
        />
        {org.logo_url ? (
          <img
            src={org.logo_url}
            alt={org.name}
            className="h-16 w-auto max-w-[160px] object-contain relative z-10"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold relative z-10"
          style={{
            display: org.logo_url ? "none" : "flex",
            background: "rgba(20, 184, 166, 0.1)",
            border: "1px solid rgba(20, 184, 166, 0.2)",
            color: "#14b8a6",
          }}
        >
          {org.name?.charAt(0)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category & Country */}
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          {org.category && (
            <span
              className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                color: "#60a5fa",
              }}
            >
              <Tag className="w-2.5 h-2.5" />
              {org.category}
            </span>
          )}
          {org.country && (
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: "rgba(120, 160, 190, 0.6)" }}
            >
              <MapPin className="w-3 h-3" />
              {org.country}
            </span>
          )}
        </div>

        <h3
          className="font-semibold text-base mb-2 leading-snug"
          style={{ color: "#deeaf7" }}
        >
          {org.name}
        </h3>

        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: "rgba(140, 175, 210, 0.7)" }}
        >
          {org.description?.length > 120
            ? org.description.slice(0, 120) + "…"
            : org.description}
        </p>

        {/* Verified badge */}
        {org.verified && (
          <div className="mb-4">
            <VerifiedBadge />
          </div>
        )}

        {/* Donate Button */}
        <button
          onClick={handleDonate}
          className="teal-glow-btn w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(20, 184, 166, 0.1) 100%)",
            border: "1px solid rgba(20, 184, 166, 0.35)",
            color: "#14b8a6",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.18) 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(20, 184, 166, 0.1) 100%)";
          }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Donate Directly
        </button>
      </div>
    </div>
  );
}