"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { experiences } from "@/data/experiences";
import { useRef } from "react";
import { ExperienceCard } from "./ExperienceCard";

export function Experience() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="flex size-full items-center justify-center px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-5xl">
				{/* Header */}
				<SectionHeader
					badge="Career Path"
					title="Work Experience"
					description="My professional journey and the experiences that shaped my expertise"
				/>

				{/* Timeline */}
				<div className="relative">
					{/* Vertical line */}
					<div className="absolute bottom-0 left-8 top-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/50 to-blue-500/20 md:left-12" />

					<div className="space-y-8 md:space-y-12">
						{experiences.map((exp, index) => (
							<ExperienceCard
								key={index}
								title={exp.title}
								company={exp.company}
								period={exp.period}
								location={exp.location}
								description={exp.description}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
