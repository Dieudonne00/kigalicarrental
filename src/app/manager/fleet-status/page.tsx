"use client";

import { useState, useEffect, useCallback } from "react";
import ManagerSidebar from "@/components/ManagerSidebar";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";

type HiringStatus = "available" | "onhire" | "upcoming" | "overdue";

interface ActiveBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupDate: string;
  returnDate: string;
  source: string;
  notes: string | null;
  status: string;
  totalCost: number;
}

interface OverdueBooking {
  id: string;
  carId: string;
  customerName: string;
  customerPhone: string;
  returnDate: string;
}

interface CarWithStatus {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  images: string[];
  category: string;
  licensePlate: string | null;
  insuranceStart: string | null;
  insuranceEnd: string | null;
  lastOilChange: string | null;
  nextOilChange: string | null;
  available: boolean;
  activeBooking: ActiveBooking | null;
  overdueBooking: OverdueBooking | null;
  hiringStatus: HiringStatus;
}

const fmt = (d: string | Date | null) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const toInputDate = (d: string | null) => {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
};

const daysUntil = (d: string | null) => {
  if (!d) return null;
  return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);
};

const STATUS_ORDER: Record<HiringStatus, number> = { overdue: 0, onhire: 1, upcoming: 2, available: 3 };

function InsuranceBadge({ insuranceEnd }: { insuranceEnd: string | null }) {
  if (!insuranceEnd) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">Not Set</span>;
  const d = daysUntil(insuranceEnd)!;
  if (d < 0) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">Expired {Math.abs(d)}d ago</span>;
  if (d <= 7) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">Expires in {d}d!</span>;
  if (d <= 30) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">Expires in {d}d</span>;
  return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">Valid ({d}d left)</span>;
}

function OilBadge({ nextOilChange }: { nextOilChange: string | null }) {
  if (!nextOilChange) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">Not Set</span>;
  const d = daysUntil(nextOilChange)!;
  if (d < 0) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">Overdue {Math.abs(d)}d!</span>;
  if (d <= 3) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">Due in {d}d!</span>;
  if (d <= 7) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">Due in {d}d</span>;
  return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">OK ({d}d)</span>;
}

