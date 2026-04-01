import React from "react";

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
			heroImage: "/Image15.png",
			thumb: "/Image17.png",
		},
		{
			id: 2,
			title: "Rose Of Kao",
			carat: "391 Ct.",
			cut: "Lorem",
			clarity: "VS1",
			colour: "Pink",
			mainCarat: "870",
			heroImage: "/Image18Large.png",
			thumb: "/Image18.png",
		},
		{
			id: 3,
			title: "The Pink Palesa",
			carat: "391 Ct.",
			cut: "Lorem",
			clarity: "IF",
			colour: "Pink",
			mainCarat: "650",
			heroImage: "/Image19Large.png",
			thumb: "/Image19.png",
		},
		{
			id: 4,
			title: "Mountain Star",
			carat: "412 Ct.",
			cut: "Emerald",
			clarity: "VVS1",
			colour: "White",
			mainCarat: "412",
			heroImage: "/Image20Large.png",
			thumb: "/Image20.png",
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
		<>
			<section className="relative  bg-[#161616] text-white">
				<div className="absolute inset-0 opacity-40">
					<img
						src="/Image14.png"
						alt=""
						className="h-full w-full object-cover"
					/>
				</div>

				<div className="relative mx-auto px-5 py-6 lg:px-10 lg:py-10">
					<div className="grid min-h-[820px] overflow-hidden bg-[#111111] lg:grid-cols-[52%_48%]">
						<div className="relative min-h-[420px] lg:min-h-[820px]">
							<img
								key={activeDiamond.id}
								src={activeDiamond.heroImage}
								alt={activeDiamond.title}
								className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
							/>

							<div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/35" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
						</div>

						<div className="relative flex flex-col justify-between px-8 py-10 lg:px-14 lg:py-12 xl:px-16">
							<div>
								<h2 className="max-w-[540px] font-condor text-[42px] font-light leading-none tracking-[0.03em] lg:text-[72px]">
									The Lesotho Legend
								</h2>

								<div className="mt-14 grid max-w-[520px] grid-cols-2 gap-x-16 gap-y-12">
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

								<div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
									{diamonds.map((diamond, index) => (
										<button
											key={diamond.id}
											onClick={() => setActiveIndex(index)}
											className={`group relative h-[190px] overflow-hidden bg-black text-left transition-all duration-500 xl:h-[205px] ${
												activeIndex === index
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
												<p className="mt-2 font-condor text-[16px] font-light tracking-[0.03em] text-white/80">
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
			</section>
		</>
	);
}

export default GemShowcase;
