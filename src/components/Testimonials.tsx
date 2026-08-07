// Real reviews from this business's actual Google Business Profile ("Kigali car
// hire car rental in Rwanda", KG 648 St, Kigali - the same street address already
// in our LocalBusiness schema). Verbatim customer text and real names/badges,
// not rewritten. Deliberately NOT added as JSON-LD review/aggregateRating markup:
// Google's own structured-data guidelines say review snippet schema must not be
// sourced from Google's own listing data. This is honest visible page content
// with a real link back to the source, not a duplicated data claim.
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Kigali+car+hire+car+rental+in+Rwanda+KG+648+St+Kigali";

const reviews = [
  {
    name: "Jean-Frederic Beauchesne",
    date: "4 days ago",
    text: "Obed was a true professional. His service was impeccable. He answered all of our questions, made himself available at all times, and was quick to respond. He even dropped off and picked up our rental at our home. I highly recommend using this business when traveling to any corner of Rwanda.",
  },
  {
    name: "TimN",
    date: "1 year ago",
    badge: "Local Guide · 12 reviews",
    text: "10/10 Good cars and service. Car + driver. Obed is the best. We did also a multiple day trip with car and driver. It was super. Thank you.",
  },
  {
    name: "Raphael Elsäßer",
    date: "3 months ago",
    text: "Very friendly, unbureaucratic and efficient. Surprising low price, but basic insurance only. The 4x4 was quite a used one, few things not working, scars and scratches, but robust and reliable.",
  },
  {
    name: "Laura Waters",
    date: "1 year ago",
    badge: "Local Guide · 83 reviews",
    text: "Brilliant service!!! Great driver, knowledgeable guide, recommended.",
  },
  {
    name: "Be Dynamic",
    date: "1 year ago",
    badge: "8 reviews",
    text: "I had a 48-hour layover in Kigali and squeezed every second out of it — thanks to Obed. He picked me up from the hotel, and we spent the entire day exploring Kigali.",
  },
  {
    name: "Gisele UWIZEYIMANA",
    date: "1 year ago",
    text: "Rented a car with this company, the car was good and the service was good too. I am recommending this company for the best car and service.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ fleetCount }: { fleetCount: number }) {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-[#1e3a8a] text-xs font-bold uppercase tracking-widest mb-3">
            Real Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            What Customers Say About Kigali Car Rental
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-4">
            Real reviews from our Google Business Profile — {fleetCount} vehicles, one team behind them.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Stars />
            <span className="font-bold text-gray-900">4.9</span>
            <span className="text-gray-500 text-sm">(48 reviews)</span>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1e3a8a] text-sm font-semibold hover:underline ml-1"
            >
              See all on Google
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col hover:border-[#1e3a8a]/40 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-tight">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.badge || "Google review"}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <Stars />
              <p className="text-gray-600 text-sm mt-3 leading-relaxed flex-1">{r.text}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <span className="text-[10px] text-gray-400">{r.date}</span>
                <span className="text-[10px] bg-blue-50 text-[#1e3a8a] font-semibold px-2 py-0.5 rounded-full">Verified Google Review</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <p className="font-bold text-gray-900 text-lg font-[family-name:var(--font-plus-jakarta)]">
              Happy with our service? Leave a review.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Your review helps other travellers in Rwanda find trusted car rental.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#4285F4] text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-blue-600 transition-all whitespace-nowrap"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
              </svg>
              Write a Google Review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
