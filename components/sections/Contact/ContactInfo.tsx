"use client";

import { contactMethods, socialLinks } from "@/data/contact";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { gsap } from "@/lib/utils/gsap-config";
import { useEffect, useRef } from "react";

export function ContactInfo() {
	const infoRef = useRef<HTMLDivElement>(null);

	// Use scroll reveal for main container
	useScrollReveal(infoRef, { x: -50, y: 0, duration: 0.8 });

	// Contact cards and social links animations
	useEffect(() => {
		const container = infoRef.current;
		if (!container) return;

		const ctx = gsap.context(() => {
			// Contact method cards
			const contactCards = container.querySelectorAll(".contact-card");
			contactCards.forEach((card, index) => {
				const element = card as HTMLElement;

				gsap.from(element, {
					opacity: 0,
					x: -20,
					duration: 0.6,
					delay: index * 0.1,
					scrollTrigger: {
						trigger: element,
						start: "top 85%",
						toggleActions: "play none none reverse",
					},
				});

				element.addEventListener("mouseenter", () => {
					gsap.to(element, {
						x: 10,
						duration: 0.3,
						ease: "power2.out",
					});
				});

				element.addEventListener("mouseleave", () => {
					gsap.to(element, {
						x: 0,
						duration: 0.3,
						ease: "power2.out",
					});
				});
			});

			// Social links animation
			const socialIcons = container.querySelectorAll(".social-icon");
			socialIcons.forEach((icon, index) => {
				const element = icon as HTMLElement;

				gsap.from(element, {
					opacity: 0,
					scale: 0,
					duration: 0.4,
					delay: index * 0.1,
					scrollTrigger: {
						trigger: element,
						start: "top 85%",
						toggleActions: "play none none reverse",
					},
				});

				element.addEventListener("mouseenter", () => {
					gsap.to(element, {
						scale: 1.2,
						rotation: 5,
						duration: 0.3,
						ease: "back.out(1.7)",
					});
				});

				element.addEventListener("mouseleave", () => {
					gsap.to(element, {
						scale: 1,
						rotation: 0,
						duration: 0.3,
						ease: "power2.out",
					});
				});
			});
		}, infoRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={infoRef} className="space-y-8">
			<div>
				<h3 className="mb-6 text-2xl md:text-3xl">Contact Information</h3>
				<p className="mb-8 text-gray-400">
					Feel free to reach out through any of these channels. I&apos;m always
					open to discussing new projects and opportunities.
				</p>
			</div>

			{/* Contact methods */}
			<div className="space-y-4">
				{contactMethods.map((info, index) => (
					<a
						key={index}
						href={info.href || "#"}
						className={`contact-card flex items-center gap-4 rounded-xl border border-indigo-500/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 ${
							!info.href ? "pointer-events-none" : ""
						}`}
					>
						<div className="rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3">
							<info.icon className="h-5 w-5 text-indigo-400" />
						</div>
						<div>
							<div className="text-sm text-gray-500">{info.label}</div>
							<div className="text-white">{info.value}</div>
						</div>
					</a>
				))}
			</div>

			{/* Social Links */}
			<div>
				<h4 className="mb-4 text-lg">Follow Me</h4>
				<div className="flex gap-4">
					{socialLinks.map((social, index) => (
						<a
							key={index}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className={`social-icon rounded-lg border border-indigo-500/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 ${social.color}`}
						>
							<social.icon className="h-5 w-5" />
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
