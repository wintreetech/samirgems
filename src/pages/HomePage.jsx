// import { useCallback, useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";

// import Footer from "../components/Footer";
// import ImageCard from "../components/ImageCard";
// import SectionHeading from "../components/SectionHeading";
// import StatGrid from "../components/StatGrid";
// import {
// 	expertiseCards,
// 	homeStats,
// 	sharedImages,
// 	GlobalLegacy,
// } from "../data/siteContent";
// import Seo from "../components/Seo";

// const AUTO_DURATION = 10000;
// const TRANSITION_DURATION = 1.15;
// const DESKTOP_BREAKPOINT = 1024;
// const SECTION_COUNT = 5;
// const MOBILE_SLIDE_COUNT = 6;

// const partnerLogos = [
// 	{ src: sharedImages.namdiaLogo, alt: "Namdia", delay: "0.76" },
// 	{ src: sharedImages.sodiamLogo, alt: "Sodiam", delay: "0.88" },
// 	{ src: sharedImages.OkavangoLogo, alt: "Okavango", delay: "1" },
// 	{ src: sharedImages.DeBeersLogo, alt: "De Beers", delay: "1.12" },
// ];

// function HomePage() {
// 	const [activeIndex, setActiveIndex] = useState(0);
// 	const [isPaused, setIsPaused] = useState(false);
// 	const [isAnimating, setIsAnimating] = useState(false);
// 	const [isFooterOpen, setIsFooterOpen] = useState(false);
// 	const [footerHeight, setFooterHeight] = useState(220);
// 	const [hoveredCard, setHoveredCard] = useState(null);
// 	const [isDesktop, setIsDesktop] = useState(() =>
// 		typeof window === "undefined"
// 			? true
// 			: window.innerWidth >= DESKTOP_BREAKPOINT,
// 	);

// 	const activeBackground = hoveredCard?.image || sharedImages.OurExpertise;
// 	const [mobileHeight, setMobileHeight] = useState(0);

// 	const homeRef = useRef(null);
// 	const viewportRef = useRef(null);
// 	const trackRef = useRef(null);
// 	const footerRef = useRef(null);
// 	const sectionRefs = useRef([]);
// 	const autoTimerRef = useRef(null);
// 	const [mobileIndex, setMobileIndex] = useState(0);
// 	const mobileSliderRef = useRef(null);
// 	const touchStartYRef = useRef(0);

// 	const hideSectionContent = useCallback((section) => {
// 		if (!section) {
// 			return;
// 		}

// 		const animatedChildren = Array.from(
// 			section.querySelectorAll("[data-animate]"),
// 		).filter((element) => !element.querySelector("[data-animate]"));

// 		gsap.killTweensOf(animatedChildren);
// 		gsap.set(animatedChildren, {
// 			autoAlpha: 0,
// 			y: 40,
// 			filter: "blur(10px)",
// 		});
// 	}, []);

// 	const animateSectionContent = useCallback((index) => {
// 		const section = sectionRefs.current[index];
// 		if (!section) {
// 			return;
// 		}

// 		const animatedChildren = Array.from(
// 			section.querySelectorAll("[data-animate]"),
// 		).filter((element) => !element.querySelector("[data-animate]"));

// 		const getDelay = (element, itemIndex) => {
// 			const rawDelay = Number(element.getAttribute("data-animate-delay"));
// 			return Number.isFinite(rawDelay) ? rawDelay : 0.18 + itemIndex * 0.2;
// 		};

// 		gsap.killTweensOf(animatedChildren);
// 		gsap.set(animatedChildren, {
// 			autoAlpha: 0,
// 			y: 40,
// 			filter: "blur(10px)",
// 		});

// 		animatedChildren.forEach((element, itemIndex) => {
// 			gsap.fromTo(
// 				element,
// 				{ autoAlpha: 0, y: 40, filter: "blur(10px)", scale: 0.992 },
// 				{
// 					autoAlpha: 1,
// 					y: 0,
// 					filter: "blur(0px)",
// 					scale: 1,
// 					duration: 0.92,
// 					ease: "power4.out",
// 					delay: getDelay(element, itemIndex),
// 					overwrite: "auto",
// 				},
// 			);
// 		});
// 	}, []);

// 	const goToMobileSlide = useCallback((index) => {
// 		const maxIndex = MOBILE_SLIDE_COUNT - 1; // hero, legacy, expertise, responsibility, global, footer

// 		setMobileIndex(Math.max(0, Math.min(index, maxIndex)));
// 	}, []);

// 	const scrollToMobileSection = useCallback(
// 		(id) => {
// 			if (id === "home-mobile-legacy") {
// 				goToMobileSlide(1);
// 			}

// 			if (id === "home-mobile-expertise") {
// 				goToMobileSlide(2);
// 			}
// 		},
// 		[goToMobileSlide],
// 	);

// 	// const pauseAutoProgress = useCallback(() => {
// 	// 	setIsPaused(true);

// 	// 	if (autoTimerRef.current) {
// 	// 		window.clearTimeout(autoTimerRef.current);
// 	// 		autoTimerRef.current = null;
// 	// 	}
// 	// }, []);

// 	// const handleManualSectionChange = useCallback(
// 	// 	(index) => {
// 	// 		pauseAutoProgress();
// 	// 		goToSection(index);
// 	// 	},
// 	// 	[goToSection, pauseAutoProgress],
// 	// );

// 	const goToSection = useCallback(
// 		(index) => {
// 			if (
// 				!isDesktop ||
// 				isAnimating ||
// 				index === activeIndex ||
// 				index < 0 ||
// 				index >= SECTION_COUNT
// 			) {
// 				return;
// 			}

// 			if (isFooterOpen && viewportRef.current) {
// 				gsap.set(viewportRef.current, { y: 0 });
// 				setIsFooterOpen(false);
// 			}

// 			setIsAnimating(true);

// 			sectionRefs.current.forEach((section, sectionIndex) => {
// 				if (sectionIndex !== index) {
// 					hideSectionContent(section);
// 				}
// 			});

// 			gsap.to(trackRef.current, {
// 				yPercent: -(index * 100),
// 				duration: TRANSITION_DURATION,
// 				ease: "power3.inOut",
// 				onComplete: () => {
// 					animateSectionContent(index);
// 					setActiveIndex(index);
// 					setIsAnimating(false);
// 				},
// 			});
// 		},
// 		[
// 			activeIndex,
// 			animateSectionContent,
// 			hideSectionContent,
// 			isAnimating,
// 			isDesktop,
// 			isFooterOpen,
// 		],
// 	);

// 	useEffect(() => {
// 		const update = () => {
// 			setMobileHeight(window.innerHeight - 100);
// 		};

// 		update();
// 		window.addEventListener("resize", update);
// 		window.addEventListener("orientationchange", update);

// 		return () => {
// 			window.removeEventListener("resize", update);
// 			window.removeEventListener("orientationchange", update);
// 		};
// 	}, []);

// 	const sections = [
// 		{
// 			id: "home-hero",
// 			render: () => (
// 				<section className="home-slide relative overflow-hidden bg-black">
// 					<div className="absolute inset-0">
// 						<img
// 							src={sharedImages.diamondOnStone}
// 							alt=""
// 							className="h-full w-full object-cover opacity-95"
// 						/>
// 					</div>

// 					<div className="home-slide__container relative z-10 grid h-full items-center">
// 						<div className="mx-auto w-full max-w-[1440px]">
// 							<div className="max-w-[560px]">
// 								<h1
// 									data-animate
// 									data-animate-delay="0.12"
// 									className="font-display text-[3rem] uppercase leading-[0.93] text-white md:text-[4rem]"
// 								>
// 									Crafting
// 									<br />
// 									Brilliance.
// 									<br />
// 									Defining
// 									<br />
// 									Legacy.
// 								</h1>
// 								<p
// 									data-animate
// 									data-animate-delay="0.34"
// 									className="mt-10 max-w-[30rem] font-copy text-xl leading-relaxed text-white"
// 								>
// 									A new chapter in precision diamond manufacturing and ethical
// 									sourcing.
// 								</p>
// 								<button
// 									type="button"
// 									onClick={() => goToSection(1)}
// 									data-animate
// 									data-animate-delay="0.56"
// 									className="group mt-10 inline-flex items-center gap-5 text-left"
// 								>
// 									<span className="font-copy text-base font-medium tracking-[0.03em] text-white transition group-hover:text-white/80">
// 										Discover Our Legacy
// 									</span>
// 									<img
// 										src={sharedImages.Arrow}
// 										alt=""
// 										className="object-cover opacity-95 transition-transform duration-500 ease-out group-hover:translate-x-2"
// 									/>
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			),
// 		},
// 		{
// 			id: "home-legacy",
// 			render: () => (
// 				<section className="home-slide relative overflow-hidden">
// 					<div className="absolute inset-0">
// 						<img
// 							src={sharedImages.HomeLegacy}
// 							alt=""
// 							className="h-full w-full object-cover"
// 						/>
// 						<div className="absolute inset-0 bg-black/20" />
// 					</div>

