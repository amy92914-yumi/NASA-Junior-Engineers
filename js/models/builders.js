/* 自製簡化 3D 模型（NASA 3D 資源庫沒有這兩個設備的官方模型）。
   形狀依公開的任務描述簡化而成，不是 NASA 的工程模型；頁面上會標示「自製簡化模型」。
   每個函式回傳 THREE.Group，底下的子物件以零件 id 命名（供 viewer3d.js 拆解／點選）。 */
(function () {
  'use strict';
  window.BUILD = window.BUILD || {};

  function std(T, color, o) { o = o || {}; return new T.MeshStandardMaterial({ color: color, metalness: o.m == null ? 0.5 : o.m, roughness: o.r == null ? 0.5 : o.r, side: o.side || T.FrontSide }); }
  function mesh(T, geo, mat, x, y, z) { var m = new T.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); return m; }
  function group(T, name) { var g = new T.Group(); g.name = name; return g; }

  /* ---------- 火星氣候軌道器（簡化） ---------- */
  window.BUILD.mco = function (T) {
    var root = new T.Group(); root.name = 'mco';
    var gold = std(T, 0xc99a3b, { m: 0.85, r: 0.35 }), dark = std(T, 0x4a505e, { m: 0.7, r: 0.4 }), white = std(T, 0xe8ebf2, { m: 0.4, r: 0.4 });

    /* 機身：金色隔熱材包起來的方箱子 */
    var bus = group(T, 'bus');
    bus.add(mesh(T, new T.BoxGeometry(1.8, 1.2, 1.8), gold));
    bus.add(mesh(T, new T.BoxGeometry(1.84, 0.08, 1.84), dark, 0, 0.62, 0));
    root.add(bus);

    /* 太陽能板：單邊一片大翼板（用格子貼圖） */
    var solar = group(T, 'solar');
    var c = document.createElement('canvas'); c.width = 256; c.height = 128; var g = c.getContext('2d');
    g.fillStyle = '#1b2f6b'; g.fillRect(0, 0, 256, 128); g.strokeStyle = '#6f8fd6'; g.lineWidth = 1.5;
    for (var i = 0; i <= 256; i += 16) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 128); g.stroke(); }
    for (var j = 0; j <= 128; j += 16) { g.beginPath(); g.moveTo(0, j); g.lineTo(256, j); g.stroke(); }
    var tex = new T.CanvasTexture(c); tex.encoding = T.sRGBEncoding;
    solar.add(mesh(T, new T.CylinderGeometry(0.06, 0.06, 1.1, 12), dark, 1.45, 0, 0).rotateZ(Math.PI / 2));
    var panel = mesh(T, new T.BoxGeometry(5.0, 0.05, 1.9), new T.MeshStandardMaterial({ map: tex, metalness: 0.5, roughness: 0.35 }), 4.4, 0, 0);
    solar.add(panel);
    root.add(solar);

    /* 天線：頂部的碟形天線＋三根支架＋饋源 */
    var ant = group(T, 'antenna');
    var dish = mesh(T, new T.SphereGeometry(1.0, 40, 12, 0, Math.PI * 2, Math.PI - 0.75, 0.75), std(T, 0xf2f4f8, { m: 0.3, r: 0.35, side: T.DoubleSide }), 0, 1.78, 0);
    ant.add(dish);
    [0, 2.094, 4.188].forEach(function (a) { var s = mesh(T, new T.CylinderGeometry(0.025, 0.025, 0.95, 6), dark, Math.cos(a) * 0.34, 1.44 + 0.0, Math.sin(a) * 0.34); s.rotation.z = Math.cos(a) * 0.35; s.rotation.x = -Math.sin(a) * 0.35; ant.add(s); });
    ant.add(mesh(T, new T.CylinderGeometry(0.07, 0.07, 0.16, 12), dark, 0, 1.98, 0));
    ant.add(mesh(T, new T.CylinderGeometry(0.2, 0.2, 0.7, 16), dark, 0, 0.95, 0));
    root.add(ant);

    /* 主引擎：機身底部的噴嘴 */
    var eng = group(T, 'engine');
    var cone = new T.Mesh(new T.CylinderGeometry(0.22, 0.52, 0.8, 24, 1, true), std(T, 0x6a7080, { m: 0.8, r: 0.3, side: T.DoubleSide }));
    cone.position.set(0, -1.1, 0); eng.add(cone);
    eng.add(mesh(T, new T.CylinderGeometry(0.28, 0.28, 0.3, 20), dark, 0, -0.75, 0));
    root.add(eng);

    /* 小型推進器：四個角落各一組 */
    var th = group(T, 'thrusters');
    [[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(function (p) {
      var t = mesh(T, new T.CylinderGeometry(0.07, 0.11, 0.34, 12), dark, p[0] * 0.95, -0.48, p[1] * 0.95);
      t.rotation.z = -p[0] * 0.55; t.rotation.x = p[1] * 0.55; th.add(t);
      th.add(mesh(T, new T.BoxGeometry(0.16, 0.16, 0.16), white, p[0] * 0.86, -0.4, p[1] * 0.86));
    });
    root.add(th);

    /* MARCI 相機：側面的小盒子＋鏡頭 */
    var cam = group(T, 'camera');
    cam.add(mesh(T, new T.BoxGeometry(0.36, 0.34, 0.5), white, -1.07, -0.18, 0.35));
    var lens = mesh(T, new T.CylinderGeometry(0.11, 0.11, 0.14, 20), std(T, 0x10131a, { m: 0.9, r: 0.2 }), -1.27, -0.18, 0.35); lens.rotation.z = Math.PI / 2; cam.add(lens);
    root.add(cam);
    return root;
  };

  /* ---------- 金唱片（簡化） ---------- */
  window.BUILD.record = function (T) {
    var root = new T.Group(); root.name = 'record';

    /* 唱片：鍍金圓盤＋溝槽貼圖 */
    var disc = group(T, 'disc');
    var c = document.createElement('canvas'); c.width = c.height = 512; var g = c.getContext('2d');
    var gr = g.createRadialGradient(256, 256, 10, 256, 256, 256); gr.addColorStop(0, '#f0cd6b'); gr.addColorStop(1, '#c4962a');
    g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
    for (var r = 70; r < 250; r += 2.4) { g.strokeStyle = 'rgba(80,50,0,' + (0.1 + 0.12 * ((r * 7) % 5) / 5) + ')'; g.lineWidth = 0.8; g.beginPath(); g.arc(256, 256, r, 0, 6.283); g.stroke(); }
    g.fillStyle = '#e9e1cf'; g.beginPath(); g.arc(256, 256, 62, 0, 6.283); g.fill();
    g.fillStyle = '#6a5a3a'; g.beginPath(); g.arc(256, 256, 6, 0, 6.283); g.fill();
    var tex = new T.CanvasTexture(c); tex.encoding = T.sRGBEncoding;
    var face = new T.MeshStandardMaterial({ map: tex, metalness: 0.9, roughness: 0.28 });
    var side = new T.MeshStandardMaterial({ color: 0xc4962a, metalness: 0.9, roughness: 0.3 });
    disc.add(mesh(T, new T.CylinderGeometry(6, 6, 0.16, 96), [side, face, face], 0, 0.4, 0));
    root.add(disc);

    /* 保護套：鋁製方板，板上刻著「怎麼播放」的符號示意圖（簡化示意，不是真實圖案） */
    var jacket = group(T, 'jacket');
    var c2 = document.createElement('canvas'); c2.width = c2.height = 512; var h = c2.getContext('2d');
    h.fillStyle = '#c9ced6'; h.fillRect(0, 0, 512, 512);
    h.strokeStyle = '#4a5160'; h.fillStyle = '#4a5160'; h.lineWidth = 3;
    h.beginPath(); h.arc(256, 256, 214, 0, 6.283); h.stroke();            /* 唱片的外框 */
    h.beginPath(); h.arc(256, 256, 40, 0, 6.283); h.stroke();
    h.beginPath(); h.moveTo(256, 256); h.lineTo(470, 120); h.stroke();    /* 唱針的方向 */
    for (var k = 0; k < 9; k++) { h.fillRect(40 + k * 22, 462, 10, 16); }  /* 一排「二進位」小方塊 */
    h.beginPath(); h.arc(70, 70, 16, 0, 6.283); h.stroke(); h.beginPath(); h.arc(110, 70, 16, 0, 6.283); h.stroke(); h.beginPath(); h.moveTo(86, 70); h.lineTo(94, 70); h.stroke();
    var t2 = new T.CanvasTexture(c2); t2.encoding = T.sRGBEncoding;
    var jm = new T.MeshStandardMaterial({ map: t2, metalness: 0.9, roughness: 0.4 });
    var jside = std(T, 0xaab0bb, { m: 0.9, r: 0.4 });
    jacket.add(mesh(T, new T.BoxGeometry(13.4, 0.3, 13.4), [jside, jside, jm, jside, jside, jside], 0, 0, 0));
    root.add(jacket);

    /* 唱針與卡匣：立在唱片旁，像唱機的唱臂 */
    var needle = group(T, 'needle');
    var steel = std(T, 0x8a909c, { m: 0.9, r: 0.3 }), black = std(T, 0x1b1e26, { m: 0.5, r: 0.5 });
    needle.add(mesh(T, new T.CylinderGeometry(0.7, 0.9, 1.6, 24), steel, 7.4, 0.95, 4.2));
    var arm = mesh(T, new T.CylinderGeometry(0.1, 0.1, 6.4, 12), steel, 4.6, 1.5, 3.0); arm.rotation.z = Math.PI / 2; arm.rotation.y = 0.55; needle.add(arm);
    needle.add(mesh(T, new T.BoxGeometry(1.0, 0.5, 0.7), black, 1.6, 1.4, 1.4));
    needle.add(mesh(T, new T.ConeGeometry(0.08, 0.55, 10), steel, 1.6, 0.95, 1.4).rotateX(Math.PI));
    root.add(needle);
    return root;
  };

  /* ---------- 阿波羅月球車 LRV（依 NASA NSSDCA 公布的尺寸與規格自製的簡化示意模型） ----------
     尺寸（NSSDCA）：車長 3.1 m、軸距 2.3 m、最高 1.14 m；輪子直徑 81.8 cm、寬 23 cm；兩張並排座椅；前方中央桅杆上的網狀碟形天線。
     軌距、座椅與電池位置等沒有公布的細節，只是示意。單位：公尺；車頭朝 +X。 */
  window.BUILD.lrv = function (T) {
    var root = new T.Group(); root.name = 'lrv';
    var alu = std(T, 0xb9bfc8, { m: 0.85, r: 0.35 }), dark = std(T, 0x3b3f48, { m: 0.7, r: 0.45 }), white = std(T, 0xe9ebf0, { m: 0.3, r: 0.5 });
    var foil = std(T, 0xc99a3b, { m: 0.9, r: 0.3 }), web = std(T, 0xd9d6cc, { m: 0.1, r: 0.9 }), black = std(T, 0x1b1d22, { m: 0.4, r: 0.6 });

    function tube(a, b, r, mat) {          /* 圓管：連接兩個點 */
      var A = new T.Vector3(a[0], a[1], a[2]), Bv = new T.Vector3(b[0], b[1], b[2]), d = Bv.clone().sub(A), len = d.length();
      var m = new T.Mesh(new T.CylinderGeometry(r, r, len, 8), mat);
      m.position.copy(A).add(Bv).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
      return m;
    }
    function canvasTex(w, h, draw, repeatX) {
      var c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
      var t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding;
      if (repeatX) { t.wrapS = T.RepeatWrapping; t.repeat.set(repeatX, 1); }
      return t;
    }
    var WR = 0.409, WW = 0.23, WX = 1.15, WZ = 0.92;     /* 輪半徑、輪寬、前後輪 x 位置、左右輪 z 位置 */
    var corners = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    /* ---------- 車身與懸吊：三段式鋁合金管車架（中間有鉸鏈）、地板、雙叉臂懸吊 ---------- */
    var frame = group(T, 'lrv_frame');
    [-0.62, -0.22, 0.22, 0.62].forEach(function (z) { frame.add(tube([-1.55, 0.55, z], [1.55, 0.55, z], 0.03, alu)); });
    [-1.5, -0.95, -0.55, 0, 0.55, 0.95, 1.5].forEach(function (x) { frame.add(tube([x, 0.55, -0.62], [x, 0.55, 0.62], 0.028, alu)); });
    [[-1.05, 0.9], [0, 1.1], [1.05, 0.9]].forEach(function (p) { frame.add(mesh(T, new T.BoxGeometry(p[1], 0.03, 1.1), std(T, 0x9aa1ac, { m: 0.6, r: 0.5 }), p[0], 0.5, 0)); });
    [-0.55, 0.55].forEach(function (x) { var h = tube([x, 0.55, -0.7], [x, 0.55, 0.7], 0.045, dark); frame.add(h); });   /* 鉸鏈 */
    corners.forEach(function (c) {
      var sx = c[0], sz = c[1];
      frame.add(tube([sx * 1.0, 0.62, sz * 0.62], [sx * WX, 0.5, sz * (WZ - 0.12)], 0.022, alu));
      frame.add(tube([sx * 0.85, 0.5, sz * 0.62], [sx * WX, 0.34, sz * (WZ - 0.12)], 0.022, alu));
      var fd = mesh(T, new T.BoxGeometry(0.78, 0.012, 0.3), white, sx * WX, 0.84, sz * WZ); frame.add(fd);   /* 防塵擋板 */
      frame.add(tube([sx * (WX - 0.3), 0.56, sz * (WZ - 0.14)], [sx * (WX - 0.3), 0.84, sz * (WZ - 0.1)], 0.01, alu)); frame.add(tube([sx * (WX + 0.3), 0.56, sz * (WZ - 0.14)], [sx * (WX + 0.3), 0.84, sz * (WZ - 0.1)], 0.01, alu));
    });
    root.add(frame);

    /* ---------- 輪子與馬達：鋼絲網輪胎＋鈦合金 V 形凸片；每顆輪子各有一個馬達 ---------- */
    var wheels = group(T, 'lrv_wheels');
    var tireTex = canvasTex(256, 64, function (g, w, h) {
      g.fillStyle = '#4a4d55'; g.fillRect(0, 0, w, h);
      g.strokeStyle = '#8a8f99'; g.lineWidth = 1; for (var i = -h; i < w; i += 6) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke(); }
      g.fillStyle = '#d7dae0'; for (var k = 0; k < w; k += 32) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k + 16, h / 2); g.lineTo(k, h); g.lineTo(k + 8, h); g.lineTo(k + 24, h / 2); g.lineTo(k + 8, 0); g.fill(); }
    }, 1);
    var tire = new T.MeshStandardMaterial({ map: tireTex, metalness: 0.55, roughness: 0.55 });
    /* 輪子側面：鋼絲網＋內側緩衝環＋輪轂板（圓形貼圖） */
    var capTex = canvasTex(256, 256, function (g, w, h) {
      g.fillStyle = '#3f424a'; g.fillRect(0, 0, w, h);
      g.strokeStyle = '#8f949e'; g.lineWidth = 1.2; for (var i = 0; i <= w; i += 7) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); }
      g.fillStyle = 'rgba(0,0,0,0)'; g.strokeStyle = '#d7dae0'; g.lineWidth = 6; g.beginPath(); g.arc(128, 128, 118, 0, 6.3); g.stroke();
      g.strokeStyle = '#2a2c33'; g.lineWidth = 10; g.beginPath(); g.arc(128, 128, 78, 0, 6.3); g.stroke();
      g.fillStyle = '#c9ccd4'; g.beginPath(); g.arc(128, 128, 44, 0, 6.3); g.fill();
    });
    var capMat = new T.MeshStandardMaterial({ map: capTex, metalness: 0.5, roughness: 0.55 });
    corners.forEach(function (c) {
      var sx = c[0], sz = c[1], w = new T.Group();
      var t = new T.Mesh(new T.CylinderGeometry(WR, WR, WW, 40), [tire, capMat, capMat]); t.rotation.x = Math.PI / 2; w.add(t);
      var hub = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, WW + 0.03, 20), white); hub.rotation.x = Math.PI / 2; w.add(hub);
      var mot = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.1, 20), dark); mot.rotation.x = Math.PI / 2; mot.position.z = sz * (WW / 2 + 0.07); w.add(mot);
      w.position.set(sx * WX, WR, sz * WZ); wheels.add(w);
    });
    root.add(wheels);

    /* ---------- 座椅：兩張並排、可折疊（鋁管＋尼龍織帶），中間有扶手 ---------- */
    var seats = group(T, 'lrv_seats');
    [-0.32, 0.32].forEach(function (z) {
      seats.add(mesh(T, new T.BoxGeometry(0.5, 0.05, 0.42), web, -0.2, 0.74, z));
      seats.add(mesh(T, new T.BoxGeometry(0.05, 0.4, 0.42), web, -0.46, 0.94, z));
      seats.add(tube([-0.46, 0.74, z - 0.2], [-0.46, 1.14, z - 0.2], 0.018, alu)); seats.add(tube([-0.46, 0.74, z + 0.2], [-0.46, 1.14, z + 0.2], 0.018, alu));
      seats.add(tube([-0.2, 0.55, z - 0.2], [-0.2, 0.74, z - 0.2], 0.018, alu)); seats.add(tube([-0.2, 0.55, z + 0.2], [-0.2, 0.74, z + 0.2], 0.018, alu));
      var fr = mesh(T, new T.BoxGeometry(0.4, 0.02, 0.34), alu, 0.28, 0.58, z); fr.rotation.z = -0.35; seats.add(fr);
    });
    seats.add(mesh(T, new T.BoxGeometry(0.55, 0.05, 0.12), web, -0.22, 0.8, 0));
    root.add(seats);

    /* ---------- 導航與控制：T 形手把＋控制與顯示面板（速度、航向、俯仰、電力、溫度） ---------- */
    var control = group(T, 'lrv_control');
    control.add(tube([0.25, 0.5, 0], [0.25, 0.86, 0], 0.02, dark));
    control.add(tube([0.25, 0.86, -0.1], [0.25, 0.86, 0.1], 0.02, dark));
    control.add(mesh(T, new T.SphereGeometry(0.03, 12, 8), black, 0.25, 0.86, -0.1)); control.add(mesh(T, new T.SphereGeometry(0.03, 12, 8), black, 0.25, 0.86, 0.1));
    var faceTex = canvasTex(256, 256, function (g, w, h) {
      g.fillStyle = '#20232b'; g.fillRect(0, 0, w, h);
      [[70, 70, 50], [186, 70, 50]].forEach(function (d) { g.strokeStyle = '#e8ebf2'; g.lineWidth = 3; g.beginPath(); g.arc(d[0], d[1], d[2], 0, 6.3); g.stroke(); g.beginPath(); g.moveTo(d[0], d[1]); g.lineTo(d[0] + 28, d[1] - 20); g.stroke(); });
      g.fillStyle = '#ffb454'; g.fillRect(28, 150, 200, 22); g.fillStyle = '#5fd0ff'; g.fillRect(28, 184, 130, 18);
      for (var i = 0; i < 6; i++) { g.fillStyle = i % 2 ? '#4ade80' : '#e8ebf2'; g.beginPath(); g.arc(40 + i * 36, 228, 9, 0, 6.3); g.fill(); }
    });
    var faceMat = new T.MeshStandardMaterial({ map: faceTex, metalness: 0.2, roughness: 0.6 });
    var panel = new T.Mesh(new T.BoxGeometry(0.12, 0.32, 0.42), [dark, faceMat, dark, dark, dark, dark]); panel.position.set(0.62, 0.78, 0); panel.rotation.z = -0.3; control.add(panel);
    control.add(tube([0.62, 0.55, -0.12], [0.62, 0.68, -0.12], 0.02, dark)); control.add(tube([0.62, 0.55, 0.12], [0.62, 0.68, 0.12], 0.02, dark));
    root.add(control);

    /* ---------- 電池：兩顆 36 伏銀鋅電池（位置為示意）＋ 36 伏插座 ---------- */
    var bat = group(T, 'lrv_battery');
    [-0.3, 0.3].forEach(function (z) { bat.add(mesh(T, new T.BoxGeometry(0.42, 0.22, 0.34), foil, 0.98, 0.64, z)); bat.add(mesh(T, new T.BoxGeometry(0.44, 0.02, 0.36), dark, 0.98, 0.76, z)); });
    bat.add(mesh(T, new T.CylinderGeometry(0.03, 0.03, 0.05, 12), black, 1.2, 0.62, 0).rotateZ(Math.PI / 2));
    root.add(bat);

    /* ---------- 天線：前方中央的桅杆＋大型網狀碟形天線 ---------- */
    var ant = group(T, 'lrv_antenna');
    ant.add(tube([1.28, 0.55, 0], [1.28, 0.98, 0], 0.025, alu));
    var meshTex = canvasTex(128, 128, function (g, w, h) {
      g.fillStyle = 'rgba(0,0,0,0)'; g.clearRect(0, 0, w, h); g.strokeStyle = '#e8ebf2'; g.lineWidth = 1.5;
      for (var i = 0; i <= w; i += 8) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); }
    });
    var dishMat = new T.MeshStandardMaterial({ map: meshTex, transparent: true, alphaTest: 0.05, metalness: 0.3, roughness: 0.5, side: T.DoubleSide });
    var dish = new T.Mesh(new T.SphereGeometry(0.4, 36, 10, 0, Math.PI * 2, 0, 0.7), dishMat); dish.position.set(1.28, 1.46, 0);   /* 球心在上方，碗底約在 y=1.06、碗口約 1.15（最高 1.14 m） */ dish.rotation.x = Math.PI; dish.rotation.z = -0.25; ant.add(dish);
    ant.add(tube([1.28, 1.0, 0], [1.2, 1.2, 0], 0.012, alu));
    root.add(ant);

    return root;
  };

})();
