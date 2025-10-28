"use client";

import { memo, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Badge component variants
 */
const badgeVariants = tv({
	base: "inline-block px-4 py-2 border rounded-full text-sm",
	variants: {
		variant: {
			blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
			indigo:
				"bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-400",
			cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
			gray: "bg-gray-500/10 border-gray-500/30 text-gray-400",
			green: "bg-green-500/10 border-green-500/30 text-green-400",
		},
		size: {
			sm: "px-3 py-1 text-xs",
			md: "px-4 py-2 text-sm",
			lg: "px-5 py-2.5 text-base",
		},
	},
	defaultVariants: {
		variant: "blue",
		size: "md",
	},
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;

interface BadgeProps extends BadgeVariants {
	children: ReactNode;
	className?: string;
	icon?: ReactNode;
}

const BadgeComponent = ({
	children,
	variant,
	size,
	className,
	icon,
}: BadgeProps) => {
	return (
		<span className={twMerge(badgeVariants({ variant, size }), className)}>
			{icon && <span className="mr-2 inline-flex">{icon}</span>}
			{children}
		</span>
	);
};

BadgeComponent.displayName = "Badge";

export const Badge = memo(BadgeComponent);
