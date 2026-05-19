function SectionHeading({
	eyebrow,
	title,
	description,
	align = "left",
	descriptionClassName,
}) {
	const alignClass =
		align === "center" ? "mx-auto max-w-[44rem] text-center" : "max-w-[44rem]";

	return (
		<div className={`${alignClass}`}>
			{eyebrow ? (
				<p
					data-animate
					className="mb-3 font-sans text-[11px] uppercase tracking-[0.24em] text-white"
				>
					{eyebrow}
				</p>
			) : null}
			<h2
				data-animate
				className="font-display text-[2rem] uppercase leading-[0.96] text-white sm:text-[2.35rem] md:text-[3rem] lg:text-[4rem]"
			>
				{title}
			</h2>
			{description ? (
				<p
					data-animate
					className={`${descriptionClassName} mt-5 font-copy text-base leading-relaxed text-white/82 md:text-lg`}
				>
					{description}
				</p>
			) : null}
		</div>
	);
}

export default SectionHeading;
