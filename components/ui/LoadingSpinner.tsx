"use client";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Loading spinner variants
 */
const spinnerVariants = tv({
	base: "rounded-full animate-spin border-2",
	variants: {
		variant: {
			blue: "border-blue-500/30 border-t-blue-400",
			indigo: "border-indigo-500/30 border-t-indigo-400",
			white: "border-white/30 border-t-white",
			gray: "border-gray-500/30 border-t-gray-400",
		},
		size: {
			sm: "w-4 h-4",
			md: "w-6 h-6",
			lg: "w-8 h-8",
			xl: "w-12 h-12",
		},
	},
	defaultVariants: {
		variant: "blue",
		size: "md",
	},
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;

interface LoadingSpinnerProps extends SpinnerVariants {
	className?: string;
	text?: string;
	centered?: boolean;
	fullScreen?: boolean;
}

const LoadingSpinnerComponent = ({
	variant,
	size,
	className,
	text = "Loading...",
	centered = false,
	fullScreen = false,
}: LoadingSpinnerProps) => {
	const spinner = (
		<div className="flex flex-col items-center justify-center gap-3">
			<div className={twMerge(spinnerVariants({ variant, size }), className)} />
			{text && (
				<p
					className={twMerge(
						"animate-pulse",
						variant === "blue" && "text-blue-400",
						variant === "indigo" && "text-indigo-400",
						variant === "white" && "text-white",
						variant === "gray" && "text-gray-400"
					)}
				>
					{text}
				</p>
			)}
		</div>
	);

	if (fullScreen) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				{spinner}
			</div>
		);
	}

	if (centered) {
		return <div className="flex items-center justify-center">{spinner}</div>;
	}

	return spinner;
};

LoadingSpinnerComponent.displayName = "LoadingSpinner";

export const LoadingSpinner = memo(LoadingSpinnerComponent);