// 					<div className="home-slide__container relative z-10 flex h-full items-center justify-center">
// 						<div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-12 text-center lg:gap-18">
// 							<div>
// 								<h2
// 									data-animate
// 									data-animate-delay="0.16"
// 									className="font-display text-[2.25rem] uppercase leading-[0.96] text-white md:text-[3rem] lg:text-[4rem]"
// 								>
// 									A Legacy <br />
// 									Refined in Dubai
// 								</h2>
// 								<p
// 									data-animate
// 									data-animate-delay="0.38"
// 									className="mx-auto mt-10 max-w-[62rem] font-copy text-lg leading-relaxed text-white lg:mt-14"
// 								>
// 									Samir Gems FZCO marks the next chapter of a legacy shaped over
// 									six decades. Rooted in the heritage of Samir Gems, the FZCO
// 									entity has been operating independently in Dubai for over two
// 									decades. Refined in the city&apos;s global trade ecosystem, we
// 									unite time-honoured craftsmanship with Dubai&apos;s
// 									international trading excellence to shape diamonds of
// 									uncompromising precision and integrity.
// 								</p>
// 							</div>

// 							<div className="w-full">
// 								<StatGrid stats={homeStats} />
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			),
// 		},
// 		{
// 			id: "home-expertise",
// 			render: () => (
// 				<section className="home-slide relative overflow-hidden bg-black">
// 					<div className="absolute inset-0 z-0">
// 						<img
// 							src={activeBackground}
// 							alt=""
// 							className="h-full w-full object-cover opacity-40 transition-all duration-500 ease-in-out"
// 						/>
// 					</div>

// 					<div className="home-slide__container relative z-10 flex h-full items-center">
// 						<div className="mx-auto w-full max-w-[1440px]">
// 							<div className="my-24 lg:my-30">
// 								<SectionHeading title="Our Expertise" align="left" />
// 							</div>

// 							<div
// 								className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
// 								data-animate-delay="0.4"
// 							>
// 								{expertiseCards.map((card) => (
// 									<ImageCard
// 										key={card.title}
// 										image={card.image}
// 										title={card.title}
// 										description={card.description}
// 										className="h-[220px] shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
// 										hoverReveal
// 										onMouseEnter={() => setHoveredCard(card)}
// 										onMouseLeave={() => setHoveredCard(null)}
// 									/>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			),
// 		},
// 		{
// 			id: "home-responsibility",
// 			render: () => (
// 				<section className="home-slide relative overflow-hidden bg-black">
// 					<img
// 						src={sharedImages.handsImage}
// 						alt=""
// 						className="absolute inset-0 h-full w-full object-cover opacity-80"
// 					/>
// 					<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.42)_45%,rgba(0,0,0,0.62)_100%)]" />
// 					<div className="home-slide__container relative flex h-full items-center">
// 						<div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(320px,0.52fr)] lg:items-center">
// 							<div>
// 								<h2
// 									data-animate
// 									data-animate-delay="0.12"
// 									className="font-display text-[2.4rem] uppercase leading-[0.95] text-white md:text-[3rem] lg:text-[3.5rem]"
// 								>
// 									Responsibility <br /> Meets Perfection.
// 								</h2>
// 								<p
// 									data-animate
// 									data-animate-delay="0.34"
// 									className="mt-5 max-w-[42rem] font-copy text-[1rem] leading-[1.55] text-stone-300 md:text-[1.05rem]"
// 								>
// 									Responsibility and precision define every stone we craft. As
// 									an RJC-certified company, our diamonds follow a fully
// 									traceable mine-to-market journey, supported by stringent
// 									ethical standards. Advanced polishing technology works in
// 									harmony with generations of artisanship, ensuring every
// 									diamond reflects both integrity and uncompromising accuracy.
// 								</p>
// 								<button
// 									type="button"
// 									onClick={() => goToSection(4)}
// 									data-animate
// 									data-animate-delay="0.58"
// 									className="group mt-8 inline-flex items-center gap-5 text-left"
// 								>
// 									<span className="font-copy text-[0.92rem] font-medium tracking-[0.03em] text-white transition group-hover:text-white/80">
// 										Explore Our Partners
// 									</span>
// 									<img
// 										src={sharedImages.Arrow}
// 										alt=""
// 										className="object-cover opacity-95 transition-transform duration-500 ease-out group-hover:translate-x-2"
// 									/>
// 								</button>
// 							</div>

// 							<div className="grid grid-cols-2 gap-5 justify-self-end">
// 								{partnerLogos.map((logo) => (
// 									<div
// 										key={logo.alt}
// 										data-animate
// 										data-animate-delay={logo.delay}
// 										className="flex h-[133.33px] w-[236px] items-center justify-center bg-[linear-gradient(107.44deg,rgba(64,64,64,0.4)_2.01%,rgba(39,39,39,0.4)_99.94%)] backdrop-blur-[4.9px]"
// 									>
// 										<img
// 											src={logo.src}
// 											alt={logo.alt}
// 											className="max-h-[105px] w-full object-contain px-6"
// 										/>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			),
// 		},
// 		{
// 			id: "home-global",
// 			render: () => (
// 				<section className="home-slide relative overflow-hidden bg-black">
// 					<div className="absolute inset-0">
// 						<img
// 							src={sharedImages.bgimageforhomelast}
// 							alt=""
// 							className="h-full w-full"
// 						/>
// 					</div>

// 					<div className="home-slide__container relative z-10 flex h-full items-center">
// 						<div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 lg:grid-cols-[45%_55%]">
// 							<div>
// 								<SectionHeading
// 									title={
// 										<>
// 											A Global Legacy <br /> Shaped Across
// 											<br /> Continents.
// 										</>
// 									}
// 								/>

// 								<ul className="mt-8 space-y-6 font-copy text-base leading-none text-white">
// 									{GlobalLegacy.map((item, index, arr) => (
// 										<li
// 											key={item}
// 											data-animate
// 											data-animate-delay={0.34 + index * 0.14}
// 											className="relative flex items-center gap-3"
// 										>
// 											<div className="relative flex w-4 justify-center">
// 												{index !== arr.length - 1 ? (
// 													<span className="absolute top-4 h-[36px] w-px bg-white/30" />
// 												) : null}

// 												<span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/50 bg-black">
// 													<span className="h-1.5 w-1.5 rounded-full bg-white" />
// 												</span>
// 											</div>

// 											<span className="tracking-[0.01em]">{item}</span>
// 										</li>
// 									))}
// 								</ul>
// 							</div>

// 							<div
// 								data-animate
// 								data-animate-delay="0.92"
// 								className="relative flex justify-end"
// 							>
// 								<img
// 									src={sharedImages.samirgemsmap}
// 									alt=""
// 									className="h-full w-full object-contain"
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			),
// 		},
// 	];

// 	const showFooter = useCallback(() => {
// 		if (!isDesktop || isAnimating || isFooterOpen || !viewportRef.current) {
// 			return;
// 		}

// 		setIsAnimating(true);
// 		setIsFooterOpen(true);

// 		gsap.to(viewportRef.current, {
// 			y: -footerHeight,
// 			duration: TRANSITION_DURATION,
// 			ease: "power3.inOut",
// 			onComplete: () => {
// 				setIsAnimating(false);
// 			},
// 		});
// 	}, [footerHeight, isAnimating, isDesktop, isFooterOpen]);

// 	const hideFooter = useCallback(() => {
// 		if (!isDesktop || isAnimating || !isFooterOpen || !viewportRef.current) {
// 			return;
// 		}

// 		setIsAnimating(true);

// 		gsap.to(viewportRef.current, {
// 			y: 0,
// 			duration: TRANSITION_DURATION,
// 			ease: "power3.inOut",
// 			onComplete: () => {
// 				setIsFooterOpen(false);
// 				setIsAnimating(false);
// 			},
// 		});
// 	}, [isAnimating, isDesktop, isFooterOpen]);

// 	useEffect(() => {
// 		if (isDesktop) {
// 			return undefined;
// 		}

// 		const node = mobileSliderRef.current;

// 		if (!node) {
// 			return undefined;
// 		}

// 		let isLocked = false;

// 		const unlock = () => {
// 			window.setTimeout(() => {
// 				isLocked = false;
// 			}, 850);
// 		};

