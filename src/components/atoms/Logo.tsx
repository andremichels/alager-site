// Atom: Logo — official ALAGER wordmark (transparent variants)
// Generated from public/logo.webp (white background removed via sharp).
import Image from "next/image";

interface LogoProps {
  height?: number;
  variant?: "dark" | "white";
}

const ASPECT = 363 / 115; // wordmark aspect ratio

export function Logo({ height = 30, variant = "dark" }: LogoProps) {
  const width = Math.round(height * ASPECT);
  const src = variant === "white" ? "/logo-white.png" : "/logo-dark.png";

  return <Image src={src} alt="ALAGER" width={width} height={height} />;
}
