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

const AUTO_DURATION = 10000;
const TRANSITION_DURATION = 1.15;
const DESKTOP_BREAKPOINT = 1024;

const partnerLogos = [
	{ src: sharedImages.namdiaLogo, alt: "Namdia", delay: "0.76" },
	{ src: sharedImages.sodiamLogo, alt: "Sodiam", delay: "0.88" },
	{ src: sharedImages.OkavangoLogo, alt: "Okavango", delay: "1" },
	{ src: sharedImages.DeBeersLogo, alt: "De Beers", delay: "1.12" },
];

const mapMarkers = [
	{
		label: "Surat",
		desktopClassName:
			"absolute bottom-[34%] left-[63%] rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm",
		mobileClassName:
			"rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/80",
	},
	{
		label: "Dubai",
		desktopClassName:
			"absolute bottom-[30%] left-[58%] rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm",
		mobileClassName:
			"rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/80",
	},
	{
		label: "Mumbai",
		desktopClassName:
			"absolute bottom-[28%] left-[69%] rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm",
		mobileClassName:
			"rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/80",
	},
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

	const homeRef = useRef(null);
	const viewportRef = useRef(null);
	const trackRef = useRef(null);
	const footerRef = useRef(null);
	const sectionRefs = useRef([]);
	const autoTimerRef = useRef(null);

	const hideSectionContent = useCallback((section) => {
		if (!section) {
			return;
		}

		const animatedChildren = Array.from(
			section.querySelectorAll("[data-animate]"),
		).filter((element) => !element.querySelector("[data-animate]"));

		gsap.killTweensOf(animatedChildren);
		gsap.set(animatedChildren, {
			autoAlpha: 0,
			y: 40,
			filter: "blur(10px)",
		});
	}, []);

	const animateSectionContent = useCallback((index) => {
		const section = sectionRefs.current[index];
		if (!section) {
			return;
		}

		const animatedChildren = Array.from(
			section.querySelectorAll("[data-animate]"),
		).filter((element) => !element.querySelector("[data-animate]"));

		const getDelay = (element, itemIndex) => {
			const rawDelay = Number(element.getAttribute("data-animate-delay"));
			return Number.isFinite(rawDelay) ? rawDelay : 0.18 + itemIndex * 0.2;
		};

		gsap.killTweensOf(animatedChildren);
		gsap.set(animatedChildren, {
			autoAlpha: 0,
			y: 40,
			filter: "blur(10px)",
		});

		animatedChildren.forEach((element, itemIndex) => {
			gsap.fromTo(
				element,
				{ autoAlpha: 0, y: 40, filter: "blur(10px)", scale: 0.992 },
				{
					autoAlpha: 1,
					y: 0,
					filter: "blur(0px)",
					scale: 1,
					duration: 0.92,
					ease: "power4.out",
					delay: getDelay(element, itemIndex),
					overwrite: "auto",
				},
			);
		});
	}, []);

	const scrollToMobileSection = useCallback((id) => {
		if (typeof window === "undefined") {
			return;
		}

		document.getElementById(id)?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}, []);

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
							<div className="max-w-[560px]">
								<h1
									data-animate
									data-animate-delay="0.12"
									className="font-display text-[3rem] uppercase leading-[0.93] text-white md:text-[4rem]"
								>
									Crafting
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
									six decades. Rooted in the heritage of Samir Gems, the FZCO
									entity has been operating independently in Dubai for over two
									decades. Refined in the city&apos;s global trade ecosystem, we
									unite time-honoured craftsmanship with Dubai&apos;s
									international trading excellence to shape diamonds of
									uncompromising precision and integrity.
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
								{partnerLogos.map((logo) => (
									<img
										key={logo.alt}
										src={logo.src}
										alt={logo.alt}
										data-animate
										data-animate-delay={logo.delay}
										className="h-[150px] w-[250px] object-contain"
									/>
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
				<section className="home-slide bg-[linear-gradient(180deg,#0c0c0c,#111111)]">
					<div className="home-slide__container flex h-full items-center">
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

								<ul className="mt-10 space-y-9 font-copy text-base leading-none text-white">
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
									src={sharedImages.worldMap}
									alt=""
									className="w-full max-w-[760px] object-contain opacity-95"
								/>

								{mapMarkers.map((marker) => (
									<div key={marker.label} className={marker.desktopClassName}>
										{marker.label}
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			),
		},
	];

	const totalSections = sections.length;

	const goToSection = useCallback(
		(index) => {
			if (
				!isDesktop ||
				isAnimating ||
				index === activeIndex ||
				index < 0 ||
				index >= totalSections
			) {
				return;
			}

			if (isFooterOpen && viewportRef.current) {
				gsap.set(viewportRef.current, { y: 0 });
				setIsFooterOpen(false);
			}

			setIsAnimating(true);
			sectionRefs.current.forEach((section, sectionIndex) => {
				if (sectionIndex !== index) {
					hideSectionContent(section);
				}
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
			totalSections,
		],
	);

	const showFooter = useCallback(() => {
		if (!isDesktop || isAnimating || isFooterOpen || !viewportRef.current) {
			return;
		}

		setIsAnimating(true);
		setIsFooterOpen(true);

		gsap.to(viewportRef.current, {
			y: -footerHeight,
			duration: TRANSITION_DURATION,
			ease: "power3.inOut",
			onComplete: () => {
				setIsAnimating(false);
			},
		});
	}, [footerHeight, isAnimating, isDesktop, isFooterOpen]);

	const hideFooter = useCallback(() => {
		if (!isDesktop || isAnimating || !isFooterOpen || !viewportRef.current) {
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
	}, [isAnimating, isDesktop, isFooterOpen]);

	useEffect(() => {
		if (typeof window === "undefined") {
			return undefined;
		}

		const handleResize = () => {
			const desktop = window.innerWidth >= DESKTOP_BREAKPOINT;
			setIsDesktop(desktop);

			if (!desktop) {
				setIsFooterOpen(false);
				setIsAnimating(false);
				if (viewportRef.current) {
					gsap.set(viewportRef.current, { y: 0 });
				}
				if (trackRef.current) {
					gsap.set(trackRef.current, { yPercent: 0 });
				}
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!isDesktop || !trackRef.current) {
			return undefined;
		}

		gsap.set(trackRef.current, { yPercent: 0 });
		if (viewportRef.current) {
			gsap.set(viewportRef.current, { y: 0 });
		}

		sectionRefs.current.forEach((section, index) => {
			if (index !== 0) {
				hideSectionContent(section);
			}
		});

		animateSectionContent(0);
		return undefined;
	}, [animateSectionContent, hideSectionContent, isDesktop]);

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
		if (!isDesktop) {
			return undefined;
		}

		const node = homeRef.current;
		if (!node) {
			return undefined;
		}

		const onWheel = (event) => {
			event.preventDefault();

			if (isAnimating) {
				return;
			}

			if (event.deltaY > 0) {
				if (activeIndex === sections.length - 1) {
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
			if (isAnimating) {
				return;
			}

			if (event.key === "ArrowDown" || event.key === "PageDown") {
				event.preventDefault();
				if (activeIndex === sections.length - 1) {
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
		isDesktop,
		isFooterOpen,
		sections.length,
		showFooter,
	]);

	useEffect(() => {
		if (
			!isDesktop ||
			typeof window === "undefined" ||
			isPaused ||
			isAnimating
		) {
			return undefined;
		}

		autoTimerRef.current = window.setTimeout(() => {
			if (activeIndex === sections.length - 1) {
				showFooter();
				return;
			}
			goToSection(activeIndex + 1);
		}, AUTO_DURATION);

		return () => window.clearTimeout(autoTimerRef.current);
	}, [
		activeIndex,
		goToSection,
		isAnimating,
		isDesktop,
		isPaused,
		sections.length,
		showFooter,
	]);

	if (!isDesktop) {
		return (
			<div className="bg-black">
				<div className="h-[calc(100svh-82px)] overflow-y-auto snap-y snap-mandatory">
					<section className="section-frame relative isolate min-h-[calc(100svh-82px)] snap-start overflow-hidden bg-black">
						<div className="absolute inset-0">
							<img
								src={sharedImages.diamondOnStone}
								alt=""
								className="h-full w-full object-cover"
							/>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.55)_56%,rgba(0,0,0,0.92)_100%)]" />
						</div>

						<div className="relative z-10 flex min-h-[calc(100svh-82px)] items-end px-5 py-10 sm:px-6">
							<div className="mx-auto w-full max-w-[1400px]">
								<div className="max-w-[21rem]">
									<p className="font-sans text-[11px] uppercase tracking-[0.24em] text-white/72">
										Samir Gems FZCO
									</p>
									<h1 className="mt-4 font-display text-[2.9rem] uppercase leading-[0.9] text-white sm:text-[3.3rem]">
										Crafting
										<br />
										Brilliance.
										<br />
										Defining
										<br />
										Legacy.
									</h1>
									<p className="mt-6 max-w-[18rem] font-copy text-base leading-relaxed text-white/88">
										A new chapter in precision diamond manufacturing and ethical
										sourcing.
									</p>

									<div className="mt-8 flex flex-wrap gap-3">
										<button
											type="button"
											onClick={() =>
												scrollToMobileSection("home-mobile-legacy")
											}
											className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-5 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-white transition hover:border-white/50 hover:bg-white/14"
										>
											Discover Our Legacy
										</button>
										<button
											type="button"
											onClick={() =>
												scrollToMobileSection("home-mobile-expertise")
											}
											className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-white/88 transition hover:border-white/35 hover:text-white"
										>
											View Expertise
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section
						id="home-mobile-legacy"
						className="section-frame relative min-h-[calc(100svh-82px)] snap-start overflow-hidden px-5 py-12 sm:px-6 sm:py-14"
					>
						<div className="absolute inset-0">
							<img
								src={sharedImages.HomeLegacy}
								alt=""
								className="h-full w-full object-cover"
							/>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.64)_100%)]" />
						</div>

						<div className="relative z-10 mx-auto flex min-h-[calc(100svh-82px-6rem)] max-w-[1400px] items-center">
							<div className="w-full">
								<SectionHeading
									eyebrow="Legacy"
									title="A Legacy Refined in Dubai"
									description="Samir Gems FZCO marks the next chapter of a diamond legacy shaped over six decades, uniting long-standing craftsmanship with Dubai's global trading excellence."
								/>

								<div className="mt-10">
									<StatGrid stats={homeStats} />
								</div>
							</div>
						</div>
					</section>

					<section
						id="home-mobile-expertise"
						className="section-frame relative min-h-[calc(100svh-82px)] snap-start overflow-hidden bg-black px-5 py-12 sm:px-6 sm:py-14"
					>
						<div className="absolute inset-0">
							<img
								src={sharedImages.OurExpertise}
								alt=""
								className="h-full w-full object-cover opacity-18"
							/>
						</div>

						<div className="relative z-10 mx-auto flex min-h-[calc(100svh-82px-6rem)] max-w-[1400px] items-center">
							<div className="w-full">
								<SectionHeading
									eyebrow="Expertise"
									title="From Rough to Refined Precision."
									description="Each stage of our process is built around accuracy, transparency, and consistency for global partners."
								/>

								<div className="mt-8 -mx-5 overflow-x-auto px-5 pb-2">
									<div className="flex min-w-max snap-x snap-mandatory gap-4">
										{expertiseCards.map((card) => (
											<ImageCard
												key={card.title}
												image={card.image}
												title={card.title}
												description={card.description}
												className="min-h-[280px] w-[78vw] shrink-0 snap-start sm:w-[62vw]"
												hoverReveal
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section-frame relative min-h-[calc(100svh-82px)] snap-start overflow-hidden bg-black px-5 py-12 sm:px-6 sm:py-14">
						<img
							src={sharedImages.handsImage}
							alt=""
							className="absolute inset-0 h-full w-full object-cover opacity-60"
						/>
						<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.9)_100%)]" />

						<div className="relative z-10 mx-auto flex min-h-[calc(100svh-82px-6rem)] max-w-[1400px] items-center">
							<div className="w-full">
								<SectionHeading
									eyebrow="Responsibility"
									title="Responsibility Meets Perfection."
									description="Our diamonds follow a fully traceable mine-to-market journey supported by ethical sourcing standards and advanced manufacturing."
								/>

								<div className="mt-10 grid grid-cols-2 gap-4">
									{partnerLogos.map((logo) => (
										<div
											key={logo.alt}
											className="flex min-h-[116px] items-center justify-center border border-white/10 bg-black/35 p-4"
										>
											<img
												src={logo.src}
												alt={logo.alt}
												className="max-h-[80px] w-full object-contain"
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</section>

					<section className="section-frame min-h-[calc(100svh-82px)] snap-start bg-[linear-gradient(180deg,#0c0c0c,#111111)] px-5 py-12 sm:px-6 sm:py-14">
						<div className="mx-auto flex min-h-[calc(100svh-82px-6rem)] max-w-[1400px] items-center">
							<div className="w-full">
								<SectionHeading
									eyebrow="Global Footprint"
									title="A Global Legacy Shaped Across Continents."
									description="Our story has expanded across key trade regions while remaining anchored in precision, trust, and responsible sourcing."
								/>

								<ul className="mt-8 space-y-6 font-copy text-base text-white">
									{GlobalLegacy.map((item, index, arr) => (
										<li key={item} className="relative flex gap-4">
											<div className="relative flex w-4 justify-center">
												{index !== arr.length - 1 ? (
													<span className="absolute top-4 h-[calc(100%+16px)] w-px bg-white/20" />
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

								<div className="mt-10 overflow-hidden border border-white/10 bg-white/[0.02] p-4">
									<img
										src={sharedImages.worldMap}
										alt=""
										className="w-full object-contain opacity-95"
									/>

									<div className="mt-5 flex flex-wrap gap-2">
										{mapMarkers.map((marker) => (
											<span
												key={marker.label}
												className={marker.mobileClassName}
											>
												{marker.label}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</section>

					<div className="snap-start">
						<Footer />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={homeRef}
			className="relative h-[calc(100svh-100px)] overflow-hidden"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onFocus={() => setIsPaused(true)}
			onBlur={() => setIsPaused(false)}
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
	);
}

export default HomePage;
