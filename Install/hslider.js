// HSLIDER - Horizontal slider.
//By: Henrique, L.;

//MAIN CODE

function prepSlides(){
	
	let slideSingle = $('.slide-single');
	const slide = $('.box-slides');
	const numOfSlides = slideSingle.length;
	const slideSpeed = 600; //default: 400
	const navBullets = $('.box-nav-spans');
	const arrowLeft = $('#navprev');
	const arrowRight = $('#navnext');

	//Preset height, width, nav bullets and hidden slides
	const sliderWidth = 'calc(100% * '+numOfSlides+')';
	slide.css({'width':sliderWidth});

	//hide parents' overflow
	slide.parent(0).css({'overflow-x':'hidden'});
	
	slideSingle.each( () => {
		navBullets.append('<span></span>');
		$('.slide-single:not(:first)').css({'visibility':'hidden'});
	});
	const slidesCounter = slideSingle.length - 1;
	const allspan = navBullets.find("span").length -1;
	const span = navBullets.find("span");
	let i = 0;
	let b = 0;

	//Selected bullet - start
	span.eq(i).addClass('bordnav');

	//Navigation Preventing double clicking glitch
	const delay = slideSpeed * 1.1;
	let clicked = true;

	arrowLeft.on('click', () => {
		while(clicked == true){
			scrollToRight();
			clicked = false;
			setTimeout( () => {
				clicked = true;
			},delay);
		}
	});

	arrowRight.on('click', () => {
		while(clicked == true){
			scrollToLeft();
			clicked = false;
			setTimeout( () => {
				clicked = true;
			},delay);
		}
	});
	
	//Mobile swipe
	$(function() {
		let x1;
		let x2;

		slide
		.on('mousedown touchstart', (e) => { 
			if (navigator.maxTouchPoints != 0) {
				x1 = e.changedTouches[0].pageX;
			}
			else { x1 = e.pageX; }
		})
		
        .on('mouseup touchend', (e) => {
			if (navigator.maxTouchPoints != 0) {
				x2 = e.changedTouches[0].pageX;
			}
			else { x2 = e.pageX; }

            if (x1 < x2 && (x2 - x1) >= 30) {
				while (clicked == true) {
					scrollToRight();
					clicked = false;
					setTimeout(() => {
						clicked = true;
					}, delay);
				}
            }else if (x1 > x2 && (x1 - x2 >= 30)) {
				while (clicked == true) {
					scrollToLeft();
					clicked = false;
					setTimeout(() => {
						clicked = true;
					}, delay);
				}
			}else{return false;}
        })
	})


	//Main functions
	function scrollToLeft(){
		if(i < slidesCounter){
			slideSingle.eq(i+1).css({'visibility':'visible'});
			slide.animate({left: "-=100%"},slideSpeed,);
			span.eq(i).removeClass('bordnav');
			setTimeout( () => {
				slideSingle.eq(i-1).css({'visibility':'hidden'});
			},delay);
			i++;

			//Bullets style
			if(b < allspan){
				b++;
				span.eq(i).addClass('bordnav');
			}
		}
	}//End clickslide_R


	function scrollToRight(){
		if(i > 0){
			slideSingle.eq(i-1).css({'visibility':'visible'});
			slide.animate({left: "+=100%"},slideSpeed,);
			span.eq(i).removeClass('bordnav');
			setTimeout( () => {
				slideSingle.eq(i+1).css({'visibility':'hidden'});
			},delay);
			i--;

			//Bullets style
			if(b > 0){
				b--;
				span.eq(i).addClass('bordnav');
			}
		}
	}//End clickslide_L
	
}//End - prepSlides

prepSlides();