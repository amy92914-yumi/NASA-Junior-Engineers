/* 3D 寫實展示：載入 NASA 官方模型（保留原本材質），可拖曳、點部位放大、拆解。
   依賴 vendor/three.min.js、GLTFLoader.js、OrbitControls.js 與 js/models/*_glb.js（皆放在本機，不需網路）。 */
(function () {
  'use strict';

  function b64ToBuf(s) {
    var bin = atob(s), n = bin.length, u = new Uint8Array(n);
    for (var i = 0; i < n; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  }
  function ok() { return !!(window.THREE && THREE.GLTFLoader && THREE.OrbitControls); }

  /* cfg: { glb, parts:[{id,nodes:[...],explode:[x,y,z],marker?,pin?}], onPick(id) } */
  function mount(box, cfg) {
    var api = { select: function () {}, clear: function () {}, setExplode: function () {}, mark: function () {}, resetMarks: function () {}, home: function () {}, ready: false, failed: false };
    function fail() {
      api.failed = true; box.classList.add('holo-fail');
      var m = document.createElement('div'); m.className = 'holo-msg';
      m.textContent = '這個瀏覽器無法顯示 3D 模型，請改用最新版 Chrome / Edge / Safari。 This browser cannot show the 3D model.';
      box.appendChild(m);
    }
    if (!ok() || (!cfg.build && (!window.GLB || !window.GLB[cfg.glb]))) { fail(); return api; }
    var space = cfg.scene === 'space'; if (space) box.classList.add('scene-space');
    var moon = cfg.scene === 'moon'; if (moon) box.classList.add('scene-moon');   /* 月面：黑色天空、灰色月壤、單一強光 */
    var T = THREE, renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { fail(); return api; }

    var AMBER = 0xffb454, GREEN = 0x2fd16f, RED = 0xff4d4d;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.domElement.className = 'holo-canvas';
    box.appendChild(renderer.domElement);
    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(36, 1, 0.01, 100);
    var controls = new T.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.autoRotate = true; controls.autoRotateSpeed = 1.0;

    /* 環境光反射：用一張「火星天空」漸層當環境貼圖，金屬才會有真實的反光 */
    (function () {
      var c = document.createElement('canvas'); c.width = 512; c.height = 256; var g = c.getContext('2d');
      var gr = g.createLinearGradient(0, 0, 0, 256);
      if (space) { gr.addColorStop(0, '#2a3f7a'); gr.addColorStop(0.5, '#141f45'); gr.addColorStop(1, '#0a1022'); } else if (moon) { gr.addColorStop(0, '#05060c'); gr.addColorStop(0.45, '#0c0d14'); gr.addColorStop(0.5, '#b4b4ba'); gr.addColorStop(0.52, '#7c7c82'); gr.addColorStop(1, '#3a3a40'); } else { gr.addColorStop(0, '#9fb7d6'); gr.addColorStop(0.42, '#f1d2b0'); gr.addColorStop(0.5, '#d9a77d'); gr.addColorStop(0.52, '#7a4a2e'); gr.addColorStop(1, '#3a2418'); }
      g.fillStyle = gr; g.fillRect(0, 0, 512, 256);
      g.fillStyle = 'rgba(255,248,230,.95)'; g.beginPath(); g.arc(150, 70, 22, 0, 6.3); g.fill();
      var tex = new T.CanvasTexture(c); tex.mapping = T.EquirectangularReflectionMapping; tex.encoding = T.sRGBEncoding;
      var pm = new T.PMREMGenerator(renderer); scene.environment = pm.fromEquirectangular(tex).texture; tex.dispose(); pm.dispose();
    })();
    var sun = new T.DirectionalLight(moon ? 0xffffff : 0xfff1de, moon ? 2.3 : 2.4);
    sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); sun.shadow.bias = -0.0004;
    scene.add(sun); scene.add(sun.target);
    scene.add(new T.HemisphereLight(space ? 0x9db4ff : moon ? 0xb8bcc8 : 0xcfe0ff, space ? 0x1a2040 : moon ? 0x555560 : 0x8a5636, space ? 0.7 : moon ? 0.4 : 0.55));

    var root = new T.Group(); scene.add(root);
    var partMap = {}, pins = [], selected = null, exploded = false, explodeT = 0, size = 1;
    var modelCenter = new T.Vector3(), tween = null, destroyed = false, ground = null;

    var loader = new T.GLTFLoader();
    function onModel(model) {
      if (destroyed) return;
      root.add(model); model.updateMatrixWorld(true);
      var names = {}; model.traverse(function (o) { if (o.name) names[o.name] = o; });
      model.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });

      /* 每個零件的材質複製一份，這樣高亮不會互相影響 */
      function ownMats(mesh) {
        var arr = [].concat(mesh.material).map(function (m) { var c = m.clone(); if (!c.emissive) c.emissive = new T.Color(0); c.userData.e0 = c.emissive.clone(); c.userData.ei0 = c.emissiveIntensity || 1; return c; });
        mesh.material = Array.isArray(mesh.material) ? arr : arr[0];
        return arr;
      }
      cfg.parts.forEach(function (p) {
        var P = { cfg: p, objs: [], mats: [], basePos: [], off: new T.Vector3(), state: null };
        if (!p.marker) {
          p.nodes.forEach(function (n) {
            var o = names[n]; if (!o) return; P.objs.push(o);
            o.traverse(function (c) { if (c.isMesh) P.mats = P.mats.concat(ownMats(c)); });
          });
        }
        partMap[p.id] = P;
      });

      var bb = new T.Box3().setFromObject(model);
      var sz = bb.getSize(new T.Vector3()); size = Math.max(sz.x, sz.y, sz.z);
      bb.getCenter(modelCenter);

      /* 標記（例如布料）：做成一小片米色布，貼近指定零件 */
      cfg.parts.forEach(function (p) {
        if (!p.marker) return;
        var host = partMap[p.marker.host], hb = new T.Box3();
        host.objs.forEach(function (o) { hb.expandByObject(o); });
        var hc = hb.getCenter(new T.Vector3());
        var mat = new T.MeshStandardMaterial({ color: 0xb9a57a, roughness: 0.95, metalness: 0 });
        mat.userData.e0 = mat.emissive.clone(); mat.userData.ei0 = 1;
        var mk = new T.Mesh(new T.BoxGeometry(size * 0.09, size * 0.004, size * 0.06), mat);
        mk.castShadow = true;
        mk.position.set(hc.x + (p.marker.dx || 0) * size, hb.min.y - size * 0.02 + (p.marker.dy || 0) * size, hc.z + (p.marker.dz || 0) * size);
        scene.add(mk);
        var P = partMap[p.id]; P.objs = [mk]; P.mats = [mat]; P.marker = true; P.hostId = p.marker.host;
        P.basePos = [mk.position.clone()];
      });

      Object.keys(partMap).forEach(function (k) {
        var P = partMap[k];
        if (!P.marker) P.basePos = P.objs.map(function (o) { return o.position.clone(); });
        var b = new T.Box3(); P.objs.forEach(function (o) { b.expandByObject(o); });
        P.center = b.getCenter(new T.Vector3());
        var e = P.cfg.explode || [0, 0, 0];
        if (Array.isArray(e)) P.off = new T.Vector3(e[0], e[1], e[2]).multiplyScalar(size);
        else { var cc = P.center.clone().sub(modelCenter); cc.y = 0; var ll = cc.length(); P.off = new T.Vector3(); if (ll > size * 0.03) P.off.copy(cc).multiplyScalar((e.out || 0) * size / ll); P.off.y = (e.up || 0) * size; }
        P.parent = P.objs.map(function (o) { return o.parent; });
      });

      /* 地面：火星土壤色圓盤，接收陰影 */
      var gt = (function () { var c = document.createElement('canvas'); c.width = c.height = 256; var g = c.getContext('2d');
        var gr = g.createRadialGradient(128, 128, 10, 128, 128, 128); if (moon) { gr.addColorStop(0, '#7e7e84'); gr.addColorStop(0.6, '#5c5c63'); gr.addColorStop(1, 'rgba(50,50,56,0)'); } else { gr.addColorStop(0, '#b9703f'); gr.addColorStop(0.6, '#8d4f2c'); gr.addColorStop(1, 'rgba(70,35,20,0)'); }
        g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
        for (var i = 0; i < 900; i++) { g.fillStyle = moon ? ('rgba(' + (70 + Math.random() * 90 | 0) + ',' + (70 + Math.random() * 90 | 0) + ',' + (74 + Math.random() * 90 | 0) + ',' + (Math.random() * 0.3) + ')') : ('rgba(' + (60 + Math.random() * 90 | 0) + ',' + (30 + Math.random() * 40 | 0) + ',20,' + (Math.random() * 0.25) + ')'); g.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2); }
        var t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; return t; })();
      if (!space) {
        ground = new T.Mesh(new T.CircleGeometry(size * 1.9, 64), new T.MeshStandardMaterial({ map: gt, roughness: 1, metalness: 0, transparent: true }));
        ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
        ground.position.set(modelCenter.x, bb.min.y - size * 0.03, modelCenter.z);
        scene.add(ground);
      }
      sun.position.set(modelCenter.x - size * 1.2, bb.max.y + size * 1.8, modelCenter.z + size * 0.9);
      sun.target.position.copy(modelCenter);
      var s = size * 1.3; sun.shadow.camera.left = -s; sun.shadow.camera.right = s; sun.shadow.camera.top = s; sun.shadow.camera.bottom = -s; sun.shadow.camera.far = size * 6; sun.shadow.camera.updateProjectionMatrix();

      cfg.parts.forEach(function (p, i) {
        if (!p.pin) return;
        var el = document.createElement('button'); el.type = 'button'; el.className = 'pin';
        el.setAttribute('aria-label', p.pin.aria || p.id);
        el.innerHTML = '<span class="pn">' + (i + 1) + '</span>' + (p.pin.html ? '<span class="pl">' + p.pin.html + '</span>' : '');
        el.addEventListener('click', function (ev) { ev.stopPropagation(); if (cfg.onPick) cfg.onPick(p.id); });
        box.appendChild(el);
        pins.push({ id: p.id, el: el, anchor: p.pin.anchor });
      });

      fit(); api.ready = true; box.classList.add('holo-ready');
    }
    if (cfg.build) setTimeout(function () { try { onModel(cfg.build(T)); } catch (e) { fail(); } }, 0); else loader.parse(b64ToBuf(window.GLB[cfg.glb]), '', function (gltf) { onModel(gltf.scene); }, function () { fail(); });

    var homeDist = 3, homeDir = new T.Vector3(0.9, 0.5, 1.3).normalize();
    function fit() {
      homeDist = size * (cfg.home || 1.25);
      controls.minDistance = size * 0.3; controls.maxDistance = size * 3.2;
      controls.maxPolarAngle = Math.PI * 0.52;
      controls.target.copy(modelCenter);
      camera.position.copy(modelCenter).addScaledVector(homeDir, homeDist);
      controls.update();
    }
    function resize() { var w = box.clientWidth || 600, h = box.clientHeight || 400; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    var ro = (window.ResizeObserver ? new ResizeObserver(resize) : null); if (ro) ro.observe(box); resize();

    function startTween(toTarget, toPos, ms) { tween = { t0: performance.now(), ms: ms || 800, fromT: controls.target.clone(), toT: toTarget.clone(), fromP: camera.position.clone(), toP: toPos.clone() }; }
    function focusOn(P) {
      var t = P.center.clone().add(exploded ? P.off : new T.Vector3());
      var dist = size * (P.cfg.focus || 0.7);
      var dir = camera.position.clone().sub(controls.target).normalize();
      if (P.cfg.view) dir = new T.Vector3(P.cfg.view[0], P.cfg.view[1], P.cfg.view[2]).normalize();
      startTween(t, t.clone().addScaledVector(dir, dist), 850);
    }
    function homeView() {
      var c = modelCenter.clone(); if (exploded) c.y += size * 0.12;
      startTween(c, c.clone().addScaledVector(camera.position.clone().sub(controls.target).normalize(), homeDist * (exploded ? 1.7 : 1)), 800);
    }

    /* 高亮：選取＝琥珀色微光；答對＝綠；答錯＝紅 */
    function applyColors() {
      Object.keys(partMap).forEach(function (k) {
        var P = partMap[k], col = null, inten = 0;
        if (P.state === 'ok') { col = GREEN; inten = 0.55; } else if (P.state === 'bad') { col = RED; inten = 0.55; } else if (selected === k) { col = AMBER; inten = 0.4; }
        P.mats.forEach(function (m) {
          if (!m.emissive) return;
          if (col) { m.emissive.setHex(col); m.emissiveIntensity = inten; } else { m.emissive.copy(m.userData.e0); m.emissiveIntensity = m.userData.ei0; }
        });
      });
      pins.forEach(function (p) { p.el.classList.toggle('on', p.id === selected); });
    }

    api.select = function (id) { if (!partMap[id]) return; selected = id; applyColors(); controls.autoRotate = false; focusOn(partMap[id]); };
    api.clear = function () { selected = null; applyColors(); homeView(); };
    api.setExplode = function (v) { exploded = !!v; if (selected) focusOn(partMap[selected]); else homeView(); };
    api.mark = function (id, state) { if (partMap[id]) { partMap[id].state = state; applyColors(); } };
    api.resetMarks = function () { Object.keys(partMap).forEach(function (k) { partMap[k].state = null; }); selected = null; applyColors(); };
    api.view = function (id) { if (partMap[id]) focusOn(partMap[id]); };
    api.home = homeView;
    api.isExploded = function () { return exploded; };
    api.destroy = function () { destroyed = true; try { renderer.dispose(); } catch (e) {} if (ro) ro.disconnect(); };
    controls.addEventListener('start', function () { controls.autoRotate = false; tween = null; });

    var proj = new T.Vector3(), clock = new T.Clock(), tmpM = new T.Matrix4(), tmpV = new T.Vector3(), spinAxis = new T.Vector3(1, 0, 0);
    function loop() {
      if (destroyed) return;
      if (!box.isConnected) { api.destroy(); return; }
      requestAnimationFrame(loop);
      var dt = clock.getDelta();
      explodeT += ((exploded ? 1 : 0) - explodeT) * Math.min(1, dt * 5);
      Object.keys(partMap).forEach(function (k) {
        var P = partMap[k]; if (!P.objs.length) return;
        if (P.marker) { var H = partMap[P.hostId]; P.objs[0].position.copy(P.basePos[0]).add(H.off.clone().multiplyScalar(explodeT)).add(P.off.clone().multiplyScalar(explodeT)); return; }
        P.objs.forEach(function (o, i) {
          var par = P.parent[i]; tmpM.copy(par.matrixWorld).invert();
          tmpV.copy(P.basePos[i]).applyMatrix4(par.matrixWorld).addScaledVector(P.off, explodeT).applyMatrix4(tmpM);
          o.position.copy(tmpV);
          if (P.cfg.spin) o.rotateOnAxis(spinAxis, dt * P.cfg.spin);
        });
      });
      root.updateMatrixWorld(true);
      if (tween) {
        var u = Math.min(1, (performance.now() - tween.t0) / tween.ms), e = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        controls.target.lerpVectors(tween.fromT, tween.toT, e); camera.position.lerpVectors(tween.fromP, tween.toP, e);
        if (u >= 1) tween = null;
      }
      controls.update();
      var w = box.clientWidth, h = box.clientHeight;
      pins.forEach(function (p) {
        var P = partMap[p.id], b = new T.Box3(); P.objs.forEach(function (o) { b.expandByObject(o); });
        var c = b.getCenter(new T.Vector3());
        if (p.anchor) { c.x += (p.anchor[0] || 0) * size; c.y += (p.anchor[1] || 0) * size; c.z += (p.anchor[2] || 0) * size; }
        proj.copy(c).project(camera);
        p.el.style.display = proj.z < 1 ? '' : 'none';
        p.el.style.transform = 'translate(' + ((proj.x * 0.5 + 0.5) * w) + 'px,' + ((-proj.y * 0.5 + 0.5) * h) + 'px) translate(-50%,-50%)';
      });
      renderer.render(scene, camera);
    }
    loop();
    return api;
  }

  /* 把任務資料裡的 model.parts 轉成檢視器設定（熱點文字為雙語 HTML） */
  function partsCfg(model) {
    return model.parts.map(function (p) {
      var o = {}; for (var k in p) o[k] = p[k];
      if (p.pin && p.name) o.pin = { anchor: p.pin.anchor, aria: p.name.zh + ' / ' + p.name.en, html: '<span class="zh">' + p.name.zh + '</span><span class="en">' + p.name.en + '</span>' };
      return o;
    });
  }

  window.Holo = { mount: mount, partsCfg: partsCfg, supported: function () { return ok() && !!document.createElement('canvas').getContext; } };
})();
