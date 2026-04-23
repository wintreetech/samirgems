import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import Footer from "../components/Footer";
import ImageCard from "../components/ImageCard";
import SectionHeading from "../components/SectionHeading";
import {
	expertiseCards,
	homeStats,
	sharedImages,
	GlobalLegacy,
} from "../data/siteContent";
import StatGrid from "../components/StatGrid";

const AUTO_DURATION = 10000;
const TRANSITION_DURATION = 1.15;

function HomePage() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isFooterOpen, setIsFooterOpen] = useState(false);
	const [footerHeight, setFooterHeight] = useState(220);
	const [hoveredCard, setHoveredCard] = useState(null);

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

					<div className="home-slide__container relative z-10 grid h-full items-center lg:grid-cols-[minmax(0,1fr)_minmax(420px,620px)]">
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
								className="mt-10 font-copy text-xl leading-relaxed text-white"
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
				</section>
			),
		},
		{
			id: "home-legacy",
			render: () => (
				<section className="home-slide relative overflow-hidden">
					{/* Background image */}
					<div className="absolute inset-0">
						<img
							src={sharedImages.HomeLegacy}
							alt=""
							className="h-full w-full object-cover"
						/>

						<div className="absolute inset-0 bg-black/20" />
					</div>

					<div className="home-slide__container relative z-10 flex h-full items-center justify-center">
						<div className="flex w-full flex-col gap-22 items-center justify-center text-center">
							<div className="">
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
									className="mt-20 font-copy text-lg leading-relaxed text-white"
								>
									Samir Gems FZCO marks the next chapter of a legacy shaped over
									six decades. Rooted in the heritage of Samir Gems, the FZCO
									entity has <br />
									been operating independently in Dubai for over two decades.
									Refined in the city's global trade ecosystem, we unite
									time-honoured <br /> craftsmanship with Dubai's international
									trading excellence to shape diamonds of uncompromising
									precision and integrity
								</p>
							</div>

							<div className="grid w-full grid-cols-3 gap-5">
								{homeStats.map((stat, statIndex) => (
									<article
										key={stat.label}
										data-animate
										data-animate-delay={0.62 + statIndex * 0.14}
										className="flex h-[117px] items-center justify-center border border-white/8 bg-[rgba(0,0,0,0.30)] px-[60px] py-[40px]"
									>
										<div className="flex items-center gap-2.5">
											<p className="shrink-0 font-copy text-6xl font-light tracking-[0.03em] text-white">
												{stat.value}
												{stat.suffix}
											</p>
											<p className="max-w-[183px] font-copy text-[17px] font-light leading-tight tracking-[0.03em] text-white">
												{stat.label}
											</p>
										</div>
									</article>
								))}
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
					{/* Background image */}
					<div className="absolute inset-0 z-0">
						<img
							src={activeBackground}
							alt=""
							className="h-full w-full object-cover opacity-40 transition-all duration-500 ease-in-out"
						/>
					</div>

					{/* Content */}
					<div className="home-slide__container relative z-10 flex h-full justify-between items-center">
						<div className="w-full">
							<div className="my-30">
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
										className="h-[200px] shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
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
						<div className="mx-auto grid w-full gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(320px,0.52fr)] lg:items-center">
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
									className="mt-5  font-copy text-[1rem] leading-[1.45] text-stone-300 md:text-[1.05rem]"
								>
									Responsibility and precision define every stone we craft. As
									an RJC-certified <br /> company, our diamonds follow a fully
									traceable mine-to-market journey,
									<br /> supported by stringent ethical standards. Advanced
									polishing technology works
									<br /> in harmony with generations of artisanship, ensuring
									every diamond reflects
									<br /> both integrity and uncompromising accuracy.
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
								<img
									src={sharedImages.namdiaLogo}
									alt="Namdia"
									data-animate
									data-animate-delay="0.76"
									className="h-[150px] w-[250px] object-contain"
								/>

								<img
									src={sharedImages.sodiamLogo}
									alt="Sodiam"
									data-animate
									data-animate-delay="0.88"
									className="h-[150px] w-[250px] object-contain"
								/>
								<img
									src={sharedImages.OkavangoLogo}
									alt="Sodiam"
									data-animate
									data-animate-delay="1"
									className="h-[150px] w-[250px] object-contain"
								/>
								<img
									src={sharedImages.DeBeersLogo}
									alt="Sodiam"
									data-animate
									data-animate-delay="1.12"
									className="h-[150px] w-[250px] object-contain"
								/>
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
						<div className="grid w-full items-center gap-10 lg:grid-cols-[45%_55%]">
							{/* Left Content */}
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
												{/* vertical line */}
												{index !== arr.length - 1 && (
													<span className="absolute top-4 h-[36px] w-px bg-white/30" />
												)}

												{/* circle */}
												<span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/50 bg-black">
													<span className="h-1.5 w-1.5 rounded-full bg-white" />
												</span>
											</div>

											<span className="tracking-[0.01em]">{item}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Right Map */}
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

								{/* City labels */}
								<div className="absolute bottom-[34%] left-[63%] rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
									Surat
								</div>

								<div className="absolute bottom-[30%] left-[58%] rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
									Dubai
								</div>

								<div className="absolute bottom-[28%] left-[69%] rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
									Mumbai
								</div>
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
			isFooterOpen,
			totalSections,
		],
	);

	const showFooter = useCallback(() => {
		if (isAnimating || isFooterOpen || !viewportRef.current) {
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
	}, [footerHeight, isAnimating, isFooterOpen]);

	const hideFooter = useCallback(() => {
		if (isAnimating || !isFooterOpen || !viewportRef.current) {
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
	}, [isAnimating, isFooterOpen]);

	useEffect(() => {
		if (!trackRef.current) {
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
	}, [animateSectionContent, hideSectionContent]);

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
		const node = homeRef.current;

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
			if (window.innerWidth < 1024 || isAnimating) {
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
		isFooterOpen,
		sections.length,
		showFooter,
	]);

	useEffect(() => {
		if (
			typeof window === "undefined" ||
			window.innerWidth < 1024 ||
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
		isPaused,
		isAnimating,
		sections.length,
		showFooter,
	]);

	return (
		<div
			ref={homeRef}
			className="relative h-[calc(100svh-100px)] overflow-hidden"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onFocus={() => setIsPaused(true)}
			onBlur={() => setIsPaused(false)}
		>
			<div ref={footerRef} className="absolute inset-x-0 bottom-0 z-0">
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
