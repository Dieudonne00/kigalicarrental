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
