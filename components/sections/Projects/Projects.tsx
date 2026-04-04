"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { projects } from "@/data/projects";
import { gsap, ScrollTrigger } from "@/lib/utils/gsap-config";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";
import { ProjectCard } from "./ProjectCard";

// --- MacBook Frame ---
function MacBookFrame({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative w-full select-none">
			{/* Screen housing */}
			<div
				className="relative rounded-[14px] overflow-hidden"
				style={{
					background: "#1c1c1e",
					padding: "4px",
					boxShadow:
						"0 0 0 1px #2a2a2c, 0 0 0 2px #111, 0 50px 100px rgba(0,0,0,0.9), 0 20px 40px rgba(0,0,0,0.6)",
				}}
			>
				{/* Screen bezel */}
				<div
					className="relative overflow-hidden rounded-[11px] bg-black"
					style={{ aspectRatio: "16/10" }}
				>
					{/* Camera */}
					<div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#2a2a2c] z-20" />
					{/* Screen content area */}
					<div className="relative w-full h-full">{children}</div>
				</div>
			</div>
			{/* Hinge */}
			<div
				className="h-[3px]"
				style={{
					background:
						"linear-gradient(90deg, #111 0%, #2c2c2e 20%, #3a3a3c 50%, #2c2c2e 80%, #111 100%)",
				}}
			/>
			{/* Base */}
			<div className="relative">
				<div
					className="w-full h-[14px] rounded-b-[8px]"
					style={{
						background:
							"linear-gradient(180deg, #2c2c2e 0%, #1c1c1e 60%, #141414 100%)",
						boxShadow: "0 6px 24px rgba(0,0,0,0.7)",
					}}
				/>
				{/* Indent notch */}
				<div
					className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[5px] rounded-b-[4px]"
					style={{ background: "#0a0a0a" }}
				/>
			</div>
			{/* Ground shadow */}
			<div
				className="absolute -bottom-6 left-[10%] right-[10%] h-6 rounded-full"
				style={{
					background: "rgba(0,0,0,0.5)",
					filter: "blur(16px)",
				}}
			/>
		</div>
	);
}

