import { ContactMethod, SocialLink } from "@/lib/types";
import { Github, Globe, Linkedin, Mail, MapPin, Phone} from "lucide-react";

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
		href: "https://github.com/ReaseySereiNeath",
		color: "hover:text-gray-400",
	},
	{
		icon: Linkedin,
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/sereineath-reasey-8595541a7/",
		color: "hover:text-blue-400",
	},
	{
		icon: Globe,
		label: "Website",
		href: "#",
		color: "hover:text-green-400",
	},
	{
		icon: Mail,
		label: "Email",
		href: "mailto:sereineathreasey@gmail.com",
		color: "hover:text-red-400",
	},
];
