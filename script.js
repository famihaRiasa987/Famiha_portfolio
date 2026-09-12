const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  panels.forEach(p => { p.hidden = true; p.classList.remove('active'); });
  tab.classList.add('active');
  const panel = document.getElementById(tab.dataset.panel);
  panel.hidden = false;
  panel.classList.add('active');
}));

document.querySelectorAll('a[href="resume.html"]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.open('resume.html', '_blank', 'noopener,noreferrer');
  });
});

// Restore the floating dotted-person animation used on the Netlify version.
const portrait = document.querySelector('.dot-portrait');
const portraitWrap = document.querySelector('.dot-portrait-wrap');
const lineA = document.querySelector('.line-a');
const lineB = document.querySelector('.line-b');

if (portrait && portraitWrap) {
  const style = document.createElement('style');
  style.textContent = `
    .dot-portrait-wrap {
      animation: famihaPortraitFloat 5.8s ease-in-out infinite;
      transform-origin: 50% 52%;
      will-change: transform;
    }
    .dot-portrait {
      animation: famihaDotDrift 4.8s ease-in-out infinite alternate,
                 famihaGlowPulse 3.6s ease-in-out infinite;
      will-change: background-position, opacity, filter, transform;
    }
    .portrait-line {
      transform-origin: center;
      will-change: transform, opacity;
    }
    .line-a {
      animation: famihaRingA 7.5s ease-in-out infinite;
    }
    .line-b {
      animation: famihaRingB 9s ease-in-out infinite reverse;
    }
    @keyframes famihaPortraitFloat {
      0%, 100% { transform: translate3d(0, 0, 0) rotate(-0.25deg); }
      50% { transform: translate3d(0, -13px, 0) rotate(0.35deg); }
    }
    @keyframes famihaDotDrift {
      0% { background-position: 0 0; transform: scale(0.995); }
      100% { background-position: 7px -7px; transform: scale(1.01); }
    }
    @keyframes famihaGlowPulse {
      0%, 100% { opacity: .68; filter: drop-shadow(0 0 12px rgba(82,243,208,.06)); }
      50% { opacity: .84; filter: drop-shadow(0 0 28px rgba(82,243,208,.18)); }
    }
    @keyframes famihaRingA {
      0%, 100% { transform: scale(.98) rotate(0deg); opacity: .55; }
      50% { transform: scale(1.045) rotate(3deg); opacity: 1; }
    }
    @keyframes famihaRingB {
      0%, 100% { transform: scale(1.01) rotate(0deg); opacity: .38; }
      50% { transform: scale(.97) rotate(-2deg); opacity: .75; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dot-portrait-wrap, .dot-portrait, .line-a, .line-b { animation: none !important; }
    }
  `;
  document.head.appendChild(style);

  // Add a very subtle cursor parallax on desktop, similar to the animated hosted build.
  if (window.matchMedia('(pointer:fine)').matches) {
    portraitWrap.addEventListener('pointermove', event => {
      const rect = portraitWrap.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      portrait.style.translate = `${x * 7}px ${y * 7}px`;
      if (lineA) lineA.style.translate = `${x * -4}px ${y * -4}px`;
      if (lineB) lineB.style.translate = `${x * -7}px ${y * -7}px`;
    });
    portraitWrap.addEventListener('pointerleave', () => {
      portrait.style.translate = '';
      if (lineA) lineA.style.translate = '';
      if (lineB) lineB.style.translate = '';
    });
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
