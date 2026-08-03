
"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

// Premium Coinbase-style SVG Icons
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);
const CreditCard = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2" /><path d="M3 10h18" /></svg>
);
const Smartphone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="12" height="18" x="6" y="3" rx="2" /><path d="M12 18h.01" /></svg>
);
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
);
const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></svg>
);
const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /></svg>
);
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const Lock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
);


const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7l-7-7 7-7" /></svg>
);


function PaymentFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputCurrency, setInputCurrency] = useState<"USD" | "RWF">("USD");
  
  const [formData, setFormData] = useState({
    amount: "", 
    car: "Car Rental",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [exchangeRate, setExchangeRate] = useState(1450);
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        if (data?.rates?.RWF) {
          setExchangeRate(data.rates.RWF);
        }
      } catch (err) {
        console.error("Exchange rate fetch failed.");
      }
    }
    fetchRate();
  }, []);

  useEffect(() => {
    const amount = searchParams.get("amount") || "";
    const car = searchParams.get("car") || "Car Rental";
    const email = searchParams.get("email") || "";
    const first_name = searchParams.get("first_name") || "";
    const last_name = searchParams.get("last_name") || "";
    const phone = searchParams.get("phone") || "";

    setFormData({ amount, car, email, first_name, last_name, phone });
  }, [searchParams]);

  const getUsdAmount = () => {
    if (inputCurrency === "USD") return parseFloat(formData.amount || "0");
    return parseFloat(formData.amount || "0") / exchangeRate;
  };

  const getRwfAmount = () => {
    if (inputCurrency === "RWF") return parseFloat(formData.amount || "0");
    return parseFloat(formData.amount || "0") * exchangeRate;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        setError("Please enter a valid amount.");
        return;
      }
      setError("");
      setStep(2);
    } else if (step === 2) {
      if (!formData.first_name || !formData.email) {
        setError("Please provide your name and email.");
        return;
      }
      setError("");
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const usdAmount = getUsdAmount();

    try {
      const response = await fetch("/api/payment/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          amount: usdAmount.toFixed(2),
          method: paymentMethod 
        }),
      });

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        setError(data.detail || data.error || "Payment failed.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans selection:bg-blue-100 flex flex-col items-center justify-start md:justify-center p-4 pt-28 pb-12">
      
      {/* Box Container - Responsive widths */}
      <div className="w-full max-w-[440px] bg-white border border-gray-100 rounded-[32px] md:rounded-[4px] flex flex-col transition-all duration-500 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-gray-50 bg-white">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-90">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
          ) : (
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#1e3a8a]" />
            </div>
          )}
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
            {step === 1 ? "SET AMOUNT" : step === 2 ? "YOUR INFO" : "AUTHORIZE"}
          </span>
          <div className="w-9 h-9" />
        </div>

        <div className="p-6 md:p-10 flex-1">
          
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-bold leading-tight">{error}</p>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in transition-all duration-500 flex flex-col items-center text-center">
              
              <div className="flex bg-gray-50/80 p-1 rounded-2xl mb-8 border border-gray-100">
                <button 
                  onClick={() => {
                    const currentAmt = parseFloat(formData.amount);
                    if (inputCurrency === "RWF" && !isNaN(currentAmt)) {
                      setFormData({...formData, amount: (currentAmt / exchangeRate).toFixed(2).replace(/\.00$/, '')});
                    }
                    setInputCurrency("USD");
                  }}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${inputCurrency === "USD" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400"}`}
                >
                  USD
                </button>
                <button 
                  onClick={() => {
                    const currentAmt = parseFloat(formData.amount);
                    if (inputCurrency === "USD" && !isNaN(currentAmt)) {
                      setFormData({...formData, amount: Math.round(currentAmt * exchangeRate).toString()});
                    }
                    setInputCurrency("RWF");
                  }}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${inputCurrency === "RWF" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400"}`}
                >
                  RWF
                </button>
              </div>

              <div className="w-full mb-8 min-h-[140px] flex flex-col items-center justify-center">
                <div className="flex items-center justify-center max-w-full">
                  <span className="text-2xl md:text-3xl font-black text-gray-200 mr-2 select-none">{inputCurrency === "USD" ? "$" : "Frw"}</span>
                  <input 
                    autoFocus
                    ref={amountInputRef}
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0"
                    className="w-full max-w-[220px] text-6xl md:text-7xl font-black text-gray-900 bg-transparent outline-none placeholder:text-gray-100 text-center"
                    style={{ MozAppearance: 'textfield' }}
                  />
                </div>
                <div className="h-6 mt-4">
                    {formData.amount && (
                    <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                        ≈ {inputCurrency === "USD" ? getRwfAmount().toLocaleString() + " RWF" : "$" + getUsdAmount().toFixed(2) + " USD"}
                    </p>
                    )}
                </div>
              </div>

              <div className="w-full p-4 bg-gray-50/50 rounded-2xl border border-gray-100 mb-8 flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest pl-1">Payment To</span>
                <div className="flex items-center gap-2 pr-1">
                  <div className="w-6 h-6 bg-[#1e3a8a] rounded-full flex items-center justify-center font-bold text-[10px] text-white">K</div>
                  <span className="text-[12px] font-black text-gray-900">Kigali Car Rental</span>
                </div>
              </div>

              <button 
                onClick={handleNextStep}
                disabled={!formData.amount || parseFloat(formData.amount) <= 0}
                className="w-full bg-[#172554] hover:bg-black text-white py-5 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_-12px_rgba(1,149,0,0.3)] disabled:opacity-20 active:scale-95"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in transition-all duration-500 space-y-4">
              <div className="space-y-3">
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    className="w-full pl-14 pr-4 py-4.5 bg-gray-50 focus:bg-white border-2 border-transparent focus:border-gray-100 rounded-2xl outline-none font-bold text-gray-900 transition-all text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    className="w-full pl-14 pr-4 py-4.5 bg-gray-50 focus:bg-white border-2 border-transparent focus:border-gray-100 rounded-2xl outline-none font-bold text-gray-900 transition-all text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-14 pr-4 py-4.5 bg-gray-50 focus:bg-white border-2 border-transparent focus:border-gray-100 rounded-2xl outline-none font-bold text-gray-900 transition-all text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                  <input 
                    type="tel" 
                    placeholder="Mobile Number (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-14 pr-4 py-4.5 bg-gray-50 focus:bg-white border-2 border-transparent focus:border-gray-100 rounded-2xl outline-none font-bold text-gray-900 transition-all text-[15px]"
                  />
                </div>
              </div>

              <button 
                onClick={handleNextStep}
                className="w-full bg-[#172554] hover:bg-black text-white py-5 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_-12px_rgba(1,149,0,0.3)] active:scale-95"
              >
                Proceed
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in transition-all duration-500 space-y-6">
              <div className="space-y-2">
                <button 
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4.5 rounded-2xl border-2 flex items-center justify-between transition-all ${paymentMethod === "card" ? "border-[#1e3a8a] bg-blue-50/10 shadow-sm" : "border-gray-50 hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${paymentMethod === "card" ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-400"}`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-black text-gray-900 leading-none mb-1">Cards Payment</span>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pl-0.5">Global Gateway</span>
                    </div>
                  </div>
                  {paymentMethod === "card" && <CheckCircle2 className="w-5 h-5 text-[#1e3a8a]" />}
                </button>

                <button 
                  onClick={() => setPaymentMethod("mobile")}
                  className={`w-full p-4.5 rounded-2xl border-2 flex items-center justify-between transition-all ${paymentMethod === "mobile" ? "border-[#1e3a8a] bg-blue-50/10 shadow-sm" : "border-gray-100 hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${paymentMethod === "mobile" ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-400"}`}>
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-black text-gray-900 leading-none mb-1">Mobile Money</span>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pl-0.5">MoMo & Airtel</span>
                    </div>
                  </div>
                  {paymentMethod === "mobile" && <CheckCircle2 className="w-5 h-5 text-[#1e3a8a]" />}
                </button>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <div className="flex justify-between items-center mb-6 px-1">
                  <span className="text-gray-400 font-bold text-sm tracking-tight">Total Fee</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-gray-900">${getUsdAmount().toFixed(2)}</span>
                    <p className="text-[10px] font-black text-gray-300 mt-0.5 uppercase tracking-widest leading-none">Net USD Basis</p>
                  </div>
                </div>
                
                <button 
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full bg-[#172554] hover:bg-black text-white py-6 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_-12px_rgba(1,149,0,0.3)] flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Authorize Now"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Improved Modal Footer - Using vector SVG for compliance to avoid 404s */}
        <div className="px-8 py-5 bg-gray-50/40 flex items-center justify-center gap-6 md:gap-8 opacity-30 grayscale border-t border-gray-50 mt-auto">
           <div className="flex items-center gap-1.5 leading-none">
             <Lock className="w-4 h-4 text-gray-900" />
             <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.15em] pt-0.5">SECURE</span>
           </div>
           
           <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
           
           <div className="flex items-center gap-1.5 leading-none">
             <svg className="w-4 h-4 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
             <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.15em] pt-0.5">COMPLIANT</span>
           </div>
        </div>
      </div>

      <p className="mt-12 text-[10px] font-bold text-gray-300 uppercase tracking-[0.25em] flex items-center gap-2">
         PESAPAL SECURED <div className="w-1 h-1 bg-gray-200 rounded-full" /> V3.0
      </p>
    </div>
  );
}
  

export default function PayPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="w-10 h-10 animate-spin text-[#1e3a8a]" /></div>}>
            <PaymentFlow />
        </Suspense>
    );
}
