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

setTimeout(() => {
  console.log("Highlight.js is completely done and layout is stable.");

  const sections = document.querySelectorAll ('section.slide');
  sections.forEach ((section) => {
    const arrows = section.querySelectorAll('p.arrow');
    arrows.forEach((p) => {
      const regex = /^([^(]+)\(([^,]+),([^)]+)\)-([^(]+)\(([^,]+),([^)]+)\)$/;
      const match = p.getAttribute('data-tag').match (regex);

      // Destructure the matched string segments
      const [_, tagA, xAs, yAs, tagB, xBs, yBs] = match;
      const fxA = parseFloat (xAs);
      const fyA = parseFloat (yAs);
      const fxB = parseFloat (xBs);
      const fyB = parseFloat (yBs);

      console.log (`(path from ${tagA} (${fxA},${fyA}) to ${tagB} (${fxB},${fyB})`);

      const body = document.querySelector('body').getBoundingClientRect();
      const boxA = section.querySelector(`[data-tag="${tagA}"]`);
      const boxB = section.querySelector(`[data-tag="${tagB}"]`);
      const rectA = boxA.getBoundingClientRect();
      const rectB = boxB.getBoundingClientRect();
      console.log ('body:', body.left, body.right, body.top, body.bottom);
      console.log ('box A:', rectA.left, rectA.right, rectA.top, rectA.bottom, 'width:', rectA.width);
      console.log ('box B:', rectB.left, rectB.right, rectB.top, rectB.bottom, 'width:', rectB.width, boxB.offsetWidth);

      console.log ('posA:', 
        rectA.left + fxA * (rectA.right - rectA.left) - body.left, 
        rectA.top + fyA * (rectA.bottom - rectA.top) - body.top,
        'posB:',
        rectB.left + fxB * (rectB.right - rectB.left) - body.left,
        rectB.top + fyB * (rectB.bottom - rectB.top) - body.top);


      const sx = 384 / (body.right - body.left);
      const sy = 216 / (body.bottom - body.top);

      const xA = sx * ( rectA.left + fxA * (rectA.right - rectA.left) - body.left);
      const yA = sy * ( rectA.top + fyA * (rectA.bottom - rectA.top) - body.top);
      const xB = sx * ( rectB.left + fxB * (rectB.right - rectB.left) - body.left);
      const yB = sy * ( rectB.top + fyB * (rectB.bottom - rectB.top) - body.top);
      console.log ('posA:', xA, yA, 'posB', xB, yB);

      const svg = document.createElementNS ('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute ('class', 'arrow');
      svg.setAttribute ('viewBox', '0 0 384 216');

      const line = document.createElementNS ('http://www.w3.org/2000/svg', 'path');
      line.setAttribute ('d', `M ${xA} ${yA} L ${xB} ${yB}`);

      svg.append(line);
      p.replaceWith (svg);

      // Example action: Add a style or modify text
      p.style.color = 'blue';
    });
  });

}, 100);


if (!window.location.hash) {
  first_slide();
}

