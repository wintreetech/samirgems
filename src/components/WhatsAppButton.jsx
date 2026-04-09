import { sharedImages } from "../data/siteContent";

export default function WhatsAppButton() {
	const phoneNumber = "97144390374"; // without +
	const message = "Hello, I’d like to enquire about your services";

	const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
		message,
	)}`;

	return (
		<a
			href={whatsappLink}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-110"
		>
			<img src={sharedImages.whatsappicon} className="text-white text-2xl" />
		</a>
	);
}
