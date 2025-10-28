"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { testimonials } from "@/data/testimonials";
import { useRef } from "react";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="flex size-full items-center justify-center px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-7xl">
				{/* Header */}
				<SectionHeader
					badge="Testimonials"
					title="What Clients Say"
					description="Don't just take my word for it - hear from some of the clients I've had the pleasure of working with"
					badgeVariant="blue"
				/>

				{/* Testimonials Grid */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<TestimonialCard
							key={index}
							name={testimonial.name}
							role={testimonial.role}
							content={testimonial.content}
							rating={testimonial.rating}
							image={testimonial.image}
						/>
					))}
				</div>

				{/* Decorative elements */}
				<div className="pointer-events-none absolute left-0 top-1/2 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500/10 to-transparent blur-3xl" />
				<div className="pointer-events-none absolute bottom-1/4 right-0 h-64 w-64 rounded-full bg-gradient-to-l from-cyan-500/10 to-transparent blur-3xl" />
			</div>
		</div>
	);
}
