/* 任務 7：Kepler / K2 太空望遠鏡——用星光找行星，壞了一顆輪子後的第二次生命。
   事實來源（皆為 NASA 官方頁面，見 sources）：
   - NASA Science：Kepler / K2 任務頁——任務目標、凌日法、發射日期、前六週與 Kepler-9／Kepler-11 的發現、2013 年反作用輪故障、K2 的陽光壓力辦法與 19 個觀測季、2018 年退役、2,600 顆以上行星、20–50% 的推論
   - JPL：Kepler Press Kit——光度計（0.95 公尺修正板、1.4 公尺主鏡）、42 片 CCD／9,500 萬像素、固定式太陽能板、4 顆反作用輪、8 顆 1 牛頓推進器、碟形高增益天線
   - NSSDCA：Kepler（2009-011A）——質量 1,052 公斤、發射的世界時、繞日軌道（地球之後，週期 372.5 天）
   - NSSDCA 行星資料表（太陽、地球、木星）——凌日深度計算用的半徑
   「遊戲設定」標示的數字（光變曲線的時間與亮度等）是簡化用的，不是真實觀測資料。 */
(function () {
  var B = window.B, IM = window.IMAGES;
  function im(id, zh, en, credit, src) { IM[id] = { zh: zh, en: en, credit: credit, src: src }; }
  var SCI = 'NASA Science: Kepler / K2';
  im('PIA18904', '藝術示意圖：以 K2 新模式運作的 Kepler。2013 年失去精準對準的能力後，一個巧妙的修正讓它有了第二次生命', 'Artist concept of Kepler in its K2 mission profile: after it lost precise pointing in 2013, a clever fix gave it a second life', 'NASA, ESA, CSA, and STScI', SCI);
  im('PIA11824', '藝術示意圖：在太空中的 NASA Kepler 太空船', 'Artist concept of NASA’s Kepler spacecraft in space', 'NASA', SCI);
  im('ACD18-0204-002', '示意圖：Kepler 在滿是系外行星的天空裡（九年任務後，因燃料用完而退役）', 'Illustration: Kepler in a sky full of exoplanets (retired after nine years when its fuel ran out)', 'NASA/Ames Research Center/W. Stenzel/D. Rutter', SCI);
  im('ARC-2008-ACD07-0203-195', 'Ball Aerospace 的技術人員在 NASA 艾姆斯研究中心的測試艙裡，測試 Kepler 的元件', 'Technicians from Ball Aerospace test Kepler components in a test chamber at NASA’s Ames Research Center', 'NASA Ames Research Center', SCI);
  im('KSC-2009-1973', '2009 年 3 月 6 日晚上 10:49（美國東部時間），載著 Kepler 的 Delta II 火箭在卡納維爾角 17-B 發射台點火升空', 'The Delta II rocket carrying Kepler ignites at Launch Pad 17-B, Cape Canaveral, at 10:49 p.m. EST on March 6, 2009', 'NASA/KSC', 'NASA Image and Video Library');
  im('PIA11984', 'Kepler 的完整視野：天鵝座與天琴座一帶約 100 平方度的星空，相當於兩個並排的北斗七星', 'Kepler’s full field of view: a star-rich patch of Cygnus and Lyra, 100 square degrees, about two side-by-side dips of the Big Dipper', 'NASA/Ames/JPL-Caltech', 'NASA Image and Video Library');
  im('PIA11733', '2008 年在科羅拉多州波德 Ball Aerospace 公司的 Kepler 太空船：包著金色隔熱材料的圓筒就是望遠鏡', 'The Kepler spacecraft at Ball Aerospace in Boulder, Colorado, 2008: the foil-wrapped tube is the telescope', 'NASA/JPL-Caltech/Ball', 'NASA Image and Video Library');
  im('KSC-2009-1124', '2009 年 1 月，佛羅里達州 Astrotech 設施：太陽能板的照光測試，燈光映在 Kepler 的太陽能板上', 'January 2009 at the Astrotech facility in Florida: illumination testing of Kepler’s solar array panels', 'NASA/KSC', 'NASA Image and Video Library');
  im('KSC-2009-1041', '2009 年 1 月，Ball Aerospace 的工作人員在測試前檢查 Kepler 的星追蹤器（確保太空船準確導航的小型光學儀器）', 'January 2009: Ball Aerospace workers check Kepler’s star trackers, small optical devices that assure accurate navigation', 'NASA/KSC', 'NASA Image and Video Library');
  im('KSC-2009-1480', '2009 年 2 月：Kepler 在 Astrotech 的危險品處理設施裡被放到台架上，準備加注燃料', 'February 2009: Kepler is lowered onto a stand for fueling in the Hazardous Processing Facility at Astrotech', 'NASA/KSC', 'NASA Image and Video Library');
  im('KSC-2009-1430', '2009 年 1 月 30 日的媒體參訪：上方是太陽能板，左下角可以看到高增益天線', 'The January 30, 2009 media event: the solar arrays are on top and the high-gain antenna is at lower left', 'NASA/KSC', 'NASA Image and Video Library');
  im('KSC-2009-1043', '2009 年 1 月：Kepler 在 Astrotech 的無塵室裡準備測試', 'January 2009: Kepler is prepared for testing in a clean room at Astrotech', 'NASA/KSC', 'NASA Image and Video Library');

  window.MISSIONS.push({
    id: 'kepler', icon: '🔭', color: '#4abe7d',
    title: B('Kepler 與 K2：用星光找行星', 'Kepler and K2: hunting planets with starlight'),
    tagline: B('一個盯著星星看的望遠鏡，壞了一顆輪子後，靠陽光找到第二次生命', 'A telescope that stared at stars, and found a second life with the help of sunlight after losing a wheel'),
    cover: 'PIA11824',
    story: [
      { title: B('第一個專門找行星的望遠鏡', 'The first telescope built to hunt planets'), img: 'KSC-2009-1973',
        text: B('2009 年 3 月，NASA 的 Kepler 太空望遠鏡從佛羅里達的卡納維爾角發射升空（美國東部時間 3 月 6 日；世界時是 3 月 7 日）。它是 NASA 第一個專門找行星的任務：要在銀河系的一小塊天區裡，尋找繞著其他恆星運行、和地球差不多大的行星。計畫的第一位主持人 William Borucki 說：當他們開始構想這個任務時，人類還不知道太陽系外有任何一顆行星。',
                'In March 2009 NASA’s Kepler space telescope lifted off from Cape Canaveral, Florida (March 6 in US Eastern time; March 7 in universal time). It was NASA’s first planet-hunting mission, sent to search one patch of the Milky Way for Earth-sized planets orbiting other stars. Its founding principal investigator, William Borucki, said that when the team first imagined the mission, we did not know of a single planet outside our solar system.') },
      { title: B('用「變暗」找行星', 'Finding planets by the dip'), img: 'kep_transit',
        text: B('從這麼遠的地方，行星又小又暗，很難直接拍到。Kepler 用的是另一個方法：一直盯著恆星的亮度。當行星剛好從恆星前面經過，星光會暗下去一點點，這叫「凌日」。看到一次又一次、規律出現的小凹陷，就有可能是行星在繞著這顆星轉。',
                'From so far away a planet is small and faint, and very hard to photograph directly. Kepler used another method: it watched a star’s brightness all the time. When a planet happens to cross in front of its star, the starlight dips by a tiny amount. This is called a transit. Small dips that come again and again on a regular schedule can mean a planet is circling that star.') },
      { title: B('盯著十幾萬顆星星', 'Staring at a hundred thousand stars'), img: 'PIA11984',
        text: B('Kepler 一直盯著天鵝座附近同一片星空，約 150,000 顆星星，持續記錄每一顆的亮度。它的相機是當時太空望遠鏡裡最大的數位相機。上線頭六週，它就找到 5 顆行星（Kepler-4b、5b、6b、7b、8b，2010 年 1 月公布）。2010 年 4 月公布的 Kepler-9，是第一個確認有不只一顆行星從同一顆星前面經過的系統；2011 年 2 月公布的 Kepler-11，離地球約 2,000 光年，有 6 顆行星。',
                'Kepler stared at one patch of sky near the constellation Cygnus, about 150,000 stars, recording each one’s brightness all the time. Its camera was the largest digital camera on a space observatory at the time. In its first six weeks it found five planets (Kepler-4b, 5b, 6b, 7b and 8b, announced in January 2010). Kepler-9, announced in April 2010, was the first confirmed system with more than one planet transiting the same star; Kepler-11, announced in February 2011, lies about 2,000 light-years away and has six planets.') },
      { title: B('第二顆輪子壞了', 'The second wheel fails'), img: 'kep_sunlight',
        text: B('Kepler 靠 4 顆反作用輪來精準對準目標。2013 年 5 月，第二顆輪子壞了。望遠鏡需要 3 顆輪子才能固定住方向。原因很有趣：供給 Kepler 能量的太陽，也會用陽光的壓力推著太空船跑。沒有第三顆輪子幫忙抵消，超精準的指向就沒辦法在所有方向上維持。Kepler 再也無法停在同一片天區上，原本任務的新資料蒐集就這樣結束了。',
                'Kepler used four reaction wheels to point precisely. In May 2013 the second one failed, and the telescope needs three working wheels to hold its direction. The reason is surprising: the Sun that powers Kepler also pushes the spacecraft around with the pressure of its light. Without a third wheel to counter that push, the ultra-precise pointing could not be controlled in every direction. Kepler could no longer stay on one patch of sky, which effectively ended new data collection for the original mission.') },
      { title: B('K2：第二人生', 'K2: a second act'), img: 'PIA18904',
        text: B('工程師想到一個聰明的辦法：用陽光的壓力幫忙維持指向，就像獨木舟順著水流調整方向。重新設計的任務叫 K2。它掃描的天區更大，沿著黃道面；大約每三個月換一片新天區，這叫一個「觀測季」。原本估計剩下的燃料只能做 10 個觀測季，結果做了 19 個。K2 的時間和第一階段一樣長，調查過的星星增加到 50 萬顆以上，還開始研究太陽系內的天體、爆炸的恆星和遙遠星系中心的超大質量黑洞。',
                'Engineers came up with a clever scheme: use the pressure of sunlight to help hold the pointing, like a kayak steering into the current. The redesigned mission was called K2. It scanned a larger swath of sky along the ecliptic plane, shifting to a new patch roughly every three months, a stretch called a campaign. With the remaining fuel the team first estimated 10 campaigns; it reached 19. K2 lasted as long as the first mission and raised the count of surveyed stars to more than 500,000. It also began studying objects in our solar system, exploded stars and the supermassive black holes at the hearts of distant galaxies.') },
      { title: B('燃料用完，留在深空', 'Out of fuel, left in deep space'), img: 'ACD18-0204-002',
        text: B('在深空待了 9 年後，Kepler 用完了做科學工作需要的燃料。2018 年 10 月，NASA 決定讓它退役，留在目前安全、遠離地球的軌道上，退役日是 10 月 30 日。它在繞太陽的軌道上跟在地球後面，繞一圈約 372.5 天。Kepler 留下了超過 2,600 顆太陽系外行星的發現。',
                'After nine years in deep space Kepler ran out of the fuel it needed for science. In October 2018 NASA decided to retire it in its current safe orbit away from Earth, on October 30. It circles the Sun trailing behind Earth, taking about 372.5 days per lap. Kepler left a legacy of more than 2,600 planet discoveries outside our solar system.') }
    ],
    hardware: [
      { icon: '🔭', name: B('光度計（望遠鏡）', 'Photometer (the telescope)'), short: B('口徑約 0.95 公尺，主鏡直徑 1.4 公尺', 'About 0.95 m aperture, 1.4 m primary mirror'),
        how: B('Kepler 只有一件儀器：光度計，也就是「測光的儀器」。它是改良過的施密特望遠鏡：前方有 0.95 公尺口徑的石英玻璃修正板，後方是 1.4 公尺的主鏡（約 85% 減重，鍍有加強型的銀）。2009 年時，它是飛到地球軌道以外最大的望遠鏡。',
               'Kepler carried one instrument: a photometer, a “light meter”. Its optics are a modified Schmidt telescope: a 0.95 m fused-silica corrector plate at the front and a 1.4 m primary mirror behind it (about 85% light-weighted, with an enhanced silver coating). In 2009 it was the largest telescope ever launched beyond Earth orbit.'),
        why: B('行星擋住的光只有一點點，要看得出來，就要收集很多星光、而且要很穩。光度計不拍漂亮的照片，它只專心量亮度。',
               'A planet blocks only a sliver of light, so to notice it you must gather a lot of starlight and hold very steady. The photometer does not take pretty pictures; it measures brightness.') },
      { icon: '📷', name: B('焦平面相機', 'Focal plane camera'), short: B('42 片 CCD，合計約 9,500 萬像素', '42 CCDs, about 95 million pixels in all'),
        how: B('星光從主鏡反射到由 42 片 CCD 組成的陣列。每片 CCD 有 2,200 × 1,024 個像素，合計約 9,500 萬像素，是 NASA 當時送上太空最大的相機。四個角落還有 4 片精細導星 CCD，幫忙把望遠鏡對準。',
               'Starlight reflects off the mirror onto an array of 42 CCDs. Each CCD has 2,200 × 1,024 pixels, about 95 megapixels in all, the largest camera NASA had flown in space. Four fine-guidance CCDs in the corners help with pointing.'),
        why: B('這些 CCD 不是用來拍一般的照片，而是同時量好幾萬顆星星的亮度變化；星光還會刻意散開到幾個像素上，讓測量更穩定。',
               'These CCDs are not used to take ordinary pictures. They measure the brightness changes of many thousands of stars at once, and the starlight is deliberately spread over several pixels to make the measurement steadier.') },
      { icon: '☀️', name: B('太陽能板', 'Solar array'), short: B('固定不動，也幫忙遮住望遠鏡', 'Fixed in place, and it shades the telescope too'),
        how: B('Kepler 的太陽能板是固定的，不會轉動或展開。固定的設計可以減少震動干擾，板子還能幫忙遮住光度計。除了小小的反作用輪和一個可拋掉的蓋子，Kepler 上沒有其他會動或會展開的零件。',
               'Kepler’s solar array is fixed: it does not rotate or deploy. That minimizes jitter, and the array also shades the photometer. Apart from the small reaction wheels and an ejectable cover, Kepler had no other moving or deployable parts.'),
        why: B('少了會動的零件，指向就更穩、也更可靠，這對「一直盯著同一片星空」特別重要。',
               'Fewer moving parts means steadier pointing and higher reliability, which matters a lot for staring at one patch of sky.') },
      { icon: '🎡', name: B('反作用輪', 'Reaction wheels'), short: B('4 顆，裝在互不垂直的轉軸上', 'Four wheels on non-orthogonal axes'),
        how: B('反作用輪是會轉的飛輪：轉速一改變，整艘太空船就會朝反方向微微轉動。Kepler 有 4 顆，轉軸互不垂直，平常 4 顆一起分擔工作。它們要和兩個星追蹤器一起，才能在深空裡穩穩對準。',
               'A reaction wheel is a spinning flywheel: when its speed changes, the whole spacecraft turns slightly the other way. Kepler had four on non-orthogonal axes, all normally sharing the load. They work together with two star trackers to hold the aim in deep space.'),
        why: B('太空中沒有東西可以推，所以用飛輪來轉向，不需要噴燃料。2013 年壞了第二顆後，剩下的輪子就不夠用了。',
               'There is nothing to push against in space, so wheels turn the spacecraft without burning fuel. After the second wheel failed in 2013, the remaining wheels were not enough.') },
      { icon: '💨', name: B('反作用控制推進器', 'Reaction-control thrusters'), short: B('8 顆，每顆推力 1 牛頓', 'Eight thrusters, 1 newton each'),
        how: B('8 顆 1 牛頓的小推進器，裝在 +Y 與 −Y 兩個軸上，用來定期把反作用輪累積的轉動量卸掉。它們也靠燃料運作。',
               'Eight 1-newton thrusters, mounted on the +Y and −Y axes, periodically remove the momentum that builds up in the reaction wheels. They also run on fuel.'),
        why: B('燃料是 Kepler 的壽命：2018 年用完做科學所需的燃料後，NASA 讓它退役。',
               'Fuel was Kepler’s lifetime: when it ran out of the fuel needed for science in 2018, NASA retired it.') },
      { icon: '📡', name: B('高增益天線', 'High-gain antenna'), short: B('固定在機身上的碟形天線', 'A dish fixed to the body'),
        how: B('Kepler 用固定在機身上的碟形高增益天線，以高速率把資料傳回地球；另外有 2 個接收用和 2 個發射用的低增益天線，通訊使用 Ka 波段和 X 波段。太空船上有固態資料記錄器，先把資料存起來。',
               'Kepler sent data home at a high rate through a body-mounted parabolic dish; two receiving and two transmitting low-gain antennas supplemented it, using Ka-band and X-band. A solid-state data recorder stored the data first.'),
        why: B('望遠鏡每天累積大量亮度資料，要靠天線送回地球，科學家才能分析。',
               'The telescope collected a flood of brightness data, and the antenna carried it to Earth for scientists to analyze.') }
    ],
    challenges: {
      1: { type: 'transit', title: B('在光變曲線裡找行星', 'Find the planet in the light curve'),
        scenario: B('你是 Kepler 的資料分析員。每張圖都是一顆星星的亮度變化。找出星光暗下去的地方，把它點出來！', 'You are a Kepler data analyst. Each chart is one star’s brightness over time. Find where the starlight dips and click on it!'),
        rounds: [
          { label: B('第 1 顆星：很明顯的凹陷', 'Star 1: an obvious dip'), seed: 3, n: 120, noise: 0.004, ymin: 0.84, ymax: 1.04, dips: [{ at: 12, w: 3, depth: 0.1 }], need: 1,
            prompt: B('點出星光變暗的時間。', 'Click the time when the starlight dims.'),
            hint: B('找曲線突然往下掉、再回來的地方。', 'Look for where the line drops and then comes back.'),
            explain: B('就是這個凹陷：行星從星星前面經過，擋住了一點點光。', 'There it is: a planet passed in front and blocked a little of the light.') },
          { label: B('第 2 顆星：很淺的凹陷', 'Star 2: a shallow dip'), seed: 8, n: 120, noise: 0.006, ymin: 0.94, ymax: 1.02, dips: [{ at: 19, w: 2.6, depth: 0.04 }], need: 1,
            prompt: B('這張圖的凹陷小很多，點出來。', 'This dip is much smaller. Click it.'),
            hint: B('看縱軸：刻度變小了，凹陷還是比旁邊的小抖動更長、更整齊。', 'Look at the vertical axis: the scale is finer, and the dip is longer and neater than the little wiggles.'),
            explain: B('行星越小，凹陷越淺。真正的行星訊號是一段平滑的下降，不是單一個抖動的點。', 'The smaller the planet, the shallower the dip. A real planet signal is a smooth drop over a stretch of time, not one jittery point.') },
          { label: B('第 3 顆星：要出現兩次才算數', 'Star 3: it has to repeat'), seed: 14, n: 120, noise: 0.006, ymin: 0.92, ymax: 1.02, dips: [{ at: 7, w: 2.4, depth: 0.05 }, { at: 21, w: 2.4, depth: 0.05 }], need: 2,
            prompt: B('這顆星有 2 個凹陷。把兩個都點出來。', 'This star has two dips. Click both.'),
            hint: B('第二個凹陷會和第一個長得很像，而且隔了一樣的時間再出現。', 'The second dip looks like the first and comes after a regular wait.'),
            explain: B('兩個凹陷一樣深、一樣寬，這就是行星一圈一圈繞著恆星轉的證據。科學家看到規律重複，才比較有把握說：這可能是一顆行星。', 'Two dips of the same depth and width are evidence of a planet going around and around. Seeing the pattern repeat is what makes scientists more confident it may be a planet.') }
        ],
        note: B('遊戲設定：時間和亮度都是簡化示意；真實的行星凹陷通常小得多，圖中為了看得清楚而放大。', 'Game setting: the times and brightness are illustrative; real planet dips are usually much smaller and are exaggerated here so you can see them.'),
        success: B('你學會了像 Kepler 一樣，從星光的小凹陷找行星！', 'You learned to find planets from tiny dips in starlight, just like Kepler!') },
      2: { type: 'order', title: B('K2 的陽光救援', 'K2’s rescue by sunlight'),
        scenario: B('你是 Kepler 的工程師。請把 Kepler 從故障到第二次生命的五個步驟，依發生的先後順序排好。', 'You are a Kepler engineer. Put the five steps from the failure to the second life in the order they happened.'),
        items: [
          { id: 'a', t: B('2013 年 5 月，4 顆反作用輪裡的第二顆壞了', 'In May 2013 the second of the four reaction wheels fails') },
          { id: 'b', t: B('剩下的輪子不夠用，Kepler 沒辦法再穩穩停在同一片天區，原本任務的新資料蒐集結束', 'The remaining wheels are not enough; Kepler can no longer hold one patch of sky, ending new data collection for the original mission') },
          { id: 'c', t: B('工程師想到：用陽光的壓力幫忙維持指向，像獨木舟順著水流調整', 'Engineers come up with a plan: use the pressure of sunlight to help hold the pointing, like a kayak in a current') },
          { id: 'd', t: B('K2 開始：沿著黃道面，大約每三個月換一片新天區觀測（一個「觀測季」）', 'K2 begins: along the ecliptic plane, shifting to a new patch of sky roughly every three months (a campaign)') },
          { id: 'e', t: B('燃料快用完時，K2 一共完成了 19 個觀測季', 'As the fuel runs low, K2 completes 19 campaigns in all') }
        ],
        hint: B('想想：要先壞掉、才會想辦法；有了辦法，才能開始新任務。', 'Think: it had to break first, then a fix, and only then could the new mission begin.'),
        explain: B('故障 → 失去穩定指向 → 想到用陽光的壓力 → K2 開始、每約三個月換一次天區 → 完成 19 個觀測季（原本估計只有 10 個）。', 'Failure → lost steady pointing → the sunlight idea → K2 begins, changing fields about every three months → 19 campaigns completed (first estimated at 10).'),
        success: B('你排好了 K2 的救援故事！', 'You put the K2 rescue in order!') },
      3: { type: 'find3d', title: B('哪個零件負責？', 'Which part does the job?'),
        scenario: B('在 3D 全息圖上轉一轉，點選負責的零件。', 'Rotate the 3D hologram and tap the part that does the job.'),
        questions: [
          { q: B('哪個零件，是望遠鏡前方收進星光的開口？', 'Which part is the opening at the front that takes in the starlight?'), answer: 'kp_aperture',
            explain: B('對！前方有 0.95 公尺口徑的石英玻璃修正板，星光先從這裡進入望遠鏡。', 'Right! A 0.95 m fused-silica corrector plate sits at the front, and starlight enters the telescope here.') },
          { q: B('哪個零件把星光收集起來，並量出星星亮度的變化？', 'Which part gathers the starlight and measures the changes in a star’s brightness?'), answer: 'kp_telescope',
            explain: B('對！光度計（望遠鏡加焦平面相機）是 Kepler 唯一的儀器。', 'Right! The photometer (the telescope plus its focal plane camera) is Kepler’s only instrument.') },
          { q: B('哪個零件讓 Kepler 有電可用，而且是固定的，還幫忙遮住望遠鏡？', 'Which part gives Kepler its power, is fixed in place, and helps shade the telescope?'), answer: 'kp_solar',
            explain: B('對！固定式太陽能板可以減少震動，也能遮住光度計。', 'Right! The fixed solar array minimizes jitter and shades the photometer.') },
          { q: B('哪個零件裡面裝著反作用輪、推進器和電子設備？', 'Which part carries the reaction wheels, thrusters and electronics?'), answer: 'kp_bus',
            explain: B('對！太空船本體承載電子設備、電池、星追蹤器和反作用輪，下層還支撐著推進器。', 'Right! The spacecraft body carries the electronics, battery, star trackers and reaction wheels, and its lower deck supports the thrusters.') },
          { q: B('哪個零件把資料用高速率傳回地球？', 'Which part sends the data back to Earth at a high rate?'), answer: 'kp_hga',
            explain: B('對！固定在機身上的碟形高增益天線負責高速率傳輸。', 'Right! The body-mounted dish high-gain antenna handles the high-rate transmission.') }
        ],
        success: B('你認得 Kepler 的主要零件了！', 'You know Kepler’s main parts!') },
      4: { type: 'calc', title: B('凹陷多深？', 'How deep is the dip?'),
        scenario: B('行星擋住的光，大約是「行星半徑 ÷ 恆星半徑」再平方。深度（%）＝ (行星半徑 ÷ 恆星半徑)² × 100。NASA 行星資料表的平均半徑：太陽 695,700 公里、地球 6,371 公里、木星 69,911 公里。',
                'The light a planet blocks is about (planet radius ÷ star radius) squared. Depth (%) = (planet radius ÷ star radius)² × 100. Mean radii from NASA’s planetary fact sheets: Sun 695,700 km, Earth 6,371 km, Jupiter 69,911 km.'),
        questions: [
          { q: B('一顆行星的半徑是恆星的 1/10，凹陷深度約幾 %？', 'A planet’s radius is 1/10 of its star’s. About how deep is the dip, in %?'), answer: 1, tol: 0.05, unit: '%',
            hint: B('(1/10)² = 1/100。', '(1/10)² = 1/100.'), explain: B('(1/10)² = 0.01，也就是 1%。', '(1/10)² = 0.01, which is 1%.') },
          { q: B('地球從太陽前面經過，凹陷深度約幾 %？（取到小數點後 4 位）', 'If Earth crosses in front of the Sun, about how deep is the dip, in %? (four decimals)'), answer: 0.0084, tol: 0.0004, unit: '%',
            hint: B('先算 6,371 ÷ 695,700 ≈ 0.00916，再平方，再乘 100。', 'First 6,371 ÷ 695,700 ≈ 0.00916; square it, then × 100.'), explain: B('0.00916² ≈ 0.0000839，約 0.0084%。所以要看見地球大小的行星，需要非常精準的測量。', '0.00916² ≈ 0.0000839, about 0.0084%. Spotting an Earth-sized planet takes extremely precise measurements.') },
          { q: B('木星從太陽前面經過，凹陷深度約幾 %？（取到小數點後 2 位）', 'If Jupiter crosses in front of the Sun, about how deep is the dip, in %? (two decimals)'), answer: 1.01, tol: 0.03, unit: '%',
            hint: B('69,911 ÷ 695,700 ≈ 0.1005，再平方，再乘 100。', '69,911 ÷ 695,700 ≈ 0.1005; square it, then × 100.'), explain: B('0.1005² ≈ 0.0101，約 1.01%。', '0.1005² ≈ 0.0101, about 1.01%.') },
          { q: B('木星凌日的凹陷，大約是地球凌日的幾倍？（取整數）', 'About how many times deeper is Jupiter’s dip than Earth’s? (whole number)'), answer: 120, tol: 3, unit: B('倍', '×'),
            hint: B('1.01 ÷ 0.0084，或直接算 (69,911 ÷ 6,371)²。', '1.01 ÷ 0.0084, or directly (69,911 ÷ 6,371)².'), explain: B('(69,911 ÷ 6,371)² ≈ 120。木星擋住的光，大約是地球的 120 倍，所以大行星比較容易被看見。', '(69,911 ÷ 6,371)² ≈ 120. Jupiter blocks about 120 times as much light as Earth, so big planets are easier to spot.') }
        ],
        note: B('這裡假設行星剛好從恆星正面經過、恆星亮度均勻；真實情況更複雜，這是簡化的估算。', 'This assumes the planet crosses the star’s face and the star is evenly bright; real cases are more complicated, so this is a simplified estimate.'),
        success: B('你算出：行星越小，凹陷越淺，Kepler 要非常精準才能發現地球大小的行星。', 'You found that the smaller the planet, the shallower the dip, so Kepler had to be extremely precise to find Earth-sized planets.') }
    },
    science: [
      { icon: '🔭', t: B('Kepler 是 NASA 第一個專門找行星的任務，也是 NASA 第一個在恆星適居帶裡偵測到地球大小行星的任務。', 'Kepler was NASA’s first planet-hunting mission, and the agency’s first to detect Earth-size planets in the habitable zones of their stars.') },
      { icon: '🪐', t: B('它的發現顯示銀河系裡藏著數十億顆系外行星；夜空中的行星，比恆星還多。', 'Its discoveries show our galaxy holds billions of hidden exoplanets, and that the night sky holds even more planets than stars.') },
      { icon: '🌍', t: B('最常見的行星大小，在地球與海王星之間，太陽系裡沒有這種行星；有些行星系統擠滿行星，比起來，我們的內太陽系顯得稀疏。', 'The most common size of planet Kepler found lies between Earth and Neptune, a size our solar system lacks; some systems are so packed with planets that our inner solar system looks sparse.') },
      { icon: '💧', t: B('分析 Kepler 的發現後，結論是：夜空中可見恆星的 20% 到 50%，可能有和地球差不多大、可能是岩石的小行星，位在適居帶，也就是液態水有可能存在的距離。', 'Analysis of Kepler’s discoveries concludes that 20 to 50 percent of the stars visible in the night sky are likely to have small, possibly rocky, planets similar in size to Earth, in the habitable zone, where liquid water might pool.') },
      { icon: '📂', t: B('K2 階段的資料立刻公開給科學界和大眾，發現的速度很快；接棒的 TESS 在 2018 年 4 月發射，繼續找行星。', 'The extended mission’s data were made public immediately, so discoveries came at an incredible pace; TESS, launched in April 2018, builds on Kepler’s foundation.') }
    ],
    ending: B('2018 年 10 月 30 日，Kepler 退役。它沒有被帶回來，仍在繞著太陽的軌道上，位置跟在地球後面。計畫的第一位主持人 William Borucki 說：「現在我們知道，行星到處都是。」科學家預計要花十年以上，才能把 Kepler 留下的資料挖完。接棒的 TESS 在找繞著約 20 萬顆最亮、最近的恆星的行星；這些行星之後，可以由韋伯太空望遠鏡等去尋找生命的跡象。',
              'On October 30, 2018 Kepler was retired. It was not brought home; it still circles the Sun, trailing behind Earth. Its founding principal investigator, William Borucki, said: “Now that we know planets are everywhere…” Scientists expect to spend a decade or more mining the data Kepler left behind. Its successor TESS is searching around some 200,000 of the brightest, nearest stars, and the worlds it finds can later be examined for signs of life by missions such as the James Webb Space Telescope.'),
    endImg: 'PIA18904',
    sources: [
      { label: 'NASA Science: Kepler / K2', url: 'https://science.nasa.gov/mission/kepler/', note: B('任務目標、凌日法、前六週與 Kepler-9／Kepler-11、2013 年反作用輪故障、K2 與 19 個觀測季、2018 年退役、20–50% 的推論', 'Mission goal, transit method, the first six weeks, Kepler-9 and Kepler-11, the 2013 reaction-wheel failure, K2 and its 19 campaigns, the 2018 retirement and the 20–50% estimate') },
      { label: 'JPL: Kepler Press Kit', url: 'https://www.jpl.nasa.gov/news/press_kits/Kepler-presskit-2-19-smfile.pdf', note: B('光度計、42 片 CCD、固定式太陽能板、4 顆反作用輪、8 顆推進器、碟形高增益天線', 'The photometer, 42 CCDs, the fixed solar array, four reaction wheels, eight thrusters and the dish high-gain antenna') },
      { label: 'NSSDCA: Kepler (2009-011A)', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2009-011A', note: B('質量 1,052 公斤、發射的世界時、地球之後的繞日軌道（週期 372.5 天）', 'Mass 1,052 kg, launch in universal time, the Earth-trailing heliocentric orbit (period 372.5 days)') },
      { label: 'NSSDCA Sun Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html', note: B('太陽平均半徑 695,700 公里', 'Sun mean radius 695,700 km') },
      { label: 'NSSDCA Earth Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html', note: B('地球平均半徑 6,371 公里', 'Earth mean radius 6,371 km') },
      { label: 'NSSDCA Jupiter Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html', note: B('木星平均半徑 69,911 公里', 'Jupiter mean radius 69,911 km') },
      { label: 'NASA Image and Video Library', url: 'https://images.nasa.gov/', note: B('Kepler 的發射、地面測試與視野照片（KSC、JPL、艾姆斯研究中心）', 'Photographs of Kepler’s launch, ground testing and field of view (KSC, JPL, Ames)') },
      { label: 'NASA 3D Resources: Kepler (A)', url: 'https://science.nasa.gov/3d-resources/kepler-a/', note: B('3D 模型來源（NASA/Kepler Mission）', 'Source of the 3D model (NASA/Kepler Mission)') }
    ]
  });
})();
