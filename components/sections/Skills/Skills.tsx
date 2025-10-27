"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/Button";
import { skillCategories } from "@/data/skills";
import { Section } from "@/lib/types";
import { useRef } from "react";
import { SkillCard } from "./SkillCard";

export function Skills({
	onNavigate,
}: {
	onNavigate: (section: Section) => void;
}) {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="flex size-full items-center justify-center px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-7xl">
				{/* Header */}
				<SectionHeader
					badge="My Expertise"
					title="Skills & Technologies"
					description="A comprehensive set of modern tools and technologies I use to build exceptional digital experiences"
				/>

				{/* Skills Grid */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
					{skillCategories.map((category, index) => (
						<SkillCard
							key={index}
							title={category.title}
							icon={category.icon}
							color={category.color}
							skills={category.skills}
							index={index}
						/>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="mt-12 text-center md:mt-16">
					<p className="mb-6 text-gray-400">Interested in working together?</p>
					<Button
						variant="primary"
						size="lg"
						onClick={() => {
							onNavigate("contact");
						}}
					>
						Let&apos;s Talk
					</Button>
				</div>
			</div>
		</div>
	);
}
