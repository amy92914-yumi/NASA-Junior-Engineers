/* 零件頁的真實照片：每個任務的 hardware 陣列順序 → 一張 NASA 照片。
   rel:true ＝ 找不到該零件的特寫，改放相關的真實照片（頁面會標示）。
   來源：NASA Image and Video Library、science.nasa.gov 任務頁面。 */
(function () {
  'use strict';
  var IMG = window.IMAGES;
  function add(id, zh, en, credit, src) { if (!IMG[id]) IMG[id] = { zh: zh, en: en, credit: credit, src: src }; }
  add('PIA24549', '毅力號的 Mastcam-Z 拍到機智號的旋翼（2021/4）', 'Perseverance’s Mastcam-Z sees Ingenuity’s rotor blades (Apr 2021)', 'NASA/JPL-Caltech/ASU');
  add('PIA24545', '機智號頂端的太陽能板（毅力號 Mastcam-Z 拍攝，2021/4）', 'Ingenuity’s solar panel on top, seen by Perseverance’s Mastcam-Z (Apr 2021)', 'NASA/JPL-Caltech/ASU');
  add('PIA23969', '機智號的底部：朝下的相機與隔熱的機身（2021/1）', 'The underside of Ingenuity: the downward-looking cameras and insulated body (Jan 2021)', 'NASA/JPL-Caltech');
  add('PIA24291', '縫在機智號上的萊特飛行者一號布料（2021/4）', 'The Wright Flyer 1 fabric swatch attached to Ingenuity (Apr 2021)', 'NASA/JPL-Caltech');
  add('ing-anatomy', '機智號構造圖：旋翼、天線、太陽能板、電池、機身與相機', 'Anatomy of Ingenuity: blades, antennas, solar panel, batteries, body and cameras', 'NASA/JPL-Caltech', 'science.nasa.gov');
  add('mer-solar-above', '機會號的太陽能板與探測車甲板（由上方拍攝的合成照）', 'Opportunity’s solar panels and deck, seen from above (mosaic)', 'NASA/JPL-Caltech', 'science.nasa.gov');
  add('PIA15114', '機會號自拍：2007 年沙塵覆蓋的太陽能板', 'Opportunity self-portrait: dust-covered solar panels, 2007', 'NASA/JPL-Caltech/Cornell');
  add('PIA13419', '機會號拍到的隕石特寫（機械手臂上的儀器就在畫面下方）', 'A close-up of a meteorite by Opportunity (the arm instruments are at the bottom)', 'NASA/JPL-Caltech/Cornell');
  add('PIA16929', '機會號研磨過的岩石 Esperance（2013）', 'The rock Esperance after Opportunity ground it (2013)', 'NASA/JPL-Caltech/Cornell/ASU');
  add('PIA21480', '1976 年：工程師檢查航海家號的大型天線碟', '1976: an engineer inspects a Voyager antenna dish', 'NASA/JPL');
  add('PIA22915', '航海家2號的儀器配置圖：磁場計吊桿、電漿波天線、粒子偵測器', 'Voyager 2’s instruments: magnetometer boom, plasma wave antennas and particle detectors', 'NASA/JPL-Caltech');
  add('PIA21738', '航海家號在佛羅里達的組裝作業', 'Voyager being prepared in Florida', 'NASA/JPL-Caltech');
  add('KSC-98pc1079', '1998/9：甘迺迪太空中心的火星氣候軌道器相關作業', 'Sep 1998: Mars Climate Orbiter preparations at Kennedy Space Center', 'NASA/KSC');
  add('voyager-record-diagram', '金唱片的封面與說明圖：告訴外星人怎麼播放', 'The Golden Record and its cover diagram: how to play it', 'NASA/JPL');
  window.PARTPHOTO = {
    ingenuity: [{ id: 'PIA24549' }, { id: 'ing-anatomy' }, { id: 'PIA24545' }, { id: 'PIA23969' }, { id: 'PIA24291' }],
    opportunity: [{ id: 'mer-solar-above' }, { id: 'PIA15114', rel: 1 }, { id: 'PIA12131', rel: 1 }, { id: 'PIA22222', rel: 1 }, { id: 'PIA13419' }, { id: 'PIA16929' }],
    voyager: [{ id: 'PIA25782' }, { id: 'PIA21480' }, { id: 'PIA22915' }, { id: 'PIA22915' }, { id: 'PIA14113' }],
    mco: [{ id: 'PIA02330', rel: 1 }, { id: 'KSC-digitalmco', rel: 1 }, { id: 'KSC-98pc1733', rel: 1 }, { id: 'PIA23214', rel: 1 }, { id: 'KSC-98pc1079', rel: 1 }],
    apollo: [{ id: 'AS11-40-5927' }, { id: 'apollo-lm-diagram' }, { id: 'AS11-44-6574', rel: 1 }, { id: 'AS11-40-5949' }, { id: 'AS17-147-22526' }, { id: 'lrv-display' }],
    record: [{ id: 'PIA14113' }, { id: 'PIA21741', rel: 1 }, { id: 'PIA17035', rel: 1 }, { id: '201309120010HQ', rel: 1 }, { id: 'voyager-record-diagram' }, { id: 'PIA21738', rel: 1 }],
    kepler: [{ id: 'PIA11733', rel: 1 }, { id: 'ARC-2008-ACD07-0203-195', rel: 1 }, { id: 'KSC-2009-1124' }, { id: 'KSC-2009-1041', rel: 1 }, { id: 'KSC-2009-1480', rel: 1 }, { id: 'KSC-2009-1430', rel: 1 }]   /* 全部是 NASA 真實照片；rel＝相關照片（不是該零件的特寫） */
  };
})();
