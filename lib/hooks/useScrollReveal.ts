"use client";

import { RefObject, useEffect } from "react";
import { gsap, SCROLL_TRIGGER_DEFAULTS } from "../utils/gsap-config";

export interface ScrollRevealOptions {
	opacity?: number;
	y?: number;
	x?: number;
	duration?: number;
	delay?: number;
	stagger?: number;
	start?: string;
	toggleActions?: string;
	ease?: string;
}

/**
 * Hook for scroll-triggered reveal animations
 * Automatically handles ScrollTrigger setup and cleanup
 */
export function useScrollReveal(
	ref: RefObject<HTMLElement | null>,
	options: ScrollRevealOptions = {}
) {
	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const ctx = gsap.context(() => {
			const {
				opacity = 0,
				y = 50,
				x,
				duration = 0.6,
				delay = 0,
				stagger,
				start = SCROLL_TRIGGER_DEFAULTS.start,
				toggleActions = SCROLL_TRIGGER_DEFAULTS.toggleActions,
				ease = "power2.out",
			} = options;

			const animationProps: gsap.TweenVars = {
				opacity,
				duration,
				delay,
				ease,
				scrollTrigger: {
					trigger: element,
					start,
					toggleActions,
				},
			};

			// Add optional transforms
			if (y !== undefined && y !== 0) animationProps.y = y;
			if (x !== undefined && x !== 0) animationProps.x = x;
			if (stagger) animationProps.stagger = stagger;

			gsap.from(element, animationProps);
		}, ref);

		return () => ctx.revert();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		ref,
		options.opacity,
		options.y,
		options.x,
		options.duration,
		options.delay,
		options.stagger,
		options.start,
		options.toggleActions,
		options.ease,
	]);
}

/**
 * Hook for revealing multiple children with stagger
 */
export function useScrollRevealChildren(
	ref: RefObject<HTMLElement | null>,
	options: ScrollRevealOptions = {}
) {
	useEffect(() => {
		const element = ref.current;
		if (!element || !element.children) return;

		const ctx = gsap.context(() => {
			const {
				opacity = 0,
				y = 30,
				duration = 0.8,
				stagger = 0.2,
				start = SCROLL_TRIGGER_DEFAULTS.start,
				toggleActions = SCROLL_TRIGGER_DEFAULTS.toggleActions,
				ease = "power2.out",
			} = options;

			gsap.from(element.children, {
				opacity,
				y,
				duration,
				stagger,
				ease,
				scrollTrigger: {
					trigger: element,
					start,
					toggleActions,
				},
			});
		}, ref);

		return () => ctx.revert();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		ref,
		options.opacity,
		options.y,
		options.duration,
		options.stagger,
		options.start,
		options.toggleActions,
		options.ease,
	]);
}
