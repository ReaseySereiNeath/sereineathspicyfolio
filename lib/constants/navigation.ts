/**
 * Navigation Constants
 * Typed navigation items and section definitions
 */

import type { NavItem, Section } from "@/lib/types";

/**
 * All valid portfolio sections in order
 */
export const SECTIONS: readonly Section[] = [
	"hero",
	"about",
	"skills",
	"journey",
	"experience",
	"projects",
	"testimonials",
	"contact",
] as const;

/**
 * Navigation items with labels
 * Used for navigation menu rendering
 */
export const NAV_ITEMS: readonly NavItem[] = [
	{ id: "hero", label: "HOME" },
	{ id: "about", label: "ABOUT" },
	{ id: "skills", label: "SKILLS" },
	{ id: "journey", label: "JOURNEY" },
	{ id: "experience", label: "EXPERIENCE" },
	{ id: "projects", label: "PROJECTS" },
	// { id: "testimonials", label: "TESTIMONIALS" },
	{ id: "contact", label: "CONTACT" },
] as const;

/**
 * Section display names (for debugging/logging)
 */
export const SECTION_NAMES: Readonly<Record<Section, string>> = {
	hero: "Hero",
	about: "About",
	skills: "Skills",
	journey: "Journey",
	experience: "Experience",
	projects: "Projects",
	testimonials: "Testimonials",
	contact: "Contact",
} as const;
