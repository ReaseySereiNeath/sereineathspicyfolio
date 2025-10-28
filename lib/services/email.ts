/**
 * Email Service
 * Handles email sending via SMTP using Nodemailer
 */

import type { ContactFormData } from "@/lib/schemas/contact";
import nodemailer from "nodemailer";

/**
 * Email configuration from environment variables
 */
const emailConfig = {
	host: process.env.SMTP_HOST || "smtp.gmail.com",
	port: Number(process.env.SMTP_PORT) || 587,
	secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
};

/**
 * Recipient email for contact form submissions
 */
const recipientEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

/**
 * Create reusable transporter
 */
const createTransporter = () => {
	// Validate required environment variables
	if (!emailConfig.auth.user || !emailConfig.auth.pass) {
		throw new Error(
			"SMTP credentials not configured. Please set SMTP_USER and SMTP_PASSWORD environment variables."
		);
	}

	return nodemailer.createTransport(emailConfig);
};

/**
 * Generate HTML email template
 */
function generateEmailHTML(data: ContactFormData): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                You have received a new message from your portfolio contact form.
              </p>
              
              <!-- Contact Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea;">
                    <p style="margin: 0 0 10px 0; color: #333333; font-weight: bold;">Name:</p>
                    <p style="margin: 0; color: #666666; font-size: 16px;">${
											data.name
										}</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea;">
                    <p style="margin: 0 0 10px 0; color: #333333; font-weight: bold;">Email:</p>
                    <p style="margin: 0; color: #667eea; font-size: 16px;">
                      <a href="mailto:${
												data.email
											}" style="color: #667eea; text-decoration: none;">${
												data.email
											}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea;">
                    <p style="margin: 0 0 10px 0; color: #333333; font-weight: bold;">Message:</p>
                    <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${
											data.message
										}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Reply Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${
											data.email
										}?subject=Re: Contact Form Submission" 
                       style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                      Reply to ${data.name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                Received on ${new Date().toLocaleDateString("en-US", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email
 */
function generateEmailText(data: ContactFormData): string {
	return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
Received on ${new Date().toLocaleString()}
  `.trim();
}

/**
 * Send contact form email
 */
export async function sendContactEmail(
	data: ContactFormData
): Promise<{ success: boolean; messageId?: string; error?: string }> {
	try {
		const transporter = createTransporter();

		// Verify SMTP connection
		await transporter.verify();

		// Send email
		const info = await transporter.sendMail({
			from: `"Portfolio Contact" <${emailConfig.auth.user}>`,
			to: recipientEmail,
			replyTo: data.email,
			subject: `New Contact: ${data.name}`,
			text: generateEmailText(data),
			html: generateEmailHTML(data),
		});

		console.log("Email sent successfully:", info.messageId);

		return {
			success: true,
			messageId: info.messageId,
		};
	} catch (error) {
		console.error("Failed to send email:", error);

		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to send email. Please try again later.",
		};
	}
}

/**
 * Test email configuration
 */
export async function testEmailConnection(): Promise<boolean> {
	try {
		const transporter = createTransporter();
		await transporter.verify();
		console.log("SMTP connection verified successfully");
		return true;
	} catch (error) {
		console.error("SMTP connection failed:", error);
		return false;
	}
}
