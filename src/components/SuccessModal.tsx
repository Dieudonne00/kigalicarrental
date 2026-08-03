"use client";

import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  payUrl?: string;
  payText?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  payUrl,
  payText = "Pay Online Now",
}: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with glass effect */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-gray-200 shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#1e3a8a]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3 font-[family-name:var(--font-plus-jakarta)]">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {payUrl && (
            <button
              onClick={() => {
                window.location.href = payUrl;
              }}
              className="w-full py-4 bg-[#1e3a8a] hover:bg-[#172554] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span>💳</span> {payText}
            </button>
          )}

          <button
            onClick={onClose}
            className={`w-full py-3 ${payUrl ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-[#1e3a8a] hover:bg-[#172554] text-white'} font-bold rounded-lg transition-all`}
          >
            {payUrl ? "Close" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
