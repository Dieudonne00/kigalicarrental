import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "kigalicarhire1990@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

interface BookingEmailData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  carName: string;
  carBrand: string;
  carModel: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  totalCost: number;
  specialRequests?: string;
}

interface StatusUpdateEmailData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  carName: string;
  carBrand: string;
  carModel: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  totalCost: number;
  newStatus: string;
}

export async function sendBookingNotificationToManager(
  bookingData: BookingEmailData
) {
  try {
    const mailOptions = {
      from: "kigalicarhire1990@gmail.com",
      to: "dieudufinnovation@gmail.com",
      subject: `New Booking Request - ${bookingData.carName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #01B000;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border: 2px solid #e0e0e0;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 25px;
              padding-bottom: 20px;
              border-bottom: 1px solid #ddd;
            }
            .section:last-child {
              border-bottom: none;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #01B000;
              margin-bottom: 10px;
            }
            .info-row {
              display: flex;
              margin-bottom: 8px;
            }
            .info-label {
              font-weight: bold;
              min-width: 140px;
              color: #555;
            }
            .info-value {
              color: #333;
            }
            .price {
              font-size: 24px;
              font-weight: bold;
              color: #01B000;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🚗 New Booking Request</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Customer Information</div>
                <div class="info-row">
                  <div class="info-label">Name:</div>
                  <div class="info-value">${bookingData.customerName}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Email:</div>
                  <div class="info-value">${bookingData.customerEmail}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Phone:</div>
                  <div class="info-value">${bookingData.customerPhone}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Vehicle Details</div>
                <div class="info-row">
                  <div class="info-label">Vehicle:</div>
                  <div class="info-value">${bookingData.carName}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Make & Model:</div>
                  <div class="info-value">${bookingData.carBrand} ${bookingData.carModel}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Booking Details</div>
                <div class="info-row">
                  <div class="info-label">Booking ID:</div>
                  <div class="info-value">${bookingData.bookingId}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Pickup Date:</div>
                  <div class="info-value">${new Date(
                    bookingData.pickupDate
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Return Date:</div>
                  <div class="info-value">${new Date(
                    bookingData.returnDate
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</div>
                </div>
              </div>

              ${
                bookingData.specialRequests
                  ? `
                <div class="section">
                  <div class="section-title">Special Requests</div>
                  <div class="info-value">${bookingData.specialRequests}</div>
                </div>
              `
                  : ""
              }

              <div class="section">
                <div class="section-title">Total Cost</div>
                <div class="price">$${bookingData.totalCost.toFixed(2)}</div>
              </div>

              <div class="footer">
                <p>Please log in to the manager dashboard to review and confirm this booking.</p>
                <p style="margin-top: 10px; font-weight: bold; color: #01B000;">
                  Contact: 0788892976
                </p>
                <p style="margin-top: 10px; color: #999; font-size: 12px;">
                  This is an automated notification from Kigali Car Hire booking system.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Booking notification email sent to manager successfully");
  } catch (error) {
    console.error("Error sending booking notification email:", error);
    // Don't throw error - we don't want to fail the booking if email fails
  }
}

// Send contact form notification to manager
export async function sendContactFormNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const mailOptions = {
      from: "kigalicarhire1990@gmail.com",
      to: "kigalicarhire1990@gmail.com",
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #01B000;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 15px;
            }
            .field-label {
              font-weight: bold;
              color: #555;
            }
            .field-value {
              margin-top: 5px;
              padding: 10px;
              background-color: white;
              border-radius: 4px;
              border: 1px solid #ddd;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #888;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">From:</div>
                <div class="field-value">${data.name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              ${data.phone ? `
                <div class="field">
                  <div class="field-label">Phone:</div>
                  <div class="field-value"><a href="tel:${data.phone}">${data.phone}</a></div>
                </div>
              ` : ''}
              <div class="field">
                <div class="field-label">Message:</div>
                <div class="field-value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from Kigali Car Hire contact form</p>
              <p>Login to your admin panel to manage this message</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Contact notification email sent to manager successfully");
  } catch (error) {
    console.error("Error sending contact notification email:", error);
    // Don't throw error - we don't want to fail the submission if email fails
  }
}

// Send booking request notification to manager
export async function sendBookingRequestNotificationToManager(data: {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocation: string;
  dropoffLocation?: string;
  carType?: string;
  transmission?: string;
  seats?: string;
  budget?: string;
  purpose?: string;
  additionalRequirements?: string;
}) {
  try {
    const mailOptions = {
      from: "kigalicarhire1990@gmail.com",
      to: "dieudufinnovation@gmail.com",
      subject: `New Booking Request from ${data.fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #01B000;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #01B000;
              margin-bottom: 10px;
              border-bottom: 2px solid #01B000;
              padding-bottom: 5px;
            }
            .field {
              margin-bottom: 10px;
            }
            .field-label {
              font-weight: bold;
              color: #555;
            }
            .field-value {
              margin-top: 3px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #888;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚗 New Booking Request</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Customer Information</div>
                <div class="field">
                  <div class="field-label">Name:</div>
                  <div class="field-value">${data.fullName}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email:</div>
                  <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Phone:</div>
                  <div class="field-value"><a href="tel:${data.phone}">${data.phone}</a></div>
                </div>
                ${data.whatsapp ? `
                  <div class="field">
                    <div class="field-label">WhatsApp:</div>
                    <div class="field-value">${data.whatsapp}</div>
                  </div>
                ` : ''}
              </div>

              <div class="section">
                <div class="section-title">Trip Details</div>
                <div class="field">
                  <div class="field-label">Pickup:</div>
                  <div class="field-value">${data.pickupDate} at ${data.pickupTime}</div>
                </div>
                <div class="field">
                  <div class="field-label">Return:</div>
                  <div class="field-value">${data.returnDate} at ${data.returnTime}</div>
                </div>
                <div class="field">
                  <div class="field-label">Pickup Location:</div>
                  <div class="field-value">${data.pickupLocation}</div>
                </div>
                ${data.dropoffLocation ? `
                  <div class="field">
                    <div class="field-label">Drop-off Location:</div>
                    <div class="field-value">${data.dropoffLocation}</div>
                  </div>
                ` : ''}
              </div>

              <div class="section">
                <div class="section-title">Preferences</div>
                ${data.carType ? `
                  <div class="field">
                    <div class="field-label">Car Type:</div>
                    <div class="field-value">${data.carType}</div>
                  </div>
                ` : ''}
                ${data.transmission ? `
                  <div class="field">
                    <div class="field-label">Transmission:</div>
                    <div class="field-value">${data.transmission}</div>
                  </div>
                ` : ''}
                ${data.seats ? `
                  <div class="field">
                    <div class="field-label">Seats:</div>
                    <div class="field-value">${data.seats}</div>
                  </div>
                ` : ''}
                ${data.budget ? `
                  <div class="field">
                    <div class="field-label">Budget:</div>
                    <div class="field-value">${data.budget} USD/day</div>
                  </div>
                ` : ''}
                ${data.purpose ? `
                  <div class="field">
                    <div class="field-label">Purpose:</div>
                    <div class="field-value">${data.purpose}</div>
                  </div>
                ` : ''}
                ${data.additionalRequirements ? `
                  <div class="field">
                    <div class="field-label">Additional Requirements:</div>
                    <div class="field-value">${data.additionalRequirements.replace(/\n/g, '<br>')}</div>
                  </div>
                ` : ''}
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from Kigali Car Hire booking request form</p>
              <p>Login to your admin panel to manage this booking request</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Booking request notification email sent to manager successfully");
  } catch (error) {
    console.error("Error sending booking request notification email:", error);
    // Don't throw error - we don't want to fail the submission if email fails
  }
}

export async function sendDailyReportEmail(data: {
  date: Date;
  totalCars: number;
  availableCars: number;
  onHireCount: number;
  overdueCount: number;
  onHireBookings: Array<{ carName: string; licensePlate: string | null; customerName: string; customerPhone: string; pickupDate: Date; returnDate: Date; source: string; totalCost: number }>;
  returningToday: Array<{ carName: string; licensePlate: string | null; customerName: string; customerPhone: string; returnDate: Date }>;
  overdueReturns: Array<{ carName: string; licensePlate: string | null; customerName: string; customerPhone: string; returnDate: Date }>;
  upcomingBookings: Array<{ carName: string; customerName: string; customerPhone: string; pickupDate: Date; returnDate: Date; source: string }>;
  newBookingsToday: Array<{ carName: string; customerName: string; customerPhone: string; source: string; totalCost: number; pickupDate: Date; returnDate: Date }>;
  insuranceExpiring: Array<{ carName: string; licensePlate: string | null; insuranceEnd: Date }>;
  oilChangeDue: Array<{ carName: string; licensePlate: string | null; nextOilChange: Date; lastOilChange: Date | null }>;
}) {
  try {
    const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
    const fmtShort = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const daysUntil = (d: Date) => Math.ceil((d.getTime() - Date.now()) / 86400000);
    const daysAgo = (d: Date) => Math.ceil((Date.now() - d.getTime()) / 86400000);
    const plate = (p: string | null) => p ? ` <span style="background:#f3f4f6;padding:1px 6px;border-radius:4px;font-size:11px;font-weight:bold;">${p}</span>` : "";
    const srcBadge = (s: string) => {
      const map: Record<string, [string, string]> = { phone: ["#ff6b35", "📞 Phone"], whatsapp: ["#25d366", "💬 WhatsApp"], walkin: ["#7c3aed", "🚶 Walk-in"], online: ["#2563eb", "🌐 Online"] };
      const [color, label] = map[s] || ["#6b7280", s];
      return `<span style="background:${color};color:white;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:bold;">${label}</span>`;
    };

    const totalAlerts = data.overdueReturns.length + data.insuranceExpiring.length + data.oilChangeDue.length + data.returningToday.length;
    const hasUrgent = data.overdueReturns.length > 0 || data.insuranceExpiring.filter(c => daysUntil(c.insuranceEnd) <= 7).length > 0 || data.oilChangeDue.filter(c => daysUntil(c.nextOilChange) <= 3).length > 0;

    const row = (cells: string[], bg = "white") =>
      `<tr style="background:${bg};">${cells.map(c => `<td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${c}</td>`).join("")}</tr>`;

    const section = (icon: string, title: string, color: string, content: string) =>
      `<div style="margin-bottom:28px;">
        <h2 style="margin:0 0 10px;font-size:15px;color:${color};display:flex;align-items:center;gap:6px;border-bottom:2px solid ${color}22;padding-bottom:8px;">${icon} ${title}</h2>
        ${content}
      </div>`;

    const emptyMsg = (msg: string) => `<p style="color:#9ca3af;font-style:italic;font-size:13px;margin:4px 0;">${msg}</p>`;

    // On hire rows
    const onHireRows = data.onHireBookings.length === 0 ? emptyMsg("No cars currently on hire") :
      `<table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
        <thead><tr style="background:#eff6ff;"><th style="padding:8px 12px;text-align:left;font-size:12px;color:#1d4ed8;">Car</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#1d4ed8;">Customer</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#1d4ed8;">Pickup → Return</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#1d4ed8;">Days Left</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#1d4ed8;">Source</th></tr></thead>
        <tbody>${data.onHireBookings.map((b, i) => {
          const d = daysUntil(b.returnDate);
          const dayColor = d <= 1 ? "#dc2626" : d <= 3 ? "#d97706" : "#16a34a";
          return row([
            `<strong>${b.carName}</strong>${plate(b.licensePlate)}`,
            `<strong>${b.customerName}</strong><br/><a href="tel:${b.customerPhone}" style="color:#01B000;font-size:12px;">${b.customerPhone}</a>`,
            `${fmtShort(b.pickupDate)} → <strong>${fmtShort(b.returnDate)}</strong>`,
            `<span style="color:${dayColor};font-weight:bold;">${d <= 0 ? "TODAY" : d === 1 ? "Tomorrow" : `${d} days`}</span>`,
            srcBadge(b.source),
          ], i % 2 === 0 ? "white" : "#fafafa");
        }).join("")}</tbody>
      </table>`;

    // Returning today
    const returningRows = data.returningToday.length === 0 ? emptyMsg("No cars returning today") :
      `<div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;">
        ${data.returningToday.map(b => `<div style="margin-bottom:6px;font-size:13px;">🚗 <strong>${b.carName}</strong>${plate(b.licensePlate)} — ${b.customerName} <a href="tel:${b.customerPhone}" style="color:#01B000;">${b.customerPhone}</a></div>`).join("")}
      </div>`;

    // Overdue
    const overdueRows = data.overdueReturns.length === 0 ? emptyMsg("No overdue returns") :
      `<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:8px;padding:12px 16px;">
        ${data.overdueReturns.map(b => {
          const d = daysAgo(b.returnDate);
          return `<div style="margin-bottom:8px;font-size:13px;">🚨 <strong>${b.carName}</strong>${plate(b.licensePlate)} — Was due <strong style="color:#dc2626;">${fmtDate(b.returnDate)}</strong> (${d} day${d !== 1 ? "s" : ""} ago)<br/>&nbsp;&nbsp;&nbsp;Customer: ${b.customerName} <a href="tel:${b.customerPhone}" style="color:#dc2626;">${b.customerPhone}</a></div>`;
        }).join("")}
      </div>`;

    // Service alerts
    const insRows = data.insuranceExpiring.map(c => {
      const d = daysUntil(c.insuranceEnd);
      const color = d < 0 ? "#dc2626" : d <= 7 ? "#dc2626" : "#d97706";
      return `<li style="margin-bottom:5px;font-size:13px;">🛡️ <strong>${c.carName}</strong>${plate(c.licensePlate)} — <span style="color:${color};font-weight:bold;">${d < 0 ? `EXPIRED ${Math.abs(d)}d ago` : `${d} days left`}</span> (${fmtDate(c.insuranceEnd)})</li>`;
    }).join("");
    const oilRows = data.oilChangeDue.map(c => {
      const d = daysUntil(c.nextOilChange);
      const color = d < 0 ? "#dc2626" : d <= 3 ? "#dc2626" : "#d97706";
      return `<li style="margin-bottom:5px;font-size:13px;">🔧 <strong>${c.carName}</strong>${plate(c.licensePlate)} — <span style="color:${color};font-weight:bold;">${d < 0 ? `OVERDUE ${Math.abs(d)}d` : `Due in ${d} days`}</span> (${fmtDate(c.nextOilChange)})${c.lastOilChange ? ` · Last: ${fmtShort(c.lastOilChange)}` : ""}</li>`;
    }).join("");
    const serviceContent = (insRows || oilRows)
      ? `<ul style="margin:0;padding-left:0;list-style:none;">${insRows}${oilRows}</ul>`
      : emptyMsg("All cars are up to date — no service due");

    // New bookings today
    const newBookingRows = data.newBookingsToday.length === 0 ? emptyMsg("No new bookings added today") :
      `<table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
        <thead><tr style="background:#f0fdf4;"><th style="padding:8px 12px;text-align:left;font-size:12px;color:#16a34a;">Car</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#16a34a;">Customer</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#16a34a;">Dates</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#16a34a;">Cost</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#16a34a;">Source</th></tr></thead>
        <tbody>${data.newBookingsToday.map((b, i) => row([
          `<strong>${b.carName}</strong>`,
          `${b.customerName}<br/><span style="color:#6b7280;font-size:12px;">${b.customerPhone}</span>`,
          `${fmtShort(b.pickupDate)} → ${fmtShort(b.returnDate)}`,
          `<strong style="color:#01B000;">$${b.totalCost.toFixed(0)}</strong>`,
          srcBadge(b.source),
        ], i % 2 === 0 ? "white" : "#fafafa")).join("")}</tbody>
      </table>`;

    // Upcoming
    const upcomingContent = data.upcomingBookings.length === 0 ? emptyMsg("No bookings in the next 7 days") :
      `<div style="background:white;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;">
        ${data.upcomingBookings.map(b => {
          const d = daysUntil(b.pickupDate);
          return `<div style="margin-bottom:8px;font-size:13px;padding-bottom:8px;border-bottom:1px solid #f3f4f6;">
            📅 <strong style="color:#7c3aed;">${d === 0 ? "Today" : d === 1 ? "Tomorrow" : `In ${d} days`}</strong> (${fmtDate(b.pickupDate)}) —
            <strong>${b.carName}</strong> → ${b.customerName} <a href="tel:${b.customerPhone}" style="color:#01B000;">${b.customerPhone}</a>
            · ${srcBadge(b.source)} · Returns ${fmtShort(b.returnDate)}
          </div>`;
        }).join("")}
      </div>`;

    const html = `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;color:#111827;margin:0;padding:0;background:#f9fafb;">
<div style="max-width:680px;margin:0 auto;padding:20px;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#01B000,#019500);color:white;padding:28px 32px;border-radius:12px 12px 0 0;">
    <div style="font-size:13px;opacity:0.85;margin-bottom:6px;">DAILY FLEET REPORT</div>
    <h1 style="margin:0;font-size:24px;">${data.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h1>
    <p style="margin:8px 0 0;opacity:0.9;font-size:14px;">Good morning — here's your Kigali Car Hire fleet briefing</p>
  </div>

  <!-- Summary bar -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);background:white;border:1px solid #e5e7eb;border-top:none;">
    ${[
      ["Total Cars", data.totalCars.toString(), "#374151"],
      ["On Hire", data.onHireCount.toString(), "#2563eb"],
      ["Available", data.availableCars.toString(), "#16a34a"],
      ["Alerts", totalAlerts.toString(), totalAlerts > 0 ? "#dc2626" : "#16a34a"],
    ].map(([label, val, color]) =>
      `<div style="padding:16px;text-align:center;border-right:1px solid #f3f4f6;">
        <div style="font-size:26px;font-weight:bold;color:${color};">${val}</div>
        <div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">${label}</div>
      </div>`
    ).join("")}
  </div>

  <!-- Body -->
  <div style="background:white;padding:28px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">

    ${hasUrgent ? `<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:8px;padding:12px 16px;margin-bottom:24px;">
      <strong style="color:#dc2626;">🚨 URGENT — Requires action today</strong>
      <ul style="margin:8px 0 0;padding-left:20px;font-size:13px;color:#dc2626;">
        ${data.overdueReturns.length > 0 ? `<li>${data.overdueReturns.length} car${data.overdueReturns.length > 1 ? "s are" : " is"} overdue for return</li>` : ""}
        ${data.insuranceExpiring.filter(c => daysUntil(c.insuranceEnd) <= 7).map(c => `<li>⚠️ ${c.carName} insurance expires in ${daysUntil(c.insuranceEnd)} days</li>`).join("")}
        ${data.oilChangeDue.filter(c => daysUntil(c.nextOilChange) <= 3).map(c => `<li>🔧 ${c.carName} oil change is ${daysUntil(c.nextOilChange) < 0 ? "OVERDUE" : "due in " + daysUntil(c.nextOilChange) + " days"}</li>`).join("")}
      </ul>
    </div>` : ""}

    ${section("📅", `Returning Today (${data.returningToday.length})`, "#d97706", returningRows)}
    ${section("🚨", `Overdue Returns (${data.overdueReturns.length})`, "#dc2626", overdueRows)}
    ${section("🚗", `Cars Currently On Hire (${data.onHireBookings.length})`, "#2563eb", onHireRows)}
    ${section("⚠️", `Service Alerts — Insurance & Oil Change`, "#d97706", serviceContent)}
    ${section("✅", `New Bookings Added Today (${data.newBookingsToday.length})`, "#16a34a", newBookingRows)}
    ${section("📆", `Upcoming Bookings — Next 7 Days (${data.upcomingBookings.length})`, "#7c3aed", upcomingContent)}

    <div style="text-align:center;padding-top:20px;border-top:1px solid #f3f4f6;">
      <a href="https://kigalicarhire.rw/manager/fleet-status" style="display:inline-block;background:#01B000;color:white;padding:12px 28px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:14px;">Open Fleet Dashboard →</a>
      <p style="margin:14px 0 0;color:#9ca3af;font-size:12px;">Kigali Car Hire · Automated Daily Report · Sent at 7:00 AM EAT</p>
    </div>
  </div>
</div>
</body>
</html>`;

    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `🚗 Fleet Report ${data.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} — ${data.onHireCount} on hire${totalAlerts > 0 ? ` · ${totalAlerts} alert${totalAlerts !== 1 ? "s" : ""}` : ""}`,
      html,
    });
    console.log("Daily report email sent");
  } catch (error) {
    console.error("Error sending daily report:", error);
  }
}

