/**
 * Contact Form Schema
 * Zod validation schemas for contact form
 */

import { z } from "zod";

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.min(2, "Name must be at least 2 characters")
		.max(100, "Name must be less than 100 characters")
		.trim(),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.max(255, "Email is too long")
		.trim()
		.toLowerCase(),
	message: z
		.string()
		.min(1, "Message is required")
		.min(10, "Message must be at least 10 characters")
		.max(2000, "Message must be less than 2000 characters")
		.trim(),
});

/**
 * Type inference from schema
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Validation error type
 */
export interface ContactFormErrors {
	name?: string;
	email?: string;
	message?: string;
}

/**
 * Validate contact form data and return errors in a format compatible with the UI
 */
export function validateContactForm(
	data: unknown
):
	| { success: true; data: ContactFormData }
	| { success: false; errors: ContactFormErrors } {
	const result = contactFormSchema.safeParse(data);

	if (result.success) {
		return { success: true, data: result.data };
	}

	const errors: ContactFormErrors = {};
	result.error.issues.forEach((issue) => {
		const field = issue.path[0] as keyof ContactFormErrors;
		if (field && !errors[field]) {
			errors[field] = issue.message;
		}
	});

	return { success: false, errors };
}

/**
 * Validate individual field
 */
export function validateField(
	field: keyof ContactFormData,
	value: string
): { isValid: boolean; error?: string } {
	try {
		const fieldSchema = contactFormSchema.shape[field];
		fieldSchema.parse(value);
		return { isValid: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { isValid: false, error: error.issues[0]?.message };
		}
		return { isValid: false, error: "Validation failed" };
	}
}
