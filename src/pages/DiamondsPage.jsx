import GemShowcase from "../components/GemShowcase";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
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

			<section
				id="content"
				className="bg-[#111111] px-6 py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-24"
			>
				<div className="mb-12 w-full">
					<SectionHeading title="Our Landmark Gems" align="center" />
				</div>
				<div className="w-full">
					<GemShowcase />
				</div>
			</section>
		</>
	);
}

export default DiamondsPage;
