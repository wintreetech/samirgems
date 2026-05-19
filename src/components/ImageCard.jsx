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
			className={`group relative overflow-hidden bg-black/40 transition duration-500 lg:hover:-translate-y-1 ${className}`.trim()}
		>
			<img
				src={image}
				alt=""
				className={`h-full w-full object-cover transition duration-700 ease-out ${
					hoverReveal ? "opacity-100 lg:group-hover:opacity-0" : ""
				}`}
			/>
			{overlay ? (
				<div
					className={`absolute inset-0 transition duration-500 ${
						hoverReveal
							? "bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.72)_100%)] lg:bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.2)_100%)] lg:group-hover:bg-black"
							: "bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.88)_100%)]"
					}`}
				/>
			) : null}
			<div
				className={`absolute inset-x-0 z-10 p-4 md:p-5 ${
					hoverReveal
						? "bottom-0 flex h-full flex-col items-center justify-end text-center opacity-100 transition duration-500 lg:justify-center lg:opacity-0 lg:group-hover:opacity-100"
						: "bottom-0"
				}`}
			>
				<h3 className="font-copy text-[2rem] text-stone-100 md:text-4xl">
					{title}
				</h3>
				{description ? (
					<p
						className={`mt-2 font-copy text-base leading-relaxed text-stone-300 ${
							hoverReveal ? "max-w-[28ch] text-center" : "max-w-[28ch]"
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
