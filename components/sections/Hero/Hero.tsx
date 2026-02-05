"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/utils/gsap-config";
import { getAnimationPreferences } from "@/lib/hooks/useAnimationPreferences";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;

    if (!animationComplete) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
    };
  }, [animationComplete]);

  // Intro refs
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const nameWrapperRef = useRef<HTMLDivElement>(null);
  const sereiGroupRef = useRef<HTMLDivElement>(null);
  const neathGroupRef = useRef<HTMLDivElement>(null);
  const sereiInnerRef = useRef<HTMLSpanElement>(null);
  const neathInnerRef = useRef<HTMLSpanElement>(null);
  const sLetterRef = useRef<HTMLSpanElement>(null);
  const nLetterRef = useRef<HTMLSpanElement>(null);
  const ereiRef = useRef<HTMLSpanElement>(null);
  const eathRef = useRef<HTMLSpanElement>(null);

  // Content refs
  const contentRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!portalTarget) return;
      const measureInnerWidth = (
        group: HTMLDivElement | null,
        inner: HTMLSpanElement | null
      ) => {
        if (!group || !inner) return 0;
        const prevWidth = group.style.width;
        const prevOverflow = group.style.overflow;
        group.style.width = "auto";
        group.style.overflow = "visible";
        const width = inner.getBoundingClientRect().width;
        group.style.width = prevWidth;
        group.style.overflow = prevOverflow;
        return Math.ceil(width);
      };

      // Always kill existing tweens and reset - handles HMR and Strict Mode
      const tweenTargets = [
        nameWrapperRef.current,
        sereiGroupRef.current,
        neathGroupRef.current,
        ereiRef.current,
        eathRef.current,
        introOverlayRef.current,
        contentRef.current,
        leftContentRef.current,
        subtitleRef.current,
        descriptionRef.current,
        folderRef.current,
      ].filter(Boolean);

      gsap.killTweensOf(tweenTargets);

      // Clear all inline styles first
      if (nameWrapperRef.current) {
        nameWrapperRef.current.removeAttribute("style");
      }
      if (sereiGroupRef.current) {
        sereiGroupRef.current.removeAttribute("style");
      }
      if (neathGroupRef.current) {
        neathGroupRef.current.removeAttribute("style");
      }
      if (ereiRef.current) {
        ereiRef.current.removeAttribute("style");
      }
      if (eathRef.current) {
        eathRef.current.removeAttribute("style");
      }

      // ============== MEASURE WIDTHS ==============
      const sWidth = Math.ceil(sLetterRef.current?.getBoundingClientRect().width || 0);
      const nWidth = Math.ceil(nLetterRef.current?.getBoundingClientRect().width || 0);
      const startSWidth = sWidth > 0 ? sWidth : 50;
      const startNWidth = nWidth > 0 ? nWidth : 50;

      // ============== INITIAL STATES ==============
      const { shouldSimplifyAnimations } = getAnimationPreferences();

      gsap.set(introOverlayRef.current, { opacity: 1 });
      gsap.set(sereiGroupRef.current, { x: 0, width: startSWidth });
      gsap.set(neathGroupRef.current, { x: 0, width: startNWidth });
      gsap.set(ereiRef.current, { opacity: 0, xPercent: -100 });
      gsap.set(eathRef.current, { opacity: 0, xPercent: -100 });
      // Use autoAlpha instead of opacity - it handles visibility too
      // On mobile: skip blur/textShadow animations (very expensive on mobile GPUs)
      gsap.set(nameWrapperRef.current, {
        scale: shouldSimplifyAnimations ? 0.8 : 0.5,
        autoAlpha: 0,
        filter: shouldSimplifyAnimations ? "none" : "blur(8px)",
        textShadow: shouldSimplifyAnimations ? "none" : "0 0 40px rgba(255,255,255,0.8)",
        x: 0,
        y: 0,
        gap: "0px",
        willChange: "transform, opacity",
      });

      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(leftContentRef.current, { opacity: 0, x: -80 });
      gsap.set(subtitleRef.current, { opacity: 0, x: -60 });
      gsap.set(descriptionRef.current, { opacity: 0, x: -50 });
      gsap.set(tagsRef.current?.children || [], { opacity: 0, x: -30 });
      gsap.set(folderRef.current, { opacity: 0, y: -200, rotation: -5 });

      // ============== TIMELINE ==============
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setAnimationComplete(true);
        },
        delay: 0.1, // Small delay for browser to be ready
      });

      tl
        // 1) Intro Zoom Effect: Scale -> 1.1 -> 1 (skip blur/glow on mobile for performance)
        .to(nameWrapperRef.current, {
          scale: 1.1,
          autoAlpha: 1,
          filter: "none",
          textShadow: shouldSimplifyAnimations ? "none" : "0 0 20px rgba(255,255,255,0.5)",
          duration: shouldSimplifyAnimations ? 0.8 : 1,
          ease: "expo.out",
        })
        .to(
          nameWrapperRef.current,
          {
            scale: 1,
            textShadow: "none",
            duration: shouldSimplifyAnimations ? 0.4 : 0.6,
            ease: "power2.inOut",
          },
          "-=0.4"
        )

        // 2) Hold "SN" centered for a beat (shorter on mobile)
        .to({}, { duration: shouldSimplifyAnimations ? 0.8 : 1 })

        // 3) S expands + "erei" slides out
        .to(sereiGroupRef.current, {
          width: () => {
            const width = measureInnerWidth(sereiGroupRef.current, sereiInnerRef.current);
            return width > 0 ? width : startSWidth;
          },
          duration: 0.5,
          ease: "power4.out",
        })
        .to(
          ereiRef.current,
          { xPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out" },
          "<"
        )

        // 4) N expands + "eath" slides out
        .to(
          neathGroupRef.current,
          {
            width: () => {
              const width = measureInnerWidth(neathGroupRef.current, neathInnerRef.current);
              return width > 0 ? width : startNWidth;
            },
            duration: 0.5,
            ease: "power4.out",
          },
          "<0.1"
        )
        .to(
          eathRef.current,
          { xPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out" },
          "<"
        )

        // 5) Gap grows between the two name groups
        .to(nameWrapperRef.current, { gap: "20px", duration: 0.5 }, "<")

        // 6) Hold on full name
        .to({}, { duration: 0.4 })

        // 7) Move name to left + fade overlay
        .to(nameWrapperRef.current, {
          x: () => {
            const rect = nameWrapperRef.current?.getBoundingClientRect();
            const nameWidth = rect?.width || 0;
            const targetLeft =
              window.innerWidth <= 768 ? 24 : Math.max(24, window.innerWidth * 0.08);
            const currentCenter = window.innerWidth / 2;
            return targetLeft + nameWidth / 2 - currentCenter;
          },
          y: () => {
            const targetTop = window.innerHeight * 0.35;
            const currentCenter = window.innerHeight / 2;
            return targetTop - currentCenter;
          },
          scale: 0.7,
          duration: 0.8,
          ease: "expo.inOut",
        })
        .to(introOverlayRef.current, { opacity: 0, duration: 0.5 }, "-=0.5")

        // 8) Content slides in
        .set(contentRef.current, { opacity: 1 })
        .to(leftContentRef.current, { x: 0, opacity: 1, duration: 0.7 })
        .to(subtitleRef.current, { x: 0, opacity: 1, duration: 0.6 }, "-=0.5")
        .to(descriptionRef.current, { x: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .to(
          tagsRef.current?.children || [],
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
          "-=0.3"
        )

        // 9) Folder drops with elastic bounce (simpler easing on mobile)
        .to(
          folderRef.current,
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: shouldSimplifyAnimations ? 0.6 : 1,
            ease: shouldSimplifyAnimations ? "power2.out" : "elastic.out(1, 0.75)",
          },
          "-=0.6"
        );
    },
    { scope: containerRef, dependencies: [portalTarget], revertOnUpdate: true }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-black text-white"
    >
      {/* Background effects */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          animationComplete ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(1200px_circle_at_50%_35%,rgba(80,140,255,0.18),transparent_60%),radial-gradient(900px_circle_at_75%_55%,rgba(120,80,255,0.12),transparent_60%),radial-gradient(900px_circle_at_20%_70%,rgba(50,220,180,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -top-28 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[560px] w-[560px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
      </div>

      {/* ============ INTRO OVERLAY ============ */}
      {portalTarget
        ? createPortal(
            <div
              ref={introOverlayRef}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-100"
              style={{ pointerEvents: animationComplete ? "none" : "auto" }}
            >
              <div
                ref={nameWrapperRef}
                className="flex items-baseline gap-0 text-5xl font-bold tracking-tight text-white md:text-7xl"
              >
                {/* overflow-hidden ensures tails are clipped "behind" */}
                <div
                  ref={sereiGroupRef}
                  className="relative inline-block overflow-hidden align-bottom"
                >
                  <span
                    ref={sereiInnerRef}
                    className="inline-flex items-baseline whitespace-nowrap"
                  >
                    <span ref={sLetterRef} className="inline-block">
                      S
                    </span>
                    <span ref={ereiRef} className="lowercase inline-block opacity-0">
                      erei
                    </span>
                  </span>
                </div>

                <div
                  ref={neathGroupRef}
                  className="relative inline-block overflow-hidden align-bottom"
                >
                  <span
                    ref={neathInnerRef}
                    className="inline-flex items-baseline whitespace-nowrap"
                  >
                    <span ref={nLetterRef} className="inline-block">
                      N
                    </span>
                    <span ref={eathRef} className="lowercase inline-block opacity-0">
                      eath
                    </span>
                  </span>
                </div>
              </div>
            </div>,
            portalTarget
          )
        : null}
      {/* ============ MAIN CONTENT ============ */}
      <div
        ref={contentRef}
        className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 py-20 opacity-0"
      >
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          {/* LEFT */}
          <div ref={leftContentRef}>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              <span className="text-white/90">Serei Neath</span>
            </h1>

            <div ref={subtitleRef} className="mt-2">
              <span className="text-3xl font-semibold leading-tight tracking-tight bg-gradient-to-r from-blue-300 via-sky-200 to-white bg-clip-text text-transparent md:text-5xl">
                Full-Stack Developer
              </span>
            </div>

            <p
              ref={descriptionRef}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
            >
              I build real-time web apps and monitoring dashboards — scalable APIs, live updates,
              and reliable system control.
            </p>

            <div ref={tagsRef} className="mt-8 flex flex-wrap gap-2 text-xs text-white/55">
              {["FastAPI", "Next.js", "TypeScript", "Docker", "Linux", "WebSockets"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
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
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
      <div className="pointer-events-none absolute -left-24 top-10 h-40 w-80 rotate-12 bg-white/10 blur-2xl" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-white/50">Resume</p>
          <h3 className="mt-1 text-lg font-semibold">CV Folder</h3>
          <p className="mt-2 text-sm text-white/65">Download my resume or open the PDF.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60">
          Updated
        </div>
      </div>

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
          className="w-full rounded-xl bg-blue-400/90 px-4 py-2 text-center text-sm font-medium text-black transition hover:translate-y-[-1px] cursor-pointer"
        >
          Download CV
        </a>
        <a
          href="#contact"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-center text-sm text-white/85 transition hover:bg-white/10 cursor-pointer"
        >
          Hire Me
        </a>
      </div>
    </div>
  );
}

export default Hero;

