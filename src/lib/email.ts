import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/constants";

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
      replyTo: data.customerEmail,
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
      replyTo: data.email,
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
      replyTo: CONTACT.EMAIL,
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

// ================= DAILY ADMIN DIGEST =================
export interface DailyDigestData {
  date: string;
  visitCount: number;
  bookingCount: number;
  bookingRequestCount: number;
  contactMessageCount: number;
}

export async function sendDailyDigest(data: DailyDigestData) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_ADMIN,
      subject: `📊 Daily Report - ${data.date} - Kigali Car Rental`,
      html: `
        <h2>Daily Report for ${data.date}</h2>
        <table cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 480px;">
          <tr style="background:#eff6ff;"><td><b>Website visits</b></td><td>${data.visitCount}</td></tr>
          <tr><td><b>New bookings</b></td><td>${data.bookingCount}</td></tr>
          <tr style="background:#eff6ff;"><td><b>New booking requests</b></td><td>${data.bookingRequestCount}</td></tr>
          <tr><td><b>New contact messages</b></td><td>${data.contactMessageCount}</td></tr>
        </table>
        <p style="margin-top:16px;color:#6b7280;">Automated daily summary from kigalicarrental.site</p>
      `,
    });

    console.log("✅ Daily digest email sent");
  } catch (err) {
    console.error("❌ Daily digest email failed:", err);
  }
}

// ================= AI BLOG DRAFT NOTIFICATION =================
export interface BlogDraftEmailData {
  title: string;
  category: string;
  excerpt: string;
  editUrl: string;
}

export async function sendBlogDraftNotification(data: BlogDraftEmailData) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_ADMIN,
      subject: `📝 New AI Blog Draft Ready for Review - ${data.title}`,
      html: `
        <h2>New AI-Generated Blog Draft</h2>
        <p><b>Title:</b> ${data.title}</p>
        <p><b>Category:</b> ${data.category}</p>
        <p><b>Excerpt:</b> ${data.excerpt}</p>
        <p>This post was written automatically and saved as a <b>draft</b> - it will not go live until you review and publish it.</p>
        <p><a href="${data.editUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">Review &amp; Publish</a></p>
      `,
    });

    console.log("✅ Blog draft notification email sent");
  } catch (err) {
    console.error("❌ Blog draft notification email failed:", err);
  }
}

