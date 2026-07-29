import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A real photo from the fleet (the red RAV4 that also carries the site's
// first genuine review) instead of a plain text-on-gradient card - shows an
// actual car, not just a logo, when the site gets shared on social/SERP
// previews.
const HERO_CAR_IMAGE = "https://media.kigalicarhire.rw/cars/car_1fb2f415-f692-41d0-93d7-c69274eac921.webp";

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
          src={HERO_CAR_IMAGE}
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
