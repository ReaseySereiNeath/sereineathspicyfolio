import { ContactMethod, SocialLink } from "@/lib/types";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export const contactMethods: ContactMethod[] = [
	{
		icon: Mail,
		label: "Email",
		value: "reasey@example.com",
		href: "mailto:reasey@example.com",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+65 1234 5678",
		href: "tel:+6512345678",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Singapore",
		href: null,
	},
];

export const socialLinks: SocialLink[] = [
	{
		icon: Github,
		label: "GitHub",
		href: "https://github.com",
		color: "hover:text-gray-400",
	},
	{
		icon: Linkedin,
		label: "LinkedIn",
		href: "https://linkedin.com",
		color: "hover:text-blue-400",
	},
	{
		icon: Twitter,
		label: "Twitter",
		href: "https://twitter.com",
		color: "hover:text-cyan-400",
	},
];
