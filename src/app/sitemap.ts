import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.kigalicarrental.site";
  const currentDate = new Date();

  return [
    // HOME & MAIN PAGES
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    
    // 🔥 RWANDA LOCATION PAGES (MOST IMPORTANT FOR SEO)
    {
      url: `${baseUrl}/car-rental-rwanda`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/car-rental-kigali`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kigali-airport-car-rental`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rent-car-kigali-airport`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    
    // CITY PAGES FOR RWANDA
    {
      url: `${baseUrl}/car-rental-musanze`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/car-rental-huye`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/car-rental-rubavu`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    
    // CAR TYPE PAGES
    {
      url: `${baseUrl}/cars`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/suv-rental-rwanda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/4x4-rental-rwanda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/luxury-car-rental-rwanda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/economy-car-rental-rwanda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/toyota-rental-rwanda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    
    // SERVICE PAGES
    {
      url: `${baseUrl}/self-drive-rwanda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/chauffeur-service-rwanda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wedding-car-rental-rwanda`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/business-car-rental-rwanda`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    
    // INFORMATION PAGES
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/driving-rwanda-guide`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/car-rental-tips-rwanda`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    
    // LEGAL PAGES
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    
    // BLOG/CONTENT PAGES (Add when you create them)
    /*
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog/best-time-visit-rwanda`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    */
  ];
}
