// components/DiamondEditorial.jsx
function DiamondEditorial({ image, href }) {
	return (
		<article>
			<div className="mx-auto grid max-w-[1312px] items-center gap-10 lg:grid-cols-[minmax(0,527px)_minmax(0,704px)] lg:gap-[6.17%]">
				<div className="font-condor tracking-[0.03em] text-white">
					<time
						dateTime="2022-09-28"
						className="block text-[17px] font-light leading-snug"
					>
						September 28, 2022
					</time>

					<h2 className="mt-3 text-[32px] font-light leading-[1.12] sm:text-4xl">
						Namdia Advertorial: Fulfilling the Promise
					</h2>

					<p className="mt-5 text-[17px] font-light leading-[1.35]">
						On September 15th, 2022, next to the breathtaking vista of the
						Namibian coast as a setting, NAMDIA revealed a new chapter in its
						quest to capture more value for the diamonds it handles on behalf of
						the people of Namibia. At an event opened with remarks by the
						Governor of the Erongo Region, NAMDIA uncovered a diamond that
						represents a first in Namibian history; the Eumbo Star.
					</p>

					<a
						href={href}
						target="_blank"
						className="group mt-10 inline-flex items-center gap-[22px] text-[15px] font-medium leading-none"
					>
						<span>Read More</span>
						<svg
							aria-hidden="true"
							width="51"
							height="8"
							viewBox="0 0 51 8"
							fill="none"
							className="transition-transform duration-300 group-hover:translate-x-2"
						>
							<path
								d="M50.3536 4.03519C50.5488 3.83993 50.5488 3.52335 50.3536 3.32809L47.1716 0.146107C46.9763 -0.0491555 46.6597 -0.0491555 46.4645 0.146107C46.2692 0.341369 46.2692 0.657951 46.4645 0.853214L49.2929 3.68164L46.4645 6.51007C46.2692 6.70533 46.2692 7.02191 46.4645 7.21717C46.6597 7.41244 46.9763 7.41244 47.1716 7.21717L50.3536 4.03519ZM0 3.68164V4.18164H50V3.68164V3.18164H0V3.68164Z"
								fill="currentColor"
							/>
						</svg>
					</a>
				</div>

				<div className="aspect-[711/400] w-full overflow-hidden bg-[#272727]">
					<img
						src={image}
						alt="Rough and polished diamond"
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
		</article>
	);
}

export default DiamondEditorial;
