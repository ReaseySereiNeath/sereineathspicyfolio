import { Project } from "@/lib/types";

export const projects: Project[] = [
	{
		title: "E-Commerce Platform",
		description:
			"A full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.",
		tech: ["React", "Node.js", "MongoDB", "Stripe"],
		gradient: "from-blue-500 to-blue-600",
	},
	{
		title: "Task Management App",
		description:
			"Collaborative task management tool with real-time updates, team collaboration features, and deadline tracking.",
		tech: ["Next.js", "PostgreSQL", "WebSocket"],
		gradient: "from-blue-600 to-sky-600",
	},
	{
		title: "Social Media Dashboard",
		description:
			"Analytics dashboard for social media management with scheduled posts and engagement metrics.",
		tech: ["React", "Express", "Redis"],
		gradient: "from-cyan-500 to-blue-500",
	},
	{
		title: "AI Chat Application",
		description:
			"Real-time chat application with AI-powered responses and natural language processing.",
		tech: ["Python", "FastAPI", "OpenAI"],
		gradient: "from-sky-500 to-blue-500",
	},
	{
		title: "Portfolio CMS",
		description:
			"Custom content management system for creating and managing portfolio websites with drag-and-drop builder.",
		tech: ["Vue.js", "Laravel", "MySQL"],
		gradient: "from-blue-400 to-blue-600",
	},
	{
		title: "Fitness Tracking App",
		description:
			"Mobile-first fitness tracking application with workout plans, progress tracking, and nutrition guides.",
		tech: ["React Native", "Firebase", "TypeScript"],
		gradient: "from-blue-500 to-indigo-500",
	},
];
