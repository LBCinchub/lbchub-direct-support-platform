import { ExternalLink, MapPin, Tag } from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";
import { base44 } from "@/api/base44Client";

export default function OrgCard({ org, onClickUpdate }) {
  const handleDonate = async () => {
    const newCount = (org.click_count || 0) + 1;
    base44.entities.Organization.update(org.id, { click_count: newCount });
    if (onClickUpdate) onClickUpdate(org.id, newCount);
    window.open(org.donation_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-col bg-card text-card-foreground border border-border shadow-sm hover:shadow-lg hover:border-primary/40">
      <div className="relative h-28 flex items-center justify-center overflow-hidden bg-background border-b border-border">
        {org.logo_url ? (
          <img
            src={org.logo_url}
            alt={org.name}
            className="h-16 w-auto max-w-[160px] object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="w-14 h-14 rounded-xl items-center justify-center text-2xl font-bold font-heading bg-secondary text-primary"
          style={{ display: org.logo_url ? "none" : "flex" }}
        >
          {org.name?.charAt(0)}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          {org.category && (
            <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1 bg-secondary text-secondary-foreground">
              <Tag className="w-2.5 h-2.5" />
              {org.category}
            </span>
          )}
          {org.country && (
            <span className="text-xs flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {org.country}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-base mb-2 leading-snug text-foreground">{org.name}</h3>

        <p className="text-sm leading-relaxed mb-4 flex-1 text-muted-foreground">
          {org.card_blurb
            ? org.card_blurb
            : org.description?.length > 120
            ? org.description.slice(0, 120) + "…"
            : org.description}
        </p>

        {org.verified && (
          <div className="mb-4">
            <VerifiedBadge />
          </div>
        )}

        <button
          onClick={handleDonate}
          className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Donate Directly
        </button>
      </div>
    </div>
  );
}