import ContactForm from "../components/ContactForm";
import PageHero from "../components/PageHero";
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

			<section
				id="content"
				className="bg-black px-6 py-16 lg:py-24 md:px-10 lg:px-14 "
			>
				<div className="grid w-full gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
					<aside className="flex h-full border border-white/10 bg-[#2A2A2A] p-8 lg:p-10">
						<div className="flex flex-col space-y-10">
							<div>
								<p className="font-sans text-[11px] uppercase tracking-[0.18em] text-stone-400">
									Address
								</p>
								<p className="mt-4 font-copy text-lg leading-[1.8] text-stone-300">
									14 A, Almas Tower, Level 14,
									<br />
									Jumeirah Lake Towers,
									<br />
									Dubai, UAE
								</p>
							</div>

							<div className="mt-4 space-y-2 font-copy text-lg leading-relaxed text-stone-300">
								<a
									href="tel:+97144390374"
									className="block transition-colors duration-300 hover:text-white"
								>
									+971 4 439 0374
								</a>

								<a
									href="mailto:dubai@samirgems.com"
									className="block transition-colors duration-300 hover:text-white"
								>
									dubai@samirgems.com
								</a>
							</div>
						</div>
					</aside>

					<div className="border border-white/10 bg-black p-8 md:p-10 lg:p-14">
						<ContactForm />
					</div>
				</div>
			</section>
		</>
	);
}

export default ContactPage;
