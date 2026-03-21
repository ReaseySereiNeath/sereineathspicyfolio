"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { getAnimationPreferences } from "@/lib/hooks/useAnimationPreferences";
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
		const { isMobile } = getAnimationPreferences();

		const pulses = gsap
			.timeline({
				defaults: {
					duration: 0.05,
					autoAlpha: 1,
					scale: isMobile ? 1.5 : 2,
					transformOrigin: "center",
					ease: isMobile ? "power2.out" : "elastic(2.5, 1)",
				},
			})
			.to(".ball02, .text01, #text-2015, #ioftc", {}, 0.04)
			.to(".ball03, .text02, #text-2017, #online_google", {}, 0.07)
			.to(".ball04, .text03, #text-2019, #team_3", {}, 0.13)
			.to(".ball05, .text04, #text-2021, #win_seeds, #google_alone", {}, 0.17)
			.to(".ball06, .text05, #text-2022, #asean_team", {}, 0.2)
			.to(".ball07, .text06, #text-2023", {}, 0.23)
			.to(".ball08, .text07, #text-2024, #graduated", {}, 0.42)
			.to(".ball09, .text07, #text-2024-b, #life_japan, #shopie, #team_google", {}, 0.54)
			.to(".ball10, .text08, #text-2025", {}, 0.62);

		gsap
			.timeline({
				defaults: { duration: 1 },
				scrollTrigger: {
					trigger: "#svg-stage",
					scrub: isMobile ? 0.5 : true,
					start: "top 30%",
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
			className="flex size-full items-center justify-center bg-black px-4 py-16 sm:px-8 md:px-16 md:py-20 lg:px-24"
		>
			<div className="w-full max-w-7xl">
				{/* Header */}
				<SectionHeader
					badge="My Story"
					title="Journey & Timeline"
					description="A visual timeline of my personal and professional growth over the years"
				/>

				{/* Timeline Content */}
				<div className="relative -mt-20 w-full pb-40 md:-mt-48 lg:-mt-36 xl:-mt-52 2xl:mt-0">
					<TimelinePic
						id="ioftc"
						src="/ioftc.JPG"
						width={150}
						height={150}
						alt="institute-of-technology-of-cambodia"
						priority
						className="left-[75%] top-[17%] h-auto w-[55px] rotate-6 sm:left-[72%] sm:top-[17%] sm:w-[65px] md:left-[85%] md:top-[16.5%] md:w-[80px] lg:left-[83%] lg:top-[15%] lg:w-[110px] xl:left-[70%] xl:top-[16%] xl:w-[130px] 2xl:left-[70%] 2xl:top-[8%] 2xl:w-[150px]"
					/>
					<TimelinePic
						id="online_google"
						src="/online_google.png"
						width={120}
						height={120}
						alt="google-scholarship"
						priority
						className="left-[75%] top-[28%] h-auto w-[45px] -rotate-3 sm:left-[64%] sm:top-[36%] sm:w-[60px] md:left-[76%] md:top-[30%] md:w-[75px] lg:left-[70%] lg:top-[28%] lg:w-[95px] xl:left-[69%] xl:top-[30%] xl:w-[105px] 2xl:left-[60%] 2xl:top-[20%] 2xl:w-[120px]"
					/>
					<TimelinePic
						id="team_3"
						src="/team_3.png"
						width={120}
						height={120}
						alt="team-3"
						className="left-[85%] top-[31.5%] h-auto w-[40px] rotate-3 sm:left-[74%] sm:top-[37.5%] sm:w-[52px] md:left-[88%] md:top-[34%] md:w-[65px] lg:left-[80%] lg:top-[32%] lg:w-[88px] xl:left-[78%] xl:top-[35%] xl:w-[98px] 2xl:left-[70%] 2xl:top-[25%] 2xl:w-[120px]"
					/>
					<TimelinePic
						id="win_seeds"
						src="/win_seeds.png"
						width={150}
						height={150}
						alt="win-seeds"
						className="hidden h-auto rotate-2 lg:left-[90%] lg:top-[36%] lg:w-[85px] xl:left-[89%] xl:top-[38%] xl:w-[95px] 2xl:left-[85%] 2xl:top-[30%] 2xl:w-[150px] lg:block"
					/>
					<TimelinePic
						id="google_alone"
						src="/google_alone.png"
						width={140}
						height={140}
						alt="google-alone"
						className="hidden h-auto -rotate-5 lg:left-[93%] lg:top-[47%] lg:w-[75px] xl:left-[88%] xl:top-[48%] xl:w-[105px] 2xl:left-[90%] 2xl:top-[45%] 2xl:w-[140px] lg:block"
					/>
					<TimelinePic
						id="asean_team"
						src="/asean_team.png"
						width={130}
						height={130}
						alt="team-google"
						className="hidden h-auto rotate-5 lg:left-[84%] lg:top-[50%] lg:w-[70px] xl:left-[76%] xl:top-[52%] xl:w-[100px] 2xl:left-[75%] 2xl:top-[50%] 2xl:w-[130px] lg:block"
					/>
					<TimelinePic
						id="graduated"
						src="/graduated.png"
						width={180}
						height={180}
						alt="asean-team"
						className="-rotate-5 left-[12%] top-[72%] h-auto w-[70px] sm:left-[14%] sm:top-[66%] sm:w-[60px] md:left-[10%] md:top-[76%] md:w-[90px] lg:left-[3%] lg:top-[76%] lg:w-[95px] xl:left-[5%] xl:top-[76%] xl:w-[115px] 2xl:left-[75%] 2xl:top-[73%] 2xl:w-[180px]"
					/>
					<TimelinePic
						id="life_japan"
						src="/life_japan.png"
						width={180}
						height={180}
						alt="film-still-1"
						className="left-[35%] top-[75%] h-auto w-[50px] rotate-6 sm:left-[24%] sm:top-[70%] sm:w-[70px] md:left-[30%] md:top-[78%] md:w-[70px] lg:left-[20%] lg:top-[79%] lg:w-[80px] xl:left-[20%] xl:top-[%] xl:w-[100px] 2xl:left-[35%] 2xl:top-[81%] 2xl:w-[110px]"
					/>
					<TimelinePic
						id="shopie"
						src="/shopie.png"
						width={180}
						height={180}
						alt="shopie"
						className="left-[40%] top-[70.5%] hidden h-auto rotate-6 md:left-[50%] md:top-[80%] md:w-[120px] lg:left-[39%] lg:top-[82%] lg:w-[130px] xl:left-[40%] xl:top-[78%] xl:w-[170px] 2xl:left-[53%] 2xl:top-[81%] 2xl:w-[180px] md:block"
					/>
					<TimelinePic
						id="team_google"
						src="/team_google.png"
						width={250}
						height={250}
						alt="film-still-3"
						className="left-[60%] top-[73%] h-auto w-[75px] -rotate-3 sm:left-[58%] sm:top-[69.5%] sm:w-[110px] md:left-[74%] md:top-[77%] md:w-[130px] lg:left-[67%] lg:top-[80%] lg:w-[155px] xl:left-[70%] xl:top-[75%] xl:w-[205px] 2xl:left-[78%] 2xl:top-[82%] 2xl:w-[200px]"
					/>

					<svg
						id="svg-stage"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 600 2526.3"
						aria-hidden="true"
						className="mt-0 max-w-[600px] origin-left scale-[0.70] overflow-visible md:scale-75 2xl:scale-100"
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
							cy="760"
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
							className="text01 invisible fill-blue-400 text-[11px] font-semibold"
							x="40"
							y="194.11"
						>
							2015
						</text>
						<text
							className="text02 invisible fill-blue-400 text-[11px] font-semibold"
							x="40"
							y="394.11"
						>
							2017
						</text>
						<text
							className="text03 invisible fill-blue-400 text-[11px] font-semibold"
							x="40"
							y="724.11"
						>
							2019
						</text>
						<text
							className="text04 invisible fill-blue-400 text-[11px] font-semibold"
							x="40"
							y="994.11"
						>
							2021
						</text>
						<text
							className="text05 invisible fill-blue-400 text-[11px] font-semibold"
							x="40"
							y="1186.31"
						>
							2022
						</text>
						<text
							className="text06 invisible fill-blue-400 text-[11px] font-semibold"
							x="40"
							y="1440.31"
						>
							2023
						</text>
						<text
							className="text07 invisible fill-blue-400 text-[11px] font-semibold"
							x="40"
							y="1895.31"
						>
							2024
						</text>
						<text
							className="text08 invisible fill-blue-400 text-[11px] font-semibold"
							x="40"
							y="2186.81"
						>
							2025
						</text>
					</svg>

					<TimelineText
						id="text-2015"
						className="left-[55%] top-[18%] md:left-[57%] md:top-[17%] lg:left-[45%] lg:top-[16%] xl:left-[35%] xl:top-[17%] 2xl:left-[35%] 2xl:top-[6%]"
					>
						<p>
							Graduated from high school and enrolled at the Institute of
							Technology of Cambodia to study Chemical and Food Engineering.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2017"
						className="left-[58%] top-[23%] md:left-[59%] md:top-[22%] lg:left-[48%] lg:top-[22%] xl:left-[37%] xl:top-[22%] 2xl:left-[39%] 2xl:top-[14%]"
					>
						<p>
							Completed 2 years of study but withdrew from the program after
							realizing it wasn&apos;t the right path for me. Took time to
							explore my true passions and interests.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2019"
						className="left-[36%] top-[31%] md:left-[40%] md:top-[32%] lg:left-[29%] xl:left-[25%] xl:top-[32%] 2xl:left-[27%] 2xl:top-[26%]"
					>
						<p>
							After a 2-year gap, I decided to start fresh and applied for a
							scholarship at Kirirom Institute of Technology to study Software
							Engineering. This marked the beginning of my journey into tech.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2021"
						className="left-[58%] top-[36%] md:left-[58%] md:top-[38%] lg:left-[48%] lg:top-[39%] xl:left-[35%] xl:top-[38%] 2xl:left-[40%] 2xl:top-[34%]"
					>
						<p>
							Received the Google Women in Tech Scholarship (1 of 50 from 7,000+
							applicants). Achieved 1st in Cambodia and 2nd in ASEAN for the
							Data Science Explorers Program. Started professional software
							development with a Singapore-based client.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2022"
						className="left-[65%] top-[42%] md:left-[62%] md:top-[44%] lg:left-[53%] lg:top-[44%] xl:left-[40%] xl:top-[44%] 2xl:left-[45%] 2xl:top-[44%]"
					>
						<p>
							Ranked Top 7 in APAC Seeds for the Future program in Thailand and
							won the Audience Award in the Tech4Good Accelerator program by
							Huawei in Singapore.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2023"
						className="left-[43%] top-[50%] md:left-[58%] md:top-[50%] lg:left-[48%] lg:top-[50%] xl:left-[38%] xl:top-[50%] 2xl:left-[40%] 2xl:top-[53%]"
					>
						<p>
							Awarded a scholarship for the NUS Entrepreneurship Summer Program
							in Singapore, gaining valuable experience and expanding my
							network. Graduated from Kirirom Institute of Technology with a
							Bachelor&apos;s degree in Software Engineering and secured a
							full-time position as a Software Developer in Japan.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2024"
						className="left-[68%] top-[57%] md:left-[73%] md:top-[61%] lg:left-[62%] lg:top-[61%] xl:left-[46%] xl:top-[61%] 2xl:left-[55%] 2xl:top-[66%]"
					>
						<p>
							Relocated to Japan and began my professional career as a Software
							Developer, working on cutting-edge projects for Local 5G systems.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2024-b"
						className="left-[57%] top-[63%] md:left-[62%] md:top-[67%] lg:left-[50%] lg:top-[66%] xl:left-[40%] xl:top-[66%] 2xl:left-[40%] 2xl:top-[73%]"
					>
						<p>
							Contributed to multiple high-impact projects, collaborating with
							cross-functional teams to deliver user-centered web applications.
							Deepened my expertise in modern web technologies and agile
							development practices.
						</p>
					</TimelineText>
					<TimelineText
						id="text-2025"
						className="left-[40%] top-[85%] md:left-[30%] md:top-[88%] xl:left-[20%] xl:top-[93%] 2xl:left-[25%] 2xl:top-[95%]"
					>
						<p>
							Continuing to evolve as a software engineer, embracing new
							challenges and technologies. Actively seeking opportunities to
							make meaningful contributions while growing both professionally
							and personally.
						</p>
						<p>
							Looking forward to applying my skills and experience in an
							environment where I can create impact and continue learning…
						</p>
					</TimelineText>
				</div>
			</div>
		</div>
	);
}
