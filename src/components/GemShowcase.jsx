import React from "react";
import { sharedImages } from "../data/siteContent";

const diamonds = [
	{
		id: 1,
		title: "The Letseng Icon",
		carat: "391 Ct.",
		cut: "Lorem",
		clarity: "Lorem",
		colour: "White",
		mainCarat: "924",
		heroImage: sharedImages.Hero_Diamonds_1,
		thumb: sharedImages.Hero_Diamonds_1,
	},
	{
		id: 2,
		title: "Rose Of Kao",
		carat: "391 Ct.",
		cut: "Emerald",
		clarity: "VS1",
		colour: "Pink",
		mainCarat: "870",
		heroImage: sharedImages.Hero_Diamonds_2,
		thumb: sharedImages.Hero_Diamonds_2,
	},
	{
		id: 3,
		title: "The Pink Palesa",
		carat: "391 Ct.",
		cut: "Oval",
		clarity: "IF",
		colour: "Pink",
		mainCarat: "650",
		heroImage: sharedImages.Hero_Diamonds_3,
		thumb: sharedImages.Hero_Diamonds_3,
	},
	{
		id: 4,
		title: "Mountain Star",
		carat: "412 Ct.",
		cut: "Cushion",
		clarity: "VVS1",
		colour: "White",
		mainCarat: "412",
		heroImage: sharedImages.Hero_Diamonds_4,
		thumb: sharedImages.Hero_Diamonds_4,
	},
];

const initialOrder = [
	diamonds[diamonds.length - 1],
	...diamonds.slice(0, diamonds.length - 1),
];

function GemShowcase() {
	const [orderedDiamonds, setOrderedDiamonds] = React.useState(initialOrder);

	const activeDiamond = orderedDiamonds[1] ?? orderedDiamonds[0];

	const next = () => {
		setOrderedDiamonds((prev) => [...prev.slice(1), prev[0]]);
	};

	const prev = () => {
		setOrderedDiamonds((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
	};

	const moveToActive = (id) => {
		setOrderedDiamonds((prev) => {
			const currentActive = prev[1] ?? prev[0];
			const target = prev.find((item) => item.id === id);

			if (!target || !currentActive || target.id === currentActive.id) {
				return prev;
			}

			const remaining = prev.filter(
				(item) => item.id !== currentActive.id && item.id !== target.id,
			);

			return [currentActive, target, ...remaining];
		});
	};

	return (
		<section className="gem-showcase relative overflow-hidden bg-[#161616] text-white">
			<div className="gem-stage absolute inset-0">
				{orderedDiamonds.map((diamond, slot) => (
					<button
						key={diamond.id}
						type="button"
						onClick={() => moveToActive(diamond.id)}
						className={`gem-stage__item gem-stage__item--slot-${Math.min(slot, 5)}`}
						aria-label={diamond.title}
					>
						<img
							src={diamond.heroImage}
							alt={diamond.title}
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/45" />
						<div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-[#161616]" />
						<div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
					</button>
				))}
			</div>

			<div className="relative z-10 px-5 py-6 lg:px-10 lg:py-10">
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
								{orderedDiamonds.map((diamond, index) => (
									<button
										key={diamond.id}
										type="button"
										onClick={() => moveToActive(diamond.id)}
										className={`gem-strip__item gem-strip__item--slot-${Math.min(index, 4)} group ${
											index === 1
												? "border-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.28)]"
												: "border-white/10"
										}`}
									>
										<img
											src={diamond.thumb}
											alt={diamond.title}
											className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
										<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_45%)]" />
										<div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
											<p className="font-copy text-[24px] font-light leading-[0.95] tracking-[0.03em] text-white">
												{diamond.title}
											</p>
											{index === 1 ? (
												<p className="mt-2 font-copy text-[16px] font-light tracking-[0.03em] text-white/75">
													{diamond.carat}
												</p>
											) : null}
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default GemShowcase;
