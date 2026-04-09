import { Outlet, useLocation } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

function SiteShell() {
	const location = useLocation();
	const isHome = location.pathname === "/";

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,#040404_0%,#0a0a0a_28%,#101010_64%,#060606_100%)] text-stone-100">
			<Header pathname={location.pathname} />
			<main className="pt-25">
				<Outlet />
			</main>
			{!isHome ? <Footer /> : null}
		</div>
	);
}

export default SiteShell;
