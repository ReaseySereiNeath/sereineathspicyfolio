"use client";

import { gsap } from "gsap";
import { Github, Globe, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

const socialLinks = [
	{ icon: Github, href: "#", label: "GitHub" },
	{ icon: Linkedin, href: "#", label: "LinkedIn" },
	{ icon: Globe, href: "#", label: "Website" },
	{ icon: Mail, href: "#", label: "Email" },
];

export function SocialLinks() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Set initial states to hidden
			gsap.set(containerRef.current, { opacity: 0, y: -20 });

			// Individual links with stagger
			const links = containerRef.current?.children || [];
			gsap.set(links, { opacity: 0, scale: 0 });

			// Container entrance
			gsap.to(containerRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				delay: 0.8,
			});

			// Animate links in
			Array.from(links).forEach((link, index) => {
				const element = link as HTMLElement;

				gsap.to(element, {
					opacity: 1,
					scale: 1,
					duration: 0.4,
					delay: 0.9 + index * 0.1,
					ease: "back.out(1.7)",
				});

				// Hover animations
				element.addEventListener("mouseenter", () => {
					gsap.to(element, {
						scale: 1.15,
						y: -3,
						duration: 0.3,
						ease: "back.out(1.7)",
					});

					// Glow effect
					const glowEffect = element.querySelector(".glow-effect");
					gsap.to(glowEffect, {
						opacity: 0.2,
						duration: 0.3,
					});
				});

				element.addEventListener("mouseleave", () => {
					gsap.to(element, {
						scale: 1,
						y: 0,
						duration: 0.3,
						ease: "power2.out",
					});

					// Glow effect
					const glowEffect = element.querySelector(".glow-effect");
					gsap.to(glowEffect, {
						opacity: 0,
						duration: 0.3,
					});
				});

				// Icon rotation on tap/click
				element.addEventListener("click", () => {
					gsap.to(element, {
						rotation: 360,
						duration: 0.6,
						ease: "back.out(1.7)",
						onComplete: () => {
							gsap.set(element, { rotation: 0 });
						},
					});
				});
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={containerRef}
			className="fixed left-4 top-4 z-50 flex gap-3 md:left-8 md:top-8"
		>
			{socialLinks.map((link) => (
				<a
					key={link.label}
					href={link.href}
					aria-label={link.label}
					className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/10 bg-gradient-to-br from-gray-900/80 to-gray-800/80 text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30"
				>
					{/* Glow effect */}
					<div className="glow-effect absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 blur-xl transition-opacity duration-300" />

					<link.icon className="relative z-10 h-5 w-5 transition-colors duration-300 group-hover:text-blue-400" />
				</a>
			))}
		</div>
	);
}
