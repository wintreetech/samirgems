function FormField({ label, placeholder, className = "", as = "input" }) {
	const sharedClassName =
		"w-full border-b border-white/20 bg-transparent px-0 py-3 font-copy text-lg text-stone-200 outline-none transition placeholder:text-stone-500 focus:border-white/50";

	return (
		<label className={`block ${className}`.trim()}>
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
				<FormField label="First Name" placeholder="Enter your first name" />
				<FormField label="Last Name" placeholder="Enter your last name" />
			</div>
			<FormField
				label="Location"
				placeholder="Select your country or region"
				as="select"
			/>
			<FormField label="Email" placeholder="Enter your email address" />
			<div className="grid gap-6 md:grid-cols-[120px_1fr]">
				<FormField label="Code" placeholder="Code" as="select" />
				<FormField label="Phone Number" placeholder="Enter your phone number" />
			</div>
			<FormField
				label="Reason for Contacting"
				placeholder="Select a reason"
				as="select"
			/>
			<FormField label="Your Message" placeholder="" as="textarea" />

			<button
				type="submit"
				className="mt-2 inline-flex w-fit items-center gap-3 border border-white/30 px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-stone-100 transition hover:border-white/60 hover:bg-white/5"
			>
				Submit
				<span aria-hidden="true">→</span>
			</button>
		</form>
	);
}

export default ContactForm;
