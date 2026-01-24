import nodemailer from "nodemailer";

// ================== TRANSPORTER ==================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// ================= TYPES =================
export interface BookingEmailData {
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

// ================= BOOKING EMAIL =================
export async function sendBookingNotificationToManager(data: BookingEmailData) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_ADMIN,
      subject: `🚗 New Booking - ${data.carName}`,
      html: `
        <h2>New Booking Received</h2>
        <p><b>Booking ID:</b> ${data.bookingId}</p>
        <p><b>Name:</b> ${data.customerName}</p>
        <p><b>Email:</b> ${data.customerEmail}</p>
        <p><b>Phone:</b> ${data.customerPhone}</p>
        <p><b>Car:</b> ${data.carBrand} ${data.carModel}</p>
        <p><b>Pickup:</b> ${data.pickupDate}</p>
        <p><b>Return:</b> ${data.returnDate}</p>
        <p><b>Pickup Location:</b> ${data.pickupLocation}</p>
        <p><b>Return Location:</b> ${data.returnLocation}</p>
        <h3>Total: $${data.totalCost}</h3>
        <p><b>Requests:</b> ${data.specialRequests || "None"}</p>
      `,
    });

    console.log("✅ Booking email sent");
  } catch (err) {
    console.error("❌ Booking email failed:", err);
  }
}

// ================= CONTACT FORM =================
export async function sendContactFormNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_ADMIN,
      subject: `📩 Contact Form - ${data.name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone || "N/A"}</p>
        <p><b>Message:</b><br>${data.message}</p>
      `,
    });

    console.log("✅ Contact email sent");
  } catch (err) {
    console.error("❌ Contact email failed:", err);
  }
}

// ================= STATUS UPDATE TO CUSTOMER =================
export async function sendStatusUpdateToCustomer(data: any) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.customerEmail,
      subject: `Booking Status Updated - ${data.carName}`,
      html: `
        <h2>Status: ${data.newStatus}</h2>
        <p>Hello ${data.customerName},</p>
        <p>Your booking for <b>${data.carName}</b> is now <b>${data.newStatus}</b>.</p>
        <p>Pickup: ${data.pickupDate}</p>
        <p>Return: ${data.returnDate}</p>
        <h3>Total: $${data.totalCost}</h3>
        <p>Thank you for choosing Kigali Car Hire.</p>
      `,
    });

    console.log("✅ Status email sent");
  } catch (err) {
    console.error("❌ Status email failed:", err);
  }
}

