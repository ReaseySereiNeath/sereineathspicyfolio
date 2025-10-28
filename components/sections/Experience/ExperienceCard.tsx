"use client";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { glowFadeIn, glowFadeOut, scaleIn } from "@/lib/utils/animations";
import { gsap } from "@/lib/utils/gsap-config";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

interface ExperienceCardProps {
	title: string;
	company: string;
	period: string;
	location: string;
	description: string;
}

export function ExperienceCard({
	title,
	company,
	period,
	location,
	description,
}: ExperienceCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const dotRef = useRef<HTMLDivElement>(null);

	// Use scroll reveal hook for card
	useScrollReveal(cardRef, { x: -50, y: 0, duration: 0.6 });

	// Timeline dot animation
	useEffect(() => {
		const dot = dotRef.current;
		const card = cardRef.current;
		if (!dot || !card) return;

		const ctx = gsap.context(() => {
			scaleIn(dot, { delay: 0.2 });
		}, cardRef);

		return () => ctx.revert();
	}, []);

	// Hover animations
	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const content = card.querySelector(".experience-content");
		const glow = card.querySelector(".glow-effect");

		const handleMouseEnter = () => {
			if (content) {
				gsap.to(content, {
					x: 10,
					duration: 0.3,
					ease: "power2.out",
				});
			}
			if (glow) {
				glowFadeIn(glow as HTMLElement, 1);
			}
		};

		const handleMouseLeave = () => {
			if (content) {
				gsap.to(content, {
					x: 0,
					duration: 0.3,
					ease: "power2.out",
				});
			}
			if (glow) {
				glowFadeOut(glow as HTMLElement);
			}
		};

		card.addEventListener("mouseenter", handleMouseEnter);
		card.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			card.removeEventListener("mouseenter", handleMouseEnter);
			card.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<div ref={cardRef} className="experience-card relative pl-20 md:pl-28">
			{/* Timeline dot */}
			<div
				ref={dotRef}
				className="timeline-dot absolute left-6 top-8 h-5 w-5 rounded-full border-4 border-black bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-500/50 md:left-10"
			/>

			{/* Card */}
			<div className="group relative">
				{/* Glow effect */}
				<div className="glow-effect absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-400/10 opacity-0 blur-xl transition-opacity duration-500" />

				{/* Content */}
				<div className="experience-content relative rounded-2xl border border-blue-500/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-blue-500/30 md:p-8">
					{/* Header */}
					<div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
						<div className="flex items-start gap-4">
							<div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 p-3">
								<Briefcase className="h-5 w-5 text-blue-400" />
							</div>
							<div>
								<h3 className="mb-1 text-xl text-white md:text-2xl">{title}</h3>
								<p className="text-sm text-gray-400 md:text-base">{company}</p>
							</div>
						</div>
						<div className="ml-16 flex items-center gap-2 text-sm text-gray-400 md:ml-0 md:text-base">
							<Calendar className="h-4 w-4" />
							<span>{period}</span>
						</div>
					</div>

					{/* Description */}
					<p className="mb-4 ml-16 text-sm leading-relaxed text-gray-300 md:ml-16 md:text-base">
						{description}
					</p>

					{/* Location */}
					<div className="ml-16 flex items-center gap-2 text-sm text-blue-400 md:ml-16">
						<MapPin className="h-4 w-4" />
						<span>{location}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
