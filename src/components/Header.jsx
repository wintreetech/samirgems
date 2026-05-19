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
		if (typeof document === "undefined") {
			return undefined;
		}

		const { body } = document;
		const previousOverflow = body.style.overflow;

		if (isMenuOpen) {
			body.style.overflow = "hidden";
		}

		return () => {
			body.style.overflow = previousOverflow;
		};
	}, [isMenuOpen]);

	return (
		<header className="fixed-ui-layer fixed inset-x-0 top-0 z-50">
			<div className="border-b border-white/20 bg-[rgba(5,5,5,0.72)] px-4 supports-[backdrop-filter]:bg-[rgba(5,5,5,0.56)] supports-[backdrop-filter]:backdrop-blur-md md:px-8 lg:px-10 xl:px-14 2xl:px-20">
				<div className="mx-auto grid h-[82px] max-w-[1440px] grid-cols-[44px_1fr_44px] items-center gap-4 lg:h-[100px] lg:grid-cols-[1fr_auto_1fr]">
					<nav
						aria-label="Primary"
						className="hidden items-center justify-end gap-8 pr-10 lg:flex xl:gap-10"
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

					<button
						type="button"
						onClick={() => setIsMenuOpen((open) => !open)}
						className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/50 lg:hidden"
						aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
						aria-expanded={isMenuOpen}
					>
						<span className="flex flex-col gap-1.5">
							<span
								className={`h-px w-5 bg-white transition ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
							/>
							<span
								className={`h-px w-5 bg-white transition ${isMenuOpen ? "opacity-0" : ""}`}
							/>
							<span
								className={`h-px w-5 bg-white transition ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
							/>
						</span>
					</button>

					<NavLink to="/" className="justify-self-center lg:justify-self-center">
						<BrandLogo className="h-[52px] w-[84px] md:h-[60px] md:w-[96px] lg:h-[68px] lg:w-[110px]" />
					</NavLink>

					<div className="h-11 w-11 lg:hidden" aria-hidden="true" />

					<nav
						aria-label="Secondary"
						className="hidden items-center justify-start pl-10 lg:flex xl:gap-10"
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

			<div
				className={`fixed-ui-layer border-b border-white/10 bg-[rgba(5,5,5,0.94)] px-4 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] supports-[backdrop-filter]:bg-[rgba(5,5,5,0.82)] supports-[backdrop-filter]:backdrop-blur-md transition duration-300 lg:hidden ${
					isMenuOpen
						? "pointer-events-auto visible opacity-100"
						: "pointer-events-none invisible opacity-0"
				}`}
			>
				<nav
					aria-label="Mobile navigation"
					className="mx-auto flex max-h-[calc(100svh-82px)] max-w-[1440px] flex-col gap-2 overflow-y-auto pb-2"
				>
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								`rounded-full border px-4 py-3 font-sans text-[11px] uppercase tracking-[0.18em] transition ${
									isActive || pathname === item.to
										? "border-white/40 bg-white/10 text-white"
										: "border-white/10 text-stone-200 hover:border-white/30 hover:text-white"
								}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	);
}

export default Header;