// 		const goNext = () => {
// 			setMobileIndex((current) =>
// 				Math.min(current + 1, MOBILE_SLIDE_COUNT - 1),
// 			);
// 		};

// 		const goPrev = () => {
// 			setMobileIndex((current) => Math.max(current - 1, 0));
// 		};

// 		const canScrollableMove = (scrollable, direction) => {
// 			if (!scrollable) return false;

// 			const scrollTop = scrollable.scrollTop;
// 			const maxScrollTop = scrollable.scrollHeight - scrollable.clientHeight;
// 			const buffer = 4;

// 			if (direction > 0) {
// 				return scrollTop < maxScrollTop - buffer;
// 			}

// 			return scrollTop > buffer;
// 		};

// 		const onWheel = (event) => {
// 			const delta = event.deltaY;

// 			if (Math.abs(delta) < 35) return;

// 			const scrollable = event.target.closest("[data-mobile-scrollable]");

// 			if (scrollable && canScrollableMove(scrollable, delta)) {
// 				return;
// 			}

// 			event.preventDefault();

// 			if (isLocked) return;

// 			isLocked = true;

// 			if (delta > 0) {
// 				goNext();
// 			} else {
// 				goPrev();
// 			}

// 			unlock();
// 		};

// 		const onTouchStart = (event) => {
// 			touchStartYRef.current = event.touches[0].clientY;
// 		};

// 		const onTouchEnd = (event) => {
// 			if (touchStartYRef.current === null) return;

// 			const touchEndY = event.changedTouches[0].clientY;
// 			const diffY = touchStartYRef.current - touchEndY;

// 			if (Math.abs(diffY) < 60) return;

// 			const scrollable = event.target.closest("[data-mobile-scrollable]");

// 			if (scrollable && canScrollableMove(scrollable, diffY)) {
// 				return;
// 			}

// 			if (isLocked) return;

// 			isLocked = true;

// 			if (diffY > 0) {
// 				goNext();
// 			} else {
// 				goPrev();
// 			}

// 			unlock();
// 		};

// 		node.addEventListener("wheel", onWheel, { passive: false });
// 		node.addEventListener("touchstart", onTouchStart, { passive: true });
// 		node.addEventListener("touchend", onTouchEnd, { passive: false });

// 		return () => {
// 			node.removeEventListener("wheel", onWheel);
// 			node.removeEventListener("touchstart", onTouchStart);
// 			node.removeEventListener("touchend", onTouchEnd);
// 		};
// 	}, [isDesktop]);

// 	useEffect(() => {
// 		if (typeof window === "undefined") {
// 			return undefined;
// 		}

// 		const handleResize = () => {
// 			const desktop = window.innerWidth >= DESKTOP_BREAKPOINT;
// 			setIsDesktop(desktop);

// 			if (!desktop) {
// 				setIsFooterOpen(false);
// 				setIsAnimating(false);
// 				if (viewportRef.current) {
// 					gsap.set(viewportRef.current, { y: 0 });
// 				}
// 				if (trackRef.current) {
// 					gsap.set(trackRef.current, { yPercent: 0 });
// 				}
// 			}
// 		};

// 		handleResize();
// 		window.addEventListener("resize", handleResize);

// 		return () => window.removeEventListener("resize", handleResize);
// 	}, []);

// 	useEffect(() => {
// 		if (!isDesktop || !trackRef.current) {
// 			return undefined;
// 		}

// 		gsap.set(trackRef.current, { yPercent: 0 });
// 		if (viewportRef.current) {
// 			gsap.set(viewportRef.current, { y: 0 });
// 		}

// 		sectionRefs.current.forEach((section, index) => {
// 			if (index !== 0) {
// 				hideSectionContent(section);
// 			}
// 		});

// 		animateSectionContent(0);
// 		return undefined;
// 	}, [animateSectionContent, hideSectionContent, isDesktop]);

// 	useEffect(() => {
// 		const updateFooterHeight = () => {
// 			if (footerRef.current) {
// 				setFooterHeight(footerRef.current.offsetHeight);
// 			}
// 		};

// 		updateFooterHeight();
// 		window.addEventListener("resize", updateFooterHeight);

// 		return () => window.removeEventListener("resize", updateFooterHeight);
// 	}, []);

// 	useEffect(() => {
// 		if (!isDesktop) {
// 			return undefined;
// 		}

// 		const node = homeRef.current;
// 		if (!node) {
// 			return undefined;
// 		}

// 		const onWheel = (event) => {
// 			event.preventDefault();

// 			if (isAnimating) {
// 				return;
// 			}

// 			if (event.deltaY > 0) {
// 				if (activeIndex === SECTION_COUNT - 1) {
// 					showFooter();
// 					return;
// 				}
// 				goToSection(activeIndex + 1);
// 			} else if (event.deltaY < 0) {
// 				if (isFooterOpen) {
// 					hideFooter();
// 					return;
// 				}
// 				goToSection(activeIndex - 1);
// 			}
// 		};

// 		const onKeyDown = (event) => {
// 			if (isAnimating) {
// 				return;
// 			}

// 			if (event.key === "ArrowDown" || event.key === "PageDown") {
// 				event.preventDefault();
// 				if (activeIndex === SECTION_COUNT - 1) {
// 					showFooter();
// 					return;
// 				}
// 				goToSection(activeIndex + 1);
// 			}

// 			if (event.key === "ArrowUp" || event.key === "PageUp") {
// 				event.preventDefault();
// 				if (isFooterOpen) {
// 					hideFooter();
// 					return;
// 				}
// 				goToSection(activeIndex - 1);
// 			}
// 		};

// 		node.addEventListener("wheel", onWheel, { passive: false });
// 		window.addEventListener("keydown", onKeyDown);

// 		return () => {
// 			node.removeEventListener("wheel", onWheel);
// 			window.removeEventListener("keydown", onKeyDown);
// 		};
// 	}, [
// 		activeIndex,
// 		goToSection,
// 		hideFooter,
// 		isAnimating,
// 		isDesktop,
// 		isFooterOpen,
// 		showFooter,
// 	]);

// 	useEffect(() => {
// 		if (
// 			!isDesktop ||
// 			typeof window === "undefined" ||
// 			isPaused ||
// 			isAnimating
// 		) {
// 			return undefined;
// 		}

// 		autoTimerRef.current = window.setTimeout(() => {
// 			if (activeIndex === SECTION_COUNT - 1) {
// 				showFooter();
// 				return;
// 			}
// 			goToSection(activeIndex + 1);
// 		}, AUTO_DURATION);

// 		return () => window.clearTimeout(autoTimerRef.current);
// 	}, [activeIndex, goToSection, isAnimating, isDesktop, isPaused, showFooter]);

// 	// useEffect(() => {
// 	// 	if (isDesktop) {
// 	// 		return undefined;
// 	// 	}

// 	// 	const node = mobileSliderRef.current;

// 	// 	if (!node) {
// 	// 		return undefined;
// 	// 	}

// 	// 	let isLocked = false;

// 	// 	const unlock = () => {
// 	// 		window.setTimeout(() => {
// 	// 			isLocked = false;
// 	// 		}, 850);
// 	// 	};

// 	// 	const onWheel = (event) => {
// 	// 		event.preventDefault();

// 	// 		if (isLocked) return;

// 	// 		isLocked = true;

// 	// 		if (event.deltaY > 0) {
// 	// 			goToMobileSlide(mobileIndex + 1);
// 	// 		} else if (event.deltaY < 0) {
// 	// 			goToMobileSlide(mobileIndex - 1);
// 	// 		}

// 	// 		unlock();
// 	// 	};

// 	// 	const onTouchStart = (event) => {
// 	// 		touchStartYRef.current = event.touches[0].clientY;
// 	// 	};

// 	// 	const onTouchEnd = (event) => {
// 	// 		if (isLocked) return;

// 	// 		const touchEndY = event.changedTouches[0].clientY;
// 	// 		const diffY = touchStartYRef.current - touchEndY;

// 	// 		if (Math.abs(diffY) < 45) return;

// 	// 		isLocked = true;

// 	// 		if (diffY > 0) {
// 	// 			goToMobileSlide(mobileIndex + 1);
// 	// 		} else {
// 	// 			goToMobileSlide(mobileIndex - 1);
// 	// 		}

// 	// 		unlock();
// 	// 	};

// 	// 	node.addEventListener("wheel", onWheel, { passive: false });
// 	// 	node.addEventListener("touchstart", onTouchStart, { passive: true });
// 	// 	node.addEventListener("touchend", onTouchEnd, { passive: true });

