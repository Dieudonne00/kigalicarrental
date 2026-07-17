export const BASE_IMAGE_URL = "https://carrentalinkigali.com/myimages";

export function imageUrl(path: string) {
  if (!path) return `${BASE_IMAGE_URL}/placeholder.jpg`;
  // Normalize leading slash
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_IMAGE_URL}/${clean}`;
}

export default imageUrl;
