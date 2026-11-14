/* 任務 1：機智號 Ingenuity。事實來源見 sources 與 01_研究資料/事實核對表.md */
(function () {
  var B = window.B;
  var marsPlanet = {
    id: 'mars', label: B('火星（空氣很稀薄）', 'Mars (very thin air)'), theme: 'mars', needed: 2400,
    low: B('旋翼轉得太慢，空氣太稀薄，托不起機身。再加速！', 'The rotors are too slow. The air is so thin they cannot lift it. Speed up!'),
    almost: B('快了！機身開始變輕，再加速一點。', 'Almost! The helicopter feels lighter. A little faster.'),
    hover: B('成功懸停！升力剛好等於機身重量。', 'Hovering! Lift now equals the helicopter’s weight.'),
    high: B('太快了！升力太大，機身會失控衝上去。降低一點。', 'Too fast! There is too much lift and it shoots upward. Slow down a bit.')
  };
  var earthPlanet = {
    id: 'earth', label: B('地球（空氣濃）', 'Earth (thick air)'), theme: 'earth', needed: 300,
    low: B('轉速太低。地球的空氣濃，不用轉太快，但還是要有一點速度。', 'Too slow. Earth’s air is thick, so you do not need high speed, but you need some.'),
    almost: B('快了，再加一點點。', 'Almost, just a bit more.'),
    hover: B('在地球上，轉得慢很多就能懸停！', 'On Earth it hovers at a much lower speed!'),
    high: B('太快了！在地球上不用轉這麼快。', 'Too fast! You do not need this speed on Earth.')
  };

  window.MISSIONS.push({
    id: 'ingenuity', icon: '🚁', color: '#ff8a4c',
    title: B('機智號：在火星上飛', 'Ingenuity: Flying on Mars'),
    tagline: B('第一架在另一個星球上飛行的直升機', 'The first helicopter to fly on another planet'),
    cover: 'PIA24542',
    story: [
      { title: B('一件小小的行李', 'A small piece of luggage'), img: 'PIA24542',
        text: B('2021 年 2 月，毅力號探測車降落在火星，肚子底下掛著一件小行李：一架只有 1.8 公斤的直升機，名字叫「機智號」(Ingenuity)。它的任務很大膽——證明直升機可以在另一個星球上飛。',
                'In February 2021 the Perseverance rover landed on Mars with a small passenger tucked underneath: a 1.8-kilogram helicopter called Ingenuity. Its job was bold: prove that a helicopter can fly on another planet.') },
      { title: B('火星的空氣太稀薄', 'Mars has very thin air'),
        text: B('直升機靠旋翼把空氣往下推，才能升空。但火星的空氣密度還不到地球的 1%。工程師的辦法是：把旋翼轉得非常快，約每分鐘 2,400 圈，大約是地球一般直升機的 8 倍！',
                'A helicopter climbs by pushing air downward with its rotors. But Mars’s air is less than 1% as dense as Earth’s. The engineers’ answer: spin the rotors very fast, about 2,400 times a minute, roughly eight times faster than a normal helicopter on Earth!') },
      { title: B('一塊來自 1903 年的布', 'A piece of cloth from 1903'), img: 'PIA24434',
        text: B('機智號身上藏著一個小祕密：它帶了一小塊覆蓋在萊特兄弟飛機機翼上的布料。1903 年 12 月 17 日，萊特兄弟完成地球上第一次動力、可控的飛行；一百多年後，同樣的精神飛到了火星。',
                'Ingenuity carried a secret: a small piece of the material that covered the wing of the Wright brothers’ aircraft. On December 17, 1903, they made the first powered, controlled flight on Earth. More than a century later, that spirit flew on Mars.') },
      { title: B('第一次飛行', 'The first flight'), img: 'PIA24586',
        text: B('2021 年 4 月 19 日，機智號完成人類在另一個星球上的第一次動力、可控飛行：它升空、懸停了幾秒鐘，然後安全降落。原本計畫最多飛 5 次、30 天，結果它一共飛了 72 次。',
                'On April 19, 2021, Ingenuity made the first powered, controlled flight on another planet: it rose, hovered for a few seconds and landed safely. The plan was at most five flights in 30 days. It ended up flying 72 times.') },
      { title: B('空中偵察員', 'The eye in the sky'), img: 'PIA24593',
        text: B('第二次飛行時，它拍下了第一張在空中拍攝的火星彩色照片。之後它變成毅力號的偵察員，從高處看地形，幫探測車找路。',
                'During its second flight it took the first color image of Mars captured from the air. It then became Perseverance’s scout, looking at the terrain from above to help the rover find a route.') },
      { title: B('最後一次飛行', 'The last flight'), img: 'PIA26243',
        text: B('2024 年 1 月 18 日，第 72 次飛行，機智號升到約 12 公尺高。降落時旋翼受損，從此再也飛不起來。1 月 25 日，NASA 宣布任務結束——它飛得遠超過大家的期待。',
                'On January 18, 2024, flight 72, Ingenuity climbed to about 12 meters. It damaged its rotor on landing and could never fly again. On January 25 NASA ended the mission. It had gone far beyond what anyone expected.') }
    ],
    hardware: [
      { icon: '🌀', name: B('旋翼', 'Rotors'), short: B('4 片碳纖維葉片，分成上下兩組', 'Four carbon-fiber blades in two rotors'),
        how: B('兩組旋翼反向旋轉，轉速約每分鐘 2,400 圈。轉得快，才能在稀薄的空氣中產生足夠的升力。', 'The two rotors spin in opposite directions at about 2,400 rpm. High speed is needed to make enough lift in thin air.'),
        why: B('升力＝旋翼把空氣往下推的結果。空氣少，就要推得更快。', 'Lift comes from pushing air down. With less air, you must push faster.') },
      { icon: '⚖️', name: B('輕巧的機身', 'A very light body'), short: B('整架只有 1.8 公斤', 'Only 1.8 kilograms in total'),
        how: B('機智號質量 1.8 公斤。越輕，需要的升力越小，越容易飛起來。', 'Ingenuity has a mass of 1.8 kg. The lighter it is, the less lift it needs.'),
        why: B('每一克都很重要：多帶一個東西，就要多一點升力。', 'Every gram matters: each extra item needs extra lift.') },
      { icon: '☀️', name: B('太陽能板', 'Solar panel'), short: B('在機頂，為電池充電', 'On top, charging the battery'),
        how: B('機頂的太陽能板為鋰離子電池充電，讓機智號在火星上自己補充能量（NASA：足夠每個火星日飛行一次、約 90 秒）。', 'The solar panel on top charges its lithium-ion batteries, so Ingenuity can recharge itself on Mars (NASA: enough energy for one 90-second flight per Martian day).'),
        why: B('離地球太遠，不能接電線——要自己發電。', 'Mars is too far for a power cord: it must make its own electricity.') },
      { icon: '📷', name: B('相機', 'Cameras'), short: B('黑白導航相機與彩色相機', 'A black-and-white navigation camera and a color camera'),
        how: B('黑白相機拍地面幫助導航；彩色相機拍下火星的樣子。首飛時它拍到了自己的影子。', 'A black-and-white camera views the ground to help navigate; a color camera shows Mars as it looks. On its first flight it caught its own shadow.'),
        why: B('機智號要自己判斷「我在哪、地面長什麼樣」，因為地球的指令要等很久才到。', 'Ingenuity has to judge where it is by itself, because commands from Earth take a long time to arrive.') },
      { icon: '🧵', name: B('萊特兄弟的布料', 'Wright brothers’ fabric'), short: B('1903 年飛機機翼上的材料', 'Material from the 1903 aircraft’s wing'),
        how: B('一小塊覆蓋在萊特兄弟「飛行者一號」機翼上的材料，隨機智號飛到火星。', 'A small piece of the material that covered the wing of the Wright brothers’ aircraft flew to Mars aboard Ingenuity.'),
        why: B('它連結了兩次「第一次飛行」，相隔一百多年。', 'It links two “first flights” more than a century apart.') }
    ],
    /* 3D 全息模型：NASA/JPL-Caltech 官方 glb；零件的 nodes 對應模型內的節點名稱 */
    model: {
      glb: 'ingenuity',
      credit: B('3D 模型：NASA/JPL-Caltech（Ingenuity Mars Helicopter, glTF）。材質為原模型；場景與拆解動畫為本作品加工。', '3D model: NASA/JPL-Caltech (Ingenuity Mars Helicopter, glTF). Textures are the original; scene and exploded view added by this project.'),
      parts: [
        { id: 'rotor', nodes: ['rotors_01', 'rotors_02'], explode: [0, 0.16, 0], spin: 9, focus: 0.75, view: [0.9, 0.5, 1.2],
          pin: { anchor: [-0.3, 0.0, 0.0] }, icon: '🌀', name: B('旋翼', 'Rotors'),
          structure: [
            B('4 片特製的碳纖維葉片，分成上下兩組旋翼。', 'Four specially made carbon-fiber blades, arranged into two rotors.'),
            B('兩組旋翼疊在同一根轉軸上，轉動方向相反。', 'The two rotors share one mast and spin in opposite directions.')
          ],
          func: [
            B('轉速約每分鐘 2,400 圈，比地球上的載客直升機快很多。', 'About 2,400 rpm, many times faster than a passenger helicopter on Earth.'),
            B('火星大氣比地球稀薄約 99%，旋翼必須又大又快，才推得動足夠的空氣來產生升力。', 'Mars’s atmosphere is about 99% less dense than Earth’s, so the rotors must be large and fast to push enough air down.'),
            B('兩組旋翼反向旋轉，扭力可以互相抵消（這是物理原理的說明，不是 NASA 的規格數字）。', 'Opposite spins let the twisting forces cancel out (a physics explanation, not an NASA spec).')
          ] },
        { id: 'solar', nodes: ['solar_panel'], explode: [0, 0.34, 0], focus: 0.7, view: [0.5, 0.9, 1.1],
          pin: { anchor: [0, 0.02, 0] }, icon: '☀️', name: B('太陽能板', 'Solar panel'),
          structure: [
            B('安裝在機身最上方，面向天空，才能接收最多陽光。', 'Mounted at the very top, facing the sky to catch the most sunlight.'),
            B('它發的電會存進機身裡的鋰離子電池。', 'The electricity it makes is stored in the lithium-ion battery inside the body.')
          ],
          func: [
            B('在火星上自己充電：離地球太遠，沒辦法接電線。', 'Charges Ingenuity by itself on Mars: Earth is too far for a power cord.'),
            B('NASA 把「自己用太陽能板充電」列為必須通過的里程碑之一。', 'NASA listed “autonomously charging itself with its solar panel” as a milestone to pass.'),
            B('火星的夜晚可低到約 −90 °C；電力要讓機智號自己保暖，度過寒冷的夜晚。', 'Martian nights can drop to about −90 °C (−130 °F); the stored power helps Ingenuity keep itself warm.')
          ] },
        { id: 'cams', nodes: ['cams'], explode: [0, -0.2, 0], focus: 0.55, view: [0.7, -0.75, 0.9],
          pin: { anchor: [0, -0.02, 0] }, icon: '📷', name: B('相機', 'Cameras'),
          structure: [
            B('一台黑白導航相機：拍地面，幫忙導航。', 'A black-and-white navigation camera that views the ground to help it navigate.'),
            B('一台彩色相機：拍下火星的樣子。', 'A color camera that shows Mars as it is.')
          ],
          func: [
            B('地球和火星之間的通訊有延遲，操作員不能用搖桿即時控制，所以機智號要靠相機自己判斷「我在哪、地面長什麼樣」。', 'Radio delays mean nobody can fly it with a joystick, so Ingenuity uses its cameras to judge where it is.'),
            B('首飛時，它拍到了自己的影子；第二次飛行拍下了第一張在空中拍攝的火星彩色照片。', 'On its first flight it caught its own shadow; on flight two it took the first color image of Mars from the air.')
          ] },
        { id: 'fabric', marker: { host: 'solar', dx: 0.16, dy: -0.04 }, explode: [0, 0.1, 0], focus: 0.7, view: [0.7, 0.2, 1.2],
          pin: { anchor: [0, 0, 0] }, icon: '🧵', name: B('萊特兄弟的布料', 'Wright brothers’ fabric'),
          note: B('米色小片只是示意位置；官方模型裡沒有這塊布料。', 'The cream-colored patch is only a symbolic marker; the official model does not include the fabric.'),
          structure: [
            B('一小塊覆蓋在 1903 年萊特兄弟「飛行者一號」機翼上的材料。', 'A small piece of the material that covered the wing of the Wright brothers’ 1903 aircraft.'),
            B('體積很小，不是機智號飛行需要的零件。', 'It is tiny and is not something Ingenuity needs in order to fly.')
          ],
          func: [
            B('它的任務是紀念：連結兩次「第一次飛行」，一次在地球（1903），一次在火星（2021）。', 'Its job is to commemorate: it links two “first flights”, one on Earth (1903) and one on Mars (2021).'),
            B('提醒我們：每一次大突破，都踩在前人的肩膀上。', 'A reminder that every breakthrough stands on someone else’s shoulders.')
          ] },
        { id: 'legs', nodes: ['leg_01', 'leg_02', 'leg_03', 'leg_04'], explode: [0, -0.14, 0], quiet: true },
        { id: 'mast', nodes: ['parts_01', 'parts_02'], explode: [0, 0.06, 0], quiet: true }
      ]
    },
    challenges: {
      1: { type: 'slider', title: B('讓機智號飛起來', 'Get Ingenuity airborne'),
        scenario: B('火星的空氣很稀薄！拖動滑桿調整旋翼轉速，讓機智號剛好浮在半空中。', 'Mars air is very thin! Drag the slider to set the rotor speed so Ingenuity hovers in mid-air.'),
        planets: [marsPlanet], min: 0, max: 3200, step: 50, start: 0,
        success: B('你成功了！火星空氣稀薄，所以旋翼必須轉得很快——這就是工程師的解法。', 'You did it! Mars air is thin, so the rotors must spin very fast. That is the engineers’ solution.') },
      2: { type: 'slider', title: B('地球 vs 火星', 'Earth vs Mars'),
        scenario: B('同一架直升機，要在兩個星球上都懸停。切換星球，找出每個地方需要的轉速。', 'Same helicopter, two planets. Switch planets and find the rotor speed that hovers on each.'),
        planets: [earthPlanet, marsPlanet], min: 0, max: 3200, step: 50, start: 0,
        note: B('遊戲設定：地球的懸停轉速 300 rpm 是由「火星轉速約為地球 8 倍」反推（2,400 ÷ 8），為簡化數字。', 'Game setting: the 300 rpm on Earth comes from “Mars needs about 8 times more” (2,400 ÷ 8), simplified.'),
        success: B('空氣越稀薄，轉速要越高。你找到了兩個星球的答案！', 'The thinner the air, the faster you must spin. You solved both planets!') },
      3: { type: 'find3d', title: B('哪個零件負責？', 'Which part does the job?'),
        scenario: B('任務控制室遇到幾個狀況。轉一轉3D 模型，點選你認為負責的零件！', 'Mission control faces some situations. Rotate the model and tap the part you think is responsible!'),
        questions: [
          { q: B('火星的夜晚冷到約 −90 °C。機智號要自己保暖、撐過黑夜，它的電是從哪個零件來的？', 'Martian nights drop to about −90 °C. Ingenuity must keep itself warm through the dark. Which part supplies its electricity?'),
            answer: 'solar', explain: B('太陽能板白天發電、存進電池，夜裡這些電就用來保暖。', 'The solar panel makes power by day and stores it; at night that power keeps Ingenuity warm.') },
          { q: B('地球的指令要等很久才送到。機智號降落前，要靠哪個零件自己「看」地面，判斷安不安全？', 'Commands from Earth take a long time to arrive. Which part lets Ingenuity “look” at the ground and judge by itself?'),
            answer: 'cams', explain: B('導航相機拍地面，讓機智號自己判斷位置與地形。', 'The navigation camera views the ground so it can judge its position and terrain.') },
          { q: B('火星的空氣只有地球的百分之一左右。哪個零件必須又大又快地轉，才推得動足夠的空氣？', 'Mars’s air is about 1% as dense as Earth’s. Which part must be large and fast to push enough air?'),
            answer: 'rotor', explain: B('旋翼轉到約每分鐘 2,400 圈，才能在稀薄的空氣中產生升力。', 'The rotors spin at about 2,400 rpm to make lift in the thin air.') },
          { q: B('哪個零件連結了兩次相隔一百多年的「第一次飛行」？', 'Which part links two “first flights” more than a century apart?'),
            answer: 'fabric', explain: B('那一小塊萊特兄弟飛機的布料，從 1903 年的地球，飛到 2021 年的火星。', 'A small piece of the Wright brothers’ fabric travelled from Earth in 1903 to Mars in 2021.') }
        ],
        success: B('你認識了機智號的主要零件，每一個都有自己的任務！', 'You know Ingenuity’s main parts now, and each has its own job!') },
      4: { type: 'find3d', title: B('故障診斷', 'Fault diagnosis'),
        scenario: B('你是飛行任務主管，要從症狀判斷是哪個零件出了問題或遇到困難。先轉動3D 模型想一想，再點選零件。', 'You are the flight director. Judge from the symptoms which part is in trouble. Rotate the model, think, then tap a part.'),
        questions: [
          { q: B('症狀：旋翼轉得很正常，但是電力一天比一天少，電池愈來愈難充滿。你最先檢查哪個零件？', 'Symptom: the rotors spin fine, but power gets lower every day and the battery struggles to charge. Which part do you check first?'),
            answer: 'solar', explain: B('電是從太陽能板來的。如果它被灰塵蓋住或被擋住，就接收不到足夠的陽光。', 'Electricity comes from the solar panel. If dust covers it or something blocks it, it cannot catch enough sunlight.') },
          { q: B('症狀：第 72 次飛行降落後，機智號再也飛不起來。NASA 的影像顯示哪個零件受損？', 'Symptom: after the landing of flight 72, Ingenuity could never fly again. Which part did NASA’s images show was damaged?'),
            answer: 'rotor', explain: B('降落時旋翼受損，沒有完整的旋翼就產生不了足夠的升力。', 'A rotor was damaged on landing; without intact rotors there is not enough lift.') },
          { q: B('症狀：機智號要靠看地面的特徵來判斷自己的位置。如果下方是一大片沒有特徵的平滑沙地，哪個零件的工作會變得最困難？', 'Symptom: Ingenuity works out its position by looking at ground features. Over a huge, featureless smooth sand plain, which part has the hardest job?'),
            answer: 'cams', explain: B('導航相機要靠地面的特徵來「認路」；地面太單調，它就比較難判斷位置和移動。', 'The navigation camera needs features on the ground to find its way; a very plain surface makes position and motion harder to judge.') }
        ],
        success: B('你像真正的飛行主管一樣，從症狀找到了零件！', 'Like a real flight director, you traced symptoms to parts!') }
    },
    science: [
      { icon: '✈️', t: B('證明在另一個星球上可以進行動力、可控的飛行（2021/4/19）。', 'Proved that powered, controlled flight is possible on another planet (Apr 19, 2021).') },
      { icon: '📸', t: B('拍下第一張在空中拍攝的火星彩色照片，並成為毅力號的空中偵察員。', 'Took the first color image of Mars from the air and became Perseverance’s aerial scout.') },
      { icon: '🔢', t: B('原本只計畫最多 5 次飛行，實際完成 72 次，累計空中時間超過 2 小時。', 'Planned for at most five flights, it flew 72 times, with more than two hours in the air.') },
      { icon: '🔭', t: B('讓科學家看到：未來也許可以用飛行器探索地面車輛到不了的地方。', 'Showed that future aircraft might explore places rovers cannot reach.') }
    ],
    ending: B('機智號最後一次降落時損壞了旋翼。它留在火星上一個叫「Valinor Hills」的地方，仍能與地球通訊，卻無法再飛。它的故事提醒我們：工程師為「最多 5 次」而設計，它卻用 72 次飛行讓我們學到了更多。',
              'Ingenuity damaged a rotor on its final landing. It stays on Mars at a spot nicknamed “Valinor Hills”, still able to talk to Earth but unable to fly. Engineers designed it for “at most five” flights; it flew 72 and taught us far more.'),
    endImg: 'PIA24542',
    sources: [
      { label: 'NASA Science: Ingenuity Mars Helicopter', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/', note: B('質量 1.8 公斤、火星空氣密度', 'Mass 1.8 kg; Mars air density') },
      { label: 'NASA: 6 Things to Know About Ingenuity', url: 'https://www.nasa.gov/solar-system/6-things-to-know-about-nasas-ingenuity-mars-helicopter/', note: B('旋翼 2,400 rpm、約為地球直升機 8 倍', 'Rotors ~2,400 rpm, ~8× a standard helicopter') },
      { label: 'NASA Science: Farewell to our flying friend', url: 'https://science.nasa.gov/blogs/farewell-to-our-flying-friend-and-closing-in-on-the-crater-rim', note: B('最後一次飛行與任務結束', 'Final flight and end of mission') },
      { label: 'NASA Mars Fact Sheet (NSSDCA)', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html', note: B('重力 3.73 m/s²（約地球 0.380 倍）、表面氣壓', 'Surface gravity 3.73 m/s² (0.380 of Earth), surface pressure') },
      { label: 'NASA 3D Resources: Ingenuity Mars Helicopter (glb)', url: 'https://science.nasa.gov/3d-resources/ingenuity-mars-helicopter/', note: B('3D 模型使用的官方模型（NASA/JPL-Caltech）', 'Official model used for the 3D model (NASA/JPL-Caltech)') },
      { label: 'NASA Image Library: PIA24434', url: 'https://images.nasa.gov/details/PIA24434', note: B('萊特兄弟布料隨機智號飛往火星', 'Wright fabric flown aboard Ingenuity') },
      { label: 'NASA Image Library: PIA24593', url: 'https://images.nasa.gov/details/PIA24593', note: B('首張空中拍攝的火星彩色照片', 'First color image of Mars from the air') }
    ]
  });
})();
