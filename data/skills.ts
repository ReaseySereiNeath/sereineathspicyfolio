import { SkillCategory } from "@/lib/types";
import {
	Cloud,
	Code2,
	Database,
	Palette,
	Smartphone,
	Terminal,
} from "lucide-react";

export const skillCategories: SkillCategory[] = [
	{
		title: "Frontend",
		icon: Code2,
		color: "from-blue-500 to-blue-600",
		skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
	},
	{
		title: "Backend",
		icon: Database,
		color: "from-blue-600 to-sky-600",
		skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
	},
	{
		title: "Mobile",
		icon: Smartphone,
		color: "from-cyan-500 to-blue-500",
		skills: ["React Native", "iOS", "Android", "Flutter", "Expo"],
	},
	{
		title: "DevOps",
		icon: Cloud,
		color: "from-sky-500 to-blue-500",
		skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Linux"],
	},
	{
		title: "Design",
		icon: Palette,
		color: "from-blue-500 to-indigo-500",
		skills: [
			"Figma",
			"UI/UX",
			"Responsive Design",
			"Prototyping",
			"Design Systems",
		],
	},
	{
		title: "Tools",
		icon: Terminal,
		color: "from-blue-400 to-blue-600",
		skills: ["Git", "VS Code", "Postman", "Jira", "Slack"],
	},
];
