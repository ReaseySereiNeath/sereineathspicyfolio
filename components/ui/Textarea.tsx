"use client";

import { forwardRef, memo, type TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Textarea field variants
 */
const textareaVariants = tv({
	base: "w-full px-4 py-3 rounded-lg focus:outline-none transition-colors duration-300 text-white placeholder-gray-600 resize-none",
	variants: {
		variant: {
			default:
				"bg-gray-900/50 border border-blue-500/20 focus:border-blue-500/50",
			indigo:
				"bg-gray-900/50 border border-indigo-500/20 focus:border-indigo-500/50",
			error: "bg-gray-900/50 border border-red-500/50 focus:border-red-500",
		},
		size: {
			sm: "px-3 py-2 text-sm",
			md: "px-4 py-3",
			lg: "px-5 py-4",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
});

export type TextareaVariants = VariantProps<typeof textareaVariants>;

interface TextareaProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
		TextareaVariants {
	label?: string;
	error?: string;
	helperText?: string;
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{ label, error, helperText, className, variant, size, id, ...props },
		ref
	) => {
		const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
		const textareaVariant = error ? "error" : variant;

		return (
			<div className="space-y-2">
				{label && (
					<label
						htmlFor={textareaId}
						className="block text-sm font-medium text-gray-400"
					>
						{label}
					</label>
				)}
				<textarea
					ref={ref}
					id={textareaId}
					className={twMerge(
						textareaVariants({ variant: textareaVariant, size }),
						className
					)}
					{...props}
				/>
				{(error || helperText) && (
					<p
						className={twMerge(
							"text-sm",
							error ? "text-red-400" : "text-gray-500"
						)}
					>
						{error || helperText}
					</p>
				)}
			</div>
		);
	}
);

TextareaComponent.displayName = "Textarea";

export const Textarea = memo(TextareaComponent);
