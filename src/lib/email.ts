import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kigalicarhire1990@gmail.com",
    pass: "nsnc rinn ksij kbar",
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
      to: "kigalicarhire1990@gmail.com",
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
      to: "kigalicarhire1990@gmail.com",
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
