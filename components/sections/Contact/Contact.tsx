"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { useRef } from "react";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function Contact() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="flex size-full items-center justify-center px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-7xl">
				{/* Header */}
				<SectionHeader
					badge="Get In Touch"
					title="Let's Work Together"
					description="Have a project in mind? Let's discuss how we can bring your ideas to life"
					badgeVariant="blue"
				/>

				<div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2">
					{/* Contact Info */}
					<ContactInfo />

					{/* Contact Form */}
					<ContactForm />
				</div>
			</div>
		</div>
	);
}
