"use client";

import { Navigation } from "@/components/layout/Navigation";
// import { SocialLinks } from "@/components/layout/SocialLinks";
import { Hero } from "@/components/sections/Hero/Hero";
import { LoadingSpinner } from "@/components/ui";
import type { Section } from "@/lib/types";
import { gsap, ScrollSmoother } from "@/lib/utils/gsap-config";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Dynamically import heavy section components for better code splitting
const About = dynamic(
	() =>
		import("@/components/sections/About/About").then((mod) => ({
			default: mod.About,
		})),
	{
		loading: () => <LoadingSpinner fullScreen />,
	}
);

const Skills = dynamic(
	() =>
		import("@/components/sections/Skills/Skills").then((mod) => ({
			default: mod.Skills,
		})),
	{
		loading: () => <LoadingSpinner fullScreen />,
	}
);

const Journey = dynamic(
	() =>
		import("@/components/sections/Journey/Journey").then((mod) => ({
			default: mod.Journey,
		})),
	{
		loading: () => <LoadingSpinner fullScreen />,
	}
);

const Experience = dynamic(
	() =>
		import("@/components/sections/Experience/Experience").then((mod) => ({
			default: mod.Experience,
		})),
	{
		loading: () => <LoadingSpinner fullScreen />,
	}
);

const Projects = dynamic(
	() =>
		import("@/components/sections/Projects/Projects").then((mod) => ({
			default: mod.Projects,
		})),
	{
		loading: () => <LoadingSpinner fullScreen />,
	}
);

const Testimonials = dynamic(
	() =>
		import("@/components/sections/Testimonials/Testimonials").then((mod) => ({
			default: mod.Testimonials,
		})),
	{
		loading: () => <LoadingSpinner fullScreen />,
	}
);

const Contact = dynamic(
	() =>
		import("@/components/sections/Contact/Contact").then((mod) => ({
			default: mod.Contact,
		})),
	{
		loading: () => <LoadingSpinner fullScreen />,
	}
);

export default function Home() {
	const [currentSection, setCurrentSection] = useState<Section>("hero");
	const smootherRef = useRef<ScrollSmoother | null>(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);
	const skillsRef = useRef<HTMLDivElement>(null);
	const journeyRef = useRef<HTMLDivElement>(null);
	const experienceRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);
	const testimonialsRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);
	const orb1Ref = useRef<HTMLDivElement>(null);
	const orb2Ref = useRef<HTMLDivElement>(null);

	// Initialize ScrollSmoother
	useGSAP(() => {
		smootherRef.current = ScrollSmoother.create({
			smooth: 2,
			effects: true,
			smoothTouch: 0.1,
		});
	}, []);

	const scrollToSection = (section: Section) => {
		const refs = {
			hero: heroRef,
			about: aboutRef,
			skills: skillsRef,
			journey: journeyRef,
			experience: experienceRef,
			projects: projectsRef,
			testimonials: testimonialsRef,
			contact: contactRef,
		};

		const targetElement = refs[section].current;
		if (targetElement && smootherRef.current) {
			smootherRef.current.scrollTo(targetElement, true, "top top");
		}
	};

	useEffect(() => {
		// Use scroll-based detection for more accurate section tracking
		// This works better with sections that have negative margins or complex layouts
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const sections = [
						{ ref: heroRef, id: "hero" as Section },
						{ ref: aboutRef, id: "about" as Section },
						{ ref: skillsRef, id: "skills" as Section },
						{ ref: journeyRef, id: "journey" as Section },
						{ ref: experienceRef, id: "experience" as Section },
						{ ref: projectsRef, id: "projects" as Section },
						{ ref: testimonialsRef, id: "testimonials" as Section },
						{ ref: contactRef, id: "contact" as Section },
					];

					// Find the section that's closest to the top of the viewport (with offset)
					const offset = window.innerHeight * 0.3; // 30% from top
					let currentSectionId: Section = "hero";
					let minDistance = Infinity;

					sections.forEach(({ ref, id }) => {
						if (ref.current) {
							const rect = ref.current.getBoundingClientRect();
							const distance = Math.abs(rect.top - offset);

							// If this section is in view and closer to our target position
							if (
								rect.top < window.innerHeight &&
								rect.bottom > 0 &&
								distance < minDistance
							) {
								minDistance = distance;
								currentSectionId = id;
							}
						}
					});

					setCurrentSection(currentSectionId);
					ticking = false;
				});

				ticking = true;
			}
		};

		// Initial check
		handleScroll();

		// Listen to scroll events
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		// Background orbs animation
		gsap.to(orb1Ref.current, {
			scale: 1.2,
			opacity: 0.5,
			duration: 10,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
		});

		gsap.to(orb2Ref.current, {
			scale: 1.2,
			opacity: 0.4,
			duration: 12,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
		});
	}, []);

	return (
		<div
			id="smooth-wrapper"
			className="relative size-full overflow-hidden bg-black text-white"
		>
			{/* Animated background gradients - Fixed positioned elements stay outside smooth-content */}
			<div
				ref={orb1Ref}
				className="pointer-events-none fixed right-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-blue-500/30 via-blue-500/10 to-transparent blur-3xl"
			/>
			<div
				ref={orb2Ref}
				className="pointer-events-none fixed bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent blur-3xl"
			/>

			{/* Social Links */}
			{/* <SocialLinks /> */}

			{/* Navigation */}
			<Navigation
				currentSection={currentSection}
				onNavigate={scrollToSection}
			/>

			{/* Scrollable Content - ScrollSmoother wrapper */}
			<div id="smooth-content">
				<div ref={heroRef} data-section="hero" className="min-h-screen">
					<Hero />
				</div>

				<div ref={aboutRef} data-section="about" className="min-h-screen">
					<About />
				</div>

				<div ref={skillsRef} data-section="skills" className="min-h-screen">
					<Skills onNavigate={scrollToSection} />
				</div>

				<div ref={journeyRef} data-section="journey" className="min-h-screen">
					<Journey />
				</div>

				<div
					ref={experienceRef}
					data-section="experience"
					className="min-h-screen"
				>
					<Experience />
				</div>

				<div ref={projectsRef} data-section="projects" className="min-h-screen">
					<Projects />
				</div>

				<div
					ref={testimonialsRef}
					data-section="testimonials"
					className="min-h-screen"
				>
					<Testimonials />
				</div>

				<div ref={contactRef} data-section="contact" className="min-h-screen">
					<Contact />
				</div>
			</div>
		</div>
	);
}
