/**
 * Navigation Types
 * Type definitions for navigation, routing, and section management
 */

/**
 * Valid section identifiers used throughout the portfolio
 */
export type Section =
	| "hero"
	| "about"
	| "skills"
	| "journey"
	| "experience"
	| "projects"
	// | "testimonials"
	| "contact";

/**
 * Navigation item structure
 */
export interface NavItem {
	id: Section;
	label: string;
}

/**
 * Navigation component props
 */
export interface NavigationProps {
	currentSection: Section;
	onNavigate: (section: Section) => void;
}
