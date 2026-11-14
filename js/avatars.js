/* 虛擬人物插畫：用程式畫的卡通人物（非真人肖像、非 AI 生成、無版權問題）。
   沒有照片的頁面，就用這些「示意人物」補上。
   window.AV.portrait(role)        → 角色半身像 SVG 字串
   window.AV.scene(kind, role, m)   → 場景 SVG 字串（console / team / lab / party / crew）
   window.AV.crew(roles)            → 一排角色 */
(function () {
  'use strict';
  var SKINS = ['#f1c9a5', '#d9a273', '#a86f47', '#7a4a2d', '#f6d6b8', '#c68b5e'];
  var HAIRS = ['#1d1a1a', '#4a2c17', '#8a5a2b', '#c9a24a', '#6b6b78', '#2b1d3a'];
  var OUTFITS = ['#ff8a3d', '#3d8bff', '#e8eefc', '#2fc98e', '#ff5d8f', '#8f6bff'];
  var STYLES = ['short', 'long', 'bun', 'curly', 'short', 'bald'];
  var ACCS = ['headset', 'glasses', 'cap', 'none', 'glasses', 'headset'];

  /* ===== 11/13 改用幼鎂提供的角色圖（assets/img/chars/cXXX_<任務>.png，外套顏色依任務換色）===== */
  var CHARS = {   /* 每個任務 4 位角色（由低到高難度）用哪張圖 */
    ingenuity: ['909', '910', '911', '916'],
    opportunity: ['910', '911', '914', '913'],
    voyager: ['909', '914', '916', '912'],
    mco: ['914', '910', '916', '912'],
    record: ['914', '909', '911', '912'],
    apollo: ['916', '909', '912', '913']   /* 月球任務沿用原圖的米白色外套，不換色 */
  };
  var FALLBACK_MK = ['ingenuity', 'opportunity', 'voyager', 'mco', 'record'];
  var FALLBACK_ID = ['914', '909', '911', '916', '910', '913', '912'];
  function hash(s) { var n = 7; s = String(s || ''); for (var i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0; return n; }
  function missionOf(role) {
    var R = window.ROLES || {};
    for (var k in R) { if (R[k] && R[k].indexOf && R[k].indexOf(role) >= 0) return k; }
    return null;
  }
  function info(mk, idx) { return { src: 'assets/img/chars/c' + CHARS[mk][idx % 4] + '_' + mk + '.png' }; }
  function fallback(seed, k) { var n = hash(seed) + (k || 0); return { src: 'assets/img/chars/c' + FALLBACK_ID[n % 7] + '_' + FALLBACK_MK[(n >>> 3) % 5] + '.png' }; }
  /* 找出這個角色對應的圖；k＝同場景第幾位路人（0＝本人，1、2＝同任務的其他角色） */
  function look(seed, k) { return fallback(seed, k); }
  function roleLook(role, k, companion) {
    var mk = role && missionOf(role);
    if (!mk) return fallback((role && role.name && role.name.en) || 'x', k || 0);
    var idx = (role.level || 1) - 1;
    return info(mk, idx + (companion || 0));
  }

  /* 一個人物（上半身），(x,y)＝腰部底邊中心，s＝縮放；圖片是 420×760 的全身圖，這裡只取上方 0~360 */
  function person(x, y, s, L) {
    var h = 175 * s, w = h * 420 / 360;
    return '<svg x="' + (x - w / 2).toFixed(1) + '" y="' + (y - h).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" viewBox="0 0 420 360">' +
      '<image href="' + L.src + '" width="420" height="760"/></svg>';
  }

  function wrap(vb, inner, bg, par) {
    var d = 'g' + Math.floor(Math.random() * 1e6);
    return '<svg viewBox="' + vb + '" preserveAspectRatio="' + (par || 'xMidYMax slice') + '" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<defs><radialGradient id="' + d + '" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="' + (bg || '#2a3f8f') + '"/><stop offset="1" stop-color="#0c1330"/></radialGradient></defs>' +
      '<rect x="-2000" y="-2000" width="4500" height="4500" fill="url(#' + d + ')"/>' + stars(vb) + inner + '</svg>';
  }
  function stars(vb) {
    var p = vb.split(' '), W = +p[2], H = +p[3], s = '', n = 38, a = 11;
    for (var i = 0; i < n; i++) { a = (a * 9301 + 49297) % 233280; var x = a / 233280 * W; a = (a * 9301 + 49297) % 233280; var y = a / 233280 * H; s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (1 + (i % 3) * .5) + '" fill="#fff" opacity="' + (.25 + (i % 5) * .13).toFixed(2) + '"/>'; }
    return s;
  }
  function mIcon(m) { return (m && m.icon) || '🚀'; }

  var AV = {
    /* 角色半身像：大頭像，給「角色頁」使用 */
    portrait: function (role, mode) {
      var L = roleLook(role);
      if (mode === 'head') {   /* 角色選擇區的小頭貼 */
        var d = 'h' + Math.floor(Math.random() * 1e6);
        return '<svg viewBox="95 18 230 230" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img">' +
          '<defs><radialGradient id="' + d + '" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="#3a5cc0"/><stop offset="1" stop-color="#14214f"/></radialGradient></defs>' +
          '<rect x="95" y="18" width="230" height="230" fill="url(#' + d + ')"/><image href="' + L.src + '" width="420" height="760"/></svg>';
      }
      if (mode === 'body') {   /* 故事頁：全身像＋柔光 */
        return '<svg viewBox="0 0 420 760" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" role="img">' +
          '<defs><radialGradient id="bg1" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#5a7be0" stop-opacity=".55"/><stop offset="1" stop-color="#5a7be0" stop-opacity="0"/></radialGradient></defs>' +
          '<ellipse cx="210" cy="380" rx="205" ry="340" fill="url(#bg1)"/><ellipse cx="210" cy="742" rx="120" ry="14" fill="#000" opacity=".35"/>' +
          '<image href="' + L.src + '" width="420" height="760"/></svg>';
      }
      var h = 300, w = h * 420 / 470;
      return wrap('0 0 500 300', '<svg x="' + ((500 - w) / 2).toFixed(1) + '" y="0" width="' + w.toFixed(1) + '" height="' + h + '" viewBox="0 0 420 470"><image href="' + L.src + '" width="420" height="760"/></svg>', '#33489d');
    },
    /* 場景 */
    scene: function (kind, role, m) {
      var L = roleLook(role, 1), L2 = role && missionOf(role) ? roleLook(role, 2, 1) : look((role && role.name && role.name.en || 'a') + '2', 2), L3 = role && missionOf(role) ? roleLook(role, 3, 2) : look((role && role.name && role.name.en || 'a') + '3', 3), ic = mIcon(m), t = '';
      var VB = '0 0 400 440';
      if (kind === 'console') {
        t += '<rect x="30" y="70" width="340" height="190" rx="14" fill="#0a1230" stroke="#5fd0ff" stroke-width="3"/>';
        t += '<text x="200" y="190" font-size="92" text-anchor="middle">' + ic + '</text>';
        t += '<path d="M50 235 H120 L145 205 L180 240 L230 210 L260 235 H350" fill="none" stroke="#4ade80" stroke-width="3" opacity=".8"/>';
        t += person(200, 400, 2.1, L);
        t += '<rect x="20" y="372" width="360" height="48" rx="10" fill="#1d2a5c"/><rect x="60" y="384" width="80" height="8" rx="4" fill="#5fd0ff"/><rect x="160" y="384" width="40" height="8" rx="4" fill="#ffb454"/>';
      } else if (kind === 'labw') {
        VB = '0 0 560 300';
        t += '<ellipse cx="280" cy="262" rx="150" ry="20" fill="#5fd0ff" opacity=".28"/><ellipse cx="280" cy="256" rx="100" ry="12" fill="#5fd0ff" opacity=".5"/>';
        t += '<path d="M200 256 L180 40 H380 L360 256" fill="#5fd0ff" opacity=".07"/>';
        t += '<text x="280" y="232" font-size="130" text-anchor="middle">' + ic + '</text>';
        t += person(95, 300, 1.45, L, 'wave') + person(470, 300, 1.35, L2);
      } else if (kind === 'lab') {
        t += '<ellipse cx="200" cy="330" rx="130" ry="22" fill="#5fd0ff" opacity=".25"/><ellipse cx="200" cy="322" rx="90" ry="14" fill="#5fd0ff" opacity=".45"/>';
        t += '<text x="200" y="300" font-size="120" text-anchor="middle">' + ic + '</text>';
        t += '<path d="M120 322 L100 150 H300 L280 322" fill="#5fd0ff" opacity=".07"/>';
        t += person(95, 440, 1.7, L, 'wave') + person(310, 440, 1.5, L2);
      } else if (kind === 'party') {
        VB = '0 0 560 300';
        for (var i = 0; i < 24; i++) { var cx = (i * 71) % 540 + 10, cy = (i * 43) % 130 + 12; t += '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="' + OUTFITS[i % 6] + '" opacity=".85"/>'; }
        t += '<text x="280" y="86" font-size="62" text-anchor="middle">' + ic + '</text>';
        t += person(120, 300, 1.4, L, 'wave') + person(280, 312, 1.6, L2) + person(440, 300, 1.4, L3);
      } else if (kind === 'crew') {
        var rs = (m && m.length ? m : [role]).slice(0, 6), n = rs.length, W = 560, step = W / n;
        VB = '0 0 560 300';
        if (n >= 6) {   /* 六位：同一排，縮小 */
          VB = '0 0 560 330';
          rs.forEach(function (r, i) { t += person(step * (i + .5), 330 + (i % 2) * 0, 0.9, roleLook(r, i + 1)); });
          t += '<text x="280" y="44" font-size="40" text-anchor="middle">🌟</text>';
        } else if (n >= 5) {   /* 五位：後排 3、前排 2 */
          VB = '0 0 560 400';
          [0, 2, 4].forEach(function (k, i) { t += person(100 + i * 180, 250, 1.2, roleLook(rs[k], k + 1)); });
          [1, 3].forEach(function (k, i) { t += person(190 + i * 180, 395, 1.45, roleLook(rs[k], k + 1)); });
          t += '<text x="280" y="44" font-size="40" text-anchor="middle">🌟</text>';
        } else {
          rs.forEach(function (r, i) { t += person(step * (i + .5), 300 + (i % 2) * 22, 1.5, roleLook(r, i + 1)); });
          t += '<text x="280" y="62" font-size="46" text-anchor="middle">🌟</text>';
        }
      } else { /* team */
        t += '<rect x="40" y="60" width="320" height="140" rx="14" fill="#0a1230" stroke="#ffb454" stroke-width="3"/><text x="200" y="165" font-size="80" text-anchor="middle">' + ic + '</text>';
        t += person(90, 420, 1.75, L, 'wave') + person(200, 440, 1.6, L2) + person(310, 420, 1.75, L3);
      }
      return wrap(VB, t, '#2f4698', kind === 'crew' ? 'xMidYMid meet' : null);
    },
    crew: function (roles) { return AV.scene('crew', null, roles); }
  };
  window.AV = AV;
})();
