/**
 * Content Types
 * Type definitions for portfolio content (projects, skills, testimonials, etc.)
 */

import { LucideIcon } from "lucide-react";

/**
 * Skill category with icon and color theming
 */
export interface SkillCategory {
	title: string;
	icon: LucideIcon;
	color: string;
	skills: string[];
}

/**
 * Project showcase item
 */
export interface Project {
	title: string;
	description: string;
	tech: string[];
	gradient: string;
	githubUrl?: string;
	liveUrl?: string;
}

/**
 * Client testimonial
 */
export interface Testimonial {
	name: string;
	role: string;
	content: string;
	rating: number;
	image: string;
}

/**
 * Work experience entry
 */
export interface Experience {
	title: string;
	company: string;
	period: string;
	location: string;
	description: string;
}

/**
 * Contact method (email, phone, location)
 */
export interface ContactMethod {
	icon: LucideIcon;
	label: string;
	value: string;
	href: string | null;
}

/**
 * Social media link
 */
export interface SocialLink {
	icon: LucideIcon;
	label: string;
	href: string;
	color: string;
}

/**
 * About section statistic
 */
export interface Stat {
	icon: LucideIcon;
	label: string;
	value: string;
}
