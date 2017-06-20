
// SLIDES:

// declared variables
var rightArrow = document.querySelectorAll('.right-arrow')[0];
var slideContainer = document.getElementsByClassName('slides-container')[0];
var slides = document.querySelectorAll('.slide');
var firstSlide = slides[0];
var leftArrow = document.getElementsByClassName('left-arrow')[0];
var numOfSlides = slides.length;

var buttonsContainer = document.getElementsByClassName('buttons-container')[0];
var Html = '';
// add buttons from name attributes of slides to buttons-container
for (i = 0; i < numOfSlides; i++) {
    var slideName = slides[i].getAttribute('name');
    // add active class to the first button (representing first slide)
    if (i === 0) {
        Html += '<div class="slide-button btn-active">' + slideName + '</div>';
    } else {
        Html += '<div class="slide-button">' + slideName + '</div>';
    }
}
// draw buttons from slide names
buttonsContainer.innerHTML = Html;


// on button click, toggle active class, and slide to correct slide
document.querySelector('.buttons-container').addEventListener('click', function(e) {
    var target = e.target;
    // if clicked element is button (with class .slide-button), slide to correct
    // slide
    if (target.classList.contains('slide-button')) {
        e.currentTarget.querySelector('.btn-active').classList.remove('btn-active');
        target.classList.add('btn-active');

        for (i = 0; i < buttonsContainer.childNodes.length; i++) {
            if (buttonsContainer.childNodes[i] == target) {
                firstSlide.style.marginLeft = -i * 100 + "%";
            }
        }
    }
});

// on arrow click check which button should have active class
function addActiveClassToButton() {
    // on right arrow click, change active class of buttons to the next one
    var endMargin = firstSlide.style.marginLeft;
    var absoluteNum = Math.abs(endMargin.slice(0, endMargin.length - 1));
    var num = 0;
    if (absoluteNum === 0) {
        num = 0;
    } else {
        num = absoluteNum / 100;
    }
    document.querySelector('.btn-active').classList.remove('btn-active');
    buttonsContainer.childNodes[num].classList.add('btn-active');
}


// ### arrow clicks ###

// right arrow click
rightArrow.onclick = function() {
    var currentMargin = firstSlide.style.marginLeft;
    var translate;
    // on first screen
    if (currentMargin.length === 0) {
        translate = '-100%';
        // if you press right arrow on last slide = move to first slide
    } else if (currentMargin.slice(0, currentMargin.length - 1) == -(numOfSlides - 1) * 100) {
        translate = "0%";
        // move right
    } else {
        currentMargin = currentMargin.slice(0, currentMargin.length - 1);
        translate = (parseInt(currentMargin) - 100) + "%";
    }
    firstSlide.style.marginLeft = translate;

    // add active class to correct top button
    addActiveClassToButton();
};

// left arrow click
leftArrow.onclick = function() {
    var currentMargin = firstSlide.style.marginLeft;
    var translate;
    // if you press left arrow on first slide => move to last slide
    if (currentMargin.length === 0 || currentMargin.length === 2) {
        translate = -(numOfSlides - 1) * 100 + "%";
        // else move 1 slide left
    } else {
        currentMargin = currentMargin.slice(0, currentMargin.length - 1);
        translate = (parseInt(currentMargin) + 100) + "%";
    }
    firstSlide.style.marginLeft = translate;

    // add active class to correct top button
    addActiveClassToButton();
};
