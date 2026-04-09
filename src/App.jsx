import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import SiteShell from "./components/SiteShell";
import ContactPage from "./pages/ContactPage";
import DiamondsPage from "./pages/DiamondsPage";
import HomePage from "./pages/HomePage";
import LegacyPage from "./pages/LegacyPage";
import ServicesPage from "./pages/ServicesPage";
import WhatsAppButton from "./components/WhatsAppButton";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, [pathname]);

	return null;
}

function App() {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route element={<SiteShell />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/legacy" element={<LegacyPage />} />
					<Route path="/services" element={<ServicesPage />} />
					<Route path="/our-diamonds" element={<DiamondsPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
			<WhatsAppButton />
		</>
	);
}

export default App;
