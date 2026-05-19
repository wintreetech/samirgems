import { sharedImages } from "../data/siteContent";

export default function WhatsAppButton() {
	const phoneNumber = "97144390374";
	const message = "Hello, I'd like to enquire about your services";
	const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
		message,
	)}`;

	return (
		<a
			href={whatsappLink}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed-ui-layer fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:scale-110 md:bottom-6 md:right-6 md:h-14 md:w-14"
		>
			<img
				src={sharedImages.whatsappicon}
				alt="WhatsApp"
				className="stable-paint h-full w-full"
			/>
		</a>
	);
}
