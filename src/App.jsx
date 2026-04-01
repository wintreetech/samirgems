import { Navigate, Route, Routes } from "react-router-dom";

import SiteShell from "./components/SiteShell";
import ContactPage from "./pages/ContactPage";
import DiamondsPage from "./pages/DiamondsPage";
import HomePage from "./pages/HomePage";
import LegacyPage from "./pages/LegacyPage";
import ServicesPage from "./pages/ServicesPage";

function App() {
	return (
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
	);
}

export default App;
