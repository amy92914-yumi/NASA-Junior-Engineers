/* 書本版外殼：封面 → 目錄 → 選角色 → 章節；翻頁、書籤、音效、背景音樂。
   重用：MISSIONS（任務內容）、ENGINES（關卡引擎）、Holo（3D）。 */
(function () {
  'use strict';
  var h = U.h, bi = U.bi, B = window.B, M = window.MISSIONS, IM = window.IMAGES;
  function T(zh, en) { return bi(B(zh, en)); }
  function Ti(zh, en) { return bi(B(zh, en), 'inline'); }

  /* ---------- 儲存 ---------- */
  var KEY = 'ghost-rovers-book-v1';
  var store = { lang: 'zh', role: {}, done: {} };
  try { var raw = localStorage.getItem(KEY); if (raw) { var o = JSON.parse(raw); store.lang = (o.lang === 'en') ? 'en' : 'zh';   /* 已取消「中 / EN」並列模式：舊紀錄一律改回中文 */ store.role = o.role || {}; store.done = o.done || {}; } } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }

  /* ---------- 還沒做專屬角色的任務：先用通用角色（難度標示，不寫年齡） ---------- */
  var DEFAULT_ROLES = [
    { level: 1, icon: '🧒', name: B('小小探險家', 'Junior Explorer'), job: B('入門', 'Starter'), stars: 1, bio: B('看圖、動手試試看。', 'Look, tap and try.') },
    { level: 2, icon: '🔧', name: B('任務技師', 'Mission Technician'), job: B('進階', 'Intermediate'), stars: 2, bio: B('做決定、簡單計算。', 'Make decisions, simple maths.') },
    { level: 3, icon: '📐', name: B('系統工程師', 'Systems Engineer'), job: B('高階', 'Advanced'), stars: 3, bio: B('用公式推理。', 'Reason with formulas.') },
    { level: 4, icon: '🛰️', name: B('飛行任務主管', 'Flight Director'), job: B('專家', 'Expert'), stars: 4, bio: B('整合條件、判斷風險。', 'Combine constraints, judge risk.') }
  ];
  function rolesOf(m) { return (window.ROLES && window.ROLES[m.id]) || DEFAULT_ROLES; }
  function roleOf(m) { var lv = store.role[m.id] || 1; return rolesOf(m).filter(function (r) { return r.level === lv; })[0] || rolesOf(m)[0]; }
  function nameOf(m) { return { zh: m.title.zh.split('：')[0], en: m.title.en.split(':')[0] }; }
  function mById(id) { return M.filter(function (m) { return m.id === id; })[0]; }
  function isDone(key) { return !!store.done[key]; }
  function markDone(key) { store.done[key] = true; save(); }
  function stars(n) { return new Array(n + 1).join('★') + new Array(5 - n).join('☆'); }

  /* ---------- 星空背景 ---------- */
  (function starfield() {
    var c = document.createElement('canvas'); document.getElementById('space').appendChild(c);
    function draw() {
      c.width = innerWidth; c.height = innerHeight; var g = c.getContext('2d'), n = Math.floor(innerWidth * innerHeight / 5000);
      for (var i = 0; i < n; i++) { var r = Math.random() * 1.4 + .2; g.globalAlpha = Math.random() * .8 + .15; g.fillStyle = Math.random() < .15 ? '#ffd9a0' : '#fff'; g.beginPath(); g.arc(Math.random() * c.width, Math.random() * c.height, r, 0, 7); g.fill(); }
    }
    draw(); window.addEventListener('resize', draw);
  })();

  /* ---------- 小工具 ---------- */
  /* 點圖放大：全螢幕蓋板，點任何地方或按 Esc 關閉 */
  function lightbox(content, cap) {
    var ov = h('div', { class: 'lightbox', role: 'dialog', 'aria-label': 'Enlarged image' });
    ov.appendChild(h('div', { class: 'lb-in' }, [content, cap ? cap.cloneNode(true) : null]));
    ov.appendChild(h('div', { class: 'lb-x' }, ['✕']));
    function close() { ov.remove(); document.removeEventListener('keydown', esc, true); }
    function esc(e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } }
    ov.addEventListener('click', close); document.addEventListener('keydown', esc, true);
    document.body.appendChild(ov); SFX.play('click');
  }
  function zoomable(media, makeBig, cap) {
    media.classList.add('zoomable'); media.setAttribute('tabindex', '0'); media.setAttribute('role', 'button'); media.setAttribute('aria-label', '點擊放大 Click to enlarge');
    media.appendChild(h('span', { class: 'zoomhint' }, ['🔍']));
    function go2() { lightbox(makeBig(), cap); }
    media.addEventListener('click', go2); media.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go2(); } });
    return media;
  }
  function svgBox(svg) { var box = h('div', { class: 'ill-svg' }); box.innerHTML = svg; return box; }
  function figure(id, rel) {
    var ill = window.ILLS && window.ILLS[id], cap, media;
    if (ill) {
      cap = h('figcaption', {}, [bi({ zh: ill.zh, en: ill.en }), h('span', { class: 'cr' }, [T('示意圖：本作品繪製，不是實景照片', 'Illustration drawn for this project, not a photo')])]);
      media = h('div', { class: 'fmedia' }, [svgBox(ill.svg)]);
      return h('figure', { class: 'fig' }, [media, cap]);
    }
    var im = IM[id]; if (!im) return h('div');
    cap = h('figcaption', {}, [bi({ zh: im.zh, en: im.en }), rel ? h('span', { class: 'cr rel' }, [T('相關的真實照片（不是這個零件的特寫）', 'A related real photo (not a close-up of this part)')]) : null,
      h('span', { class: 'cr' }, ['Credit: ' + im.credit + (im.src ? ' · Source: ' + im.src : ' · NASA ID: ' + id)])]);
    media = zoomable(h('div', { class: 'fmedia' }, [h('img', { class: 'bgimg', src: imgUrl(id), alt: '' }), h('img', { class: 'fgimg', src: imgUrl(id), alt: im.zh + ' / ' + im.en })]),
      function () { return h('img', { class: 'bigimg', src: imgUrl(id), alt: im.zh }); }, cap);
    return h('figure', { class: 'fig' }, [media, cap]);
  }
  /* 沒有照片時：用程式畫的虛擬人物插畫 */
  function sceneFig(kind, role, ctx, zh, en) {
    var svg = window.AV.scene(kind, role, ctx);
    var cap = h('figcaption', {}, [bi(B(zh, en)), h('span', { class: 'cr' }, [T('虛擬角色插畫（角色插畫為 AI 生成），不是真實人物或實景照片', 'Fictional character illustrations (AI-generated); not real people or photos')])]);
    return h('figure', { class: 'fig' }, [h('div', { class: 'fmedia scene' }, [svgBox(svg)]), cap]);
  }
  var SCENE_CAP = {
    team: B('任務團隊正在討論（虛擬人物）', 'The mission team in discussion (illustrated)'),
    console: B('任務控制室：你的工作位置（虛擬人物）', 'Mission control: your workstation (illustrated)'),
    lab: B('工程師檢查零件（虛擬人物）', 'An engineer inspects a part (illustrated)'),
    party: B('任務成功，團隊歡呼（虛擬人物）', 'Mission success: the team cheers (illustrated)')
  };
  function go(hash) { location.hash = hash; }
  function btn(label, fn, cls) { return h('button', { class: 'btn ' + (cls || ''), onclick: function () { SFX.play('click'); fn(); } }, [label]); }
  function page(children, cls) { var d = h('div', { class: 'pgc ' + (cls || '') }, children); return d; }

  /* ---------- 頁面組裝 ---------- */
  var PAGEKIND = { reply: B('我的回答', 'My reply'), detail: B('唱片內容', 'Inside'), story: B('故事', 'Story'), hardware: B('硬體', 'Hardware'), challenge: B('挑戰', 'Challenge'), quest: B('專屬任務', 'Role'), science: B('成果', 'Science'), ending: B('結局', 'Ending') };
  var KCOLOR = { detail: '#8be9fd', reply: '#7ee0b5', story: '#ffb454', hardware: '#5fd0ff', challenge: '#4ade80', quest: '#ff8fb1', science: '#c9a7ff', ending: '#ffd166' };

  function missionSpreads(m) {
    var role = roleOf(m), S = [], used = {}, nScene = 0, KINDS = ['team', 'console', 'lab'];
    /* 每張照片在同一個故事裡只出現一次；沒有（或已用過）就改放虛擬人物插畫 */
    function art(ids, kind) {
      var id = (ids || []).filter(function (x) { return x && !used[x] && (IM[x] || (window.ILLS && window.ILLS[x])); })[0];
      if (id) { used[id] = 1; var fp = function () { return figure(id); }; fp.isScene = false; return fp; }
      var k = kind || KINDS[nScene++ % 3], cap = SCENE_CAP[k];
      var fs = function () { return sceneFig(k, role, m, cap.zh, cap.en); }; fs.isScene = true; return fs;
    }
    var allRoles = rolesOf(m);
    /* 沒有照片的右頁：放角色圖（第一次放玩家扮演的角色，之後輪流放同任務的其他角色） */
    var blank = function (n) {
      var who = allRoles[(role.level - 1 + (n || 0)) % allRoles.length];
      return page([h('figure', { class: 'fig charfig' }, [h('div', { class: 'charimg' }, [svgBox(window.AV.portrait(who, 'body'))]),
        h('figcaption', {}, [bi(who.name, 'inline'), ' · ', bi(who.job, 'inline'), h('span', { class: 'cr' }, [T('虛擬角色：名字與長相都是虛構的。角色插畫為 AI 生成', 'A fictional character: name and looks are invented. Character illustrations are AI-generated')])])])], 'img');
    };
    S.push({ kind: 'story', title: 'open', build: function () {
      return { l: page([h('div', { class: 'kicker' }, [Ti('任務 ' + (M.indexOf(m) + 1), 'Mission ' + (M.indexOf(m) + 1))]), h('h2', {}, [m.icon + ' ', bi(m.title)]), h('p', { class: 'tagline' }, [bi(m.tagline)]),
        h('p', { class: 'lead' }, [T('你是：', 'You are: '), h('b', {}, [role.icon + ' ', bi(role.name, 'inline')]), ' · ', bi(role.job, 'inline')]),
        h('p', { class: 'note' }, [T('接下來：故事 → 認識硬體 → 挑戰 → ' + (role.quest ? '角色專屬任務 → ' : '') + '科學成果 → 真實結局。點右下角的折角翻頁，或點右邊的書籤快速跳頁。',
          'Next: story → hardware → challenge → ' + (role.quest ? 'role mission → ' : '') + 'science → ending. Tap the corner to turn the page, or a bookmark to jump.')])]), r: blank() };
    } });
    m.story.forEach(function (s, si) {
      var a = art([s.img, m.cover]);
      S.push({ kind: 'story', pair: true, build: function () {
        var kids = [h('h2', {}, [bi(s.title)]), h('p', { class: 'lead' }, [bi(s.text)])];
        if (s.log) kids.push(h('aside', { class: 'notebook' }, [h('b', { class: 'nb-title' }, [bi(B('任務控制室日誌', 'Mission control log'), 'inline')]), h('div', { class: 'nb-text' }, [bi(s.log)])]));
        return { l: page(kids, 'story'), r: a.isScene ? blank(si + 1) : page([a()], 'img') };
      } });
    });
    var hwArt = art([m.banners && m.banners.hardware], 'lab');
    if (m.model) S.push({ kind: 'hardware', pair: true, build: function () { return holoSplit(m); } });
    if (m.model2) S.push({ kind: 'hardware', pair: true, build: function () { return holoSplit(m, m.model2); } });   /* 一個任務有第二個 3D 模型（月球車） */
    S.push({ kind: 'hardware', pair: true, build: function () { return partsSpread(m, role, hwArt); } });
    if (m.id === 'record' && window.RECORD_DATA) S.push({ kind: 'detail', pair: true, build: function () { return recordDetailSpread(); } });
    var chArt = art([m.banners && m.banners.challenge], 'console'), sciArt = art([m.banners && m.banners.science, m.endImg], 'team'), endArt = art([m.endImg], 'party');
    var ch = m.challenges[role.level];
    S.push({ kind: 'challenge', pair: true, build: function () { return challengeSpread(m, ch, m.id + '-' + role.level, role, B('原有關卡', 'Original challenge'), chArt); } });
    if (role.quest) S.push({ kind: 'quest', pair: true, build: function () { return challengeSpread(m, role.quest, m.id + '-' + role.level + '-q', role, B('角色專屬任務 · 高一階挑戰', 'Role mission · one level up'), art([], 'lab')); } });
    S.push({ kind: 'science', pair: true, build: function () {
      var ul = h('ul', { class: 'sci' }); m.science.forEach(function (s) { ul.appendChild(h('li', {}, [h('span', { class: 'si' }, [s.icon]), h('div', {}, [bi(s.t)])])); });
      var pic = !endArt.isScene ? endArt : (!sciArt.isScene ? sciArt : endArt);
      return { l: page([h('h2', {}, [T('它促成了哪些科學發現？', 'What science did it make possible?')]), ul]),
        r: page([h('h2', {}, [T('真實結局', 'The real ending')]), h('div', { class: 'ending' }, [bi(m.ending)]), pic.isScene ? null : h('div', { class: 'endfig' }, [pic()])], 'ending') };
    } });
    S.push({ kind: 'ending', pair: true, build: function () {
      var ul = h('ul', { class: 'src' });
      m.sources.forEach(function (s) { ul.appendChild(h('li', {}, [h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer' }, [s.label]), s.note ? ' — ' : null, s.note ? bi(s.note, 'inline') : null])); });
      var nxt = M[(M.indexOf(m) + 1) % M.length];
      return { l: page([h('h2', {}, [T('資料來源', 'Sources')]), ul], 'srcpg'),
        r: page([h('div', { class: 'endbtns' }, [
          h('div', { class: 'endmsg' }, [T('你完成了這個故事！', 'You finished this story!')]),
          btn(Ti('回目錄', 'Back to contents'), function () { go('#/toc'); }),
          btn(bi(B(nxt.icon + ' 下一個故事：' + nxt.title.zh, nxt.icon + ' Next story: ' + nxt.title.en), 'inline'), function () { go('#/m/' + nxt.id + '/roles'); }, 'ghost')])], 'endpg') };
    } });
    if (m.id === 'record') S.push({ kind: 'reply', pair: true, build: function () { return replySpread(); } });
    return flatten(S, role, m);
  }

  /* 金唱片：唱片裡有什麼？（安裝位置＋圖像主題瀑布＋聲音／問候語／音樂；只放文字與連結，不複製受著作權保護的圖像與音樂） */
  function recordDetailSpread() {
    var D = window.RECORD_DATA;
    function ext(href, kids, cls) { return h('a', { class: cls || 'extlink', href: href, target: '_blank', rel: 'noopener noreferrer' }, kids); }
    function flat(arr) { return arr.reduce(function (a, b) { return a.concat(b); }, []); }
    var chips = h('div', { class: 'rd-chips' }, [
      ['🖼️', '115', '張圖像', 'images'], ['🗣️', '55', '種語言問候', 'languages'], ['🎶', T('約 90', '~90'), '分鐘音樂', 'min of music'], ['🌊', '35', '種地球聲音', 'Earth sounds']
    ].map(function (c) { return h('div', { class: 'rd-chip' }, [h('span', { class: 'ci' }, [c[0]]), h('b', {}, [c[1]]), h('small', {}, [T(c[2], c[3])])]); }));
    var locCap = h('figcaption', {}, [T('NASA 官方照片：航海家號與金唱片的位置', 'NASA photo: Voyager and the position of the Golden Record'), h('span', { class: 'cr' }, ['Credit: NASA/JPL · ', ext(D.links.cover, ['science.nasa.gov'], 'cr-a')])]);
    var locImg = h('div', { class: 'fmedia' }, [h('img', { class: 'bgimg', src: 'assets/img/voyager-record-location.jpeg', alt: '' }), h('img', { class: 'fgimg', src: 'assets/img/voyager-record-location.jpeg', alt: '航海家號機身與固定在上面的金色唱片 Voyager spacecraft with the Golden Record mounted on its body' })]);
    zoomable(locImg, function () { return h('img', { class: 'bigimg', src: 'assets/img/voyager-record-location.jpeg', alt: 'Voyager spacecraft with the Golden Record' }); }, locCap);
    var left = page([
      h('div', { class: 'kicker' }, [Ti('認識唱片', 'Inside the record')]),
      h('h2', {}, [T('唱片裡有什麼？', 'What is inside the record?')]),
      h('p', { class: 'lead' }, [T('金唱片是一封寫給宇宙的信：用圖像、聲音、音樂和問候語，介紹地球與人類。', 'The Golden Record is a letter to the universe: pictures, sounds, music and greetings that introduce Earth and its people.')]),
      chips,
      h('h3', { class: 'rd-h' }, [T('📍 它裝在航海家號的哪裡？', '📍 Where is it on Voyager?')]),
      h('figure', { class: 'fig rd-loc' }, [locImg, locCap]),
      h('p', { class: 'note' }, [T('金色圓盤固定在航海家號機身主體的外側、大碟型天線下方（見照片）；外面有保護套，套上刻著播放說明。位置依 NASA 官方照片標示，NASA 沒有說明是機身的哪一面。', 'The golden disc is fixed to the outside of the main body, below the big dish antenna (see photo), with a protective cover etched with playing instructions. Position follows NASA\'s photo; NASA does not say which face of the body.')])
    ], 'rd-left');

    /* 右頁：四個分頁 */
    var panel = h('div', { class: 'rd-panel' }), tabs = h('div', { class: 'rd-tabs', role: 'tablist' }), btns = {};
    var TAB = [['img', B('🖼️ 圖像', '🖼️ Images')], ['snd', B('🔊 聲音', '🔊 Sounds')], ['hello', B('🗣️ 問候語', '🗣️ Greetings')], ['mus', B('🎵 音樂', '🎵 Music')]];

    function waterfall() {
      function card(c) { return h('div', { class: 'wf-card' }, [h('span', { class: 'wi' }, [c.i]), h('span', { class: 'wt' }, [h('b', {}, [T(c.zh, c.en)]), h('small', { class: 'wf-en' }, [c.en]), h('small', { class: 'wc' }, [c.credit ? '© ' + c.credit : T('版權歸原著作權人', '© rights holders')])])]); }
      var half = Math.ceil(D.cards.length / 2), A = D.cards.slice(0, half), Bc = D.cards.slice(half);
      function col(list, rev) { var tr = h('div', { class: 'wf-track' + (rev ? ' rev' : '') }, list.map(card).concat(list.map(card))); return h('div', { class: 'wf-col' }, [tr]); }
      return h('div', { class: 'rd-wf' }, [
        h('div', { class: 'wf-cols' }, [col(A, false), col(Bc, true)]),
        h('p', { class: 'note', style: 'font-size:.78em' }, [T('這些卡片只列出圖像的主題。唱片上的 115 張圖像受著作權保護，所以這裡不放原圖。', 'These cards only name the subjects. The 115 images on the record are copyrighted, so the originals are not reproduced here.')]),
        ext(D.links.images, [T('到 NASA 官方頁面看圖像清單 ↗', 'See the image list on NASA ↗')], 'extbtn')]);
    }
    function sounds() {
      return h('div', { class: 'rd-list' }, flat([
        [h('p', { class: 'note' }, [T('這些是唱片上的聲音範例。想聽的話，請到下面 NASA 官方播放清單。', 'A few examples of sounds on the record. To listen, use NASA\'s official playlist below.')])],
        D.sounds.map(function (s) { return h('div', { class: 'rd-row plain' }, [h('span', { class: 'li' }, [s.i]), h('span', { class: 'lt' }, [h('b', {}, [T(s.zh, s.en)]), h('small', {}, [s.en])])]); }),
        [h('p', { class: 'note' }, [T(D.soundNote[0], D.soundNote[1])]),
         ext(D.links.sounds, [T('NASA 官方「地球的聲音」播放清單 ↗', 'NASA\'s “Sounds of Earth” playlist ↗')], 'extbtn')]]));
    }
    function greetings() {
      var cnt = h('span', { class: 'rd-cnt' });
      var q = h('input', { type: 'search', class: 'rd-search', placeholder: '找語言（例如：華語、Arabic）', 'aria-label': 'Search language' });
      var onlyZh = false;
      var zhBtn = h('button', { class: 'rd-chipbtn', 'aria-pressed': 'false', onclick: function () { onlyZh = !onlyZh; zhBtn.setAttribute('aria-pressed', String(onlyZh)); draw(); } }, [T('只看華語系', 'Chinese only')]);
      var list = h('div', { class: 'rd-greet' });
      function draw() {
        list.innerHTML = ''; var k = q.value.trim().toLowerCase(), n = 0;
        D.greetings.forEach(function (g) {
          var isZh = D.chinese.indexOf(g[0]) >= 0;
          if (onlyZh && !isZh) return;
          if (k && (g[0] + g[1] + g[2] + g[3]).toLowerCase().indexOf(k) < 0) return;
          n++;
          list.appendChild(h('div', { class: 'gr' + (isZh ? ' zh' : '') }, [h('div', { class: 'gl' }, [h('b', {}, [T(g[1], g[0])]), h('small', { class: 'wf-en' }, [g[0]]), null]), h('div', { class: 'gt' }, [T(g[3], g[2])])]));
        });
        if (!n) list.appendChild(h('p', { class: 'note' }, [T('找不到這個語言。', 'No match.')]));
        cnt.textContent = n + ' / ' + D.greetings.length;
      }
      q.addEventListener('input', draw); draw();
      return h('div', { class: 'rd-gwrap' }, [h('div', { class: 'rd-bar' }, [q, zhBtn, cnt]), list,
        h('p', { class: 'note', style: 'font-size:.78em' }, [T('英文翻譯來自 NASA 頁面，中文翻譯為本專案所譯。想聽原音，請到 NASA 官方播放清單。', 'English translations are from NASA; Chinese translations are ours. To hear the originals, use NASA\'s official playlist.')]),
        ext(D.links.greetings, [T('NASA 官方「55 種語言問候」播放清單 ↗', 'NASA\'s “Greetings in 55 languages” playlist ↗')], 'extbtn')]);
    }
    function music() {
      return h('div', { class: 'rd-list' }, flat([
        [h('p', { class: 'note' }, [T('唱片收錄約 90 分鐘、來自不同文化與時代的音樂。下面是 NASA 頁面列出的部分曲目；音樂本身有著作權，請到 NASA 頁面聆聽。', 'About 90 minutes of music from many cultures and eras. Below are some pieces listed by NASA; the recordings are copyrighted, so listen on NASA\'s page.')])],
        D.music.map(function (m) { return h('div', { class: 'rd-row plain' }, [h('span', { class: 'li' }, ['🎵']), h('span', { class: 'lt' }, [h('b', {}, [T(m[0], m[1])]), h('small', {}, [m[2]]), h('small', { class: 'wc' }, [m[3]])])]); }),
        [ext(D.links.music, [T('NASA 官方完整曲目與播放 ↗', 'Full list and playback on NASA ↗')], 'extbtn')]]));
    }
    var BUILD = { img: waterfall, snd: sounds, hello: greetings, mus: music }, built = {};
    function show(id) {
      TAB.forEach(function (t) { btns[t[0]].setAttribute('aria-selected', String(t[0] === id)); });
      panel.innerHTML = ''; panel.appendChild(built[id] || (built[id] = BUILD[id]())); panel.scrollTop = 0;
    }
    TAB.forEach(function (t) { btns[t[0]] = h('button', { class: 'rd-tab', role: 'tab', onclick: function () { SFX.play('click'); show(t[0]); } }, [bi(t[1], 'inline')]); tabs.appendChild(btns[t[0]]); });
    show('img');
    var right = page([h('div', { class: 'rd-right' }, [tabs, panel])], 'rd-rightpg rd-noimgfit');
    return { l: left, r: right };
  }

  /* 金唱片：開放問答（匿名，不收任何個人資料） */
  var PII = [/[\w.+-]+@[\w-]+\.[\w.-]+/, /https?:\/\/|www\./i, /\d[\d\s-]{7,}\d/];
  function replySpread() {
    var QS = [
      ['alien', B('如果你要寄一樣東西給外星人，你會選什麼？為什麼？', 'If you could send one thing to aliens, what would it be, and why?')],
      ['future', B('你想對 1 萬年後的人說一句什麼話？', 'What would you say to people 10,000 years from now?')],
      ['fair', B('你覺得金唱片代表全人類公平嗎？少了什麼？', 'Do you think the record fairly represents all of humanity? What is missing?')]
    ];
    var fields = {}, status = h('div', { class: 'reply-status', role: 'status' });
    var okBox = h('input', { type: 'checkbox', id: 'replyOk' });
    var trap = h('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', class: 'hp', 'aria-hidden': 'true' });
    var form = h('div', { class: 'replyform' });
    QS.forEach(function (q, i) {
      var ta = h('textarea', { maxlength: '300', rows: '2', 'aria-label': q[1].zh }); fields[q[0]] = ta;
      form.appendChild(h('label', { class: 'rq' }, [h('b', {}, [(i + 1) + '. ']), bi(q[1]), ta]));
    });
    var send = btn(Ti('送出我的回答', 'Send my reply'), submit);
    function say(kind, zh, en) { status.className = 'reply-status ' + kind; status.innerHTML = ''; status.appendChild(T(zh, en)); }
    function submit() {
      var data = { lang: store.lang, website: trap.value }, any = false, bad = false;
      QS.forEach(function (q) { var v = fields[q[0]].value.trim(); data[q[0]] = v; if (v) any = true; if (PII.some(function (r) { return r.test(v); })) bad = true; });
      if (!any) { say('bad', '請至少回答一題。', 'Please answer at least one question.'); return; }
      if (bad) { say('bad', '好像有 Email、電話或網址，請把它們刪掉再送出。', 'It looks like there is an email, phone number or link. Please remove it and try again.'); return; }
      if (!okBox.checked) { say('bad', '請先勾選「我沒有寫個人資料」。', 'Please tick the box first.'); return; }
      var url = window.FORM_ENDPOINT;
      if (!url) { say('ok', '這個版本還沒有連到收集的表單，所以回答只留在你的畫面上。你可以把它抄下來或截圖。', 'This copy is not connected to a collection form, so your reply stays on your screen only. You can copy it or take a screenshot.'); return; }
      send.disabled = true; say('', '送出中…', 'Sending…');
      fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) })
        .then(function () { SFX.play('win'); QS.forEach(function (q) { fields[q[0]].value = ''; }); okBox.checked = false; say('ok', '謝謝你！你的回答已匿名送出。', 'Thank you! Your reply was sent anonymously.'); })
        .catch(function () { say('bad', '送出失敗，請檢查網路後再試一次。', 'Sending failed. Check your connection and try again.'); })
        .then(function () { send.disabled = false; });
    }
    form.appendChild(h('label', { class: 'rok' }, [okBox, ' ', T('我沒有寫名字、學校、電話或 Email。', 'I did not write my name, school, phone number or email.')]));
    form.appendChild(trap); form.appendChild(h('div', { class: 'gobtn' }, [send])); form.appendChild(status);
    var left = page([h('div', { class: 'kicker' }, [Ti('寫給宇宙的一封信', 'A letter to the universe')]), h('h2', {}, [T('換你來回答', 'Your turn')]),
      h('p', { class: 'lead' }, [T('金唱片的設計團隊花了一年，決定要對宇宙說什麼。現在輪到你：想一想，再寫下你的答案。沒有標準答案。', 'The record’s team spent about a year deciding what to say to the universe. Now it is your turn: think, then write your own answers. There are no right answers.')]),
      h('aside', { class: 'qcard' }, [h('b', {}, [T('🔒 隱私說明', '🔒 Privacy')]),
        h('ul', { class: 'src' }, [
          h('li', {}, [T('回答是匿名的，不會問你的名字，也不會記錄你是誰。', 'Replies are anonymous. We never ask who you are.')]),
          h('li', {}, [T('請不要寫名字、學校、電話、Email 或住址。', 'Please do not write your name, school, phone, email or address.')]),
          h('li', {}, [T('每題最多 300 字，也可以只回答你想回答的題目。', 'Up to 300 characters each; you may skip any question.')])])])]);
    return { l: left, r: page([h('h3', {}, [T('我的回答', 'My answers')]), form], 'replypg') };
  }

  /* 把「右頁只是示意插畫」的頁面拿掉，後面的頁往前補；互動配對（3D、零件）維持左右一組 */
  function flatten(S, role, m) {
    var out = [], pend = null;
    function add(a, b) { out.push([a, b]); }
    S.forEach(function (s, i) {
      if (s.pair) { if (pend) { add(pend, { pad: true }); pend = null; } add({ s: i, side: 'l' }, { s: i, side: 'r' }); return; }
      var L = { s: i, side: 'l' }, R = s.fill ? null : { s: i, side: 'r' };
      if (pend) { add(pend, L); pend = null; if (R) pend = R; }
      else if (R) add(L, R); else pend = L;
    });
    if (pend) add(pend, { pad: true });
    var pads = out.filter(function (pr) { return pr[0].pad || pr[1].pad; }).length;
    var res = out.map(function (pr) {
      var kinds = pr.map(function (d) { return d.pad ? null : S[d.s].kind; }).filter(Boolean);
      return { kind: kinds[0], kinds: kinds, build: function () {
        var cache = {};
        function get(d) {
          if (d.pad) return page([h('div', { class: 'padpg' }, [h('div', { class: 'padicon' }, [m.icon]), h('div', { class: 'padtag' }, [bi(m.tagline)])])], 'img');
          var b = cache[d.s] || (cache[d.s] = S[d.s].build()); return b[d.side];
        }
        return { l: get(pr[0]), r: get(pr[1]) };
      } };
    });
    res.pads = pads; return res;
  }

  /* 零件一覽：左頁點有興趣的零件，右頁顯示它的圖與說明 */
  function partsSpread(m, role, defaultArt) {
    var right = page([], 'partdetail'), list = h('div', { class: 'partlist' }), cur = null;
    function renderRight(p) {
      right.innerHTML = '';
      if (!p) {
        if (!defaultArt.isScene) right.appendChild(h('div', { class: 'partpic' }, [defaultArt()]));
        right.appendChild(h('p', { class: 'note bigtip bigtip2' }, [T('👈 點左邊有興趣的零件，這裡就會顯示它的照片和說明。', '👈 Tap a part on the left to see its photo and notes here.')]));
        return;
      }
      var pp = window.PARTPHOTO && window.PARTPHOTO[m.id] && window.PARTPHOTO[m.id][m.hardware.indexOf(p)];
      var pic = pp && IM[pp.id] ? figure(pp.id, pp.rel) : sceneFig('labw', role, { icon: p.icon }, p.name.zh + '（示意）', p.name.en + ' (illustration)');
      right.appendChild(h('div', { class: 'partpic' }, [pic]));
      right.appendChild(h('div', { class: 'partinfo' }, [h('h2', {}, [bi(p.name)]), h('p', { class: 'lead' }, [bi(p.short)]), h('p', { class: 'lead' }, [bi(p.how)]),
        h('div', { class: 'why' }, [bi(p.why)])]));
    }
    m.hardware.forEach(function (p) {
      var el = h('button', { class: 'partbtn', 'aria-pressed': 'false' }, [h('span', { class: 'pi' }, [p.icon]), h('span', { class: 'pt' }, [h('b', {}, [bi(p.name)])])]);
      el.addEventListener('click', function () {
        SFX.play('click'); cur = cur === p ? null : p;
        Array.prototype.forEach.call(list.children, function (x) { x.setAttribute('aria-pressed', 'false'); });
        if (cur) el.setAttribute('aria-pressed', 'true'); renderRight(cur);
      });
      list.appendChild(el);
    });
    renderRight(null);
    return { l: page([h('h2', {}, [T('認識' + nameOf(m).zh + '：零件一覽', 'Meet ' + nameOf(m).en + ': parts')]), h('p', { class: 'note' }, [T('點一個你有興趣的零件。', 'Tap a part you are curious about.')]), list]), r: right };
  }

  /* 3D 展示：左頁是零件按鈕與說明，右頁是3D模型 */
  function holoSplit(m, md0) {
    var md = md0 || m.model, hot = md.parts.filter(function (p) { return p.pin; }), nm = nameOf(m);
    var stage = h('div', { class: 'holo' }), detail = h('div', { class: 'holo-detail' }), chips = h('div', { class: 'chips' });
    var api = null, current = null, exploded = false;
    var btnEx = h('button', { class: 'btn small', 'aria-pressed': 'false' }, [Ti('🔧 拆解', '🔧 Explode')]);
    var btnHome = h('button', { class: 'btn small ghost' }, [Ti('↺ 回到全景', '↺ Reset view')]);
    function renderDetail(p) {
      detail.innerHTML = '';
      if (!p) { detail.appendChild(h('div', { class: 'hint' }, [h('b', {}, ['👆 ', Ti('試試看', 'Try it')]), h('ul', {}, [
        h('li', {}, [T('拖曳旋轉右頁的3D 模型；滾輪或雙指縮放。', 'Drag the 3D model on the right page; scroll or pinch to zoom.')]),
        h('li', {}, [T('點發光圓點或下方按鈕，看零件的構造與功能。', 'Tap a glowing dot or a button to read a part’s structure and function.')]),
        h('li', {}, [T('按「拆解」，零件會一件一件分開。', 'Press “Explode” to pull the parts apart.')])])])); return; }
      detail.appendChild(h('h3', {}, [bi(p.name, 'inline')]));
      var c = h('div', { class: 'cols' });
      var u1 = h('ul'); p.structure.forEach(function (t) { u1.appendChild(h('li', {}, [bi(t)])); });
      var u2 = h('ul'); p.func.forEach(function (t) { u2.appendChild(h('li', {}, [bi(t)])); });
      c.appendChild(h('div', { class: 'col' }, [h('h4', {}, [Ti('構造', 'Structure')]), u1]));
      c.appendChild(h('div', { class: 'col' }, [h('h4', {}, [Ti('功能', 'Function')]), u2]));
      detail.appendChild(c); if (p.note) detail.appendChild(h('div', { class: 'note' }, [bi(p.note)]));
    }
    function sync() { Array.prototype.forEach.call(chips.children, function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-id') === current)); }); }
    function choose(id) {
      if (!api) return;
      if (current === id) { current = null; api.clear(); renderDetail(null); sync(); return; }
      current = id; api.select(id); renderDetail(md.parts.filter(function (p) { return p.id === id; })[0]); sync(); SFX.play('click');
    }
    hot.forEach(function (p) { chips.appendChild(h('button', { class: 'chip', 'data-id': p.id, 'aria-pressed': 'false', onclick: function () { choose(p.id); } }, [h('span', { class: 'cn' }, [String(md.parts.indexOf(p) + 1)]), p.icon + ' ', bi(p.name, 'inline')])); });
    btnEx.addEventListener('click', function () { if (!api) return; exploded = !exploded; api.setExplode(exploded); btnEx.innerHTML = ''; btnEx.appendChild(Ti(exploded ? '🔩 組合' : '🔧 拆解', exploded ? '🔩 Assemble' : '🔧 Explode')); });
    btnHome.addEventListener('click', function () { current = null; if (api) api.clear(); renderDetail(null); sync(); });
    renderDetail(null);
    setTimeout(function () {
      if (!window.Holo || !Holo.supported()) { stage.appendChild(h('div', { class: 'holo-msg' }, ['這個瀏覽器無法顯示 3D 模型。 This browser cannot show the 3D model.'])); return; }
      api = Holo.mount(stage, { glb: md.glb, build: md.build, scene: md.scene, home: md.home, parts: Holo.partsCfg(md), onPick: choose });
      stage.appendChild(h('div', { class: 'scan' }));
    }, 0);
    var left = page([h('h2', {}, [md.title ? bi(md.title) : T('認識' + nm.zh + '：3D 展示', 'Meet ' + nm.en + ': 3D view')]), h('div', { class: 'holo-side' }, [h('div', { class: 'holo-tools' }, [btnEx, btnHome]), chips, detail]),
      h('div', { class: 'note', style: 'font-size:.7em' }, [bi(md.credit)])]);
    return { l: left, r: page([stage], 'img full') };
  }


  /* 多題的關卡一次只顯示一題，答對後出現「下一題」，這樣整頁不用捲動 */
  function stepper(eng) {
    var cards = Array.prototype.filter.call(eng.children, function (c) { return c.classList && c.classList.contains('qcard') && !c.classList.contains('find3d'); });
    if (cards.length < 2) return;
    var idx = 0, info = h('div', { class: 'qprog note' }), nextBtn = h('button', { class: 'btn small', style: 'display:none' }, [Ti('下一題 →', 'Next →')]);
    function sync() {
      cards.forEach(function (c, i) { c.style.display = i === idx ? '' : 'none'; });
      info.textContent = '';
      info.appendChild(Ti('第 ' + (idx + 1) + ' / ' + cards.length + ' 題', 'Question ' + (idx + 1) + ' of ' + cards.length));
      nextBtn.style.display = (idx < cards.length - 1 && cards[idx].classList.contains('solved')) ? '' : 'none';
    }
    cards.forEach(function (c) { new MutationObserver(sync).observe(c, { attributes: true, attributeFilter: ['class'] }); });
    nextBtn.addEventListener('click', function () { SFX.play('click'); idx++; sync(); if (eng.onStep) eng.onStep(); });
    eng.insertBefore(info, cards[0]); eng.appendChild(nextBtn); sync();
  }

  /* 關卡：左頁是題目，右頁是圖片（3D 題則是3D 模型） */
  function challengeSpread(m, ch, key, role, tag, artFn) {
    var find = ch.type === 'find3d';
    var win = h('div', { class: 'winbox' }), solvedOnce = false, right = page([], find ? 'img full' : 'chright' + (ch.type === 'order' ? ' chorder' : ''));
    var ctx = { model: m.model, stageHost: right, reveal: /專屬/.test(tag.zh || ''), revealed: false, solved: function () {
      if (solvedOnce) return; solvedOnce = true;
      if (ctx.revealed) { win.appendChild(h('div', { class: 'win soft', role: 'status' }, [T('解答都看完了！下次回來再挑戰，看看能不能全部答對。', 'You have read every answer. Come back and try to get them all right!')])); return; }
      markDone(key); SFX.play('win');
      win.appendChild(h('div', { class: 'win', role: 'status' }, [h('b', {}, ['🎉 ']), bi(ch.success)])); } };
    var kids = [h('div', { class: 'kicker' }, [bi(tag, 'inline'), ' · ', bi(role.name, 'inline')]), h('h2', {}, [bi(ch.title)]), h('div', { class: 'scenario' }, [bi(ch.scenario)])];
    var eng = window.ENGINES[ch.type](ch, ctx);
    stepper(eng);
    if (ch.note) kids.push(h('div', { class: 'note' }, [bi(ch.note)]));
    if (!find) kids.push(h('div', { class: 'note', style: 'font-size:.8em' }, [T('※ 格數、分數與部分數值是「遊戲設定」，用來簡化說明，不是 NASA 的實測資料。', '* Game numbers are simplified settings, not NASA measurements.')]));
    if (isDone(key)) win.appendChild(h('div', { class: 'note' }, [T('✓ 你已完成過這一關，可以重玩。', '✓ Cleared before. Feel free to replay.')]));
    if (find) {
      kids.push(eng); kids.push(win);
      right.style.height = '100%';
      return { l: page(kids), r: right };
    }
    /* 一般關卡：左頁＝題目說明＋答案與解釋；右頁＝選項（有真實照片才放在上半）。
       答案與解釋不跟選項擠在同一頁，兩頁平均分配。 */
    var fb = h('div', { class: 'msg fbmirror', style: 'display:none' });
    eng.onStep = function () { fb.className = 'msg fbmirror'; fb.innerHTML = ''; fb.style.display = 'none'; if (fb.parentNode) fb.parentNode.classList.remove('hasfb'); };
    /* 回饋文字搬到左頁；按鈕（例如「下一輪」）留在右頁，才按得到 */
    function attach(box) {
      if (box._mirrored) return; box._mirrored = true;
      function sync() {
        var has = box.textContent.trim().length > 0, btns = 0;
        Array.prototype.forEach.call(box.children, function (c) { if (c.tagName === 'BUTTON') { btns++; c.style.display = ''; } else c.style.display = 'none'; });
        box.style.display = btns ? '' : 'none';
        fb.className = 'msg fbmirror ' + box.className.replace(/msg/, '').trim();
        var clone = box.cloneNode(true); Array.prototype.forEach.call(clone.querySelectorAll('button'), function (x) { x.remove(); });
        fb.innerHTML = clone.textContent.trim() ? clone.innerHTML.replace(/style="display:\s*none;?"/g, '') : ''; fb.style.display = fb.innerHTML ? '' : 'none';
        if (fb.parentNode) fb.parentNode.classList.toggle('hasfb', !!fb.innerHTML);
      }
      box.classList.add('onright');
      new MutationObserver(sync).observe(box, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
      box.style.display = 'none';
    }
    Array.prototype.forEach.call(eng.querySelectorAll('.msg'), attach);
    new MutationObserver(function () { var fresh = Array.prototype.filter.call(eng.querySelectorAll('.msg'), function (b) { return !b._mirrored; }); if (fresh.length) { eng.onStep(); fresh.forEach(attach); } }).observe(eng, { childList: true, subtree: true });
    var imgBox = (ch.type !== 'order' && !artFn.isScene) ? h('div', { class: 'chimg' + (/budget|pick/.test(ch.type) ? ' small' : '') }, [artFn()]) : null;
    kids.splice(3, 0, imgBox, fb); kids.push(win);   /* 左頁：題目 → 圖片 → 答案與解釋；右頁只放要操作的選項 */
    right.appendChild(eng);
    var leftPg = page(kids, 'chleft');
    leftPg._fbBox = fb;
    return { l: leftPg, r: right };
  }

  /* ---------- 封面、目錄、角色頁 ---------- */
  function coverView() { return { cover: true, bgm: 'home' }; }
  function tocView() {
    var list = h('div', { class: 'toc' });
    M.forEach(function (m, i) {
      var rs = rolesOf(m), d = rs.filter(function (r) { return isDone(m.id + '-' + r.level); }).length;
      list.appendChild(h('button', { class: 'tocitem', style: '--mc:' + m.color, onclick: function () { SFX.play('click'); go('#/m/' + m.id + '/roles'); } }, [
        h('span', { class: 'n' }, [m.icon]), h('span', {}, [h('b', {}, [bi(m.title)]), h('small', {}, [bi(m.tagline)]), window.ROLES && window.ROLES[m.id] ? null : h('small', { class: 'soon' }, [Ti('（角色專屬任務製作中）', '(role missions in progress)')])]),
        d ? h('span', { class: 'done' }, ['✓ ' + d + '/4']) : null]));
    });
    return { l: page([h('div', { class: 'kicker' }, ['Contents']), h('h2', {}, [T('目錄：選一個故事', 'Contents: choose a story')]), list]),
      r: page([sceneFig('crew', null, M.map(function (mm, i) { return rolesOf(mm)[[0, 1, 2, 3, 0, 1, 2][i % 7]]; }), 'NASA 任務團隊（虛擬人物）', 'A NASA mission crew (illustrated)'), h('p', { class: 'note', style: 'font-size:.85em' }, [T('每個故事有 4 位 NASA 相關人物可以扮演；選好故事後，再選你的角色。', 'Every story has four NASA people you can play. Choose a story, then choose your role.'), ' ', h('a', { href: '#/about' }, [T('關於這個作品', 'About')])])], 'img'), bgm: 'home', marks: 'toc' };
  }
  function rolesView(m) {
    var sel = store.role[m.id] || 0, rs = rolesOf(m);
    var detail = h('div');
    function showDetail(r) {
      detail.innerHTML = '';
      if (!r) { detail.appendChild(h('div', { class: 'rolefull' }, [h('div', { class: 'rf-portrait' }, [sceneFig('crew', null, rs, m.title.zh + '的四位人物（虛擬插畫）', 'Four people of this mission (illustrated)')]),
        h('p', { class: 'note bigtip' }, [T('👈 點左邊的人物，這裡會整頁展示 TA 的特色。', '👈 Tap a person on the left to see their profile here.')])])); return; }
      var cap = h('div', { class: 'rf-cap note' }, [T('虛擬人物：劇中角色，名字與長相都是虛構的。角色插畫為 AI 生成', 'A fictional character: name and looks are invented. Character illustrations are AI-generated')]);
      var pic = h('div', { class: 'fmedia scene' }, [svgBox(window.AV.portrait(r))]);
      detail.appendChild(h('div', { class: 'rolefull', style: '--mc:' + m.color }, [
        h('div', { class: 'rf-portrait' }, [pic, cap]),
        h('div', { class: 'rf-body' }, [h('h2', {}, [bi(r.name)]), h('div', { class: 'job' }, [bi(r.job)]), h('p', { class: 'lead' }, [bi(r.bio)]),
          h('div', { class: 'rf-feats' }, [
            h('div', { class: 'feat' }, [h('b', {}, [Ti('難度', 'Difficulty')]), h('span', { class: 'stars' }, [stars(r.stars)])]),
            r.tip ? h('div', { class: 'feat' }, [h('b', {}, [Ti('你會做', 'You will')]), h('span', {}, [bi(r.tip, 'inline')])]) : null,
            r.quest ? h('div', { class: 'feat' }, [h('b', {}, [Ti('專屬任務', 'Role mission')]), h('span', {}, [bi(B(r.quest.title.zh.replace(/^專屬任務：/, ''), r.quest.title.en.replace(/^Role mission: /, '')), 'inline')])]) : null]),
          btn(Ti('以 ' + r.name.zh + ' 的身分開始 →', 'Start as ' + r.name.en + ' →'), function () { store.role[m.id] = r.level; save(); SFX.play('win'); go('#/m/' + m.id + '/0'); })])]));
    }
    var cards = h('div', { class: 'rolelist' });
    rs.forEach(function (r) {
      var c = h('button', { class: 'rolecard', style: '--mc:' + m.color, 'aria-pressed': String(sel === r.level) }, [h('span', { class: 'avatar' }, [svgBox(window.AV.portrait(r, 'head'))]), h('span', {}, [h('b', {}, [bi(r.name)]), h('span', { class: 'job' }, [bi(r.job)])]), h('span', { class: 'stars' }, [stars(r.stars)])]);
      c.addEventListener('click', function () { SFX.play('click'); Array.prototype.forEach.call(cards.children, function (x) { x.setAttribute('aria-pressed', 'false'); }); c.setAttribute('aria-pressed', 'true'); showDetail(r); });
      cards.appendChild(c);
    });
    showDetail(rs.filter(function (r) { return r.level === sel; })[0]);
    return { l: page([h('div', { class: 'kicker' }, [m.icon + ' ', bi(m.title, 'inline')]), h('h2', {}, [T('選擇你的角色', 'Choose your role')]), h('p', { class: 'note' }, [T('每位角色的專業不同，也有不同的挑戰難度。', 'Each role has different expertise and a different challenge level.')]), cards]),
      r: page([detail], 'rolepg'), bgm: m.id, marks: 'roles', m: m };
  }
  function aboutView() {
    var ps = [['這是一個互動電子書：你扮演 NASA 計畫裡的角色（姓名與長相是虛構的，職務對應真實任務），用機智號、機會號、航海家1號、火星氣候軌道器、金唱片與月球登陸（登月艙與月球車）的故事，認識太空硬體如何運作。', 'An interactive e-book: play characters inspired by real NASA roles and learn how space hardware works through six true stories: Ingenuity, Opportunity, Voyager 1, the Mars Climate Orbiter, the Golden Record and the Moon landing (lunar module and rovers).'],
      ['影像：來自 NASA 影像與影片資料庫（images.nasa.gov），圖說標示來源編號；3D 模型來自 NASA/JPL-Caltech。', 'Images are from the NASA Image and Video Library; 3D models are from NASA/JPL-Caltech.'],
      ['故事頁的「任務控制室日誌」是依史實改寫的情境小品，不是真實的紀錄或對話。', 'The “Mission control log” notes are fictionalised scenes based on real events, not real records or quotes.'],
      ['角色頁的人物姓名都是虛構的，只借用真實的職務（例如專案經理、首席科學家）來說明工作內容。', 'All character names are fictional; only real job roles (such as project manager or principal investigator) are borrowed to explain the work.'],
      ['互動音效：由程式合成，沒有使用他人音檔。', 'Interactive sound effects are synthesized by code; no third-party audio.'],
      ['免責聲明：本作品是個人學習與黑客松作品，與 NASA 無隸屬關係，也未獲 NASA 背書。「遊戲設定」是為了好玩而簡化的數字，不是 NASA 的測量資料。', 'Disclaimer: an independent educational hackathon project, not affiliated with or endorsed by NASA. “Game settings” are simplified numbers, not NASA measurements.']];
    return { l: page([h('h2', {}, [T('關於這個作品', 'About this project')]), ps.map(function (p) { return h('p', {}, [T(p[0], p[1])]); })].reduce(function (a, b) { return a.concat(b); }, [])), r: page([sceneFig('team', null, { icon: '🛰️' }, '一起認識太空任務（虛擬人物）', 'Learning about space missions together (illustrated)')], 'img'), bgm: 'home' };
  }
  function missionView(m, i) {
    var S = missionSpreads(m); i = Math.max(0, Math.min(S.length - 1, i));
    var sp = S[i].build(); sp.bgm = m.id; sp.marks = 'mission'; sp.m = m; sp.S = S; sp.i = i; sp.kind = S[i].kind; return sp;
  }

  /* ---------- 書籤 ---------- */
  function marksFor(v) {
    var out = [];
    if (v.marks === 'toc') M.forEach(function (m) { out.push({ label: B(m.icon + ' ' + m.title.zh.split('：')[0], m.title.en.split(':')[0]), c: m.color, hash: '#/m/' + m.id + '/roles', cur: false }); });
    else if (v.marks === 'roles') { out.push({ label: B('📖 目錄', 'Contents'), c: '#ffd166', hash: '#/toc' }); }
    else if (v.marks === 'mission') {
      out.push({ label: B('📖 目錄', 'Contents'), c: '#ffd166', hash: '#/toc' }); out.push({ label: B('🧑‍🚀 角色', 'Role'), c: '#9ad1ff', hash: '#/m/' + v.m.id + '/roles' });
      var seen = {};
      v.S.forEach(function (s, idx) { s.kinds.forEach(function (k) { if (seen[k]) return; seen[k] = 1; out.push({ label: PAGEKIND[k], c: KCOLOR[k], hash: '#/m/' + v.m.id + '/' + idx, cur: k === v.kind }); }); });
    } else if (v.marks !== undefined) { out.push({ label: B('📖 目錄', 'Contents'), c: '#ffd166', hash: '#/toc' }); }
    return out;
  }

  /* ---------- 渲染與翻頁 ---------- */
  var book = document.getElementById('book'), spread = null, cur = null, flipping = false, token = 0, theme = null, gesture = false;
  function setSize() {
    var H = innerHeight - 46 - 14, bw = Math.min(innerWidth / 1.24, H * RATIO); bw = Math.max(bw, 560); bw = Math.max(Math.min(bw, innerWidth - 2 * 104 - 8), 360);   /* 書籤掛在書右側，至少留出書籤寬度（104px）；窄螢幕時縮小書本 */
    book.style.setProperty('--bw', bw + 'px'); book.style.setProperty('--bh', (bw / RATIO) + 'px');
  }
  var RATIO = 1.7;
  function posOf(route) { if (route[0] === 'm') return route[2] === 'roles' ? 2 : 3 + (parseInt(route[2], 10) || 0); return route[0] === 'toc' ? 1 : route[0] === 'about' ? 1 : 0; }
  /* 內容太長時自動縮小，讓整頁不需要捲動（最小縮到 62%） */
  function fit(pg) {
    var inn = pg.querySelector('.pg-in'), c = inn && inn.firstChild; if (!c || /img/.test(c.className)) return;
    var busy = false, t = null;
    function run() { busy = true; var z = 1; c.style.zoom = 1; while (inn.scrollHeight > inn.clientHeight + 2 && z > .5) { z -= .04; c.style.zoom = z.toFixed(2); } setTimeout(function () { busy = false; }, 0); }
    run(); pg._fit = run;
    if (/chorder|chleft/.test(c.className)) return;   /* 排序題：字體大小固定，不隨填入而改變 */
    new MutationObserver(function () { if (busy) return; clearTimeout(t); t = setTimeout(run, 60); }).observe(c, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
  }
  function mkPg(side, content, no) {
    var pg = h('section', { class: 'pg ' + side }); var inn = h('div', { class: 'pg-in' }); inn.appendChild(content); pg.appendChild(inn);
    if (no != null) pg.appendChild(h('div', { class: 'pno' }, [String(no)])); return pg;
  }
  function bgmFor(v) { theme = v.bgm || 'home'; if (gesture) BGM.play(theme); }
  document.addEventListener('pointerdown', function () { if (!gesture) { gesture = true; SFX.unlock(); BGM.play(theme || 'home'); } }, { once: false });

  function drawMarks(v) {
    var old = book.querySelector('.marks'); if (old) old.remove();
    var ms = marksFor(v); if (!ms.length) return;
    var nav = h('nav', { class: 'marks', 'aria-label': 'bookmarks' });
    ms.forEach(function (mk) { nav.appendChild(h('button', { class: 'mark' + (mk.cur ? ' cur' : ''), style: '--c:' + mk.c, onclick: function () { SFX.play('click'); go(mk.hash); } }, [bi(mk.label)])); });
    book.appendChild(nav);
  }
  function drawFolds(v, route) {
    Array.prototype.forEach.call(book.querySelectorAll('.fold'), function (f) { f.remove(); });
    var nextHash = null, prevHash = null;
    if (route[0] === 'toc') { prevHash = '#/'; }
    else if (route[0] === 'about') { prevHash = '#/toc'; }
    else if (route[0] === 'm') {
      if (route[2] === 'roles') { prevHash = '#/toc'; if (store.role[v.m.id]) nextHash = '#/m/' + v.m.id + '/0'; }
      else { prevHash = v.i === 0 ? '#/m/' + v.m.id + '/roles' : '#/m/' + v.m.id + '/' + (v.i - 1); nextHash = v.i < v.S.length - 1 ? '#/m/' + v.m.id + '/' + (v.i + 1) : null; }
    }
    if (nextHash) book.appendChild(h('button', { class: 'fold next', 'aria-label': 'Next page', onclick: function () { go(nextHash); } }, [h('span', {}, ['›'])]));
    if (prevHash) book.appendChild(h('button', { class: 'fold prev', 'aria-label': 'Previous page', onclick: function () { go(prevHash); } }, [h('span', {}, ['‹'])]));
  }
  function show(v, route, dir) {
    var no = route[0] === 'm' && route[2] !== 'roles' ? v.i + 1 : null;
    var L = mkPg('left', v.l, no == null ? null : no * 2 - 1), R = mkPg('right', v.r, no == null ? null : no * 2);
    var fresh = !spread;
    if (fresh) { book.innerHTML = ''; spread = h('div', { class: 'spread' }); book.appendChild(spread); spread.appendChild(L); spread.appendChild(R); fit(L); fit(R); drawMarks(v); drawFolds(v, route); return; }
    if (!dir || flipping) { token++; flipping = false; Array.prototype.forEach.call(book.querySelectorAll('.flipper'), function (f) { f.remove(); }); book.style.perspective = ''; spread.innerHTML = ''; spread.appendChild(L); spread.appendChild(R); fit(L); fit(R); drawMarks(v); drawFolds(v, route); return; }
    flipping = true; var my = ++token; SFX.play('flip');
    var oldL = spread.querySelector('.pg.left'), oldR = spread.querySelector('.pg.right');
    var fl = h('div', { class: 'flipper ' + (dir > 0 ? 'rt' : 'lt') });
    var front = h('div', { class: 'face front' }, [(dir > 0 ? oldR : oldL).cloneNode(true)]);
    var back = h('div', { class: 'face back' }, [(dir > 0 ? L : R).cloneNode(true)]);
    fl.appendChild(front); fl.appendChild(back); book.appendChild(fl); book.style.perspective = '2600px';
    if (dir > 0) { spread.replaceChild(R, oldR); fit(R); } else { spread.replaceChild(L, oldL); fit(L); }
    requestAnimationFrame(function () { requestAnimationFrame(function () { fl.style.transform = dir > 0 ? 'rotateY(-180deg)' : 'rotateY(180deg)'; }); });
    setTimeout(function () { if (my !== token) return; var o = dir > 0 ? spread.querySelector('.pg.left') : spread.querySelector('.pg.right'); spread.replaceChild(dir > 0 ? L : R, o); fit(dir > 0 ? L : R); }, 380);
    setTimeout(function () { if (my !== token) return; fl.remove(); book.style.perspective = ''; flipping = false; drawMarks(v); drawFolds(v, route); }, 800);
    drawMarks(v); drawFolds(v, route);
  }
  function showCover() {
    spread = null; book.innerHTML = '';
    var c = h('div', { class: 'bookcover', role: 'button', tabindex: '0', 'aria-label': 'Open the book' }, [
      h('div', { class: 'ccover' }, ['🛰️']), h('h1', {}, [bi(B('遺落的探險家', 'Ghost Rovers'))]), h('div', { class: 'sub' }, [T('NASA 太空探測任務互動故事書', 'Interactive stories of NASA space missions')]),
      h('div', { class: 'by' }, [T('非 NASA 官方作品', 'Not affiliated with NASA')])]);
    function open() { enterFull(); gesture = true; SFX.unlock(); BGM.play('home'); SFX.play('flip'); book.style.perspective = '2600px'; c.classList.add('opening'); setTimeout(function () { book.style.perspective = ''; go('#/toc'); }, 850); }
    c.addEventListener('click', open); c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') open(); });
    book.appendChild(c);
  }
  function render() {
    setSize();
    var route = (location.hash || '#/').replace(/^#\/?/, '').split('/'), v;
    if (route[0] === 'm' && mById(route[1])) { var m = mById(route[1]); v = route[2] === 'roles' ? rolesView(m) : missionView(m, parseInt(route[2], 10) || 0); }
    else if (route[0] === 'toc') v = tocView(); else if (route[0] === 'about') v = aboutView(); else v = coverView();
    bgmFor(v);
    var pos = posOf(route), dir = cur == null || spread == null ? 0 : (pos > cur ? 1 : pos < cur ? -1 : 0); cur = pos;
    if (v.cover) { showCover(); return; }
    show(v, route, dir);
  }

  /* ---------- 語言、聲音、鍵盤 ---------- */
  function applyLang() {
    document.body.className = 'lang-' + store.lang; document.documentElement.lang = store.lang === 'en' ? 'en' : 'zh-Hant';
    var seg = document.getElementById('langSeg'); seg.innerHTML = '';
    [['zh', '中文'], ['en', 'English']].forEach(function (p) { seg.appendChild(h('button', { 'aria-pressed': String(store.lang === p[0]), onclick: function () { store.lang = p[0]; save(); applyLang(); } }, [p[1]])); });
    var en = store.lang === 'en', sub = document.querySelector('.brand-text small'), fs = document.getElementById('fsBtn'), ft = document.getElementById('footer');
    if (sub) sub.textContent = en ? 'Lost Explorers · NASA' : '遺落的探險家 · NASA';
    if (fs) fs.textContent = en ? '⛶ Fullscreen' : '⛶ 全螢幕';
    if (ft) ft.textContent = en ? 'Images: NASA Image and Video Library · Not affiliated with NASA' : '圖片：NASA Image and Video Library · 非 NASA 官方作品';
    if (typeof syncSnd === 'function' && window.SFX) syncSnd();
  }
  var snd = document.getElementById('sndBtn');
  function syncSnd() { var m = SFX.isMuted(); var en = store.lang === 'en'; snd.textContent = m ? (en ? '🔇 Muted' : '🔇 全靜音') : (en ? '🔊 Sound on' : '🔊 聲音開'); snd.setAttribute('aria-pressed', String(m)); snd.setAttribute('aria-label', m ? '目前全靜音，點一下開啟聲音 Muted, click to unmute' : '目前有聲音，點一下全靜音 Sound on, click to mute all'); snd.title = en ? (m ? 'Turn sound on' : 'Mute all (effects and music)') : (m ? '開啟聲音' : '全靜音（音效與背景音樂都關掉）'); }
  snd.addEventListener('click', function () { SFX.setMuted(!SFX.isMuted()); syncSnd(); if (!SFX.isMuted()) { gesture = true; SFX.unlock(); BGM.play(theme || 'home'); } });
  document.addEventListener('keydown', function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test((e.target || {}).tagName || '')) return;
    var f = e.key === 'ArrowRight' ? book.querySelector('.fold.next') : e.key === 'ArrowLeft' ? book.querySelector('.fold.prev') : null; if (f) f.click();
  });
  window.addEventListener('hashchange', function () { try { render(); } catch (err) { if (window.console) console.error(err); } });
  var rzT = null;
  window.addEventListener('resize', function () { setSize(); clearTimeout(rzT); rzT = setTimeout(function () { Array.prototype.forEach.call(book.querySelectorAll('.pg'), function (p) { if (p._fit) p._fit(); }); }, 120); });
  /* 全螢幕：點封面時自動進入；右上角按鈕可切換 */
  function isFull() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
  function enterFull() { try { var el = document.documentElement, f = el.requestFullscreen || el.webkitRequestFullscreen; if (f && !isFull()) { var p = f.call(el); if (p && p.catch) p.catch(function () {}); } } catch (e) {} }
  function toggleFull() { try { if (isFull()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } else enterFull(); } catch (e) {} }
  var fsb = document.getElementById('fsBtn'); if (fsb) fsb.addEventListener('click', toggleFull);
  document.addEventListener('fullscreenchange', function () { document.body.classList.toggle('isfull', isFull()); });
  applyLang(); syncSnd(); render();
})();
