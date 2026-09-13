/* ═══════════════════════════════════════
   VIKASH VERMA — PORTFOLIO SCRIPT
   Features:
   1. Mobile hamburger menu
   2. Active nav link on scroll
   3. Typing animation in hero
   4. Scroll reveal animations
   5. Project card tilt effect
   6. Form validation
═══════════════════════════════════════ */


/* ═══════════════════════════════════════
   1. MOBILE HAMBURGER MENU
   Toggles nav links open/closed on mobile
═══════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const nav       = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  // animate hamburger into X shape
  hamburger.classList.toggle('is-open');
});

// close nav when any link is clicked (mobile UX)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('is-open');
  });
});

// close nav when user clicks outside it
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('is-open');
  }
});

/* ═══════════════════════════════════════
   2. ACTIVE NAV LINK ON SCROLL
   Highlights the correct nav link as you
   scroll through each section
═══════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // 80px offset for fixed nav
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navAnchors.forEach(anchor => {
    anchor.classList.remove('active');
    if (anchor.getAttribute('href') === `#${currentSection}`) {
      anchor.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // run once on page load too


/* ═══════════════════════════════════════
   3. TYPING ANIMATION IN HERO
   Cycles through different role titles
   below your name automatically
═══════════════════════════════════════ */
const typingTarget = document.querySelector('.hero-role');

// change these to match your actual roles/interests
const phrases = [
  'Cybersecurity Enthusiast',
  'Ethical Hacker',
  'OSINT Researcher',
  'Python Developer',
  'AI for Security Explorer'
];

let phraseIndex  = 0;  // which phrase we're on
let charIndex    = 0;  // which character we're on
let isDeleting   = false;
let typingSpeed  = 80; // ms per character when typing
let deleteSpeed  = 40; // ms per character when deleting
let pauseDelay   = 1800; // ms to pause after full phrase is typed

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // add one character
    typingTarget.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      // full phrase typed — pause, then start deleting
      isDeleting = true;
      setTimeout(type, pauseDelay);
      return;
    }
  } else {
    // remove one character
    typingTarget.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // fully deleted — move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
}

// Start with a complete phrase so the hero never appears empty.
typingTarget.textContent = phrases[0];
setTimeout(type, 1200);

// add a blinking cursor via CSS class
typingTarget.classList.add('typing-cursor');


/* ═══════════════════════════════════════
   4. SCROLL REVEAL ANIMATIONS
   Elements fade + slide up as they enter
   the viewport while scrolling
═══════════════════════════════════════ */

// add class="reveal" to any HTML element you want animated
// this script handles the rest automatically

const revealElements = document.querySelectorAll(
  '.edu-card, .project-card, .cert-item, .skill-group, .stat-item'
);

// IntersectionObserver watches when elements enter the screen
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // stagger the animation slightly for each card
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, index * 80);

      // stop watching once revealed (no need to re-animate)
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,    // trigger when 10% of element is visible
  rootMargin: '0px 0px -40px 0px'  // trigger slightly before it enters
});

revealElements.forEach(el => {
  el.classList.add('reveal'); // mark for CSS initial hidden state
  revealObserver.observe(el);
});


/* ═══════════════════════════════════════
   5. PROJECT CARD SUBTLE TILT
   Cards tilt slightly when you hover —
   gives a modern 3D feel
═══════════════════════════════════════ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left; // mouse X within card
    const y      = e.clientY - rect.top;  // mouse Y within card
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;

    // max tilt in degrees
    const tiltX = ((y - centerY) / centerY) * 4;
    const tiltY = ((x - centerX) / centerX) * -4;

    card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.01)`;
  });

  card.addEventListener('mouseleave', () => {
    // smoothly reset on mouse leave
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
  });
});


/* ═══════════════════════════════════════
   6. CONTACT FORM VALIDATION
   Checks fields before submission and
   shows helpful error / success messages
═══════════════════════════════════════ */
const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.querySelector('#fname');
    const email   = document.querySelector('#femail');
    const subject = document.querySelector('#fsubject');
    const message = document.querySelector('#fmsg');

    let valid = true;

    // clear previous errors
    [name, email, subject, message].forEach(f => {
      if (f) f.style.borderColor = '';
    });

    // check each field
    if (!name || name.value.trim() === '') {
      if (name) name.style.borderColor = '#ef4444';
      valid = false;
    }

    if (!email || !email.value.includes('@')) {
      if (email) email.style.borderColor = '#ef4444';
      valid = false;
    }

    if (!subject || subject.value.trim() === '') {
      if (subject) subject.style.borderColor = '#ef4444';
      valid = false;
    }

    if (!message || message.value.trim().length < 10) {
      if (message) message.style.borderColor = '#ef4444';
      valid = false;
    }

    if (!valid) {
      showToast('Please fill all fields correctly.', 'error');
      return;
    }

    // if all valid — show success
    // (connect to Formspree/EmailJS to actually send the email)
    showToast('Message sent! I will get back to you soon.', 'success');

    // clear the form
    [name, email, subject, message].forEach(f => {
      if (f) f.value = '';
    });
  });
}

// toast notification helper
function showToast(message, type = 'success') {
  // remove existing toast if any
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // trigger show animation
  setTimeout(() => toast.classList.add('show'), 10);

  // auto-hide after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}