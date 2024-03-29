

function onElementHeightChange(elm, callback) {
	var lastHeight = elm.clientHeight
	var newHeight;

	(function run() {
		newHeight = elm.clientHeight;
		if (lastHeight !== newHeight) callback();
		lastHeight = newHeight;

		if (elm.onElementHeightChangeTimer) {
			clearTimeout(elm.onElementHeightChangeTimer);
		}

		elm.onElementHeightChangeTimer = setTimeout(run, 200);
	})();
}

$(document).ready(function() {
	AOS.init({
		once: true
	});


	onElementHeightChange(document.body, function(){
		AOS.refresh();
	});

	$('.werk-section').filter(function() {
		return $.trim($(this).text()) === ''
	}).hide()


	$(".hamburger").click(function() {
		$("#navbarNavDropdown").toggleClass("show");
		$("#wrapper-navbar").addClass("sticky");
		$('body').toggleClass("no-scroll");
		$("html").toggleClass("no-scroll");
		$(".footer").toggleClass("fadeout");
		$(".hamburger--spring").toggleClass("is-active");
		

	});

	$(".floortab").click(function() {
		$(".floortab").addClass("active");
		$(".floor_content").addClass("active");
		$('.plattegrondtab').removeClass("active");
		$(".plattegrond_content").removeClass("active");
		$(".huurderstab").removeClass("active");
	});

	$(".plattegrondtab").click(function() {
		$(".plattegrondtab").addClass("active");
		$(".plattegrond_content").addClass("active");
		$('.floortab').removeClass("active");
		$('.floor_content').removeClass("active");		
		$(".huurderstab").removeClass("active");
		$('.plattegrond_slider').slick('refresh');
		
		
	});
	$(".huurderstab").click(function() {
		$(".huurderstab").addClass("active");
		$('.plattegrondtab').removeClass("active");
		$(".floortab").removeClass("active");
	});

	$(".sound-off").click(function() {
		$("video").prop('muted', false);
		$(".sound-off").removeClass("active");
		$(".sound-on").addClass("active");
	});

	$(".sound-on").click(function() {
		$("video").prop('muted', true);
		$(".sound-on").removeClass("active");
		$(".sound-off").addClass("active");
	});




	let $grid = $('.all_partners').isotope({
		itemSelector: '.element-item'
	}); // filter functions

	let filterFns = {
		// show if name ends with -ium
		ium: function ium() {
			var name = $(this).find('.name').text();
			return name.match(/ium$/);
		}
	}; // bind filter button click

	$('.filters-button-group').on('click', 'button', function () {
		var filterValue = $(this).attr('data-filter'); // use filterFn if matches value

		filterValue = filterFns[filterValue] || filterValue;
		$grid.isotope({
			filter: filterValue
		});
	}); // change is-checked class on buttons

	$('.button-group').each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function () {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');
		});
	});





	var accordion = (function(){

		var $accordion = $('.js-accordion');
		var $accordion_header = $accordion.find('.js-accordion-header');
		var $accordion_item = $('.js-accordion-item');

		// default settings
		var settings = {
			// animation speed
			speed: 400,

			// close all other accordion items if true
			oneOpen: false
		};

		return {
			// pass configurable object literal
			init: function($settings) {
				$accordion_header.on('click', function() {
					accordion.toggle($(this));
				});

				$.extend(settings, $settings);

				// ensure only one accordion is active if oneOpen is true
				if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
					$('.js-accordion-item.active:not(:first)').removeClass('active');
				}

				// reveal the active accordion bodies
				$('.js-accordion-item.active').find('> .js-accordion-body').show();
			},
			toggle: function($this) {

				if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
					$this.closest('.js-accordion')
						.find('> .js-accordion-item')
						.removeClass('active')
						.find('.js-accordion-body')
						.slideUp()
				}

				// show/hide the clicked accordion item
				$this.closest('.js-accordion-item').toggleClass('active');
				$this.next().stop().slideToggle(settings.speed);
			}
		}
	})();

	$(document).ready(function(){
		accordion.init({ speed: 300, oneOpen: true });
	});

		/* Hamburger menu */
	let isOpen = false;

	/* Hamburger layers */
	const hamburgerTop = document.getElementsByClassName('hamburgerTop')[0];
	const hamburgerMiddle = document.getElementsByClassName('hamburgerMiddle')[0];
	const hamburgerBottom = document.getElementsByClassName('hamburgerBottom')[0];

	document.getElementsByClassName('hamburger')[0].addEventListener('click', toggle);

	function toggle() {
	if(isOpen) {
		hamburgerTop.classList.remove('open');
		hamburgerMiddle.classList.remove('open');
		hamburgerBottom.classList.remove('open');
		isOpen = false;   
		return;
	}
	hamburgerTop.classList.add('open');
	hamburgerMiddle.classList.add('open');
	hamburgerBottom.classList.add('open'); 
	isOpen = true;
	}

});






$(".team-link").click(function() {
	var newWindowWidth = $(window).width();
	thisdata = $(this).attr('data-href');
	if (newWindowWidth < 800) {
		window.location.href = thisdata;
	}
});


