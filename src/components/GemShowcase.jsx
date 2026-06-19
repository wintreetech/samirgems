import React, { useRef } from "react";

import { sharedImages } from "../data/siteContent";

const diamonds = [
	{
		id: 1,
		title: "The Lesotho Legend",
		carat: "910 Ct.",
		// cut: "Cushion",
		// clarity: "VVS1",
		colour: "White",
		mainCarat: "910",
		heroImage: sharedImages.Hero_Diamonds_4,
		thumb: sharedImages.Hero_Diamonds_4_Thumb,
	},
	{
		id: 2,
		title: "The Letseng Icon",
		carat: "439 Ct.",
		// cut: "Lorem",
		// clarity: "Lorem",
		colour: "White",
		mainCarat: "439",
		heroImage: sharedImages.Hero_Diamonds_1,
		thumb: sharedImages.Hero_Diamonds_1_Thumb,
	},
	{
		id: 3,
		title: "Queen of Kalahari",
		carat: "342 Ct.",
		// cut: "Cushion",
		// clarity: "VVS1",
		colour: "White",
		mainCarat: "342",
		heroImage: sharedImages.Hero_Diamonds_5,
		thumb: sharedImages.Hero_Diamonds_5_Thumb,
	},
	{
		id: 4,
		title: "Rose Of Kao",
		carat: "29.59 Ct.",
		// cut: "Emerald",
		// clarity: "VS1",
		colour: "Exceptional Pink",
		mainCarat: "29.59",
		heroImage: sharedImages.Hero_Diamonds_2,
		thumb: sharedImages.Hero_Diamonds_2_Thumb,
	},
	{
		id: 5,
		title: "The Pink Palesa",
		carat: "21.86 Ct.",
		cut: "NA",
		clarity: "NA",
		colour: "Exceptional Pink",
		mainCarat: "21.86",
		heroImage: sharedImages.Hero_Diamonds_3,
		thumb: sharedImages.Hero_Diamonds_3_Thumb,
	},
];

const initialOrder = [
	diamonds[diamonds.length - 1],
	...diamonds.slice(0, diamonds.length - 1),
];