export async function sendServiceAlertsEmail(data: {
  insuranceExpiring: Array<{ name: string; brand: string; licensePlate: string | null; insuranceEnd: Date }>;
  oilChangeDue: Array<{ name: string; brand: string; licensePlate: string | null; nextOilChange: Date }>;
  overdueBookings: Array<{ carName: string; licensePlate: string | null; customerName: string; customerPhone: string; returnDate: Date }>;
}) {
  try {
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

    const daysUntil = (d: Date) => {
      const diff = d.getTime() - Date.now();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const plate = (p: string | null) => (p ? ` (${p})` : "");

    const insuranceRows = data.insuranceExpiring
      .map((c) => {
        const days = daysUntil(c.insuranceEnd);
        const color = days < 0 ? "#DC2626" : days <= 7 ? "#DC2626" : "#D97706";
        const label = days < 0 ? `EXPIRED ${Math.abs(days)} days ago` : `expires in ${days} day${days !== 1 ? "s" : ""}`;
        return `<tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">${c.brand} ${c.name}${plate(c.licensePlate)}</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:${color};font-weight:bold;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#555;">${fmt(c.insuranceEnd)}</td></tr>`;
      })
      .join("");

    const oilRows = data.oilChangeDue
      .map((c) => {
        const days = daysUntil(c.nextOilChange);
        const color = days < 0 ? "#DC2626" : days <= 3 ? "#DC2626" : "#D97706";
        const label = days < 0 ? `OVERDUE by ${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""}` : `due in ${days} day${days !== 1 ? "s" : ""}`;
        return `<tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">${c.brand} ${c.name}${plate(c.licensePlate)}</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:${color};font-weight:bold;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#555;">${fmt(c.nextOilChange)}</td></tr>`;
      })
      .join("");

    const overdueRows = data.overdueBookings
      .map((b) => {
        const days = Math.abs(daysUntil(b.returnDate));
        return `<tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">${b.carName}${plate(b.licensePlate)}</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#DC2626;font-weight:bold;">${days} day${days !== 1 ? "s" : ""} overdue</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#555;">${b.customerName} — ${b.customerPhone}</td></tr>`;
      })
      .join("");

    const totalAlerts = data.insuranceExpiring.length + data.oilChangeDue.length + data.overdueBookings.length;

    const html = `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;color:#333;margin:0;padding:0;">
<div style="max-width:650px;margin:0 auto;padding:20px;">
  <div style="background:#01B000;color:white;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="margin:0;font-size:22px;">🚗 Kigali Car Hire — Service Alerts</h1>
    <p style="margin:8px 0 0;opacity:0.9;">Generated ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
  </div>
  <div style="background:#fff8e1;padding:16px 24px;border:2px solid #f59e0b;border-top:none;">
    <p style="margin:0;font-weight:bold;color:#92400e;">⚠️ ${totalAlerts} alert${totalAlerts !== 1 ? "s" : ""} require your attention</p>
  </div>
  <div style="background:#f9f9f9;padding:24px;border:2px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">

    ${data.insuranceExpiring.length > 0 ? `
    <h2 style="color:#D97706;margin:0 0 12px;font-size:16px;border-bottom:2px solid #fef3c7;padding-bottom:8px;">🛡️ Insurance Expiring / Expired (${data.insuranceExpiring.length})</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:white;border-radius:6px;overflow:hidden;border:1px solid #e0e0e0;">
      <thead><tr style="background:#fef3c7;">
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#92400e;">Vehicle</th>
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#92400e;">Status</th>
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#92400e;">Expiry Date</th>
      </tr></thead>
      <tbody>${insuranceRows}</tbody>
    </table>` : ""}

    ${data.oilChangeDue.length > 0 ? `
    <h2 style="color:#D97706;margin:0 0 12px;font-size:16px;border-bottom:2px solid #fef3c7;padding-bottom:8px;">🔧 Oil Change Due (${data.oilChangeDue.length})</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:white;border-radius:6px;overflow:hidden;border:1px solid #e0e0e0;">
      <thead><tr style="background:#fef3c7;">
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#92400e;">Vehicle</th>
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#92400e;">Status</th>
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#92400e;">Due Date</th>
      </tr></thead>
      <tbody>${oilRows}</tbody>
    </table>` : ""}

    ${data.overdueBookings.length > 0 ? `
    <h2 style="color:#DC2626;margin:0 0 12px;font-size:16px;border-bottom:2px solid #fee2e2;padding-bottom:8px;">🚨 Overdue Returns (${data.overdueBookings.length})</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:white;border-radius:6px;overflow:hidden;border:1px solid #e0e0e0;">
      <thead><tr style="background:#fee2e2;">
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#991b1b;">Vehicle</th>
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#991b1b;">Overdue By</th>
        <th style="padding:10px 12px;text-align:left;font-size:13px;color:#991b1b;">Customer</th>
      </tr></thead>
      <tbody>${overdueRows}</tbody>
    </table>` : ""}

    <div style="text-align:center;margin-top:20px;padding-top:16px;border-top:1px solid #e0e0e0;">
      <p style="margin:0;color:#555;font-size:13px;">Log in to <strong>kigalicarhire.rw/manager/fleet-status</strong> to take action.</p>
      <p style="margin:6px 0 0;color:#999;font-size:12px;">Kigali Car Hire — Automated Service Alert</p>
    </div>
  </div>
</div>
</body>
</html>`;

    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `⚠️ ${totalAlerts} Service Alert${totalAlerts !== 1 ? "s" : ""} — Kigali Car Hire Fleet`,
      html,
    });
    console.log("Service alerts email sent");
  } catch (error) {
    console.error("Error sending service alerts email:", error);
  }
}

