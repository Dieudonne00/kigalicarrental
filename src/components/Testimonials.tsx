const reviews = [
  {
    name: "Be Dynamic",
    location: "Melbourne, Australia",
    rating: 5,
    date: "1 year ago",
    text: "I had a 48-hour layover in Kigali and squeezed every second out of it thanks to Obed. He picked me up from Lemigo Hotel and we spent the entire day exploring Kigali. I was lucky to get both a driver and a historian in one. We visited the Genocide Memorial on its 30th anniversary, watched a soccer game, drove up Mount Kigali. I have already recommended him to seven people traveling to Kigali. Safe, punctual, and a lovely driver with deep knowledge of Rwanda's history.",
    badge: "Verified Google Review",
  },
  {
    name: "Donald Swen",
    location: "6 reviews on Google",
    rating: 5,
    date: "11 months ago",
    text: "Owner is a nice guy. Car was super clean. Arrived on time. Very flexible. Highly recommend. Will definitely use his service next time.",
    badge: "Verified Google Review",
  },
  {
    name: "Geoffrey Mumford",
    location: "Local Guide, 15 reviews",
    rating: 5,
    date: "10 months ago",
    text: "Obed was an excellent driver and picked me up right on time. Friendly and knowledgeable. I highly recommend him for all your transit needs!",
    badge: "Google Local Guide",
  },
  {
    name: "Paul-Marie PETROCH",
    location: "3 reviews on Google",
    rating: 5,
    date: "6 months ago",
    text: "Very easy to reach, the car was available quickly. The car was well maintained and clean. For return it was also fast to give the car back. I recommend this company.",
    badge: "Verified Google Review",
  },
  {
    name: "Laura Waters",
    location: "Local Guide, 82 reviews",
    rating: 5,
    date: "11 months ago",
    text: "Brilliant service! Great driver, knowledgeable guide, recommended.",
    badge: "Google Local Guide",
  },
  {
    name: "Emmanuel Manirarora",
    location: "Local Guide, 4 reviews",
    rating: 5,
    date: "10 months ago",
    text: "Kigali Car Rental is a reliable car rental service in Kigali. I have used their services multiple times, and they have consistently met my needs and expectations.",
    badge: "Repeat Customer",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block bg-yellow-400/20 text-yellow-700 text-sm font-bold px-4 py-2 rounded-full mb-4">
            4.9 out of 5 on Google
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            38 verified Google reviews from tourists, business travellers, and locals who trust Kigali Car Rental.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-gray-900">4.9</span>
            <span className="text-gray-500 text-sm">(38 reviews)</span>
            <a
              href="https://share.google/bagc78zxCxtwqa1ZS"
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
                    <p className="text-gray-400 text-xs">{r.location}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <Stars count={r.rating} />
              <p className="text-gray-600 text-sm mt-3 leading-relaxed flex-1">{r.text}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <span className="text-[10px] text-gray-400">{r.date}</span>
                <span className="text-[10px] bg-blue-50 text-[#1e3a8a] font-semibold px-2 py-0.5 rounded-full">{r.badge}</span>
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
              href="https://share.google/bagc78zxCxtwqa1ZS"
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
