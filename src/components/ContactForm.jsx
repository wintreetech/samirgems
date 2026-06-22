import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { sharedImages } from "../data/siteContent";

const locations = [
	"United Arab Emirates",
	"India",
	"Belgium",
	"United States",
	"United Kingdom",
	"Hong Kong",
	"China",
	"Israel",
	"Thailand",
	"Singapore",
	"South Africa",
	"Australia",
	"Canada",
	"Germany",
	"France",
	"Italy",
	"Spain",
	"Netherlands",
	"Switzerland",
	"Sweden",
	"Norway",
	"Denmark",
	"Finland",
	"Austria",
	"Ireland",
	"Portugal",
	"Turkey",
	"Saudi Arabia",
	"Qatar",
	"Kuwait",
	"Bahrain",
	"Oman",
	"Egypt",
	"Morocco",
	"Kenya",
	"Nigeria",
	"Japan",
	"South Korea",
	"Malaysia",
	"Indonesia",
	"Vietnam",
	"Philippines",
	"Taiwan",
	"Sri Lanka",
	"Nepal",
	"Pakistan",
	"Bangladesh",
	"Brazil",
	"Mexico",
	"Argentina",
	"New Zealand",
	"Other",
];

const phoneCodes = [
	{ code: "+971", country: "UAE" },
	{ code: "+91", country: "India" },
	{ code: "+32", country: "Belgium" },
	{ code: "+1", country: "USA / Canada" },
	{ code: "+44", country: "UK" },
	{ code: "+852", country: "Hong Kong" },
	{ code: "+86", country: "China" },
	{ code: "+972", country: "Israel" },
	{ code: "+66", country: "Thailand" },
	{ code: "+65", country: "Singapore" },
	{ code: "+27", country: "South Africa" },
	{ code: "+61", country: "Australia" },
	{ code: "+49", country: "Germany" },
	{ code: "+33", country: "France" },
	{ code: "+39", country: "Italy" },
	{ code: "+34", country: "Spain" },
	{ code: "+31", country: "Netherlands" },
	{ code: "+41", country: "Switzerland" },
	{ code: "+46", country: "Sweden" },
	{ code: "+47", country: "Norway" },
	{ code: "+45", country: "Denmark" },
	{ code: "+358", country: "Finland" },
	{ code: "+43", country: "Austria" },
	{ code: "+353", country: "Ireland" },
	{ code: "+351", country: "Portugal" },
	{ code: "+90", country: "Turkey" },
	{ code: "+966", country: "Saudi Arabia" },
	{ code: "+974", country: "Qatar" },
	{ code: "+965", country: "Kuwait" },
	{ code: "+973", country: "Bahrain" },
	{ code: "+968", country: "Oman" },
	{ code: "+20", country: "Egypt" },
	{ code: "+212", country: "Morocco" },
	{ code: "+254", country: "Kenya" },
	{ code: "+234", country: "Nigeria" },
	{ code: "+81", country: "Japan" },
	{ code: "+82", country: "South Korea" },
	{ code: "+60", country: "Malaysia" },
	{ code: "+62", country: "Indonesia" },
	{ code: "+84", country: "Vietnam" },
	{ code: "+63", country: "Philippines" },
	{ code: "+886", country: "Taiwan" },
	{ code: "+94", country: "Sri Lanka" },
	{ code: "+977", country: "Nepal" },
	{ code: "+92", country: "Pakistan" },
	{ code: "+880", country: "Bangladesh" },
	{ code: "+55", country: "Brazil" },
	{ code: "+52", country: "Mexico" },
	{ code: "+54", country: "Argentina" },
	{ code: "+64", country: "New Zealand" },
];

function FormField({
	label,
	name,
	type = "text",
	placeholder,
	className = "",
	as = "input",
	animateDirection = "up",
	animateDelay,
	required = false,
	children,
}) {
	const sharedClassName =
		"w-full border-b border-white/20 bg-transparent px-0 py-3 font-copy text-base text-stone-200 outline-none transition placeholder:text-stone-500 focus:border-white/50 md:text-lg";

	return (
		<label
			data-animate={animateDirection}
			data-animate-delay={animateDelay}
			className={`block ${className}`.trim()}
		>
			<span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-stone-300">
				{label}
			</span>

			{as === "textarea" ? (
				<textarea
					name={name}
					rows="6"
					required={required}
					className={`${sharedClassName} resize-none border px-4`}
					placeholder={placeholder}
				/>
			) : as === "select" ? (
				<select
					name={name}
					defaultValue=""
					required={required}
					className={sharedClassName}
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{children}
				</select>
			) : (
				<input
					name={name}
					type={type}
					required={required}
					className={sharedClassName}
					placeholder={placeholder}
				/>
			)}
		</label>
	);
}

function ContactForm() {
	const formRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setStatus("");

		try {
			await emailjs.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				formRef.current,
				{
					publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				},
			);

			setStatus("Message sent successfully.");
			formRef.current.reset();
		} catch (error) {
			console.error(error);
			setStatus("Failed to send message. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="grid gap-6">
			<div className="grid gap-6 md:grid-cols-2">
				<FormField
					label="First Name"
					name="first_name"
					placeholder="Enter your first name"
					animateDirection="right"
					required
				/>

				<FormField
					label="Last Name"
					name="last_name"
					placeholder="Enter your last name"
					animateDirection="right"
					animateDelay="0.12"
					required
				/>
			</div>

			<FormField
				label="Location"
				name="location"
				placeholder="Select your country or region"
				as="select"
				animateDirection="right"
				animateDelay="0.2"
				required
			>
				{locations.map((location) => (
					<option
						key={location}
						value={location}
						className="bg-white text-black"
					>
						{location}
					</option>
				))}
			</FormField>

			<FormField
				label="Email"
				name="user_email"
				type="email"
				placeholder="Enter your email address"
				animateDirection="right"
				animateDelay="0.3"
				required
			/>

			<div className="grid gap-6 md:grid-cols-[120px_1fr]">
				<FormField
					label="Code"
					name="phone_code"
					placeholder="Code"
					as="select"
					animateDirection="right"
					animateDelay="0.4"
					required
				>
					{phoneCodes.map(({ code, country }) => (
						<option
							key={`${code}-${country}`}
							value={code}
							className="bg-white text-black"
						>
							{code} {country}
						</option>
					))}
				</FormField>

				<FormField
					label="Phone Number"
					name="phone_number"
					type="tel"
					placeholder="Enter your phone number"
					animateDirection="right"
					animateDelay="0.48"
					required
				/>
			</div>

			<FormField
				label={
					<>
						Your Message <span className="font-condor-italic">(Optional)</span>
					</>
				}
				name="message"
				placeholder="Enter your Message"
				as="textarea"
				animateDirection="right"
				animateDelay="0.58"
			/>

			<input type="hidden" name="to_email" value="sales@samirgemsfzco.com" />

			<button
				data-animate
				data-animate-delay="0.56"
				type="submit"
				disabled={loading}
				className="group mt-2 inline-flex w-full items-center justify-center gap-3 border border-white/30 px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-stone-100 transition hover:border-white/60 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
			>
				{loading ? "Sending..." : "Submit"}
				<img
					src={sharedImages.Arrow}
					alt=""
					className="object-cover opacity-95 transition-transform duration-500 ease-out group-hover:translate-x-2"
				/>
			</button>

			{status && (
				<p className="font-copy text-sm text-stone-300 md:text-base">
					{status}
				</p>
			)}
		</form>
	);
}

export default ContactForm;
