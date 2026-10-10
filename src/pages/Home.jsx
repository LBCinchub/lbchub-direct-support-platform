import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Shield, ArrowRight, Eye, Zap, Lock } from "lucide-react";
import OrgCard from "../components/OrgCard";
import LbcCharityLogo from "@/components/LbcCharityLogo";

const primaryBtn = "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-md";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    base44.entities.Organization.filter({ status: "approved", verified: true }, "-featured", 3)
      .then((orgs) => {
        const sorted = [...orgs].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        setFeatured(sorted);
      })
      .catch(() => {});
  }, []);

  const features = [
    { icon: Shield, title: "Verified Organizations", desc: "Every organization is manually reviewed and verified before appearing on our platform." },
    { icon: Eye, title: "Full Transparency", desc: "We publish our verification process and never obscure where your money goes." },
    { icon: Zap, title: "Direct Giving", desc: "We link directly to official donation pages. Zero middlemen, zero fees from us." },
    { icon: Lock, title: "No Data Collection", desc: "We don't process payments or store financial data. Your donation is always between you and the organization." },
  ];

  return (
    <div className="relative overflow-hidden">
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        <div className="flex justify-center mb-5">
          <LbcCharityLogo size={64} containerClassName="rounded-2xl" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 bg-secondary text-primary border border-primary/20">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Verified & Transparent Giving
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-foreground">
          Direct Support. <span className="text-primary">Verified Organizations.</span>
          <br />
          Full Transparency.
        </h1>

        <p className="max-w-2xl mx-auto text-lg leading-relaxed mb-10 text-muted-foreground">
          LBCHUB connects you directly to trusted, verified nonprofit organizations.
          We never handle your donation — we only provide a transparent gateway to official giving pages.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={createPageUrl("Organizations")} className={primaryBtn}>
            View Verified Organizations
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to={createPageUrl("Submit")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all bg-card text-primary border border-primary/30 hover:bg-secondary"
          >
            Submit an Organization
          </Link>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {[
            { val: "100%", label: "No Fees" },
            { val: "Direct", label: "No Middlemen" },
            { val: "Verified", label: "Every Organization" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold font-heading mb-0.5 text-primary">{s.val}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto border-t border-border" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">Why LBCHUB?</h2>
          <p className="text-sm text-muted-foreground">Built on trust, transparency, and direct impact.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl p-6 transition-all duration-300 bg-card border border-border hover:shadow-md">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-secondary">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-sm text-foreground">{f.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1 text-foreground">Featured Organizations</h2>
              <p className="text-sm text-muted-foreground">Trusted, verified, and ready to receive your support.</p>
            </div>
            <Link to={createPageUrl("Organizations")} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-2xl p-8 sm:p-12 text-center bg-secondary border border-primary/20">
          <Shield className="w-10 h-10 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">Know a verified organization?</h2>
          <p className="text-sm mb-7 max-w-lg mx-auto text-secondary-foreground/80">
            Help us grow the network of trusted organizations. Submit for review and our team will verify before publishing.
          </p>
          <Link to={createPageUrl("Submit")} className={primaryBtn}>
            Submit an Organization <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}