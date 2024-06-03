$(document).ready(function () {
	$('.slider').slick({
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		adaptiveHeight: true,
		easing: 'liner',
		infinite: true,
		autoplay: true,
		sautoplaySpeed: 1500,
		/*pauseOnFocus:true,
		pauseOnHover:true,
		pauseOnDotsHover:true,*/
	});
});
