function StatGrid({ stats }) {
	return (
		<div className="grid grid-cols-3 gap-5">
			{stats.map((stat) => (
				<article
					key={stat.label}
					data-animate
					className="flex h-[117px] items-center justify-center border border-white/8 bg-[rgba(0,0,0,0.30)] px-[60px] py-[40px]"
				>
					<div className="flex items-center gap-2.5">
						<p className="shrink-0 font-condor text-6xl font-light tracking-[0.03em] text-white">
							{stat.value}
							{stat.suffix}
						</p>

						<p className="max-w-[183px] font-condor text-[17px] font-light leading-tight tracking-[0.03em] text-white">
							{stat.label}
						</p>
					</div>
				</article>
			))}
		</div>
	);
}

export default StatGrid;
