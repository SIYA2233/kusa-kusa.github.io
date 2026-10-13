const amountInput = document.querySelector("#loan-amount");
const termInput = document.querySelector("#loan-term");
const rateInput = document.querySelector("#interest-rate");
const amountOutput = document.querySelector("#loan-amount-value");
const termOutput = document.querySelector("#loan-term-value");
const rateOutput = document.querySelector("#interest-rate-value");
const paymentOutput = document.querySelector("#monthly-payment");

const randFormatter = new Intl.NumberFormat("en-ZA", {
	style: "currency",
	currency: "ZAR",
	maximumFractionDigits: 0,
});

const paymentFormatter = new Intl.NumberFormat("en-ZA", {
	style: "currency",
	currency: "ZAR",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

function updateCalculator() {
	const principal = Number(amountInput.value);
	const months = Number(termInput.value);
	const monthlyRate = Number(rateInput.value) / 100 / 12;
	const payment = monthlyRate === 0
		? principal / months
		: principal * monthlyRate / (1 - (1 + monthlyRate) ** -months);

	amountOutput.textContent = randFormatter.format(principal);
	termOutput.textContent = `${months} months`;
	rateOutput.textContent = `${Number(rateInput.value)}%`;
	paymentOutput.textContent = paymentFormatter.format(payment);

	for (const input of [amountInput, termInput, rateInput]) {
		const progress = (input.valueAsNumber - Number(input.min)) /
			(Number(input.max) - Number(input.min)) * 100;
		input.style.setProperty("--range-progress", `${progress}%`);
	}
}

for (const input of [amountInput, termInput, rateInput]) {
	input.addEventListener("input", updateCalculator);
}

updateCalculator();

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
	const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isExpanded));
	menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
	primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
	if (event.target.closest("a")) {
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "Open navigation");
		primaryNav.classList.remove("is-open");
	}
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const contactForm = document.querySelector("#contact-form");
const enquiryAddress = "siyabonganxumalo420@gmail.com";

contactForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const formData = new FormData(contactForm);
	const subject = `Kusa Kusa enquiry: ${formData.get("interest")}`;
	const body = [
		"Hello Kusa Kusa,",
		"",
		`Name: ${formData.get("name")}`,
		`Email: ${formData.get("email")}`,
		`Phone: ${formData.get("phone") || "Not provided"}`,
		`Enquiry: ${formData.get("interest")}`,
		`Message: ${formData.get("message") || "Not provided"}`,
	].join("\n");
	const formStatus = document.querySelector("#form-status");
	formStatus.textContent = `Your email app should open with a draft addressed to ${enquiryAddress}. Review and send it; if no email app opens, use the direct email link above.`;
	formStatus.hidden = false;
	window.location.href = `mailto:${enquiryAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
