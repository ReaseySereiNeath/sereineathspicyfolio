"use client";

import { useCardHover } from "@/lib/hooks/useCardHover";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { gsap } from "@/lib/utils/gsap-config";
import { Quote, Star } from "lucide-react";
import { useEffect, useRef } from "react";

interface TestimonialCardProps {
	name: string;
	role: string;
	content: string;
	rating: number;
	image: string;
}

export function TestimonialCard({
	name,
	role,
	content,
	rating,
	image,
}: TestimonialCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	// Use scroll reveal hook
	useScrollReveal(cardRef, { y: 50 });

	// Use card hover hook
	useCardHover(cardRef, { glowOpacity: 1 });

	// Stars animation
	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const ctx = gsap.context(() => {
			const stars = card.querySelectorAll(".star-icon");

			gsap.from(stars, {
				opacity: 0,
				scale: 0,
				duration: 0.3,
				stagger: 0.05,
				scrollTrigger: {
					trigger: card,
					start: "top 85%",
					toggleActions: "play none none reverse",
				},
			});
		}, cardRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={cardRef} className="group relative">
			{/* Glow effect */}
			<div className="glow-effect absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 blur-xl transition-opacity duration-500" />

			{/* Card */}
			<div className="testimonial-content relative h-full rounded-2xl border border-indigo-500/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-indigo-500/30 md:p-8">
				{/* Quote icon */}
				<div className="absolute right-6 top-6 opacity-10">
					<Quote className="h-12 w-12 text-indigo-400" />
				</div>

				{/* Rating */}
				<div className="mb-4 flex gap-1">
					{[...Array(rating)].map((_, i) => (
						<div key={i} className="star-icon">
							<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
						</div>
					))}
				</div>

				{/* Content */}
				<p className="relative z-10 mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
					&ldquo;{content}&rdquo;
				</p>

				{/* Author */}
				<div className="flex items-center gap-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-2xl">
						{image}
					</div>
					<div>
						<div className="text-white">{name}</div>
						<div className="text-sm text-gray-500">{role}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
