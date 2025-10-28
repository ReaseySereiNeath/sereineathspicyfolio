"use client";

import { gsap } from "./gsap-config";

export interface AnimationOptions {
	duration?: number;
	delay?: number;
	ease?: string;
	stagger?: number;
}

export interface ScrollAnimationOptions extends AnimationOptions {
	trigger?: HTMLElement | null;
	start?: string;
	end?: string;
	scrub?: boolean | number;
	toggleActions?: string;
}

/**
 * Fade in animation from opacity 0 to 1
 */
export const fadeIn = (
	element: HTMLElement | null,
	options: AnimationOptions = {}
) => {
	if (!element) return null;

	return gsap.from(element, {
		opacity: 0,
		duration: options.duration || 0.6,
		delay: options.delay || 0,
		ease: options.ease || "power2.out",
	});
};

/**
 * Slide up animation (fade in + translate Y)
 */
export const slideUp = (
	element: HTMLElement | null,
	options: AnimationOptions = {}
) => {
	if (!element) return null;

	return gsap.from(element, {
		opacity: 0,
		y: options.delay !== undefined ? 20 : 30,
		duration: options.duration || 0.6,
		delay: options.delay || 0,
		ease: options.ease || "power2.out",
	});
};

/**
 * Slide in from left
 */
export const slideInLeft = (
	element: HTMLElement | null,
	options: AnimationOptions = {}
) => {
	if (!element) return null;

	return gsap.from(element, {
		opacity: 0,
		x: -50,
		duration: options.duration || 0.8,
		delay: options.delay || 0,
		ease: options.ease || "power2.out",
	});
};

/**
 * Slide in from right
 */
export const slideInRight = (
	element: HTMLElement | null,
	options: AnimationOptions = {}
) => {
	if (!element) return null;

	return gsap.from(element, {
		opacity: 0,
		x: 50,
		duration: options.duration || 0.8,
		delay: options.delay || 0,
		ease: options.ease || "power2.out",
	});
};

/**
 * Scale animation (pop in effect)
 */
export const scaleIn = (
	element: HTMLElement | null,
	options: AnimationOptions = {}
) => {
	if (!element) return null;

	return gsap.from(element, {
		opacity: 0,
		scale: 0,
		duration: options.duration || 0.4,
		delay: options.delay || 0,
		ease: options.ease || "back.out(1.7)",
	});
};

/**
 * Stagger animation for multiple elements
 */
export const staggerAnimation = (
	elements: HTMLElement[] | NodeListOf<Element>,
	options: AnimationOptions = {}
) => {
	if (!elements || elements.length === 0) return null;

	return gsap.from(elements, {
		opacity: 0,
		y: 30,
		duration: options.duration || 0.6,
		stagger: options.stagger || 0.1,
		delay: options.delay || 0,
		ease: options.ease || "power2.out",
	});
};

/**
 * Card hover effect (lift up)
 */
export const cardHoverUp = (element: HTMLElement | null) => {
	if (!element) return;

	return gsap.to(element, {
		y: -10,
		duration: 0.3,
		ease: "power2.out",
	});
};

/**
 * Card hover reset
 */
export const cardHoverReset = (element: HTMLElement | null) => {
	if (!element) return;

	return gsap.to(element, {
		y: 0,
		duration: 0.3,
		ease: "power2.out",
	});
};

/**
 * Glow effect fade in
 */
export const glowFadeIn = (
	element: HTMLElement | null,
	opacity: number = 0.3
) => {
	if (!element) return;

	return gsap.to(element, {
		opacity,
		duration: 0.5,
	});
};

/**
 * Glow effect fade out
 */
export const glowFadeOut = (element: HTMLElement | null) => {
	if (!element) return;

	return gsap.to(element, {
		opacity: 0,
		duration: 0.5,
	});
};

/**
 * Icon hover scale and rotate
 */
export const iconHover = (element: HTMLElement | null) => {
	if (!element) return;

	return gsap.to(element, {
		scale: 1.2,
		rotation: -10,
		duration: 0.3,
		ease: "back.out(1.7)",
	});
};

/**
 * Icon hover reset
 */
export const iconHoverReset = (element: HTMLElement | null) => {
	if (!element) return;

	return gsap.to(element, {
		scale: 1,
		rotation: 0,
		duration: 0.3,
		ease: "power2.out",
	});
};

/**
 * Parallax effect (scroll-based movement)
 */
export const parallaxScroll = (
	element: HTMLElement | null,
	amount: number = -100,
	options: ScrollAnimationOptions = {}
) => {
	if (!element) return null;

	return gsap.to(element, {
		y: amount,
		ease: "none",
		scrollTrigger: {
			trigger: options.trigger || element,
			start: options.start || "top bottom",
			end: options.end || "bottom top",
			scrub: options.scrub !== undefined ? options.scrub : 1,
		},
	});
};
