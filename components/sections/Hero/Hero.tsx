"use client";

import { Badge, Button } from "@/components/ui";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

/**
 * Text gradient variants
 */
const textGradientVariants = tv({
	base: "bg-gradient-to-r bg-clip-text text-transparent",
	variants: {
		variant: {
			white: "from-white to-gray-400",
			whiteGray: "from-white via-gray-200 to-gray-400",
			blue: "from-blue-400 to-blue-500",
			blueVia: "from-blue-400 via-blue-300 to-blue-500",
			cyan: "from-cyan-400 to-blue-500",
			indigo: "from-blue-400 to-indigo-500",
		},
	},
	defaultVariants: {
		variant: "white",
	},
});

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const greetingRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const buttonsRef = useRef<HTMLDivElement>(null);
	const scrollIndicatorRef = useRef<HTMLDivElement>(null);
	const orb1Ref = useRef<HTMLDivElement>(null);
	const orb2Ref = useRef<HTMLDivElement>(null);
	const particlesRef = useRef<HTMLDivElement>(null);

	// Generate fixed particle positions to avoid hydration mismatch
	const particlePositions = useMemo(() => {
		// Use a seeded approach for consistent positions
		const positions = [];
		for (let i = 0; i < 20; i++) {
			// Generate positions based on index for consistency
			positions.push({
				left: (i * 37 + 23) % 100,
				top: (i * 43 + 17) % 100,
			});
		}
		return positions;
	}, []);

	// Memoized scroll handlers for buttons
	const scrollToProjects = useCallback(() => {
		document
			.querySelector('[data-section="projects"]')
			?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const scrollToContact = useCallback(() => {
		document
			.querySelector('[data-section="contact"]')
			?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Initial entrance animations
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			tl.from(greetingRef.current, {
				opacity: 0,
				y: 20,
				duration: 0.6,
				delay: 0.2,
			})
				.from(
					headingRef.current?.children || [],
					{
						opacity: 0,
						y: 30,
						duration: 0.8,
						stagger: 0.2,
					},
					"-=0.4"
				)
				.from(
					descriptionRef.current,
					{
						opacity: 0,
						y: 20,
						duration: 0.8,
					},
					"-=0.4"
				)
				.from(
					buttonsRef.current?.children || [],
					{
						opacity: 0,
						y: 20,
						duration: 0.8,
						stagger: 0.1,
					},
					"-=0.4"
				)
				.from(
					scrollIndicatorRef.current,
					{
						opacity: 0,
						y: -20,
						duration: 0.8,
					},
					"-=0.6"
				);

			// Parallax effect on scroll
			gsap.to(contentRef.current, {
				y: 200,
				opacity: 0,
				ease: "none",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "bottom top",
					scrub: 1,
				},
			});

			// Continuous animations
			gsap.to(orb1Ref.current, {
				scale: 1.2,
				opacity: 0.5,
				duration: 8,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			gsap.to(orb2Ref.current, {
				scale: 1.2,
				opacity: 0.4,
				duration: 10,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			// Scroll indicator animation
			const chevron = scrollIndicatorRef.current?.querySelector(".chevron");
			if (chevron) {
				gsap.to(chevron, {
					y: 10,
					duration: 2,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}

			// Particles animation
			const particles = particlesRef.current?.children || [];
			Array.from(particles).forEach((particle) => {
				gsap.to(particle, {
					y: -30,
					opacity: 1,
					scale: 1.5,
					duration: gsap.utils.random(3, 5),
					repeat: -1,
					yoyo: true,
					delay: gsap.utils.random(0, 2),
					ease: "sine.inOut",
				});
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24"
		>
			{/* Animated background gradient orbs */}
			<div
				ref={orb1Ref}
				className="absolute -right-48 top-1/4 h-96 w-96 rounded-full bg-gradient-to-l blur-3xl glow-blue"
			/>
			<div
				ref={orb2Ref}
				className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-gradient-to-r blur-3xl glow-blue-light"
			/>

			<div ref={contentRef} className="z-10 max-w-5xl text-center">
				{/* Greeting */}
				<div ref={greetingRef} className="mb-6">
					<Badge variant="blue">👋 Welcome to my portfolio</Badge>
				</div>

				{/* Main heading */}
				<h1
					ref={headingRef}
					className="mb-6 text-4xl sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl xl:text-8xl"
				>
					<span
						className={twMerge(
							"mb-2 block",
							textGradientVariants({ variant: "whiteGray" })
						)}
					>
						I&apos;m Reasey
					</span>
					<span
						className={twMerge(
							"block",
							textGradientVariants({ variant: "blueVia" })
						)}
					>
						Full-Stack Developer
					</span>
				</h1>

				{/* Description */}
				<p
					ref={descriptionRef}
					className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg md:mb-12 md:text-xl"
				>
					Crafting exceptional digital experiences with modern technologies.
					Specialized in building scalable web applications that make an impact.
				</p>

				{/* CTA Buttons */}
				<div
					ref={buttonsRef}
					className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
				>
					<Button variant="primary" size="lg" onClick={scrollToProjects}>
						View My Work
					</Button>

					<Button variant="secondary" size="lg" onClick={scrollToContact}>
						Get In Touch
					</Button>
				</div>
			</div>

			{/* Scroll indicator */}
			<div
				ref={scrollIndicatorRef}
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
			>
				<div className="flex flex-col items-center gap-2 text-gray-500">
					<span className="text-sm">Scroll to explore</span>
					<ChevronDown className="chevron h-5 w-5" />
				</div>
			</div>

			{/* Floating particles */}
			<div
				ref={particlesRef}
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				{particlePositions.map((position, i) => (
					<div
						key={i}
						className="absolute h-1 w-1 rounded-full bg-blue-500/30 opacity-0"
						style={{
							left: `${position.left}%`,
							top: `${position.top}%`,
						}}
					/>
				))}
			</div>
		</div>
	);
}
