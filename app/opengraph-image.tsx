import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time — no portrait photo exists to composite, so this
 * is a clean typographic card in the same warm/ink/bronze palette as the
 * site itself (docs/design-system.md), not a generic placeholder.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#F7F5F0",
          color: "#201E1A",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8A6A3F",
            marginBottom: 24,
          }}
        >
          {profile.currentTitle} · {profile.currentCompany}
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 600, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#6C675E",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {profile.headline}
        </div>
      </div>
    ),
    { ...size }
  );
}
