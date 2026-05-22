function StatGrid({ stats }) {
	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
			{stats.map((stat) => (
				<article
					key={stat.label}
					data-animate
					className="flex min-h-[92px] items-center border border-white/8 bg-[rgba(0,0,0,0.30)] px-4 py-4 md:min-h-[117px] md:justify-center md:px-10 md:py-6 lg:px-[60px] lg:py-[40px]"
				>
					<div className="flex w-full items-center gap-4 md:w-auto md:gap-3">
						<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] md:hidden">
							<span className="h-1.5 w-1.5 rounded-full bg-white/80" />
						</span>

						<div className="flex min-w-0 flex-1 items-center justify-between gap-3 md:flex-none md:items-center md:justify-start">
							<p className="shrink-0 font-condor text-[2.2rem] font-light leading-none tracking-[0.03em] text-white md:text-5xl lg:text-6xl">
								{stat.value}
								{stat.suffix}
							</p>

							<p className="max-w-[145px] text-right font-condor text-[13px] font-light leading-tight tracking-[0.03em] text-white/85 md:max-w-[183px] md:text-left md:text-base lg:text-[17px]">
								{stat.label}
							</p>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}

export default StatGrid;
