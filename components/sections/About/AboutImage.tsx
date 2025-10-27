"use client";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { parallaxScroll } from "@/lib/utils/animations";
import { gsap } from "@/lib/utils/gsap-config";
import { useEffect, useRef } from "react";

export function AboutImage() {
	const imageRef = useRef<HTMLDivElement>(null);
	const decorativeRef = useRef<HTMLDivElement>(null);

	// Use scroll reveal for image
	useScrollReveal(imageRef, { x: -50, y: 0, duration: 0.8 });

	useEffect(() => {
		// Parallax effect for image
		parallaxScroll(imageRef.current);

		// Decorative circle rotation
		gsap.to(decorativeRef.current, {
			rotation: 360,
			duration: 20,
			repeat: -1,
			ease: "none",
		});
	}, []);

	return (
		<div ref={imageRef} className="relative">
			<div className="relative mx-auto aspect-square max-w-md">
				{/* Glowing border effect */}
				<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 opacity-30 blur-xl" />

				{/* Main container */}
				<div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-8 backdrop-blur-sm">
					{/* Animated grid background */}
					<div className="absolute inset-0 opacity-10">
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
								backgroundSize: "30px 30px",
							}}
						/>
					</div>

					{/* Profile image placeholder */}
					<div className="relative z-10 mb-6 flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/20">
						<div className="flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-6xl">
							👨‍💻
						</div>
					</div>

					<div ref={decorativeRef} className="absolute right-8 top-1/4">
						<div className="h-16 w-16 rounded-full border-2 border-dashed border-blue-500/30" />
					</div>
				</div>
			</div>
		</div>
	);
}
