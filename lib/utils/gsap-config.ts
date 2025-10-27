"use client";

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register all GSAP plugins once
if (typeof window !== "undefined") {
	gsap.registerPlugin(
		ScrollTrigger,
		DrawSVGPlugin,
		MotionPathPlugin,
		ScrollSmoother
	);
}

// Export configured gsap instance
export { DrawSVGPlugin, gsap, MotionPathPlugin, ScrollSmoother, ScrollTrigger };

// Animation presets/defaults
export const ANIMATION_DEFAULTS = {
	duration: 0.6,
	ease: "power2.out",
	stagger: 0.1,
} as const;

export const SCROLL_TRIGGER_DEFAULTS = {
	start: "top 80%",
	toggleActions: "play none none reverse",
} as const;

export const HOVER_ANIMATION_DEFAULTS = {
	duration: 0.3,
	ease: "power2.out",
} as const;
