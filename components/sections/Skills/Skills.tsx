"use client";

import { Section } from "@/lib/types";
import { gsap } from "@/lib/utils/gsap-config";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface TechItem {
	name: string;
	logo: string;
}

interface TechCategory {
	title: string;
	items: TechItem[];
}

const categories: TechCategory[] = [
	{
		title: "Frontend",
		items: [
			{ name: "React", logo: "/tech-logos/react.svg" },
			{ name: "Next.js", logo: "/tech-logos/nextjs.svg" },
			{ name: "TypeScript", logo: "/tech-logos/typescript.svg" },
			{ name: "Vue.js", logo: "/tech-logos/vuejs.svg" },
			{ name: "Nuxt.js", logo: "/tech-logos/nuxtjs.svg" },
			{ name: "Tailwind", logo: "/tech-logos/tailwind.svg" },
			{ name: "HTML5", logo: "/tech-logos/html5.svg" },
			{ name: "CSS3", logo: "/tech-logos/css.svg" },
			{ name: "JavaScript", logo: "/tech-logos/javascript.svg" },
			{ name: "Three.js", logo: "/tech-logos/threejs.svg" },
			{ name: "GSAP", logo: "/tech-logos/gsap.svg" },
			{ name: "Figma", logo: "/tech-logos/figma.svg" },
			{ name: "Unity", logo: "/tech-logos/unity.svg" },
		],
	},
	{
		title: "Backend",
		items: [
			{ name: "Node.js", logo: "/tech-logos/nodejs.svg" },
			{ name: "FastAPI", logo: "/tech-logos/fastapi.svg" },
			{ name: "Python", logo: "/tech-logos/python.svg" },
			{ name: "PostgreSQL", logo: "/tech-logos/postgresql.svg" },
			{ name: "Prisma", logo: "/tech-logos/prisma.svg" },
			{ name: "MongoDB", logo: "/tech-logos/mongodb.svg" },
		],
	},
	{
		title: "DevOps & Cloud",
		items: [
			{ name: "AWS", logo: "/tech-logos/aws.svg" },
			{ name: "Docker", logo: "/tech-logos/docker.svg" },
			{ name: "Linux", logo: "/tech-logos/linux.svg" },
			{ name: "Git", logo: "/tech-logos/git.svg" },
			{ name: "Cloudflare", logo: "/tech-logos/cloudflare.svg" },
			{ name: "Vercel", logo: "/tech-logos/vercel.svg" },
		],
	},
	{
		title: "Telecom / 5G",
		items: [
			{ name: "5G gNB", logo: "" },
			{ name: "Netpeer2", logo: "" },
			{ name: "Sysrepo", logo: "" },
		],
	},
	{
		title: "IDE, Package Manager & Version Control",
		items: [
			{ name: "VS Code", logo: "/tech-logos/vscode.svg" },
			{ name: "npm", logo: "/tech-logos/npm.svg" },
			{ name: "Windows", logo: "/tech-logos/windows.svg" },
			{ name: "GitHub", logo: "/tech-logos/github.svg" },
			{ name: "GitLab", logo: "/tech-logos/gitlab.svg" },
		],
	},
];

const BADGE_COLORS: Record<string, string> = {
	"5G gNB": "bg-emerald-600",
	Netpeer2: "bg-blue-600",
	Sysrepo: "bg-sky-600",
};

export function Skills(_props: {
	onNavigate: (section: Section) => void;
}) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const content = contentRef.current;
		const titleContainer = titleRef.current;
		if (!section || !content || !titleContainer) return;

		const ctx = gsap.context(() => {
			// Title entrance
			gsap.fromTo(
				titleContainer.children,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.15,
					ease: "power3.out",
					scrollTrigger: {
						trigger: section,
						start: "top 70%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Category rows staggered entrance
			const categoryRows = content.querySelectorAll(".tech-category");
			categoryRows.forEach((row, i) => {
				const label = row.querySelector(".category-label");
				const logos = row.querySelectorAll(".tech-logo");

				// Category label slides in
				gsap.fromTo(
					label,
					{ opacity: 0, x: -30 },
					{
						opacity: 1,
						x: 0,
						duration: 0.6,
						ease: "power2.out",
						scrollTrigger: {
							trigger: row,
							start: "top 85%",
							toggleActions: "play none none reverse",
						},
					}
				);

				// Logos pop in with stagger
				gsap.fromTo(
					logos,
					{
						opacity: 0,
						scale: 0,
						rotation: () => gsap.utils.random(-90, 90),
					},
					{
						opacity: 1,
						scale: 1,
						rotation: 0,
						duration: 0.5,
						stagger: 0.05,
						ease: "back.out(1.7)",
						scrollTrigger: {
							trigger: row,
							start: "top 85%",
							toggleActions: "play none none reverse",
						},
					}
				);

				// Gentle continuous float for each logo
				logos.forEach((logo, j) => {
					gsap.to(logo, {
						y: gsap.utils.random(-6, -12),
						duration: gsap.utils.random(2.5, 4),
						ease: "sine.inOut",
						repeat: -1,
						yoyo: true,
						delay: (i * 0.3) + (j * 0.1),
					});
				});
			});

			// Hover interactions
			const allLogos = content.querySelectorAll<HTMLElement>(".tech-logo");
			allLogos.forEach((logo) => {
				const onEnter = () => {
					gsap.to(logo, {
						scale: 1.2,
						filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
						duration: 0.3,
						ease: "back.out(1.7)",
					});
				};
				const onLeave = () => {
					gsap.to(logo, {
						scale: 1,
						filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.3))",
						duration: 0.3,
						ease: "power2.out",
					});
				};
				logo.addEventListener("mouseenter", onEnter);
				logo.addEventListener("mouseleave", onLeave);
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={sectionRef}
			className="flex size-full min-h-screen items-center justify-center bg-black px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-5xl">
				{/* Title */}
				<div ref={titleRef} className="mb-16 text-center">
					<h2 className="mb-4 text-5xl font-bold text-white md:text-7xl">
						Skills &amp; Technologies
					</h2>
					<p className="text-xl text-gray-400 md:text-2xl">
						A comprehensive set of modern tools and technologies I use to build exceptional digital experiences
					</p>
				</div>

				{/* Categories */}
				<div ref={contentRef} className="space-y-10">
					{categories.map((category) => (
						<div key={category.title} className="tech-category">
							<h3 className="category-label mb-5 text-sm font-semibold tracking-wide text-gray-400">
								{category.title}
							</h3>
							<div className="flex flex-wrap items-center gap-5">
								{category.items.map((item) =>
									item.logo ? (
										<div
											key={item.name}
											className="tech-logo cursor-pointer"
											title={item.name}
											style={{
												filter:
													"drop-shadow(0 6px 12px rgba(0,0,0,0.3))",
											}}
										>
											<Image
												src={item.logo}
												alt={item.name}
												width={44}
												height={44}
												draggable={false}
											/>
										</div>
									) : (
										<span
											key={item.name}
											className={`tech-logo inline-flex items-center rounded-md px-3 py-1.5 text-xs font-semibold text-white ${BADGE_COLORS[item.name] ?? "bg-gray-700"}`}
											style={{
												filter:
													"drop-shadow(0 6px 12px rgba(0,0,0,0.3))",
											}}
										>
											{item.name}
										</span>
									)
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
