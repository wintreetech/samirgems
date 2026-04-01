import { useState } from "react";
import PageHero from "../components/PageHero";
import { sharedImages } from "../data/siteContent";

function ServicesPage() {
	const [active, setActive] = useState(0);
	const cards = [
		{
			id: 1,
			title: "The Letseng Icon",
			subtitle: "391 Ct.",
			image: "/Image17.png",
		},
		{
			id: 2,
			title: "Rose Of Kao",
			subtitle: "391 Ct.",
			image: "/Image18.png",
		},
		{
			id: 3,
			title: "The Pink Palesa",
			subtitle: "391 Ct.",
			image: "/Image19.png",
		},
		{
			id: 4,
			title: "Mountain Star",
			subtitle: "412 Ct.",
			image: "/Image20.png",
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

			<section
				id="content"
				className="bg-[#111111] px-6 py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
			>
				<div className="text-center">
					<h1 className="font-display text-[3rem] uppercase leading-[0.93] text-white md:text-[4rem]">
						What we do
					</h1>
				</div>
				<div className="mt-10 flex h-[220px] w-full gap-4 overflow-hidden">
					{cards.map((card, index) => (
						<button
							key={card.id}
							onMouseEnter={() => setActive(index)}
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
							<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
							<div
								className={`absolute bottom-0 left-0 w-full p-4 text-left transition-all duration-500 ${
									active === index
										? "translate-y-0 opacity-100"
										: "translate-y-2 opacity-90"
								}`}
							>
								<h3 className="font-copy text-[22px] leading-none tracking-[0.03em] text-white">
									{card.title}
								</h3>
								<p className="mt-1 font-copy text-sm font-light tracking-[0.03em] text-white/80">
									{card.subtitle}
								</p>
							</div>
						</button>
					))}
				</div>
			</section>

			<section className="bg-[#272727] px-6 py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
				<div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
					<div className="relative min-h-[520px] overflow-hidden bg-black/30">
						<img
							src="/Dsc092151.png"
							alt="How We Deliver Value"
							className="absolute inset-0 h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/45" />
						<div className="relative flex h-full items-start justify-center p-10">
							<h2 className="max-w-[420px] text-center font-display text-5xl leading-[1.05] text-white lg:text-6xl">
								How We Deliver Value
							</h2>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div className="flex min-h-[250px] flex-col justify-between bg-black/30 p-8">
							<p className="max-w-[240px] font-copy text-[17px] font-light tracking-[0.03em] text-white">
								Vertically integrated mine-to-market operations
							</p>
							<img
								src="/icon-operations.svg"
								alt=""
								className="h-9 w-9 opacity-30"
							/>
						</div>
						<div className="flex min-h-[250px] flex-col justify-between bg-black/30 p-8">
							<p className="max-w-[240px] font-copy text-[17px] font-light tracking-[0.03em] text-white">
								Consistent quality backed by decades of expertise
							</p>
							<img
								src="/icon-quality.svg"
								alt=""
								className="h-9 w-9 opacity-30"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div className="flex min-h-[250px] flex-col justify-between bg-black/30 p-8">
							<p className="max-w-[240px] font-copy text-[17px] font-light tracking-[0.03em] text-white">
								Ethical sourcing and transparent processes
							</p>
							<img
								src="/icon-ethical.svg"
								alt=""
								className="h-9 w-9 opacity-30"
							/>
						</div>
						<div className="flex min-h-[250px] flex-col justify-between bg-black/30 p-8">
							<p className="max-w-[240px] font-copy text-[17px] font-light tracking-[0.03em] text-white">
								Trusted by leading luxury and jewellery houses worldwide
							</p>
							<img
								src="/icon-trusted.svg"
								alt=""
								className="h-9 w-9 opacity-30"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default ServicesPage;
