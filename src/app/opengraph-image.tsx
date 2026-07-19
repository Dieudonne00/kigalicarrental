import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -1 }}>
          Kigali Car Rental
        </div>
        <div style={{ fontSize: 34, marginTop: 24, opacity: 0.9 }}>
          Premium Car Rental in Kigali, Rwanda
        </div>
        <div style={{ fontSize: 24, marginTop: 40, opacity: 0.75 }}>
          kigalicarrental.site
        </div>
      </div>
    ),
    { ...size }
  );
}
