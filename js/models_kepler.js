/* Kepler 任務的 3D 模型：NASA 官方模型 Kepler (A)（NASA/Kepler Mission）。
   structure／func 的事實來自 JPL Kepler Press Kit 與 NASA Science 的 Kepler / K2 任務頁。
   模型是簡化版，只分成幾個大零件；反作用輪、電池等在太空船本體「裡面」，模型中看不到。 */
(function () {
  'use strict';
  var B = window.B;

  var KEP = {
    glb: 'kepler', scene: 'space', home: 2.5,
    title: B('認識 Kepler：3D 展示', 'Meet Kepler: 3D view'),
    credit: B('3D 模型：NASA/Kepler Mission（Kepler (A)，NASA 3D 資源庫）。已解除 Draco 壓縮；零件命名、材質與拆解動畫為本作品加工。模型是簡化版，只分成幾個大零件，與真實的內部構造不同。',
              '3D model: NASA/Kepler Mission (Kepler (A), NASA 3D Resources). Draco compression removed; part naming, materials and exploded view added by this project. The model is simplified into a few large parts and does not show the real interior.'),
    parts: [
      { id: 'kp_aperture', nodes: ['kp_aperture'], explode: [0, 0.24, 0], focus: 0.6, view: [0.6, 0.9, 1.1], pin: { anchor: [0, 0.07, 0.06] }, icon: '🔭', name: B('望遠鏡口徑（修正板端）', 'Telescope aperture (corrector end)'),
        structure: [B('望遠鏡前方收光的開口，口徑約 0.95 公尺；開口處是一片石英玻璃修正板。', 'The opening at the front of the telescope that takes in light, about 0.95 m across, closed by a fused-silica corrector plate.'),
                    B('星光穿過修正板，往下照到後方 1.4 公尺的主鏡。', 'Starlight passes through the corrector plate and travels down to the 1.4 m primary mirror behind it.')],
        func: [B('讓星光進入望遠鏡，並把光線「修正」到焦平面上，讓星點清楚、穩定。', 'It lets starlight in and “corrects” the light onto the focal plane so star images stay sharp and steady.'),
               B('這是模型的簡化外形，修正板與主鏡的細節看不到。', 'The model is simplified; the corrector plate and mirror details are not shown.')] },
      { id: 'kp_telescope', nodes: ['kp_barrel', 'kp_trim'], explode: [0, 0, 0], focus: 1.0, view: [0.9, 0.3, 1.2], pin: { anchor: [0.2, 0.08, 0.2] }, icon: '📷', name: B('光度計（望遠鏡筒）', 'Photometer (telescope tube)'),
        structure: [B('Kepler 唯一的儀器：口徑 0.95 公尺的施密特式望遠鏡，主鏡直徑 1.4 公尺。', 'Kepler’s only instrument: a 0.95 m-aperture Schmidt-type telescope with a 1.4 m primary mirror.'),
                    B('焦平面上有 42 片 CCD，合計約 9,500 萬像素，是 NASA 當時送上太空最大的相機。', 'Its focal plane holds 42 CCDs, about 95 million pixels in all, the largest camera NASA had flown in space.')],
        func: [B('收集星光，並同時量出約十幾萬顆星星亮度的變化。', 'It gathers starlight and measures the brightness changes of well over a hundred thousand stars at once.'),
               B('行星經過時，星光只會暗一點點，光度計就是靠量這個小小的變化找行星。', 'A passing planet dims a star only slightly, and the photometer finds planets by measuring that small change.')] },
      { id: 'kp_solar', nodes: ['kp_solar'], explode: [-0.3, 0, 0.05], focus: 0.9, view: [-1.1, 0.4, 0.8], pin: { anchor: [0.02, -0.08, 0.17] }, icon: '☀️', name: B('太陽能板', 'Solar array'),
        structure: [B('固定在太空船上的太陽能板，不會轉動或展開。', 'A solar array fixed to the spacecraft that neither rotates nor deploys.')],
        func: [B('供電給整艘太空船。', 'It powers the whole spacecraft.'),
               B('固定不動可以減少震動干擾，同時幫忙遮住光度計。', 'Staying fixed minimizes jitter and also helps shade the photometer.')] },
      { id: 'kp_bus', nodes: ['kp_bus', 'kp_ring'], explode: [0, -0.24, 0], focus: 0.8, view: [0.7, -0.3, 1.3], pin: { anchor: [0.12, 0.02, 0.2] }, icon: '🎡', name: B('太空船本體（姿態控制）', 'Spacecraft body (attitude control)'),
        structure: [B('太空船的「身體」：裝著電腦、固態資料記錄器、電池、兩個星追蹤器和 4 顆反作用輪（在裡面，模型看不到）。', 'The spacecraft’s body: it carries the computers, solid-state data recorder, battery, two star trackers and four reaction wheels (inside, not visible in the model).'),
                    B('下層支撐 8 顆 1 牛頓的推進器。', 'Its lower deck supports eight 1-newton thrusters.')],
        func: [B('讓望遠鏡穩穩對準目標：反作用輪轉速一改變，太空船就微微轉向；推進器定期卸掉輪子累積的轉動量。', 'It holds the telescope steadily on target: changing a reaction wheel’s speed turns the spacecraft slightly, and the thrusters periodically remove the momentum the wheels build up.'),
               B('2013 年，4 顆輪子裡的第二顆壞了，這裡就是 K2 用陽光壓力補救的地方。', 'In 2013 the second of the four wheels failed, and this is where K2’s sunlight-pressure fix came into play.')] },
      { id: 'kp_hga', nodes: ['kp_hga'], explode: [0, -0.2, -0.3], focus: 0.55, view: [-0.5, -0.4, -1.4], pin: { anchor: [0, 0, 0] }, icon: '📡', name: B('高增益天線', 'High-gain antenna'),
        structure: [B('固定在機身上的碟形天線，用來高速率傳輸資料。', 'A dish antenna fixed to the body, used for high-rate data transmission.'),
                    B('另有 2 個接收用和 2 個發射用的低增益天線。', 'Two receiving and two transmitting low-gain antennas supplement it.')],
        func: [B('把望遠鏡累積的亮度資料送回地球，讓科學家分析。', 'It sends the telescope’s brightness data back to Earth for scientists to analyze.'),
               B('通訊使用 Ka 波段和 X 波段。', 'Communication uses the Ka-band and X-band.')] }
    ]
  };

  window.MISSIONS.forEach(function (m) {
    if (m.id === 'kepler') { m.model = KEP; }
  });
})();
