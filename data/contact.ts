import { ContactMethod, SocialLink } from "@/lib/types";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export const contactMethods: ContactMethod[] = [
	{
		icon: Mail,
		label: "Email",
		value: "sereineathreasey@gmail.com",
		href: "mailto:sereineathreasey@gmail.com",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+81 70-8975-3286",
		href: "tel:+817089753286",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Japan",
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
