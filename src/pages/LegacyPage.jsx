import PageHero from "../components/PageHero";
import RevealSection from "../components/RevealSection";
import { sharedImages } from "../data/siteContent";

function LegacyPage() {
	return (
		<>
			<PageHero
				id="legacy-hero"
				title={
					<>
						Where Heritage <br />
						Meets Mastery.
					</>
				}
				description={
					<>
						Shaping the future of diamonds with decades of trust and <br />
						craftsmanship.
					</>
				}
				image={sharedImages.LegacyHero}
				accent="Scroll Down"
				accentHref="#content"
			/>

			<RevealSection
				id="content"
				threshold={0.15}
				className="bg-[#272727] px-6 py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
			>
				<div className="grid gap-6 lg:grid-cols-[40%_60%]">
					<div data-animate="left">
						<h2 className="font-display text-[4rem] uppercase text-stone-100">
							The Brand
						</h2>
					</div>
					<div>
						<p
							data-animate="right"
							className="font-copy text-lg leading-relaxed text-stone-300"
						>
							Samir Gems FZCO is a global diamond enterprise operating within
							the FZCO framework since 2008. Rooted in the six decade legacy of
							Samir Gems, the brand has evolved into an independent entity,
							shaped by long standing industry relationships, deep market
							understanding, and a heritage built on trust and precision.
						</p>
						<p
							data-animate="right"
							data-animate-delay="0.16"
							className="mt-6 font-copy text-lg leading-relaxed text-stone-300"
						>
							Today, Samir Gems FZCO sources Kimberley Process certified rough
							diamonds and delivers calibrated, high quality polished stones
							with complete transparency. With a presence across key global
							markets, the brand is trusted by leading jewellery houses for its
							consistency, integrity, and ability to deliver at scale without
							compromise.
						</p>
					</div>
				</div>
			</RevealSection>

			<RevealSection
				threshold={0.15}
				className="bg-black px-6 py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
			>
				<div className="grid w-full items-stretch gap-8 lg:grid-cols-[40%_60%]">
					<div className="flex flex-col justify-start pr-8 lg:pr-14">
						<h2
							data-animate="left"
							className="mb-16 font-display text-[4rem] uppercase text-white"
						>
							Our Origins
						</h2>
						<h3
							data-animate="left"
							data-animate-delay="0.14"
							className="mb-12 font-copy text-4xl leading-tight text-stone-100"
						>
							A Heritage Built on Principles
						</h3>
						<ul className="space-y-3 font-copy text-base leading-relaxed text-stone-300">
							<li
								data-animate="left"
								data-animate-delay="0.28"
								className="flex items-start gap-3"
							>
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-300" />
								<span>
									Founded on honesty, precision, and respect for every stone
								</span>
							</li>
							<li
								data-animate="left"
								data-animate-delay="0.42"
								className="flex items-start gap-3"
							>
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-300" />
								<span>
									A culture shaped by discipline, consistency, and craftsmanship
								</span>
							</li>
						</ul>
					</div>
					<div className="overflow-hidden" data-animate="right">
						<img
							src={sharedImages.OurOrigin1}
							alt=""
							className="h-full w-full object-cover object-center"
						/>
					</div>
				</div>
			</RevealSection>

			<RevealSection
				threshold={0.15}
				className="bg-black px-6 py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
			>
				<div className="grid w-full items-stretch gap-8 lg:grid-cols-[60%_40%]">
					<div className="overflow-hidden" data-animate="left">
						<img
							src={sharedImages.OurOrigin2}
							alt=""
							className="h-[600px] w-full object-cover object-center"
						/>
					</div>
					<div className="flex flex-col justify-start pl-8 lg:pr-14">
						<h3
							data-animate="right"
							className="my-12 font-copy text-4xl leading-tight text-stone-100"
						>
							Craft Passed Through Generations
						</h3>
						<ul className="space-y-3 font-copy text-base leading-relaxed text-stone-300">
							<li
								data-animate="right"
								data-animate-delay="0.16"
								className="flex items-start gap-3"
							>
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-300" />
								<span>
									Skills refined and passed down by experienced artisans
								</span>
							</li>
							<li
								data-animate="right"
								data-animate-delay="0.3"
								className="flex items-start gap-3"
							>
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-300" />
								<span>
									Techniques evolved without losing traditional integrity
								</span>
							</li>
						</ul>
					</div>
				</div>
			</RevealSection>

			<RevealSection
				threshold={0.15}
				className="bg-black px-6 py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
			>
				<div className="grid w-full items-stretch gap-8 lg:grid-cols-[40%_60%]">
					<div className="flex flex-col justify-start pr-8 lg:pr-14">
						<h3
							data-animate="left"
							className="my-12 font-copy text-4xl leading-tight text-stone-100"
						>
							Values That Guide Us Today
						</h3>
						<ul className="space-y-3 font-copy text-base leading-relaxed text-stone-300">
							<li
								data-animate="left"
								data-animate-delay="0.16"
								className="flex items-start gap-3"
							>
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-300" />
								<span>
									Commitment to quality rooted in early family-led practices
								</span>
							</li>
							<li
								data-animate="left"
								data-animate-delay="0.3"
								className="flex items-start gap-3"
							>
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-300" />
								<span>Heritage strengthened by modern innovation in Dubai</span>
							</li>
							<li
								data-animate="left"
								data-animate-delay="0.44"
								className="flex items-start gap-3"
							>
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-300" />
								<span>
									The same principles continue to shape Samir Gems FZCO's
									identity
								</span>
							</li>
						</ul>
					</div>
					<div className="overflow-hidden" data-animate="right">
						<img
							src={sharedImages.OurOrigin3}
							alt=""
							className="h-[600px] w-full object-cover object-center"
						/>
					</div>
				</div>
			</RevealSection>
		</>
	);
}

export default LegacyPage;
