// Dee Bertoldi — shared site script

// 1. Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('.links');
if (menuBtn && links) {
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

// 2. Noise-to-signal waveform (home page only)
const noise = document.getElementById('noise');
const signal = document.getElementById('signal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (noise && signal) {
  let t = 0;
  const draw = () => {
    const a = [], b = [];
    for (let x = 0; x <= 1000; x += 5) {
      const p = x / 1000;                                         // 0 = left, 1 = right
      const chaos = (Math.random() * 2 - 1) * 70 * Math.pow(1 - p, 1.5);
      const sine = Math.sin(x * 0.03 - t * 2.2) * 42 * p;
      const y = (90 + chaos + sine).toFixed(1);
      if (p <= 0.55) a.push(x + ',' + y);
      if (p >= 0.45) b.push(x + ',' + y);
    }
    noise.setAttribute('points', a.join(' '));
    signal.setAttribute('points', b.join(' '));
    t += 0.03;
    if (!reduceMotion) setTimeout(() => requestAnimationFrame(draw), 45);
  };
  draw();
}

// 3. YouTube hover previews
// Markup: <div class="video" data-yt="VIDEO_ID" data-start="760" data-title="Live set"></div>
//   data-yt    = the ID from the YouTube link (youtube.com/watch?v=THIS_PART)
//   data-start = where the 15-second preview starts, in seconds (12:40 = 760)
// Desktop: hover plays a muted 15s loop, click opens the full video.
// Mobile: first tap plays the preview, second tap opens the full video.
const PREVIEW_SECONDS = 15;
const canHover = window.matchMedia('(hover: hover)').matches;

document.querySelectorAll('.video').forEach((box) => {
  const id = (box.dataset.yt || '').trim();
  const start = parseInt(box.dataset.start || '0', 10);
  const title = box.dataset.title || 'Video';

  if (!id) {
    box.classList.add('empty');
    box.innerHTML = '<span>video coming soon</span>';
    return;
  }

  box.setAttribute('role', 'link');
  box.setAttribute('tabindex', '0');
  box.setAttribute('aria-label', title + ' — open full video on YouTube');
  box.innerHTML =
    '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="' + title + '" loading="lazy">' +
    '<span class="badge">' + (canHover ? 'hover to preview' : 'tap to preview') + '</span>';

  const fullUrl = 'https://www.youtube.com/watch?v=' + id + '&t=' + start + 's';
  let iframe = null, loopTimer = null;

  const src = () =>
    'https://www.youtube-nocookie.com/embed/' + id +
    '?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3' +
    '&start=' + start + '&end=' + (start + PREVIEW_SECONDS);

  const play = () => {
    if (iframe) return;
    iframe = document.createElement('iframe');
    iframe.allow = 'autoplay; encrypted-media';
    iframe.title = title + ' preview';
    iframe.src = src();
    iframe.addEventListener('load', () => setTimeout(() => box.classList.add('playing'), 700));
    box.appendChild(iframe);
    loopTimer = setInterval(() => { if (iframe) iframe.src = src(); }, PREVIEW_SECONDS * 1000);
  };
  const stop = () => {
    clearInterval(loopTimer);
    box.classList.remove('playing');
    if (iframe) { iframe.remove(); iframe = null; }
  };
  const open = () => window.open(fullUrl, '_blank', 'noopener');

  if (canHover) {
    box.addEventListener('mouseenter', play);
    box.addEventListener('mouseleave', stop);
    box.addEventListener('click', open);
  } else {
    box.addEventListener('click', () => (iframe ? open() : play()));
  }
  box.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });
});
