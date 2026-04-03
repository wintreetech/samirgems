import React from "react";
import { sharedImages } from "../data/siteContent";

function GemShowcase() {
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

	const [activeIndex, setActiveIndex] = React.useState(0);

	const activeDiamond = diamonds[activeIndex];

	const next = () => {
		setActiveIndex((prev) => (prev + 1) % diamonds.length);
	};

	const prev = () => {
		setActiveIndex((prev) => (prev === 0 ? diamonds.length - 1 : prev - 1));
	};

	return (
		<section className="relative bg-[#161616] text-white">
			{/* Full background image instead of left-side image */}
			<div className="absolute inset-0 overflow-hidden">
				<img
					key={activeDiamond.id}
					src={activeDiamond.heroImage}
					alt={activeDiamond.title}
					className="h-full w-full object-cover transition-all duration-700"
				/>
				<div className="absolute inset-0 bg-black/45" />
				<div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-[#161616]" />
				<div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
			</div>

			<div className="relative mx-auto px-5 py-6 lg:px-10 lg:py-10">
				{/* Keep same layout / positioning */}
				<div className="grid min-h-[820px] overflow-hidden lg:grid-cols-[42%_58%]">
					{/* Empty left space preserved for same alignment */}
					<div className="hidden lg:block" />

					{/* Right Content - unchanged */}
					<div className="relative flex flex-col  px-8 py-10 lg:px-14 lg:py-12 xl:px-16">
						<div>
							<h2 className=" font-condor text-[42px] font-light leading-none tracking-[0.03em] lg:text-6xl">
								The Lesotho Legend
							</h2>

							<div className="mt-14 grid grid-cols-2 gap-x-16 gap-y-12">
								<div>
									<p className="mb-2 font-condor text-[15px] font-light tracking-[0.03em] text-white/60">
										Cut
									</p>
									<p className="font-condor text-[44px] font-light leading-none tracking-[0.03em]">
										{activeDiamond.cut}
									</p>
								</div>

								<div>
									<p className="mb-2 font-condor text-[15px] font-light tracking-[0.03em] text-white/60">
										Clarity
									</p>
									<p className="font-condor text-[44px] font-light leading-none tracking-[0.03em]">
										{activeDiamond.clarity}
									</p>
								</div>

								<div>
									<p className="mb-2 font-condor text-[15px] font-light tracking-[0.03em] text-white/60">
										Colour
									</p>
									<p className="font-condor text-[44px] font-light leading-none tracking-[0.03em]">
										{activeDiamond.colour}
									</p>
								</div>

								<div>
									<p className="mb-2 font-condor text-[15px] font-light tracking-[0.03em] text-white/60">
										Carat
									</p>
									<p className="font-condor text-[44px] font-light leading-none tracking-[0.03em]">
										{activeDiamond.mainCarat}
									</p>
								</div>
							</div>
						</div>

						<div className="mt-12">
							<div className="mb-5 flex items-center justify-end gap-3 pr-1">
								<button
									onClick={prev}
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

							<div className="relative overflow-hidden">
								<div className="flex gap-4">
									{[0, 1, 2].map((offset) => {
										const index = (activeIndex + offset) % diamonds.length;
										const diamond = diamonds[index];
										const isActive = offset === 0;
										const isHalf = offset === 2;

										return (
											<button
												key={diamond.id}
												onClick={() => !isHalf && setActiveIndex(index)}
												className={`group relative h-[190px] xl:h-[205px] shrink-0 overflow-hidden text-left ${
													isHalf
														? "w-[150px] opacity-45 pointer-events-none"
														: "w-[300px]"
												} ${isActive ? "ring-1 ring-white" : "opacity-90"}`}
											>
												<img
													src={diamond.thumb}
													alt={diamond.title}
													className="absolute inset-0 h-full w-full object-cover"
												/>

												<div
													className={`absolute inset-0 ${
														isHalf
															? "bg-black/60"
															: "bg-gradient-to-t from-black via-black/30 to-transparent"
													}`}
												/>

												<div className="absolute bottom-0 left-0 right-0 p-4">
													<p
														className={`font-condor font-light leading-none tracking-[0.03em] ${
															isHalf
																? "text-[22px] text-white/60"
																: "text-[24px]"
														}`}
													>
														{diamond.title}
													</p>

													{!isHalf && isActive && (
														<p className="mt-2 font-condor text-[16px] font-light tracking-[0.03em] text-white/80">
															{diamond.carat}
														</p>
													)}
												</div>
											</button>
										);
									})}
								</div>

								<div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#161616] to-transparent" />
							</div>
							{/* <div className="grid grid-cols-2 gap-4">
								{[0, 1].map((offset) => {
									const index = (activeIndex + offset) % diamonds.length;
									const diamond = diamonds[index];
									const isActive = offset === 0;

									return (
										<button
											key={diamond.id}
											onClick={() => setActiveIndex(index)}
											className={`group relative h-[190px] overflow-hidden bg-black text-left transition-all duration-500 xl:h-[205px] ${
												isActive
													? "scale-[1.02] ring-1 ring-white"
													: "opacity-80 hover:opacity-100"
											}`}
										>
											<img
												src={diamond.thumb}
												alt={diamond.title}
												className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
											/>

											<div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

											<div className="absolute bottom-0 left-0 right-0 p-4">
												<p className="font-condor text-[24px] font-light leading-none tracking-[0.03em]">
													{diamond.title}
												</p>

												<div
													className={`overflow-hidden transition-all duration-500 ${
														isActive
															? "mt-2 max-h-20 opacity-100"
															: "max-h-0 opacity-0"
													}`}
												>
													<p className="font-condor text-[16px] font-light tracking-[0.03em] text-white/80">
														{diamond.carat}
													</p>
												</div>
											</div>
										</button>
									);
								})}
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default GemShowcase;
