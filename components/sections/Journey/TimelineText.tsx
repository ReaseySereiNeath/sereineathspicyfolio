interface TimelineTextProps {
	id: string;
	className?: string;
	children: React.ReactNode;
}

export function TimelineText({ id, className, children }: TimelineTextProps) {
	return (
		<div
			id={id}
			className={`invisible absolute w-[100px] text-[6.5px] text-gray-400 transition-all duration-300 md:w-[200px] md:text-[8px] lg:w-[280px] lg:text-[10px] ${className}`}
		>
			{children}
		</div>
	);
}
