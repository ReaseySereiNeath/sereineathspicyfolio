import Image from "next/image";

interface TimelinePicProps {
	id: string;
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
}

export function TimelinePic({
	id,
	src,
	alt,
	width,
	height,
	className,
}: TimelinePicProps) {
	return (
		<Image
			id={id}
			src={src}
			width={width}
			height={height}
			alt={alt}
			className={`absolute scale-[0.6] overflow-hidden rounded-lg border-2 border-[#0e0e0e] opacity-0 transition-all duration-300 md:border-[5px] lg:scale-100 ${className}`}
		/>
	);
}
