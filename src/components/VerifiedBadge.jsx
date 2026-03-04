import { ShieldCheck } from "lucide-react";

export default function VerifiedBadge({ size = "sm" }) {
  const sizes = {
    sm: { icon: "w-3 h-3", text: "text-xs", px: "px-2 py-0.5" },
    md: { icon: "w-3.5 h-3.5", text: "text-xs", px: "px-2.5 py-1" },
  };
  const s = sizes[size];

  return (
    <span
      className={`inline-flex items-center gap-1 ${s.px} ${s.text} font-semibold rounded-full`}
      style={{
        background: "rgba(20, 184, 166, 0.1)",
        border: "1px solid rgba(20, 184, 166, 0.25)",
        color: "#14b8a6",
      }}
    >
      <ShieldCheck className={s.icon} />
      Verified by LBCHUB
    </span>
  );
}