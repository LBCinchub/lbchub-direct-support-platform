import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LbcCharityLogo from "@/components/LbcCharityLogo";

const navLinks = [
  { label: "Home", page: "Home" },
  { label: "Organizations", page: "Organizations" },
  { label: "Submit", page: "Submit" },
  { label: "Transparency", page: "Transparency" },
  { label: "Admin", page: "Admin" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkCls = (page) =>
    currentPageName === page
      ? "text-primary bg-secondary"
      : "text-muted-foreground hover:text-primary";

  const Brand = ({ size, text }) => (
    <>
      <LbcCharityLogo size={size} />
      <span className={`font-heading font-bold tracking-tight text-foreground ${text}`}>
        LBC<span className="text-primary">HUB</span>
      </span>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={createPageUrl("Home")} className="flex items-center gap-2.5">
              <Brand size={32} text="text-lg" />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${linkCls(link.page)}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button className="md:hidden p-2 rounded-lg text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border px-4 py-3 space-y-1 bg-card">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${linkCls(link.page)}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="border-t border-border mt-20 py-10 px-4 bg-card">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brand size={22} text="text-sm" />
            <span className="text-xs ml-2 text-muted-foreground">— Verified Giving, Full Transparency</span>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            LBCHUB does not collect donations. We only redirect to verified official pages.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link to={createPageUrl("Transparency")} className="hover:text-primary transition-colors">Transparency</Link>
            <Link to={createPageUrl("Submit")} className="hover:text-primary transition-colors">Submit Org</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}