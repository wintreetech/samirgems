import RevealSection from "./RevealSection";

function PageHero({
	id = "",
	dataSection = "",
	title,
	description,
	image,
	imageClassName = "",
	minHeight = "min-h-[85vh]",
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
			className={`section-frame relative isolate grid ${minHeight} items-end overflow-hidden px-6 py-12 md:px-10 lg:px-14 ${className}`}
		>
			<div className="absolute inset-0">
				<img
					src={image}
					alt=""
					className={`h-full w-full object-cover ${imageClassName}`}
				/>
				<div
					className={`absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.38)_46%,rgba(0,0,0,0.72)_100%)] ${overlayClassName}`}
				/>
			</div>

			<div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
				<div data-animate="up" data-animate-delay="0.08">
					<h1 className="font-display text-[2.7rem] uppercase leading-[0.95] text-stone-100 md:text-[4rem] lg:text-[4.7rem]">
						{title}
					</h1>
					<p className="mt-12 font-copy text-lg leading-relaxed text-stone-300">
						{description}
					</p>
				</div>

				<div
					className="flex items-center justify-between gap-6 lg:flex-col lg:items-end"
					data-animate="right"
					data-animate-delay="0.22"
				>
					<a
						href={accentHref}
						className="group inline-flex flex-col items-center gap-3 lg:items-end"
						aria-label={accent}
					>
						<span className="font-copy text-[11px] uppercase tracking-[0.2em] text-stone-200 transition group-hover:text-white">
							{accent}
						</span>
						<span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/20 transition duration-300 group-hover:border-white/60 group-hover:bg-white/10">
							<span className="font-copy text-lg leading-none text-white">
								↓
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
