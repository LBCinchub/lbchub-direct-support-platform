import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Sparkles, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

/**
 * Reusable AI helper panel.
 * Props:
 *  - orgName: string
 *  - description: string (raw input)
 *  - onApplyBlurb: (text) => void
 *  - onApplyAboutUs: (text) => void
 */
export default function AiDescriptionTools({ orgName, description, onApplyBlurb, onApplyAboutUs }) {
  const [blurb, setBlurb] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [loadingBlurb, setLoadingBlurb] = useState(false);
  const [loadingAbout, setLoadingAbout] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copiedBlurb, setCopiedBlurb] = useState(false);
  const [copiedAbout, setCopiedAbout] = useState(false);

  const canRun = description && description.trim().length > 10;

  const generateBlurb = async () => {
    setLoadingBlurb(true);
    setExpanded(true);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a content writer for a nonprofit directory called LBCHUB. 
Given the following description of an organization called "${orgName || "the organization"}", write a concise, engaging card blurb of no more than 120 characters. 
Be factual, warm, and impactful. No quotes, no ellipsis.

Description:
${description}

Respond with ONLY the blurb text, nothing else.`,
    });
    setBlurb(res);
    setLoadingBlurb(false);
  };

  const generateAboutUs = async () => {
    setLoadingAbout(true);
    setExpanded(true);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a content writer for a nonprofit directory called LBCHUB.
Given the following description of an organization called "${orgName || "the organization"}", write a detailed, professional "About Us" section of 3–4 short paragraphs.
Cover: mission, who they help, how they operate, and why someone should donate. Keep a neutral, trustworthy, and compassionate tone. No political messaging.

Description:
${description}

Respond with ONLY the About Us text, no headings or labels.`,
    });
    setAboutUs(res);
    setLoadingAbout(false);
  };

  const copy = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!canRun) return null;

  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{ border: "1px solid rgba(20, 184, 166, 0.18)", background: "rgba(20, 184, 166, 0.04)" }}
    >
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" style={{ color: "#14b8a6" }} />
          <span className="text-xs font-semibold" style={{ color: "#14b8a6" }}>
            AI Content Tools
          </span>
          <span className="text-xs" style={{ color: "rgba(100, 150, 180, 0.55)" }}>
            — generate card blurb & About Us
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5" style={{ color: "rgba(20, 184, 166, 0.6)" }} />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" style={{ color: "rgba(20, 184, 166, 0.6)" }} />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Card Blurb */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(160, 200, 230, 0.6)" }}>
                Card Blurb (≤120 chars)
              </span>
              <button
                type="button"
                onClick={generateBlurb}
                disabled={loadingBlurb}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium transition-all"
                style={{
                  background: "rgba(20, 184, 166, 0.12)",
                  border: "1px solid rgba(20, 184, 166, 0.25)",
                  color: "#14b8a6",
                  opacity: loadingBlurb ? 0.6 : 1,
                }}
              >
                {loadingBlurb ? (
                  <div className="w-3 h-3 border border-teal-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                {loadingBlurb ? "Generating…" : "Generate"}
              </button>
            </div>

            {blurb && (
              <div
                className="rounded-lg p-3 text-sm relative"
                style={{ background: "rgba(8, 10, 18, 0.6)", border: "1px solid rgba(30, 50, 80, 0.4)", color: "#c8dff0" }}
              >
                {blurb}
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => copy(blurb, setCopiedBlurb)}
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                    style={{ color: "rgba(120, 160, 190, 0.6)" }}
                  >
                    {copiedBlurb ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedBlurb ? "Copied" : "Copy"}
                  </button>
                  {onApplyBlurb && (
                    <button
                      type="button"
                      onClick={() => onApplyBlurb(blurb)}
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded font-medium"
                      style={{ color: "#14b8a6" }}
                    >
                      ✓ Apply
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* About Us */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(160, 200, 230, 0.6)" }}>
                About Us Section
              </span>
              <button
                type="button"
                onClick={generateAboutUs}
                disabled={loadingAbout}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium transition-all"
                style={{
                  background: "rgba(96, 165, 250, 0.1)",
                  border: "1px solid rgba(96, 165, 250, 0.22)",
                  color: "#60a5fa",
                  opacity: loadingAbout ? 0.6 : 1,
                }}
              >
                {loadingAbout ? (
                  <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                {loadingAbout ? "Generating…" : "Generate"}
              </button>
            </div>

            {aboutUs && (
              <div
                className="rounded-lg p-3 text-sm relative max-h-52 overflow-y-auto"
                style={{ background: "rgba(8, 10, 18, 0.6)", border: "1px solid rgba(30, 50, 80, 0.4)", color: "#c8dff0", lineHeight: 1.7 }}
              >
                {aboutUs}
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => copy(aboutUs, setCopiedAbout)}
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                    style={{ color: "rgba(120, 160, 190, 0.6)" }}
                  >
                    {copiedAbout ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedAbout ? "Copied" : "Copy"}
                  </button>
                  {onApplyAboutUs && (
                    <button
                      type="button"
                      onClick={() => onApplyAboutUs(aboutUs)}
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded font-medium"
                      style={{ color: "#60a5fa" }}
                    >
                      ✓ Apply
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}