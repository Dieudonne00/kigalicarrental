import { ImageResponse } from "next/og";

export const alt = "Kigali Car Rental — real cars available now in Kigali, Rwanda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CAR_IMAGE = "https://media.kigalicarhire.rw/cars/car_4c54f821-ab5c-4922-af5b-f9c668468133.jpg";

export default function OGImage() {
  return new ImageResponse(
    (
      <img
        src={CAR_IMAGE}
        width={1200}
        height={630}
        style={{
          width: "1200px",
          height: "630px",
          objectFit: "cover",
        }}
      />
    ),
    { width: 1200, height: 630 }
  );
}
