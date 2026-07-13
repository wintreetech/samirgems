function ImageCard({
	image,
	title,
	description,
	className = "",
	imageClassName = "",
	overlay = true,
	hoverReveal = false,
	onMouseEnter,
	onMouseLeave,
}) {
	return (
		<article
			data-animate
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`group relative overflow-hidden bg-black/40 transition-transform duration-700 ease-out transform-gpu lg:hover:scale-[1.015] ${className}`.trim()}
		>
			<img
				src={image}
				alt=""
				className={`h-full w-full object-cover transition-transform duration-1000 ease-out transform-gpu lg:group-hover:scale-105 ${imageClassName}`}
			/>

			{overlay ? (
				<div
					className={`absolute inset-0 transition duration-700 ease-out ${
						hoverReveal
							? "bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.72)_100%)] lg:bg-black/35 lg:group-hover:bg-black/65"
							: "bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.88)_100%)]"
					}`}
				/>
			) : null}

			<div
				className={`absolute inset-x-0 bottom-0 z-10 flex h-full flex-col items-center justify-end p-4 text-center md:p-5 ${
					hoverReveal ? "lg:inset-0 lg:justify-center" : ""
				}`}
			>
				<h3 className="font-copy text-[2rem] text-stone-100 md:text-4xl">
					{title}
				</h3>

				{description ? (
					<p
						className={`max-w-[28ch] font-copy text-base leading-relaxed text-stone-300 transition-all duration-700 ease-out ${
							hoverReveal
								? "mt-2 opacity-100 lg:mt-0 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:mt-3 lg:group-hover:max-h-40 lg:group-hover:opacity-100"
								: "mt-2"
						}`}
					>
						{description}
					</p>
				) : null}
			</div>
		</article>
	);
}

export default ImageCard;
