function StatGrid({ stats }) {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
			{stats.map((stat) => (
				<article
					key={stat.label}
					data-animate
					className="flex h-[120px] items-center justify-center border border-white/8 bg-[rgba(0,0,0,0.30)] px-6 py-6 backdrop-blur-[2.75px] sm:px-8 lg:px-[60px] lg:py-[40px]"
				>
					<div className="flex w-full items-center justify-center gap-2.5">
						<p className="shrink-0 font-condor text-5xl font-light leading-none tracking-[0.03em] text-white lg:text-6xl">
							{stat.value}
							{stat.suffix}
						</p>

						<p className="max-w-[183px] font-condor text-[15px] font-light leading-tight tracking-[0.03em] text-white/90 lg:text-[17px]">
							{stat.label}
						</p>
					</div>
				</article>
			))}
		</div>
	);
}

export default StatGrid;
