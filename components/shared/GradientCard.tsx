"use client";

import { memo, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Card variants
 */
const cardVariants = tv({
	base: "relative h-full backdrop-blur-sm rounded-2xl transition-all duration-500",
	variants: {
		variant: {
			default: "bg-gradient-to-br from-gray-900/90 to-gray-800/90",
			light: "bg-gradient-to-br from-gray-900/50 to-gray-800/50",
			solid: "bg-gray-900",
		},
		border: {
			blue: "border border-blue-500/10 hover:border-blue-500/30",
			indigo: "border border-indigo-500/10 hover:border-indigo-500/30",
			none: "border-0",
		},
		padding: {
			none: "p-0",
			sm: "p-4",
			md: "p-6",
			lg: "p-8",
		},
	},
	defaultVariants: {
		variant: "default",
		border: "blue",
		padding: "md",
	},
});

/**
 * Glow effect variants
 */
const glowVariants = tv({
	base: "bg-gradient-to-r",
	variants: {
		variant: {
			blue: "from-blue-500/30 via-blue-500/20 to-transparent",
			blueLight: "from-blue-500/20 via-blue-500/10 to-transparent",
			cyan: "from-cyan-500/30 via-cyan-500/20 to-transparent",
			indigo: "from-indigo-500/30 via-indigo-500/20 to-transparent",
		},
		intensity: {
			low: "opacity-20",
			medium: "opacity-30",
			high: "opacity-50",
		},
	},
	defaultVariants: {
		variant: "blue",
		intensity: "medium",
	},
});

type CardVariants = VariantProps<typeof cardVariants>;
type GlowVariants = VariantProps<typeof glowVariants>;

interface GradientCardProps {
	children: ReactNode;
	variant?: CardVariants["variant"];
	border?: CardVariants["border"];
	padding?: CardVariants["padding"];
	glowVariant?: GlowVariants["variant"];
	glowIntensity?: GlowVariants["intensity"];
	className?: string;
	enableHover?: boolean;
}

const GradientCardComponent = ({
	children,
	variant = "default",
	border = "blue",
	padding = "md",
	glowVariant = "blue",
	glowIntensity = "medium",
	className = "",
	enableHover = true,
}: GradientCardProps) => {
	return (
		<div className={twMerge("group relative", enableHover && "cursor-pointer")}>
			{/* Glow effect */}
			<div
				className={twMerge(
					"glow-effect absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500",
					glowVariants({ variant: glowVariant, intensity: glowIntensity }),
					enableHover && "group-hover:opacity-100"
				)}
			/>

			{/* Card */}
			<div
				className={twMerge(
					cardVariants({ variant, border, padding }),
					className
				)}
			>
				{children}
			</div>
		</div>
	);
};

GradientCardComponent.displayName = "GradientCard";

export const GradientCard = memo(GradientCardComponent);