$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top - 50
				}, 1000, function() {

				});
			}
		}
	});



window.onload = function() {
	var current = location.pathname;
	$('#nav li a').each(function(){
		var $this = $(this);
		// if the current path is like this link, make it active
		if($this.attr('href').indexOf(current) !== -1){
			$this.addClass('active');
		}
	})
};

// $(document).ready(function(){
// 	$('.gallery').slickLightbox({
// 		itemSelector: '> a',
// 		lazy: true,
// 		arrows: true,
// 		navigateByKeyboard: true,
// 		infinite : true,
//
// 	});
// });

$(document).ready(function(){
	$('.iconslider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 6,
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><svg width="30px" height="20px" viewBox="0 0 30 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="02-RIV" transform="translate(-123.000000, -3587.000000)" fill="#BB8F5D"><path d="M141.565,3588.393 L149.172,3596 L123,3596 L123,3598 L149.172,3598 L141.586,3605.586 L143,3607 C146.661,3603.339 149.496,3600.504 153,3597 C149.034,3593.034 151.834,3595.834 143,3587 L141.565,3588.393 Z" id="arrow_right-[#349]-copy" transform="translate(138.000000, 3597.000000) scale(-1, 1) translate(-138.000000, -3597.000000) "></path></g></g></svg></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><svg width="30px" height="20px" viewBox="0 0 30 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="02-RIV" transform="translate(-1635.000000, -3587.000000)" fill="#BB8F5D"><path d="M1653.565,3588.393 L1661.172,3596 L1635,3596 L1635,3598 L1661.172,3598 L1653.586,3605.586 L1655,3607 C1658.661,3603.339 1661.496,3600.504 1665,3597 C1661.034,3593.034 1663.834,3595.834 1655,3587 L1653.565,3588.393 Z" id="arrow_right-[#349]-copy"></path></g></g></svg></span>',
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,

			  }
			},
			{
				breakpoint: 600,
				settings: {
				  slidesToShow: 1,
  
				}
			  },
		]
	});

	$('.home_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		arrows: false
	});

	$('.projects_slider').slick({
		infinite: true,
		autoplay: false,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		dots: false,
		arrows: true,
		prevArrow: $('.prev_project'),
		nextArrow: $('.next_project'),
	});

	$('.realestate_slider').slick({
		infinite: false,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><i class="fas fa-angle-left"></i></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><i class="fas fa-angle-right"></i></span>'
	});

	$('.project_slider').slick({
		infinite: true,
		autoplay: false,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		dots: false,
		arrows: true,
		prevArrow: $('.prev_project'),
		nextArrow: $('.next_project'),
	});

	$('.oddproject_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		arrows: true,
		prevArrow: '<span class="slide-arrow prev_oddproject"><i class="fas fa-angle-left"></i></span>',
		nextArrow: '<span class="slide-arrow next_oddproject"><i class="fas fa-angle-right"></i></span>'
	});

	$('.evenproject_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		arrows: true,
		prevArrow: '<span class="slide-arrow prev_evenproject"><i class="fas fa-angle-left"></i></span>',
		nextArrow: '<span class="slide-arrow next_evenproject"><i class="fas fa-angle-right"></i></span>'
	});

	$('.content_1_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><i class="fas fa-angle-left"></i></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><i class="fas fa-angle-right"></i></span>'
	});

	$('.content_2_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><i class="fas fa-angle-left"></i></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><i class="fas fa-angle-right"></i></span>'
	});

	$('.building_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">		<g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pijl/blauw" transform="translate(-15.000000, -13.000000)" fill="#FFFFFF"><g id="Group-3" transform="translate(15.000000, 13.000000)"><path d="M10,20 L11.435,18.607 L3.828,11 L20,11 L20,9 L3.828,9 L11.414,1.414 L10,0 C6.339,3.661 3.504,6.496 0,10 C3.966,13.966 1.166,11.166 10,20" id="arrow_left-[#350]"></path></g></g></g></svg></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pijl/blauw" transform="translate(-64.000000, -13.000000)" fill="#FFFFFF"><g id="Group-3" transform="translate(15.000000, 13.000000)"><path d="M59,0 L57.565,1.393 L65.172,9 L49,9 L49,11 L65.172,11 L57.586,18.586 L59,20 C62.661,16.339 65.496,13.504 69,10 L59,0" id="arrow_right-[#349]"></path></g></g></g></svg></span>'
	});

	$('.offices_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">		<g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pijl/blauw" transform="translate(-15.000000, -13.000000)" fill="#FFFFFF"><g id="Group-3" transform="translate(15.000000, 13.000000)"><path d="M10,20 L11.435,18.607 L3.828,11 L20,11 L20,9 L3.828,9 L11.414,1.414 L10,0 C6.339,3.661 3.504,6.496 0,10 C3.966,13.966 1.166,11.166 10,20" id="arrow_left-[#350]"></path></g></g></g></svg></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pijl/blauw" transform="translate(-64.000000, -13.000000)" fill="#FFFFFF"><g id="Group-3" transform="translate(15.000000, 13.000000)"><path d="M59,0 L57.565,1.393 L65.172,9 L49,9 L49,11 L65.172,11 L57.586,18.586 L59,20 C62.661,16.339 65.496,13.504 69,10 L59,0" id="arrow_right-[#349]"></path></g></g></g></svg></span>'
	});

	$('.plattegrond_slider').slick({
		infinite: true,
		autoplay: false,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">		<g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pijl/blauw" transform="translate(-15.000000, -13.000000)" fill="#FFFFFF"><g id="Group-3" transform="translate(15.000000, 13.000000)"><path d="M10,20 L11.435,18.607 L3.828,11 L20,11 L20,9 L3.828,9 L11.414,1.414 L10,0 C6.339,3.661 3.504,6.496 0,10 C3.966,13.966 1.166,11.166 10,20" id="arrow_left-[#350]"></path></g></g></g></svg></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pijl/blauw" transform="translate(-64.000000, -13.000000)" fill="#FFFFFF"><g id="Group-3" transform="translate(15.000000, 13.000000)"><path d="M59,0 L57.565,1.393 L65.172,9 L49,9 L49,11 L65.172,11 L57.586,18.586 L59,20 C62.661,16.339 65.496,13.504 69,10 L59,0" id="arrow_right-[#349]"></path></g></g></g></svg></span>'
	});

	$('.location_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">		<g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pijl/blauw" transform="translate(-15.000000, -13.000000)" fill="#FFFFFF"><g id="Group-3" transform="translate(15.000000, 13.000000)"><path d="M10,20 L11.435,18.607 L3.828,11 L20,11 L20,9 L3.828,9 L11.414,1.414 L10,0 C6.339,3.661 3.504,6.496 0,10 C3.966,13.966 1.166,11.166 10,20" id="arrow_left-[#350]"></path></g></g></g></svg></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pijl/blauw" transform="translate(-64.000000, -13.000000)" fill="#FFFFFF"><g id="Group-3" transform="translate(15.000000, 13.000000)"><path d="M59,0 L57.565,1.393 L65.172,9 L49,9 L49,11 L65.172,11 L57.586,18.586 L59,20 C62.661,16.339 65.496,13.504 69,10 L59,0" id="arrow_right-[#349]"></path></g></g></g></svg></span>'
	});

	$('.quote_slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		dots: true,
		prevArrow: false,
		nextArrow: false
	});

	$('.arrowslider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		dots: false,
		prevArrow: '<span class="slide-arrow prev-arrow"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' + '\t viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 443.52 443.52;" xml:space="preserve">\n' +
			'<g>\n' + '\t<g>\n' + '\t\t<path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8\n' + '\t\t\tc-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712\n' +
			'\t\t\tL143.492,221.863z"/>\n' + '\t</g>\n' + '</g>\n' + '</svg></span>',
		nextArrow: '<span class="slide-arrow next-arrow"><svg version="1.1"  id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 443.52 443.52;" xml:space="preserve"><g><g><path d="M336.226,209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.712l192.734,192.734\n' +
			'\t\t\tL107.294,414.391c-6.663,6.664-6.663,17.468,0,24.132c6.665,6.663,17.468,6.663,24.132,0l204.8-204.8 C342.889,227.058,342.889,216.255,336.226,209.591z"/></g></g></svg>\n</span>'
	});
	 
	//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.accordionButton').click(function() {

		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accordionButton').removeClass('on');
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordionContent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			  
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		 } 
		  
	 });
	  
	
	/*** REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	//ADDS THE .OVER CLASS FROM THE STYLESHEET ON MOUSEOVER 
	$('.accordionButton').mouseover(function() {
		$(this).addClass('over');
		
	//ON MOUSEOUT REMOVE THE OVER CLASS
	}).mouseout(function() {
		$(this).removeClass('over');										
	});
	
	/*** END REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	
	/********************************************************************************************************************
	CLOSES ALL S ON PAGE LOAD
	********************************************************************************************************************/	
	$('.accordionContent').hide();

});


// Nav menu show on scroll up

document.addEventListener("DOMContentLoaded", function () {

	el_autohide = document.querySelector('#wrapper-navbar');

	// add padding-top to bady (if necessary)
	navbar_height = document.querySelector('#wrapper-navbar').offsetHeight;
	document.body.style.paddingTop = '0px';


	if (el_autohide) {
		var last_scroll_top = 0;
		window.addEventListener('scroll', function () {
			let scroll_top = window.scrollY;
			if (scroll_top < last_scroll_top) {
				el_autohide.classList.remove('scrolled-down');
				el_autohide.classList.add('scrolled-up');
			} else {
				el_autohide.classList.add('scrolled-up');

			}
			last_scroll_top = scroll_top;
		});
		// window.addEventListener
	}

	window.addEventListener('scroll', myFunction);

	// Get the navbar



	// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position


});

myFunction();

function myFunction() {
	var navbar = document.getElementById("wrapper-navbar");
	let scrollPosition = Math.round(window.scrollY);

	if (scrollPosition < 50) {
		navbar.classList.remove("scrolled-up");
		navbar.classList.remove("scrolled-down");
	} else {

	}
}