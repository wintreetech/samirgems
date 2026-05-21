import RevealSection from "./RevealSection";

function PageHero({
	id = "",
	dataSection = "",
	title,
	description,
	image,
	imageClassName = "",
	minHeight = "min-h-[68svh] md:min-h-[76vh] lg:min-h-[85vh]",
	accent = "Discover More",
	accentHref = "#content",
	overlayClassName = "",
	className = "",
	children,
}) {
	return (
		<RevealSection
			id={id}
			data-section={dataSection}
			threshold={0.05}
			className={`section-frame relative isolate grid ${minHeight} items-end overflow-hidden px-5 py-10 md:px-10 md:py-12 lg:px-14 ${className}`}
		>
			<div className="absolute inset-0">
				<img
					src={image}
					alt=""
					className={`h-full w-full object-cover ${imageClassName}`}
				/>

				<div
					className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.88)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.25)_46%,rgba(0,0,0,0.5)_100%)] ${overlayClassName}`}
				/>
			</div>

			<div className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
				<div data-animate="up" data-animate-delay="0.08">
					<h1 className="font-display text-[2.3rem] uppercase leading-[0.95] text-stone-100 sm:text-[2.8rem] md:text-[4rem] lg:text-[4.7rem]">
						{title}
					</h1>
					<p className="mt-6 max-w-[30rem] font-copy text-base leading-relaxed text-stone-300 sm:text-lg md:mt-12">
						{description}
					</p>
				</div>

				<div
					className="flex items-center justify-start gap-4 lg:flex-col lg:items-end"
					data-animate="right"
					data-animate-delay="0.22"
				>
					<a
						href={accentHref}
						className="group inline-flex items-center gap-3 lg:flex-col lg:items-end"
						aria-label={accent}
					>
						<span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/20 transition duration-300 group-hover:border-white/60 group-hover:bg-white/10">
							<span className="font-copy text-lg leading-none text-white">
								&darr;
							</span>
						</span>
					</a>
					{children}
				</div>
			</div>
		</RevealSection>
	);
}

export default PageHero;