export async function sendStatusUpdateToCustomer(
  statusData: StatusUpdateEmailData
) {
  try {
    // Get status display info
    const getStatusInfo = (status: string) => {
      switch (status) {
        case "confirmed":
          return {
            color: "#01B000",
            icon: "✓",
            title: "Booking Confirmed",
            message:
              "Great news! Your booking has been confirmed. We look forward to serving you!",
          };
        case "completed":
          return {
            color: "#0066CC",
            icon: "✓",
            title: "Booking Completed",
            message:
              "Thank you for choosing Kigali Car Hire! We hope you enjoyed your experience.",
          };
        case "cancelled":
          return {
            color: "#DC2626",
            icon: "✕",
            title: "Booking Cancelled",
            message:
              "Your booking has been cancelled. If you have any questions, please contact us.",
          };
        case "pending":
          return {
            color: "#F59E0B",
            icon: "⏳",
            title: "Booking Pending",
            message:
              "Your booking is currently pending review. We will contact you shortly.",
          };
        default:
          return {
            color: "#6B7280",
            icon: "ℹ",
            title: "Booking Status Updated",
            message: "Your booking status has been updated.",
          };
      }
    };

    const statusInfo = getStatusInfo(statusData.newStatus);

    const mailOptions = {
      from: "kigalicarhire1990@gmail.com",
      to: statusData.customerEmail,
      subject: `${statusInfo.title} - ${statusData.carName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: ${statusInfo.color};
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border: 2px solid #e0e0e0;
              border-radius: 0 0 8px 8px;
            }
            .status-badge {
              display: inline-block;
              background-color: ${statusInfo.color};
              color: white;
              padding: 10px 20px;
              border-radius: 20px;
              font-weight: bold;
              margin: 20px 0;
              text-transform: uppercase;
              font-size: 14px;
            }
            .message-box {
              background-color: white;
              padding: 20px;
              border-left: 4px solid ${statusInfo.color};
              margin: 20px 0;
              border-radius: 4px;
            }
            .section {
              margin-bottom: 25px;
              padding-bottom: 20px;
              border-bottom: 1px solid #ddd;
            }
            .section:last-child {
              border-bottom: none;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #01B000;
              margin-bottom: 10px;
            }
            .info-row {
              display: flex;
              margin-bottom: 8px;
            }
            .info-label {
              font-weight: bold;
              min-width: 140px;
              color: #555;
            }
            .info-value {
              color: #333;
            }
            .price {
              font-size: 24px;
              font-weight: bold;
              color: #01B000;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .contact-box {
              background-color: white;
              padding: 15px;
              border-radius: 8px;
              margin-top: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">${statusInfo.icon}</h1>
              <h2 style="margin: 10px 0 0 0;">${statusInfo.title}</h2>
            </div>
            <div class="content">
              <div class="message-box">
                <p style="margin: 0; font-size: 16px; line-height: 1.6;">
                  ${statusInfo.message}
                </p>
              </div>

              <div style="text-align: center;">
                <span class="status-badge">Status: ${statusData.newStatus}</span>
              </div>

              <div class="section">
                <div class="section-title">Booking Details</div>
                <div class="info-row">
                  <div class="info-label">Booking ID:</div>
                  <div class="info-value">${statusData.bookingId}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Customer Name:</div>
                  <div class="info-value">${statusData.customerName}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Vehicle Information</div>
                <div class="info-row">
                  <div class="info-label">Vehicle:</div>
                  <div class="info-value">${statusData.carName}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Make & Model:</div>
                  <div class="info-value">${statusData.carBrand} ${statusData.carModel}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Rental Period</div>
                <div class="info-row">
                  <div class="info-label">Pickup Date:</div>
                  <div class="info-value">${new Date(
                    statusData.pickupDate
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Return Date:</div>
                  <div class="info-value">${new Date(
                    statusData.returnDate
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Total Cost</div>
                <div class="price">$${statusData.totalCost.toFixed(2)}</div>
              </div>

              <div class="contact-box">
                <p style="margin: 0; font-weight: bold; color: #01B000;">Need Help?</p>
                <p style="margin: 5px 0 0 0;">
                  Phone: <strong style="color: #01B000;">0788892976</strong>
                </p>
                <p style="margin: 5px 0 0 0;">
                  Email: <a href="mailto:kigalicarhire1990@gmail.com" style="color: #01B000;">kigalicarhire1990@gmail.com</a>
                </p>
              </div>

              <div class="footer">
                <p style="margin-top: 10px; color: #999; font-size: 12px;">
                  This is an automated notification from Kigali Car Hire booking system.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Status update email sent to ${statusData.customerEmail} successfully`
    );
  } catch (error) {
    console.error("Error sending status update email:", error);
    // Don't throw error - we don't want to fail the status update if email fails
  }
}

