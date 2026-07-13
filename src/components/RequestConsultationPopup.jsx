import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./RequestConsultationPopup.css";

const initialForm = {
	first_name: "",
	last_name: "",
	phone_number: "",
	user_email: "",
	message: "",
	request_type: "Consultation",
};

function RequestConsultationPopup() {
	const formRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		const alreadyShown = sessionStorage.getItem("consultationPopupShown");

		if (!alreadyShown) {
			const timer = setTimeout(() => {
				setIsOpen(true);
				sessionStorage.setItem("consultationPopupShown", "true");
			}, 15000);

			return () => clearTimeout(timer);
		}
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const handleEsc = (e) => {
			if (e.key === "Escape") setIsOpen(false);
		};

		window.addEventListener("keydown", handleEsc);

		return () => {
			document.body.style.overflow = originalOverflow;
			window.removeEventListener("keydown", handleEsc);
		};
	}, [isOpen]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (
			!formData.first_name.trim() ||
			!formData.last_name.trim() ||
			!formData.phone_number.trim() ||
			!formData.user_email.trim()
		) {
			setError("Please fill all required fields.");
			return;
		}

		try {
			setLoading(true);

			await emailjs.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONSULTATION,
				formRef.current,
				{
					publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				},
			);

			setSuccess("Request sent successfully.");
			setFormData(initialForm);

			setTimeout(() => {
				setIsOpen(false);
			}, 1200);
		} catch (err) {
			console.error("EmailJS Error:", err);
			setError("Unable to send request. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className="consultation-popup-overlay"
			onClick={(e) => {
				if (e.target === e.currentTarget) setIsOpen(false);
			}}
		>
			<div className="consultation-popup">
				<button
					type="button"
					className="consultation-popup-close"
					onClick={() => setIsOpen(false)}
					aria-label="Close popup"
				>
					×
				</button>

				<div className="consultation-popup-header">
					<h2>Request For Consultation</h2>
					<p>Fill in your details and we’ll contact you shortly.</p>
				</div>

				<form ref={formRef} onSubmit={handleSubmit}>
					<input
						type="hidden"
						name="form_title"
						value="Request For Consultation"
					/>

					<div className="consultation-form-grid">
						<div className="consultation-form-group">
							<label htmlFor="first_name">
								First Name <span>*</span>
							</label>
							<input
								id="first_name"
								type="text"
								name="first_name"
								value={formData.first_name}
								onChange={handleChange}
								placeholder="First name"
								required
							/>
						</div>

						<div className="consultation-form-group">
							<label htmlFor="last_name">
								Last Name <span>*</span>
							</label>
							<input
								id="last_name"
								type="text"
								name="last_name"
								value={formData.last_name}
								onChange={handleChange}
								placeholder="Last name"
								required
							/>
						</div>
					</div>

					<div className="consultation-form-grid">
						<div className="consultation-form-group">
							<label htmlFor="phone_number">
								Phone Number <span>*</span>
							</label>
							<input
								id="phone_number"
								type="tel"
								name="phone_number"
								value={formData.phone_number}
								onChange={handleChange}
								placeholder="Phone number"
								required
							/>
						</div>

						<div className="consultation-form-group">
							<label htmlFor="user_email">
								Email <span>*</span>
							</label>
							<input
								id="user_email"
								type="email"
								name="user_email"
								value={formData.user_email}
								onChange={handleChange}
								placeholder="Email address"
								required
							/>
						</div>
					</div>

					<div className="consultation-form-group">
						<label htmlFor="message">Message</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							placeholder="Your message"
							rows="3"
						/>
					</div>

					<div className="consultation-radio-section">
						<span className="consultation-radio-title">Interested in</span>

						<div className="consultation-radio-group">
							<label>
								<input
									type="radio"
									name="request_type"
									value="Consultation"
									checked={formData.request_type === "Consultation"}
									onChange={handleChange}
								/>
								Consultation
							</label>

							<label>
								<input
									type="radio"
									name="request_type"
									value="Viewing"
									checked={formData.request_type === "Viewing"}
									onChange={handleChange}
								/>
								Viewing
							</label>
						</div>
					</div>

					{error && <p className="consultation-error">{error}</p>}
					{success && <p className="consultation-success">{success}</p>}

					<button
						type="submit"
						className="consultation-submit-btn"
						disabled={loading}
					>
						{loading ? "Sending..." : "Submit Request"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default RequestConsultationPopup;
