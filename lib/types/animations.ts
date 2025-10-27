/**
 * Animation Types
 * Type definitions for GSAP animations and transitions
 */

/**
 * Base animation configuration
 */
export interface AnimationConfig {
	duration?: number;
	/** Delay before animation starts in seconds */
	delay?: number;
	/** GSAP easing function */
	ease?: string;
	/** Stagger delay between multiple elements */
	stagger?: number;
}

/**
 * Scroll-triggered animation configuration
 * Extends AnimationConfig with ScrollTrigger-specific options
 */
export interface ScrollAnimationConfig extends AnimationConfig {
	/** Element to trigger the animation */
	trigger?: HTMLElement | null;
	/** Start position (e.g., "top 80%") */
	start?: string;
	/** End position (e.g., "bottom top") */
	end?: string;
	/** Scrub value for scroll-linked animations */
	scrub?: boolean | number;
	/** ScrollTrigger toggle actions */
	toggleActions?: string;
}

/**
 * Card hover animation options
 */
export interface CardHoverOptions {
	/** Amount to lift card on hover (negative for up) */
	liftAmount?: number;
	/** Glow effect opacity (0-1) */
	glowOpacity?: number;
	/** CSS selector for glow element */
	glowSelector?: string;
	/** CSS selector for card content */
	cardSelector?: string;
	/** Animation duration in seconds */
	duration?: number;
}

/**
 * Scroll reveal animation options
 */
export interface ScrollRevealOptions {
	/** Starting opacity (0-1) */
	opacity?: number;
	/** Y-axis offset in pixels */
	y?: number;
	/** X-axis offset in pixels */
	x?: number;
	/** Animation duration in seconds */
	duration?: number;
	/** Delay before animation starts */
	delay?: number;
	/** Stagger delay between child elements */
	stagger?: number;
	/** ScrollTrigger start position */
	start?: string;
	/** ScrollTrigger toggle actions */
	toggleActions?: string;
	/** GSAP easing function */
	ease?: string;
}
