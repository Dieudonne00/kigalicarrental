"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "success",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setModalContent({
          type: "success",
          message: "Thank you for contacting us! We'll get back to you as soon as possible.",
        });
        setShowModal(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setModalContent({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
        setShowModal(true);
      }
    } catch {
      setModalContent({
        type: "error",
        message: "An error occurred. Please try again or contact us directly.",
      });
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://kigalicarhire.b-cdn.net/cars/2024-toyota-land-cruiser-164-6616f45021cc9.avif)" }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 py-32 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Have questions about our car rental services? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Contact Information</h2>
          <p className="text-gray-600 mb-8">
            Get in touch with us through any of the following channels.
          </p>

          {[
            ["Phone", "+250796077321"],
            ["Email", "kigalicarrentals2004@gmail.com"],
            ["Location", "Kigali, Rwanda"],
            ["Business Hours", "Available 24/7"],
          ].map(([title, value], i) => (
            <div key={i} className="flex gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[rgba(75,83,32,0.1)] text-[#4B5320] flex items-center justify-center">
                ●
              </div>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-gray-600">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "phone"].map((field) => (
              <input
                key={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                placeholder={field.toUpperCase()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4B5320] outline-none"
              />
            ))}
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your rental needs..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4B5320] outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#4B5320] hover:bg-[#3E451A] text-white font-bold py-4 rounded-lg transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#4B5320] to-[#3E451A] py-16 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Rent Your Perfect Car?</h2>
        <p className="mb-8">Browse our fleet and start your journey today.</p>
        <a
          href="/fleet"
          className="inline-block bg-white text-[#4B5320] px-8 py-4 rounded-lg font-bold"
        >
          Browse Our Fleet
        </a>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
            <h3 className={`text-2xl font-bold mb-4 ${modalContent.type === "success" ? "text-[#4B5320]" : "text-red-600"}`}>
              {modalContent.type === "success" ? "Success" : "Error"}
            </h3>
            <p className="mb-6">{modalContent.message}</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-[#4B5320] hover:bg-[#3E451A] text-white py-3 rounded-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