function HiringBadge({ status, returnDate }: { status: HiringStatus; returnDate?: string | null }) {
  const d = returnDate ? daysUntil(returnDate) : null;
  if (status === "overdue") return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">⚠ Overdue!</span>;
  if (status === "onhire") {
    const label = d === 0 ? "Returning Today!" : d === 1 ? "Returns Tomorrow" : d !== null ? `Returns in ${d}d` : "On Hire";
    const cls = d !== null && d <= 1 ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700";
    return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cls}`}>{label}</span>;
  }
  if (status === "upcoming") return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">Upcoming</span>;
  return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Available</span>;
}

const sourceLabel = (s: string) => ({ phone: "📞 Phone", whatsapp: "💬 WhatsApp", walkin: "🚶 Walk-in", online: "🌐 Online" }[s] || s);

const emptyBookingForm = { customerName: "", customerPhone: "", customerEmail: "", pickupDate: "", returnDate: "", pickupLocation: "Kigali", returnLocation: "", totalCost: "", source: "phone", notes: "" };

export default function FleetStatusPage() {
  const [cars, setCars] = useState<CarWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "onhire" | "available" | "alerts">("all");
  const [sendingAlerts, setSendingAlerts] = useState(false);
  const [sendingReport, setSendingReport] = useState(false);

  // Edit service modal
  const [editCar, setEditCar] = useState<CarWithStatus | null>(null);
  const [serviceForm, setServiceForm] = useState({ licensePlate: "", insuranceStart: "", insuranceEnd: "", lastOilChange: "", nextOilChange: "" });
  const [savingService, setSavingService] = useState(false);

  // Manual booking modal — works for both per-car and global
  const [bookingCar, setBookingCar] = useState<CarWithStatus | null>(null);
  const [globalBookingOpen, setGlobalBookingOpen] = useState(false);
  const [globalCarId, setGlobalCarId] = useState("");
  const [bookingForm, setBookingForm] = useState(emptyBookingForm);
  const [savingBooking, setSavingBooking] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/manager/fleet-status");
      const data = await res.json();
      setCars(data.cars || []);
    } catch {
      setErrorMsg("Failed to load fleet data");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const sorted = [...cars].sort((a, b) => STATUS_ORDER[a.hiringStatus] - STATUS_ORDER[b.hiringStatus]);

  const filtered = sorted.filter((c) => {
    if (filter === "onhire") return c.hiringStatus === "onhire" || c.hiringStatus === "overdue" || c.hiringStatus === "upcoming";
    if (filter === "available") return c.hiringStatus === "available";
    if (filter === "alerts") {
      const iD = daysUntil(c.insuranceEnd);
      const oD = daysUntil(c.nextOilChange);
      return (iD !== null && iD <= 30) || (oD !== null && oD <= 7) || c.hiringStatus === "overdue";
    }
    return true;
  });

  const alertCount = cars.filter(c => {
    const iD = daysUntil(c.insuranceEnd); const oD = daysUntil(c.nextOilChange);
    return (iD !== null && iD <= 30) || (oD !== null && oD <= 7) || c.hiringStatus === "overdue";
  }).length;
  const onHireCount = cars.filter(c => c.hiringStatus === "onhire" || c.hiringStatus === "overdue" || c.hiringStatus === "upcoming").length;
  const availableCount = cars.filter(c => c.hiringStatus === "available").length;

  const openEditService = (car: CarWithStatus) => {
    setEditCar(car);
    setServiceForm({ licensePlate: car.licensePlate || "", insuranceStart: toInputDate(car.insuranceStart), insuranceEnd: toInputDate(car.insuranceEnd), lastOilChange: toInputDate(car.lastOilChange), nextOilChange: toInputDate(car.nextOilChange) });
  };

  const saveService = async () => {
    if (!editCar) return;
    setSavingService(true);
    try {
      const res = await fetch(`/api/manager/cars/${editCar.id}/service`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(serviceForm) });
      if (!res.ok) throw new Error("Failed");
      setEditCar(null);
      setSuccessMsg("Service info saved");
      setShowSuccess(true);
      fetchData();
    } catch { setErrorMsg("Failed to save service info"); setShowError(true); }
    finally { setSavingService(false); }
  };

  const openPerCarBooking = (car: CarWithStatus) => {
    setBookingCar(car);
    setGlobalBookingOpen(false);
    setBookingForm(emptyBookingForm);
  };

  const openGlobalBooking = () => {
    setBookingCar(null);
    setGlobalBookingOpen(true);
    setGlobalCarId(cars[0]?.id || "");
    setBookingForm(emptyBookingForm);
  };

  const saveBooking = async () => {
    const carId = bookingCar?.id || globalCarId;
    if (!carId) { setErrorMsg("Please select a car"); setShowError(true); return; }
    if (!bookingForm.customerName || !bookingForm.customerPhone || !bookingForm.pickupDate || !bookingForm.returnDate) {
      setErrorMsg("Name, phone, pickup and return dates are required");
      setShowError(true);
      return;
    }
    setSavingBooking(true);
    try {
      const res = await fetch("/api/manager/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ carId, ...bookingForm }) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed"); }
      setBookingCar(null);
      setGlobalBookingOpen(false);
      setSuccessMsg(`Booking confirmed for ${bookingForm.customerName}`);
      setShowSuccess(true);
      fetchData();
    } catch (e) { setErrorMsg(e instanceof Error ? e.message : "Failed"); setShowError(true); }
    finally { setSavingBooking(false); }
  };

  const sendAlerts = async () => {
    setSendingAlerts(true);
    try {
      const res = await fetch("/api/manager/service-alerts", { method: "POST" });
      const d = await res.json();
      setSuccessMsg(d.message || "Alerts sent");
      setShowSuccess(true);
    } catch { setErrorMsg("Failed to send alerts"); setShowError(true); }
    finally { setSendingAlerts(false); }
  };

  const sendReport = async () => {
    setSendingReport(true);
    try {
      const res = await fetch("/api/manager/daily-report?manual=1");
      const d = await res.json();
      setSuccessMsg(d.message || "Daily report sent to your email");
      setShowSuccess(true);
    } catch { setErrorMsg("Failed to send report"); setShowError(true); }
    finally { setSendingReport(false); }
  };

  const BookingModal = ({ carId, carLabel }: { carId?: string; carLabel?: string }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Manual Booking</h2>
            <p className="text-sm text-gray-500 mt-0.5">{carLabel || "Select a car below"}</p>
          </div>
          <button onClick={() => { setBookingCar(null); setGlobalBookingOpen(false); }} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          {/* Car selector for global booking */}
          {!carId && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Select Car <span className="text-red-500">*</span></label>
              <select value={globalCarId} onChange={e => setGlobalCarId(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm">
                <option value="">— choose a car —</option>
                {cars.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.brand} {c.name}{c.licensePlate ? ` (${c.licensePlate})` : ""} — {c.hiringStatus === "available" ? "✓ Available" : c.hiringStatus === "onhire" ? "On Hire" : c.hiringStatus === "upcoming" ? "Upcoming" : "⚠ Overdue"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Source */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Booking Source <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 gap-2">
              {[["phone", "📞 Phone Call"], ["whatsapp", "💬 WhatsApp"], ["walkin", "🚶 Walk-in"], ["online", "🌐 Online"]] .map(([v, l]) => (
                <button key={v} onClick={() => setBookingForm(p => ({ ...p, source: v }))}
                  className={`py-2 rounded-lg text-sm font-bold border-2 transition-all ${bookingForm.source === v ? "border-[#01B000] bg-[#01B000]/10 text-[#01B000]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Customer Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Full name" value={bookingForm.customerName}
                onChange={e => setBookingForm(p => ({ ...p, customerName: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
              <input type="tel" placeholder="+250 7..." value={bookingForm.customerPhone}
                onChange={e => setBookingForm(p => ({ ...p, customerPhone: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email (optional)</label>
            <input type="email" placeholder="customer@email.com" value={bookingForm.customerEmail}
              onChange={e => setBookingForm(p => ({ ...p, customerEmail: e.target.value }))}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Pickup Date <span className="text-red-500">*</span></label>
              <input type="date" value={bookingForm.pickupDate}
                onChange={e => setBookingForm(p => ({ ...p, pickupDate: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Return Date <span className="text-red-500">*</span></label>
              <input type="date" value={bookingForm.returnDate}
                onChange={e => setBookingForm(p => ({ ...p, returnDate: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Pickup Location</label>
              <input type="text" value={bookingForm.pickupLocation}
                onChange={e => setBookingForm(p => ({ ...p, pickupLocation: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Return Location</label>
              <input type="text" placeholder="Same as pickup" value={bookingForm.returnLocation}
                onChange={e => setBookingForm(p => ({ ...p, returnLocation: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Total Cost (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
              <input type="number" min="0" step="1" placeholder="0" value={bookingForm.totalCost}
                onChange={e => setBookingForm(p => ({ ...p, totalCost: e.target.value }))}
                className="w-full pl-7 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Notes</label>
            <textarea rows={2} placeholder="Any notes about this booking, special requests..." value={bookingForm.notes}
              onChange={e => setBookingForm(p => ({ ...p, notes: e.target.value }))}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm resize-none" />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-2xl">
          <button onClick={() => { setBookingCar(null); setGlobalBookingOpen(false); }}
            className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={saveBooking} disabled={savingBooking}
            className="flex-1 px-4 py-2.5 bg-[#01B000] text-white rounded-lg font-bold hover:bg-[#019500] disabled:opacity-60 flex items-center justify-center gap-2">
            {savingBooking && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 overflow-y-auto lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">Fleet Status</h1>
              <p className="text-gray-500 mt-1 text-sm">Live view of all cars — who has each one, service dates, insurance</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={sendReport} disabled={sendingReport}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-all disabled:opacity-60 text-sm">
                {sendingReport ? <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-gray-600" /> : "📊"}
                Send Daily Report
              </button>
              <button onClick={sendAlerts} disabled={sendingAlerts}
                className="flex items-center gap-2 px-4 py-2 border-2 border-orange-200 text-orange-700 rounded-lg font-bold hover:bg-orange-50 transition-all disabled:opacity-60 text-sm">
                {sendingAlerts ? <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-orange-600" /> : "⚠️"}
                Service Alerts
              </button>
              <button onClick={openGlobalBooking}
                className="flex items-center gap-2 px-5 py-2 bg-[#01B000] text-white rounded-lg font-bold hover:bg-[#019500] transition-all text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Manual Booking
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Total Cars", val: cars.length, color: "border-gray-200", text: "text-gray-900" },
              { label: "Active / Upcoming", val: onHireCount, color: "border-blue-200", text: "text-blue-600" },
              { label: "Available", val: availableCount, color: "border-green-200", text: "text-green-600" },
              { label: "Alerts", val: alertCount, color: alertCount > 0 ? "border-red-300" : "border-gray-200", text: alertCount > 0 ? "text-red-600" : "text-gray-400" },
            ].map(({ label, val, color, text }) => (
              <div key={label} className={`bg-white rounded-xl border-2 ${color} p-4`}>
                <div className={`text-3xl font-bold ${text}`}>{val}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 mb-5 bg-white p-1.5 rounded-xl border-2 border-gray-200 w-fit">
            {(["all", "onhire", "available", "alerts"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === f ? "bg-[#01B000] text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}>
                {f === "all" ? `All (${cars.length})` : f === "onhire" ? `On Hire (${onHireCount})` : f === "available" ? `Available (${availableCount})` : `Alerts${alertCount > 0 ? ` (${alertCount})` : ""}`}
              </button>
            ))}
          </div>

          {/* Car List */}
          {loading ? (
            <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000]" /></div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">No cars match this filter</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((car) => {
                const booking = car.activeBooking;
                const overdue = car.overdueBooking;
                const iD = daysUntil(car.insuranceEnd);
                const oD = daysUntil(car.nextOilChange);
                const hasAlert = (iD !== null && iD <= 30) || (oD !== null && oD <= 7) || car.hiringStatus === "overdue";
                const borderColor = car.hiringStatus === "overdue" ? "border-red-300" : car.hiringStatus === "onhire" ? "border-blue-200" : hasAlert ? "border-yellow-300" : "border-gray-200";

                return (
                  <div key={car.id} className={`bg-white rounded-xl border-2 ${borderColor} overflow-hidden transition-all hover:shadow-md`}>
                    <div className="flex flex-col md:flex-row">
                      {/* Car image */}
                      <div className="md:w-28 flex-shrink-0 bg-gray-100">
                        {car.images[0]
                          ? <img src={car.images[0]} alt={car.name} className="w-full h-20 md:h-full object-cover" />
                          : <div className="w-full h-20 md:h-full flex items-center justify-center"><svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                        }
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-4">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <div>
                            <span className="font-bold text-gray-900">{car.brand} {car.name}</span>
                            {car.licensePlate && <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-mono text-xs font-bold">{car.licensePlate}</span>}
                            <span className="ml-2 text-xs text-gray-400">{car.year} · {car.category}</span>
                          </div>
                          <div className="ml-auto">
                            <HiringBadge status={car.hiringStatus} returnDate={booking?.returnDate || overdue?.returnDate} />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-3">
                          {/* Current booking */}
                          <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Current Booking</div>
                            {booking || overdue ? (
                              <div className="text-sm space-y-0.5">
                                <div className="font-bold text-gray-900">{booking?.customerName || overdue?.customerName}</div>
                                <a href={`tel:${booking?.customerPhone || overdue?.customerPhone}`} className="text-[#01B000] font-medium text-xs hover:underline">{booking?.customerPhone || overdue?.customerPhone}</a>
                                {booking && <>
                                  <div className="text-xs text-gray-500">Pickup: <strong>{fmt(booking.pickupDate)}</strong></div>
                                  <div className={`text-xs font-medium ${car.hiringStatus === "overdue" ? "text-red-600" : "text-gray-700"}`}>
                                    Return: <strong>{fmt(booking.returnDate)}</strong>{car.hiringStatus === "overdue" ? " ⚠️" : ""}
                                  </div>
                                </>}
                                {overdue && !booking && <div className="text-xs text-red-600 font-bold">Was due: {fmt(overdue.returnDate)}</div>}
                                {booking?.source && <div className="mt-1 text-xs text-gray-500">{sourceLabel(booking.source)}</div>}
                                {booking?.notes && <div className="mt-1 text-xs text-gray-400 italic">"{booking.notes}"</div>}
                              </div>
                            ) : <div className="text-xs text-gray-400 italic">No active booking</div>}
                          </div>

                          {/* Insurance */}
                          <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">🛡️ Insurance</div>
                            <InsuranceBadge insuranceEnd={car.insuranceEnd} />
                            {car.insuranceEnd && (
                              <div className="mt-1 text-xs text-gray-400 space-y-0.5">
                                {car.insuranceStart && <div>Start: {fmt(car.insuranceStart)}</div>}
                                <div>Expiry: {fmt(car.insuranceEnd)}</div>
                              </div>
                            )}
                          </div>

                          {/* Oil change */}
                          <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">🔧 Oil Change</div>
                            <OilBadge nextOilChange={car.nextOilChange} />
                            {car.nextOilChange && (
                              <div className="mt-1 text-xs text-gray-400 space-y-0.5">
                                {car.lastOilChange && <div>Last: {fmt(car.lastOilChange)}</div>}
                                <div>Next: {fmt(car.nextOilChange)}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col gap-2 p-3 border-t md:border-t-0 md:border-l border-gray-100 justify-end md:justify-center md:min-w-[130px]">
                        <button onClick={() => openEditService(car)}
                          className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          Edit Service
                        </button>
                        <button onClick={() => openPerCarBooking(car)}
                          className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-white bg-[#01B000] hover:bg-[#019500] rounded-lg transition-all">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                          Add Booking
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Service Modal */}
      {editCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit Service Info</h2>
                <p className="text-sm text-gray-500 mt-0.5">{editCar.brand} {editCar.name}</p>
              </div>
              <button onClick={() => setEditCar(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">License / Number Plate</label>
                <input type="text" placeholder="e.g. RAA 001A" value={serviceForm.licensePlate}
                  onChange={e => setServiceForm(p => ({ ...p, licensePlate: e.target.value.toUpperCase() }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none font-mono tracking-widest text-lg" />
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">🛡️ Insurance</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Start Date</label>
                    <input type="date" value={serviceForm.insuranceStart}
                      onChange={e => setServiceForm(p => ({ ...p, insuranceStart: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Expiry Date</label>
                    <input type="date" value={serviceForm.insuranceEnd}
                      onChange={e => setServiceForm(p => ({ ...p, insuranceEnd: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">🔧 Oil Change</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Last Oil Change</label>
                    <input type="date" value={serviceForm.lastOilChange}
                      onChange={e => setServiceForm(p => ({ ...p, lastOilChange: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Next Due Date</label>
                    <input type="date" value={serviceForm.nextOilChange}
                      onChange={e => setServiceForm(p => ({ ...p, nextOilChange: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setEditCar(null)} className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50">Cancel</button>
              <button onClick={saveService} disabled={savingService}
                className="flex-1 px-4 py-2.5 bg-[#01B000] text-white rounded-lg font-bold hover:bg-[#019500] disabled:opacity-60 flex items-center justify-center gap-2">
                {savingService && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modals */}
      {bookingCar && <BookingModal carId={bookingCar.id} carLabel={`${bookingCar.brand} ${bookingCar.name}${bookingCar.licensePlate ? ` (${bookingCar.licensePlate})` : ""}`} />}
      {globalBookingOpen && <BookingModal />}

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Success" message={successMsg} />
      <ErrorModal isOpen={showError} onClose={() => setShowError(false)} title="Error" message={errorMsg} />
    </div>
  );
}
