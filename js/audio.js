/* 音效：Web Audio 程式合成的柔和音效。背景音樂目前關閉（BGM_ENABLED=false），等 Suno 音樂放入 assets/audio/bgm_<任務id>.mp3 後再開。 */
(function () {
  'use strict';
  var ctx = null, master = null, muted = false, bgmNode = null, bgmId = null, timer = null, audioEl = null;
  try { muted = localStorage.getItem('gr-muted') === '1'; } catch (e) {}

  function ac() {
    if (!ctx) {
      var C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
      ctx = new C(); master = ctx.createGain(); master.gain.value = muted ? 0 : 1; master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  /* 所有正在（或即將）發聲的來源都登記在這裡，靜音時一次全部強制停止 */
  var live = [];
  function track(src) { live.push(src); src.onended = function () { var i = live.indexOf(src); if (i >= 0) live.splice(i, 1); }; return src; }
  function killAll() { var l = live.slice(); live.length = 0; l.forEach(function (n) { try { n.onended = null; n.stop(0); } catch (e) {} try { n.disconnect(); } catch (e) {} }); }
  function tone(freq, t0, dur, type, vol, dest) {
    var c = ac(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(dest || master); track(o); o.start(t0); o.stop(t0 + dur + 0.05);
  }
  /* 柔和音效：只用正弦波、緩起緩收、音量低，沒有尖銳的方波／鋸齒波 */
  function soft(freq, t0, dur, vol) {
    var c = ac(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = 'sine'; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.value = 1800;
    g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(f); f.connect(g); g.connect(master); track(o); o.start(t0); o.stop(t0 + dur + 0.05);
  }
  var SFX = {
    play: function (kind) {
      var c = ac(); if (!c || muted) return; var t = c.currentTime;
      if (kind === 'ok') { soft(523, t, .5, .07); soft(659, t + .12, .55, .07); }
      else if (kind === 'bad') { soft(294, t, .5, .07); soft(262, t + .18, .6, .06); }
      else if (kind === 'flip') {
        var n = c.createBufferSource(), len = Math.floor(c.sampleRate * .4), b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
        for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / len) * Math.pow(1 - i / len, 1.5);
        n.buffer = b; var f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400; var g = c.createGain(); g.gain.value = .09;
        n.connect(f); f.connect(g); g.connect(master); track(n); n.start(t);
      } else if (kind === 'win') { [523, 659, 784].forEach(function (f, i) { soft(f, t + i * .14, .8, .07); }); }
      else if (kind === 'click') { soft(660, t, .16, .04); }
    },
    isMuted: function () { return muted; },
    setMuted: function (m) {
      muted = !!m; try { localStorage.setItem('gr-muted', m ? '1' : '0'); } catch (e) {}
      if (muted) {
        /* 全靜音：立刻切斷所有聲音——音效來源全部停止、總音量歸零、背景音樂暫停 */
        killAll();
        if (master) { try { master.gain.cancelScheduledValues(0); } catch (e) {} master.gain.value = 0; }
        if (audioEl) { audioEl.muted = true; audioEl.pause(); }
      } else {
        if (master) master.gain.value = 1;
        if (audioEl) { audioEl.muted = false; var p = audioEl.play(); if (p && p.catch) p.catch(function () {}); }
        ac();
      }
    },
    /* 供檢查用：目前還有幾個音效來源在發聲 */
    activeCount: function () { return live.length; },
    unlock: function () { ac(); }
  };

  /* 每個故事一套音階與音色，慢慢隨機彈奏的「太空氛圍」 */
  var THEMES = {
    home: { root: 110, scale: [0, 3, 7, 10, 14], type: 'sine', tempo: 2600 },
    ingenuity: { root: 130.8, scale: [0, 2, 4, 7, 9, 12], type: 'triangle', tempo: 1700 }, /* 明亮、輕快的大調五聲 */
    opportunity: { root: 98, scale: [0, 2, 3, 7, 8, 12], type: 'sine', tempo: 2200 },      /* 孤獨、堅毅 */
    voyager: { root: 82.4, scale: [0, 5, 7, 12, 14, 19], type: 'sine', tempo: 3000 },     /* 空曠、遼闊 */
    mco: { root: 116.5, scale: [0, 1, 5, 7, 8, 12], type: 'triangle', tempo: 2000 },      /* 緊張、略帶不安 */
    record: { root: 146.8, scale: [0, 2, 4, 7, 9, 11, 14], type: 'sine', tempo: 1900 } /* 溫暖、充滿希望 */
  };
  function stopBgm() {
    if (timer) { clearInterval(timer); timer = null; }
    if (audioEl) { audioEl.pause(); audioEl = null; }
    bgmId = null;
  }
  function startSynth(th) {
    var c = ac(); if (!c) return;
    function note() {
      if (muted) return;
      var t = c.currentTime, deg = th.scale[Math.floor(Math.random() * th.scale.length)];
      var f = th.root * 2 * Math.pow(2, deg / 12);
      tone(f, t, 3.2, th.type, .07);
      if (Math.random() < .35) tone(f * 1.5, t + .4, 2.6, 'sine', .035);
    }
    tone(th.root, c.currentTime, 6, 'sine', .08); note();
    timer = setInterval(function () { if (Math.random() < .8) note(); if (Math.random() < .12) tone(th.root, c.currentTime, 6, 'sine', .07); }, th.tempo);
  }
  /* 背景音樂：全站共用一首《宇宙好奇號》（Suno），檔案放 assets/audio/bgm_main.mp3，換頁不會重新開始。
     找不到音檔就維持安靜。之後若要每個任務各一首，再改這裡。 */
  var BGM_ENABLED = true, BGM_VOL = .25, mainEl = null;
  var BGM = {
    play: function () {
      if (!BGM_ENABLED || mainEl || muted) return;
      /* 先建立、先登記，才不會因為連點兩次而同時有兩個播放器 */
      var a = new Audio('assets/audio/bgm_main.mp3'); a.loop = true; a.volume = BGM_VOL; a.muted = muted;
      mainEl = a; audioEl = a;
      var p = a.play();
      if (p && p.catch) p.catch(function () { if (mainEl === a) { mainEl = null; audioEl = null; } });   /* 被瀏覽器擋下（還沒點過畫面）就清掉，下次點擊再試 */
    },
    stop: stopBgm
  };
  window.SFX = SFX; window.BGM = BGM;
})();
