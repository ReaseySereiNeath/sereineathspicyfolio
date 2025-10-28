"use client";

import { useCardHover, useIconHover } from "@/lib/hooks/useCardHover";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";

interface ProjectCardProps {
	title: string;
	description: string;
	tech: string[];
	gradient: string;
}

export function ProjectCard({
	title,
	description,
	tech,
	gradient,
}: ProjectCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	// Use scroll reveal hook
	useScrollReveal(cardRef, { y: 50 });

	// Use card hover hook
	useCardHover(cardRef);

	// Use icon hover hook
	useIconHover(cardRef, ".project-icon");

	return (
		<div ref={cardRef} className="group relative cursor-pointer">
			{/* Glow effect */}
			<div
				className={`glow-effect absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 blur-xl transition-opacity duration-500`}
			/>

			{/* Card */}
			<div className="project-card-content relative h-full rounded-2xl border border-blue-500/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-blue-500/30 md:p-8">
				{/* Header */}
				<div className="mb-6 flex items-start justify-between">
					<div
						className={`bg-gradient-to-r p-3 ${gradient} rounded-xl shadow-lg`}
					>
						<div className="h-6 w-6 rounded bg-white/20 backdrop-blur-sm" />
					</div>
					<div className="flex gap-2">
						<div className="project-icon rounded-lg border border-blue-500/20 bg-gray-800/50 p-2 transition-all duration-300 hover:border-blue-500/50">
							<Github className="h-4 w-4 text-gray-400" />
						</div>
						<div className="project-icon rounded-lg border border-blue-500/20 bg-gray-800/50 p-2 transition-all duration-300 hover:border-blue-500/50">
							<ExternalLink className="h-4 w-4 text-gray-400" />
						</div>
					</div>
				</div>

				{/* Content */}
				<h3 className="mb-3 text-xl text-white md:text-2xl">{title}</h3>
				<p className="mb-6 text-sm leading-relaxed text-gray-400 md:text-base">
					{description}
				</p>

				{/* Tech stack */}
				<div className="flex flex-wrap gap-2">
					{tech.map((item, i) => (
						<span
							key={i}
							className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs text-gray-300"
						>
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
