import ContactForm from "../components/ContactForm";
import PageHero from "../components/PageHero";
import RevealSection from "../components/RevealSection";
import { sharedImages } from "../data/siteContent";

function ContactPage() {
	return (
		<>
			<PageHero
				id="contact-hero"
				title="Contact Us"
				description=""
				image={sharedImages.ContactHero}
				accent="Scroll Down"
				accentHref="#content"
				minHeight="min-h-[50vh]"
			/>

			<RevealSection
				id="content"
				threshold={0.15}
				className="bg-black px-6 py-16 lg:py-24 md:px-10 lg:px-14 "
			>
				<div className="grid w-full gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
					<aside className="relative flex h-[550px] overflow-hidden border border-white/10 bg-[#2A2A2A] p-8 lg:p-10">
						<div className="pointer-events-none absolute bottom-0 left-0 h-full w-full">
							<img
								src={sharedImages.contactBg}
								alt=""
								className="h-full w-full object-contain object-bottom"
							/>
						</div>

						<div className="relative z-10 flex flex-col space-y-10">
							<div data-animate="left">
								<p className="font-sans text-base uppercase tracking-[0.18em] text-white">
									Address
								</p>
								<div className="mt-3 h-[1px] w-6 bg-white/60" />
								<p className="mt-4 font-copy text-lg leading-[1.8] text-stone-300">
									14 A, Almas Tower, Level 14,
									<br />
									Jumeirah Lake Towers,
									<br />
									Dubai, UAE
								</p>
							</div>

							<div data-animate="left" data-animate-delay="0.16">
								<p className="font-sans text-base uppercase tracking-[0.18em] text-white">
									CONTACT
								</p>
								<div className="mt-3 h-[1px] w-6 bg-white/60" />
								<div className="mt-4 space-y-2 font-copy text-lg text-stone-300">
									<a href="tel:+97144390374" className="block hover:text-white">
										+971 4 439 0374
									</a>
									<a
										href="mailto:dubai@samirgems.com"
										className="block hover:text-white"
									>
										dubai@samirgems.com
									</a>
								</div>
							</div>
						</div>
					</aside>

					<div className="border border-white/10 bg-black p-8 md:p-10 lg:p-14">
						<ContactForm />
					</div>
				</div>
			</RevealSection>
		</>
	);
}

export default ContactPage;
