import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle, Send, Shield, AlertCircle } from "lucide-react";
import AiDescriptionTools from "../components/AiDescriptionTools";

const CATEGORIES = ["Humanitarian", "Education", "Healthcare", "Environment", "Disaster Relief", "Children & Youth", "Food Security", "Human Rights", "Other"];

export default function Submit() {
  const [form, setForm] = useState({
    name: "",
    website_url: "",
    donation_url: "",
    contact_email: "",
    description: "",
    country: "",
    category: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiBlurb, setAiBlurb] = useState("");
  const [aiAboutUs, setAiAboutUs] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.website_url || !form.donation_url || !form.contact_email || !form.description) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await base44.entities.Organization.create({ ...form, status: "pending", verified: false, click_count: 0 });
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle = {
    background: "rgba(8, 10, 18, 0.7)",
    border: "1px solid rgba(30, 50, 80, 0.5)",
    color: "#c8dff0",
    borderRadius: "12px",
    padding: "12px 14px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "rgba(160, 200, 230, 0.7)",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div
          className="max-w-md w-full rounded-2xl p-10 text-center"
          style={{ background: "rgba(12, 15, 26, 0.9)", border: "1px solid rgba(20, 184, 166, 0.2)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(20, 184, 166, 0.12)", border: "1px solid rgba(20, 184, 166, 0.25)" }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: "#14b8a6" }} />
          </div>
          <h2 className="text-xl font-bold mb-3" style={{ color: "#deeaf7" }}>
            Submission Received
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(130, 170, 205, 0.65)" }}>
            Thank you! Your submission is under review by the LBCHUB team. We'll verify the organization and publish it if it meets our standards.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", website_url: "", donation_url: "", contact_email: "", description: "", country: "", category: "" }); }}
            className="text-sm font-medium transition-colors"
            style={{ color: "#14b8a6" }}
          >
            Submit another organization →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{
            background: "rgba(20, 184, 166, 0.08)",
            border: "1px solid rgba(20, 184, 166, 0.18)",
            color: "#14b8a6",
          }}
        >
          <Shield className="w-3 h-3" />
          Review Process
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#e8f4ff" }}>
          Submit an Organization
        </h1>
        <p className="text-sm" style={{ color: "rgba(130, 170, 205, 0.65)" }}>
          All submissions are manually reviewed by our team before being listed. We verify legitimacy, official donation channels, and organizational transparency.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 sm:p-8 space-y-5"
        style={{ background: "rgba(12, 15, 26, 0.85)", border: "1px solid rgba(30, 50, 80, 0.4)" }}
      >
        {/* Name */}
        <div>
          <label style={labelStyle}>Organization Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Red Cross"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(20, 184, 166, 0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(30, 50, 80, 0.5)")}
          />
        </div>

        {/* Website & Donation URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle}>Official Website URL *</label>
            <input
              name="website_url"
              value={form.website_url}
              onChange={handleChange}
              placeholder="https://organization.org"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "rgba(20, 184, 166, 0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(30, 50, 80, 0.5)")}
            />
          </div>
          <div>
            <label style={labelStyle}>Official Donation Page URL *</label>
            <input
              name="donation_url"
              value={form.donation_url}
              onChange={handleChange}
              placeholder="https://organization.org/donate"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "rgba(20, 184, 166, 0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(30, 50, 80, 0.5)")}
            />
          </div>
        </div>

        {/* Email & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle}>Contact Email *</label>
            <input
              name="contact_email"
              type="email"
              value={form.contact_email}
              onChange={handleChange}
              placeholder="contact@organization.org"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "rgba(20, 184, 166, 0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(30, 50, 80, 0.5)")}
            />
          </div>
          <div>
            <label style={labelStyle}>Country / Region</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="e.g. Global, USA, Lebanon"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "rgba(20, 184, 166, 0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(30, 50, 80, 0.5)")}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label style={labelStyle}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(20, 184, 166, 0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(30, 50, 80, 0.5)")}
          >
            <option value="" style={{ background: "#0a0c16" }}>Select a category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} style={{ background: "#0a0c16" }}>{c}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle}>Short Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Briefly describe the organization's mission and work…"
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(20, 184, 166, 0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(30, 50, 80, 0.5)")}
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#f87171" }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Note */}
        <p className="text-xs" style={{ color: "rgba(100, 140, 180, 0.5)" }}>
          * All submissions are reviewed before approval. We do not list organizations that fail verification standards.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="teal-glow-btn w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
            color: "#f0fdfa",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit for Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}