// 	// 	return () => {
// 	// 		node.removeEventListener("wheel", onWheel);
// 	// 		node.removeEventListener("touchstart", onTouchStart);
// 	// 		node.removeEventListener("touchend", onTouchEnd);
// 	// 	};
// 	// }, [isDesktop, mobileIndex, goToMobileSlide]);

// 	if (!isDesktop) {
// 		return (
// 			<>
// 				<Seo
// 					title="Samir Gems FZCO | Ethical Diamond Sourcing & Manufacturing in Dubai"
// 					description="Samir Gems FZCO is a Dubai-based diamond company built on a six-decade legacy, offering ethical rough diamond sourcing, precision manufacturing, polished diamonds, and transparent mine-to-market supply."
// 				/>
// 				<div className="bg-black">
// 					<div
// 						ref={mobileSliderRef}
// 						className="mobile-home-slider relative overflow-hidden bg-black"
// 						style={{ height: mobileHeight }}
// 					>
// 						<div
// 							className="transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
// 							style={{
// 								height: mobileHeight * MOBILE_SLIDE_COUNT,
// 								transform: `translate3d(0, -${mobileIndex * mobileHeight}px, 0)`,
// 								backfaceVisibility: "hidden",
// 								WebkitBackfaceVisibility: "hidden",
// 							}}
// 						>
// 							<section
// 								style={{ height: mobileHeight }}
// 								className="section-frame relative isolate  w-full   overflow-hidden bg-black"
// 							>
// 								<div className="absolute inset-0">
// 									<img
// 										src={sharedImages.diamondOnStone}
// 										alt=""
// 										className="h-full w-full object-cover"
// 									/>
// 									<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.05)_100%)]" />
// 								</div>

// 								<div className="relative z-10 flex h-full items-center px-5 py-10 sm:px-6">
// 									<div className="mx-auto w-full max-w-[1400px]">
// 										<div className="max-w-[21rem]">
// 											<h1 className="mt-4 font-display text-[2.9rem] uppercase leading-[0.9] text-white sm:text-[3.3rem]">
// 												Crafting
// 												<br />
// 												Brilliance.
// 												<br />
// 												Defining
// 												<br />
// 												Legacy.
// 											</h1>
// 											<p className="mt-6 max-w-[18rem] font-copy text-base leading-relaxed text-white/88">
// 												A new chapter in precision diamond manufacturing and
// 												ethical sourcing.
// 											</p>

// 											<div className="mt-8 flex flex-wrap gap-3">
// 												<button
// 													type="button"
// 													onClick={() =>
// 														scrollToMobileSection("home-mobile-legacy")
// 													}
// 													className="group mt-10 inline-flex items-center gap-5 text-left"
// 												>
// 													<span className="font-copy text-base font-medium tracking-[0.03em] text-white transition group-hover:text-white/80">
// 														Discover Our Legacy
// 													</span>
// 													<img
// 														src={sharedImages.Arrow}
// 														alt=""
// 														className="object-cover opacity-95 transition-transform duration-500 ease-out group-hover:translate-x-2"
// 													/>
// 												</button>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</section>

// 							<section
// 								style={{ height: mobileHeight }}
// 								id="home-mobile-legacy"
// 								className="section-frame relative  w-full   overflow-hidden px-5 py-12 sm:px-6 sm:py-14"
// 							>
// 								<div className="absolute inset-0">
// 									<img
// 										src={sharedImages.HomeLegacy}
// 										alt=""
// 										className="h-full w-full object-cover"
// 									/>
// 									<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.05)_100%)]" />
// 								</div>

// 								<div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center">
// 									<div className="w-full">
// 										<SectionHeading
// 											title="A Legacy Refined in Dubai"
// 											description="Samir Gems FZCO marks the next chapter of a legacy shaped over six decades. Rooted in the heritage of Samir Gems, the FZCO entity has been operating independently in Dubai for over two decades. Refined in the city's global trade ecosystem, we unite time-honoured craftsmanship with Dubai's international trading excellence to shape diamonds of uncompromising precision and integrity."
// 										/>

// 										<div className="mt-5">
// 											<StatGrid stats={homeStats} />
// 										</div>
// 									</div>
// 								</div>
// 							</section>

// 							<section
// 								style={{ height: mobileHeight }}
// 								id="home-mobile-expertise"
// 								className="section-frame relative  w-full   overflow-hidden bg-black px-5 py-12 sm:px-6 sm:py-14"
// 							>
// 								<div className="absolute inset-0">
// 									<img
// 										src={sharedImages.OurExpertise}
// 										alt=""
// 										className="h-full w-full object-cover opacity-18"
// 									/>
// 								</div>

// 								<div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center">
// 									<div className="w-full">
// 										<SectionHeading title="Our Expertise" />

// 										<div className="mt-8 -mx-5 overflow-x-auto px-5 pb-2">
// 											<div className="flex min-w-max snap-x snap-mandatory gap-4">
// 												{expertiseCards.map((card) => (
// 													<ImageCard
// 														key={card.title}
// 														image={card.image}
// 														title={card.title}
// 														description={card.description}
// 														className="min-h-[280px] w-[78vw] shrink-0 sm:w-[62vw]"
// 														hoverReveal
// 													/>
// 												))}
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</section>

// 							<section
// 								style={{ height: mobileHeight }}
// 								className="section-frame relative  w-full overflow-hidden bg-black px-5 py-12 sm:px-6 sm:py-14"
// 							>
// 								<img
// 									src={sharedImages.handsImage}
// 									alt=""
// 									className="absolute inset-0 h-full w-full object-cover opacity-60"
// 								/>
// 								<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.05)_100%)]" />

// 								<div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center">
// 									<div className="w-full">
// 										<SectionHeading
// 											title="Responsibility Meets Perfection."
// 											description="Responsibility and precision define every stone we craft. As an RJC-certified company, our diamonds follow a fully traceable mine-to-market journey, supported by stringent ethical standards. Advanced polishing technology works in harmony with generations of artisanship, ensuring every diamond reflects both integrity and uncompromising accuracy."
// 										/>

// 										<div className="mt-10 grid grid-cols-2 gap-4">
// 											{partnerLogos.map((logo) => (
// 												<div
// 													key={logo.alt}
// 													className="flex h-[120px] w-full items-center justify-center bg-[linear-gradient(107.44deg,rgba(64,64,64,0.4)_2.01%,rgba(39,39,39,0.4)_99.94%)] backdrop-blur-[4.9px]"
// 												>
// 													<img
// 														src={logo.src}
// 														alt={logo.alt}
// 														className="max-h-[90px] w-full object-contain px-5"
// 													/>
// 												</div>
// 											))}
// 										</div>
// 									</div>
// 								</div>
// 							</section>

// 							<section
// 								style={{ height: mobileHeight }}
// 								className="section-frame  w-full overflow-hidden bg-[linear-gradient(180deg,#0c0c0c,#111111)] px-5 py-8 sm:px-6 sm:py-10"
// 							>
// 								<div className="mx-auto flex h-full max-w-[1400px] items-center">
// 									<div
// 										data-mobile-scrollable
// 										className="max-h-[calc(100svh-140px)] w-full overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
// 									>
// 										<SectionHeading title="A Global Legacy Shaped Across Continents." />

// 										<ul className="mt-4 space-y-2 font-copy text-sm text-white sm:text-base">
// 											{GlobalLegacy.map((item, index, arr) => (
// 												<li key={item} className="relative flex gap-4">
// 													<div className="relative flex w-4 justify-center">
// 														{index !== arr.length - 1 ? (
// 															<span className="absolute top-4 h-[calc(100%+16px)] w-px bg-white/20" />
// 														) : null}
// 														<span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-white/50 bg-black">
// 															<span className="h-1.5 w-1.5 rounded-full bg-white" />
// 														</span>
// 													</div>
// 													<span className="leading-relaxed text-white/85">
// 														{item}
// 													</span>
// 												</li>
// 											))}
// 										</ul>

// 										<div className="mt-5 overflow-hidden border border-white/10 bg-white/[0.02] p-3">
// 											<img
// 												src={sharedImages.samirgemsmap}
// 												alt=""
// 												className="w-full object-contain opacity-95"
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 							</section>

// 							<div
// 								style={{ height: mobileHeight }}
// 								className=" w-full overflow-y-auto bg-black"
// 							>
// 								<Footer />
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</>
// 		);
// 	}

// 	return (
// 		<>
// 			<Seo
// 				title="Samir Gems FZCO | Ethical Diamond Sourcing & Manufacturing in Dubai"
// 				description="Samir Gems FZCO is a Dubai-based diamond company built on a six-decade legacy, offering ethical rough diamond sourcing, precision manufacturing, polished diamonds, and transparent mine-to-market supply."
// 			/>

