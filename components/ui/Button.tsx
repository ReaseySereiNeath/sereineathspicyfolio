"use client";

import { memo, type ButtonHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Button component variants
 */
const buttonVariants = tv({
	base: "rounded-full transition-all duration-300 font-medium hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center gap-2",
	variants: {
		variant: {
			primary:
				"bg-gradient-to-r from-blue-600 to-blue-500 text-white relative overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
			secondary: "border border-blue-500/30 text-white hover:bg-blue-500/10",
			outline: "border border-gray-500/30 text-gray-300 hover:bg-gray-500/10",
			ghost: "text-gray-300 hover:bg-gray-500/10",
			indigo:
				"bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]",
		},
		size: {
			sm: "px-4 py-2 text-sm",
			md: "px-6 py-3",
			lg: "px-6 md:px-8 py-3 md:py-4",
			xl: "px-8 py-4",
		},
		fullWidth: {
			true: "w-full",
			false: "w-auto",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
		fullWidth: false,
	},
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		ButtonVariants {
	children: ReactNode;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	isLoading?: boolean;
}

const ButtonComponent = ({
	children,
	className,
	variant,
	size,
	fullWidth,
	leftIcon,
	rightIcon,
	isLoading,
	disabled,
	...props
}: ButtonProps) => {
	return (
		<button
			className={twMerge(
				buttonVariants({ variant, size, fullWidth }),
				"group",
				className
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<>
					<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
					<span>Loading...</span>
				</>
			) : (
				<>
					{leftIcon && <span className="inline-flex">{leftIcon}</span>}
					<span className="relative z-10">{children}</span>
					{rightIcon && (
						<span className="inline-flex transition-transform duration-300 group-hover:translate-x-1">
							{rightIcon}
						</span>
					)}
				</>
			)}
		</button>
	);
};

ButtonComponent.displayName = "Button";

export const Button = memo(ButtonComponent);
