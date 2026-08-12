"use strict";

function full_screen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

var slide_count = document.querySelectorAll('section').length;

function slide_number() {
  var activeSlide = document.querySelector('[id^="slide"]:target');
  if (!activeSlide) { return 0; }
  return parseFloat(activeSlide.getAttribute('id').substring(5));
};

function is_last_slide () {
  return window.location.hash === '#slide' + (slide_count - 1);
};

function is_first_slide () {
  return window.location.hash === '#slide0';
};

function first_slide() {
  window.location.hash = '#slide0';
}

function next_slide() {
  const slides = Array.from(document.querySelectorAll('[id^="slide"]'));
  const current = slides.findIndex(slide => `#${slide.id}` === window.location.hash);
  if (current < slides.length-1)
    window.location.hash = '#' + slides[current+1].id;
};

function prev_slide() {
  const slides = Array.from(document.querySelectorAll('[id^="slide"]'));
  const current = slides.findIndex(slide => `#${slide.id}` === window.location.hash);
  if (current > 0)
    window.location.hash = '#' + slides[current-1].id;
};

function on_scroll(event) {
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) { return; }
  if (event.deltaY > 0) { next_slide(); }
  else if (event.deltaY < 0) { prev_slide(); }
};


function process_key(event) {
  if (event.code === 'Space' || event.code === 'ArrowRight' || event.code === 'PageDown' || event.code === 'ArrowDown') {
    next_slide();
  }
  else if (event.code === 'ArrowLeft' || event.code === 'PageUp' || event.code === 'ArrowUp') {
    prev_slide();
  }
  else if (event.code === 'KeyR') {
    first_slide();
  }
  else if (event.code === 'KeyF') {
    full_screen(document.documentElement);
  }
};


document.body.addEventListener('keydown', process_key, false);
document.addEventListener('click', next_slide, false);
document.addEventListener('wheel', on_scroll, false);

if (!window.location.hash) {
  first_slide();
}
//ensure_visible();

