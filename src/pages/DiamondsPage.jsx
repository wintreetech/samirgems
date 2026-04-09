import GemShowcase from "../components/GemShowcase";
import PageHero from "../components/PageHero";
import RevealSection from "../components/RevealSection";
import { sharedImages } from "../data/siteContent";

function DiamondsPage() {
	return (
		<>
			<PageHero
				id="diamonds-hero"
				title="Our Diamonds"
				description={
					<>
						Shaping the future of diamonds with decades of trust and <br />
						craftsmanship.
					</>
				}
				image={sharedImages.DiamondHero}
				accent="Scroll Down"
				accentHref="#content"
			/>

			<section id="content" className="bg-[#111111] ">
				<RevealSection
					threshold={0.15}
					className=" w-full py-25 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
				>
					<div className="text-center">
						<h2
							data-animate="up"
							className="font-display text-[2.25rem] uppercase leading-[0.96] text-white md:text-[3rem] lg:text-[4rem]"
						>
							Our Landmark Gems
						</h2>
					</div>
				</RevealSection>
				<RevealSection threshold={0.1} className="w-full">
					<GemShowcase />
				</RevealSection>
			</section>
		</>
	);
}

export default DiamondsPage;
