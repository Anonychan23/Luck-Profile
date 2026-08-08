/* =========================================================================
   ==============================
   EDIT YOUR INFORMATION HERE
   ==============================
   Everything below in SITE_DATA is meant to be edited by hand.
   Just change the text between the quotes " " — don't touch anything
   else on this page unless you're comfortable with code.
   ========================================================================= */
const SITE_DATA = {
  name: "Luck",
  fullName: "Lilkit Limjinda",
  age: "27",
  pronouns: "He/Him",
  status: "No lock Love",
  mood: "Secure Mode",
  currentlyListening: "3OH!3",
  bio: "เป็นเรื่องปกติที่คนพบกันเพื่อจาก",
  likes: "นอนหลับเต็มที่",
  dislikes: "นอนน้อยจนถึงไม่พอ",
  gender: "[Male]",
  height: "[182]",
  weight: "[70]",

  favoriteColor: "สีคราม , น้ำทะเลยามฝนตก , คลื่นและลม",
  favoriteFood: "อาหารขยะ Junk food อยู่ในช่วงพยายามกินคลีน",
  favoriteMusic: "แล้วแต่เวลานั้น",
  favoriteMovie: "แล้วแต่วันนั้น",
  currentObsession: "แล้วแต่ช่วงนั้น",
  randomFacts: "แล้วแต่ อะไรก็ได้",
  habits: "พูดน้อย เลือกจะพูดคนเดียวกับหัวไหล่ ใครว่าก็ดูเป็นมิตร แต่มักจะดูดุมากกว่าบ่อยครั้ง เพียงตาขีด ๆ ของเจ้าตัว",
  otherTmi: "Top Only / No lock Love",

  // Add or remove timeline entries freely.
  storyline: [
    { year: "200X", icon: "♡", heading: "BEGINNING", text: "เกิดในวันที่ 20/08 อายุราว 27 ปี เรียนจบนิเทศ ม.ดังย่านปทุมวัน ทำงานฟรีแลนซ์ควบคู่งานวาดเว็บตูนเป็นหลัก" },
    { year: "200X", icon: "✦", heading: "EVENT",     text: "เหตุเกิดเพราะความเหงา แค่เพื่อนบอกให้ออกไปใช้ชีวิตนอกผ้าห่ม เจ้าตัวกลับโวยวายเสียยกใหญ่ สุดท้ายก็หัดออกจากบ้านไปไหนมาไหนบ้าง" },
    { year: "200X", icon: "★", heading: "EVENT",     text: "ช่วงเวลาเปิดหูเปิดตา อายุ 27 ยังไม่มีแฟนอีกเหรอ!? ก็เออน่ะสิ—! จะให้ไปหาแฟนก็คงยาก งั้นมาเลย มาเที่ยวเยอะ ๆ ตามสภาพก็กลายเป็นคนมีสังคมไปโดยปริยาย Friday Night ทำไมต้องลำบากตัวเองด้วย" },
    { year: "NOW",  icon: "⌁", heading: "CURRENT STORY", text: "ชีวิตเรียบง่ายที่มีสีสันจาง ๆ เงินดี สังคมมี ทุกอย่างพร้อมยกเว้นเวลานอน" }
  ],

  // Add or remove warning bullet points freely.
  triggerWarnings: [
    "ตัวละคร : ไม่มี",
    "ผู้ปกครอง : งู / สัตว์เลื้อยคลาน",
    "ตัวคาร์แรคเตอร์สะดวกเล่นทุกรูท หากต้องการรูทแดง ขอสงวนไว้เพียงผู้ปกครองที่อายุ 20 ปีขึ้นไป หรือบรรลุนิติภาวะแล้ว"
  ],

  // MSN-style popup messages that appear randomly. Each links to a window id.
  popupMessages: [
    { text: "\"ยังอ่านอยู่เหรอ?\"", openTarget: "window-storyline" },
    { text: "\"ฮันแน่ อ่านล่ะสิ\"", openTarget: "window-tmi" },
    { text: "\"ว่าละ อย่าพึ่งตกใจนะ\"", openTarget: "window-profile" }
  ]
};
/* =========================================================================
   END OF EDITABLE SECTION — the rest of this file is site logic.
   ========================================================================= */


