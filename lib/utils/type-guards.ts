/**
 * Type Guards & Validators
 * Runtime type checking utilities
 */

import { SECTIONS } from "@/lib/constants";
import type { Section } from "@/lib/types";

/**
 * Type guard to check if a value is a valid Section
 * @param value - Value to check
 * @returns True if value is a valid Section
 */
export function isSection(value: unknown): value is Section {
	return typeof value === "string" && SECTIONS.includes(value as Section);
}

/**
 * Type guard to check if a value is a valid string
 * @param value - Value to check
 * @returns True if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

/**
 * Type guard to check if a value is a valid number
 * @param value - Value to check
 * @returns True if value is a finite number
 */
export function isValidNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

/**
 * Type guard to check if a value is a valid rating (1-5)
 * @param value - Value to check
 * @returns True if value is between 1 and 5
 */
export function isValidRating(value: unknown): value is number {
	return isValidNumber(value) && value >= 1 && value <= 5;
}

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns True if email format is valid
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validates URL format
 * @param url - URL string to validate
 * @returns True if URL format is valid
 */
export function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

/**
 * Type guard for checking if HTMLElement exists and is visible
 * @param element - Element to check
 * @returns True if element exists and is not hidden
 */
export function isVisibleElement(
	element: HTMLElement | null
): element is HTMLElement {
	return element !== null && element.offsetParent !== null;
}

/**
 * Asserts that a value is defined (not null or undefined)
 * @param value - Value to check
 * @param message - Error message if assertion fails
 * @throws Error if value is null or undefined
 */
export function assertDefined<T>(
	value: T | null | undefined,
	message = "Value is not defined"
): asserts value is T {
	if (value === null || value === undefined) {
		throw new Error(message);
	}
}
