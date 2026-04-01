function ImageCard({
	image,
	title,
	description,
	className = "",
	imageClassName = "",
	overlay = true,
	hoverReveal = false,
}) {
	return (
		<article
			className={`group relative overflow-hidden bg-black/40 transition duration-500 hover:-translate-y-1 ${className}`.trim()}
		>
			<img
				src={image}
				alt=""
				className={`h-full w-full object-cover transition duration-700  ${imageClassName}`}
			/>
			{overlay ? (
				<div
					className={`absolute inset-0 transition duration-500 ${
						hoverReveal
							? "bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.2)_100%)] group-hover:bg-black/82"
							: "bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.88)_100%)]"
					}`}
				/>
			) : null}
			<div
				className={`absolute inset-x-0 z-10 p-4 md:p-5 ${
					hoverReveal
						? "bottom-0 flex h-full flex-col items-center justify-center text-center opacity-0 transition duration-500 group-hover:opacity-100"
						: "bottom-0"
				}`}
			>
				<h3 className="font-copy text-4xl text-stone-100">{title}</h3>
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
