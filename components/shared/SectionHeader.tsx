"use client";

import { Badge, type BadgeVariants } from "@/components/ui";
import { useScrollRevealChildren } from "@/lib/hooks/useScrollReveal";
import { memo, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Text gradient variants for titles
 */
const textGradientVariants = tv({
	base: "bg-gradient-to-r bg-clip-text text-transparent",
	variants: {
		variant: {
			white: "from-white to-gray-400",
			whiteGray: "from-white via-gray-200 to-gray-400",
			blue: "from-blue-400 to-blue-500",
			blueVia: "from-blue-400 via-blue-300 to-blue-500",
			cyan: "from-cyan-400 to-blue-500",
			indigo: "from-blue-400 to-indigo-500",
		},
	},
	defaultVariants: {
		variant: "white",
	},
});

type TextGradientVariants = VariantProps<typeof textGradientVariants>;

interface SectionHeaderProps {
	badge: string;
	title: string;
	description?: string;
	badgeVariant?: BadgeVariants["variant"];
	titleVariant?: TextGradientVariants["variant"];
}

const SectionHeaderComponent = ({
	badge,
	title,
	description,
	badgeVariant = "blue",
	titleVariant = "white",
}: SectionHeaderProps) => {
	const headerRef = useRef<HTMLDivElement>(null);

	// Use scroll reveal for children with stagger
	useScrollRevealChildren(headerRef, {
		y: 30,
		duration: 0.8,
		stagger: 0.2,
	});

	return (
		<div ref={headerRef} className="mb-12 text-center md:mb-16">
			<div className="mb-4">
				<Badge variant={badgeVariant}>{badge}</Badge>
			</div>
			<h2
				className={twMerge(
					"mb-4 text-3xl sm:text-4xl md:text-5xl",
					textGradientVariants({ variant: titleVariant })
				)}
			>
				{title}
			</h2>
			{description && (
				<p className="mx-auto max-w-2xl text-base text-gray-400 md:text-lg">
					{description}
				</p>
			)}
		</div>
	);
};

SectionHeaderComponent.displayName = "SectionHeader";

export const SectionHeader = memo(SectionHeaderComponent);