// --- Mock UI screen per project ---
function ProjectScreen({
	project,
	index,
}: {
	project: (typeof projects)[0];
	index: number;
}) {
	const layout = index % 3;

	return (
		<div className="w-full h-full flex flex-col bg-[#0d0d0d]">
			{/* Browser chrome */}
			<div className="flex items-center px-3 py-[7px] bg-[#1a1a1a] border-b border-[#2a2a2a] gap-2 flex-shrink-0">
				<div className="flex gap-1.5">
					<div className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
					<div className="w-[9px] h-[9px] rounded-full bg-[#febc2e]" />
					<div className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
				</div>
				<div className="flex-1 mx-2 h-[16px] bg-[#2a2a2a] rounded-full flex items-center px-2 gap-1">
					<div className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
					<span className="text-[7px] text-[#555]">localhost:3000</span>
				</div>
			</div>

			{/* App body */}
			<div
				className={`flex-1 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
			>
				{/* Top nav */}
				<div className="h-[28px] bg-black/25 flex items-center px-3 gap-2 backdrop-blur-sm border-b border-white/10">
					<div className="w-14 h-[7px] bg-white/50 rounded-full" />
					<div className="flex gap-2 ml-2">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="w-8 h-[6px] bg-white/20 rounded-full" />
						))}
					</div>
					<div className="ml-auto flex gap-2 items-center">
						<div className="w-[18px] h-[18px] bg-white/30 rounded-full" />
						<div className="w-12 h-[6px] bg-white/20 rounded-full" />
					</div>
				</div>

				{/* Content based on layout type */}
				{layout === 0 && (
					// Grid (e-commerce, dashboard)
					<div className="p-3 grid grid-cols-3 gap-2">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm"
							>
								<div className="h-[45px] bg-white/10 relative">
									<div
										className="absolute inset-0 opacity-40"
										style={{
											background: `hsl(${200 + i * 25}, 70%, 60%)`,
										}}
									/>
								</div>
								<div className="p-1.5 space-y-1">
									<div className="h-[5px] bg-white/40 rounded-full" />
									<div className="h-[5px] w-2/3 bg-white/25 rounded-full" />
									<div className="h-[5px] w-1/2 bg-white/20 rounded-full" />
								</div>
							</div>
						))}
					</div>
				)}

				{layout === 1 && (
					// Kanban columns (task mgmt, social, CMS)
					<div className="p-3 flex gap-2 h-[calc(100%-28px)]">
						{["Backlog", "In Progress", "Done"].map((_, ci) => (
							<div
								key={ci}
								className="flex-1 bg-black/20 rounded-lg p-2 space-y-1.5 backdrop-blur-sm"
							>
								<div className="flex items-center gap-1 mb-2">
									<div
										className="w-1.5 h-1.5 rounded-full"
										style={{
											background:
												ci === 0
													? "#6b7280"
													: ci === 1
														? "#3b82f6"
														: "#22c55e",
										}}
									/>
									<div className="h-[6px] w-12 bg-white/40 rounded-full" />
									<div className="ml-auto h-[6px] w-4 bg-white/20 rounded-full" />
								</div>
								{[...Array(ci === 1 ? 3 : 2)].map((_, ti) => (
									<div
										key={ti}
										className="bg-white/15 rounded-md p-2 space-y-1"
									>
										<div className="h-[5px] bg-white/40 rounded-full" />
										<div className="h-[5px] w-3/4 bg-white/25 rounded-full" />
										<div className="flex gap-1 mt-1.5">
											<div className="w-8 h-[4px] bg-white/20 rounded-full" />
											<div className="ml-auto w-[14px] h-[14px] bg-white/30 rounded-full" />
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				)}

				{layout === 2 && (
					// Chat / feed (AI, fitness)
					<div className="p-3 flex flex-col gap-2 h-[calc(100%-28px)]">
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className={`flex gap-2 items-end ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}
							>
								<div className="w-[20px] h-[20px] rounded-full bg-white/30 flex-shrink-0" />
								<div
									className={`rounded-2xl px-3 py-2 space-y-1 max-w-[65%] ${
										i % 2 !== 0 ? "bg-white/30" : "bg-black/25"
									}`}
								>
									<div
										className={`h-[5px] rounded-full bg-white/${i % 2 !== 0 ? "60" : "30"}`}
										style={{ width: `${50 + Math.sin(i) * 30}%` }}
									/>
									{i % 3 === 0 && (
										<div
											className={`h-[5px] rounded-full bg-white/${i % 2 !== 0 ? "40" : "20"}`}
											style={{ width: `${30 + Math.cos(i) * 20}%` }}
										/>
									)}
								</div>
							</div>
						))}
						{/* Input bar */}
						<div className="mt-auto flex gap-2 items-center bg-black/30 rounded-full px-3 py-1.5">
							<div className="flex-1 h-[6px] bg-white/20 rounded-full" />
							<div className="w-[18px] h-[18px] rounded-full bg-white/30" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

