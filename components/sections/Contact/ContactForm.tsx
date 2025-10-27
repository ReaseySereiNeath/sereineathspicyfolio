"use client";

import { Button, Input, Textarea } from "@/components/ui";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import {
	validateContactForm,
	type ContactFormErrors,
} from "@/lib/schemas/contact";
import { gsap } from "@/lib/utils/gsap-config";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ContactApiResponse {
	success: boolean;
	message: string;
}

export function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState<ContactFormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [touched, setTouched] = useState({
		name: false,
		email: false,
		message: false,
	});

	const formRef = useRef<HTMLFormElement>(null);

	// Validate field on blur
	const handleBlur = (field: keyof typeof formData) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		const result = validateContactForm(formData);
		if (!result.success) {
			setErrors(result.errors);
		} else {
			setErrors({});
		}
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Mark all fields as touched
		setTouched({ name: true, email: true, message: true });

		// Validate form with Zod
		const result = validateContactForm(formData);
		if (!result.success) {
			setErrors(result.errors);
			toast.error("Please fix the errors in the form", {
				icon: <AlertCircle className="h-5 w-5" />,
			});
			return;
		}

		setIsSubmitting(true);
		setErrors({});

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data: ContactApiResponse = await response.json();

			if (!response.ok || !data.success) {
				throw new Error(data.message || "Failed to send message");
			}

			// Success!
			toast.success(data.message, {
				icon: <CheckCircle2 className="h-5 w-5" />,
				duration: 5000,
			});

			// Reset form
			setFormData({
				name: "",
				email: "",
				message: "",
			});
			setTouched({
				name: false,
				email: false,
				message: false,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to send message";
			toast.error(errorMessage, {
				icon: <AlertCircle className="h-5 w-5" />,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Use scroll reveal for form
	useScrollReveal(formRef, { x: 50, y: 0, duration: 0.8 });

	// Form fields animation
	useEffect(() => {
		const form = formRef.current;
		if (!form) return;

		const ctx = gsap.context(() => {
			const formFields = form.querySelectorAll(".form-field");

			formFields.forEach((field, index) => {
				gsap.from(field, {
					opacity: 0,
					y: 20,
					duration: 0.6,
					delay: 0.2 + index * 0.1,
					scrollTrigger: {
						trigger: form,
						start: "top 80%",
						toggleActions: "play none none reverse",
					},
				});
			});
		}, formRef);

		return () => ctx.revert();
	}, []);

	return (
		<div className="relative">
			{/* Glow effect */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl" />

			{/* Form */}
			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="relative space-y-6 rounded-2xl border border-indigo-500/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-6 backdrop-blur-sm md:p-8"
			>
				<div className="form-field">
					<Input
						label="Your Name"
						type="text"
						id="name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						onBlur={() => handleBlur("name")}
						variant="indigo"
						placeholder="John Doe"
						required
						disabled={isSubmitting}
					/>
					{touched.name && errors.name && (
						<p className="mt-1 flex items-center gap-1 text-sm text-red-400">
							<AlertCircle className="h-4 w-4" />
							{errors.name}
						</p>
					)}
				</div>

				<div className="form-field">
					<Input
						label="Your Email"
						type="email"
						id="email"
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						onBlur={() => handleBlur("email")}
						variant="indigo"
						placeholder="john@example.com"
						required
						disabled={isSubmitting}
					/>
					{touched.email && errors.email && (
						<p className="mt-1 flex items-center gap-1 text-sm text-red-400">
							<AlertCircle className="h-4 w-4" />
							{errors.email}
						</p>
					)}
				</div>

				<div className="form-field">
					<Textarea
						label="Your Message"
						id="message"
						value={formData.message}
						onChange={(e) =>
							setFormData({ ...formData, message: e.target.value })
						}
						onBlur={() => handleBlur("message")}
						variant="indigo"
						rows={6}
						placeholder="Tell me about your project..."
						required
						disabled={isSubmitting}
					/>
					{touched.message && errors.message && (
						<p className="mt-1 flex items-center gap-1 text-sm text-red-400">
							<AlertCircle className="h-4 w-4" />
							{errors.message}
						</p>
					)}
					<div className="mt-1 text-right text-xs text-gray-500">
						{formData.message.length} / 2000
					</div>
				</div>

				<Button
					type="submit"
					variant="primary"
					size="xl"
					fullWidth
					rightIcon={isSubmitting ? undefined : <Send className="h-5 w-5" />}
					disabled={isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Send Message"}
				</Button>
			</form>
		</div>
	);
}
