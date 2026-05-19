function StatGrid({ stats }) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
			{stats.map((stat) => (
				<article
					key={stat.label}
					data-animate
					className="flex min-h-[117px] items-center justify-center border border-white/8 bg-[rgba(0,0,0,0.30)] px-6 py-6 md:px-10 lg:px-[60px] lg:py-[40px]"
				>
					<div className="flex items-center gap-3">
						<p className="shrink-0 font-condor text-[2.5rem] font-light tracking-[0.03em] text-white md:text-5xl lg:text-6xl">
							{stat.value}
							{stat.suffix}
						</p>

						<p className="max-w-[183px] font-condor text-sm font-light leading-tight tracking-[0.03em] text-white md:text-base lg:text-[17px]">
							{stat.label}
						</p>
					</div>
				</article>
			))}
		</div>
	);
}

export default StatGrid;
