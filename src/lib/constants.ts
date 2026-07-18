export const CONTACT = {
  PHONE: "+250787619387",
  EMAIL: "booking@carrentalinkigali.com",
  COMPANY_NAME: "Kigali Car Rental",
  ADDRESS: "KG 541 St, Kigali, Rwanda",
};

export const SITE = {
  URL: "https://www.kigalicarrental.site",
  NAME: "Kigali Car Rental",
};

const IMAGE_BASE = "https://carrentalinkigali.com/myimages";

export function getImageUrl(filename: string): string {
  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }
  return `${IMAGE_BASE}/${filename}`;
}

// Inline SVG fallback for car photos hosted on third-party CDNs (Cloudinary,
// BunnyCDN) that occasionally return 401/403 for a given asset - a data URI
// never 404s, unlike a static file in /public that could itself go missing.
export const CAR_IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23eff6ff'/%3E%3Cpath d='M110 190h180l-15-45a12 12 0 00-11-8H136a12 12 0 00-11 8z' fill='none' stroke='%232563eb' stroke-width='6' stroke-linejoin='round'/%3E%3Cline x1='95' y1='190' x2='305' y2='190' stroke='%232563eb' stroke-width='6' stroke-linecap='round'/%3E%3Ccircle cx='150' cy='195' r='14' fill='%23eff6ff' stroke='%232563eb' stroke-width='6'/%3E%3Ccircle cx='250' cy='195' r='14' fill='%23eff6ff' stroke='%232563eb' stroke-width='6'/%3E%3Ctext x='200' y='250' font-family='sans-serif' font-size='16' fill='%232563eb' text-anchor='middle'%3EPhoto unavailable%3C/text%3E%3C/svg%3E";
