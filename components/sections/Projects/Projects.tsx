"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { projects } from "@/data/projects";
import { useRef } from "react";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="flex size-full items-center justify-center px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-7xl">
				{/* Header */}
				<SectionHeader
					badge="My Work"
					title="Featured Projects"
					description="A selection of projects that showcase my expertise in building modern web applications"
				/>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
					{projects.map((project, index) => (
						<ProjectCard
							key={index}
							title={project.title}
							description={project.description}
							tech={project.tech}
							gradient={project.gradient}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
