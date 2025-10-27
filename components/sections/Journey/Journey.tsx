"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { TimelinePic } from "./TimelinePic";
import { TimelineText } from "./TimelineText";

// Register GSAP plugins
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
}

export function Journey() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const pulses = gsap
			.timeline({
				defaults: {
					duration: 0.05,
					autoAlpha: 1,
					scale: 2,
					transformOrigin: "center",
					ease: "elastic(2.5, 1)",
				},
			})
			.to(".ball02, .text01, #text-2011 ", {}, 0.04)
			.to(".ball03, .text02, #text-2011-2 , #uoft", {}, 0.07)
			.to(".ball04, .text03, #text-2014", {}, 0.13)
			.to(".ball05, .text04, #text-2015", {}, 0.17)
			.to(".ball06, .text05, #text-2016, #chair, #haircut", {}, 0.2)
			.to(
				".ball07, #text-barbering-great, #competition, #pompodour, #combover",
				{},
				0.23
			)
			.to(".ball08, .text06, #text-2023", {}, 0.42)
			.to(
				".ball09, .text07, #text-2024, #camera-op, #still-1, #still-2, #still-3",
				{},
				0.54
			)
			.to(".ball10, .text08, #text-2025", {}, 0.62);

		gsap
			.timeline({
				defaults: { duration: 1 },
				scrollTrigger: {
					trigger: "#svg-stage",
					scrub: true,
					start: "top 10% ",
					end: "bottom top",
				},
			})
			.to(".ball01", { duration: 0.01, autoAlpha: 1 })
			.from(".theLine", { drawSVG: 0 }, 0)
			.to(
				".ball01",
				{
					motionPath: {
						path: ".theLine",
						align: ".theLine",
						alignOrigin: [0.5, 0.5],
					},
				},
				0
			)
			.add(pulses, 0);
	}, []);

	return (
		<div
			ref={containerRef}
			className="flex size-full items-center justify-center px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-7xl">
				{/* Header */}
				<SectionHeader
					badge="My Story"
					title="Journey & Timeline"
					description="A visual timeline of my personal and professional growth over the years"
				/>

				{/* Timeline Content */}
				<div className="relative -mt-80 w-full pb-40">
					<TimelinePic
						id="uoft"
						src="/uoft.jpg"
						width={150}
						height={150}
						alt="university-of-toronto"
						className="left-[79%] top-[30%] w-[50px] rotate-6 md:left-[85%] md:top-[31%] lg:left-[73%] lg:w-[100px] xl:left-[70%] xl:top-[30%] 2xl:left-[65%] 2xl:top-[15%] 2xl:w-[150px]"
					/>
					<TimelinePic
						id="chair"
						src="/shop-3.jpg"
						width={120}
						height={120}
						alt="barber-chair"
						className="left-[68%] top-[46.5%] w-[45px] -rotate-3 md:left-[80%] md:top-[45%] lg:left-[76%] lg:top-[44%] lg:w-[100px] xl:left-[68%] xl:top-[45%] 2xl:left-[63%] 2xl:top-[43%] 2xl:w-[120px]"
					/>
					<TimelinePic
						id="haircut"
						src="/haircut.jpg"
						width={120}
						height={120}
						alt="haircut-1"
						className="left-[80%] top-[47%] w-[40px] rotate-3 md:left-[85%] md:top-[47.5%] lg:left-[85%] lg:top-[49%] lg:w-[90px] xl:left-[78%] 2xl:left-[75%] 2xl:w-[120px]"
					/>
					<TimelinePic
						id="pompodour"
						src="/pompodour.jpg"
						width={120}
						height={120}
						alt="haircut-2"
						className="left-[800px] top-[1520px] hidden 2xl:flex"
					/>
					<TimelinePic
						id="combover"
						src="/combover.jpg"
						width={120}
						height={120}
						alt="haircut-3"
						className="-rotate-5 left-[1000px] top-[1530px] hidden 2xl:flex"
					/>
					<TimelinePic
						id="competition"
						src="/competition.jpg"
						width={120}
						height={120}
						alt="competition"
						className="rotate-5 left-[1200px] top-[1500px] hidden 2xl:flex"
					/>
					<TimelinePic
						id="camera-op"
						src="/camera-operating.jpg"
						width={120}
						height={120}
						alt="camera-operating"
						className="-rotate-5 left-[15%] top-[65%] w-[45px] md:w-[70px] lg:w-[90px] 2xl:left-[62%] 2xl:top-[72%]"
					/>
					<TimelinePic
						id="still-1"
						src="/still-5.jpg"
						width={180}
						height={180}
						alt="film-still-1"
						className="left-[29%] top-[70%] w-[80px] rotate-6 md:top-[70%] md:w-[120px] lg:w-[150px] xl:w-[180px] 2xl:left-[35%] 2xl:top-[80%]"
					/>
					<TimelinePic
						id="still-2"
						src="/still-6.jpg"
						width={180}
						height={180}
						alt="film-still-2"
						className="left-[45%] top-[70%] hidden rotate-6 md:left-[40%] md:top-[70%] md:block md:w-[120px] lg:w-[140px] xl:w-[180px] 2xl:left-[50%] 2xl:top-[79%]"
					/>
					<TimelinePic
						id="still-3"
						src="/best-cine.png"
						width={250}
						height={250}
						alt="film-still-3"
						className="left-[60%] top-[69%] w-[90px] -rotate-3 md:left-[65%] md:top-[68%] md:w-[140px] lg:w-[200px] xl:w-[250px] 2xl:left-[70%] 2xl:top-[78%]"
					/>

					<svg
						id="svg-stage"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 600 2526.3"
						className="mt-0 max-w-[600px] origin-left scale-50 overflow-visible 2xl:scale-100"
					>
						<path
							className="theLine stroke-blue-500"
							d="M-5,0c303.3,153.3,405,303.3,305,450s-156.7,246.7-170,300c-20,66.7,36.7,150,170,250,133.3,100,117.4,455-115.9,488.4-88.3,15.5,121,58.8,158.6,80.1s-116.1,19.6-143.8,52.3,90.2,8.2,114.6,32.7-104.8,31.1-77,63.8c27.8,32.7,196.2-1.6,241.9,93.2s-336.7,14-294.2,94.8c45.8,87,287.7,148.8,243.6,299.1S-12.1,2506.7-12.1,2506.7"
							fill="none"
							stroke="#3b82f6"
							strokeWidth="10"
						/>
						<circle
							className="ball ball01 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="50"
							cy="100"
							r="20"
						/>
						<circle
							className="ball ball02 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="278"
							cy="201"
							r="20"
						/>
						<circle
							className="ball ball03 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="327"
							cy="401"
							r="20"
						/>
						<circle
							className="ball ball04 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="130.3"
							cy="799"
							r="20"
						/>
						<circle
							className="ball ball05 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="303.3"
							cy="1000"
							r="20"
						/>
						<circle
							className="ball ball06 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="384"
							cy="1192.2"
							r="20"
						/>
						<circle
							className="ball ball07 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="333.4"
							cy="1392.2"
							r="20"
						/>
						<circle
							className="ball ball08 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="468.1"
							cy="1792.2"
							r="20"
						/>
						<circle
							className="ball ball09 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="281.8"
							cy="1992.2"
							r="20"
						/>
						<circle
							className="ball ball10 invisible fill-blue-500 opacity-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
							cx="430"
							cy="2191.1"
							r="20"
						/>
						<text
							className="text01 invisible fill-blue-400 text-[15px]"
							x="50"
							y="194.11"
						>
							2011
						</text>
						<text
							className="text02 invisible fill-blue-400 text-[15px]"
							x="50"
							y="394.11"
						>
							2011
						</text>
						<text
							className="text03 invisible fill-blue-400 text-[15px]"
							x="50"
							y="724.11"
						>
							2014
						</text>
						<text
							className="text04 invisible fill-blue-400 text-[15px]"
							x="50"
							y="994.11"
						>
							2015
						</text>
						<text
							className="text05 invisible fill-blue-400 text-[15px]"
							x="50"
							y="1186.31"
						>
							2016
						</text>
						<text
							className="text06 invisible fill-blue-400 text-[15px]"
							x="50"
							y="1786.31"
						>
							2023
						</text>
						<text
							className="text07 invisible fill-blue-400 text-[15px]"
							x="50"
							y="1986.31"
						>
							2024
						</text>
						<text
							className="text08 invisible fill-blue-400 text-[15px]"
							x="50"
							y="2186.81"
						>
							2025
						</text>
					</svg>

					<TimelineText
						id="text-2011"
						className="left-[42%] top-[26%] md:left-[40%] md:top-[27%] lg:left-[40%] xl:left-[30%] xl:top-[27%] 2xl:left-[35%] 2xl:top-[7%]"
					>
						<p>Graduated from Burnaby North Secondary with the Honour Cord</p>
					</TimelineText>
					<TimelineText
						id="text-2011-2"
						className="left-[45%] top-[30%] md:left-[42%] md:top-[31%] lg:left-[33%] xl:left-[30%] xl:top-[31%] 2xl:left-[37%] 2xl:top-[15%]"
					>
						<p>Went to the University of Toronto for Engineering</p>
					</TimelineText>
					<TimelineText
						id="text-2014"
						className="left-[33%] top-[36%] md:left-[30%] md:top-[38%] lg:left-[23%] xl:left-[25%] xl:top-[38%] 2xl:left-[22%] 2xl:top-[29%]"
					>
						<p>
							Completed 2 years, but withdrew from the program upon realizing it
							wasn&apos;t for me.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2015"
						className="left-[47%] top-[41%] md:left-[42%] md:top-[42%] lg:left-[33%] lg:top-[42%] xl:left-[28%] xl:top-[42%] 2xl:left-[31%] 2xl:top-[36%]"
					>
						<p>
							Enrolled and completed the Associates Certificate for Graphic
							Design at BCIT
						</p>
					</TimelineText>
					<TimelineText
						id="text-2016"
						className="left-[50%] top-[45%] md:left-[46%] md:top-[45%] lg:left-[35%] lg:top-[45%] xl:left-[32%] xl:top-[45%] 2xl:left-[40%] 2xl:top-[44%]"
					>
						<p>Entered the world of creative barbering</p>
					</TimelineText>
					<TimelineText
						id="text-barbering-great"
						className="left-[43%] top-[50%] md:left-[40%] md:top-[49%] lg:left-[35%] lg:top-[48%] xl:left-[28%] xl:top-[49%] 2xl:left-[40%] 2xl:top-[50%]"
					>
						<p>
							It was great at first. I participated in competitions, built a
							steady clientele, became self-employed with my best month of doing
							$9.4k in sales
						</p>
					</TimelineText>
					<TimelineText
						id="text-2023"
						className="left-[57%] top-[56%] md:left-[48%] md:top-[56%] lg:left-[35%] lg:top-[53%] xl:left-[32%] xl:top-[56%] 2xl:left-[40%] 2xl:top-[67%]"
					>
						<p>
							...but over time I lost the passion, felt limited in my growth,
							and simply felt like I can achieve more elsewhere.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2024"
						className="left-[57%] top-[62%] md:left-[46%] md:top-[62%] 2xl:left-[35%] 2xl:top-[73%]"
					>
						<p>
							I explored a few different paths, while keeping my barbering job.
							Most notably I pursued cinematography where I earned a &apos;Best
							Cinematography Award&apos; nomination at a local film festival.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2025"
						className="left-[57%] top-[78%] xl:top-[80%] 2xl:left-[35%] 2xl:top-[91%]"
					>
						<p>
							Ultimately, I learned two things about myself after this
							exploration phase. I love technology and creative problem solving.
							So I dove head first in software development and after learning on
							my own, I built and launched my mobile app Bingeable, which has a
							real growing user base.
						</p>
						<p>
							I am now looking to apply my skills and learnings at a place where
							I can contribute and grow further...
						</p>
					</TimelineText>
				</div>
			</div>
		</div>
	);
}
