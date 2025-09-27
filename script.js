document.addEventListener("DOMContentLoaded", function () {
	const loader = document.getElementById("loader-overlay");
	const percentEl = document.getElementById("loader-percentage");
	const captionEl = document.getElementById("loader-caption");
	const bar = document.getElementById("loader-bar");
	const captions = [
		"Fueling your creativity...",
		"Warming up the code engines...",
		"Almost ready to innovate!",
	];

	let captionIdx = 0;
	captionEl.textContent = captions[captionIdx];

	const captionInterval = setInterval(() => {
		captionIdx++;
		if (captionIdx < captions.length) {
			captionEl.textContent = captions[captionIdx];
		}
	}, 1000);

	const totalDuration = 3000;
	let startTime = null;

	function animateBar(timestamp) {
		if (!startTime) startTime = timestamp;
		const elapsed = timestamp - startTime;
		let percent = Math.min((elapsed / totalDuration) * 100, 100);

		percentEl.textContent = Math.floor(percent) + "%";
		bar.style.width = percent + "%";

		if (elapsed < totalDuration) {
			requestAnimationFrame(animateBar);
		} else {
			clearInterval(captionInterval);
			percentEl.textContent = "100%";
			bar.style.width = "100%";

			loader.style.opacity = "0";
			setTimeout(() => {
				loader.style.display = "none";
			}, 500);
		}
	}

	requestAnimationFrame(animateBar);

	const registerBtn = document.getElementById("registerBtn");
	const registerModal = document.getElementById("registerModal");
	const closeModalBtn = document.getElementById("closeModalBtn");
	const openAppBtn = document.getElementById("openAppBtn");
	const installAppBtn = document.getElementById("installAppBtn");

	registerBtn.onclick = () => {
		registerModal.style.display = "flex";
	};
	closeModalBtn.onclick = () => {
		registerModal.style.display = "none";
	};
	window.onclick = (e) => {
		if (e.target === registerModal) registerModal.style.display = "none";
	};
	openAppBtn.onclick = (e) => {
		e.preventDefault();
		window.location.href =
			"https://play.google.com/store/apps/details?id=com.hoomans.tinkerhub";
	};
	installAppBtn.onclick = (e) => {
		e.preventDefault();
		window.open(
			"https://play.google.com/store/apps/details?id=com.hoomans.tinkerhub",
			"_blank"
		);
	};

	const navLinks = document.querySelectorAll(".nav-links a");
	const sections = {
		overview: document.getElementById("overview"),
		timeline: document.getElementById("timeline"),
		registration: document.getElementById("registration"),
		sponsors: document.getElementById("sponsors"),
		contact: document.getElementById("contact"),
		appinfo: document.getElementById("app-info"),
		footer: document.querySelector("footer.container"),
	};

	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			navLinks.forEach((l) => l.classList.remove("active"));
			this.classList.add("active");
			Object.values(sections).forEach((sec) => {
				if (sec) sec.style.display = "none";
			});
			const sectionKey = this.getAttribute("data-section");
			if (sectionKey && sections[sectionKey]) {
				sections[sectionKey].style.display = "";
			}
			if (sections.footer) sections.footer.style.display = "";
		});
	});

	Object.values(sections).forEach((sec) => {
		if (sec) sec.style.display = "none";
	});
	if (sections.overview) sections.overview.style.display = "";
	if (sections.footer) sections.footer.style.display = "";
});