// 			<div
// 				ref={homeRef}
// 				className="relative h-[calc(100svh-100px)] overflow-hidden"
// 				onMouseEnter={() => setIsPaused(true)}
// 				onMouseLeave={() => setIsPaused(false)}
// 			>
// 				<div
// 					ref={footerRef}
// 					className="stable-paint absolute inset-x-0 bottom-0 z-0"
// 				>
// 					<Footer />
// 				</div>

// 				{!isFooterOpen ? (
// 					<div className="section-nav" aria-label="Home section navigation">
// 						{sections.map((section, index) => (
// 							<button
// 								key={section.id}
// 								type="button"
// 								onClick={() => goToSection(index)}
// 								className={`section-nav__button ${activeIndex === index ? "is-current" : ""}`}
// 								aria-label={section.id}
// 							>
// 								<span
// 									className={`section-nav__dot ${activeIndex === index && !isPaused ? "is-playing" : ""}`}
// 									style={{ "--progress-duration": `${AUTO_DURATION}ms` }}
// 								>
// 									<span className="section-nav__index">{index + 1}</span>
// 									<svg
// 										className="section-nav__ring"
// 										viewBox="0 0 32 32"
// 										aria-hidden="true"
// 									>
// 										<circle
// 											className="section-nav__ring-track"
// 											cx="16"
// 											cy="16"
// 											r="13"
// 										/>
// 										<circle
// 											className="section-nav__ring-progress"
// 											cx="16"
// 											cy="16"
// 											r="13"
// 										/>
// 									</svg>
// 									<span className="section-nav__core" />
// 								</span>
// 							</button>
// 						))}
// 					</div>
// 				) : null}

// 				<div ref={viewportRef} className="relative z-10 h-full">
// 					<div ref={trackRef} className="home-track">
// 						{sections.map((section, index) => (
// 							<div
// 								key={section.id}
// 								ref={(node) => {
// 									sectionRefs.current[index] = node;
// 								}}
// 								className="home-panel"
// 							>
// 								{section.render()}
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }

// export default HomePage;
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import Footer from "../components/Footer";
import ImageCard from "../components/ImageCard";
import SectionHeading from "../components/SectionHeading";
import StatGrid from "../components/StatGrid";
import {
	expertiseCards,
	homeStats,
	sharedImages,
	GlobalLegacy,
} from "../data/siteContent";
import Seo from "../components/Seo";

const AUTO_DURATION = 10000;
const TRANSITION_DURATION = 1.15;
const DESKTOP_BREAKPOINT = 1024;
const SECTION_COUNT = 5;
const NAVBAR_H = 100;

// Mobile: 6 slides — 5 content + footer as last slide (swipe in/out normally)
const MOBILE_SLIDE_COUNT = 6;
const MOBILE_DURATION = 0.68;
const MOBILE_EASE = "power2.inOut";
const SWIPE_THRESHOLD = 30; // low = responsive, not sluggish
const SWIPE_VELOCITY = 0.15; // low = easy to trigger
const LOCK_MS = MOBILE_DURATION * 1000 + 60; // unlock right after anim

const partnerLogos = [
	{ src: sharedImages.namdiaLogo, alt: "Namdia", delay: "0.76" },
	{ src: sharedImages.sodiamLogo, alt: "Sodiam", delay: "0.88" },
	{ src: sharedImages.OkavangoLogo, alt: "Okavango", delay: "1" },
	{ src: sharedImages.DeBeersLogo, alt: "De Beers", delay: "1.12" },
];

