import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import Footer from "./Footer";

const AUTO_DURATION = 8000;
const TRANSITION_DURATION = 1.15;

function FullpageScroller({
	sections,
	includeFooter = true,
	autoAdvance = true, //temp
}) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isFooterOpen, setIsFooterOpen] = useState(false);
	const [footerHeight, setFooterHeight] = useState(220);

	const scrollerRef = useRef(null);
	const viewportRef = useRef(null);
	const trackRef = useRef(null);
	const footerRef = useRef(null);
	const sectionRefs = useRef([]);
	const autoTimerRef = useRef(null);

	const pauseAutoAdvance = useCallback(() => {
		if (autoTimerRef.current) {
			window.clearTimeout(autoTimerRef.current);
			autoTimerRef.current = null;
		}
		setIsPaused(true);
	}, []);

	const resumeAutoAdvance = useCallback(() => {
		setIsPaused(false);
	}, []);

	const panels = sections;

	const animateSectionContent = useCallback((index) => {
		const section = sectionRefs.current[index];
		if (!section) {
			return;
		}

		const animatedChildren = section.querySelectorAll("[data-animate]");

		gsap.killTweensOf(section);
		gsap.killTweensOf(animatedChildren);
		gsap.set(section, { autoAlpha: 1 });

		if (!animatedChildren.length) {
			gsap.fromTo(
				section,
				{ autoAlpha: 0.7, y: 28 },
				{ autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" },
			);
			return;
		}

		gsap.fromTo(
			animatedChildren,
			{ autoAlpha: 0, y: 36 },
			{
				autoAlpha: 1,
				y: 0,
				duration: 0.85,
				ease: "power3.out",
				stagger: 0.12,
			},
		);
	}, []);

	const goToSection = useCallback(
		(index) => {
			if (
				isAnimating ||
				index === activeIndex ||
				index < 0 ||
				index >= panels.length
			) {
				return;
			}

			if (isFooterOpen && viewportRef.current) {
				gsap.set(viewportRef.current, { y: 0 });
				setIsFooterOpen(false);
			}

			setIsAnimating(true);

			gsap.to(trackRef.current, {
				yPercent: -(index * 100),
				duration: TRANSITION_DURATION,
				ease: "power3.inOut",
				onComplete: () => {
					animateSectionContent(index);
					setActiveIndex(index);
					setIsAnimating(false);
				},
			});
		},
		[
			activeIndex,
			animateSectionContent,
			isAnimating,
			isFooterOpen,
			panels.length,
		],
	);

	const showFooter = useCallback(() => {
		if (!includeFooter || isAnimating || isFooterOpen || !viewportRef.current) {
			return;
		}

		setIsAnimating(true);

		gsap.to(viewportRef.current, {
			y: -footerHeight,
			duration: TRANSITION_DURATION,
			ease: "power3.inOut",
			onComplete: () => {
				setIsFooterOpen(true);
				setIsAnimating(false);
			},
		});
	}, [footerHeight, includeFooter, isAnimating, isFooterOpen]);

	const hideFooter = useCallback(() => {
		if (
			!includeFooter ||
			isAnimating ||
			!isFooterOpen ||
			!viewportRef.current
		) {
			return;
		}

		setIsAnimating(true);

		gsap.to(viewportRef.current, {
			y: 0,
			duration: TRANSITION_DURATION,
			ease: "power3.inOut",
			onComplete: () => {
				setIsFooterOpen(false);
				setIsAnimating(false);
			},
		});
	}, [includeFooter, isAnimating, isFooterOpen]);

	useEffect(() => {
		if (!trackRef.current) {
			return undefined;
		}

		gsap.set(trackRef.current, { yPercent: 0 });
		if (viewportRef.current) {
			gsap.set(viewportRef.current, { y: 0 });
		}
		animateSectionContent(0);
		return undefined;
	}, [animateSectionContent]);

	useEffect(() => {
		const updateFooterHeight = () => {
			if (footerRef.current) {
				setFooterHeight(footerRef.current.offsetHeight);
			}
		};

		updateFooterHeight();
		window.addEventListener("resize", updateFooterHeight);

		return () => window.removeEventListener("resize", updateFooterHeight);
	}, []);

	useEffect(() => {
		const node = scrollerRef.current;

		if (!node) {
			return undefined;
		}

		const onWheel = (event) => {
			if (window.innerWidth < 1024) {
				return;
			}

			event.preventDefault();

			if (isAnimating) {
				return;
			}

			if (event.deltaY > 0) {
				if (activeIndex === panels.length - 1) {
					showFooter();
					return;
				}
				goToSection(activeIndex + 1);
			} else if (event.deltaY < 0) {
				if (isFooterOpen) {
					hideFooter();
					return;
				}
				goToSection(activeIndex - 1);
			}
		};

		const onKeyDown = (event) => {
			if (window.innerWidth < 1024 || isAnimating) {
				return;
			}

			if (event.key === "ArrowDown" || event.key === "PageDown") {
				event.preventDefault();
				if (activeIndex === panels.length - 1) {
					showFooter();
					return;
				}
				goToSection(activeIndex + 1);
			}

			if (event.key === "ArrowUp" || event.key === "PageUp") {
				event.preventDefault();
				if (isFooterOpen) {
					hideFooter();
					return;
				}
				goToSection(activeIndex - 1);
			}
		};

		node.addEventListener("wheel", onWheel, { passive: false });
		window.addEventListener("keydown", onKeyDown);

		return () => {
			node.removeEventListener("wheel", onWheel);
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [
		activeIndex,
		goToSection,
		hideFooter,
		isAnimating,
		isFooterOpen,
		panels.length,
		showFooter,
	]);

	useEffect(() => {
		if (
			!autoAdvance ||
			typeof window === "undefined" ||
			window.innerWidth < 1024 ||
			isPaused ||
			isAnimating
		) {
			return undefined;
		}

		autoTimerRef.current = window.setTimeout(() => {
			if (activeIndex === panels.length - 1) {
				showFooter();
				return;
			}
			goToSection(activeIndex + 1);
		}, AUTO_DURATION);

		return () => window.clearTimeout(autoTimerRef.current);
	}, [
		activeIndex,
		autoAdvance,
		goToSection,
		isPaused,
		isAnimating,
		panels.length,
		showFooter,
	]);

	return (
		<div
			ref={scrollerRef}
			className="relative h-[calc(100svh-100px)] overflow-hidden"
			onMouseEnter={pauseAutoAdvance}
			onMouseLeave={resumeAutoAdvance}
			onFocus={pauseAutoAdvance}
			onBlur={resumeAutoAdvance}
		>
			<div className="section-nav" aria-label="Page section navigation">
				{sections.map((section, index) => (
					<button
						key={section.id}
						type="button"
						onClick={() => goToSection(index)}
						className={`section-nav__button ${activeIndex === index ? "is-current" : ""}`}
						aria-label={section.id}
					>
						<span
							className={`section-nav__dot ${activeIndex === index && !isPaused ? "is-playing" : ""}`}
							style={{ "--progress-duration": `${AUTO_DURATION}ms` }}
						>
							<span className="section-nav__index">{index + 1}</span>
							<svg
								className="section-nav__ring"
								viewBox="0 0 32 32"
								aria-hidden="true"
							>
								<circle
									className="section-nav__ring-track"
									cx="16"
									cy="16"
									r="13"
								/>
								<circle
									className="section-nav__ring-progress"
									cx="16"
									cy="16"
									r="13"
								/>
							</svg>
							<span className="section-nav__core" />
						</span>
					</button>
				))}
			</div>

			{includeFooter ? (
				<div ref={footerRef} className="absolute inset-x-0 bottom-0 z-0">
					<Footer />
				</div>
			) : null}

			<div ref={viewportRef} className="relative z-10 h-full">
				<div ref={trackRef} className="home-track">
					{panels.map((section, index) => (
						<div
							key={section.id}
							ref={(node) => {
								sectionRefs.current[index] = node;
							}}
							className="home-panel"
						>
							{section.render()}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default FullpageScroller;
