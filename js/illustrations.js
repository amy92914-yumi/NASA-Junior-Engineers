/* 示意圖（本作品繪製的向量圖，不是照片）。每張圖的文字都是中英對照的短句。
   window.ILLS[id] = { zh, en（圖說）, svg（HTML 字串） } */
(function () {
  'use strict';
  var BG = '#0f1a36', LINE = '#2c3a66', TXT = '#eef2ff', MUT = '#a9b4d6', AMB = '#ffb454', CY = '#5fd0ff', RED = '#ff6b6b', GRN = '#4ade80';

  function svg(inner, title) {
    return '<svg viewBox="0 0 800 450" role="img" aria-label="' + title + '" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
      '<rect width="800" height="450" rx="18" fill="' + BG + '"/>' + inner + '</svg>';
  }
  function t(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" fill="' + (o.c || TXT) + '" font-size="' + (o.s || 20) + '" text-anchor="' + (o.a || 'middle') + '"' + (o.b ? ' font-weight="700"' : '') + '>' + s + '</text>';
  }
  /* 固定亂數，讓每次畫出的點一樣 */
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function dots(n, x0, y0, w, h, seed, col, r) {
    var R = rnd(seed), o = '';
    for (var i = 0; i < n; i++) o += '<circle cx="' + (x0 + R() * w).toFixed(1) + '" cy="' + (y0 + R() * h).toFixed(1) + '" r="' + r + '" fill="' + col + '" opacity=".85"/>';
    return o;
  }
  function heli(cx, cy, span, col) {
    return '<g stroke="' + col + '" stroke-width="4" stroke-linecap="round" fill="none">' +
      '<line x1="' + (cx - span) + '" y1="' + (cy - 46) + '" x2="' + (cx + span) + '" y2="' + (cy - 46) + '"/>' +
      '<line x1="' + cx + '" y1="' + (cy - 46) + '" x2="' + cx + '" y2="' + (cy - 20) + '"/>' +
      '<line x1="' + (cx - 14) + '" y1="' + (cy + 14) + '" x2="' + (cx - 26) + '" y2="' + (cy + 40) + '"/>' +
      '<line x1="' + (cx + 14) + '" y1="' + (cy + 14) + '" x2="' + (cx + 26) + '" y2="' + (cy + 40) + '"/></g>' +
      '<rect x="' + (cx - 16) + '" y="' + (cy - 20) + '" width="32" height="34" rx="5" fill="' + col + '" opacity=".9"/>';
  }

  var ILLS = {};

  /* 1. 機智號：稀薄的空氣 */
  ILLS.ing_air = {
    zh: '示意圖：同一架直升機，在空氣濃的地球與空氣稀薄的火星（不按比例）', en: 'Illustration: the same helicopter in thick Earth air and thin Mars air (not to scale)',
    svg: '<svg viewBox="0 0 520 660" role="img" aria-label="稀薄的空氣示意圖" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
      '<rect width="520" height="660" rx="18" fill="' + BG + '"/>' +
      '<rect x="20" y="18" width="480" height="250" rx="14" fill="#16335a"/><rect x="20" y="282" width="480" height="250" rx="14" fill="#4a2a22"/>' +
      dots(110, 30, 28, 460, 230, 7, '#9fd4ff', 2.6) + dots(12, 30, 292, 460, 230, 11, '#f2b08a', 2.6) +
      heli(260, 150, 52, '#ffffff') + heli(260, 414, 118, '#ffd9b3') +
      '<path d="M120 368 q-18 -10 0 -20 M400 368 q18 -10 0 -20" stroke="' + AMB + '" stroke-width="3" fill="none"/>' +
      t(260, 56, '地球 · Earth', { b: 1, s: 24 }) + t(260, 320, '火星 · Mars', { b: 1, s: 24 }) +
      t(260, 244, '空氣粒子很多 · Lots of air', { s: 19 }) + t(260, 486, '旋翼要更大、轉得更快（約 2,400 rpm）', { c: AMB, s: 17 }) + t(260, 514, '空氣粒子很少 · Very little air', { s: 19 }) +
      t(260, 582, '火星的空氣比地球稀薄約 99%', { b: 1, s: 22 }) + t(260, 612, 'Mars’s air is about 99% less dense than Earth’s', { c: MUT, s: 16 }) + '</svg>'
  };

  /* 2. 航海家1號：一光日 */
  ILLS.voy_lightday = {
    zh: '示意圖：訊號從地球傳到航海家1號，單程要約 23 小時 58 分（不按比例）', en: 'Illustration: a signal from Earth to Voyager 1 takes about 23 h 58 min one way (not to scale)',
    svg: svg(
      dots(60, 10, 10, 780, 330, 21, '#cdd8ff', 1.4) +
      '<circle cx="120" cy="170" r="46" fill="#2b6fd6"/><path d="M95 150 q20 -16 40 4 q-6 20 -26 18 q-10 -6 -14 -22z" fill="#4ade80" opacity=".8"/>' +
      '<g transform="translate(660 170)"><rect x="-14" y="-10" width="28" height="20" fill="#d6dcf5"/><path d="M-14 -4 l-32 -18 l0 44 l32 -18z" fill="#8fa0d8"/><circle cx="-52" cy="0" r="3" fill="' + AMB + '"/><line x1="14" y1="0" x2="48" y2="0" stroke="#d6dcf5" stroke-width="4"/></g>' +
      '<line x1="175" y1="170" x2="598" y2="170" stroke="' + CY + '" stroke-width="3" stroke-dasharray="4 10"/>' +
      '<circle cx="260" cy="170" r="9" fill="' + AMB + '"/><circle cx="395" cy="170" r="9" fill="' + AMB + '" opacity=".7"/><circle cx="530" cy="170" r="9" fill="' + AMB + '" opacity=".45"/>' +
      t(120, 250, '地球 · Earth', { b: 1 }) + t(660, 250, '航海家1號 · Voyager 1', { b: 1 }) +
      t(400, 130, '一個指令 · One command', { c: AMB, s: 20 }) +
      '<rect x="60" y="300" width="680" height="30" rx="15" fill="#1d2a4f"/><rect x="60" y="300" width="680" height="30" rx="15" fill="' + CY + '" opacity=".35"/>' +
      t(400, 322, '單程約 23 小時 58 分 ≈ 1 光日 · One way ≈ 1 light-day', { s: 17 }) +
      t(400, 380, '你傳出指令，要等一天才會到，再等一天才聽得到回覆', { b: 1, s: 20 }) + t(400, 408, 'A command takes a day to arrive; the reply takes another day to return', { c: MUT, s: 16 }), '訊號傳到航海家1號的示意圖')
  };

  /* 3. 火星氣候軌道器：九個多月的航程 */
  ILLS.mco_trip = {
    zh: '示意圖：氣候軌道器從地球飛向火星的航程（不按比例）', en: 'Illustration: the Climate Orbiter’s trip from Earth to Mars (not to scale)',
    svg: svg(
      dots(40, 10, 10, 780, 360, 31, '#cdd8ff', 1.3) +
      '<circle cx="400" cy="215" r="26" fill="#ffd166"/><circle cx="400" cy="215" r="150" fill="none" stroke="' + LINE + '" stroke-width="2"/><circle cx="400" cy="215" r="215" fill="none" stroke="' + LINE + '" stroke-width="2"/>' +
      '<path d="M400 65 C 650 70, 630 330, 400 428" fill="none" stroke="' + CY + '" stroke-width="4" stroke-dasharray="8 8"/>' +
      '<circle cx="400" cy="65" r="14" fill="#2b6fd6"/><circle cx="400" cy="430" r="18" fill="#c8552d"/>' +
      '<circle cx="648" cy="205" r="9" fill="' + AMB + '"/><path d="M634 205 l-14 -8 l0 16z" fill="' + AMB + '"/>' +
      t(400, 38, '1998/12/11 發射 · Launch', { b: 1, s: 20 }) + t(400, 446, '約九個多月後抵達火星 · Arrival ~9 months later', { b: 1, s: 20 }) +
      t(690, 238, '航行約 9 個多月', { c: AMB, s: 17 }) + t(690, 260, '≈ 9+ months in flight', { c: AMB, s: 15 }) +
      t(400, 262, '太陽 · Sun', { s: 16, c: '#1a1200' }) +
      t(130, 215, '地球軌道 · Earth’s orbit', { c: MUT, s: 15, a: 'start' }) + t(130, 238, '火星軌道 · Mars’s orbit', { c: MUT, s: 15, a: 'start' }), '氣候軌道器的航程示意圖')
  };

  /* 4. 火星氣候軌道器：飛得太低 */
  ILLS.mco_signal = {
    zh: '示意圖：氣候軌道器預定的高度、能存活的最低高度與實際高度（不按比例）', en: 'Illustration: planned altitude, minimum survivable altitude and actual altitude (not to scale)',
    svg: svg(
      '<path d="M0 430 Q400 330 800 430 L800 450 L0 450z" fill="#c8552d"/><path d="M0 430 Q400 330 800 430" fill="none" stroke="#ffb07a" stroke-width="3"/>' +
      '<line x1="60" y1="90" x2="740" y2="90" stroke="' + GRN + '" stroke-width="3" stroke-dasharray="10 8"/>' +
      '<line x1="60" y1="215" x2="740" y2="215" stroke="' + AMB + '" stroke-width="3" stroke-dasharray="10 8"/>' +
      '<line x1="60" y1="320" x2="740" y2="320" stroke="' + RED + '" stroke-width="3" stroke-dasharray="10 8"/>' +
      '<path d="M40 40 C 200 70, 330 160, 400 318 C 470 330, 600 300, 760 250" fill="none" stroke="' + CY + '" stroke-width="4"/>' +
      '<circle cx="400" cy="318" r="9" fill="' + RED + '"/>' +
      t(740, 56, '預定高度約 140–150 公里', { c: GRN, a: 'end', s: 18 }) + t(740, 78, 'Planned ~140–150 km', { c: GRN, a: 'end', s: 15 }) +
      t(740, 180, '能存活的最低高度 80 公里', { c: AMB, a: 'end', s: 18 }) + t(740, 202, 'Minimum survivable 80 km', { c: AMB, a: 'end', s: 15 }) +
      t(740, 346, '實際只有約 57 公里', { c: RED, a: 'end', s: 18, b: 1 }) + t(740, 366, 'Actual ~57 km', { c: RED, a: 'end', s: 15 }) +
      t(230, 250, '訊號比預測早 49 秒消失', { s: 17 }) + t(230, 272, 'Signal lost 49 s early', { s: 15, c: MUT }) +
      t(400, 415, '火星表面 · Mars surface', { s: 16, c: '#fff' }), '氣候軌道器飛得太低的示意圖')
  };

  /* 5. 火星氣候軌道器：單位搞錯 */
  ILLS.mco_units = {
    zh: '示意圖：地面軟體交出「磅力·秒」，導航軟體卻當成「牛頓·秒」', en: 'Illustration: ground software output pound-force seconds, navigation software read them as newton-seconds',
    svg: svg(
      '<rect x="40" y="70" width="270" height="170" rx="16" fill="#1d2a4f" stroke="' + CY + '" stroke-width="2"/>' +
      '<rect x="490" y="70" width="270" height="170" rx="16" fill="#1d2a4f" stroke="' + AMB + '" stroke-width="2"/>' +
      t(175, 108, '地面軟體', { b: 1, s: 21 }) + t(175, 132, 'Ground software', { c: MUT, s: 15 }) +
      t(175, 190, '輸出：磅力·秒', { c: CY, s: 24, b: 1 }) + t(175, 218, 'Output: lbf·s', { c: CY, s: 17 }) +
      t(625, 108, '導航軟體', { b: 1, s: 21 }) + t(625, 132, 'Navigation software', { c: MUT, s: 15 }) +
      t(625, 190, '以為是：牛頓·秒', { c: AMB, s: 24, b: 1 }) + t(625, 218, 'Assumed: N·s', { c: AMB, s: 17 }) +
      '<path d="M320 155 L480 155" stroke="' + TXT + '" stroke-width="4"/><path d="M468 142 l16 13 l-16 13" fill="none" stroke="' + TXT + '" stroke-width="4"/>' +
      t(400, 140, '交接檔案', { s: 16 }) + t(400, 188, 'hand-off', { s: 14, c: MUT }) +
      '<rect x="150" y="285" width="500" height="92" rx="16" fill="#3a1f26" stroke="' + RED + '" stroke-width="2"/>' +
      t(400, 322, '1 磅力 ≈ 4.45 牛頓 → 每次都少算', { b: 1, s: 21, c: '#ffd3d3' }) + t(400, 352, '1 lbf ≈ 4.45 N → every value was too small', { s: 16, c: '#ffd3d3' }) +
      t(400, 420, '小錯誤在九個多月的航程裡不斷累積 · Small error, months of drift', { c: MUT, s: 16 }), '單位搞錯的示意圖')
  };

  window.ILLS = ILLS;
})();
