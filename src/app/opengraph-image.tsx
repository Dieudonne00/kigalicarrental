import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A real photo from the fleet (the red RAV4 that also carries the site's
// first genuine review) instead of a plain text-on-gradient card - shows an
// actual car, not just a logo, when the site gets shared on social/SERP
// previews. Pre-converted to a static PNG in public/ (Satori, the renderer
// behind ImageResponse, has poor/broken support for WebP - the original
// fleet photo format - and silently fails to render it instead of erroring
// clearly), so no runtime fetch or format conversion is needed here at all.
const heroImageDataUri = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public/og-hero-rav4.png"))
  .toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={heroImageDataUri}
          width={1200}
          height={630}
          style={{ objectFit: "cover", position: "absolute", top: 0, left: 0 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            background: "linear-gradient(0deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.35) 55%, rgba(15,23,42,0) 100%)",
            padding: "56px",
            color: "white",
          }}
        >
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -1 }}>
            Kigali Car Rental
          </div>
          <div style={{ fontSize: 32, marginTop: 16, opacity: 0.92 }}>
            Premium Car Rental in Kigali, Rwanda
          </div>
          <div style={{ fontSize: 22, marginTop: 28, opacity: 0.75 }}>
            kigalicarrental.site
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