interface ChatDigestQuestion {
  question: string;
  answer: string | null;
  name: string | null;
  phone: string | null;
  page: string | null;
  createdAt: Date;
}

export async function sendChatDigestEmail(questions: ChatDigestQuestion[]) {
  try {
    const rows = questions
      .map(
        (q) => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 13px; color: #999;">${q.createdAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>${q.question}</strong>${q.name ? `<br><span style="color:#666;font-size:12px;">From: ${q.name}${q.phone ? " · " + q.phone : ""}</span>` : ""}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #444; font-size: 13px;">${q.answer || "—"}</td>
          </tr>`
      )
      .join("");

    const mailOptions = {
      from: "kigalicarhire1990@gmail.com",
      to: "dieudufinnovation@gmail.com",
      subject: `Kigali Car Hire — ${questions.length} chat question${questions.length === 1 ? "" : "s"} today`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
          <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
            <div style="background: #01B000; padding: 20px; color: white;">
              <h2 style="margin: 0;">Daily Chat Widget Digest</h2>
              <p style="margin: 5px 0 0; opacity: 0.9;">${questions.length} question${questions.length === 1 ? "" : "s"} asked today on kigalicarhire.rw</p>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f9f9f9; text-align: left;">
                  <th style="padding: 12px; font-size: 12px; color: #999;">Time</th>
                  <th style="padding: 12px; font-size: 12px; color: #999;">Question</th>
                  <th style="padding: 12px; font-size: 12px; color: #999;">AI Answer Given</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Chat digest email sent with ${questions.length} questions`);
  } catch (error) {
    console.error("Error sending chat digest email:", error);
  }
}
