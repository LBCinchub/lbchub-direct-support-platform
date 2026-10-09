export const LBC_CHARITY_LOGO_URL = "/brand/lbc-charity-logo-v1.png";

export default function LbcCharityLogo({ size = 32, className = "", containerClassName = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden shrink-0 rounded-lg ${containerClassName}`}
      style={{ width: size, height: size, background: "#000000" }}
      role="img"
      aria-label="LBC Charity"
    >
      <img
        src={LBC_CHARITY_LOGO_URL}
        alt="LBC Charity"
        className="w-full h-full object-contain"
        draggable="false"
      />
    </span>
  );
}