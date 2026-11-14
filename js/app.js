/* 主程式：路由、首頁、電子書頁面、進度與語言。 */
(function () {
  'use strict';
  var h = U.h, bi = U.bi, B = window.B;
  var M = window.MISSIONS, IM = window.IMAGES;

  var LEVELS = [
    { id: 1, icon: '🧒', age: B('6–8 歲', 'Ages 6–8'), role: B('小小探險家', 'Junior Explorer'), tip: B('看圖、動手試試看', 'Look, tap and try') },
    { id: 2, icon: '🔧', age: B('9–12 歲', 'Ages 9–12'), role: B('任務技師', 'Mission Technician'), tip: B('做決定、簡單計算', 'Make decisions, simple maths') },
    { id: 3, icon: '📐', age: B('13–15 歲', 'Ages 13–15'), role: B('系統工程師', 'Systems Engineer'), tip: B('用公式推理', 'Reason with formulas') },
    { id: 4, icon: '🛰️', age: B('16–18 歲', 'Ages 16–18'), role: B('飛行任務主管', 'Flight Director'), tip: B('整合條件、判斷風險', 'Combine constraints, judge risk') }
  ];

  /* ---------- 儲存（localStorage 可能不可用，一律 try/catch） ---------- */
  var KEY = 'ghost-rovers-v1';
  var store = { lang: 'both', level: 2, done: {} };
  try { var raw = localStorage.getItem(KEY); if (raw) { var o = JSON.parse(raw); store.lang = o.lang || 'both'; store.level = o.level || 2; store.done = o.done || {}; } } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }

  /* ---------- 語言切換 ---------- */
  function applyLang() {
    document.body.className = 'lang-' + store.lang;
    document.documentElement.lang = store.lang === 'en' ? 'en' : 'zh-Hant';
    var seg = document.getElementById('langSeg'); seg.innerHTML = '';
    [['both', '中 / EN'], ['zh', '中文'], ['en', 'English']].forEach(function (p) {
      seg.appendChild(h('button', { 'aria-pressed': String(store.lang === p[0]), onclick: function () { store.lang = p[0]; save(); applyLang(); } }, [p[1]]));
    });
  }

  function figure(id, cls) {
    var ill = window.ILLS && window.ILLS[id];
    if (ill) {
      var box = h('div', { class: 'ill-svg' }); box.innerHTML = ill.svg;
      return h('figure', { class: 'fig ill ' + (cls || '') }, [box,
        h('figcaption', {}, [bi({ zh: ill.zh, en: ill.en }), h('span', { class: 'cr' }, [T('示意圖：本作品繪製，不是實景照片', 'Illustration drawn for this project, not a photo')])])]);
    }
    var im = IM[id];
    return h('figure', { class: 'fig ' + (cls || '') }, [
      h('img', { src: imgUrl(id), alt: im.zh + ' / ' + im.en, loading: 'lazy' }),
      h('figcaption', {}, [bi({ zh: im.zh, en: im.en }), h('span', { class: 'cr' }, ['Credit: ' + im.credit + ' · NASA ID: ' + id])])
    ]);
  }
  function T(zh, en) { return bi(B(zh, en)); }
  function mById(id) { return M.filter(function (m) { return m.id === id; })[0]; }
  function isDone(mid, lv) { return !!store.done[mid + '-' + lv]; }
  function markDone(mid, lv) { store.done[mid + '-' + lv] = true; save(); }
  function go(hash) { location.hash = hash; }

  /* ---------- 首頁 ---------- */
  function renderHome(root) {
    root.appendChild(h('section', { class: 'hero' }, [
      h('h1', {}, [bi(B('遺落的探險家', 'Ghost Rovers'))]),
      h('p', {}, [T('月球、火星與深空裡，有一些機器完成了任務，卻永遠留在那裡。現在，換你當 NASA 的工程師，用它們真實的故事解決真實的問題。',
        'Out on the Moon, on Mars and in deep space, machines finished their jobs and stayed behind. Now you are the NASA engineer: solve the real problems they once faced.')]),
      h('p', {}, [T('每個任務有 4 個難度，從 6 歲到 18 歲都能玩。', 'Every mission has 4 levels, from ages 6 to 18.')]),
      h('div', { class: 'who' }, [T('① 選擇你的身分', '① Choose your role')])
    ]));
    var lv = h('div', { class: 'levels' });
    LEVELS.forEach(function (L) {
      lv.appendChild(h('button', { class: 'lvl', 'aria-pressed': String(store.level === L.id), onclick: function () { store.level = L.id; save(); render(); } }, [
        h('div', { class: 'ic' }, [L.icon]), h('div', { class: 'age' }, [bi(L.age)]), h('b', {}, [bi(L.role)]), h('div', { class: 'note' }, [bi(L.tip)])
      ]));
    });
    root.appendChild(lv);
    root.appendChild(h('div', { class: 'who' }, [T('② 選擇任務', '② Choose a mission')]));
    var grid = h('div', { class: 'grid' });
    M.forEach(function (m) {
      var cnt = 0; var dots = h('div', { class: 'dots', 'aria-label': 'progress' });
      LEVELS.forEach(function (L) { var d = isDone(m.id, L.id); if (d) cnt++; dots.appendChild(h('span', { class: 'dot' + (d ? ' done' : ''), title: L.age.zh })); });
      dots.appendChild(h('small', {}, [cnt + '/4']));
      grid.appendChild(h('a', { class: 'mcard', href: '#/m/' + m.id + '/0', style: '--mc:' + m.color }, [
        h('img', { src: imgUrl(m.cover), alt: IM[m.cover].zh + ' / ' + IM[m.cover].en, loading: 'lazy' }),
        h('div', { class: 'body' }, [h('h3', {}, [m.icon + ' ', bi(m.title)]), h('div', { class: 'tag' }, [bi(m.tagline)]), dots])
      ]));
    });
    root.appendChild(grid);
    root.appendChild(h('p', { class: 'note' }, [h('a', { href: '#/about' }, [T('關於這個作品、資料來源與免責聲明', 'About, sources and disclaimer')])]));
  }

  /* ---------- 電子書頁面組裝 ---------- */
  function buildPages(m) {
    var p = [{ kind: 'cover' }];
    m.story.forEach(function (s, i) { p.push({ kind: 'story', s: s, n: i + 1 }); });
    p.push({ kind: 'hardware' }); p.push({ kind: 'challenge' }); p.push({ kind: 'science' }); p.push({ kind: 'ending' });
    return p;
  }
  var PAGE_NAMES = {
    cover: B('封面', 'Cover'), story: B('故事', 'Story'), hardware: B('認識硬體', 'Meet the hardware'),
    challenge: B('挑戰任務', 'Challenge'), science: B('科學成果', 'Science results'), ending: B('真實結局', 'Real ending')
  };

  function renderMission(root, id, idx) {
    var m = mById(id);
    if (!m) { go('#/'); return; }
    var pages = buildPages(m);
    idx = Math.max(0, Math.min(pages.length - 1, idx | 0));
    var pg = pages[idx];
    var book = h('div', { class: 'book', style: '--mc:' + m.color });
    book.appendChild(h('div', { class: 'crumb' }, [h('a', { href: '#/' }, ['← ', bi(B('所有任務', 'All missions'), 'inline')]), '·', bi(m.title, 'inline'), '·', bi(PAGE_NAMES[pg.kind], 'inline')]));
    var dots = h('div', { class: 'pagedots', role: 'tablist' });
    pages.forEach(function (q, i) { dots.appendChild(h('button', { class: 'pdot' + (i === idx ? ' cur' : ''), 'aria-label': 'Page ' + (i + 1), 'aria-current': i === idx ? 'page' : 'false', onclick: function () { go('#/m/' + id + '/' + i); } })); });
    book.appendChild(dots);

    var page = h('section', { class: 'page' });
    if (pg.kind === 'cover') pageCover(page, m);
    else if (pg.kind === 'story') pageStory(page, pg);
    else if (pg.kind === 'hardware') pageHardware(page, m);
    else if (pg.kind === 'challenge') pageChallenge(page, m);
    else if (pg.kind === 'science') pageScience(page, m);
    else pageEnding(page, m);
    book.appendChild(page);

    var nav = h('div', { class: 'nav' });
    nav.appendChild(h('button', { class: 'btn ghost', disabled: idx === 0 ? 'disabled' : null, onclick: function () { go('#/m/' + id + '/' + (idx - 1)); } }, ['← ', bi(B('上一頁', 'Back'), 'inline')]));
    if (idx < pages.length - 1) nav.appendChild(h('button', { class: 'btn', onclick: function () { go('#/m/' + id + '/' + (idx + 1)); } }, [bi(B('下一頁', 'Next'), 'inline'), ' →']));
    else {
      var nxt = M[(M.indexOf(m) + 1) % M.length];
      nav.appendChild(h('button', { class: 'btn', onclick: function () { go('#/m/' + nxt.id + '/0'); } }, [bi(B('下一個任務：', 'Next mission: '), 'inline'), bi(nxt.title, 'inline'), ' →']));
    }
    book.appendChild(nav);
    root.appendChild(book);
  }

  function pageCover(page, m) {
    var L = LEVELS.filter(function (x) { return x.id === store.level; })[0];
    page.appendChild(h('div', { class: 'cover' }, [
      h('h2', {}, [m.icon + ' ', bi(m.title)]),
      h('p', { class: 'lead' }, [bi(m.tagline)]),
      figure(m.cover),
      h('div', {}, [h('span', { class: 'badge' }, [L.icon + ' ', bi(B('你的身分：', 'Your role: '), 'inline'), h('b', {}, [bi(L.role, 'inline')]), ' · ', bi(L.age, 'inline')])]),
      h('p', { class: 'note' }, [T('這個任務共 6 個部分：故事 → 認識硬體 → 挑戰 → 科學成果 → 真實結局。可隨時在「挑戰任務」頁切換難度。',
        'This mission has: story → hardware → challenge → science → real ending. You can switch levels on the challenge page.')])
    ]));
  }
  function pageStory(page, pg) {
    page.appendChild(h('h2', {}, [bi(pg.s.title)]));
    page.appendChild(h('p', { class: 'lead' }, [bi(pg.s.text)]));
    if (pg.s.img) page.appendChild(figure(pg.s.img));
    if (pg.s.log) page.appendChild(h('aside', { class: 'mclog' }, [
      h('div', { class: 'mclog-h' }, ['📝 ', bi(B('任務控制室日誌', 'Mission control log'), 'inline'), h('span', { class: 'tag' }, [bi(B('情境描寫', 'A scene, not a record'), 'inline')])]),
      h('div', { class: 'mclog-t' }, [bi(pg.s.log)])]));
  }

  /* ---------- 3D 全息展示 ---------- */
  function holoStage(m) {
    var md = m.model, hot = md.parts.filter(function (p) { return p.pin; });
    var wrap = h('div', { class: 'holo-wrap' });
    var stage = h('div', { class: 'holo' });
    var detail = h('div', { class: 'holo-detail' });
    var chips = h('div', { class: 'chips' });
    var api = null, current = null, explodedNow = false;
    var btnEx = h('button', { class: 'btn small', 'aria-pressed': 'false' }, [bi(B('🔧 拆解', '🔧 Explode'), 'inline')]);
    var btnHome = h('button', { class: 'btn small ghost' }, [bi(B('↺ 回到全景', '↺ Reset view'), 'inline')]);
    var tools = h('div', { class: 'holo-tools' }, [btnEx, btnHome]);

    function renderDetail(p) {
      detail.innerHTML = '';
      if (!p) {
        detail.appendChild(h('div', { class: 'hint' }, [
          h('div', { class: 'hint-t' }, ['👆 ', bi(B('試試看', 'Try it'), 'inline')]),
          h('ul', {}, [
            h('li', {}, [bi(B('按住拖曳，旋轉3D 模型；滾輪或雙指可縮放。', 'Drag to rotate; scroll or pinch to zoom.'))]),
            h('li', {}, [bi(B('點發光的圓點（或下方按鈕），放大那個零件，看它的構造與功能。', 'Tap a glowing dot (or a button below) to zoom into a part and read how it is built and what it does.'))]),
            h('li', {}, [bi(B('按「拆解」，看零件一件一件分開。', 'Press “Explode” to see the parts come apart.'))])
          ])]));
        return;
      }
      detail.appendChild(h('h3', {}, [p.icon + ' ', bi(p.name, 'inline')]));
      var cols = h('div', { class: 'cols' });
      var c1 = h('div', { class: 'col' }, [h('h4', {}, ['🧩 ', bi(B('構造：它長什麼樣子？', 'Structure: what is it made of?'), 'inline')])]);
      var u1 = h('ul'); p.structure.forEach(function (t) { u1.appendChild(h('li', {}, [bi(t)])); }); c1.appendChild(u1);
      var c2 = h('div', { class: 'col' }, [h('h4', {}, ['⚙️ ', bi(B('功能：它負責什麼？', 'Function: what does it do?'), 'inline')])]);
      var u2 = h('ul'); p.func.forEach(function (t) { u2.appendChild(h('li', {}, [bi(t)])); }); c2.appendChild(u2);
      cols.appendChild(c1); cols.appendChild(c2); detail.appendChild(cols);
      if (p.note) detail.appendChild(h('div', { class: 'note' }, [bi(p.note)]));
    }
    function syncChips() { Array.prototype.forEach.call(chips.children, function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-id') === current)); }); }
    function choose(id) {
      if (!api) return;
      if (current === id) { current = null; api.clear(); renderDetail(null); syncChips(); return; }
      current = id; api.select(id);
      renderDetail(md.parts.filter(function (p) { return p.id === id; })[0]); syncChips();
    }
    hot.forEach(function (p) {
      chips.appendChild(h('button', { class: 'chip', 'data-id': p.id, 'aria-pressed': 'false', onclick: function () { choose(p.id); } }, [
        h('span', { class: 'cn' }, [String(md.parts.indexOf(p) + 1)]), p.icon + ' ', bi(p.name, 'inline')]));
    });
    btnEx.addEventListener('click', function () {
      if (!api) return; explodedNow = !explodedNow; api.setExplode(explodedNow);
      btnEx.setAttribute('aria-pressed', String(explodedNow));
      btnEx.innerHTML = ''; btnEx.appendChild(bi(explodedNow ? B('🔩 組合', '🔩 Assemble') : B('🔧 拆解', '🔧 Explode'), 'inline'));
    });
    btnHome.addEventListener('click', function () { current = null; if (api) api.clear(); renderDetail(null); syncChips(); });

    wrap.appendChild(stage); wrap.appendChild(tools); wrap.appendChild(chips); wrap.appendChild(detail);
    wrap.appendChild(h('div', { class: 'note holo-credit' }, [bi(md.credit)]));
    renderDetail(null);
    setTimeout(function () {
      if (!window.Holo || !Holo.supported()) { stage.appendChild(h('div', { class: 'holo-msg' }, ['這個瀏覽器無法顯示 3D 模型，請看下方文字卡片。 This browser cannot show the 3D model; see the cards below.'])); tools.style.display = 'none'; chips.style.display = 'none'; return; }
      api = Holo.mount(stage, { glb: md.glb, build: md.build, scene: md.scene, home: md.home, parts: Holo.partsCfg(md), onPick: choose });
      stage.appendChild(h('div', { class: 'scan' }));
    }, 0);
    return wrap;
  }


  function banner(page, m, kind) { if (m.banners && m.banners[kind]) page.appendChild(figure(m.banners[kind], 'banner')); }
  function pageHardware(page, m) {
    page.appendChild(h('h2', {}, [T('認識硬體：它是怎麼運作的？', 'Meet the hardware: how does it work?')]));
    banner(page, m, 'hardware');
    if (m.model) {
      page.appendChild(h('p', {}, [m.model.build ? T('這是一個 3D 模型（自製的簡化版），可以拖曳觀察，也能點進零件、拆解來看。', 'A 3D model (a simplified one made for this project): drag it around, tap into parts and take it apart.') : T('這是用 NASA 官方模型做成的 3D 模型，可以拖曳觀察，也能點進零件、拆解來看。', 'A 3D model built from NASA’s official model: drag it around, tap into parts and take it apart.')]));
      page.appendChild(holoStage(m));
      page.appendChild(h('h3', {}, [T('全部零件一覽', 'All parts at a glance')]));
    }
    page.appendChild(h('p', {}, [T('點開每一個零件，看看它的任務與運作方式。', 'Open each part to see its job and how it works.')]));
    var parts = h('div', { class: 'parts' });
    m.hardware.forEach(function (p) {
      var el = h('button', { class: 'part', 'aria-expanded': 'false' }, [
        h('div', { class: 'pi' }, [p.icon]), h('h4', {}, [bi(p.name)]), h('div', { class: 'tag note' }, [bi(p.short)]),
        h('div', { class: 'more' }, [h('div', {}, [bi(p.how)]), h('div', { class: 'why' }, [h('b', {}, ['★ ']), bi(p.why)])])
      ]);
      el.addEventListener('click', function () { var o = el.classList.toggle('open'); el.setAttribute('aria-expanded', String(o)); });
      parts.appendChild(el);
    });
    page.appendChild(parts);
  }
  function pageChallenge(page, m) {
    page.appendChild(h('h2', {}, [T('挑戰任務', 'Your challenge')]));
    banner(page, m, 'challenge');
    var tabs = h('div', { class: 'lvtabs', role: 'group', 'aria-label': 'Level' });
    LEVELS.forEach(function (L) {
      tabs.appendChild(h('button', { class: 'lvtab', 'aria-pressed': String(store.level === L.id), onclick: function () { store.level = L.id; save(); render(); } }, [
        L.icon + ' ', bi(L.age, 'inline'), ' ', isDone(m.id, L.id) ? h('span', { class: 'ck' }, ['✓']) : null
      ]));
    });
    page.appendChild(tabs);
    var ch = m.challenges[store.level];
    var L2 = LEVELS.filter(function (x) { return x.id === store.level; })[0];
    var box = h('div', { class: 'chbox' });
    box.appendChild(h('div', { class: 'role' }, [L2.icon + ' ', bi(L2.role, 'inline'), ' · ', bi(ch.title, 'inline')]));
    box.appendChild(h('div', { class: 'scenario' }, [bi(ch.scenario)]));
    var win = h('div');
    var solvedOnce = false;
    var ctx = { model: m.model, solved: function () {
      if (solvedOnce) return; solvedOnce = true; markDone(m.id, store.level);
      win.appendChild(h('div', { class: 'win', role: 'status' }, [h('b', {}, ['🎉 ']), bi(ch.success)]));
      var ck = tabs.children[store.level - 1]; if (ck && !ck.querySelector('.ck')) ck.appendChild(h('span', { class: 'ck' }, ['✓']));
    } };
    box.appendChild(E_run(ch, ctx));
    if (ch.note) box.appendChild(h('div', { class: 'note' }, [bi(ch.note)]));
    if (ch.type !== 'find3d') box.appendChild(h('div', { class: 'note' }, [T('※ 題目中的格數、分數與部分數值是「遊戲設定」，用來簡化說明，不是 NASA 的實測資料；真實事實已在故事頁標明來源。',
      '* Game numbers (cells, scores, some values) are simplified “game settings”, not NASA measurements. Real facts are sourced on the story pages.')]));
    box.appendChild(win);
    page.appendChild(box);
    if (isDone(m.id, store.level) && !solvedOnce) win.appendChild(h('div', { class: 'note' }, [T('✓ 你已經完成過這個難度，可以重玩或換難度。', '✓ You have already cleared this level. Replay or switch levels.')]));
  }
  function E_run(ch, ctx) { return window.ENGINES[ch.type](ch, ctx); }

  function pageScience(page, m) {
    page.appendChild(h('h2', {}, [T('它促成了哪些科學發現？', 'What science did it make possible?')]));
    banner(page, m, 'science');
    var ul = h('ul', { class: 'sci' });
    m.science.forEach(function (s) { ul.appendChild(h('li', {}, [h('span', { class: 'si' }, [s.icon]), h('div', {}, [bi(s.t)])])); });
    page.appendChild(ul);
  }
  function pageEnding(page, m) {
    page.appendChild(h('h2', {}, [T('真實結局', 'The real ending')]));
    page.appendChild(h('div', { class: 'ending' }, [bi(m.ending)]));
    if (m.endImg) page.appendChild(figure(m.endImg));
    page.appendChild(h('h3', {}, [T('資料來源', 'Sources')]));
    var ul = h('ul', { class: 'src' });
    m.sources.forEach(function (s) { ul.appendChild(h('li', {}, [h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer' }, [s.label]), s.note ? ' — ' : null, s.note ? bi(s.note, 'inline') : null])); });
    page.appendChild(ul);
  }

  /* ---------- 關於頁 ---------- */
  function renderAbout(root) {
    var book = h('div', { class: 'book' });
    book.appendChild(h('div', { class: 'crumb' }, [h('a', { href: '#/' }, ['← ', bi(B('首頁', 'Home'), 'inline')])]));
    book.appendChild(h('h2', {}, [T('關於這個作品', 'About this project')]));
    [
      ['這是一個為學齡孩子設計的雙語互動電子書。孩子扮演 NASA 見習工程師，透過 5 個真實任務（機智號、機會號、航海家1號、火星氣候軌道器、金唱片）的故事，學習硬體的目的、運作方式，以及它們促成的科學探索。',
        'A bilingual interactive e-book for school-age explorers. Players act as NASA engineers and learn what five real pieces of hardware were for, how they worked, and what science they made possible.'],
      ['每個任務有 4 個難度（6–8、9–12、13–15、16–18 歲）。',
        'Each mission has 4 levels (ages 6–8, 9–12, 13–15, 16–18).'],
      ['影像：全部來自 NASA 影像與影片資料庫（images.nasa.gov），圖說列出來源編號與版權／提供者；萊特兄弟照片來自美國國會圖書館。',
        'Images: all from the NASA Image and Video Library (images.nasa.gov), with IDs and credits in captions; the Wright brothers photo is from the Library of Congress.'],
      ['免責聲明：本作品是個人學習與黑客松作品，與 NASA 無隸屬關係，也未獲 NASA 背書。',
        'Disclaimer: This is an independent educational hackathon project. It is not affiliated with or endorsed by NASA.'],
      ['「遊戲設定」：為了讓題目好玩而簡化的數值（電量格數、分數、基準轉速等），不是 NASA 的測量資料。真實事實皆在故事頁附上官方來源。',
        '“Game settings”: simplified numbers made for gameplay (power cells, scores, baseline rpm). They are not NASA measurements. Real facts cite official sources on the story pages.'],
      ['程式碼與內容可自由學習與改作；詳見 README。',
        'Code and content are free to learn from and adapt; see the README.']
    ].forEach(function (p) { book.appendChild(h('p', {}, [T(p[0], p[1])])); });
    root.appendChild(book);
  }

  /* ---------- 路由 ---------- */
  function render() {
    var root = document.getElementById('app'); root.innerHTML = '';
    var hash = location.hash || '#/';
    var parts = hash.replace(/^#\/?/, '').split('/');
    try {
      if (parts[0] === 'm' && parts[1]) renderMission(root, parts[1], parseInt(parts[2], 10) || 0);
      else if (parts[0] === 'about') renderAbout(root);
      else renderHome(root);
    } catch (err) {
      root.appendChild(h('p', { class: 'msg bad' }, ['Something went wrong: ' + err.message]));
      if (window.console) console.error(err);
    }
    window.scrollTo(0, 0);
  }
  document.getElementById('footer').appendChild(h('div', {}, [
    bi(B('Ghost Rovers 遺落的探險家 · 影像：NASA 影像與影片資料庫 · 非 NASA 官方作品', 'Ghost Rovers · Images: NASA Image and Video Library · Not affiliated with NASA'))
  ]));
  window.addEventListener('hashchange', render);
  applyLang();
  render();
})();
