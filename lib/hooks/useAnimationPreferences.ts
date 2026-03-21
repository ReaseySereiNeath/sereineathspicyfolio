"use client";

import { useEffect, useState } from "react";

/**
 * Hook for detecting animation preferences and device capabilities
 * Used to optimize animations for mobile devices and respect user preferences
 */
export function useAnimationPreferences() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Check reduced motion preference
		const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(motionQuery.matches);

		const handleMotionChange = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches);
		};
		motionQuery.addEventListener("change", handleMotionChange);

		// Check if mobile/tablet device
		// Tablets (< 1024px with touch) also need simplified animations for smooth scrolling
		const checkMobile = () => {
			const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
			const isMobileOrTablet = window.innerWidth < 1024;
			setIsMobile(isMobileOrTablet && isTouchDevice);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile, { passive: true });

		return () => {
			motionQuery.removeEventListener("change", handleMotionChange);
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	return {
		prefersReducedMotion,
		isMobile,
		// Simplified animations should be used on mobile or when user prefers reduced motion
		shouldSimplifyAnimations: prefersReducedMotion || isMobile,
	};
}

/**
 * Non-hook utility for immediate checks (useful in GSAP callbacks)
 * Detects mobile phones AND tablets for animation optimization
 */
export function getAnimationPreferences() {
	if (typeof window === "undefined") {
		return { prefersReducedMotion: false, isMobile: false, shouldSimplifyAnimations: false };
	}

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	// Include tablets (< 1024px) - they also benefit from simplified animations
	const isMobileOrTablet = window.innerWidth < 1024;
	const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
	const isMobile = isMobileOrTablet && isTouchDevice;

	return {
		prefersReducedMotion,
		isMobile,
		// Simplify for reduced motion preference OR mobile/tablet devices
		shouldSimplifyAnimations: prefersReducedMotion || isMobile,
	};
}
