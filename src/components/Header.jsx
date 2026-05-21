import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import BrandLogo from "./BrandLogo";

const navItems = [
	{ label: "Legacy", to: "/legacy" },
	{ label: "Services", to: "/services" },
	{ label: "Exceptional Projects", to: "/our-diamonds" },
	{ label: "Contact", to: "/contact" },
];

function Header({ pathname }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (typeof document === "undefined") return;

		const body = document.body;
		const previousOverflow = body.style.overflow;

		if (isMenuOpen) {
			body.style.overflow = "hidden";
		}

		return () => {
			body.style.overflow = previousOverflow;
		};
	}, [isMenuOpen]);

	return (
		<header className="fixed left-0 right-0 top-0 z-[9999] w-full">
			<div className="h-[100px] w-full border-b border-white/30 bg-[rgba(0,0,0,0.01)] px-5 backdrop-blur-xl md:px-8 lg:px-10 xl:px-14 2xl:px-20">
				<div className="mx-auto flex h-full max-w-[1440px] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
					{/* Mobile button */}
					<button
						type="button"
						onClick={() => setIsMenuOpen((open) => !open)}
						className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-white/60 md:hidden"
						aria-label={
							isMenuOpen ? "Close navigation menu" : "Open navigation menu"
						}
						aria-expanded={isMenuOpen}
					>
						<span className="flex flex-col gap-1.5">
							<span
								className={`h-px w-5 bg-white transition duration-300 ${
									isMenuOpen ? "translate-y-[7px] rotate-45" : ""
								}`}
							/>
							<span
								className={`h-px w-5 bg-white transition duration-300 ${
									isMenuOpen ? "opacity-0" : ""
								}`}
							/>
							<span
								className={`h-px w-5 bg-white transition duration-300 ${
									isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
								}`}
							/>
						</span>
					</button>

					{/* Desktop left nav */}
					<nav
						aria-label="Primary"
						className="hidden flex-wrap items-center justify-end gap-6 pr-10 md:flex lg:gap-10"
					>
						{navItems.slice(0, 2).map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={({ isActive }) =>
									`font-sans text-[13px] uppercase tracking-[0.12em] transition ${
										isActive || pathname === item.to
											? "text-white"
											: "text-[#F8F3F0] hover:text-white/80"
									}`
								}
							>
								{item.label}
							</NavLink>
						))}
					</nav>

					{/* Logo */}
					<NavLink
						to="/"
						className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:justify-self-center"
					>
						<BrandLogo className="block h-[60px] w-[96px] md:h-[68px] md:w-[110px]" />
					</NavLink>

					<div className="h-11 w-11 shrink-0 md:hidden" aria-hidden="true" />

					{/* Desktop right nav */}
					<nav
						aria-label="Secondary"
						className="hidden flex-wrap items-center justify-start gap-6 pl-10 md:flex lg:gap-10"
					>
						{navItems.slice(2).map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={({ isActive }) =>
									`font-sans text-[13px] uppercase tracking-[0.12em] transition ${
										isActive || pathname === item.to
											? "text-white"
											: "text-[#F8F3F0] hover:text-white/80"
									}`
								}
							>
								{item.label}
							</NavLink>
						))}
					</nav>
				</div>
			</div>

			{/* Mobile top dropdown */}
			<div
				className={`fixed left-0 right-0 top-[100px] z-[9998] overflow-hidden border-b border-white/20 bg-[rgba(0,0,0,0.08)] px-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 ease-out md:hidden ${
					isMenuOpen
						? "pointer-events-auto visible max-h-[420px] opacity-100"
						: "pointer-events-none invisible max-h-0 opacity-0"
				}`}
			>
				<nav
					aria-label="Mobile navigation"
					className="mx-auto flex max-w-[1440px] flex-col py-6"
				>
					{navItems.map((item, index) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								`group flex items-center justify-between border-b border-white/10 py-4 text-left transition last:border-b-0 ${
									isActive || pathname === item.to
										? "text-white"
										: "text-[#F8F3F0] hover:text-white"
								}`
							}
						>
							<span className="flex items-center gap-4">
								<span className="font-sans text-[10px] tracking-[0.2em] text-white/45 transition group-hover:text-white/70">
									{String(index + 1).padStart(2, "0")}
								</span>

								<span className="font-sans text-[13px] uppercase tracking-[0.18em]">
									{item.label}
								</span>
							</span>

							<span className="translate-x-0 font-sans text-lg leading-none text-white/45 transition group-hover:translate-x-1 group-hover:text-white">
								→
							</span>
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	);
}

export default Header;
