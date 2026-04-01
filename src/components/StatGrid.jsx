function StatGrid({ stats }) {
	return (
		<div className="grid gap-5 md:grid-cols-3">
			{stats.map((stat) => (
				<article
					key={stat.label}
					className="border border-white/8 bg-black/35 px-6 py-6 backdrop-blur-sm transition duration-500 hover:border-white/18"
				>
					<p className="font-display text-[3rem] leading-none text-stone-100 md:text-[3.8rem]">
						{stat.value}
						{stat.suffix ? (
							<span className="text-[0.56em]">{stat.suffix}</span>
						) : null}
					</p>
					<p className="mt-3 font-copy text-lg leading-snug text-stone-300">
						{stat.label}
					</p>
				</article>
			))}
		</div>
	);
}

export default StatGrid;
