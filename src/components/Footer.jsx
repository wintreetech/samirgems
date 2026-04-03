import { NavLink } from "react-router-dom";

import BrandLogo from "./BrandLogo";

const quickLinks = [
	{ label: "Legacy", to: "/legacy" },
	{ label: "Services", to: "/services" },
	{ label: "Our Diamonds", to: "/our-diamonds" },
	{ label: "Contact", to: "/contact" },
];

export default function Footer() {
	return (
		<footer
			id="site-footer"
			className="relative overflow-hidden bg-[#272727] text-white"
		>
			{/* Background image */}
			<img
				src="/Image8.png"
				alt=""
				className="pointer-events-none absolute inset-x-0 top-[-70px] h-[540px] w-full object-cover opacity-40"
			/>

			<div className="relative mx-auto max-w-[1440px] px-6 pt-12 lg:px-16 lg:pt-14">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
					{/* Contact */}
					<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
						<h3 className="font-condor text-[17px] font-medium tracking-[0.03em] text-white">
							Contact
						</h3>

						<div className="mt-4 h-px w-[50px] bg-white" />

						<div className="mt-8 space-y-6 font-condor text-[17px] font-light tracking-[0.03em] text-white/95">
							<div>
								<p>+97144390374</p>
								<p>dubai@samirgems.com</p>
							</div>

							<div className="max-w-[210px] leading-[1.9]">
								<p>14 A, Almas Tower, Level 14,</p>
								<p>Jumeriah Lake Towers,</p>
								<p>Dubai, UAE</p>
							</div>
						</div>
					</div>

					{/* Center logo + socials */}
					<div className="flex flex-col items-center justify-center">
						<BrandLogo className="h-[140px] w-[226px]" />

						<div className="mt-10 flex items-center gap-8 text-[#C5C6C8]">
							<a
								href="#"
								className="transition hover:text-white"
								aria-label="Instagram"
							>
								<svg
									width="25"
									height="25"
									viewBox="0 0 25 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="h-[25px] w-[25px]"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M22.9021 22.9019C23.529 22.2731 24.0212 21.5173 24.3424 20.6885C24.65 19.8923 24.8615 18.9846 24.9231 17.6538C24.9846 16.3212 25 15.8942 25 12.5C25 9.10577 24.9846 8.67885 24.9231 7.34615C24.8615 6.01538 24.65 5.10769 24.3424 4.31154C24.0284 3.47758 23.5362 2.72219 22.9002 2.09808C22.276 1.46211 21.5207 0.969908 20.6869 0.655769C19.8908 0.348077 18.9832 0.136539 17.6525 0.0750001C16.3199 0.0134616 15.893 0 12.499 0C9.10507 0 8.67818 0.0134615 7.34559 0.076923C6.01492 0.134615 5.1073 0.346154 4.31121 0.655769C3.47773 0.970625 2.72257 1.46273 2.09792 2.09808C1.46262 2.72278 0.97055 3.478 0.655719 4.31154C0.34805 5.10769 0.136528 6.01538 0.0749943 7.34615C0.0134606 8.67885 0 9.10577 0 12.5C0 15.8942 0.0134604 16.3212 0.0769171 17.6538C0.134605 18.9846 0.346127 19.8923 0.655719 20.6885C0.971079 21.5231 1.46335 22.2769 2.09792 22.9019C2.72287 23.5365 3.47858 24.0288 4.31121 24.3442C5.1073 24.6519 6.01492 24.8635 7.34559 24.925C8.67818 24.9846 9.10507 25 12.499 25C15.893 25 16.3199 24.9846 17.6525 24.9231C18.9832 24.8654 19.8908 24.6538 20.6869 24.3442C21.517 24.0229 22.2728 23.5316 22.9021 22.9019ZM1.92293 11.0288V13.9712C1.91908 15.55 1.91908 15.9596 1.96139 16.8558C2.01138 17.9827 2.07292 18.8096 2.26136 19.4327C2.44212 20.0327 2.64403 20.6442 3.30552 21.3788C3.967 22.1154 4.60349 22.4481 5.41497 22.6942C6.22837 22.9385 7.24944 22.9904 8.13591 23.0308C9.13968 23.0769 9.53965 23.0769 11.6472 23.0769H13.922C15.5411 23.0788 15.9488 23.0808 16.8564 23.0385C17.9813 22.9865 18.8082 22.925 19.4331 22.7385C20.0312 22.5577 20.6426 22.3538 21.3772 21.6942C22.1137 21.0327 22.4463 20.3942 22.6925 19.5827C22.9367 18.7712 22.9905 17.75 23.0309 16.8635C23.0751 15.8596 23.0751 15.4615 23.0751 13.3596V11.6481C23.0751 9.54038 23.0751 9.14231 23.0309 8.13654C22.9905 7.25 22.9367 6.22885 22.6925 5.41731C22.4483 4.60385 22.1156 3.96731 21.3772 3.30577C20.6407 2.64423 20.0312 2.44231 19.4331 2.26154C18.8082 2.075 17.9813 2.01154 16.8564 1.96154C15.8788 1.92136 14.9003 1.90854 13.922 1.92308H11.6472C9.53965 1.92308 9.13968 1.92308 8.13591 1.96731C7.24944 2.00769 6.22837 2.06154 5.41497 2.30577C4.60349 2.55192 3.967 2.88462 3.30552 3.62115C2.64403 4.35769 2.4402 4.96731 2.26136 5.56731C2.07292 6.19038 2.01138 7.01731 1.96139 8.14423C1.91908 9.04038 1.91908 9.45 1.92293 11.0288ZM12.499 8.17308C11.3516 8.17308 10.2511 8.62895 9.43968 9.4404C8.62828 10.2519 8.17245 11.3524 8.17245 12.5C8.17245 13.6476 8.62828 14.7481 9.43968 15.5596C10.2511 16.3711 11.3516 16.8269 12.499 16.8269C13.6465 16.8269 14.747 16.3711 15.5584 15.5596C16.3698 14.7481 16.8256 13.6476 16.8256 12.5C16.8256 11.3524 16.3698 10.2519 15.5584 9.4404C14.747 8.62895 13.6465 8.17308 12.499 8.17308ZM6.24952 12.5C6.24952 10.8424 6.90795 9.25268 8.07996 8.08058C9.25197 6.90848 10.8416 6.25 12.499 6.25C14.1565 6.25 15.7461 6.90848 16.9181 8.08058C18.0901 9.25268 18.7486 10.8424 18.7486 12.5C18.7486 14.1576 18.0901 15.7473 16.9181 16.9194C15.7461 18.0915 14.1565 18.75 12.499 18.75C10.8416 18.75 9.25197 18.0915 8.07996 16.9194C6.90795 15.7473 6.24952 14.1576 6.24952 12.5ZM19.1716 7.26923C19.5541 7.26923 19.9209 7.11727 20.1914 6.84679C20.4619 6.5763 20.6138 6.20945 20.6138 5.82692C20.6138 5.4444 20.4619 5.07754 20.1914 4.80706C19.9209 4.53657 19.5541 4.38462 19.1716 4.38462C18.7891 4.38462 18.4223 4.53657 18.1518 4.80706C17.8813 5.07754 17.7294 5.4444 17.7294 5.82692C17.7294 6.20945 17.8813 6.5763 18.1518 6.84679C18.4223 7.11727 18.7891 7.26923 19.1716 7.26923Z"
										fill="currentColor"
									/>
								</svg>
							</a>

							<a
								href="#"
								className="transition hover:text-white"
								aria-label="Facebook"
							>
								<svg
									width="13"
									height="25"
									viewBox="0 0 13 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="h-[25px] w-[13px]"
								>
									<path
										d="M8.66667 14.375H11.7619L13 9.375H8.66667V6.875C8.66667 5.5875 8.66667 4.375 11.1429 4.375H13V0.175C12.5964 0.12125 11.0723 0 9.46276 0C6.10133 0 3.71429 2.07125 3.71429 5.875V9.375H0V14.375H3.71429V25H8.66667V14.375Z"
										fill="currentColor"
									/>
								</svg>
							</a>

							<a
								href="#"
								className="transition hover:text-white"
								aria-label="X"
							>
								<svg
									width="25"
									height="23"
									viewBox="0 0 25 23"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="h-[23px] w-[25px]"
								>
									<path
										d="M19.6875 0H23.5214L15.1464 9.59643L25 22.6571H17.2857L11.2393 14.7375L4.32857 22.6571H0.491071L9.44821 12.3893L0 0.00178569H7.91071L13.3679 7.23929L19.6875 0ZM18.3393 20.3571H20.4643L6.75 2.18036H4.47143L18.3393 20.3571Z"
										fill="currentColor"
									/>
								</svg>
							</a>

							<a
								href="#"
								className="transition hover:text-white"
								aria-label="LinkedIn"
							>
								<svg
									width="26"
									height="25"
									viewBox="0 0 26 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="h-[25px] w-[26px]"
								>
									<path
										d="M5.45645 2.77901C5.45609 3.51568 5.16831 4.22204 4.65641 4.74268C4.14451 5.26333 3.45043 5.55562 2.72686 5.55525C2.00329 5.55488 1.3095 5.26188 0.798115 4.74072C0.286729 4.21955 -0.000361444 3.51291 3.41521e-07 2.77624C0.000362127 2.03956 0.288146 1.33321 0.800044 0.812565C1.31194 0.29192 2.00602 -0.000367988 2.72959 3.47705e-07C3.45316 0.000368683 4.14695 0.293363 4.65834 0.814529C5.16973 1.3357 5.45682 2.04234 5.45645 2.77901ZM5.5383 7.61208H0.0818471V25H5.5383V7.61208ZM14.1595 7.61208H8.73033V25H14.1049V15.8755C14.1049 10.7925 20.6118 10.3203 20.6118 15.8755V25H26V13.9867C26 5.41776 16.3694 5.73718 14.1049 9.94528L14.1595 7.61208Z"
										fill="currentColor"
									/>
								</svg>
							</a>
						</div>
					</div>

					{/* Quick links */}
					<div className="flex flex-col items-center text-center lg:items-end lg:text-right">
						<h3 className="font-condor text-[17px] font-medium tracking-[0.03em] text-white">
							Quick Links
						</h3>

						<div className="mt-4 h-px w-[50px] bg-white" />

						<div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-3 font-condor text-[17px] font-light tracking-[0.03em] text-white/95 lg:text-right">
							<div className="flex flex-col gap-3">
								{quickLinks.map((item) => (
									<NavLink
										key={item.to}
										to={item.to}
										className="transition hover:text-white/70"
									>
										{item.label}
									</NavLink>
								))}
							</div>

							<div className="flex flex-col gap-3">
								<a href="/terms" className="transition hover:text-white/70">
									Terms & Conditions
								</a>
								<a href="/privacy" className="transition hover:text-white/70">
									Privacy Policy
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="relative mt-14 border-t border-white/10 bg-[#0D0D0D] py-4">
				<p className="text-center font-condor text-base font-light tracking-[0.03em] text-white">
					© 2025 Sameer Gems DMCC. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