function GemShowcase() {
	const [orderedDiamonds, setOrderedDiamonds] = React.useState(initialOrder);
	const activeDiamond = orderedDiamonds[1] ?? orderedDiamonds[0];

	const desktopCarouselDiamonds = [
		...orderedDiamonds.slice(2),
		orderedDiamonds[0],
	].filter(Boolean);

	const mobileCarouselDiamonds = [
		orderedDiamonds[0],
		...orderedDiamonds.slice(2),
	].filter(Boolean);

	const mobileScrollRef = useRef(null);

	const scrollMobile = (direction) => {
		mobileScrollRef.current?.scrollBy({
			left: direction === "next" ? window.innerWidth : -window.innerWidth,
			behavior: "smooth",
		});
	};

	const next = () => {
		setOrderedDiamonds((prev) => [...prev.slice(1), prev[0]]);
	};

	const prev = () => {
		setOrderedDiamonds((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
	};

	// const moveToActive = (id) => {
	// 	setOrderedDiamonds((prev) => {
	// 		const currentActive = prev[1] ?? prev[0];
	// 		const target = prev.find((item) => item.id === id);

	// 		if (!target || !currentActive || target.id === currentActive.id) {
	// 			return prev;
	// 		}

	// 		const remaining = prev.filter(
	// 			(item) => item.id !== currentActive.id && item.id !== target.id,
	// 		);

	// 		return [currentActive, target, ...remaining];
	// 	});
	// };

	return (
		<section className="gem-showcase relative overflow-hidden bg-[#161616] text-white">
			{/* <div className="lg:hidden">
				<div className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{diamonds.map((diamond) => (
						<div key={diamond.id} className="w-full shrink-0 snap-start">
							<div className="relative min-h-[420px]">
								<img
									src={diamond.thumb}
									alt={diamond.title}
									className="absolute inset-0 h-full w-full object-cover object-center"
								/>

								<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.45)_80%,#161616_100%)]" />

								<div className="relative z-10 flex min-h-[420px] items-end px-5 py-8">
									<div>
										<h2 className="mt-3 font-copy text-[2.3rem] leading-[0.95]">
											{diamond.title}
										</h2>
									</div>
								</div>
							</div>

							<div className="mx-auto max-w-[1400px] px-5 py-8">
								<div className="grid grid-cols-2 gap-4">
									{[
										{ label: "Carat", value: diamond.mainCarat },
										{ label: "Colour", value: diamond.colour },
										...(diamond.id === 5
											? [
													{ label: "Clarity", value: diamond.clarity },
													{ label: "Cut", value: diamond.cut },
												]
											: []),
									].map((item) => (
										<div
											key={item.label}
											className="border border-white/10 bg-white/[0.03] p-4"
										>
											<p className="font-copy text-xs uppercase tracking-[0.18em] text-white/55">
												{item.label}
											</p>

											<p className="mt-2 font-copy text-[1.8rem] leading-none">
												{item.value}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div> */}

			<div className="relative lg:hidden">
				<div
					ref={mobileScrollRef}
					className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				>
					{diamonds.map((diamond) => (
						<div key={diamond.id} className="w-full shrink-0 snap-start">
							<div className="relative min-h-[420px]">
								<img
									src={diamond.thumb}
									alt={diamond.title}
									className="absolute inset-0 h-full w-full object-cover object-center"
								/>

								<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.45)_80%,#161616_100%)]" />

								<div className="relative z-10 flex min-h-[420px] items-end px-5 py-8">
									<div>
										<h2 className="mt-3 font-copy text-[2.3rem] leading-[0.95]">
											{diamond.title}
										</h2>
									</div>
								</div>
							</div>

							<div className="mx-auto max-w-[1400px] px-5 py-8">
								<div className="grid grid-cols-2 gap-4">
									{[
										{ label: "Carat", value: diamond.mainCarat },
										{ label: "Colour", value: diamond.colour },
										...(diamond.id === 5
											? [
													{ label: "Clarity", value: diamond.clarity },
													{ label: "Cut", value: diamond.cut },
												]
											: []),
									].map((item) => (
										<div
											key={item.label}
											className="border border-white/10 bg-white/[0.03] p-4"
										>
											<p className="font-copy text-xs uppercase tracking-[0.18em] text-white/55">
												{item.label}
											</p>

											<p className="mt-2 font-copy text-[1.8rem] leading-none">
												{item.value}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="pointer-events-none absolute inset-x-0 top-[210px] z-30 flex -translate-y-1/2 items-center justify-between px-4">
					<button
						onClick={() => scrollMobile("prev")}
						type="button"
						aria-label="Previous diamond"
						className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-black/45 backdrop-blur transition hover:bg-white/10"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
							<path
								d="M15 5L8 12L15 19"
								stroke="white"
								strokeWidth="1.8"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>

					<button
						onClick={() => scrollMobile("next")}
						type="button"
						aria-label="Next diamond"
						className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-black/45 backdrop-blur transition hover:bg-white/10"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
							<path
								d="M9 5L16 12L9 19"
								stroke="white"
								strokeWidth="1.8"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className="hidden lg:block">
				<div className="gem-stage absolute inset-0">
					{orderedDiamonds.map((diamond, slot) => (
						<div
							key={diamond.id}
							type="button"
							//onClick={() => moveToActive(diamond.id)}
							className={`gem-stage__item gem-stage__item--slot-${Math.min(slot, 5)}`}
							aria-label={diamond.title}
						>
							<img
								src={diamond.heroImage}
								alt={diamond.title}
								className="h-full w-full object-cover"
							/>
							<div className="absolute inset-0 bg-black/10" />
							<div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-[#161616]" />
							<div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
						</div>
					))}
				</div>

				<div className="relative z-10 mx-auto max-w-[1440px] px-5 py-6 lg:px-10 lg:py-10">
					<div className="grid min-h-[820px] overflow-hidden lg:grid-cols-[48%_52%]">
						<div className="hidden lg:block" />

						<div className="relative flex flex-col px-8 py-10 lg:px-14 lg:py-12 xl:px-16">
							<div key={activeDiamond.id} className="gem-showcase__details">
								<h2
									data-animate="right"
									className="font-copy text-[42px] font-light leading-none tracking-[0.03em] lg:text-6xl"
								>
									{activeDiamond.title}
								</h2>

								<div className="mt-14 grid grid-cols-2 gap-x-16 gap-y-12">
									<div data-animate="right" data-animate-delay="0.12">
										<p className="mb-2 font-copy text-[15px] font-light tracking-[0.03em] text-white/60">
											Carat
										</p>
										<p className="font-copy text-[44px] font-light leading-none tracking-[0.03em]">
											{activeDiamond.mainCarat}
										</p>
									</div>
									<div data-animate="right" data-animate-delay="0.2">
										<p className="mb-2 font-copy text-[15px] font-light tracking-[0.03em] text-white/60">
											Colour
										</p>
										<p className="font-copy text-[44px] font-light leading-none tracking-[0.03em]">
											{activeDiamond.colour}
										</p>
									</div>

									{activeDiamond.id === 5 && (
										<>
											<div data-animate="right" data-animate-delay="0.28">
												<p className="mb-2 font-copy text-[15px] font-light tracking-[0.03em] text-white/60">
													Clarity
												</p>
												<p className="font-copy text-[44px] font-light leading-none tracking-[0.03em]">
													{activeDiamond.clarity}
												</p>
											</div>

											<div data-animate="right" data-animate-delay="0.36">
												<p className="mb-2 font-copy text-[15px] font-light tracking-[0.03em] text-white/60">
													Cut
												</p>
												<p className="font-copy text-[44px] font-light leading-none tracking-[0.03em]">
													{activeDiamond.cut}
												</p>
											</div>
										</>
									)}
								</div>
							</div>

							<div className="mt-12">
								<div
									data-animate="right"
									data-animate-delay="0.48"
									className="mb-5 flex items-center justify-end gap-3 pr-1"
								>
									<button
										onClick={prev}
										type="button"
										className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/50 transition-all duration-300 hover:border-white hover:bg-white/10"
									>
										<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
											<path
												d="M11 3L5 9L11 15"
												stroke="white"
												strokeWidth="1.25"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>

									<button
										onClick={next}
										type="button"
										className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/50 transition-all duration-300 hover:border-white hover:bg-white/10"
									>
										<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
											<path
												d="M7 3L13 9L7 15"
												stroke="white"
												strokeWidth="1.25"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</div>

								<div
									data-animate="up"
									data-animate-delay="0.58"
									className="gem-strip relative z-20 h-[190px] overflow-hidden pr-6"
								>
									{desktopCarouselDiamonds.map((diamond, index) => (
										<button
											key={diamond.id}
											type="button"
											//onClick={() => moveToActive(diamond.id)}
											className={`gem-strip__item gem-strip__item--slot-${Math.min(index, 4)} group ${
												index === 0
													? "border-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.28)]"
													: "border-white/10"
											}`}
										>
											<img
												src={diamond.thumb}
												alt={diamond.title}
												className="absolute inset-0 h-full w-full object-cover object-[50%_50%] transition-transform duration-700 group-hover:scale-105"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
											<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_45%)]" />
											<div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
												<p className="font-copy text-[24px] font-light leading-[0.95] tracking-[0.03em] text-white">
													{diamond.title}
												</p>

												<p className="mt-2 font-copy text-[16px] font-light tracking-[0.03em] text-white/75">
													{diamond.carat}
												</p>
											</div>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default GemShowcase;
