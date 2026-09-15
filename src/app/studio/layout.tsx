// Alager Site — Studio layout: injects the Sanity Dashboard bridge script.
// Required so Sanity Dashboard / Canvas can interact with this embedded Studio.
const bridgeScript = "https://core.sanity-cdn.com/bridge.js";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script src={bridgeScript} async type="module" />
      {children}
    </>
  );
}
