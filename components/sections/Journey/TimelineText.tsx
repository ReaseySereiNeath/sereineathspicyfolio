interface TimelineTextProps {
	id: string;
	className?: string;
	children: React.ReactNode;
}

export function TimelineText({ id, className, children }: TimelineTextProps) {
	return (
		<div
			id={id}
			className={`invisible absolute w-[80px] text-[4px] text-gray-400 transition-all duration-300 md:w-[140px] md:text-[6px] lg:w-[180px] lg:text-[7px] xl:text-[8px] 2xl:w-[220px] 2xl:text-[9px] ${className}`}
		>
			{children}
		</div>
	);
}
