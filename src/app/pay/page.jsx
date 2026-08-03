'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// ─── PesaPal requires ALL these fields for auto-fill ───
// firstName, lastName, email, phone, address, city, zipCode
// country is hardcoded to RW

export default function PayPage() {
  const searchParams = useSearchParams();

  // Pre-fill from URL: /pay?car=Toyota+RAV4&rate=50&image=...
  const preCarName = searchParams.get('car')   || '';
  const preRate    = parseFloat(searchParams.get('rate') || '0');
  const preImage   = searchParams.get('image') || '';

  const [form, setForm] = useState({
    firstName:      '',
    lastName:       '',
    email:          '',
    phone:          '+250 ',
    address:        '',
    city:           'Kigali',
    zipCode:        '',
    pickupDate:     '',
    returnDate:     '',
    pickupLocation: 'Our Parking – KN 4 Ave',
    driverOption:   'Self Drive',
    notes:          '',
  });

  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState('');
  const [days,     setDays]     = useState(0);
  const [total,    setTotal]    = useState(0);

  // Today's date for min picker
  const today = new Date().toISOString().split('T')[0];

  // Recalculate days & total whenever dates or driver changes
  useEffect(() => {
    if (!form.pickupDate || !form.returnDate) return;
    const d = Math.ceil(
      (new Date(form.returnDate) - new Date(form.pickupDate)) / (1000 * 60 * 60 * 24)
    );
    if (d <= 0) return;
    const rate = preRate + (form.driverOption === 'With Driver (+$20/day)' ? 20 : 0);
    setDays(d);
    setTotal(rate * d);
  }, [form.pickupDate, form.returnDate, form.driverOption, preRate]);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  // Auto-advance return date when pickup is chosen
  const onPickupChange = (val) => {
    set('pickupDate', val);
    if (!form.returnDate) {
      const next = new Date(val);
      next.setDate(next.getDate() + 1);
      set('returnDate', next.toISOString().split('T')[0]);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.firstName)  e.firstName  = 'Required';
    if (!form.lastName)   e.lastName   = 'Required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone || form.phone.length < 8) e.phone = 'Valid phone required';
    if (!form.address)    e.address    = 'Required — PesaPal needs this';
    if (!form.city)       e.city       = 'Required';
    if (!form.zipCode)    e.zipCode    = 'Required — use 00100 if unsure';
    if (!form.pickupDate) e.pickupDate = 'Required';
    if (!form.returnDate) e.returnDate = 'Required';
    if (form.pickupDate && form.returnDate && new Date(form.returnDate) <= new Date(form.pickupDate)) {
      e.returnDate = 'Must be after pickup date';
    }
    return e;
  };

  const handleSubmit = async () => {
    setApiError('');
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    try {
      const res  = await fetch('/api/pesapal/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount:      total,
          car:         preCarName || 'Car Rental',
        }),
      });
      const data = await res.json();
      if (data.error) { setApiError(data.error); setLoading(false); return; }
      if (data.redirectUrl) window.location.href = data.redirectUrl;
    } catch (err) {
      setApiError('Network error: ' + err.message);
      setLoading(false);
    }
  };

  // ─── Reusable input component ───
  const Field = ({ id, label, required, hint, error, children }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
        textTransform: 'uppercase', color: '#94a3b8', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && !error && (
        <p style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{hint}</p>
      )}
      {error && (
        <p style={{ fontSize: 11, color: '#f87171', marginTop: 4 }}>⚠ {error}</p>
      )}
    </div>
  );

  const inputStyle = (err) => ({
    width: '100%', padding: '11px 14px',
    background: err ? 'rgba(248,113,113,0.08)' : 'rgba(255,255,255,0.06)',
    border: `1px solid ${err ? '#f87171' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 8, color: '#f1f5f9', fontSize: 14,
    outline: 'none', transition: 'border 0.2s',
    fontFamily: 'inherit',
  });

  const selectStyle = (err) => ({
    ...inputStyle(err),
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: 36,
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: '#f1f5f9',
    }}>

      {/* ── Top nav ── */}
      <nav style={{
        padding: '16px 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>🚗</div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>Kigali Car Hire</span>
        </a>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <span style={{ color: '#3b82f6', fontWeight: 700 }}>① Details</span>
          <span style={{ color: '#334155' }}>──</span>
          <span style={{ color: '#475569' }}>② Payment</span>
          <span style={{ color: '#334155' }}>──</span>
          <span style={{ color: '#475569' }}>③ Confirmed</span>
        </div>
      </nav>

      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '40px 20px',
        display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start',
      }}>

        {/* ══════════ LEFT: Car Summary Card ══════════ */}
        <div style={{
          flex: '1 1 300px', maxWidth: 340,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, overflow: 'hidden',
          position: 'sticky', top: 90,
        }}>
          {/* Car image */}
          <div style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)' }}>
            {preImage ? (
              <img src={preImage} alt={preCarName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '100%', fontSize: 72 }}>🚗</div>
            )}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)',
            }} />
            <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                {preCarName || 'Selected Vehicle'}
              </h2>
              {preRate > 0 && (
                <p style={{ fontSize: 14, color: '#93c5fd', margin: '4px 0 0' }}>
                  ${preRate}/day
                </p>
              )}
            </div>
          </div>

          {/* Car features */}
          <div style={{ padding: '18px 20px' }}>
            {[
              ['📍', 'Pickup', 'KN 4 Ave, Kigali'],
              ['🛡️', 'Insurance', 'Fully Included'],
              ['🕐', 'Support', '24/7 Available'],
              ['✅', 'No Hidden', 'Fees'],
            ].map(([icon, label, val]) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontSize: 13,
              }}>
                <span style={{ color: '#94a3b8' }}>{icon} {label}</span>
                <strong style={{ color: '#e2e8f0' }}>{val}</strong>
              </div>
            ))}

            {/* Price breakdown */}
            {days > 0 && (
              <div style={{
                marginTop: 16, padding: 16,
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(29,78,216,0.15))',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: 10,
              }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>BOOKING SUMMARY</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: '#cbd5e1' }}>{days} day{days > 1 ? 's' : ''} × ${preRate}/day</span>
                  <span style={{ color: '#e2e8f0' }}>${preRate * days}</span>
                </div>
                {form.driverOption === 'With Driver (+$20/day)' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: '#cbd5e1' }}>Driver × {days} days</span>
                    <span style={{ color: '#e2e8f0' }}>${20 * days}</span>
                  </div>
                )}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 8, paddingTop: 8,
                }}>
                  <span style={{ fontWeight: 700, color: '#f1f5f9' }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: 22, color: '#60a5fa' }}>${total}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══════════ RIGHT: Booking Form ══════════ */}
        <div style={{ flex: '1 1 420px' }}>

          {/* Error banner */}
          {apiError && (
            <div style={{
              background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: 10, padding: '14px 18px', marginBottom: 24,
              color: '#fca5a5', fontSize: 14,
            }}>
              ⚠️ {apiError}
            </div>
          )}

          {/* ── Section: Personal Info ── */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 28, marginBottom: 20,
          }}>
            <h3 style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#3b82f6', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>👤</span> Personal Details
              <span style={{ fontSize: 11, color: '#475569', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                — used to pre-fill the payment form
              </span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="First Name" required error={errors.firstName}>
                <input style={inputStyle(errors.firstName)} value={form.firstName}
                  onChange={e => set('firstName', e.target.value)}
                  placeholder="John" autoComplete="given-name" />
              </Field>
              <Field label="Last Name" required error={errors.lastName}>
                <input style={inputStyle(errors.lastName)} value={form.lastName}
                  onChange={e => set('lastName', e.target.value)}
                  placeholder="Doe" autoComplete="family-name" />
              </Field>
            </div>

            <Field label="Email Address" required
              hint="Your booking confirmation & PesaPal receipt will be sent here"
              error={errors.email}>
              <input style={inputStyle(errors.email)} value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="john@example.com" type="email" autoComplete="email" />
            </Field>

            <Field label="Phone Number" required
              hint="Include country code — PesaPal needs this"
              error={errors.phone}>
              <input style={inputStyle(errors.phone)} value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="+250 788 000 000" type="tel" autoComplete="tel" />
            </Field>
          </div>

          {/* ── Section: Billing Address (PesaPal requirement) ── */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 28, marginBottom: 20,
          }}>
            <h3 style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#3b82f6', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>🏠</span> Billing Address
            </h3>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>
              Must match the address registered at your bank — required by PesaPal
            </p>

            <Field label="Street / Postal Address" required
              hint="e.g. KG 11 Ave, P.O Box 1234"
              error={errors.address}>
              <input style={inputStyle(errors.address)} value={form.address}
                onChange={e => set('address', e.target.value)}
                placeholder="KG 11 Ave or P.O Box 1234" autoComplete="street-address" />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="City" required error={errors.city}>
                <input style={inputStyle(errors.city)} value={form.city}
                  onChange={e => set('city', e.target.value)}
                  placeholder="Kigali" autoComplete="address-level2" />
              </Field>
              <Field label="Postal / ZIP Code" required
                hint="Use 00100 if unsure"
                error={errors.zipCode}>
                <input style={inputStyle(errors.zipCode)} value={form.zipCode}
                  onChange={e => set('zipCode', e.target.value)}
                  placeholder="00100" autoComplete="postal-code" />
              </Field>
            </div>

            <Field label="Country">
              <div style={{
                ...inputStyle(false),
                display: 'flex', alignItems: 'center', gap: 10,
                opacity: 0.7, cursor: 'not-allowed',
              }}>
                <span>🇷🇼</span> Rwanda (RW)
              </div>
            </Field>
          </div>

          {/* ── Section: Rental Details ── */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 28, marginBottom: 20,
          }}>
            <h3 style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#3b82f6', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>📅</span> Rental Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Pickup Date" required error={errors.pickupDate}>
                <input style={inputStyle(errors.pickupDate)} value={form.pickupDate}
                  onChange={e => onPickupChange(e.target.value)}
                  type="date" min={today} />
              </Field>
              <Field label="Return Date" required error={errors.returnDate}>
                <input style={inputStyle(errors.returnDate)} value={form.returnDate}
                  onChange={e => set('returnDate', e.target.value)}
                  type="date" min={form.pickupDate || today} />
              </Field>
            </div>

            <Field label="Pickup Location">
              <select style={selectStyle(false)} value={form.pickupLocation}
                onChange={e => set('pickupLocation', e.target.value)}>
                <option>Our Parking – KN 4 Ave</option>
                <option>Kigali International Airport</option>
                <option>Kigali City Center</option>
                <option>Free Delivery to Your Location</option>
              </select>
            </Field>

            <Field label="Driver Option">
              <select style={selectStyle(false)} value={form.driverOption}
                onChange={e => set('driverOption', e.target.value)}>
                <option>Self Drive</option>
                <option>With Driver (+$20/day)</option>
              </select>
            </Field>

            <Field label="Special Requests">
              <input style={inputStyle(false)} value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder="Child seat, early pickup, specific drop-off..." />
            </Field>
          </div>

          {/* ── Submit Button ── */}
          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', padding: '16px 24px',
            background: loading
              ? 'rgba(59,130,246,0.4)'
              : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            border: 'none', borderRadius: 12, color: '#fff',
            fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 20px rgba(59,130,246,0.4)',
            fontFamily: 'inherit',
          }}>
            {loading ? (
              <>
                <span style={{
                  width: 18, height: 18, border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid #fff', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite', display: 'inline-block',
                }} />
                Redirecting to PesaPal...
              </>
            ) : (
              <>
                🔒 Proceed to Payment
                {total > 0 && <span style={{
                  background: 'rgba(255,255,255,0.2)', borderRadius: 6,
                  padding: '2px 10px', fontSize: 14,
                }}>${total}</span>}
              </>
            )}
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#475569', marginTop: 14 }}>
            🔒 Secured by PesaPal · PCI DSS Compliant · Visa & Mastercard Accepted
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #475569; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
        select option { background: #1e293b; color: #f1f5f9; }
        * { box-sizing: border-box; }
        @media (max-width: 680px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
