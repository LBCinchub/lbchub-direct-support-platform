import { ShieldCheck } from "lucide-react";

export default function VerifiedBadge({ size = "sm" }) {
  const sizes = {
    sm: { icon: "w-3 h-3", text: "text-xs", px: "px-2 py-0.5" },
    md: { icon: "w-3.5 h-3.5", text: "text-xs", px: "px-2.5 py-1" },
  };
  const s = sizes[size];

  return (
    <span className={`inline-flex items-center gap-1 ${s.px} ${s.text} font-semibold rounded-full bg-secondary text-primary border border-primary/30`}>
      <ShieldCheck className={s.icon} />
      Verified by LBCHUB
    </span>
  );
}