document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     STATE
     ------------------------------------------------------- */
  const state = {
    crtOn: true,
    motionOn: true,
    zTop: 60,
    openWindows: new Set()
  };

  /* -------------------------------------------------------
     PAGE 01 -> 02: PRESS START
     ------------------------------------------------------- */
  const startScreen = document.getElementById('start-screen');
  const bootScreen = document.getElementById('boot-screen');
  const mainSite = document.getElementById('main-site');
  const pressStartBtn = document.getElementById('press-start');
  const crtWrapper = document.getElementById('crt-wrapper');

  pressStartBtn.addEventListener('click', () => {
    pressStartBtn.classList.add('pressed');
    crtWrapper.classList.add('crt-glitch');

    playClickSound();

    setTimeout(() => {
      startScreen.classList.add('hidden');
      bootScreen.classList.remove('hidden');
      crtWrapper.classList.remove('crt-glitch');
      runBootSequence();
    }, 420);
  });

  // keyboard accessibility: allow Enter/Space (buttons do this natively,
  // but ensure focus styling doesn't get lost)
  pressStartBtn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.key === ' ') pressStartBtn.click();
  });

  function playClickSound(){
    try{
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }catch(e){ /* fail silently, sound is optional */ }
  }

  /* -------------------------------------------------------
     PAGE 02: BOOT SEQUENCE
     ------------------------------------------------------- */
  function runBootSequence(){
    const linesEl = document.getElementById('boot-lines');
    const barFill = document.getElementById('boot-bar-fill');
    const percentEl = document.getElementById('boot-percent');
    const statusEl = document.getElementById('boot-status');
    const welcomeEl = document.getElementById('boot-welcome');

    const lines = [
      "INITIALIZING MEMORY...",
      "LOADING PROFILE.EXE...",
      "LOADING STORYLINE.EXE...",
      "LOADING TMI.EXE...",
      "LOADING WARNING.EXE..."
    ];

    linesEl.innerHTML = '';
    barFill.style.width = '0%';
    percentEl.textContent = '0%';
    statusEl.classList.add('hidden');
    welcomeEl.classList.add('hidden');
    welcomeEl.textContent = '';

    let lineIndex = 0;
    function nextLine(){
      if(lineIndex >= lines.length){
        animateBootBar();
        return;
      }
      const p = document.createElement('p');
      p.className = 'line';
      linesEl.appendChild(p);
      typewrite(p, lines[lineIndex], 18, () => {
        lineIndex++;
        setTimeout(nextLine, 120);
      });
    }
    nextLine();

    function animateBootBar(){
      let pct = 0;
      const timer = setInterval(() => {
        pct += 4;
        if(pct >= 100){ pct = 100; clearInterval(timer); onBootComplete(); }
        barFill.style.width = pct + '%';
        percentEl.textContent = pct + '%';
      }, 40);
    }

    function onBootComplete(){
      statusEl.classList.remove('hidden');
      setTimeout(() => {
        welcomeEl.classList.remove('hidden');
        typewrite(welcomeEl, `WELCOME, ${SITE_DATA.name.toUpperCase()} ♡`, 30, () => {
          setTimeout(enterMainSite, 700);
        });
      }, 500);
    }
  }

  function typewrite(el, text, speed, done){
    if(!state.motionOn){ el.textContent = text; if(done) done(); return; }
    let i = 0;
    el.classList.add('cursor-blink');
    const timer = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if(i >= text.length){
        clearInterval(timer);
        el.classList.remove('cursor-blink');
        if(done) done();
      }
    }, speed);
  }

  function enterMainSite(){
    bootScreen.classList.add('hidden');
    mainSite.classList.remove('hidden');
    initMainSite();
  }

  /* -------------------------------------------------------
     PAGE 03: MAIN SITE INIT (runs once)
     ------------------------------------------------------- */
  let mainInitialized = false;
  function initMainSite(){
    if(mainInitialized) return;
    mainInitialized = true;

    populateProfile();
    populateStoryline();
    populateTMI();
    populateWarnings();
    setupNav();
    setupWindows();
    setupClock();
    setupBattery();
    setupVisitorCounter();
    setupCRTToggle();
    setupMotionToggle();
    setupEasterEggs();
    setupMSNPopups();
    setupMusicPlayer();
    setupSendMessage();
  }

  /* -------------------------------------------------------
     PROFILE
     ------------------------------------------------------- */
  function populateProfile(){
    document.querySelectorAll('[data-edit]').forEach(el => {
      const key = el.getAttribute('data-edit');
      if(SITE_DATA[key] !== undefined){
        el.textContent = SITE_DATA[key];
      }
    });
  }

  /* -------------------------------------------------------
     STORYLINE
     ------------------------------------------------------- */
  function populateStoryline(){
    const container = document.getElementById('storyline-timeline');
    container.innerHTML = '';
    SITE_DATA.storyline.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.setAttribute('data-icon', item.icon || '♡');
      div.style.setProperty('--rot', (i % 2 === 0 ? '-1deg' : '1deg'));
      div.innerHTML = `
        <p class="timeline-year">[ ${escapeHTML(item.year)} ]</p>
        <p class="timeline-heading">${escapeHTML(item.heading)}</p>
        <p class="timeline-text">${escapeHTML(item.text)}</p>
      `;
      container.appendChild(div);
    });
  }

  /* -------------------------------------------------------
     TMI
     ------------------------------------------------------- */
  function populateTMI(){
    const grid = document.getElementById('tmi-grid');
    const cards = [
      { label: 'FAVORITE COLOR', value: SITE_DATA.favoriteColor },
      { label: 'CURRENT SONG', value: SITE_DATA.currentlyListening },
      { label: 'FAVORITE FOOD', value: SITE_DATA.favoriteFood },
      { label: 'FAVORITE MUSIC', value: SITE_DATA.favoriteMusic },
      { label: 'FAVORITE MOVIE', value: SITE_DATA.favoriteMovie },
      { label: 'CURRENT OBSESSION', value: SITE_DATA.currentObsession },
      { label: 'RANDOM FACT', value: SITE_DATA.randomFacts },
      { label: 'HABITS', value: SITE_DATA.habits },
      { label: 'LIKES', value: SITE_DATA.likes },
      { label: 'DISLIKES', value: SITE_DATA.dislikes },
      { label: 'OTHER', value: SITE_DATA.otherTmi }
    ];
    grid.innerHTML = '';
    cards.forEach(c => {
      const div = document.createElement('div');
      div.className = 'tmi-card';
      div.innerHTML = `<p class="tmi-label">♡ ${escapeHTML(c.label)}</p><p class="tmi-value">${escapeHTML(c.value)}</p>`;
      grid.appendChild(div);
    });
  }

  /* -------------------------------------------------------
     WARNINGS
     ------------------------------------------------------- */
  function populateWarnings(){
    const list = document.getElementById('warning-list');
    list.innerHTML = '';
    SITE_DATA.triggerWarnings.forEach(w => {
      const li = document.createElement('li');
      li.textContent = w;
      list.appendChild(li);
    });
    const btn = document.getElementById('warning-understand');
    const content = document.getElementById('warning-content');
    btn.addEventListener('click', () => {
      content.classList.toggle('hidden');
    });
  }

  /* -------------------------------------------------------
     NAV + DESKTOP ICONS -> open windows
     ------------------------------------------------------- */
  function setupNav(){
    document.querySelectorAll('[data-open]').forEach(btn => {
      btn.addEventListener('click', () => openWindow(btn.getAttribute('data-open')));
    });
  }

  /* -------------------------------------------------------
     WINDOWS: open / close / drag / focus
     ------------------------------------------------------- */
  function setupWindows(){
    const windows = document.querySelectorAll('.win');
    let offsetIndex = 0;

    windows.forEach(win => {
      // stagger initial positions on desktop
      if(window.innerWidth > 720){
        win.style.top = (30 + offsetIndex * 26) + 'px';
        win.style.left = (30 + offsetIndex * 34) + 'px';
        offsetIndex++;
      }

      const titlebar = win.querySelector('.win-titlebar');
      const closeBtn = win.querySelector('.win-btn.close');
      const minBtn = win.querySelector('.win-btn.min');
      const maxBtn = win.querySelector('.win-btn.max');

      closeBtn.addEventListener('click', () => closeWindow(win));
      minBtn.addEventListener('click', () => closeWindow(win));
      maxBtn.addEventListener('click', () => {
        win.classList.toggle('maximized');
        if(win.classList.contains('maximized')){
          win.style.width = 'min(720px,94vw)';
        } else {
          win.style.width = '';
        }
      });

      win.addEventListener('mousedown', () => bringToFront(win));
      win.addEventListener('touchstart', () => bringToFront(win), { passive:true });

      // dragging (desktop only)
      let dragging = false, startX, startY, origX, origY;
      titlebar.addEventListener('mousedown', (e) => {
        if(window.innerWidth <= 720) return; // stacked on mobile, no drag
        dragging = true;
        bringToFront(win);
        startX = e.clientX; startY = e.clientY;
        const rect = win.getBoundingClientRect();
        const parentRect = win.parentElement.getBoundingClientRect();
        origX = rect.left - parentRect.left;
        origY = rect.top - parentRect.top;
        e.preventDefault();
      });
      document.addEventListener('mousemove', (e) => {
        if(!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        win.style.left = Math.max(0, origX + dx) + 'px';
        win.style.top = Math.max(0, origY + dy) + 'px';
      });
      document.addEventListener('mouseup', () => { dragging = false; });
    });
  }

  function bringToFront(win){
    document.querySelectorAll('.win').forEach(w => w.classList.remove('front'));
    state.zTop++;
    win.style.zIndex = state.zTop;
    win.classList.add('front');
  }

  function openWindow(id){
    const win = document.getElementById(id);
    if(!win) return;
    win.classList.add('open');
    bringToFront(win);
    if(state.motionOn){
      win.classList.remove('opening');
      void win.offsetWidth; // reflow to restart animation
      win.classList.add('opening');
    }
    state.openWindows.add(id);
  }

  function closeWindow(win){
    if(state.motionOn){
      win.classList.add('closing');
      setTimeout(() => {
        win.classList.remove('open', 'closing', 'opening');
      }, 180);
    } else {
      win.classList.remove('open');
    }
    state.openWindows.delete(win.id);
  }

  function shakeWindow(win){
    if(!state.motionOn) return;
    win.classList.remove('shake');
    void win.offsetWidth;
    win.classList.add('shake');
  }

  /* -------------------------------------------------------
     CLOCK
     ------------------------------------------------------- */
  function setupClock(){
    const clockEl = document.getElementById('clock');
    function tick(){
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2,'0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12; if(h === 0) h = 12;
      clockEl.textContent = `${h}:${m} ${ampm}`;
    }
    tick();
    setInterval(tick, 1000 * 10);

    clockEl.addEventListener('click', () => showEggToast('TIME IS A SOCIAL CONSTRUCT.'));
  }

  /* -------------------------------------------------------
     BATTERY (decorative, slowly drifts)
     ------------------------------------------------------- */
  function setupBattery(){
    const fill = document.getElementById('battery-fill');
    const percentEl = document.getElementById('battery-percent');
    let pct = 76;
    let dir = -1;
    setInterval(() => {
      pct += dir;
      if(pct <= 20){ dir = 1; }
      if(pct >= 90){ dir = -1; }
      fill.style.width = pct + '%';
      percentEl.textContent = pct + '%';
    }, 4000);

    document.getElementById('battery-click').addEventListener('click', () => {
      showEggToast("please don't unplug me...");
    });
  }

  /* -------------------------------------------------------
     VISITOR COUNTER
     ------------------------------------------------------- */
  function setupVisitorCounter(){
    const target = 127;
    animateCount(document.getElementById('visitor-count'), target, 6);
    animateCount(document.getElementById('visitor-count-2'), target, 6);
  }
  function animateCount(el, target, digits){
    if(!el) return;
    let current = 0;
    const step = Math.max(1, Math.round(target / 20));
    const timer = setInterval(() => {
      current += step;
      if(current >= target){ current = target; clearInterval(timer); }
      el.textContent = String(current).padStart(digits, '0');
    }, 40);
  }

  /* -------------------------------------------------------
     CRT TOGGLE
     ------------------------------------------------------- */
  function setupCRTToggle(){
    const btn = document.getElementById('toggle-crt');
    btn.addEventListener('click', () => {
      state.crtOn = !state.crtOn;
      crtWrapper.classList.toggle('crt-on', state.crtOn);
      btn.textContent = state.crtOn ? 'CRT: ON' : 'CRT: OFF';
      btn.classList.toggle('off', !state.crtOn);
    });
  }

  /* -------------------------------------------------------
     REDUCE MOTION TOGGLE
     ------------------------------------------------------- */
  function setupMotionToggle(){
    const btn = document.getElementById('toggle-motion');
    // respect OS-level preference on first load
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      state.motionOn = false;
      document.body.classList.add('motion-off');
      btn.textContent = 'MOTION: OFF';
      btn.classList.add('off');
    }
    btn.addEventListener('click', () => {
      state.motionOn = !state.motionOn;
      document.body.classList.toggle('motion-off', !state.motionOn);
      btn.textContent = state.motionOn ? 'MOTION: ON' : 'MOTION: OFF';
      btn.classList.toggle('off', !state.motionOn);
    });
  }

  /* -------------------------------------------------------
     EASTER EGGS
     ------------------------------------------------------- */
  function showEggToast(msg){
    const toast = document.getElementById('egg-toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    clearTimeout(showEggToast._t);
    showEggToast._t = setTimeout(() => toast.classList.add('hidden'), 2600);
  }

  function setupEasterEggs(){
    // 1. logo click x5
    const logo = document.getElementById('logo-click');
    let logoClicks = 0;
    logo.addEventListener('click', () => {
      logoClicks++;
      if(logoClicks >= 5){
        logoClicks = 0;
        showEggToast("you found luck's secret ♡ hi!!");
      }
    });

    // 2. pixel hearts explode on click
    document.querySelectorAll('.deco.heart').forEach(heart => {
      heart.style.pointerEvents = 'auto';
      heart.style.cursor = 'pointer';
      heart.addEventListener('click', () => explodeHeart(heart));
    });

    // 3. battery click -> handled in setupBattery()

    // 4. memory click
    document.getElementById('memory-click').addEventListener('click', () => {
      showEggToast("that's all i have.");
    });

    // 5. clock click -> handled in setupClock()

    // Konami-style secret sequence: ↑ ↑ ↓ ↓ ← → ← → (simplified, keys only)
    const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];
    let progress = 0;
    document.addEventListener('keydown', (e) => {
      if(e.key === sequence[progress]){
        progress++;
        if(progress === sequence.length){
          progress = 0;
          triggerCheatCode();
        }
      } else {
        progress = (e.key === sequence[0]) ? 1 : 0;
      }
    });
  }

  function explodeHeart(heart){
    if(!state.motionOn) return;
    const rect = heart.getBoundingClientRect();
    for(let i = 0; i < 6; i++){
      const bit = document.createElement('span');
      bit.textContent = '♡';
      bit.style.position = 'fixed';
      bit.style.left = rect.left + 'px';
      bit.style.top = rect.top + 'px';
      bit.style.color = '#ff9dc4';
      bit.style.fontSize = '12px';
      bit.style.pointerEvents = 'none';
      bit.style.zIndex = 500;
      bit.style.transition = 'transform .5s ease, opacity .5s ease';
      document.body.appendChild(bit);
      const angle = (Math.PI * 2 * i) / 6;
      const dist = 40;
      requestAnimationFrame(() => {
        bit.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
        bit.style.opacity = '0';
      });
      setTimeout(() => bit.remove(), 520);
    }
  }

  function triggerCheatCode(){
    showEggToast('CHEAT CODE ACCEPTED ♡');
    document.body.classList.add('cheat-flash');
    setTimeout(() => document.body.classList.remove('cheat-flash'), 1200);
  }

  /* -------------------------------------------------------
     MSN-STYLE RANDOM NOTIFICATION POPUPS
     ------------------------------------------------------- */
  function setupMSNPopups(){
    const popup = document.getElementById('msn-popup');
    const textEl = document.getElementById('msn-popup-text');
    const openBtn = document.getElementById('msn-popup-open');
    const closeBtn = document.getElementById('msn-popup-close');
    const closeX = document.getElementById('msn-popup-close-x');
    let currentTarget = null;

    function showPopup(){
      if(!popup.classList.contains('hidden')) return; // don't stack
      const msg = SITE_DATA.popupMessages[Math.floor(Math.random() * SITE_DATA.popupMessages.length)];
      textEl.textContent = msg.text;
      currentTarget = msg.openTarget;
      popup.classList.remove('hidden');
    }
    function hidePopup(){
      popup.classList.add('hidden');
    }

    openBtn.addEventListener('click', () => {
      if(currentTarget) openWindow(currentTarget);
      hidePopup();
    });
    closeBtn.addEventListener('click', hidePopup);
    closeX.addEventListener('click', hidePopup);

    // first popup after a delay, then periodically
    setTimeout(showPopup, 14000);
    setInterval(showPopup, 45000);
  }

  function setupSendMessage(){
    document.getElementById('send-message-btn').addEventListener('click', () => {
      showEggToast('message sent into the void ♡');
    });
  }

  /* -------------------------------------------------------
     MUSIC PLAYER (optional assets/music.mp3)
     ------------------------------------------------------- */
  function setupMusicPlayer(){
    const audio = new Audio('assets/music.mp3');
    const statusEl = document.getElementById('mp-status');
    const timeEl = document.getElementById('mp-time');
    const barFill = document.getElementById('mp-bar-fill');
    const playBtn = document.getElementById('mp-play');
    const stopBtn = document.getElementById('mp-stop');
    const prevBtn = document.getElementById('mp-prev');
    let ready = false;

    audio.addEventListener('canplaythrough', () => {
      ready = true;
      statusEl.textContent = '♫ NOW PLAYING';
    });
    audio.addEventListener('error', () => {
      ready = false;
      statusEl.textContent = 'NO MEDIA INSERTED';
    });
    audio.addEventListener('timeupdate', () => {
      if(!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      barFill.style.width = pct + '%';
      timeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    playBtn.addEventListener('click', () => {
      if(!ready) { statusEl.textContent = 'NO MEDIA INSERTED'; return; }
      if(audio.paused){ audio.play(); playBtn.textContent = '❚❚'; }
      else { audio.pause(); playBtn.textContent = '▶'; }
    });
    stopBtn.addEventListener('click', () => {
      audio.pause(); audio.currentTime = 0;
      playBtn.textContent = '▶';
      barFill.style.width = '0%';
    });
    prevBtn.addEventListener('click', () => {
      audio.currentTime = 0;
    });
  }

  function formatTime(sec){
    if(!isFinite(sec)) return '00:00';
    const m = Math.floor(sec / 60).toString().padStart(2,'0');
    const s = Math.floor(sec % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
  }

  /* -------------------------------------------------------
     UTIL
     ------------------------------------------------------- */
  function escapeHTML(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

});
