"use client";

import { Navigation } from "@/components/layout/Navigation";
// import { SocialLinks } from "@/components/layout/SocialLinks";
import { Hero } from "@/components/sections/Hero/Hero";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { Section } from "@/lib/types";
import {  ScrollSmoother, ScrollTrigger } from "@/lib/utils/gsap-config";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const MOBILE_REGEX = /iPhone|iPad|iPod|Android/i;

const SectionLoader = () => <LoadingSpinner fullScreen />;

// Dynamically import heavy section components for better code splitting
const About = dynamic(
	() =>
		import("@/components/sections/About/About").then((mod) => ({
			default: mod.About,
		})),
	{ loading: SectionLoader }
);

const Skills = dynamic(
	() =>
		import("@/components/sections/Skills/Skills").then((mod) => ({
			default: mod.Skills,
		})),
	{ loading: SectionLoader }
);

const Journey = dynamic(
	() =>
		import("@/components/sections/Journey/Journey").then((mod) => ({
			default: mod.Journey,
		})),
	{ loading: SectionLoader }
);

const Experience = dynamic(
	() =>
		import("@/components/sections/Experience/Experience").then((mod) => ({
			default: mod.Experience,
		})),
	{ loading: SectionLoader }
);

const Projects = dynamic(
	() =>
		import("@/components/sections/Projects/Projects").then((mod) => ({
			default: mod.Projects,
		})),
	{ loading: SectionLoader }
);

// const Testimonials = dynamic(
// 	() =>
// 		import("@/components/sections/Testimonials/Testimonials").then((mod) => ({
// 			default: mod.Testimonials,
// 		})),
// 	{
// 		loading: () => <LoadingSpinner fullScreen />,
// 	}
// );

const Contact = dynamic(
	() =>
		import("@/components/sections/Contact/Contact").then((mod) => ({
			default: mod.Contact,
		})),
	{ loading: SectionLoader }
);

export default function Home() {
	const [currentSection, setCurrentSection] = useState<Section>("hero");
	const pendingSectionRef = useRef<Section | null>(null);
	const smootherRef = useRef<ScrollSmoother | null>(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);
	const skillsRef = useRef<HTMLDivElement>(null);
	const journeyRef = useRef<HTMLDivElement>(null);
	const experienceRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);

	// Initialize ScrollSmoother
	useGSAP(() => {
		const isMobile = MOBILE_REGEX.test(navigator.userAgent);

		smootherRef.current = ScrollSmoother.create({
			smooth: isMobile ? 0 : 2, // No artificial smoothing on mobile
			effects: isMobile ? false : true,
			smoothTouch: false, // Let native touch scrolling handle it
			normalizeScroll: isMobile ? true : false, // Keep normalizeScroll on mobile for consistent ScrollTrigger scrub
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
			contact: contactRef,
		};

		const targetElement = refs[section].current;
		if (targetElement) {
			if (smootherRef.current) {
				smootherRef.current.scrollTo(targetElement, true, "top top");
			} else {
				targetElement.scrollIntoView({ behavior: "smooth" });
			}
		}

		setCurrentSection(section);
		pendingSectionRef.current = section;
		window.history.replaceState(null, "", `#${section}`);
	};

	// Handle initial URL hash on load
	useEffect(() => {
		const hash = window.location.hash.replace("#", "") as Section;
		const validSections: Section[] = ["hero", "about", "skills", "journey", "experience", "projects", "contact"];
		if (hash && validSections.includes(hash)) {
			// Delay to allow ScrollSmoother to initialize
			const timer = setTimeout(() => scrollToSection(hash), 300);
			return () => clearTimeout(timer);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (typeof window === "undefined") return;
		const prevRestoration = history.scrollRestoration;
		history.scrollRestoration = "manual";

		const scrollToTop = () => {
			if (smootherRef.current) {
				smootherRef.current.scrollTo(0, false);
			} else {
				window.scrollTo({ top: 0, left: 0, behavior: "auto" });
			}
		};

		scrollToTop();
		const timer = setTimeout(scrollToTop, 120);

		setCurrentSection("hero");
		pendingSectionRef.current = null;

		return () => {
			clearTimeout(timer);
			history.scrollRestoration = prevRestoration || "auto";
		};
	}, []);

	useEffect(() => {
		// Wait for ScrollSmoother to be ready
		const timer = setTimeout(() => {
			const sections = [
				{ ref: heroRef, id: "hero" as Section },
				{ ref: aboutRef, id: "about" as Section },
				{ ref: skillsRef, id: "skills" as Section },
				{ ref: journeyRef, id: "journey" as Section },
				{ ref: experienceRef, id: "experience" as Section },
				{ ref: projectsRef, id: "projects" as Section },
				{ ref: contactRef, id: "contact" as Section },
			];

			// Create ScrollTrigger for each section to detect when it's active
			const triggers = sections.map(({ ref, id }) => {
				if (!ref.current) return null;

				return ScrollTrigger.create({
					trigger: ref.current,
					start: "top center",
					end: "bottom center",
					onEnter: () => {
						if (!pendingSectionRef.current) {
							setCurrentSection(id);
						}
					},
					onEnterBack: () => {
						if (!pendingSectionRef.current) {
							setCurrentSection(id);
						}
					},
				});
			});

			return () => {
				triggers.forEach((trigger) => trigger?.kill());
			};
		}, 100);

		return () => clearTimeout(timer);
	}, []);


	return (
		<div
			id="smooth-wrapper"
			className="relative size-full overflow-hidden bg-black text-white"
		>
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

				{/* <div
					ref={testimonialsRef}
					data-section="testimonials"
					className="min-h-screen"
				>
					<Testimonials />
				</div> */}

				<div ref={contactRef} data-section="contact" className="min-h-screen">
					<Contact />
				</div>
			</div>
		</div>
	);
}
