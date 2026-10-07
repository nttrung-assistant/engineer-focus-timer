// The entire app ships as one static HTML string. No build step, no assets,
// no external requests — everything (styles, script, icons) is inline.
// Note: the inline script deliberately avoids template literals so this file
// can stay a single plain template literal.

export const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="description" content="A quiet pomodoro focus timer. Dark mode, keyboard shortcuts, no tracking.">
<title>Focus — a quiet pomodoro timer</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='55' r='38' fill='%23e4572e'/%3E%3Crect x='46' y='6' width='8' height='18' rx='4' fill='%232f7d5c'/%3E%3C/svg%3E">
<style>
  :root {
    --bg: #f3f1ec;
    --card: #ffffff;
    --ink: #1f1d1a;
    --muted: #71695f;
    --accent: #e4572e;
    --accent-ink: #ffffff;
    --track: color-mix(in srgb, var(--ink) 10%, transparent);
    --line: color-mix(in srgb, var(--ink) 12%, transparent);
    --shadow: 0 24px 60px -30px color-mix(in srgb, var(--ink) 35%, transparent);
    --radius: 28px;
  }
  html[data-theme="dark"] {
    --bg: #131519;
    --card: #1c1f25;
    --ink: #ece9e3;
    --muted: #9b968c;
    --accent: #ff7a55;
    --accent-ink: #241109;
    --shadow: 0 24px 60px -24px #000c;
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    display: grid;
    place-items: center;
    background:
      radial-gradient(1200px 600px at 85% -10%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 60%),
      radial-gradient(900px 500px at -10% 110%, color-mix(in srgb, #2f7d5c 10%, transparent), transparent 55%),
      var(--bg);
    color: var(--ink);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: background-color .35s ease, color .35s ease;
    padding: 24px;
  }
  .card {
    width: min(430px, 100%);
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 26px 26px 20px;
    animation: rise .5s cubic-bezier(.2,.7,.2,1) both;
    transition: background-color .35s ease, border-color .35s ease;
  }
  @keyframes rise { from { opacity: 0; transform: translateY(14px); } }

  .top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .brand { display: flex; align-items: center; gap: 9px; font-weight: 700; letter-spacing: .01em; }
  .brand .leaf { width: 20px; height: 20px; color: var(--accent); }
  .iconbtns { display: flex; gap: 8px; }
  .iconbtn {
    width: 36px; height: 36px; border-radius: 12px;
    border: 1px solid var(--line); background: transparent; color: var(--muted);
    display: grid; place-items: center; cursor: pointer;
    transition: color .2s, border-color .2s, transform .15s, background .2s;
  }
  .iconbtn:hover { color: var(--ink); border-color: color-mix(in srgb, var(--ink) 30%, transparent); }
  .iconbtn:active { transform: scale(.93); }
  .iconbtn[aria-pressed="false"] { opacity: .45; }
  .iconbtn svg { width: 17px; height: 17px; }
  .icon-sun { display: none; }
  html[data-theme="dark"] .icon-sun { display: block; }
  html[data-theme="dark"] .icon-moon { display: none; }

  .modes { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; background: var(--track); padding: 4px; border-radius: 14px; margin-bottom: 8px; }
  .modes button {
    border: 0; background: transparent; color: var(--muted);
    font: inherit; font-size: 12.5px; font-weight: 650; letter-spacing: .02em;
    padding: 8px 4px; border-radius: 10px; cursor: pointer; transition: color .2s, background .2s;
  }
  .modes button[aria-selected="true"] { background: var(--card); color: var(--ink); box-shadow: 0 1px 4px color-mix(in srgb, var(--ink) 18%, transparent); }

  .dial { position: relative; display: grid; place-items: center; margin: 6px 0 2px; }
  .dial svg { width: min(72vw, 292px); height: auto; display: block; transform: rotate(-90deg); }
  .dial .track { fill: none; stroke: var(--track); stroke-width: 12; }
  .dial .ring {
    fill: none; stroke: var(--accent); stroke-width: 12; stroke-linecap: round;
    stroke-dasharray: 879.646; stroke-dashoffset: 0;
    transition: stroke-dashoffset .25s linear, stroke .35s ease;
  }
  .dial .ring.break { stroke: #2f9d6f; }
  .readout { position: absolute; text-align: center; }
  #time {
    font-size: clamp(56px, 16vw, 74px); font-weight: 700; letter-spacing: -.03em;
    font-variant-numeric: tabular-nums; line-height: 1;
  }
  #phase { margin-top: 7px; color: var(--muted); font-size: 13.5px; font-weight: 550; min-height: 18px; transition: opacity .3s; }
  .flash #phase { animation: fadein .3s ease; }
  @keyframes fadein { from { opacity: 0; transform: translateY(3px); } }

  .actions { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 14px 0 6px; }
  .actions button {
    font: inherit; font-weight: 650; cursor: pointer; border-radius: 14px;
    transition: transform .15s, box-shadow .2s, background .2s, color .2s, border-color .2s;
  }
  .actions button:active { transform: scale(.95); }
  .ghost { padding: 11px 18px; border: 1px solid var(--line); background: transparent; color: var(--muted); }
  .ghost:hover { color: var(--ink); border-color: color-mix(in srgb, var(--ink) 30%, transparent); }
  .primary {
    padding: 13px 44px; border: 0; background: var(--accent); color: var(--accent-ink);
    font-size: 15.5px; box-shadow: 0 10px 24px -12px color-mix(in srgb, var(--accent) 70%, transparent);
  }
  .primary:hover { filter: brightness(1.05); }

  .dots { display: flex; justify-content: center; gap: 9px; margin: 8px 0 2px; }
  .dots i {
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--track); border: 1px solid var(--line); transition: background .3s, transform .3s;
  }
  .dots i.done { background: var(--accent); border-color: transparent; transform: scale(1.15); }

  details.settings { margin-top: 14px; border-top: 1px solid var(--line); padding-top: 12px; }
  details.settings summary {
    cursor: pointer; color: var(--muted); font-size: 12.5px; font-weight: 650;
    letter-spacing: .04em; text-transform: uppercase; list-style: none;
  }
  details.settings summary::after { content: " +"; }
  details.settings[open] summary::after { content: " −"; }
  .fields { display: flex; gap: 18px; justify-content: center; margin-top: 12px; }
  .fields label { display: grid; gap: 5px; font-size: 12px; color: var(--muted); text-align: center; font-weight: 600; }
  .fields input {
    width: 64px; padding: 8px; text-align: center; font: inherit; font-weight: 650; color: var(--ink);
    background: var(--track); border: 1px solid var(--line); border-radius: 10px; outline: none;
  }
  .fields input:focus { border-color: var(--accent); }

  footer { margin-top: 16px; text-align: center; color: var(--muted); font-size: 12px; }
  footer kbd {
    font: inherit; font-size: 11px; padding: 2px 6px; border-radius: 6px;
    border: 1px solid var(--line); background: var(--track);
  }
  @media (prefers-reduced-motion: reduce) {
    .card { animation: none; }
    .dial .ring { transition: none; }
  }
</style>
</head>
<body>
<main class="card" id="app">
  <div class="top">
    <div class="brand">
      <svg class="leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 21V11"/><path d="M12 11c0-4 3-7 8-7 0 4-3 7-8 7z"/><path d="M12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/></svg>
      Focus
    </div>
    <div class="iconbtns">
      <button class="iconbtn" id="sound" aria-pressed="true" aria-label="Toggle sound" title="Toggle sound">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>
      </button>
      <button class="iconbtn" id="theme" aria-label="Toggle dark mode" title="Toggle theme (T)">
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      </button>
    </div>
  </div>

  <nav class="modes" role="tablist" aria-label="Timer mode">
    <button data-mode="focus"  aria-selected="true"  role="tab">Focus</button>
    <button data-mode="short"  aria-selected="false" role="tab">Short break</button>
    <button data-mode="long"   aria-selected="false" role="tab">Long break</button>
  </nav>

  <div class="dial" id="dial">
    <svg viewBox="0 0 320 320" aria-hidden="true">
      <circle class="track" cx="160" cy="160" r="140"/>
      <circle class="ring" id="ring" cx="160" cy="160" r="140"/>
    </svg>
    <div class="readout">
      <div id="time" role="timer" aria-live="off">25:00</div>
      <div id="phase">Ready when you are</div>
    </div>
  </div>

  <div class="actions">
    <button class="ghost" id="reset">Reset</button>
    <button class="primary" id="start">Start</button>
    <button class="ghost" id="skip">Skip</button>
  </div>

  <div class="dots" id="dots" aria-label="Focus sessions until long break"><i></i><i></i><i></i><i></i></div>

  <details class="settings">
    <summary>Session lengths</summary>
    <div class="fields">
      <label>Focus <input id="dur-focus" type="number" min="1" max="90" value="25"></label>
      <label>Short <input id="dur-short" type="number" min="1" max="30" value="5"></label>
      <label>Long <input id="dur-long" type="number" min="1" max="60" value="15"></label>
    </div>
  </details>

  <footer><kbd>Space</kbd> start &middot; <kbd>R</kbd> reset &middot; <kbd>T</kbd> theme &middot; 4 focus rounds then a long break</footer>
</main>

<script>
(function () {
  'use strict';
  var RING = 2 * Math.PI * 140;
  var MODES = {
    focus: { label: 'Focus', hint: 'Deep work. One thing only.' },
    short: { label: 'Short break', hint: 'Stretch. Look out the window.' },
    long:  { label: 'Long break', hint: 'Rest well. You earned it.' }
  };

  var saved = {};
  try { saved = JSON.parse(localStorage.getItem('ft.settings') || '{}'); } catch (e) { saved = {}; }
  function save() {
    try { localStorage.setItem('ft.settings', JSON.stringify(saved)); } catch (e) {}
  }

  var $ = function (id) { return document.getElementById(id); };
  var els = {
    time: $('time'), phase: $('phase'), ring: $('ring'), start: $('start'),
    reset: $('reset'), skip: $('skip'), dial: $('dial'), dots: $('dots'),
    durFocus: $('dur-focus'), durShort: $('dur-short'), durLong: $('dur-long'),
    theme: $('theme'), sound: $('sound')
  };
  els.ring.style.strokeDasharray = String(RING);

  // --- theme ------------------------------------------------------------
  var theme = saved.theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme);
    saved.theme = theme;
    save();
  }
  applyTheme();
  els.theme.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  });

  // --- sound (tiny two-note chime, no assets) ----------------------------
  var sound = saved.sound !== false;
  els.sound.setAttribute('aria-pressed', String(sound));
  var audio = null;
  els.sound.addEventListener('click', function () {
    sound = !sound;
    els.sound.setAttribute('aria-pressed', String(sound));
    saved.sound = sound;
    save();
    if (sound) chime(true);
  });
  function chime(soft) {
    if (!sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      var now = audio.currentTime;
      [[523.25, 0], [783.99, soft ? 0.06 : 0.18]].forEach(function (n) {
        var osc = audio.createOscillator();
        var gain = audio.createGain();
        osc.type = 'sine';
        osc.frequency.value = n[0];
        gain.gain.setValueAtTime(0.0001, now + n[1]);
        gain.gain.exponentialRampToValueAtTime(soft ? 0.06 : 0.18, now + n[1] + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n[1] + 0.9);
        osc.connect(gain).connect(audio.destination);
        osc.start(now + n[1]);
        osc.stop(now + n[1] + 1);
      });
    } catch (e) { /* audio unavailable; stay silent */ }
  }

  // --- timer -------------------------------------------------------------
  var mode = 'focus';
  var durations = { focus: saved.focus || 25, short: saved.short || 5, long: saved.long || 15 };
  els.durFocus.value = durations.focus;
  els.durShort.value = durations.short;
  els.durLong.value = durations.long;
  ['focus', 'short', 'long'].forEach(function (m) {
    var input = m === 'focus' ? els.durFocus : m === 'short' ? els.durShort : els.durLong;
    input.addEventListener('change', function () {
      var v = Math.min(90, Math.max(1, parseInt(input.value, 10) || 25));
      input.value = v;
      durations[m] = v;
      saved[m] = v;
      save();
      if (m === mode && !running) resetTimer();
    });
  });

  var running = false;
  var endAt = 0;
  var remaining = durations[mode] * 60000;
  var focusDone = 0;
  var tickId = null;

  function fmt(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(s / 60);
    return (m < 10 ? '0' + m : m) + ':' + (s % 60 < 10 ? '0' + (s % 60) : s % 60);
  }

  function render() {
    els.time.textContent = fmt(remaining);
    var total = durations[mode] * 60000;
    els.ring.style.strokeDashoffset = String(RING * Math.max(0, Math.min(remaining, total)) / total);
    els.start.textContent = running ? 'Pause' : remaining === durations[mode] * 60000 ? 'Start' : 'Resume';
    var dots = els.dots.children;
    for (var i = 0; i < dots.length; i++) dots[i].className = i < focusDone ? 'done' : '';
    var untouched = !running && remaining === durations[mode] * 60000;
    document.title = untouched ? 'Focus — a quiet pomodoro timer'
      : fmt(remaining) + ' · ' + MODES[mode].label + ' — Focus';
  }

  function setMode(next, autostart) {
    mode = next;
    remaining = durations[mode] * 60000;
    endAt = 0;
    var btns = document.querySelectorAll('.modes button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-selected', String(btns[i].getAttribute('data-mode') === mode));
    }
    els.ring.classList.toggle('break', mode !== 'focus');
    els.phase.textContent = MODES[mode].hint;
    if (running) stop();
    if (autostart) start();
    render();
  }

  function start() {
    if (running) return;
    running = true;
    endAt = Date.now() + remaining;
    tickId = setInterval(tick, 200);
    render();
  }

  function stop() {
    running = false;
    if (tickId) clearInterval(tickId);
    tickId = null;
    remaining = Math.max(0, endAt - Date.now());
    render();
  }

  function resetTimer() {
    stop();
    remaining = durations[mode] * 60000;
    endAt = 0;
    render();
  }

  function tick() {
    remaining = endAt - Date.now();
    if (remaining <= 0) complete();
    else render();
  }

  function complete() {
    stop();
    remaining = 0;
    render();
    chime(false);
    var wasFocus = mode === 'focus';
    var next;
    if (wasFocus) {
      focusDone = (focusDone + 1) % 4;
      next = focusDone === 0 ? 'long' : 'short';
      els.phase.textContent = focusDone === 0 ? 'Four done. Long break.' : 'Nice. Take a short break.';
    } else {
      next = 'focus';
      els.phase.textContent = 'Back to it.';
    }
    els.dial.classList.remove('flash');
    void els.dial.offsetWidth; // restart the animation
    els.dial.classList.add('flash');
    setMode(next, true);
  }

  els.start.addEventListener('click', function () { running ? stop() : start(); });
  els.reset.addEventListener('click', resetTimer);
  els.skip.addEventListener('click', function () {
    if (mode === 'focus') { focusDone = (focusDone + 1) % 4; }
    setMode(mode === 'focus' ? (focusDone === 0 ? 'long' : 'short') : 'focus', false);
  });
  var modeBtns = document.querySelectorAll('.modes button');
  for (var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener('click', function (ev) {
      setMode(ev.currentTarget.getAttribute('data-mode'), false);
    });
  }

  document.addEventListener('keydown', function (ev) {
    if (ev.target && /input|textarea/i.test(ev.target.tagName)) return;
    if (ev.code === 'Space') { ev.preventDefault(); running ? stop() : start(); }
    else if (ev.key === 'r' || ev.key === 'R') { resetTimer(); }
    else if (ev.key === 't' || ev.key === 'T') { els.theme.click(); }
  });

  render();
})();
</script>
</body>
</html>
`;
