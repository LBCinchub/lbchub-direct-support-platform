import { Shield, Eye, Lock, CheckCircle, ArrowRight, XCircle, AlertCircle, Search, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const steps = [
  {
    icon: FileCheck,
    step: "01",
    title: "Submission",
    desc: "Organizations or community members submit an organization via our form with the official website and donation page URLs.",
  },
  {
    icon: Search,
    step: "02",
    title: "Research & Review",
    desc: "Our team reviews the organization's legitimacy, tax-exempt status, public financial reports, and online presence.",
  },
  {
    icon: Eye,
    step: "03",
    title: "Link Verification",
    desc: "We manually verify the donation URL leads directly to the official, secure page — not a third-party or redirect.",
  },
  {
    icon: Shield,
    step: "04",
    title: "Approval & Badge",
    desc: "Once verified, the organization is listed with the LBCHUB Verified badge and direct donation link.",
  },
];

const doPoints = [
  "List verified organizations with direct links",
  "Display publicly available information about each org",
  "Provide a transparent review and verification process",
  "Track click counts for analytics transparency",
];

const dontPoints = [
  "Collect, process, or store any donation payments",
  "Charge fees to users or organizations",
  "Guarantee outcomes of donations",
  "Endorse specific political causes or movements",
];

export default function Transparency() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero */}
      <div className="text-center mb-16 relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(20, 184, 166, 0.1) 0%, transparent 70%)",
            filter: "blur(30px)",
            top: "-30px",
          }}
        />
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
          style={{
            background: "rgba(20, 184, 166, 0.08)",
            border: "1px solid rgba(20, 184, 166, 0.2)",
            color: "#14b8a6",
          }}
        >
          <Eye className="w-3 h-3" />
          Full Transparency
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#e8f4ff" }}>
          How LBCHUB Works
        </h1>
        <p
          className="text-base max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(140, 180, 215, 0.75)" }}
        >
          We believe that trust is built through radical transparency. Here is exactly what we do, how we do it, and what we will never do.
        </p>
      </div>

      {/* Core Statement */}
      <div
        className="rounded-2xl p-7 sm:p-10 mb-12 text-center relative overflow-hidden"
        style={{
          background: "rgba(12, 15, 26, 0.9)",
          border: "1px solid rgba(20, 184, 166, 0.15)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% -20%, rgba(20, 184, 166, 0.07) 0%, transparent 60%)",
          }}
        />
        <Lock className="w-8 h-8 mx-auto mb-4" style={{ color: "#14b8a6" }} />
        <p
          className="text-lg sm:text-xl font-semibold leading-relaxed max-w-3xl mx-auto"
          style={{ color: "#deeaf7" }}
        >
          "LBCHUB does not collect donations. We only list verified organizations and redirect users to their official, secure donation pages."
        </p>
        <p className="text-xs mt-4 font-semibold" style={{ color: "rgba(20, 184, 166, 0.7)" }}>
          — LBCHUB Core Principle
        </p>
      </div>

      {/* Do / Don't */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
        {/* We Do */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(12, 15, 26, 0.7)", border: "1px solid rgba(20, 184, 166, 0.1)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle className="w-4 h-4" style={{ color: "#14b8a6" }} />
            <h3 className="font-semibold text-sm" style={{ color: "#deeaf7" }}>What We Do</h3>
          </div>
          <ul className="space-y-3">
            {doPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(140, 180, 210, 0.75)" }}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#14b8a6" }} />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* We Don't */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(12, 15, 26, 0.7)", border: "1px solid rgba(239, 68, 68, 0.1)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <XCircle className="w-4 h-4" style={{ color: "#f87171" }} />
            <h3 className="font-semibold text-sm" style={{ color: "#deeaf7" }}>What We Don't Do</h3>
          </div>
          <ul className="space-y-3">
            {dontPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(140, 180, 210, 0.75)" }}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#f87171" }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="mb-14">
        <h2 className="text-xl font-bold mb-7" style={{ color: "#deeaf7" }}>
          Our Verification Process
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-2xl p-6 flex gap-4"
              style={{ background: "rgba(12, 15, 26, 0.7)", border: "1px solid rgba(30, 50, 80, 0.4)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(20, 184, 166, 0.08)",
                  border: "1px solid rgba(20, 184, 166, 0.18)",
                }}
              >
                <s.icon className="w-4.5 h-4.5" style={{ color: "#14b8a6" }} />
              </div>
              <div>
                <div className="text-xs font-bold mb-1" style={{ color: "rgba(20, 184, 166, 0.6)" }}>
                  Step {s.step}
                </div>
                <h4 className="font-semibold text-sm mb-1.5" style={{ color: "#deeaf7" }}>
                  {s.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(130, 170, 205, 0.65)" }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div
        className="rounded-2xl p-5 flex gap-3 items-start mb-10"
        style={{
          background: "rgba(245, 158, 11, 0.06)",
          border: "1px solid rgba(245, 158, 11, 0.15)",
        }}
      >
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#f59e0b" }} />
        <p className="text-xs leading-relaxed" style={{ color: "rgba(200, 175, 100, 0.75)" }}>
          <span className="font-semibold" style={{ color: "#fbbf24" }}>Important: </span>
          LBCHUB is a discovery and transparency platform. While we verify organizations to the best of our ability, we are not liable for the internal operations of any listed organization. We encourage donors to independently verify before donating.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-sm mb-4" style={{ color: "rgba(130, 170, 205, 0.6)" }}>
          Have a question about our process?
        </p>
        <Link
          to={createPageUrl("Submit")}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "#14b8a6" }}
        >
          Submit an organization for review <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}