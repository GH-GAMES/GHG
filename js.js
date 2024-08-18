const ToTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
	if (window.pageYOffset > 100) {
		ToTop.classList.add("active");
	} else {
		ToTop.classList.remove("active");
	}
})