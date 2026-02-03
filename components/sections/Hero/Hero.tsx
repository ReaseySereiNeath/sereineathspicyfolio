"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Intro overlay refs
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const introNameRef = useRef<HTMLDivElement>(null);
  const introSereiRef = useRef<HTMLSpanElement>(null);
  const introNeathRef = useRef<HTMLSpanElement>(null);
  const introEreiRef = useRef<HTMLSpanElement>(null);
  const introEathRef = useRef<HTMLSpanElement>(null);

  // Content refs
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = useCallback(() => {
    document
      .querySelector('[data-section="projects"]')
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToContact = useCallback(() => {
    document
      .querySelector('[data-section="contact"]')
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial states
      gsap.set(introNameRef.current, { gap: 0 });
      gsap.set([introSereiRef.current, introNeathRef.current], { opacity: 0, scale: 0.8 });
      gsap.set([introEreiRef.current, introEathRef.current], {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.5 });
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set([badgeRef.current, headingRef.current, descriptionRef.current], {
        opacity: 0,
        y: 20,
      });
      gsap.set(buttonsRef.current?.children || [], { opacity: 0, y: 20 });
      gsap.set(tagsRef.current?.children || [], { opacity: 0, y: 20 });
      gsap.set(folderRef.current, { opacity: 0, y: -120, rotation: -2 });

      // Animation sequence
      tl
        // Phase 1: Show SN centered
        .to([introSereiRef.current, introNeathRef.current], {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        })
        .to(glowRef.current, {
          opacity: 0.6,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.5")

        // Hold on SN
        .to({}, { duration: 0.8 })

        // Phase 2: Split to SEREI NEATH - reveal letters
        .to([introEreiRef.current, introEathRef.current], {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(introNameRef.current, {
          gap: "0.5rem",
          duration: 0.8,
          ease: "power3.out",
        }, "<")

        // Hold on full name
        .to({}, { duration: 0.8 })

        // Phase 3: Fade out intro overlay, show content
        .to(introOverlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (introOverlayRef.current) {
              introOverlayRef.current.style.pointerEvents = "none";
            }
          },
        })
        .to(contentRef.current, {
          opacity: 1,
          duration: 0.3,
        }, "-=0.3")

        // Phase 4: Animate in content
        .to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.1")
        .to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.3")
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.3")
        .to(buttonsRef.current?.children || [], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }, "-=0.3")
        .to(tagsRef.current?.children || [], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        }, "-=0.3")

        // Phase 5: Drop CV folder
        .to(folderRef.current, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
        }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#05070B] text-white"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(1200px_circle_at_50%_35%,rgba(80,140,255,0.18),transparent_60%),radial-gradient(900px_circle_at_75%_55%,rgba(120,80,255,0.12),transparent_60%),radial-gradient(900px_circle_at_20%_70%,rgba(50,220,180,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -top-28 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[560px] w-[560px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
        <div className="absolute inset-0 [mask-image:radial-gradient(50%_45%_at_50%_35%,black_60%,transparent_100%)]">
          <div className="absolute inset-0 opacity-[0.08] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
        </div>
      </div>

      {/* Intro overlay - SN animation */}
      <div
        ref={introOverlayRef}
        className="fixed inset-0 z-30 flex items-center justify-center bg-[#05070B]"
      >
          {/* Ambient Glow */}
          <div
            ref={glowRef}
            className="absolute h-52 w-52 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(80,140,255,0.25) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Split Name Animation */}
          <div
            ref={introNameRef}
            className="relative z-10 flex items-center text-4xl font-semibold text-white md:text-6xl"
            style={{ gap: 0 }}
          >
            <span ref={introSereiRef} className="inline-flex" style={{ opacity: 0 }}>
              <span>S</span>
              <span
                ref={introEreiRef}
                className="inline-block origin-left whitespace-nowrap lowercase"
                style={{ opacity: 0, transform: "scaleX(0)" }}
              >
                erei
              </span>
            </span>
            <span ref={introNeathRef} className="inline-flex" style={{ opacity: 0 }}>
              <span>N</span>
              <span
                ref={introEathRef}
                className="inline-block origin-left whitespace-nowrap lowercase"
                style={{ opacity: 0, transform: "scaleX(0)" }}
              >
                eath
              </span>
            </span>
          </div>
        </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 py-20"
      >
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          {/* LEFT: text content */}
          <div>
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              FastAPI • Next.js • WebSockets
            </div>

            <h1
              ref={headingRef}
              className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
            >
              I&apos;m <span className="text-white/90">Serei Neath</span>
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-white bg-clip-text text-transparent">
                Full-Stack Developer
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
            >
              I build real-time web apps and monitoring dashboards — scalable APIs, live updates,
              and reliable system control.
            </p>

            <div ref={buttonsRef} className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={scrollToProjects}
                className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_10px_40px_rgba(255,255,255,0.12)] transition hover:translate-y-[-1px]"
              >
                View Projects
              </button>
              <button
                onClick={scrollToContact}
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                Contact Me
              </button>
            </div>

            <div ref={tagsRef} className="mt-8 flex flex-wrap gap-2 text-xs text-white/55">
              {["FastAPI", "Next.js", "TypeScript", "Docker", "Linux", "WebSockets"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: CV folder card */}
          <div className="relative">
            <div ref={folderRef} className="relative mx-auto w-[min(440px,92vw)]">
              <FolderCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FolderCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]">
      {/* subtle glow */}
      <div className="pointer-events-none absolute -left-24 top-10 h-40 w-80 rotate-12 bg-white/10 blur-2xl" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-white/50">Resume</p>
          <h3 className="mt-1 text-lg font-semibold">CV Folder</h3>
          <p className="mt-2 text-sm text-white/65">
            Download my resume or open the PDF.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60">
          Updated
        </div>
      </div>

      {/* Folder graphic */}
      <div className="mt-6">
        <div className="relative mx-auto h-44 w-full max-w-[360px]">
          <div className="absolute left-6 top-4 h-10 w-24 rounded-t-2xl bg-white/[0.18]" />
          <div className="absolute inset-0 top-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.16] to-white/[0.06]" />
          <div className="absolute left-10 right-10 top-16 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white/85">CV.pdf</span>
              <span className="text-xs text-white/50">PDF</span>
            </div>
            <div className="mt-3 h-2 w-2/3 rounded-full bg-white/[0.12]" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
            <div className="mt-2 h-2 w-3/5 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <a
          href="/cv.pdf"
          className="w-full rounded-xl bg-blue-400/90 px-4 py-2 text-center text-sm font-medium text-black transition hover:translate-y-[-1px]"
        >
          Download CV
        </a>
        <a
          href="#contact"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-center text-sm text-white/85 transition hover:bg-white/10"
        >
          Hire Me
        </a>
      </div>
    </div>
  );
}

export default Hero;
