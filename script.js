// Video toggle — play/pause
  function toggleVideo(wrapper) {
    const video = wrapper.querySelector('video');
    if (!video) return;
    if (video.paused) {
      document.querySelectorAll('.case-media video').forEach(v => {
        if (v !== video) {
          v.pause();
          const w = v.closest('.case-media');
          if (w) w.classList.remove('playing');
        }
      });
      video.play().catch(e => console.warn('Play failed:', e));
      wrapper.classList.add('playing');
    } else {
      video.pause();
      wrapper.classList.remove('playing');
    }
  }

  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      ring.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // Nav active link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--acid)' : '';
    });
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }
  function closeMobileMenu() {
    if (hamburger && mobileMenu) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
// Toggle sound on video
function toggleSound(btn) {
  const wrapper = btn.closest('.case-media');
  const video = wrapper.querySelector('video');
  if (!video) return;
  if (video.muted) {
    // Mute all others
    document.querySelectorAll('.case-media video').forEach(v => {
      v.muted = true;
      const b = v.closest('.case-media').querySelector('.sound-btn');
      if (b) b.classList.remove('active');
    });
    video.muted = false;
    btn.classList.add('active');
  } else {
    video.muted = true;
    btn.classList.remove('active');
  }
}