// --- Project detail panel ---
function ProjectDetail({
	project,
	index,
}: {
	project: (typeof projects)[0];
	index: number;
}) {
	return (
		<div className="space-y-5">
			{/* Counter */}
			<div className="flex items-center gap-3">
				<span
					className={`text-xs font-mono bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
				>
					{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
				</span>
				<div className="h-[1px] w-12 bg-gradient-to-r from-blue-500/50 to-transparent" />
			</div>

			{/* Title */}
			<h3 className="text-3xl font-bold text-white leading-tight xl:text-4xl">
				{project.title}
			</h3>

			{/* Description */}
			<p className="text-gray-400 text-base leading-relaxed xl:text-lg">
				{project.description}
			</p>

			{/* Tech stack */}
			<div className="flex flex-wrap gap-2">
				{project.tech.map((item, i) => (
					<span
						key={i}
						className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs text-gray-300"
					>
						{item}
					</span>
				))}
			</div>

			{/* Links */}
			<div className="flex gap-3 pt-1">
				<a
					href={project.githubUrl ?? "#"}
					aria-label={`View ${project.title} on GitHub`}
					className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-sm text-white hover:bg-white/10 hover:border-white/20 transition-colors"
				>
					<Github className="h-4 w-4" />
					View Code
				</a>
				<a
					href={project.liveUrl ?? "#"}
					aria-label={`View ${project.title} live`}
					className="flex items-center gap-2 rounded-xl border border-blue-500/30 px-5 py-2.5 text-sm text-white hover:border-blue-500/60 hover:bg-blue-500/5 transition-colors"
				>
					<ExternalLink className="h-4 w-4" />
					Live Demo
				</a>
			</div>
		</div>
	);
}

// --- Main Projects component ---
export function Projects() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const stickyRef = useRef<HTMLDivElement>(null);
	const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
	const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
	const dotsRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!sectionRef.current || !stickyRef.current) return;

			// Set initial state: first project visible, rest hidden
			screenRefs.current.forEach((el, i) => {
				if (!el) return;
				gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.96 });
			});
			detailRefs.current.forEach((el, i) => {
				if (!el) return;
				gsap.set(el, {
					opacity: i === 0 ? 1 : 0,
					y: i === 0 ? 0 : 40,
				});
			});

			// Update dot heights via GSAP (targeting the dots' style)
			const dotEls = dotsRef.current?.querySelectorAll(".progress-dot");

			// Build a single scrubbed timeline
			const tl = gsap.timeline();

			projects.forEach((_, i) => {
				if (i === 0) {
					// Hold the first project for a bit
					tl.to({}, { duration: 1 });
					return;
				}

				const prev = screenRefs.current[i - 1];
				const curr = screenRefs.current[i];
				const prevDetail = detailRefs.current[i - 1];
				const currDetail = detailRefs.current[i];
				const prevDot = dotEls?.[i - 1] as HTMLElement | undefined;
				const currDot = dotEls?.[i] as HTMLElement | undefined;

				// Transition out previous
				tl.to(
					prev,
					{ opacity: 0, scale: 0.96, duration: 0.4, ease: "power2.in" },
					">"
				)
					.to(
						prevDetail,
						{ opacity: 0, y: -30, duration: 0.4, ease: "power2.in" },
						"<"
					)
					// Dot animations
					.to(prevDot ?? {}, { height: 6, duration: 0.3 }, "<")
					.to(currDot ?? {}, { height: 24, duration: 0.3 }, "<")
					// Transition in current
					.fromTo(
						curr,
						{ opacity: 0, scale: 0.96 },
						{ opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
						">"
					)
					.fromTo(
						currDetail,
						{ opacity: 0, y: 40 },
						{ opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
						"<"
					)
					// Hold on this project
					.to({}, { duration: 1 });
			});

			// Pin the sticky container and scrub the timeline
			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: "top top",
				end: `+=${(projects.length - 1) * window.innerHeight}`,
				pin: stickyRef.current,
				pinSpacing: true,
				scrub: 1.2,
				animation: tl,
			});
		},
		{ scope: sectionRef }
	);

	return (
		<>
			{/* ── Desktop: sticky scroll experience ── */}
			<div
				ref={sectionRef}
				className="relative hidden lg:block bg-black"
				aria-label="Featured Projects"
			>
				<div
					ref={stickyRef}
					className="h-screen w-full flex flex-col"
				>
					{/* Section header (compact, at top) */}
					<div className="flex-shrink-0 px-8 pt-10 pb-4 xl:px-16">
						<SectionHeader
							badge="My Work"
							title="Featured Projects"
							description="A selection of projects that showcase my expertise in building modern web applications"
						/>
					</div>

					{/* Main content: laptop + details */}
					<div className="flex flex-1 items-center gap-12 px-8 pb-8 xl:px-16 xl:gap-20 min-h-0">
						{/* Left — MacBook */}
						<div className="relative flex-1 flex items-center justify-center max-w-[55%]">
							<MacBookFrame>
								{projects.map((project, i) => (
									<div
										key={i}
										ref={(el) => {
											screenRefs.current[i] = el;
										}}
										className="absolute inset-0"
									>
										<ProjectScreen project={project} index={i} />
									</div>
								))}
							</MacBookFrame>
						</div>

						{/* Right — Project details */}
						<div className="flex items-center gap-6 flex-1">
							{/* Progress dots */}
							<div
								ref={dotsRef}
								className="flex flex-col gap-2 flex-shrink-0"
							>
								{projects.map((_, i) => (
									<div
										key={i}
										className="progress-dot w-1.5 rounded-full"
										style={{
											height: i === 0 ? "24px" : "6px",
											background:
												i === 0
													? "white"
													: "rgba(255,255,255,0.2)",
										}}
									/>
								))}
							</div>

							{/* Detail panels (stacked, animated in/out) */}
							<div className="relative flex-1" style={{ minHeight: "280px" }}>
								{projects.map((project, i) => (
									<div
										key={i}
										ref={(el) => {
											detailRefs.current[i] = el;
										}}
										className="absolute inset-0 flex items-center"
									>
										<ProjectDetail project={project} index={i} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ── Mobile / tablet: card grid ── */}
			<div className="block lg:hidden bg-black px-4 py-16 sm:px-8 md:px-16 md:py-20">
				<SectionHeader
					badge="My Work"
					title="Featured Projects"
					description="A selection of projects that showcase my expertise in building modern web applications"
				/>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
					{projects.map((project, index) => (
						<ProjectCard
							key={index}
							title={project.title}
							description={project.description}
							tech={project.tech}
							gradient={project.gradient}
						/>
					))}
				</div>
			</div>
		</>
	);
}
