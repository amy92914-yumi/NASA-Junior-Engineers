/* 共用資料：雙語輔助函式、圖片清單（皆為 NASA 官方影像）、任務清單容器 */
window.B = function (zh, en) { return { zh: zh, en: en }; };
window.MISSIONS = [];

/* 圖片來源：NASA Image and Video Library (images.nasa.gov)。nasa_id 即檔名。 */
window.IMAGES = {
  PIA24542: { zh: '毅力號與機智號的合照（2021/4/6）', en: 'Perseverance’s selfie with Ingenuity (Apr 6, 2021)', credit: 'NASA/JPL-Caltech/MSSS' },
  PIA24434: { zh: '1903 年萊特兄弟首次動力飛行', en: 'The Wright brothers’ first powered flight, 1903', credit: 'Library of Congress' },
  PIA24584: { zh: '機智號首飛時拍到自己的影子（2021/4/19）', en: 'Ingenuity’s own shadow during its first flight (Apr 19, 2021)', credit: 'NASA/JPL-Caltech' },
  PIA24593: { zh: '第一張飛行中拍下的火星彩色照片（2021/4/22）', en: 'First color image of Mars taken from the air (Apr 22, 2021)', credit: 'NASA/JPL-Caltech' },
  PIA26243: { zh: '第 72 次飛行後，受損旋翼的影子（2024/1）', en: 'Shadow of a damaged rotor blade after flight 72 (Jan 2024)', credit: 'NASA/JPL-Caltech' },
  PIA24586: { zh: '毅力號拍下機智號首飛（2021/4/19）', en: 'Perseverance’s view of Ingenuity’s first flight (Apr 19, 2021)', credit: 'NASA/JPL-Caltech' },
  PIA22222: { zh: '機會號在 Perseverance Valley 的自拍（2018）', en: 'Opportunity’s selfie at Perseverance Valley (2018)', credit: 'NASA/JPL-Caltech' },
  PIA17759: { zh: '機會號自拍（2014/1）', en: 'Opportunity self-portrait (Jan 2014)', credit: 'NASA/JPL-Caltech/Cornell Univ./Arizona State Univ.' },
  PIA22329: { zh: '2018/6/6 火星全球沙塵暴（藍點為機會號位置）', en: 'Global dust storm on Mars, Jun 6, 2018 (blue dot = Opportunity)', credit: 'NASA/JPL-Caltech/MSSS' },
  PIA14111: { zh: '航海家號的電腦模型（藝術示意圖）', en: 'Voyager spacecraft model (artist concept)', credit: 'NASA/JPL-Caltech' },
  PIA17048: { zh: '兩艘航海家號的位置（藝術示意圖）', en: 'Where the two Voyagers are (artist concept)', credit: 'NASA/JPL-Caltech' },
  PIA00452: { zh: '淡藍色小點：1990/2/14 航海家1號拍下的地球', en: 'Pale Blue Dot: Earth seen by Voyager 1 on Feb 14, 1990', credit: 'NASA/JPL' },
  PIA00029: { zh: '航海家1號 1979/1/6 拍攝的木星', en: 'Jupiter, imaged by Voyager 1 on Jan 6, 1979', credit: 'NASA/JPL' },
  'KSC-digitalmco': { zh: '火星氣候軌道器發射（1998/12/11）', en: 'Mars Climate Orbiter launch (Dec 11, 1998)', credit: 'NASA/KSC' },
  PIA02330: { zh: '氣候軌道器靠近火星時拍到的火星（MARCI 相機）', en: 'Mars seen by the Orbiter’s MARCI camera on approach', credit: 'NASA/JPL/MSSS' },
  PIA14113: { zh: '金唱片：兩艘航海家號各帶一張', en: 'The Golden Record: one on each Voyager', credit: 'NASA/JPL-Caltech' },
  PIA21741: { zh: '準備安裝上航海家1號的金唱片', en: 'Preparing the Golden Record for installation on Voyager 1', credit: 'NASA/JPL-Caltech' },
  PIA17035: { zh: '地球的紀念品：金唱片與小國旗', en: 'Mementos of Earth: the Golden Record and a small flag', credit: 'NASA/JPL-Caltech' },
  PIA08812: { zh: '從火星軌道拍到的維多利亞坑，機會號在坑邊（2006/10）', en: 'Victoria Crater seen from Mars orbit, with Opportunity at its rim (Oct 2006)', credit: 'NASA/JPL/University of Arizona' },
  PIA12131: { zh: '機會號導航相機：倒車退出沙脊後留下的輪痕（2009，第 1867 個火星日）', en: 'Opportunity’s navigation camera: tracks left after backing out of a ripple (2009, sol 1867)', credit: 'NASA/JPL-Caltech' },
  PIA22909: { zh: '機會號最後一張 360° 全景：毅力谷（2018/5–6，近似真實色彩）', en: 'Opportunity’s last 360° panorama, Perseverance Valley (May–Jun 2018, approximate true color)', credit: 'NASA/JPL-Caltech/Cornell/ASU' },
  PIA22521: { zh: '模擬畫面：沙塵一步步遮住太陽，機會號的視角（2018/6）', en: 'Simulated views: dust blots out the Sun from Opportunity’s point of view (Jun 2018)', credit: 'NASA/JPL-Caltech/TAMU' },
  PIA25782: { zh: '航海家號的核能電池（RTG），用鈈-238 衰變的熱發電', en: 'A Voyager radioisotope thermoelectric generator (RTG): heat from plutonium-238 decay becomes electricity', credit: 'NASA/JPL-Caltech' },
  PIA23214: { zh: 'NASA 深空網路在加州金石的天線，用來和遠方的探測器通話（2020）', en: 'NASA Deep Space Network antennas at Goldstone, California, used to talk to distant spacecraft (2020)', credit: 'NASA/JPL-Caltech' },
  PIA17045: { zh: '航海家1號電漿波儀的資料：「聽」到星際空間的電漿振動（2012–2013）', en: 'Voyager 1 plasma wave data: hearing the vibrations of interstellar plasma (2012–2013)', credit: 'NASA/JPL-Caltech/University of Iowa' },
  'KSC-98pc1733': { zh: '1998/11：技師在甘迺迪太空中心準備火星氣候軌道器（右）與火箭第三節（左）', en: 'Nov 1998: technicians at Kennedy Space Center prepare the Mars Climate Orbiter (right) and the rocket’s third stage (left)', credit: 'NASA/KSC' },
  'KSC-98pc1046': { zh: '1998/9：火星氣候軌道器搭乘 C-17 運輸機抵達甘迺迪太空中心', en: 'Sep 1998: the Mars Climate Orbiter arrives at Kennedy Space Center aboard a C-17 cargo plane', credit: 'NASA/KSC' },
  '201309120010HQ': { zh: '2013/9：航海家計畫經理蘇珊·道德（Suzanne Dodd）手持金唱片複製品', en: 'Sep 2013: Voyager project manager Suzanne Dodd holds a replica of the Golden Record', credit: 'NASA/Carla Cioffi' },
  NHQ201709050020: { zh: '2017/9：金唱片的靈魂人物安·德魯楊（Ann Druyan）談航海家號拍下的最後一張地球照片', en: 'Sep 2017: Ann Druyan, “golden record visionary”, speaks about Voyager’s last image of Earth', credit: 'NASA/Aubrey Gemignani' },
  PIA21740: { zh: '1977 年的檔案照片：工程師為航海家1號的金唱片蓋上保護套', en: 'Archival 1977 photo: engineers secure the cover over Voyager 1’s Golden Record', credit: 'NASA/JPL-Caltech' }
};
window.imgUrl = function (id) { return 'assets/img/' + id + '.jpg'; };
