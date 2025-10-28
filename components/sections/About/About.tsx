"use client";

import { useScrollRevealChildren } from "@/lib/hooks/useScrollReveal";
import { useRef } from "react";
import { AboutImage } from "./AboutImage";
import { AboutStats } from "./AboutStats";

export function About() {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	// Use scroll reveal for content children (badge, title, paragraphs)
	useScrollRevealChildren(contentRef, {
		y: 20,
		duration: 0.6,
		stagger: 0.2,
	});

	return (
		<div
			ref={containerRef}
			className="flex size-full h-screen items-center justify-center px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-7xl">
				<div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2">
					{/* Left side - Image/Visual */}
					<AboutImage />

					{/* Right side - Content */}
					<div ref={contentRef} className="space-y-6">
						<div>
							<span className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
								About Me
							</span>
							<h2 className="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl text-transparent sm:text-3xl md:text-4xl">
								Turning Ideas Into Reality
							</h2>
						</div>

						<p className="text-sm leading-relaxed text-gray-400 md:text-sm">
							I am a dedicated Software Engineer with experience in full-stack
							development and project management, currently working in Japan. My
							professional journey began in 2020, while I was still at
							university, when I received a school-recommended internship
							developing real projects for Japanese clients. This early hands-on
							experience led me to take on freelance projects in 2021 for a
							Singapore-based client, where I managed and collaborated with a
							small team to deliver high-quality solutions using agile
							development practices. In 2023, I joined a Japanese company as a
							full-time engineer, where I continue to focus on building modern,
							user-centered web applications with Next.js, and Python (FastAPI)
							for Local 5G systems.
						</p>

						<p className="text-base leading-relaxed text-gray-400 md:text-sm">
							I thrive in diverse, team-oriented environments and am always I
							thrive in diverse, team-oriented environments and am always eager
							to learn, take on new challenges, and create meaningful impact
							through technology.
						</p>

						{/* Stats */}
						<AboutStats />
					</div>
				</div>
			</div>
		</div>
	);
}
