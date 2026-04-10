import { sharedImages } from "../data/siteContent";

function FormField({
	label,
	placeholder,
	className = "",
	as = "input",
	animateDirection = "up",
	animateDelay,
}) {
	const sharedClassName =
		"w-full border-b border-white/20 bg-transparent px-0 py-3 font-copy text-lg text-stone-200 outline-none transition placeholder:text-stone-500 focus:border-white/50";

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
					rows="6"
					className={`${sharedClassName} resize-none border px-4`}
					placeholder={placeholder}
				/>
			) : as === "select" ? (
				<select defaultValue="" className={sharedClassName}>
					<option value="" disabled>
						{placeholder}
					</option>
					<option>United Arab Emirates</option>
					<option>India</option>
					<option>Belgium</option>
					<option>Other</option>
				</select>
			) : (
				<input className={sharedClassName} placeholder={placeholder} />
			)}
		</label>
	);
}

function ContactForm() {
	return (
		<form className="grid gap-6">
			<div className="grid gap-6 md:grid-cols-2">
				<FormField
					label="First Name"
					placeholder="Enter your first name"
					animateDirection="right"
				/>
				<FormField
					label="Last Name"
					placeholder="Enter your last name"
					animateDirection="right"
					animateDelay="0.12"
				/>
			</div>
			<FormField
				label="Location"
				placeholder="Select your country or region"
				as="select"
				animateDirection="right"
				animateDelay="0.2"
			/>
			<FormField
				label="Email"
				placeholder="Enter your email address"
				animateDirection="right"
				animateDelay="0.3"
			/>
			<div className="grid gap-6 md:grid-cols-[120px_1fr]">
				<FormField
					label="Code"
					placeholder="Code"
					as="select"
					animateDirection="right"
					animateDelay="0.4"
				/>
				<FormField
					label="Phone Number"
					placeholder="Enter your phone number"
					animateDirection="right"
					animateDelay="0.48"
				/>
			</div>

			<FormField
				label={
					<>
						Your Message <span className="font-condor-italic">(Optional)</span>
					</>
				}
				placeholder="Enter your Message"
				animateDirection="right"
				animateDelay="0.58"
			/>

			<button
				data-animate
				data-animate-delay="0.56"
				type="submit"
				className="group mt-2 inline-flex w-fit items-center gap-3 border border-white/30 px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-stone-100 transition hover:border-white/60 hover:bg-white/5"
			>
				Submit
				<img
					src={sharedImages.Arrow}
					alt=""
					className="object-cover opacity-95 transition-transform duration-500 ease-out group-hover:translate-x-2"
				/>
			</button>
		</form>
	);
}

export default ContactForm;