function HomePage() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isFooterOpen, setIsFooterOpen] = useState(false);
	const [footerHeight, setFooterHeight] = useState(220);
	const [hoveredCard, setHoveredCard] = useState(null);
	const [isDesktop, setIsDesktop] = useState(() =>
		typeof window === "undefined"
			? true
			: window.innerWidth >= DESKTOP_BREAKPOINT,
	);

	const activeBackground = hoveredCard?.image || sharedImages.OurExpertise;

	// ── Desktop refs ─────────────────────────────────────────────────────────
	const homeRef = useRef(null);
	const viewportRef = useRef(null);
	const trackRef = useRef(null);
	const footerRef = useRef(null);
	const sectionRefs = useRef([]);
	const autoTimerRef = useRef(null);

	// ── Mobile refs ──────────────────────────────────────────────────────────
	const mobileTrackRef = useRef(null);
	const mobileCurrentRef = useRef(0);
	const mobileLockRef = useRef(false);
	const slideHeightRef = useRef(0);
	const touchStartYRef = useRef(0);
	const touchStartXRef = useRef(0);
	const touchStartTimeRef = useRef(0);

	// ── Desktop helpers ───────────────────────────────────────────────────────

	const hideSectionContent = useCallback((section) => {
		if (!section) return;
		const els = Array.from(section.querySelectorAll("[data-animate]")).filter(
			(el) => !el.querySelector("[data-animate]"),
		);
		gsap.killTweensOf(els);
		gsap.set(els, { autoAlpha: 0, y: 40, filter: "blur(10px)" });
	}, []);

	const animateSectionContent = useCallback((index) => {
		const section = sectionRefs.current[index];
		if (!section) return;
		const els = Array.from(section.querySelectorAll("[data-animate]")).filter(
			(el) => !el.querySelector("[data-animate]"),
		);
		const getDelay = (el, i) => {
			const raw = Number(el.getAttribute("data-animate-delay"));
			return Number.isFinite(raw) ? raw : 0.18 + i * 0.2;
		};
		gsap.killTweensOf(els);
		gsap.set(els, { autoAlpha: 0, y: 40, filter: "blur(10px)" });
		els.forEach((el, i) =>
			gsap.fromTo(
				el,
				{ autoAlpha: 0, y: 40, filter: "blur(10px)", scale: 0.992 },
				{
					autoAlpha: 1,
					y: 0,
					filter: "blur(0px)",
					scale: 1,
					duration: 0.92,
					ease: "power4.out",
					delay: getDelay(el, i),
					overwrite: "auto",
				},
			),
		);
	}, []);

	const goToSection = useCallback(
		(index) => {
			if (
				!isDesktop ||
				isAnimating ||
				index === activeIndex ||
				index < 0 ||
				index >= SECTION_COUNT
			)
				return;
			if (isFooterOpen && viewportRef.current) {
				gsap.set(viewportRef.current, { y: 0 });
				setIsFooterOpen(false);
			}
			setIsAnimating(true);
			sectionRefs.current.forEach((s, si) => {
				if (si !== index) hideSectionContent(s);
			});
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
			hideSectionContent,
			isAnimating,
			isDesktop,
			isFooterOpen,
		],
	);

	const showFooter = useCallback(() => {
		if (!isDesktop || isAnimating || isFooterOpen || !viewportRef.current)
			return;
		setIsAnimating(true);
		setIsFooterOpen(true);
		gsap.to(viewportRef.current, {
			y: -footerHeight,
			duration: TRANSITION_DURATION,
			ease: "power3.inOut",
			overwrite: "auto",
			onComplete: () => setIsAnimating(false),
		});
	}, [footerHeight, isAnimating, isDesktop, isFooterOpen]);

	const hideFooter = useCallback(() => {
		if (!isDesktop || isAnimating || !isFooterOpen || !viewportRef.current)
			return;
		setIsAnimating(true);
		gsap.to(viewportRef.current, {
			y: 0,
			duration: TRANSITION_DURATION,
			ease: "power3.inOut",
			overwrite: "auto",
			onComplete: () => {
				setIsFooterOpen(false);
				setIsAnimating(false);
			},
		});
	}, [isAnimating, isDesktop, isFooterOpen]);

	// ── Mobile: smooth GPU slide ──────────────────────────────────────────────
	const mobileGoTo = useCallback((index, force = false) => {
		if (mobileLockRef.current && !force) return;
		if (index < 0 || index >= MOBILE_SLIDE_COUNT) return;

		// Allow going to same index on force (orientation change re-snap)
		if (index === mobileCurrentRef.current && !force) return;

		mobileLockRef.current = true;
		mobileCurrentRef.current = index;

		const h = slideHeightRef.current;
		if (!h || !mobileTrackRef.current) {
			mobileLockRef.current = false;
			return;
		}

		gsap.to(mobileTrackRef.current, {
			y: -(index * h),
			duration: force ? 0 : MOBILE_DURATION,
			ease: MOBILE_EASE,
			overwrite: "auto",
			force3D: true,
			onComplete: () => {
				setTimeout(
					() => {
						mobileLockRef.current = false;
					},
					force ? 0 : LOCK_MS,
				);
			},
		});
	}, []);

	// ── Mobile: touch + wheel ─────────────────────────────────────────────────
	useEffect(() => {
		if (isDesktop) return undefined;

		const track = mobileTrackRef.current;
		if (!track) return undefined;
		const container = track.parentElement;

		const updateHeight = () => {
			slideHeightRef.current = container.offsetHeight;
			mobileGoTo(mobileCurrentRef.current, true); // re-snap instantly
		};
		updateHeight();

		window.addEventListener("resize", updateHeight, { passive: true });
		window.addEventListener("orientationchange", updateHeight, {
			passive: true,
		});

		// ── touch ──
		const onTouchStart = (e) => {
			// Don't capture if touch starts inside inner-scroll
			touchStartYRef.current = e.touches[0].clientY;
			touchStartXRef.current = e.touches[0].clientX;
			touchStartTimeRef.current = Date.now();
		};

		const onTouchMove = (e) => {
			// If finger is inside an inner-scrollable element (e.g. footer),
			// do NOT preventDefault — let iOS handle the scroll natively.
			const inner = e.target.closest("[data-inner-scroll]");
			if (inner) return;

			// Outside inner-scroll: prevent rubber-band on vertical moves,
			// but allow horizontal (card carousels).
			const dy = Math.abs(e.touches[0].clientY - touchStartYRef.current);
			const dx = Math.abs(e.touches[0].clientX - touchStartXRef.current);
			if (dy > dx) e.preventDefault();
		};

		const onTouchEnd = (e) => {
			if (mobileLockRef.current) return;

			const endY = e.changedTouches[0].clientY;
			const endX = e.changedTouches[0].clientX;
			const deltaY = touchStartYRef.current - endY; // + = swipe up = go next
			const deltaX = Math.abs(touchStartXRef.current - endX);
			const elapsed = Math.max(Date.now() - touchStartTimeRef.current, 1);
			const velocity = Math.abs(deltaY) / elapsed; // px/ms

			// Horizontal dominant → ignore
			if (deltaX > Math.abs(deltaY) * 1.5) return;

			// Not enough distance or speed
			if (Math.abs(deltaY) < SWIPE_THRESHOLD && velocity < SWIPE_VELOCITY)
				return;

			// Inner-scrollable boundaries
			const inner = e.target.closest("[data-inner-scroll]");
			if (inner) {
				const atTop = inner.scrollTop <= 1;
				const atBottom =
					inner.scrollTop >= inner.scrollHeight - inner.clientHeight - 1;
				if (deltaY > 0 && !atBottom) return;
				if (deltaY < 0 && !atTop) return;
			}

			const next =
				deltaY > 0
					? Math.min(mobileCurrentRef.current + 1, MOBILE_SLIDE_COUNT - 1)
					: Math.max(mobileCurrentRef.current - 1, 0);

			mobileGoTo(next);
		};

		// ── wheel (trackpad / DevTools) ──
		let wTimer = null;
		const onWheel = (e) => {
			if (Math.abs(e.deltaY) < 10) return;

			const inner = e.target.closest("[data-inner-scroll]");
			if (inner) {
				const atTop = inner.scrollTop <= 1;
				const atBottom =
					inner.scrollTop >= inner.scrollHeight - inner.clientHeight - 1;
				if (e.deltaY > 0 && !atBottom) return;
				if (e.deltaY < 0 && !atTop) return;
			}

			e.preventDefault();
			if (mobileLockRef.current) return;

			const next =
				e.deltaY > 0
					? Math.min(mobileCurrentRef.current + 1, MOBILE_SLIDE_COUNT - 1)
					: Math.max(mobileCurrentRef.current - 1, 0);

			mobileGoTo(next);
			clearTimeout(wTimer);
			wTimer = setTimeout(() => {
				mobileLockRef.current = false;
			}, LOCK_MS);
		};

		container.addEventListener("touchstart", onTouchStart, { passive: true });
		container.addEventListener("touchmove", onTouchMove, { passive: false });
		container.addEventListener("touchend", onTouchEnd, { passive: true });
		container.addEventListener("wheel", onWheel, { passive: false });

		return () => {
			container.removeEventListener("touchstart", onTouchStart);
			container.removeEventListener("touchmove", onTouchMove);
			container.removeEventListener("touchend", onTouchEnd);
			container.removeEventListener("wheel", onWheel);
			window.removeEventListener("resize", updateHeight);
			window.removeEventListener("orientationchange", updateHeight);
			clearTimeout(wTimer);
		};
	}, [isDesktop, mobileGoTo]);

	// ── Desktop: wheel + keyboard ─────────────────────────────────────────────
	useEffect(() => {
		if (!isDesktop) return undefined;
		const node = homeRef.current;
		if (!node) return undefined;
		const onWheel = (e) => {
			e.preventDefault();
			if (isAnimating) return;
			if (e.deltaY > 0) {
				if (activeIndex === SECTION_COUNT - 1) {
					showFooter();
					return;
				}
				goToSection(activeIndex + 1);
			} else {
				if (isFooterOpen) {
					hideFooter();
					return;
				}
				goToSection(activeIndex - 1);
			}
		};
		const onKeyDown = (e) => {
			if (isAnimating) return;
			if (e.key === "ArrowDown" || e.key === "PageDown") {
				e.preventDefault();
				if (activeIndex === SECTION_COUNT - 1) {
					showFooter();
					return;
				}
				goToSection(activeIndex + 1);
			}
			if (e.key === "ArrowUp" || e.key === "PageUp") {
				e.preventDefault();
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
		isDesktop,
		isFooterOpen,
		showFooter,
	]);

	// ── Desktop: auto-advance ─────────────────────────────────────────────────
	useEffect(() => {
		if (!isDesktop || isPaused || isAnimating) return undefined;
		autoTimerRef.current = window.setTimeout(() => {
			if (activeIndex === SECTION_COUNT - 1) {
				showFooter();
				return;
			}
			goToSection(activeIndex + 1);
		}, AUTO_DURATION);
		return () => window.clearTimeout(autoTimerRef.current);
	}, [activeIndex, goToSection, isAnimating, isDesktop, isPaused, showFooter]);

	// ── Resize / isDesktop ────────────────────────────────────────────────────
	useEffect(() => {
		const handle = () => {
			const desktop = window.innerWidth >= DESKTOP_BREAKPOINT;
			setIsDesktop(desktop);
			if (!desktop) {
				setIsFooterOpen(false);
				setIsAnimating(false);
				if (viewportRef.current) gsap.set(viewportRef.current, { y: 0 });
				if (trackRef.current) gsap.set(trackRef.current, { yPercent: 0 });
			}
		};
		handle();
		window.addEventListener("resize", handle);
		return () => window.removeEventListener("resize", handle);
	}, []);

	// ── Desktop init ──────────────────────────────────────────────────────────
	useEffect(() => {
		if (!isDesktop || !trackRef.current) return undefined;
		gsap.set(trackRef.current, { yPercent: 0 });
		if (viewportRef.current) gsap.set(viewportRef.current, { y: 0 });
		sectionRefs.current.forEach((s, i) => {
			if (i !== 0) hideSectionContent(s);
		});
		animateSectionContent(0);
		return undefined;
	}, [animateSectionContent, hideSectionContent, isDesktop]);

	// ── Footer height ─────────────────────────────────────────────────────────
	useEffect(() => {
		const upd = () => {
			if (footerRef.current) setFooterHeight(footerRef.current.offsetHeight);
		};
		upd();
		window.addEventListener("resize", upd);
		return () => window.removeEventListener("resize", upd);
	}, []);

	// ── Desktop sections ──────────────────────────────────────────────────────
	const sections = [
		{
			id: "home-hero",
			render: () => (
				<section className="home-slide relative overflow-hidden bg-black">
					<div className="absolute inset-0">
						<img
							src={sharedImages.diamondOnStone}
							alt=""
							className="h-full w-full object-cover opacity-95"
						/>
					</div>
					<div className="home-slide__container relative z-10 grid h-full items-center">
						<div className="mx-auto w-full max-w-[1440px]">
							<div className="max-w-[600px]">
								<h1
									data-animate
									data-animate-delay="0.12"
									className="font-display text-[3.5rem] uppercase leading-[0.93] text-white"
								>
									Samir Gems FZCO Crafting
									<br />
									Brilliance.
									<br />
									Defining
									<br />
									Legacy.
								</h1>
								<p
									data-animate
									data-animate-delay="0.34"
									className="mt-10 max-w-[30rem] font-copy text-xl leading-relaxed text-white"
								>
									A new chapter in precision diamond manufacturing and ethical
									sourcing.
								</p>
								<button
									type="button"
									onClick={() => goToSection(1)}
									data-animate
									data-animate-delay="0.56"
									className="group mt-10 inline-flex items-center gap-5 text-left"
								>
									<span className="font-copy text-base font-medium tracking-[0.03em] text-white transition group-hover:text-white/80">
										Discover Our Legacy
									</span>
									<img
										src={sharedImages.Arrow}
										alt=""
										className="object-cover opacity-95 transition-transform duration-500 ease-out group-hover:translate-x-2"
									/>
								</button>
							</div>
						</div>
					</div>
				</section>
			),
		},
		{
			id: "home-legacy",
			render: () => (
				<section className="home-slide relative overflow-hidden">
					<div className="absolute inset-0">
						<img
							src={sharedImages.HomeLegacy}
							alt=""
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/20" />
					</div>
					<div className="home-slide__container relative z-10 flex h-full items-center justify-center">
						<div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-12 text-center lg:gap-18">
							<div>
								<h2
									data-animate
									data-animate-delay="0.16"
									className="font-display text-[2.25rem] uppercase leading-[0.96] text-white md:text-[3rem] lg:text-[4rem]"
								>
									A Legacy <br />
									Refined in Dubai
								</h2>
								<p
									data-animate
									data-animate-delay="0.38"
									className="mx-auto mt-10 max-w-[62rem] font-copy text-lg leading-relaxed text-white lg:mt-14"
								>
									Samir Gems FZCO marks the next chapter of a legacy shaped over
									six decades. Rooted in the heritage of Samir Gems Group, the
									Samir Gems FZCO entity has been operating independently in
									Dubai for over two decades. Refined in the city&apos;s global
									trade ecosystem, we unite time-honoured craftsmanship with
									Dubai&apos;s international trading excellence to shape
									diamonds of uncompromising precision and integrity.
								</p>
							</div>
							<div className="w-full">
								<StatGrid stats={homeStats} />
							</div>
						</div>
					</div>
				</section>
			),
		},
		{
			id: "home-expertise",
			render: () => (
				<section className="home-slide relative overflow-hidden bg-black">
					<div className="absolute inset-0 z-0">
						<img
							src={activeBackground}
							alt=""
							className="h-full w-full object-cover opacity-40 transition-all duration-500 ease-in-out"
						/>
					</div>
					<div className="home-slide__container relative z-10 flex h-full items-center">
						<div className="mx-auto w-full max-w-[1440px]">
							<div className="my-24 lg:my-30">
								<SectionHeading title="Our Expertise" align="left" />
							</div>
							<div
								className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
								data-animate-delay="0.4"
							>
								{expertiseCards.map((card) => (
									<ImageCard
										key={card.title}
										image={card.image}
										title={card.title}
										description={card.description}
										className="h-[220px] shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
										hoverReveal
										onMouseEnter={() => setHoveredCard(card)}
										onMouseLeave={() => setHoveredCard(null)}
									/>
								))}
							</div>
						</div>
					</div>
				</section>
			),
		},
		{
			id: "home-responsibility",
			render: () => (
				<section className="home-slide relative overflow-hidden bg-black">
					<img
						src={sharedImages.handsImage}
						alt=""
						className="absolute inset-0 h-full w-full object-cover opacity-80"
					/>
					<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.42)_45%,rgba(0,0,0,0.62)_100%)]" />
					<div className="home-slide__container relative flex h-full items-center">
						<div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(320px,0.52fr)] lg:items-center">
							<div>
								<h2
									data-animate
									data-animate-delay="0.12"
									className="font-display text-[2.4rem] uppercase leading-[0.95] text-white md:text-[3rem] lg:text-[3.5rem]"
								>
									Responsibility <br /> Meets Perfection.
								</h2>
								<p
									data-animate
									data-animate-delay="0.34"
									className="mt-5 max-w-[42rem] font-copy text-[1rem] leading-[1.55] text-stone-300 md:text-[1.05rem]"
								>
									Responsibility and precision define every stone we craft. As
									an RJC-certified company, our diamonds follow a fully
									traceable mine-to-market journey, supported by stringent
									ethical standards. Advanced polishing technology works in
									harmony with generations of artisanship, ensuring every
									diamond reflects both integrity and uncompromising accuracy.
								</p>
								<button
									type="button"
									onClick={() => goToSection(4)}
									data-animate
									data-animate-delay="0.58"
									className="group mt-8 inline-flex items-center gap-5 text-left"
								>
									<span className="font-copy text-[0.92rem] font-medium tracking-[0.03em] text-white transition group-hover:text-white/80">
										Explore Our Partners
									</span>
									<img
										src={sharedImages.Arrow}
										alt=""
										className="object-cover opacity-95 transition-transform duration-500 ease-out group-hover:translate-x-2"
									/>
								</button>
							</div>
							<div className="grid grid-cols-2 gap-5 justify-self-end">
								<span
									data-animate
									data-animate-delay="0.58"
									className="col-span-2 font-copy text-2xl font-medium tracking-[0.03em] text-white transition group-hover:text-white/80"
								>
									Trusted Sourcing Partners
								</span>

								{partnerLogos.map((logo) => (
									<div
										key={logo.alt}
										data-animate
										data-animate-delay={logo.delay}
										className="flex h-[133.33px] w-[236px] items-center justify-center bg-[linear-gradient(107.44deg,rgba(64,64,64,0.4)_2.01%,rgba(39,39,39,0.4)_99.94%)] backdrop-blur-[4.9px]"
									>
										<img
											src={logo.src}
											alt={logo.alt}
											className="max-h-[105px] w-full object-contain px-6"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			),
		},
		{
			id: "home-global",
			render: () => (
				<section className="home-slide relative overflow-hidden bg-black">
					<div className="absolute inset-0">
						<img
							src={sharedImages.bgimageforhomelast}
							alt=""
							className="h-full w-full"
						/>
					</div>
					<div className="home-slide__container relative z-10 flex h-full items-center">
						<div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 lg:grid-cols-[45%_55%]">
							<div>
								<SectionHeading
									title={
										<>
											A Global Legacy <br /> Shaped Across
											<br /> Continents.
										</>
									}
								/>
								<ul className="mt-8 space-y-6 font-copy text-base leading-none text-white">
									{GlobalLegacy.map((item, index, arr) => (
										<li
											key={item}
											data-animate
											data-animate-delay={0.34 + index * 0.14}
											className="relative flex items-center gap-3"
										>
											<div className="relative flex w-4 justify-center">
												{index !== arr.length - 1 ? (
													<span className="absolute top-4 h-[36px] w-px bg-white/30" />
												) : null}
												<span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/50 bg-black">
													<span className="h-1.5 w-1.5 rounded-full bg-white" />
												</span>
											</div>
											<span className="tracking-[0.01em]">{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div
								data-animate
								data-animate-delay="0.92"
								className="relative flex justify-end"
							>
								<img
									src={sharedImages.samirgemsmap}
									alt=""
									className="h-full w-full object-contain"
								/>
							</div>
						</div>
					</div>
				</section>
			),
		},
	];

	// ── MOBILE ────────────────────────────────────────────────────────────────
	if (!isDesktop) {
		const slideH = `calc(100svh - ${NAVBAR_H}px)`;

		return (
			<>
				<Seo
					title="Samir Gems FZCO | Ethical Diamond Sourcing & Manufacturing in Dubai"
					description="Samir Gems FZCO is a Dubai-based diamond company built on a six-decade legacy, offering ethical rough diamond sourcing, precision manufacturing, polished diamonds, and transparent mine-to-market supply."
				/>

				{/* ── Slider ── */}
				<div
					style={{
						height: slideH,
						overflow: "hidden",
						position: "relative",
						WebkitTransform: "translateZ(0)",
						transform: "translateZ(0)",
					}}
				>
					<div
						ref={mobileTrackRef}
						style={{
							height: `calc((100svh - ${NAVBAR_H}px) * ${MOBILE_SLIDE_COUNT})`,
							willChange: "transform",
							WebkitTransform: "translate3d(0,0,0)",
							transform: "translate3d(0,0,0)",
						}}
					>
						{/* ── Slide 1 · Hero ─────────────────────────────────── */}
						<div
							className="relative w-full overflow-hidden bg-black"
							style={{ height: slideH }}
						>
							<div className="absolute inset-0">
								<img
									src={sharedImages.diamondOnStone}
									alt=""
									className="h-full w-full object-cover"
									loading="eager"
									decoding="async"
								/>
								<div className="absolute inset-0 bg-black/10" />
							</div>
							<div className="relative z-10 flex h-full items-center px-5 sm:px-6">
								<div className="mx-auto w-full max-w-[1400px]">
									<h1 className="font-display text-[2.3rem] uppercase leading-[1] text-white ">
										Samir Gems FZCO Crafting
										<br />
										Brilliance.
										<br />
										Defining
										<br />
										Legacy.
									</h1>
									<p className="mt-5 max-w-[18rem] font-copy text-[0.95rem] leading-relaxed text-white/90">
										A new chapter in precision diamond manufacturing and ethical
										sourcing.
									</p>
									<button
										type="button"
										onClick={() => mobileGoTo(1)}
										className="group mt-8 inline-flex items-center gap-4 text-left"
									>
										<span className="font-copy text-sm font-medium tracking-[0.03em] text-white">
											Discover Our Legacy
										</span>
										<img
											src={sharedImages.Arrow}
											alt=""
											className="opacity-95 transition-transform duration-500 ease-out group-hover:translate-x-2"
										/>
									</button>
								</div>
							</div>
						</div>

						{/* ── Slide 2 · Legacy ───────────────────────────────── */}
						<div
							className="relative w-full overflow-hidden"
							style={{ height: slideH }}
						>
							<div className="absolute inset-0">
								<img
									src={sharedImages.HomeLegacy}
									alt=""
									className="h-full w-full object-cover"
									loading="lazy"
									decoding="async"
								/>
								<div className="absolute inset-0 bg-black/40" />
							</div>
							<div className="relative z-10 flex h-full items-center px-5 sm:px-6">
								<div className="mx-auto w-full max-w-[1400px]">
									<h2 className="font-display text-[2rem] uppercase leading-[0.96] text-white sm:text-[2.4rem]">
										A Legacy
										<br />
										Refined in Dubai
									</h2>
									<p className="mt-4 max-w-[32rem] font-copy text-[0.88rem] leading-relaxed text-white/85 sm:text-[0.95rem]">
										Samir Gems FZCO marks the next chapter of a legacy shaped
										over six decades. Rooted in the heritage of Samir Gems
										Group, the Samir Gems FZCO entity has been operating
										independently in Dubai for over two decades. Refined in the
										city&apos;s global trade ecosystem, we unite time-honoured
										craftsmanship with Dubai&apos;s international trading
										excellence to shape diamonds of uncompromising precision and
										integrity.
									</p>
									<div className="mt-5">
										<StatGrid stats={homeStats} />
									</div>
								</div>
							</div>
						</div>

						{/* ── Slide 3 · Expertise ────────────────────────────── */}
						<div
							className="relative w-full overflow-hidden bg-black"
							style={{ height: slideH }}
						>
							<div className="absolute inset-0">
								<img
									src={sharedImages.OurExpertise}
									alt=""
									className="h-full w-full object-cover opacity-[0.18]"
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div className="relative z-10 flex h-full items-center px-5 sm:px-6">
								<div className="mx-auto w-full max-w-[1400px]">
									<h2 className="font-display text-[2rem] uppercase leading-[0.96] text-white sm:text-[2.4rem]">
										Our Expertise
									</h2>
									<div
										className="mt-5 -mx-5 overflow-x-auto px-5 pb-2"
										style={{
											WebkitOverflowScrolling: "touch",
											overscrollBehaviorX: "contain",
										}}
									>
										<div
											className="flex gap-3"
											style={{ width: "max-content" }}
										>
											{expertiseCards.map((card) => (
												<ImageCard
													key={card.title}
													image={card.image}
													title={card.title}
													description={card.description}
													className="min-h-[240px] w-[72vw] shrink-0 sm:w-[55vw]"
													hoverReveal
												/>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* ── Slide 4 · Responsibility ───────────────────────── */}
						<div
							className="relative w-full overflow-hidden bg-black"
							style={{ height: slideH }}
						>
							<img
								src={sharedImages.handsImage}
								alt=""
								className="absolute inset-0 h-full w-full object-cover opacity-55"
								loading="lazy"
								decoding="async"
							/>
							<div className="absolute inset-0 bg-black/25" />
							<div className="relative z-10 flex h-full items-center px-5 sm:px-6">
								<div className="mx-auto w-full max-w-[1400px]">
									<h2 className="font-display text-[2rem] uppercase leading-[0.96] text-white sm:text-[2.4rem]">
										Responsibility
										<br />
										Meets Perfection.
									</h2>
									<p className="mt-4 max-w-[32rem] font-copy text-[0.88rem] leading-relaxed text-white/85 sm:text-[0.95rem]">
										Responsibility and precision define every stone we craft. As
										an RJC-certified company, our diamonds follow a fully
										traceable mine-to-market journey, supported by stringent
										ethical standards. Advanced polishing technology works in
										harmony with generations of artisanship, ensuring every
										diamond reflects both integrity and uncompromising accuracy.
									</p>
									<div className="mt-5 grid grid-cols-2 gap-3">
										<span className="col-span-2 mb-1 font-copy text-[0.92rem] font-medium tracking-[0.03em] text-white">
											Trusted Sourcing Partners
										</span>

										{partnerLogos.map((logo) => (
											<div
												key={logo.alt}
												className="flex h-[100px] w-full items-center justify-center bg-[linear-gradient(107.44deg,rgba(64,64,64,0.4)_2.01%,rgba(39,39,39,0.4)_99.94%)] backdrop-blur-[4.9px]"
											>
												<img
													src={logo.src}
													alt={logo.alt}
													className="max-h-[78px] w-full object-contain px-4"
													loading="lazy"
													decoding="async"
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* ── Slide 5 · Global ───────────────────────────────── */}
						<div
							className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#0c0c0c,#111111)]"
							style={{ height: slideH }}
						>
							<div className="flex h-full items-center px-5 sm:px-6">
								{/*
								  data-inner-scroll: touch handler checks this element's
								  scroll position before passing swipe to the outer slider.
								  Lets user scroll content within the slide first.
								*/}
								<div
									data-inner-scroll
									className="mx-auto w-full max-w-[1400px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
									style={{
										maxHeight: "100%",
										WebkitOverflowScrolling: "touch",
									}}
								>
									<h2 className="font-display text-[2rem] uppercase leading-[0.96] text-white sm:text-[2.4rem]">
										A Global Legacy
										<br />
										Shaped Across
										<br />
										Continents.
									</h2>
									<ul className="mt-4 space-y-2 font-copy text-[0.85rem] text-white sm:text-sm">
										{GlobalLegacy.map((item, index, arr) => (
											<li key={item} className="relative flex gap-3">
												<div className="relative flex w-4 shrink-0 justify-center">
													{index !== arr.length - 1 ? (
														<span className="absolute top-4 h-[calc(100%+6px)] w-px bg-white/20" />
													) : null}
													<span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-white/50 bg-black">
														<span className="h-1.5 w-1.5 rounded-full bg-white" />
													</span>
												</div>
												<span className="leading-relaxed text-white/85">
													{item}
												</span>
											</li>
										))}
									</ul>
									<div className="mt-4 border border-white/10 bg-white/[0.02] p-3">
										<img
											src={sharedImages.samirgemsmap}
											alt=""
											className="w-full object-contain opacity-95"
											loading="lazy"
											decoding="async"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* ── Slide 6 · Footer ─────────────────────────────── */}
						{/*
					  Footer slide: fixed viewport height container, inner div scrolls.
					  data-inner-scroll → touch handler lets finger scroll content
					  before passing swipe-up to the outer slider (goes back to slide 5).
					  -webkit-overflow-scrolling:touch → native iOS momentum inside.
					*/}
						<div
							style={{
								height: slideH,
								position: "relative",
								overflow: "hidden",
							}}
							className="w-full bg-black"
						>
							<div
								data-inner-scroll
								style={{
									height: "100%",
									overflowY: "scroll",
									WebkitOverflowScrolling: "touch",
									overscrollBehavior: "contain",
								}}
							>
								<Footer />
							</div>
						</div>
					</div>
					{/* /track */}
				</div>
				{/* /slider */}
			</>
		);
	}

	// ── DESKTOP (100% unchanged) ──────────────────────────────────────────────
	return (
		<>
			<Seo
				title="Samir Gems FZCO | Ethical Diamond Sourcing & Manufacturing in Dubai"
				description="Samir Gems FZCO is a Dubai-based diamond company built on a six-decade legacy, offering ethical rough diamond sourcing, precision manufacturing, polished diamonds, and transparent mine-to-market supply."
			/>
			<div
				ref={homeRef}
				className="relative h-[calc(100svh-100px)] overflow-hidden"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<div
					ref={footerRef}
					className="stable-paint absolute inset-x-0 bottom-0 z-0"
				>
					<Footer />
				</div>
				{!isFooterOpen ? (
					<div className="section-nav" aria-label="Home section navigation">
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
				) : null}
				<div ref={viewportRef} className="relative z-10 h-full">
					<div ref={trackRef} className="home-track">
						{sections.map((section, index) => (
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
		</>
	);
}

export default HomePage;
