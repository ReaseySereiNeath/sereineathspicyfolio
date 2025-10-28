"use client";

import { RefObject, useEffect } from "react";
import { glowFadeIn, glowFadeOut } from "../utils/animations";
import { gsap } from "../utils/gsap-config";

export interface CardHoverOptions {
	liftAmount?: number;
	glowOpacity?: number;
	glowSelector?: string;
	cardSelector?: string;
	duration?: number;
}

/**
 * Hook for card hover animations (lift + glow effect)
 * Automatically attaches and cleans up event listeners
 */
export function useCardHover(
	ref: RefObject<HTMLElement | null>,
	options: CardHoverOptions = {}
) {
	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const {
			liftAmount = -10,
			glowOpacity = 0.3,
			glowSelector = ".glow-effect",
			cardSelector = ".card-content, .project-card-content, .testimonial-content, .experience-content",
		} = options;

		const glowElement = element.querySelector(glowSelector);
		const cardContent = element.querySelector(cardSelector) || element;

		const handleMouseEnter = () => {
			if (cardContent) {
				gsap.to(cardContent, {
					y: liftAmount,
					duration: 0.3,
					ease: "power2.out",
				});
			}
			if (glowElement) {
				glowFadeIn(glowElement as HTMLElement, glowOpacity);
			}
		};

		const handleMouseLeave = () => {
			if (cardContent) {
				gsap.to(cardContent, {
					y: 0,
					duration: 0.3,
					ease: "power2.out",
				});
			}
			if (glowElement) {
				glowFadeOut(glowElement as HTMLElement);
			}
		};

		element.addEventListener("mouseenter", handleMouseEnter);
		element.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			element.removeEventListener("mouseenter", handleMouseEnter);
			element.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [
		ref,
		options.liftAmount,
		options.glowOpacity,
		options.glowSelector,
		options.cardSelector,
		options,
	]);
}

/**
 * Hook for icon hover animations (scale + rotate)
 */
export function useIconHover(
	ref: RefObject<HTMLElement | null>,
	selector: string
) {
	useEffect(() => {
		const container = ref.current;
		if (!container) return;

		const icons = container.querySelectorAll(selector);

		const handlers: Array<{
			element: Element;
			enter: () => void;
			leave: () => void;
		}> = [];

		icons.forEach((icon) => {
			const handleMouseEnter = () => {
				gsap.to(icon, {
					scale: 1.2,
					rotation: -10,
					duration: 0.3,
					ease: "back.out(1.7)",
				});
			};

			const handleMouseLeave = () => {
				gsap.to(icon, {
					scale: 1,
					rotation: 0,
					duration: 0.3,
					ease: "power2.out",
				});
			};

			icon.addEventListener("mouseenter", handleMouseEnter);
			icon.addEventListener("mouseleave", handleMouseLeave);

			handlers.push({
				element: icon,
				enter: handleMouseEnter,
				leave: handleMouseLeave,
			});
		});

		return () => {
			handlers.forEach(({ element, enter, leave }) => {
				element.removeEventListener("mouseenter", enter);
				element.removeEventListener("mouseleave", leave);
			});
		};
	}, [ref, selector]);
}

/**
 * Hook for simple hover scale effect
 */
export function useScaleHover(
	ref: RefObject<HTMLElement | null>,
	options: {
		scale?: number;
		duration?: number;
		selector?: string;
	} = {}
) {
	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const { scale = 1.05, duration = 0.3, selector } = options;

		const target = selector ? element.querySelector(selector) : element;

		if (!target) return;

		const handleMouseEnter = () => {
			gsap.to(target, {
				scale,
				duration,
				ease: "power2.out",
			});
		};

		const handleMouseLeave = () => {
			gsap.to(target, {
				scale: 1,
				duration,
				ease: "power2.out",
			});
		};

		target.addEventListener("mouseenter", handleMouseEnter);
		target.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			target.removeEventListener("mouseenter", handleMouseEnter);
			target.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [ref, options.scale, options.duration, options.selector, options]);
}
