import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useState } from "react";
import { Menu, X, Shield, ExternalLink } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", page: "Home" },
    { label: "Organizations", page: "Organizations" },
    { label: "Submit", page: "Submit" },
    { label: "Transparency", page: "Transparency" },
    { label: "Admin", page: "Admin" },
  ];

  const isActive = (page) => currentPageName === page;

  return (
    <div className="min-h-screen grid-bg" style={{ background: "rgb(8, 10, 18)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "rgba(8, 10, 18, 0.85)",
          borderColor: "rgba(20, 184, 166, 0.12)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(20, 184, 166, 0.15)", border: "1px solid rgba(20, 184, 166, 0.3)" }}
              >
                <Shield className="w-4 h-4" style={{ color: "#14b8a6" }} />
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ color: "#e2f0f9" }}>
                LBC<span style={{ color: "#14b8a6" }}>HUB</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive(link.page) ? "#14b8a6" : "rgba(180, 210, 230, 0.7)",
                    background: isActive(link.page) ? "rgba(20, 184, 166, 0.1)" : "transparent",
                    border: isActive(link.page) ? "1px solid rgba(20, 184, 166, 0.2)" : "1px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "rgba(180, 210, 230, 0.7)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-3 space-y-1"
            style={{ borderColor: "rgba(20, 184, 166, 0.1)", background: "rgba(8, 10, 18, 0.97)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive(link.page) ? "#14b8a6" : "rgba(180, 210, 230, 0.7)",
                  background: isActive(link.page) ? "rgba(20, 184, 166, 0.08)" : "transparent",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer
        className="border-t mt-20 py-10 px-4"
        style={{ borderColor: "rgba(20, 184, 166, 0.1)", background: "rgba(6, 8, 16, 0.8)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: "#14b8a6" }} />
            <span className="text-sm font-semibold" style={{ color: "#e2f0f9" }}>
              LBC<span style={{ color: "#14b8a6" }}>HUB</span>
            </span>
            <span className="text-xs ml-2" style={{ color: "rgba(120, 160, 190, 0.6)" }}>
              — Verified Giving, Full Transparency
            </span>
          </div>
          <p className="text-xs text-center" style={{ color: "rgba(120, 160, 190, 0.5)" }}>
            LBCHUB does not collect donations. We only redirect to verified official pages.
          </p>
          <div className="flex gap-4 text-xs" style={{ color: "rgba(120, 160, 190, 0.5)" }}>
            <Link to={createPageUrl("Transparency")} className="hover:text-teal-400 transition-colors">
              Transparency
            </Link>
            <Link to={createPageUrl("Submit")} className="hover:text-teal-400 transition-colors">
              Submit Org
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}