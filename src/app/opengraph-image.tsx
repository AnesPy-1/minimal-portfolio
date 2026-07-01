import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16), transparent 28%), linear-gradient(135deg, #111111 0%, #000000 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 24,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            AP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
              anespy.xyz
            </div>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.06em", marginTop: 10 }}>
              AnesPy Portfolio
            </div>
          </div>
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.4, maxWidth: 820, color: "rgba(255,255,255,0.82)" }}>
          A minimal, motion-driven portfolio for Anes, built with Next.js and Django.
        </div>
      </div>
    ),
    size,
  );
}
