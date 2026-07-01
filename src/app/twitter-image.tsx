import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111111 0%, #050505 100%)",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 960 }}>
          <div style={{ fontSize: 26, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.68)" }}>
            anespy.xyz
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1.05 }}>
            AnesPy Portfolio
          </div>
          <div style={{ fontSize: 32, lineHeight: 1.4, color: "rgba(255,255,255,0.82)" }}>
            Next.js, Django, and a clean motion-first visual system.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
