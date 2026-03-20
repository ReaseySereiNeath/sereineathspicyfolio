import Image from "next/image";

interface TimelinePicProps {
	id: string;
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	sizes?: string;
	quality?: number;
	priority?: boolean;
	unoptimized?: boolean;
}

export function TimelinePic({
	id,
	src,
	alt,
	width,
	height,
	className,
	sizes = "(min-width: 1536px) 220px, (min-width: 1280px) 200px, (min-width: 1024px) 160px, (min-width: 768px) 120px, 90px",
	quality = 95,
	priority = false,
	unoptimized = false,
}: TimelinePicProps) {
	return (
		<Image
			id={id}
			src={src}
			width={width}
			height={height}
			alt={alt}
			sizes={sizes}
			quality={quality}
			priority={priority}
			unoptimized={unoptimized}
			className={`absolute overflow-hidden rounded-lg border-2 border-[#0e0e0e] opacity-0 object-cover shadow-lg transition-[transform,opacity] duration-300 md:border-[3px] lg:border-[4px] ${className}`}
			style={{ borderRadius: "0.5rem" }}
		/>
	);
}
