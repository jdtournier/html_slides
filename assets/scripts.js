"use strict";

//const hljs = require('highlight.js/lib/core');

// Load any languages you need
//hljs.registerLanguage('javascript', require('highlight.js/lib/languages/c++'));
//hljs.registerLanguage('javascript', require('highlight.js/lib/languages/bash'));


var full_screen = function full_screen(element) {
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

var ensure_visible = function ensure_visible () {
  document.getElementById (window.location.hash.slice(1)).style.visibility = 'visible';
}

var slide_number = function slide_number() {
  var activeSlide = document.querySelector('[id^="slide"]:target');
  if (!activeSlide) { return 0; }
  return parseInt(activeSlide.getAttribute('id').substring(5));
};

var is_last_slide = function is_last_slide () {
  return window.location.hash === '#slide' + (slide_count - 1);
};

var is_first_slide = function is_first_slide () {
  return window.location.hash === '#slide0';
};

var first_slide = function first_slide() {
  window.location.hash = '#slide0';
  ensure_visible();
}

var next_slide = function next_slide() {
  if (is_last_slide()) { return; }
  window.location.hash = '#slide' + (slide_number() + 1);
  ensure_visible();
};

var prev_slide = function prev_slide() {
  if (is_first_slide()) { return; }
  window.location.hash = '#slide' + (slide_number() - 1);
  ensure_visible();
};

var on_scroll = function on_scroll(event) {
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) { return; }
  if (event.deltaY > 0) { next_slide(); }
  else if (event.deltaY < 0) { prev_slide(); }
};


var process_key = function process_key(event) {
  if (event.code === 'Space' || event.code === 'ArrowRight' || event.code === 'PageDown') {
    next_slide();
  }
  else if (event.code === 'ArrowLeft' || event.code === 'PageUp') {
    prev_slide();
  }
  else if (event.code === 'KeyR') {
    first_slide();
  }
  else if (event.code === 'KeyF') {
    full_screen(document.documentElement);
  }
};


const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
  section.style.visibility = 'hidden';
  section.id = `slide${index}`;
  if (index > 0) { section.innerHTML += `<div class=slidenumber><p>${index}</p></div>`; }
});

document.body.addEventListener('keydown', process_key, false);
document.addEventListener('click', next_slide, false);
document.addEventListener('wheel', on_scroll, false);

if (!window.location.hash) {
  first_slide();
}
ensure_visible();

