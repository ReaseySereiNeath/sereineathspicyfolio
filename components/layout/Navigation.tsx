"use client";

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
		// Set initial states to hidden
		gsap.set(menuButtonRef.current, { opacity: 0, scale: 0 });

		// Initial entrance animations (only for mobile button)
		gsap.to(menuButtonRef.current, {
			opacity: 1,
			scale: 1,
			duration: 0.5,
			delay: 0.5,
			ease: "back.out(1.7)",
		});
	}, []);

	useEffect(() => {
		if (isOpen) {
			// Animate overlay
			gsap.to(mobileMenuRef.current, {
				opacity: 1,
				duration: 0.3,
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
				duration: 0.4,
				stagger: 0.1,
				delay: 0.1,
				ease: "power2.out",
			});
		} else if (mobileMenuRef.current) {
			gsap.to(mobileMenuRef.current, {
				opacity: 0,
				duration: 0.3,
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
				className="fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-white shadow-lg shadow-blue-500/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110 active:scale-95"
			>
				{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
			</button>

			{/* Mobile Navigation Overlay */}
			{isOpen && (
				<div
					ref={mobileMenuRef}
					className="fixed inset-0 z-[55] overflow-y-auto bg-black opacity-0 backdrop-blur-md"
					onClick={() => setIsOpen(false)}
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
								className={`mobile-nav-item relative z-10 text-lg tracking-widest transition-all duration-300 ${
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
