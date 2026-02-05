"use client";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { getAnimationPreferences } from "@/lib/hooks/useAnimationPreferences";
import { gsap } from "@/lib/utils/gsap-config";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function AboutImage() {
	const imageRef = useRef<HTMLDivElement>(null);
	const imageElementRef = useRef<HTMLImageElement>(null);

	// Use scroll reveal for image - slide in from left
	useScrollReveal(imageRef, { x: -50, y: 0, duration: 0.8 });

	// Animated shadow effect - disabled on mobile for performance
	// Continuous filter animations are very expensive on mobile GPUs
	useEffect(() => {
		if (!imageElementRef.current) return;

		const { shouldSimplifyAnimations } = getAnimationPreferences();

		// Skip continuous animation on mobile - use static shadow instead
		if (shouldSimplifyAnimations) {
			return;
		}

		const tl = gsap.timeline({ repeat: -1, yoyo: true });
		tl.to(imageElementRef.current, {
			filter:
				"drop-shadow(0 30px 70px rgba(59, 130, 246, 0.8)) drop-shadow(0 15px 30px rgba(100, 150, 255, 0.5))",
			duration: 2,
			ease: "sine.inOut",
		});

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div ref={imageRef} className="relative flex items-center justify-center">
			<div className="relative">
				{/* Character image - clean, no container */}
				<Image
					ref={imageElementRef}
					src="/about-me.png"
					alt="About me - Developer illustration"
					width={350}
					height={650}
					className="h-auto w-auto max-h-[650px] object-contain will-change-[filter]"
					style={{
						filter:
							"drop-shadow(0 25px 50px rgba(59, 130, 246, 0.5)) drop-shadow(0 10px 20px rgba(100, 150, 255, 0.3))",
					}}
					priority
				/>
				{/* Ground shadow beneath feet */}
				<div
					className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2"
					style={{
						width: "180px",
						height: "30px",
						background:
							"radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 40%, transparent 70%)",
						borderRadius: "50%",
						filter: "blur(8px)",
					}}
				/>
			</div>
		</div>
	);
}
