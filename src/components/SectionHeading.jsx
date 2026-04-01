function SectionHeading({
	eyebrow,
	title,
	description,
	align = "left",
	descriptionClassName,
}) {
	const alignClass = align === "center" ? "mx-auto text-center" : "";

	return (
		<div className={`${alignClass}`}>
			{eyebrow ? (
				<p className="mb-3 font-sans text-[11px] uppercase tracking-[0.24em] text-white">
					{eyebrow}
				</p>
			) : null}
			<h2 className="font-display text-[2.25rem] uppercase leading-[0.96] text-white md:text-[3rem] lg:text-[4rem]">
				{title}
			</h2>
			{description ? (
				<p
					className={`${descriptionClassName} font-copy text-lg leading-relaxed text-white`}
				>
					{description}
				</p>
			) : null}
		</div>
	);
}

export default SectionHeading;
