import { contactFormSchema } from "@/lib/schemas/contact";
import { sendContactEmail } from "@/lib/services/email";
import { NextRequest, NextResponse } from "next/server";

export interface ContactApiResponse {
	success: boolean;
	message: string;
}

/**
 * POST /api/contact
 * Handles contact form submissions
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validate with Zod schema
		const validationResult = contactFormSchema.safeParse(body);

		if (!validationResult.success) {
			// Get the first error message
			const firstError = validationResult.error.issues[0];
			return NextResponse.json(
				{
					success: false,
					message: firstError?.message || "Validation failed",
				} as ContactApiResponse,
				{ status: 400 }
			);
		}

		// Data is validated and sanitized by Zod
		const sanitizedData = validationResult.data;

		// Send email via SMTP
		const emailResult = await sendContactEmail(sanitizedData);

		if (!emailResult.success) {
			return NextResponse.json(
				{
					success: false,
					message:
						emailResult.error ||
						"Failed to send email. Please try again later.",
				} as ContactApiResponse,
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Thank you for your message! I'll get back to you soon.",
			} as ContactApiResponse,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong. Please try again later.",
			} as ContactApiResponse,
			{ status: 500 }
		);
	}
}
