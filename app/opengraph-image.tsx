import { ImageResponse } from "next/og";

export const alt = "TradeK — Supply Chain Finance e Procurement Internacional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 76px",
        color: "#f3f5f2",
        background: "linear-gradient(125deg,#090b0a 0%,#121914 62%,#263321 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 }}>
        <span style={{ width: 22, height: 22, display: "flex", background: "#c3f929", transform: "rotate(45deg)" }} />
        TRADEK
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ color: "#c3f929", fontSize: 20, letterSpacing: 3 }}>CHINA · BRASIL · TRADE OPERATIONS</div>
        <div style={{ maxWidth: 920, fontSize: 76, lineHeight: 1.02, fontWeight: 600, letterSpacing: -4 }}>
          Importe da Ásia. Preserve seu caixa.
        </div>
        <div style={{ color: "#a8b1aa", fontSize: 28 }}>
          Supply Chain Finance, procurement e gestão da operação.
        </div>
      </div>
    </div>,
    size,
  );
}
