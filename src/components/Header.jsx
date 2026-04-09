import { NavLink } from "react-router-dom";

import BrandLogo from "./BrandLogo";

const navItems = [
	{ label: "Legacy", to: "/legacy" },
	{ label: "Services", to: "/services" },
	{ label: "Exceptional Projects", to: "/our-diamonds" },
	{ label: "Contact", to: "/contact" },
];

function Header({ pathname }) {
	return (
		<header className="fixed inset-x-0 z-50 ">
			<div className="h-[100px] w-full border-b border-white/30 bg-[rgba(0,0,0,0.01)] px-5 backdrop-blur-[3.2px] md:px-8 lg:px-10 xl:px-14 2xl:px-20">
				<div className="grid h-full grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
					<nav
						aria-label="Primary"
						className="flex flex-wrap items-center justify-center gap-6 md:justify-end md:pr-10 lg:gap-10"
					>
						{navItems.slice(0, 2).map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={({ isActive }) =>
									`font-sans text-[10px] uppercase tracking-[0.12em] transition md:text-[13px] ${
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

					<NavLink to="/" className="justify-self-center">
						<BrandLogo className="h-[60px] w-[96px] md:h-[68px] md:w-[110px]" />
					</NavLink>

					<nav
						aria-label="Secondary"
						className="flex flex-wrap items-center justify-center gap-6 md:justify-start md:pl-10 lg:gap-10"
					>
						{navItems.slice(2).map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={({ isActive }) =>
									`font-sans text-[10px] uppercase tracking-[0.12em] transition md:text-[13px] ${
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
		</header>
	);
}

export default Header;
