import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function RevealSection({
	className = "",
	children,
	threshold = 0.2,
	id = "",
	dataSection = "",
}) {
	const ref = useRef(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const node = ref.current;

		if (!node) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setActive(entry.isIntersecting);
			},
			{ threshold, rootMargin: "-8% 0px -8% 0px" },
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, [threshold]);

	useEffect(() => {
		const node = ref.current;

		if (!node) {
			return undefined;
		}

		const ctx = gsap.context(() => {
			const animatedChildren = node.querySelectorAll("[data-animate]");
			const isMobile =
				typeof window !== "undefined" &&
				window.matchMedia("(max-width: 767px)").matches;
			const getHiddenState = (element) => {
				const direction = element.getAttribute("data-animate");

				if (direction === "left") {
					return {
						autoAlpha: 0,
						x: isMobile ? -20 : -56,
						y: 0,
						filter: isMobile ? "none" : "blur(6px)",
					};
				}

				if (direction === "right") {
					return {
						autoAlpha: 0,
						x: isMobile ? 20 : 56,
						y: 0,
						filter: isMobile ? "none" : "blur(6px)",
					};
				}

				return {
					autoAlpha: 0,
					x: 0,
					y: isMobile ? 24 : 52,
					scale: isMobile ? 1 : 0.985,
					filter: isMobile ? "none" : "blur(12px)",
				};
			};

			const getDelay = (element, index) => {
				const rawDelay = Number(element.getAttribute("data-animate-delay"));
				return Number.isFinite(rawDelay) ? rawDelay : index * 0.12;
			};

			gsap.killTweensOf(node);
			gsap.killTweensOf(animatedChildren);

			gsap.set(node, {
				autoAlpha: 1,
			});

			gsap.set(node, {
				clearProps: "transform",
			});

			if (!animatedChildren.length) {
				return;
			}

			if (active) {
				animatedChildren.forEach((element, index) => {
					gsap.fromTo(element, getHiddenState(element), {
						autoAlpha: 1,
						x: 0,
						y: 0,
						scale: 1,
						filter: isMobile ? "none" : "blur(0px)",
						duration: 0.95,
						ease: "power4.out",
						delay: getDelay(element, index),
						overwrite: "auto",
					});
				});
			} else {
				animatedChildren.forEach((element, index) => {
					const hiddenState = getHiddenState(element);

					gsap.to(element, {
						autoAlpha: 0.22,
						x: hiddenState.x * 0.35,
						y: hiddenState.y ? 16 : 0,
						scale: hiddenState.scale ? 0.992 : 1,
						filter: isMobile ? "none" : (hiddenState.filter ?? "blur(0px)"),
						duration: 0.4,
						ease: "power2.out",
						delay: index * 0.03,
						overwrite: "auto",
					});
				});
			}
		}, node);

		return () => ctx.revert();
	}, [active]);

	return (
		<section
			ref={ref}
			id={id}
			data-section={dataSection}
			className={`reveal-section ${active ? "is-active" : ""} ${className}`.trim()}
		>
			{children}
		</section>
	);
}

export default RevealSection;
