"use client";

import { getAnimationPreferences } from "@/lib/hooks/useAnimationPreferences";
import { NAV_ITEMS } from "@/lib/constants";
import type { NavigationProps, Section } from "@/lib/types";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
	const [isOpen, setIsOpen] = useState(false);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);

	const handleNavigate = (section: Section) => {
		onNavigate(section);
		setIsOpen(false);
	};

	useEffect(() => {
		const { shouldSimplifyAnimations } = getAnimationPreferences();

		// Set initial states to hidden
		gsap.set(menuButtonRef.current, { opacity: 0, scale: 0 });

		// Initial entrance animations (only for mobile button)
		gsap.to(menuButtonRef.current, {
			opacity: 1,
			scale: 1,
			duration: shouldSimplifyAnimations ? 0.01 : 0.5,
			delay: shouldSimplifyAnimations ? 0 : 0.5,
			ease: "back.out(1.7)",
		});
	}, []);

	useEffect(() => {
		const { shouldSimplifyAnimations } = getAnimationPreferences();

		if (isOpen) {
			// Animate overlay
			gsap.to(mobileMenuRef.current, {
				opacity: 1,
				duration: shouldSimplifyAnimations ? 0.01 : 0.3,
				ease: "power2.out",
			});

			// Get menu items
			const mobileItems =
				mobileMenuRef.current?.querySelectorAll(".mobile-nav-item") || [];

			// Set initial state (hidden)
			gsap.set(mobileItems, { opacity: 0, y: 20 });

			// Animate to visible state
			gsap.to(mobileItems, {
				opacity: 1,
				y: 0,
				duration: shouldSimplifyAnimations ? 0.01 : 0.4,
				stagger: shouldSimplifyAnimations ? 0 : 0.1,
				delay: shouldSimplifyAnimations ? 0 : 0.1,
				ease: "power2.out",
			});
		} else if (mobileMenuRef.current) {
			gsap.to(mobileMenuRef.current, {
				opacity: 0,
				duration: shouldSimplifyAnimations ? 0.01 : 0.3,
				ease: "power2.in",
			});
		}
	}, [isOpen]);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				ref={menuButtonRef}
				onClick={() => setIsOpen(!isOpen)}
				aria-label={isOpen ? "Close menu" : "Open menu"}
				className="fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-white shadow-lg shadow-blue-500/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:outline-none"
			>
				{isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
			</button>

			{/* Mobile Navigation Overlay */}
			{isOpen && (
				<div
					ref={mobileMenuRef}
					role="dialog"
					aria-modal="true"
					aria-label="Navigation menu"
					className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-black opacity-0 backdrop-blur-md"
					onClick={() => setIsOpen(false)}
					onKeyDown={(e) => { if (e.key === "Escape") setIsOpen(false); }}
				>
					<div className="relative flex min-h-full flex-col items-center justify-start space-y-6 px-4 pb-8 pt-24">
						{/* Decorative gradient */}
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-cyan-500/5" />

						{NAV_ITEMS.map((item) => (
							<button
								key={item.id}
								onClick={(e) => {
									e.stopPropagation();
									handleNavigate(item.id);
								}}
								onMouseEnter={(e) => {
									gsap.to(e.currentTarget, {
										scale: 1.05,
										x: 10,
										duration: 0.3,
									});
								}}
								onMouseLeave={(e) => {
									gsap.to(e.currentTarget, {
										scale: 1,
										x: 0,
										duration: 0.3,
									});
								}}
								className={`mobile-nav-item relative z-10 text-lg tracking-widest transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:outline-none focus-visible:rounded-lg ${
									currentSection === item.id
										? "bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text font-semibold text-transparent"
										: "text-gray-400 hover:text-white"
								} `}
							>
								{item.label}
							</button>
						))}
					</div>
				</div>
			)}
		</>
	);
}
