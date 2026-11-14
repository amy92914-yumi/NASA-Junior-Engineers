/* 互動關卡引擎：每個引擎接收 (關卡資料 ch, 控制物件 ctx)，回傳 DOM。
   ctx.solved() 在全部完成時呼叫一次。所有文字皆為 {zh,en} 雙語物件。 */
(function () {
  'use strict';

  function h(tag, props, kids) {
    var e = document.createElement(tag);
    if (props) for (var k in props) {
      if (props[k] == null) continue;
      if (k === 'class') e.className = props[k];
      else if (k === 'html') e.innerHTML = props[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), props[k]);
      else e.setAttribute(k, props[k]);
    }
    (kids || []).forEach(function (c) {
      if (c == null) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }
  function bi(o, cls) {
    if (typeof o === 'string') return h('span', { class: cls || '' }, [o]);
    if (o.zh === o.en) return h('span', { class: (cls || '') }, [o.zh]);
    var s = h('span', { class: 'bi ' + (cls || '') });
    s.appendChild(h('span', { class: 'zh', html: o.zh }));
    s.appendChild(h('span', { class: 'en', html: o.en }));
    return s;
  }
  var S = {
    check: { zh: '檢查答案', en: 'Check' },
    hint: { zh: '給我提示', en: 'Hint' },
    ok: { zh: '答對了！', en: 'Correct!' },
    tryAgain: { zh: '再想一想，或按「給我提示」。', en: 'Not yet. Think again, or press Hint.' },
    confirm: { zh: '確認方案', en: 'Confirm plan' },
    reset: { zh: '重來', en: 'Reset' },
    pass: { zh: '這一輪通過！', en: 'Round cleared!' }
  };
  function msg(box, kind, content) {
    box.className = 'msg ' + (kind || '');
    box.innerHTML = '';
    if (window.SFX && (kind === 'ok' || kind === 'bad')) SFX.play(kind);
    if (content) box.appendChild(typeof content === 'string' ? document.createTextNode(content) : content);
  }
  function mk(zh, en) { return { zh: zh, en: en }; }

  var E = {};

  /* ---------- 滑桿：調整轉速讓直升機懸停 ---------- */
  E.slider = function (ch, ctx) {
    var wrap = h('div');
    var solved = {};
    var cur = 0;
    var P = ch.planets;
    var tabs = h('div', { class: 'lvtabs' });
    var stage = h('div', { class: 'stage' });
    var heliEl = h('div', { class: 'heli' }, [h('span', { class: 'rotor' }), '🚁']);
    stage.appendChild(heliEl);
    var rpmTxt = h('div', { class: 'role' });
    var meter = h('div', { class: 'meter' });
    var fill = h('div', { class: 'fill' });
    var mark = h('div', { class: 'mark' });
    meter.appendChild(fill); meter.appendChild(mark);
    var range = h('input', { type: 'range', min: ch.min, max: ch.max, step: ch.step, 'aria-label': 'rpm' });
    var out = h('div', { class: 'msg' });

    function drawTabs() {
      tabs.innerHTML = '';
      if (P.length < 2) return;
      P.forEach(function (p, i) {
        tabs.appendChild(h('button', {
          class: 'lvtab', 'aria-pressed': String(i === cur),
          onclick: function () { cur = i; range.value = ch.start || 0; drawTabs(); update(); }
        }, [bi(p.label), solved[p.id] ? h('span', { class: 'ck' }, [' ✓']) : null]));
      });
    }
    function update() {
      var p = P[cur];
      stage.className = 'stage ' + p.theme;
      var rpm = Number(range.value);
      var lift = Math.pow(rpm / p.needed, 2);
      rpmTxt.textContent = rpm + ' rpm';
      var pct = Math.min(100, lift * 50);
      fill.style.width = pct + '%';
      mark.style.left = '50%';
      heliEl.querySelector('.rotor').style.animationDuration = (rpm < 30 ? 0 : Math.max(0.04, 90 / rpm)) + 's';
      heliEl.querySelector('.rotor').style.animationPlayState = rpm < 30 ? 'paused' : 'running';
      heliEl.className = 'heli';
      if (lift < 0.9) {
        heliEl.style.bottom = (12 + Math.min(lift, 0.9) * 8) + 'px';
        msg(out, '', bi(lift < 0.3 ? p.low : p.almost));
      } else if (lift <= 1.2) {
        heliEl.style.bottom = '100px';
        msg(out, 'ok', bi(p.hover));
        if (!solved[p.id]) { solved[p.id] = true; drawTabs(); if (P.every(function (q) { return solved[q.id]; })) ctx.solved(); }
      } else {
        heliEl.style.bottom = '165px';
        heliEl.className = 'heli shake';
        msg(out, 'bad', bi(p.high));
      }
    }
    range.value = ch.start || 0;
    range.addEventListener('input', update);
    wrap.appendChild(tabs);
    wrap.appendChild(stage);
    wrap.appendChild(rpmTxt);
    wrap.appendChild(h('div', { class: 'note' }, [bi(mk('升力條：綠線＝剛好等於機身重量。', 'Lift meter: the green line = exactly the weight of the helicopter.'))]));
    wrap.appendChild(meter);
    wrap.appendChild(range);
    wrap.appendChild(out);
    drawTabs(); update();
    return wrap;
  };

  /* ---------- 計算題 ---------- */
  E.calc = function (ch, ctx) {
    var wrap = h('div');
    var remaining = ch.questions.length;
    ch.questions.forEach(function (q, idx) {
      var card = h('div', { class: 'qcard' });
      var input = h('input', { type: 'number', step: 'any', inputmode: 'decimal', 'aria-label': 'answer' });
      var box = h('div', { class: 'msg' });
      var tries = 0, done = false;
      function check() {
        if (done) return;
        var v = parseFloat(String(input.value).replace(',', '.'));
        if (isNaN(v)) { msg(box, 'bad', bi(mk('請先輸入數字。', 'Please enter a number.'))); return; }
        if (Math.abs(v - q.answer) <= q.tol) {
          done = true; card.className = 'qcard solved';
          var c = h('div'); c.appendChild(h('b', {}, ['✓ '])); c.appendChild(bi(S.ok)); c.appendChild(h('div', { class: 'note' }, [bi(q.explain)]));
          msg(box, 'ok', c);
          input.disabled = true;
          remaining--; if (remaining === 0) ctx.solved();
        } else {
          if (ctx.reveal) {
            done = true; card.className = 'qcard solved'; input.disabled = true; ctx.revealed = true;
            var cr = h('div'); cr.appendChild(h('b', {}, ['✗ ']));
            cr.appendChild(bi(mk('不太對。正確答案是 ' + q.answer + '。', 'Not quite. The correct answer is ' + q.answer + '.')));
            if (q.hint) cr.appendChild(h('div', { class: 'note' }, [bi(q.hint)]));
            cr.appendChild(h('div', { class: 'note' }, [bi(q.explain)]));
            msg(box, 'bad', cr); remaining--; if (remaining === 0) ctx.solved(); return;
          }
          tries++;
          var c2 = h('div'); c2.appendChild(bi(S.tryAgain));
          if (tries >= 2 && q.hint) c2.appendChild(h('div', { class: 'note' }, [h('b', {}, ['💡 ']), bi(q.hint)]));
          msg(box, 'bad', c2);
        }
      }
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      card.appendChild(h('div', {}, [h('b', {}, [(idx + 1) + '. ']), bi(q.q)]));
      var row = h('div', { class: 'qrow' }, [input, q.unit ? bi(q.unit, 'inline') : null,
        h('button', { class: 'btn small', onclick: check }, [bi(S.check, 'inline')]),
        q.hint ? h('button', { class: 'btn small ghost', onclick: function () { msg(box, '', h('div', {}, [h('b', {}, ['💡 ']), bi(q.hint)])); } }, [bi(S.hint, 'inline')]) : null]);
      card.appendChild(row); card.appendChild(box);
      wrap.appendChild(card);
    });
    return wrap;
  };

  /* ---------- 選擇題（可多題，答對才進下一題） ---------- */
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  E.choice = function (ch, ctx) {
    var wrap = h('div');
    var remaining = ch.questions.length;
    ch.questions.forEach(function (q, idx) {
      var card = h('div', { class: 'qcard' });
      var box = h('div', { class: 'msg' });
      var finished = false;
      card.appendChild(h('div', {}, [h('b', {}, [(idx + 1) + '. ']), bi(q.q)]));
      var opts = shuffle(q.options.slice());
      opts.forEach(function (o) {
        var b = h('button', { class: 'opt' }, [bi(o.t)]);
        b.addEventListener('click', function () {
          if (finished) return;
          if (o.correct) {
            finished = true; b.className = 'opt right'; card.className = 'qcard solved';
            var c = h('div'); c.appendChild(h('b', {}, ['✓ '])); c.appendChild(bi(o.why));
            msg(box, 'ok', c);
            remaining--; if (remaining === 0) ctx.solved();
          } else {
            b.className = 'opt wrong';
            var c2 = h('div'); c2.appendChild(h('b', {}, ['✗ '])); c2.appendChild(bi(o.why));
            if (ctx.reveal) {
              finished = true; card.className = 'qcard solved'; ctx.revealed = true;
              var good = q.options.filter(function (x) { return x.correct; })[0];
              Array.prototype.forEach.call(card.querySelectorAll('.opt'), function (el, k) { if (opts[k] && opts[k].correct) el.className = 'opt right'; });
              if (good) { c2.appendChild(h('div', { class: 'note' }, [h('b', {}, [bi(mk('正確答案：', 'Correct answer: '), 'inline'), bi(good.t, 'inline')])])); c2.appendChild(h('div', { class: 'note' }, [bi(good.why)])); }
              msg(box, 'bad', c2); remaining--; if (remaining === 0) ctx.solved(); return;
            }
            msg(box, 'bad', c2);
          }
        });
        card.appendChild(b);
      });
      card.appendChild(box);
      wrap.appendChild(card);
    });
    return wrap;
  };

  /* ---------- 預算：在有限格數內做取捨（可多輪） ---------- */
  E.budget = function (ch, ctx) {
    var wrap = h('div');
    var r = 0;
    var sel = {};
    var body = h('div');
    wrap.appendChild(body);

    function render() {
      var R = ch.rounds[r];
      body.innerHTML = '';
      sel = {};
      ch.items.forEach(function (it) { if (it.must) sel[it.id] = true; });
      var head = h('div', { class: 'qcard' }, [
        h('div', {}, [h('b', {}, [ch.rounds.length > 1 ? ((r + 1) + '/' + ch.rounds.length + ' · ') : '']), bi(R.label)]),
        R.story ? h('div', { class: 'note' }, [bi(R.story)]) : null
      ]);
      var gauge = h('div', { class: 'gauge', 'aria-hidden': 'true' });
      var stat = h('div', { class: 'note' });
      var box = h('div', { class: 'msg' });
      var grid = h('div', { class: 'items' + (ch.items.length >= 6 ? ' dense' : '') });
      function used() { var c = 0; ch.items.forEach(function (it) { if (sel[it.id]) c += it.cost; }); return c; }
      function score() { var c = 0; ch.items.forEach(function (it) { if (sel[it.id] && !it.must) c += it.value; }); return c; }
      function draw() {
        gauge.innerHTML = '';
        var u = used();
        for (var i = 0; i < Math.max(R.capacity, u); i++) {
          gauge.appendChild(h('div', { class: 'cell ' + (i < u ? (i >= R.capacity ? 'over' : 'used') : '') }));
        }
        stat.innerHTML = '';
        stat.appendChild(bi(mk('已用 ' + u + ' / 可用 ' + R.capacity + ' ' + ch.unit.zh + '　科學價值 ' + score() + (R.minValue ? '（需要 ≥ ' + R.minValue + '）' : ''),
          'Used ' + u + ' / Available ' + R.capacity + ' ' + ch.unit.en + '   Science value ' + score() + (R.minValue ? ' (need ≥ ' + R.minValue + ')' : ''))));
        Array.prototype.forEach.call(grid.children, function (el) {
          var id = el.getAttribute('data-id');
          el.className = 'item' + (sel[id] ? ' on' : '') + (el.getAttribute('data-must') === '1' ? ' must' : '');
          el.setAttribute('aria-pressed', sel[id] ? 'true' : 'false');
        });
      }
      ch.items.forEach(function (it) {
        var meta = it.must
          ? mk('必須保留 · 耗電 ' + it.cost, 'Must stay on · uses ' + it.cost)
          : mk('耗電 ' + it.cost + ' · 科學價值 ' + it.value, 'Uses ' + it.cost + ' · science value ' + it.value);
        var b = h('button', { class: 'item', 'data-id': it.id, 'data-must': it.must ? '1' : '0', 'aria-pressed': 'false' }, [
          h('div', {}, [h('span', {}, [it.icon + ' ']), h('b', {}, [bi(it.name, 'inline')])]),
          h('div', { class: 'meta' }, [bi(it.desc)]),
          h('div', { class: 'meta' }, [bi(meta)])
        ]);
        b.addEventListener('click', function () {
          if (it.must) return;
          sel[it.id] = !sel[it.id];
          msg(box, '');
          draw();
        });
        grid.appendChild(b);
      });
      var go = h('button', { class: 'btn', onclick: function () {
        var u = used();
        if (u > R.capacity) { msg(box, 'bad', bi(mk('用電超過了！請關掉一些裝置。', 'Over budget! Switch something off.'))); return; }
        if (R.needCats) {
          var have = {};
          ch.items.forEach(function (it) { if (sel[it.id] && it.cat) have[it.cat] = true; });
          var lack = R.needCats.filter(function (c) { return !have[c]; });
          if (lack.length) { msg(box, 'bad', bi(mk('還缺少這些類別：' + lack.map(function (c) { return ch.cats[c].zh; }).join('、'), 'Still missing: ' + lack.map(function (c) { return ch.cats[c].en; }).join(', ')))); return; }
        }
        if (score() < (R.minValue || 0)) { msg(box, 'bad', bi(mk('科學價值還不夠，想想有沒有更划算的組合。', 'Not enough science value yet. Is there a better combination?'))); return; }
        var c = h('div'); c.appendChild(h('b', {}, ['✓ '])); c.appendChild(bi(S.pass)); c.appendChild(h('div', { class: 'note' }, [bi(R.explain)]));
        msg(box, 'ok', c);
        go.disabled = true;
        Array.prototype.forEach.call(grid.children, function (el) { el.disabled = true; });
        if (r + 1 < ch.rounds.length) {
          box.appendChild(h('button', { class: 'btn small', onclick: function () { r++; render(); } }, [bi(mk('下一輪 →', 'Next round →'), 'inline')]));
        } else { ctx.solved(); }
      } }, [bi(S.confirm, 'inline')]);
      body.appendChild(head); body.appendChild(gauge); body.appendChild(stat); body.appendChild(grid); body.appendChild(go); body.appendChild(box);
      draw();
    }
    render();
    return wrap;
  };

  /* ---------- 排序：依正確順序點選 ---------- */
  E.order = function (ch, ctx) {
    var wrap = h('div');
    var seq = [];
    var shuffled = ch.items.slice().reverse();
    shuffled.push(shuffled.shift()); shuffled.push(shuffled.shift());
    if (shuffled.every(function (s, i) { return s.id === ch.items[i].id; })) shuffled.reverse();
    var slots = h('div', { class: 'slots' });
    var pool = h('div', { class: 'items' });
    var box = h('div', { class: 'msg' });
    var locked = false;
    function draw() {
      slots.innerHTML = '';
      for (var i = 0; i < ch.items.length; i++) {
        var it = seq[i];
        slots.appendChild(h('div', { class: 'slot' + (it ? ' fill' : '') }, [h('b', {}, [(i + 1) + '. ']), it ? bi(it.t) : '…']));
      }
      Array.prototype.forEach.call(pool.children, function (el) {
        var used = seq.some(function (s) { return s.id === el.getAttribute('data-id'); });
        el.style.display = used ? 'none' : '';      /* 已填入的選項直接消失 */
        el.disabled = locked;
        el.style.opacity = 1;
      });
    }
    shuffled.forEach(function (it) {
      pool.appendChild(h('button', { class: 'item', 'data-id': it.id, onclick: function () {
        if (locked) return;
        seq.push(it); msg(box, ''); draw();
        if (seq.length === ch.items.length) {
          var good = seq.every(function (s, i) { return s.id === ch.items[i].id; });
          if (good) {
            locked = true; draw();
            var c = h('div'); c.appendChild(h('b', {}, ['✓ '])); c.appendChild(bi(S.ok)); c.appendChild(h('div', { class: 'note' }, [bi(ch.explain)]));
            msg(box, 'ok', c); ctx.solved();
          } else {
            if (ctx.reveal) {
              locked = true; ctx.revealed = true; draw();
              var cr = h('div'); cr.appendChild(h('b', {}, [bi(mk('✗ 順序不太對。正確順序是：', '✗ Not quite. The correct order is:'), 'inline')]));
              var ol = h('ol', { class: 'src' }); ch.items.forEach(function (x) { ol.appendChild(h('li', {}, [bi(x.t, 'inline')])); }); cr.appendChild(ol); pool.style.display = 'none';
              cr.appendChild(h('div', { class: 'note' }, [bi(ch.explain)]));
              msg(box, 'bad', cr); ctx.solved(); return;
            }
            msg(box, 'bad', bi(mk('順序不太對，按「重來」再排一次。提示：' + ch.hint.zh, 'Not quite. Press Reset and try again. Hint: ' + ch.hint.en)));
          }
        }
      } }, [bi(it.t)]));
    });
    wrap.appendChild(h('div', { class: 'note' }, [bi(mk('依發生順序，一個一個點選：', 'Tap them one by one in order of when they happened:'))]));
    wrap.appendChild(slots); wrap.appendChild(pool);
    wrap.appendChild(h('button', { class: 'btn small ghost', onclick: function () { if (locked) return; seq = []; msg(box, ''); draw(); } }, [bi(S.reset, 'inline')]));
    wrap.appendChild(box);
    draw();
    return wrap;
  };

  /* ---------- 偵錯：在表格中點出出錯的那一列，再回答後續選擇題 ---------- */
  E.detective = function (ch, ctx) {
    var wrap = h('div');
    var box = h('div', { class: 'msg' });
    var after = h('div');
    var found = false;
    var tbl = h('table', { class: 'tbl' });
    var thead = h('tr'); ch.cols.forEach(function (c) { thead.appendChild(h('th', {}, [bi(c)])); });
    tbl.appendChild(h('thead', {}, [thead]));
    var tb = h('tbody');
    ch.rows.forEach(function (row, i) {
      var tr = h('tr', { class: 'pick', tabindex: '0', role: 'button' });
      row.forEach(function (cell) { tr.appendChild(h('td', {}, [bi(cell)])); });
      function pickRow() {
        if (found) return;
        if (i === ch.wrongRow) {
          found = true; tr.className = 'hit';
          var c = h('div'); c.appendChild(h('b', {}, ['✓ '])); c.appendChild(bi(ch.foundMsg));
          msg(box, 'ok', c);
          if (ch.after) { after.appendChild(E.choice(ch.after, ctx)); } else { ctx.solved(); }
        } else {
          msg(box, 'bad', bi(ch.wrongMsg));
        }
      }
      tr.addEventListener('click', pickRow);
      tr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickRow(); } });
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    wrap.appendChild(tbl); wrap.appendChild(box); wrap.appendChild(after);
    return wrap;
  };

  /* ---------- 挑選：從候選清單挑 N 項，可附規則（類別／地區多樣性） ---------- */
  E.pick = function (ch, ctx) {
    var wrap = h('div');
    var sel = {};
    var grid = h('div', { class: 'items' + (ch.items.length >= 6 ? ' dense' : '') });
    var box = h('div', { class: 'msg' });
    var counter = h('div', { class: 'note' });
    function count() { return ch.items.filter(function (i) { return sel[i.id]; }).length; }
    function draw() {
      counter.innerHTML = '';
      counter.appendChild(bi(mk('已選 ' + count() + ' / ' + ch.count, 'Chosen ' + count() + ' / ' + ch.count)));
      Array.prototype.forEach.call(grid.children, function (el) {
        var on = !!sel[el.getAttribute('data-id')];
        el.className = 'item' + (on ? ' on' : '');
        el.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    ch.items.forEach(function (it) {
      grid.appendChild(h('button', { class: 'item', 'data-id': it.id, 'aria-pressed': 'false', onclick: function () {
        if (sel[it.id]) delete sel[it.id];
        else if (count() < ch.count) sel[it.id] = true;
        msg(box, ''); draw();
      } }, [h('div', {}, [h('span', {}, [it.icon + ' ']), h('b', {}, [bi(it.t, 'inline')])])]));
    });
    var go = h('button', { class: 'btn', onclick: function () {
      if (count() !== ch.count) { msg(box, 'bad', bi(mk('請剛好選 ' + ch.count + ' 項。', 'Please choose exactly ' + ch.count + '.'))); return; }
      var chosen = ch.items.filter(function (i) { return sel[i.id]; });
      var c = h('div');
      var ul = h('ul', { class: 'src' });
      chosen.forEach(function (it) { ul.appendChild(h('li', {}, [h('b', {}, [it.icon + ' ']), bi(it.tells)])); });
      c.appendChild(h('div', {}, [h('b', {}, [bi(mk('你的選擇會告訴對方：', 'Your choices tell the receiver:'))])])); c.appendChild(ul);
      var failed = [];
      (ch.rules || []).forEach(function (rule) {
        var set = {};
        chosen.forEach(function (it) {
          var v = it[rule.type === 'cats' ? 'cat' : 'region'];
          if (!v) return;
          if (rule.type === 'regions' && v === 'global') return;
          set[v] = true;
        });
        var n = Object.keys(set).length;
        if (n < rule.min) failed.push(rule.fail);
      });
      if (failed.length) {
        failed.forEach(function (f) { c.appendChild(h('div', { class: 'note' }, [h('b', {}, ['⚠ ']), bi(f)])); });
        msg(box, 'bad', c);
      } else {
        c.appendChild(h('div', { class: 'note' }, [bi(ch.explain)]));
        msg(box, 'ok', c); ctx.solved();
      }
    } }, [bi(S.confirm, 'inline')]);
    wrap.appendChild(counter); wrap.appendChild(grid); wrap.appendChild(go); wrap.appendChild(box);
    draw();
    return wrap;
  };


  /* ---------- 3D 找零件：看情境，在3D 模型上點選負責的零件（不用計算） ---------- */
  E.find3d = function (ch, ctx) {
    var model = ctx.model, wrap = h('div', { class: 'find3d' });
    var parts = {}; model.parts.forEach(function (p) { parts[p.id] = p; });
    var idx = 0, done = false, locked = false;
    var stage = h('div', { class: 'holo quiz' });
    var panel = h('div', { class: 'qcard' });
    var fb = h('div', { class: 'msg' });
    var next = h('button', { class: 'btn small', style: 'display:none' }, [bi(mk('下一題 →', 'Next →'), 'inline')]);
    var api = null;

    function show() {
      var q = ch.questions[idx]; locked = false;
      panel.innerHTML = '';
      panel.appendChild(h('div', { class: 'qprog' }, [bi(mk('第 ' + (idx + 1) + ' / ' + ch.questions.length + ' 題', 'Question ' + (idx + 1) + ' of ' + ch.questions.length), 'inline')]));
      panel.appendChild(h('div', { class: 'qtext' }, [bi(q.q)]));
      panel.appendChild(h('div', { class: 'note' }, [bi(mk('👆 轉動3D 模型，點選發光的零件作答', '👆 Rotate the model and tap a glowing part'), 'inline')]));
      msg(fb, ''); next.style.display = 'none';
      if (api) api.resetMarks();
    }
    function pick(id) {
      if (locked || done || !parts[id]) return;
      var q = ch.questions[idx];
      if (id === q.answer) {
        locked = true; api.mark(id, 'ok'); api.select(id);
        var c = h('div'); c.appendChild(h('b', {}, ['✓ '])); c.appendChild(bi(q.explain));
        msg(fb, 'ok', c);
        if (idx === ch.questions.length - 1) { done = true; ctx.solved(); }
        else next.style.display = '';
      } else {
        api.mark(id, 'bad');
        var p = parts[id], c2 = h('div');
        c2.appendChild(h('b', {}, ['✗ ']));
        c2.appendChild(bi(mk('這是「' + p.name.zh + '」。它的任務是：' + p.func[0].zh + ' 再想想看，是哪個零件？', 'That is the “' + p.name.en + '”. Its job: ' + p.func[0].en + ' Think again: which part is it?')));
        msg(fb, 'bad', c2);
        setTimeout(function () { if (api && !locked) api.mark(id, null); }, 1400);
      }
    }
    next.addEventListener('click', function () { idx++; api.home(); show(); });

    if (ctx.stageHost) ctx.stageHost.appendChild(stage); else wrap.appendChild(stage);
    wrap.appendChild(panel); wrap.appendChild(fb); wrap.appendChild(next);
    show();
    setTimeout(function () {
      if (!window.Holo || !Holo.supported()) { stage.appendChild(h('div', { class: 'holo-msg' }, ['這個瀏覽器無法顯示 3D 模型。 This browser cannot show the 3D model.'])); return; }
      api = Holo.mount(stage, { glb: model.glb, build: model.build, scene: model.scene, home: model.home, parts: Holo.partsCfg(model), onPick: pick });
      stage.appendChild(h('div', { class: 'scan' }));
    }, 0);
    return wrap;
  };


  window.ENGINES = E;
  window.U = { h: h, bi: bi };
})();
