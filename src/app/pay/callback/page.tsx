
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// Inline SVG Icons
const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
);

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "failed" | "pending">("loading");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const trackingId = searchParams.get("OrderTrackingId");
    const merchantRef = searchParams.get("OrderMerchantReference");

    async function checkStatus() {
      if (!trackingId) {
        setStatus("failed");
        return;
      }

      try {
        const response = await fetch(`/api/payment/status?orderTrackingId=${trackingId}`);
        const data = await response.json();

        // PesaPal V3 statuses: INVALID, COMPLETED, FAILED, REVERSED
        if (data.status_code === 1 || data.payment_status_description === "Completed") {
          setStatus("success");
          setOrderDetails({ 
            trackingId, 
            merchantRef, 
            amount: data.amount,
            currency: data.currency,
            method: data.payment_method
          });
        } else if (data.status === "PENDING" || data.payment_status_description === "Pending") {
          setStatus("pending");
        } else {
          setStatus("failed");
          setOrderDetails({ message: data.message || "Payment was not successful" });
        }
      } catch (err) {
        console.error("Status check failed:", err);
        // Fallback or retry logic could go here
        setStatus("failed");
      }
    }

    checkStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white  border border-gray-100 p-8 md:p-12 text-center">
        {status === "loading" && (
          <div className="space-y-4">
            <Loader2 className="w-16 h-16 animate-spin text-[#1e3a8a] mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900">Verifying Payment...</h1>
            <p className="text-gray-500">Please wait while we confirm your transaction.</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-[#1e3a8a]" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">Payment Successful!</h1>
            <p className="text-gray-600">
              Thank you for chooses Kigali Car Rental. Your booking reference is <span className="font-bold text-gray-900">{orderDetails?.merchantRef}</span>.
            </p>
            <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Tracking ID:</span> <span className="font-medium text-blue-600">{orderDetails?.trackingId}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Status:</span> <span className="text-blue-600 font-bold uppercase text-[10px] bg-blue-50 px-2 py-1 rounded-full border border-blue-100">Completed</span></div>
            </div>
            <Link 
              href="/"
              className="block w-full bg-[#1e3a8a] hover:bg-[#172554] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100"
            >
              Return to Homepage
            </Link>
          </div>
        )}

        {status === "pending" && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-12 h-12 text-yellow-600 animate-spin" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">Payment Pending</h1>
            <p className="text-gray-600">Your payment is being processed. This can take a few minutes depending on your provider.</p>
            <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 text-sm border border-yellow-100">
                <div className="flex justify-between"><span className="text-gray-400">Merchant Ref:</span> <span className="font-medium">{orderDetails?.merchantRef}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Current Status:</span> <span className="text-yellow-600 font-bold uppercase text-[10px] bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">Processing</span></div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="block w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold transition-all"
            >
              Refresh Status
            </button>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">Payment Failed</h1>
            <p className="text-gray-600">We couldn't process your payment. Please try again or contact support.</p>
            <div className="flex flex-col gap-3">
                <Link 
                href="/pay"
                className="block w-full bg-gray-50 hover:bg-gray-80 text-black py-4 rounded-2xl border border-gray-200 font-bold transition-all "
                >
                Try Again
                </Link>
                <Link 
                href="/contact"
                className="text-sm font-bold text-gray-400 hover:text-blue-600"
                >
                Contact Support
                </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#1e3a8a] font-bold">Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
