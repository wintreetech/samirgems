import { useState } from "react";
import PageHero from "../components/PageHero";
import RevealSection from "../components/RevealSection";
import { sharedImages } from "../data/siteContent";

function ServicesPage() {
	const [active, setActive] = useState(0);

	const cards = [
		{
			id: 1,
			title: "Rough Diamond Supply",
			image: sharedImages.whatwedo1,
			details: [
				"Consistent supply from global mines",
				"Kimberley-certified production",
				"Strong relationships ensuring reliability",
			],
		},
		{
			id: 2,
			title: "Diamond Manufacturing",
			image: sharedImages.whatwedo2,
			details: [
				"Consistent supply from global mines",
				"Kimberley-certified production",
				"Strong relationships ensuring reliability",
			],
		},
		{
			id: 3,
			title: "Calibrated & Custom Supply",
			image: sharedImages.whatwedo3,
			details: [
				"Consistent supply from global mines",
				"Kimberley-certified production",
				"Strong relationships ensuring reliability",
			],
		},
		{
			id: 4,
			title: "Mine-to-Market Transparency",
			image: sharedImages.whatwedo4,
			details: [
				"Consistent supply from global mines",
				"Kimberley-certified production",
				"Strong relationships ensuring reliability",
			],
		},
	];

	return (
		<>
			<PageHero
				id="services-hero"
				title="Our Services"
				description={
					<>
						Shaping the future of diamonds with decades of trust and <br />
						craftsmanship.
					</>
				}
				image={sharedImages.ServiceHero}
				accent="Scroll Down"
				accentHref="#content"
			/>

			<RevealSection
				id="content"
				threshold={0.15}
				className="bg-[#111111] px-6 py-25 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
			>
				<div className="text-center">
					<h1
						data-animate="up"
						className="font-display text-[3rem] uppercase leading-[0.93] text-white md:text-[4rem]"
					>
						What we do
					</h1>
				</div>
				<div className="mt-25 flex h-112.5 w-full gap-4 overflow-hidden">
					{cards.map((card, index) => (
						<button
							key={card.id}
							data-animate="up"
							data-animate-delay={0.16 + index * 0.12}
							onMouseEnter={() => setActive(index)}
							onMouseLeave={() => setActive(0)}
							onClick={() => setActive(index)}
							className={`group relative h-full overflow-hidden rounded-none border border-white/10 transition-all duration-500 ease-in-out ${
								active === index ? "w-[46%]" : "w-[18%]"
							}`}
						>
							<img
								src={card.image}
								alt={card.title}
								className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>

							{index === 0 && (
								<div
									className={`absolute top-0 left-0 flex w-full items-center justify-center bg-black/60 px-6 backdrop-blur-md transition-opacity duration-300 ${
										active === 0 ? "opacity-100" : "opacity-0"
									}`}
								>
									<div className="flex items-center justify-center">
										<img
											src={sharedImages.logoStrip}
											alt=""
											className="h-auto w-auto object-contain"
										/>
									</div>
								</div>
							)}

							<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

							<div
								className={`absolute bottom-0 left-0 w-full p-8 text-left transition-all duration-500 ${
									active === index
										? "translate-y-0 opacity-100"
										: "translate-y-2 opacity-90"
								}`}
							>
								<h3 className="font-copy text-2xl leading-none tracking-[0.03em] text-white">
									{card.title}
								</h3>
								<ul
									className={`mt-4 space-y-2 overflow-hidden transition-all duration-500 ${
										active === index
											? "max-h-40 opacity-100"
											: "max-h-0 opacity-0"
									}`}
								>
									{card.details.map((item, detailIndex) => (
										<li
											key={detailIndex}
											className="flex items-start gap-2 font-copy text-sm font-light tracking-[0.03em] text-white/85"
										>
											<span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/70" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</button>
					))}
				</div>
			</RevealSection>

			<RevealSection
				threshold={0.15}
				className="bg-[#272727] px-6 py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
			>
				<div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
					<div
						className="relative min-h-[520px] overflow-hidden bg-black/30"
						data-animate="left"
					>
						<img
							src={sharedImages.HowWeDeliver}
							alt="How We Deliver Value"
							className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out hover:scale-[1.03]"
						/>
						<div className="relative flex h-full items-start justify-center p-10">
							<h2 className="text-center font-display text-5xl leading-[1.05] text-white lg:text-6xl">
								HOW WE <br /> DELIVER VALUE
							</h2>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div
							data-animate="up"
							className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden border border-white/8 bg-black/30 p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-white/20 hover:bg-black/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
						>
							{/* Light sweep effect */}
							<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
								<div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
							</div>

							<img
								src={sharedImages.value1}
								alt=""
								className="h-9 w-9 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
							/>

							<p className="max-w-[240px] font-copy text-[17px] font-light tracking-[0.03em] text-white transition-all duration-500 ease-out group-hover:translate-y-[-3px] group-hover:text-white">
								Vertically integrated mine-to-market operations
							</p>
						</div>

						<div
							data-animate="up"
							data-animate-delay="0.14"
							className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden border border-white/8 bg-black/30 p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-white/20 hover:bg-black/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
						>
							<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
								<div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
							</div>

							<img
								src={sharedImages.value2}
								alt=""
								className="h-9 w-9 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
							/>

							<p className="max-w-[240px] font-copy text-[17px] font-light tracking-[0.03em] text-white transition-all duration-500 ease-out group-hover:translate-y-[-3px] group-hover:text-white">
								Consistent quality backed by decades of expertise
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div
							data-animate="right"
							className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden border border-white/8 bg-black/30 p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-white/20 hover:bg-black/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
						>
							<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
								<div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
							</div>

							<img
								src={sharedImages.value3}
								alt=""
								className="h-9 w-9 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
							/>

							<p className="max-w-[240px] font-copy text-[17px] font-light tracking-[0.03em] text-white transition-all duration-500 ease-out group-hover:translate-y-[-3px] group-hover:text-white">
								Ethical sourcing and transparent processes
							</p>
						</div>

						<div
							data-animate="right"
							data-animate-delay="0.14"
							className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden border border-white/8 bg-black/30 p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-white/20 hover:bg-black/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
						>
							<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
								<div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
							</div>

							<img
								src={sharedImages.value4}
								alt=""
								className="h-9 w-9 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
							/>

							<p className="max-w-[240px] font-copy text-[17px] font-light tracking-[0.03em] text-white transition-all duration-500 ease-out group-hover:translate-y-[-3px] group-hover:text-white">
								Trusted by leading luxury and jewellery houses worldwide
							</p>
						</div>
					</div>
				</div>
			</RevealSection>
		</>
	);
}

export default ServicesPage;
