import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Shield, ArrowRight, CheckCircle, Eye, Zap, Lock } from "lucide-react";
import OrgCard from "../components/OrgCard";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    base44.entities.Organization.filter({ status: "approved", verified: true }, "-click_count", 3)
      .then(setFeatured)
      .catch(() => {});
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Verified Organizations",
      desc: "Every organization is manually reviewed and verified before appearing on our platform.",
    },
    {
      icon: Eye,
      title: "Full Transparency",
      desc: "We publish our verification process and never obscure where your money goes.",
    },
    {
      icon: Zap,
      title: "Direct Giving",
      desc: "We link directly to official donation pages. Zero middlemen, zero fees from us.",
    },
    {
      icon: Lock,
      title: "No Data Collection",
      desc: "We don't process payments or store financial data. Your donation is always between you and the organization.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(20, 184, 166, 0.35) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "-100px",
        }}
      />

      {/* ── Hero ── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Tag */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
          style={{
            background: "rgba(20, 184, 166, 0.08)",
            border: "1px solid rgba(20, 184, 166, 0.2)",
            color: "#14b8a6",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Verified & Transparent Giving
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          style={{ color: "#e8f4ff" }}
        >
          Direct Support.{" "}
          <span className="text-teal-glow" style={{ color: "#14b8a6" }}>
            Verified Organizations.
          </span>
          <br />
          Full Transparency.
        </h1>

        <p
          className="max-w-2xl mx-auto text-lg leading-relaxed mb-10"
          style={{ color: "rgba(150, 195, 230, 0.75)" }}
        >
          LBCHUB connects you directly to trusted, verified nonprofit organizations.
          We never handle your donation — we only provide a transparent gateway to official giving pages.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={createPageUrl("Organizations")}
            className="teal-glow-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              color: "#f0fdfa",
            }}
          >
            View Verified Organizations
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to={createPageUrl("Submit")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(20, 184, 166, 0.07)",
              border: "1px solid rgba(20, 184, 166, 0.2)",
              color: "#14b8a6",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(20, 184, 166, 0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(20, 184, 166, 0.07)")}
          >
            Submit an Organization
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {[
            { val: "100%", label: "No Fees" },
            { val: "Direct", label: "No Middlemen" },
            { val: "Verified", label: "Every Organization" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-2xl font-bold mb-0.5"
                style={{ color: "#14b8a6" }}
              >
                {s.val}
              </div>
              <div className="text-xs" style={{ color: "rgba(120, 160, 190, 0.6)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ borderTop: "1px solid rgba(20, 184, 166, 0.07)" }}
      />

      {/* ── Features ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#deeaf7" }}>
            Why LBCHUB?
          </h2>
          <p className="text-sm" style={{ color: "rgba(120, 160, 190, 0.6)" }}>
            Built on trust, transparency, and direct impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 transition-all duration-300 card-glow"
              style={{
                background: "rgba(12, 15, 26, 0.7)",
                border: "1px solid rgba(30, 50, 80, 0.4)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "rgba(20, 184, 166, 0.1)",
                  border: "1px solid rgba(20, 184, 166, 0.2)",
                }}
              >
                <f.icon className="w-5 h-5" style={{ color: "#14b8a6" }} />
              </div>
              <h3 className="font-semibold mb-2 text-sm" style={{ color: "#deeaf7" }}>
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(130, 170, 205, 0.65)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Organizations ── */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: "#deeaf7" }}>
                Featured Organizations
              </h2>
              <p className="text-sm" style={{ color: "rgba(120, 160, 190, 0.6)" }}>
                Trusted, verified, and ready to receive your support.
              </p>
            </div>
            <Link
              to={createPageUrl("Organizations")}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "#14b8a6" }}
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div
          className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{
            background: "rgba(12, 15, 26, 0.9)",
            border: "1px solid rgba(20, 184, 166, 0.15)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(20, 184, 166, 0.08) 0%, transparent 60%)",
            }}
          />
          <Shield className="w-10 h-10 mx-auto mb-4" style={{ color: "#14b8a6" }} />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#deeaf7" }}>
            Know a verified organization?
          </h2>
          <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: "rgba(130, 170, 205, 0.65)" }}>
            Help us grow the network of trusted organizations. Submit for review and our team will verify before publishing.
          </p>
          <Link
            to={createPageUrl("Submit")}
            className="teal-glow-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              color: "#f0fdfa",
            }}
          >
            Submit an Organization <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}