"use client";

import { useCardHover } from "@/lib/hooks/useCardHover";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { gsap } from "@/lib/utils/gsap-config";
import { LucideIcon, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

interface SkillCardProps {
	title: string;
	icon: LucideIcon;
	color: string;
	skills: string[];
	index: number;
}

export function SkillCard({
	title,
	icon: Icon,
	color,
	skills,
	index,
}: SkillCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	// Use scroll reveal hook with delay based on index
	useScrollReveal(cardRef, {
		y: 50,
		duration: 0.6,
		delay: index * 0.1,
	});

	// Use card hover hook
	useCardHover(cardRef);

	// Skills badges hover animation
	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const skillBadges = card.querySelectorAll(".skill-badge");

		const handlers: Array<{
			element: Element;
			enter: () => void;
			leave: () => void;
		}> = [];

		skillBadges.forEach((skill) => {
			const handleMouseEnter = () => {
				gsap.to(skill, {
					scale: 1.1,
					backgroundColor: "rgba(59, 130, 246, 0.2)",
					duration: 0.3,
				});
			};

			const handleMouseLeave = () => {
				gsap.to(skill, {
					scale: 1,
					backgroundColor: "rgba(59, 130, 246, 0.1)",
					duration: 0.3,
				});
			};

			skill.addEventListener("mouseenter", handleMouseEnter);
			skill.addEventListener("mouseleave", handleMouseLeave);

			handlers.push({
				element: skill,
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
	}, []);

	return (
		<div ref={cardRef} className="group relative">
			{/* Glow effect */}
			<div
				className={`glow-effect absolute inset-0 bg-gradient-to-r ${color} rounded-2xl opacity-0 blur-xl transition-opacity duration-500`}
			/>

			{/* Card */}
			<div className="card-content relative h-full rounded-2xl border border-blue-500/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-blue-500/30 md:p-8">
				{/* Icon */}
				<div className="mb-6 flex items-center gap-4">
					<div className={`bg-gradient-to-r p-3 ${color} rounded-xl`}>
						<Icon className="h-6 w-6 text-white" />
					</div>
					<h3 className="text-xl md:text-2xl">{title}</h3>
				</div>

				{/* Skills list */}
				<div className="flex flex-wrap gap-2">
					{skills.map((skill, skillIndex) => (
						<span
							key={skillIndex}
							className="skill-badge cursor-default rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-sm text-gray-300 transition-all duration-300"
						>
							{skill}
						</span>
					))}
				</div>

				{/* Decorative corner */}
				<div className="absolute right-4 top-4 h-12 w-12 opacity-10">
					<Zap className="h-full w-full text-blue-400" />
				</div>
			</div>
		</div>
	);
}
