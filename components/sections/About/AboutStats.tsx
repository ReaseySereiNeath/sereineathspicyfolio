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
			const statCards = Array.from(container.children);

			// Stats animation
			gsap.fromTo(
				statCards,
				{ opacity: 0, y: 20, scale: 0.9 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.6,
					stagger: 0.12,
					ease: "power2.out",
					immediateRender: false,
					scrollTrigger: {
						trigger: container,
						start: "top 85%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Stats hover effect setup
			statCards.forEach((card) => {
				const element = card as HTMLElement;
				element.addEventListener("mouseenter", () => {
					gsap.to(element, {
						scale: 1.05,
						borderColor: "rgba(59, 130, 246, 0.4)",
						duration: 0.3,
						ease: "power2.out",
					});
				});
				element.addEventListener("mouseleave", () => {
					gsap.to(element, {
						scale: 1,
						borderColor: "rgba(229, 231, 235, 1)",
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
					className="cursor-default rounded-xl border border-gray-200 bg-gray-50 p-4 transition-[transform,border-color] duration-300"
				>
					<stat.icon className="mb-2 h-6 w-6 text-blue-600" aria-hidden="true" />
					<div className="mb-1 text-lg font-semibold text-gray-900 md:text-xl">
						{stat.value}
					</div>
					<div className="text-xs text-gray-500 md:text-sm">{stat.label}</div>
				</div>
			))}
		</div>
	);
}
