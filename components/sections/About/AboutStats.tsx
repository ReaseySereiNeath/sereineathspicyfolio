"use client";

import { stats } from "@/data/about";
import { gsap } from "@/lib/utils/gsap-config";
import { useEffect, useRef } from "react";

export function AboutStats() {
	const statsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = statsRef.current;
		if (!container) return;

		const ctx = gsap.context(() => {
			// Stats animation
			gsap.from(container.children, {
				opacity: 0,
				y: 20,
				scale: 0.9,
				duration: 0.6,
				stagger: 0.1,
				scrollTrigger: {
					trigger: container,
					start: "top 85%",
					toggleActions: "play none none reverse",
				},
			});

			// Stats hover effect setup
			const statCards = container.children;
			Array.from(statCards).forEach((card) => {
				const element = card as HTMLElement;
				element.addEventListener("mouseenter", () => {
					gsap.to(element, {
						scale: 1.05,
						borderColor: "rgba(59, 130, 246, 0.5)",
						duration: 0.3,
						ease: "power2.out",
					});
				});
				element.addEventListener("mouseleave", () => {
					gsap.to(element, {
						scale: 1,
						borderColor: "rgba(59, 130, 246, 0.1)",
						duration: 0.3,
						ease: "power2.out",
					});
				});
			});
		}, statsRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={statsRef} className="grid grid-cols-2 gap-4 pt-6">
			{stats.map((stat, index) => (
				<div
					key={index}
					className="cursor-default rounded-xl border border-blue-500/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-4 backdrop-blur-sm transition-all duration-300"
				>
					<stat.icon className="mb-2 h-6 w-6 text-blue-400" />
					<div className="mb-1 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-2xl text-transparent md:text-3xl">
						{stat.value}
					</div>
					<div className="text-xs text-gray-500 md:text-sm">{stat.label}</div>
				</div>
			))}
		</div>
	);
}
