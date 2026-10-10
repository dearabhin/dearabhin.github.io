/* main.js — interactions and motion for abhinkrishna.com. No dependencies.
   Loaded with `defer`, so the DOM is parsed when this runs. Every effect checks
   prefers-reduced-motion, and the page is fully usable without this file. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var hasIO = 'IntersectionObserver' in window;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- Hero title: split into letters for the staggered reveal ---------- */
  function initSplitTitle() {
    $$('[data-split]').forEach(function (el) {
      var text = el.textContent.trim();
      var index = 0;
      el.setAttribute('aria-label', text);
      el.textContent = '';
      text.split(' ').forEach(function (word, w) {
        if (w > 0) el.appendChild(document.createTextNode(' '));
        // Words stay unbreakable so a line never wraps mid-name
        var wordEl = document.createElement('span');
        wordEl.setAttribute('aria-hidden', 'true');
        wordEl.style.display = 'inline-block';
        wordEl.style.whiteSpace = 'nowrap';
        Array.from(word).forEach(function (ch) {
          var span = document.createElement('span');
          span.className = 'ch';
          span.style.setProperty('--i', index++);
          span.textContent = ch;
          wordEl.appendChild(span);
        });
        el.appendChild(wordEl);
      });
    });
  }

  /* ---------- Theme toggle ---------- */
  function initTheme() {
    var root = document.documentElement;
    var btn = $('.theme-toggle');
    var meta = $('meta[name="theme-color"]');
    function current() { return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
    function apply(theme) {
      root.setAttribute('data-theme', theme);
      if (meta) meta.setAttribute('content', theme === 'light' ? '#f5f7fa' : '#07090c');
      if (btn) btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      window.dispatchEvent(new CustomEvent('themechange'));
    }
    apply(current());
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = current() === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Nav shrink + scroll progress bar ---------- */
  function initScroll() {
    var nav = $('.nav');
    var bar = $('.progress');
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (nav) nav.classList.toggle('is-scrolled', y > 24);
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Scroll spy: highlight the nav link for the section in view ---------- */
  function initScrollSpy() {
    var links = $$('.nav-link');
    var indicator = $('.nav-indicator');
    if (!links.length || !hasIO) return;
    var active = null;
    var targets = new Map();
    links.forEach(function (link) {
      var section = document.getElementById(link.hash.slice(1));
      if (section) targets.set(section, link);
    });
    var hero = $('.hero');
    if (hero) targets.set(hero, null);

    function place() {
      if (!indicator) return;
      if (!active) { indicator.style.opacity = '0'; return; }
      indicator.style.left = active.offsetLeft + 'px';
      indicator.style.width = active.offsetWidth + 'px';
      indicator.style.opacity = '1';
    }
    function setActive(link) {
      if (link === active) return;
      active = link;
      links.forEach(function (l) {
        if (l === link) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
      });
      place();
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(targets.get(entry.target));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (_, section) { io.observe(section); });
    window.addEventListener('resize', place, { passive: true });
  }

  /* ---------- Reveal-on-scroll ---------- */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (!hasIO || reduceMotion.matches) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Stat counters (data-count, optional data-from/prefix/suffix) ---------- */
  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length || !hasIO || reduceMotion.matches) return;
    function format(n) { return n.toLocaleString('en-US'); }
    function run(el) {
      var end = Number(el.dataset.count);
      var start = Number(el.dataset.from || 0);
      var prefix = el.dataset.prefix || '';
      var suffix = el.dataset.suffix || '';
      var t0 = performance.now();
      var duration = 1600;
      function frame(now) {
        var p = Math.min(1, (now - t0) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + format(Math.round(start + (end - start) * eased)) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- EEG trace: one seamless period, drawn twice; CSS scrolls it ---------- */
  function initEEG() {
    var path = $('.eeg-path');
    if (!path) return;
    var W = 1200, MID = 28, N = 600;
    var seed = 7;
    function rand() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    var noise = [];
    for (var n = 0; n < N; n++) noise.push(rand() - 0.5);
    // Smooth the noise so it reads as signal, not static
    var smooth = noise.map(function (v, i) { return (noise[(i + N - 1) % N] + v + noise[(i + 1) % N]) / 3; });
    var spikes = [{ x: 0.18, a: 1 }, { x: 0.52, a: -0.85 }, { x: 0.81, a: 0.9 }];

    var d = '';
    for (var k = 0; k < 2; k++) {
      for (var i = 0; i <= N; i++) {
        if (k === 1 && i === 0) continue;
        var u = i / N;
        var t = u * Math.PI * 2;
        // Integer cycle counts keep the period seamless at the seam
        var y = Math.sin(t * 10) * 4.5 + Math.sin(t * 23 + 1.3) * 2.6 + Math.sin(t * 47 + 0.4) * 1.4 + smooth[i % N] * 5;
        spikes.forEach(function (s) {
          var dx = (u - s.x) * 120;
          y += s.a * 14 * Math.exp(-dx * dx) * Math.cos(dx * 2.2);
        });
        d += (d ? 'L' : 'M') + (k * W + u * W).toFixed(1) + ' ' + (MID - y).toFixed(1);
      }
    }
    path.setAttribute('d', d);
  }

  /* ---------- Hero neural network canvas ---------- */
  function initNeuralCanvas() {
    var canvas = $('.hero-canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var hero = canvas.parentElement;

    var PALETTES = {
      dark: { a: [61, 224, 195], b: [139, 124, 255], line: [140, 170, 200], lineAlpha: 0.22 },
      light: { a: [8, 122, 104], b: [91, 75, 214], line: [60, 80, 110], lineAlpha: 0.2 }
    };
    var pal = PALETTES.dark;
    var W = 0, H = 0, maxD = 150;
    var nodes = [], spikes = [];
    var running = false, visible = true, raf = 0, lastT = 0, lastSpike = 0, nextGap = 600;
    var pointer = { x: -9999, y: -9999 };

    function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
    function mix(p, q, t) { return [0, 1, 2].map(function (i) { return Math.round(p[i] + (q[i] - p[i]) * t); }); }
    function readTheme() {
      pal = document.documentElement.getAttribute('data-theme') === 'light' ? PALETTES.light : PALETTES.dark;
    }

    function makeNode() {
      var speed = 0.1 + Math.random() * 0.18;
      var angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        r: 1 + Math.random() * 1.6, c: Math.random(), flash: 0
      };
    }

    function resize() {
      var rect = hero.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var mobile = W < 768;
      maxD = mobile ? 110 : 150;
      var count = Math.round(Math.max(24, Math.min(mobile ? 34 : 80, (W * H) / 16000)));
      nodes = nodes.slice(0, count);
      while (nodes.length < count) nodes.push(makeNode());
      nodes.forEach(function (n) {
        if (n.x > W) n.x = Math.random() * W;
        if (n.y > H) n.y = Math.random() * H;
      });
      spikes = [];
      if (!running) draw();
    }

    function step(dt) {
      var k = dt / 16.67;
      nodes.forEach(function (n) {
        n.x += n.vx * k; n.y += n.vy * k;
        if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
        if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
        n.flash *= 0.94;
      });
      spikes = spikes.filter(function (s) {
        s.t += dt / s.dur;
        if (s.t >= 1) { s.to.flash = 1; return false; }
        return true;
      });
    }

    // Fire a "spike" along a random nearby connection every 400–900ms
    function maybeSpawn(now) {
      if (now - lastSpike < nextGap || !nodes.length) return;
      lastSpike = now;
      nextGap = 400 + Math.random() * 500;
      for (var tries = 0; tries < 12; tries++) {
        var a = nodes[(Math.random() * nodes.length) | 0];
        var best = null, bestD = maxD;
        for (var j = 0; j < nodes.length; j++) {
          var b = nodes[j];
          if (b === a) continue;
          var d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < bestD && Math.random() < 0.5) { best = b; bestD = d; }
        }
        if (best) {
          a.flash = 1;
          spikes.push({ from: a, to: best, t: 0, dur: 500 + bestD * 4 });
          return;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var md2 = maxD * maxD;
      var i, j, a, b, dx, dy, d2;

      ctx.lineWidth = 1;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          dx = a.x - b.x; dy = a.y - b.y; d2 = dx * dx + dy * dy;
          if (d2 > md2) continue;
          ctx.strokeStyle = rgba(pal.line, ((1 - Math.sqrt(d2) / maxD) * pal.lineAlpha).toFixed(3));
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // Lines from the cursor to nearby neurons
      if (pointer.x > -1) {
        nodes.forEach(function (n) {
          var d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < 160) {
            ctx.strokeStyle = rgba(pal.a, ((1 - d / 160) * 0.35).toFixed(3));
            ctx.beginPath(); ctx.moveTo(pointer.x, pointer.y); ctx.lineTo(n.x, n.y); ctx.stroke();
          }
        });
      }

      spikes.forEach(function (s) {
        var x = s.from.x + (s.to.x - s.from.x) * s.t;
        var y = s.from.y + (s.to.y - s.from.y) * s.t;
        var tail = Math.max(0, s.t - 0.25);
        var col = mix(pal.a, pal.b, s.t);
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = rgba(col, 0.55);
        ctx.beginPath();
        ctx.moveTo(s.from.x + (s.to.x - s.from.x) * tail, s.from.y + (s.to.y - s.from.y) * tail);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = rgba(col, 0.18);
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(col, 0.95);
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill();
      });

      nodes.forEach(function (n) {
        var near = Math.max(0, 1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / 160);
        var glow = Math.max(near, n.flash);
        var col = mix(pal.a, pal.b, n.c);
        if (glow > 0.05) {
          ctx.fillStyle = rgba(col, (0.22 * glow).toFixed(3));
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 8 * glow, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = rgba(col, (0.55 + 0.45 * glow).toFixed(3));
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + glow * 1.2, 0, Math.PI * 2); ctx.fill();
      });
    }

    function loop(t) {
      raf = 0;
      if (!running) return;
      var dt = Math.min(50, t - (lastT || t));
      lastT = t;
      step(dt);
      maybeSpawn(t);
      draw();
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running) return;
      running = true; lastT = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    function update() {
      if (visible && !document.hidden && !reduceMotion.matches) start();
      else { stop(); draw(); }
    }

    readTheme();
    resize();

    if ('ResizeObserver' in window) {
      var pending = false;
      new ResizeObserver(function () {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () { pending = false; resize(); });
      }).observe(hero);
    } else {
      window.addEventListener('resize', resize, { passive: true });
    }

    if (hasIO) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        update();
      }).observe(hero);
    }
    document.addEventListener('visibilitychange', update);
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', update);
    window.addEventListener('themechange', function () { readTheme(); if (!running) draw(); });

    if (finePointer.matches) {
      hero.addEventListener('pointermove', function (e) {
        var rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
      }, { passive: true });
      hero.addEventListener('pointerleave', function () { pointer.x = pointer.y = -9999; });
    }

    update();
  }

  /* ---------- Project filters ---------- */
  function initFilters() {
    var buttons = $$('.filter');
    var cards = $$('.project');
    var timer = 0;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter;
        function matches(card) { return filter === 'all' || card.dataset.group === filter; }
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });

        // 1) fade out cards that are leaving, 2) swap the layout, 3) fade in arrivals
        cards.forEach(function (card) { if (!matches(card)) card.classList.add('is-filtered-out'); });
        clearTimeout(timer);
        timer = setTimeout(function () {
          var arriving = [];
          cards.forEach(function (card) {
            if (!matches(card)) { card.hidden = true; return; }
            card.classList.add('is-in');
            if (card.hidden) {
              card.hidden = false;
              card.classList.add('is-filtered-out');
              arriving.push(card);
            } else {
              card.classList.remove('is-filtered-out');
            }
          });
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              arriving.forEach(function (card) { card.classList.remove('is-filtered-out'); });
            });
          });
        }, reduceMotion.matches ? 0 : 220);
      });
    });
  }

  /* ---------- Project cards: cursor glow + gentle tilt (fine pointers only) ---------- */
  function initCardFx() {
    if (!finePointer.matches) return;
    $$('.project').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        if (reduceMotion.matches || card.classList.contains('is-filtered-out')) return;
        var rx = (y / rect.height - 0.5) * -4;
        var ry = (x / rect.width - 0.5) * 4;
        card.style.transition = 'transform 120ms ease-out, border-color .4s, box-shadow .4s';
        card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-2px)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transition = 'transform 500ms cubic-bezier(.2,.8,.2,1), border-color .4s, box-shadow .4s';
        card.style.transform = '';
        setTimeout(function () { card.style.transition = ''; }, 500);
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!finePointer.matches || reduceMotion.matches) return;
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = 'translate(' + (dx * 0.18).toFixed(1) + 'px,' + (dy * 0.3).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- Copy email (address assembled here, not in the HTML) ---------- */
  function initCopyEmail() {
    var btn = $('[data-copy-email]');
    var toast = $('.toast');
    var label = $('.toast-text');
    if (!btn) return;
    var address = btn.dataset.user + '@' + btn.dataset.domain;
    var hideTimer = 0;
    btn.hidden = false;

    function show(message) {
      if (!toast) return;
      label.textContent = message;
      toast.classList.add('is-visible');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2400);
    }

    btn.addEventListener('click', function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(address).then(function () {
          show('Copied ' + address);
        }, function () { window.location.href = 'mailto:' + address; });
      } else {
        window.location.href = 'mailto:' + address;
      }
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var btn = $('.menu-btn');
    var menu = $('#mobile-menu');
    if (!btn || !menu) return;
    var links = $$('a', menu);
    var behind = [$('#main'), $('.footer')];
    var isOpen = false;

    function setOpen(open) {
      isOpen = open;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      menu.inert = !open;
      behind.forEach(function (el) { if (el) el.inert = open; });
      if (open && links[0]) requestAnimationFrame(function () { links[0].focus(); });
    }

    menu.inert = true;
    btn.addEventListener('click', function () { setOpen(!isOpen); });
    links.forEach(function (link) { link.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) { setOpen(false); btn.focus(); }
    });
    window.addEventListener('resize', function () {
      if (isOpen && window.innerWidth > 1024) setOpen(false);
    }, { passive: true });
  }

  /* ---------- Boot ---------- */
  initSplitTitle();
  initTheme();
  initScroll();
  initScrollSpy();
  initReveal();
  initCounters();
  initEEG();
  initFilters();
  initCardFx();
  initMagnetic();
  initCopyEmail();
  initMobileMenu();

  // The canvas is decorative, so start it after everything else has loaded
  if (document.readyState === 'complete') initNeuralCanvas();
  else window.addEventListener('load', initNeuralCanvas);
})();
