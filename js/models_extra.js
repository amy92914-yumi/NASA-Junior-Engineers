/* 其餘 4 個任務的 3D 模型資料與「找零件」互動題（不用計算）。
   structure／func 的事實都沿用各任務「認識硬體」卡片與已核對的資料；模型來源見 credit。 */
(function () {
  'use strict';
  var B = window.B;

  function find(id, title, scenario, questions, success) {
    return { type: 'find3d', title: title, scenario: scenario, questions: questions, success: success };
  }
  function Q(q, answer, explain) { return { q: q, answer: answer, explain: explain }; }

  var X = {};

  /* ================= 機會號（NASA 官方模型，簡化版） ================= */
  X.opportunity = {
    model: {
      glb: 'opportunity', scene: 'mars',
      credit: B('3D 模型：NASA/Ames Research Center（Mars Exploration Rover – Opportunity (MER-B), glTF）。這是簡化模型，細節不多；零件分組、材質與拆解動畫為本作品加工。',
                '3D model: NASA/Ames Research Center (Mars Exploration Rover – Opportunity (MER-B), glTF). A simplified model with limited detail; part grouping, materials and exploded view added by this project.'),
      parts: [
        { id: 'solar', nodes: ['solar'], explode: { up: 0.35 }, focus: 0.75, view: [0.5, 0.9, 1.0], pin: { anchor: [0, 0.03, 0] }, icon: '☀️', name: B('太陽能板', 'Solar panels'),
          structure: [B('平坦的大面板，蓋在車身頂部，面向天空。', 'Flat panels spread across the top of the body, facing the sky.'), B('這是機會號唯一的發電來源。', 'They are Opportunity’s only source of power.')],
          func: [B('白天靠陽光發電，電能用來開車、做實驗、保暖；多餘的電存進電池，晚上與陽光不足時使用。', 'By day sunlight makes power for driving, experiments and heating; the extra is stored in a battery for the night.'),
                 B('沙塵會遮住陽光，所以沙塵暴對它特別危險。', 'Dust blocks sunlight, so a dust storm is especially dangerous for it.')] },
        { id: 'camera', nodes: ['camera'], explode: { up: 0.55 }, focus: 0.55, view: [0.9, 0.3, 1.1], pin: { anchor: [0, 0.01, 0] }, icon: '📷', name: B('桅杆相機', 'Mast cameras'),
          structure: [B('車身上立著一根桅杆（NASA 稱為全景桅杆），上面有全景相機、導航相機，還有一台迷你熱發射光譜儀。', 'A mast (NASA calls it the Panoramic Mast Assembly) rises from the body, carrying panoramic cameras, navigation cameras and a miniature thermal emission spectrometer.'), B('機會號一共傳回超過 217,000 張影像。', 'Opportunity sent back more than 217,000 images.')],
          func: [B('相機是地球上的人的「眼睛」：看得見，才知道往哪裡開、哪裡值得研究。', 'The cameras are the eyes of the people on Earth: you must see to know where to drive and what is worth studying.'),
                 B('包含 15 張 360 度的彩色全景。', 'These include 15 color 360-degree panoramas.')] },
        { id: 'arm', nodes: ['arm'], explode: { out: 0.5 }, focus: 0.7, view: [-0.9, 0.4, 0.9], pin: { anchor: [0, 0, 0] }, icon: '🔬', name: B('機械手臂與工具', 'Robotic arm and tools'),
          structure: [B('車身前方伸出一支機械手臂，前端裝著小工具。', 'A robotic arm reaches out from the front, with small tools at its tip.'), B('NASA 稱它為「儀器部署裝置」：把穆斯堡爾光譜儀、阿爾法粒子 X 射線光譜儀、磁鐵、顯微影像儀與岩石研磨工具，直接貼在土壤或岩石上使用。', 'NASA calls it the Instrument Deployment Device: it places the Mössbauer spectrometer, the alpha particle X-ray spectrometer, magnets, the microscopic imager and the rock abrasion tool directly against soil or rock.')],
          func: [B('光譜儀與顯微影像儀像地質學家的放大鏡，檢查岩石裡有什麼礦物、找出水留下的痕跡（赤鐵礦就是這樣被找到的）。', 'Like a geologist’s magnifier, they check which minerals are in a rock and find traces left by water (hematite was found this way).'),
                 B('研磨器磨開 52 塊岩石的表面，並刷乾淨另外 72 個目標，才能看到新鮮的礦物。', 'The grinder opened the surface of 52 rocks and the brush cleaned 72 more targets, to reveal fresh minerals.')] },
        { id: 'wheels', nodes: ['wheels'], explode: [0, -0.28, 0], focus: 0.9, view: [0.8, 0.35, 1.0], pin: { anchor: [0.12, -0.02, 0.1] }, icon: '🛞', name: B('車輪與懸吊', 'Wheels and suspension'),
          structure: [B('六個輪子，用連桿連在車身兩側。', 'Six wheels attached to the body by linkages on both sides.'), B('前輪可以轉向。', 'The front wheels can steer.')],
          func: [B('機會號重 174 公斤，曾爬上 32 度斜坡（離開地球的紀錄），2005 年 3 月 20 日一天行駛 220 公尺。', 'Opportunity weighs 174 kg, climbed a 32-degree slope (an off-Earth record), and drove 220 m in a single day on March 20, 2005.'),
                 B('2005 年與 2017 年，各有一個前輪失去轉向，地球上的團隊想出辦法讓它繼續走。', 'In 2005 and 2017 a front wheel lost steering; the team on Earth found ways to keep it going.')] },
        { id: 'antenna', nodes: ['antenna'], explode: { up: 0.25, out: 0.2 }, quiet: true },
        { id: 'body', nodes: ['body'], quiet: true }
      ]
    },
    challenges: {
      3: find(3, B('哪個零件負責？', 'Which part does the job?'),
        B('任務控制室遇到幾個狀況。轉一轉 3D 模型，點選你認為負責的零件！', 'Mission control faces some situations. Rotate the 3D model and tap the part you think is responsible!'),
        [Q(B('一場沙塵暴遮住了太陽，機會號的電越來越少。它的電是從哪個零件來的？', 'A dust storm blocks the Sun and Opportunity’s power keeps dropping. Which part makes its electricity?'), 'solar', B('太陽能板是它唯一的發電來源；沙塵一遮住陽光，就發不了多少電。', 'The solar panels are its only power source; once dust blocks the sunlight they make little electricity.')),
         Q(B('地球上的人想看看前方的地形，決定往哪裡開。要靠哪個零件？', 'People on Earth want to see the terrain ahead and decide where to drive. Which part helps?'), 'camera', B('桅杆頂端的相機是地球上的人的「眼睛」。', 'The cameras on top of the mast are the eyes of the people on Earth.')),
         Q(B('科學家想檢查岩石裡有什麼礦物，找出水留下的痕跡。這些儀器裝在哪個零件上？', 'Scientists want to check which minerals are in a rock to find traces of water. Which part carries these instruments?'), 'arm', B('機械手臂前端的光譜儀與顯微影像儀，像地質學家的放大鏡。', 'The spectrometers and microscopic imager on the arm work like a geologist’s magnifier.')),
         Q(B('2005 年與 2017 年，各有一個前輪失去轉向。是哪個零件出了問題？', 'In 2005 and 2017 a front wheel lost steering. Which part was in trouble?'), 'wheels', B('是車輪。團隊想出辦法，讓它繼續前進了很多年。', 'The wheels. The team found ways to keep it moving for many more years.'))],
        B('你認識了機會號的主要零件，每一個都有自己的任務！', 'You know Opportunity’s main parts now, and each has its own job!')),
      4: find(4, B('故障診斷', 'Fault diagnosis'),
        B('你是飛行任務主管，要從症狀判斷哪個零件出了問題。先轉動 3D 模型想一想，再點選零件。', 'You are the flight director. Judge from the symptoms which part is in trouble. Rotate the model, think, then tap a part.'),
        [Q(B('症狀：發電量一天比一天少，電池愈來愈難充滿，但車輪和相機都正常。你最先檢查哪個零件？', 'Symptom: power drops day by day and the battery can barely charge, yet the wheels and cameras are fine. Which part do you check first?'), 'solar', B('電是從太陽能板來的。如果灰塵蓋住或擋住它，就接收不到足夠的陽光。', 'Electricity comes from the solar panels. If dust covers them they cannot catch enough sunlight.')),
         Q(B('症狀：回傳的照片一片漆黑，地球上的人看不到前方。要先檢查哪個零件？', 'Symptom: the pictures come back pitch black and nobody on Earth can see ahead. Which part do you check first?'), 'camera', B('相機負責拍下周圍的樣子，沒有影像就沒辦法安全地開車。', 'The cameras capture the surroundings; without images it is unsafe to drive.')),
         Q(B('症狀：岩石表面蓋著一層灰塵，儀器看不到新鮮的礦物。需要用哪個零件上的研磨器和刷子？', 'Symptom: a layer of dust covers the rock and the instruments cannot see fresh minerals. Which part holds the grinder and brush?'), 'arm', B('機械手臂前端的研磨器和刷子，可以磨開、刷乾淨表面，露出新鮮的礦物。', 'The grinder and brush on the arm can open and clean the surface to reveal fresh minerals.'))],
        B('你像真正的飛行主管一樣，從症狀找到了零件！', 'Like a real flight director, you traced symptoms to parts!'))
    }
  };

  /* ================= 航海家1號（NASA 官方模型） ================= */
  X.voyager = {
    model: {
      glb: 'voyager', scene: 'space',
      credit: B('3D 模型：NASA/Michael D. Carbajal（Voyager Probe (B), glTF）。零件分組、材質與拆解動畫為本作品加工；細節未必與實機完全相同。', '3D model: NASA/Michael D. Carbajal (Voyager Probe (B), glTF). Part grouping, materials and exploded view added by this project; details may differ from the real spacecraft.'),
      parts: [
        { id: 'rtg', nodes: ['rtg'], explode: { out: 0.28 }, focus: 0.3, view: [0.5, 0.4, 1.0], pin: { anchor: [0, 0.01, 0] }, icon: '🔋', name: B('核能電池', 'Radioisotope power source'),
          structure: [B('本體旁一根短桿的末端，裝著一組圓柱狀的核能電池。', 'A cylindrical power unit sits at the end of a short boom beside the body.'), B('NASA：每艘航海家號有 3 組放射性同位素熱電發生器（RTG）。', 'NASA: each Voyager has three radioisotope thermoelectric generators (RTGs).')],
          func: [B('離太陽太遠，太陽能板用不上。RTG 把鈈-238 衰變產生的熱轉成電。', 'Too far from the Sun for solar panels. RTGs turn heat from plutonium-238 decay into electricity.'),
                 B('衰變慢慢減弱，所以每年少約 4 瓦。這個數字決定了：每一年都要關掉更多東西。', 'The decay slowly weakens, so power drops by about 4 watts a year. That is why more has to be switched off every year.')] },
        { id: 'dish', nodes: ['dish'], explode: { up: 0.16 }, focus: 0.3, view: [0.7, 0.5, 1.0], pin: { anchor: [0, 0.02, 0] }, icon: '📡', name: B('大型碟形天線', 'Big dish antenna'),
          structure: [B('白色的圓盤形天線，在探測器本體的上方。', 'A white dish sits above the body of the spacecraft.'), B('盤面必須對準地球。', 'The dish must point at Earth.')],
          func: [B('與地球通訊的唯一管道：把資料傳回地球。', 'The only channel to Earth: it sends the data home.'),
                 B('因為距離太遠，訊號非常微弱，地球要用大型天線才聽得到；天線若沒對準地球，就會失聯。', 'The signal is extremely faint, so Earth needs huge antennas to hear it; if the dish drifts off target, contact is lost.')] },
        { id: 'boom', nodes: ['boom'], explode: { out: 0.1, up: 0.12 }, focus: 0.55, view: [0.9, 0.5, 0.8], pin: { anchor: [0, 0, 0] }, icon: '🧲', name: B('磁場計吊桿', 'Magnetometer boom'),
          structure: [B('一根很長的桁架吊桿，從本體伸出去。', 'A very long lattice boom reaches out from the body.'), B('NASA：磁場計裝在一根 13 公尺長的玻璃纖維吊桿上，離探測器上的干擾遠一點。', 'NASA: the magnetometers ride on a 13-meter fiberglass boom, away from on-board interference.')],
          func: [B('測量探測器周圍的磁場，幫助科學家了解星際空間的環境。', 'It measures the magnetic field around the spacecraft, helping scientists understand interstellar space.'),
                 B('現在只剩 2 個科學儀器還在工作：電漿波與磁場。NASA 優先保留它們。', 'Only two science instruments still run: plasma waves and magnetic fields. NASA keeps them as a priority.')] },
        { id: 'pws', nodes: ['pws'], explode: { out: 0.2 }, focus: 0.45, view: [0.6, 0.3, 1.0], pin: { anchor: [0.1, -0.06, 0] }, icon: '🔊', name: B('電漿波天線', 'Plasma wave antennas'),
          structure: [B('一對約 10 公尺長的鞭狀天線，從本體向外伸出（模型為簡化版）。', 'A pair of whip antennas about 10 meters long reach out from the body (simplified in the model).'), B('NASA：它們由「行星無線電天文儀」與電漿波儀共用；電漿波儀用它們接收電漿的振動訊號。', 'NASA: the planetary radio astronomy instrument and the plasma wave instrument share them; the plasma wave instrument uses them to pick up vibrations of the plasma.')],
          func: [B('偵測星際空間裡帶電氣體（電漿）的振動，科學家可以把它轉換成聲音來「聽」。', 'It detects vibrations of the charged gas (plasma) in interstellar space; scientists can turn them into sound to “listen”.'),
                 B('這是人類第一次直接「聽」到星際空間。', 'It was the first time humans directly “heard” interstellar space.')] },
        { id: 'platform', nodes: ['platform'], explode: { out: 0.22 }, quiet: true },
        { id: 'bus', nodes: ['bus', 'misc'], quiet: true }
      ]
    },
    challenges: {
      2: find(2, B('哪個零件負責？', 'Which part does the job?'),
        B('任務控制室遇到幾個狀況。轉一轉 3D 模型，點選你認為負責的零件！', 'Mission control faces some situations. Rotate the 3D model and tap the part you think is responsible!'),
        [Q(B('航海家1號離太陽太遠，太陽能板用不上。它的電是從哪個零件來的？', 'Voyager 1 is too far from the Sun for solar panels. Which part makes its electricity?'), 'rtg', B('核能電池（RTG）用鈈-238 衰變的熱來發電。', 'The RTGs make electricity from the heat of plutonium-238 decay.')),
         Q(B('要把資料傳回地球，並且一定要對準地球，要靠哪個零件？', 'To send data home it must always point at Earth. Which part is that?'), 'dish', B('白色的大型碟形天線是它和地球通訊的唯一管道。', 'The big white dish is its only channel to Earth.')),
         Q(B('想量探測器周圍的磁場，磁場計裝在哪個零件上？', 'To measure the magnetic field around the spacecraft, which part carries the magnetometer?'), 'boom', B('磁場計裝在長長的吊桿上，離探測器本體的電子零件遠一點。', 'The magnetometer sits on the long boom, away from the spacecraft’s own electronics.')),
         Q(B('想「聽」星際空間裡電漿的振動，要靠哪個零件？', 'To “listen” to the vibrations of plasma in interstellar space, which part helps?'), 'pws', B('電漿波儀的天線接收電漿的振動，科學家再把它轉成聲音。', 'The plasma wave antennas pick up the vibrations, which scientists turn into sound.'))],
        B('你認識了航海家1號的主要零件！', 'You know Voyager 1’s main parts now!'))
      ,
      4: find(4, B('從症狀找零件', 'From symptom to part'),
        B('你是任務工程師，要從狀況判斷是哪個零件在「說話」。轉動 3D 模型，想一想，再點選。', 'You are the mission engineer. Work out which part is behind each situation. Rotate the model, think, then tap.'),
        [Q(B('狀況：探測器的電每年少約 4 瓦，工程師只好一個一個關掉科學儀器。這些電力衰減是哪個零件造成的？', 'Situation: power falls by about 4 watts a year, so engineers switch off instruments one by one. Which part is behind the fading power?'), 'rtg', B('核能電池靠放射性物質衰變發電，衰變越來越弱，電力就越來越少。', 'The RTGs run on radioactive decay; as the decay weakens, so does the power.')),
         Q(B('狀況：訊號單程要走快 1 光日。如果某個零件沒有對準地球，地球就會完全聽不到。是哪個零件？', 'Situation: a signal takes nearly a light-day one way. If one part is not pointed at Earth, Earth hears nothing. Which part?'), 'dish', B('碟形天線必須對準地球，否則就會失聯。', 'The dish must stay pointed at Earth, or contact is lost.')),
         Q(B('狀況：NASA 決定「優先保留」磁場計與電漿波儀。磁場計要伸得很長，是裝在哪個零件上？', 'Situation: NASA decides to keep the magnetometer and plasma wave instrument as a priority. On which part does the magnetometer ride?'), 'boom', B('磁場計裝在很長的吊桿上。', 'The magnetometer rides on the very long boom.'))],
        B('你像真正的任務工程師一樣，從狀況找到了零件！', 'Like a real mission engineer, you traced situations to parts!'))
    }
  };

  /* ================= 火星氣候軌道器（自製簡化模型） ================= */
  X.mco = {
    model: {
      build: window.BUILD && window.BUILD.mco, glb: 'mco', scene: 'space',
      credit: B('自製簡化模型：NASA 3D 資源庫沒有氣候軌道器的官方模型。這是依公開的任務描述，用基本形狀搭出的示意，外觀與尺寸不精確。',
                'Simplified model made for this project: NASA’s 3D library has no official model of the Climate Orbiter. It is a sketch built from basic shapes following public descriptions; its look and sizes are not exact.'),
      parts: [
        { id: 'camera', nodes: ['camera'], explode: { out: 0.45 }, focus: 0.5, view: [-1.0, 0.2, 0.9], pin: { anchor: [0, 0, 0] }, icon: '📷', name: B('MARCI 相機', 'MARCI camera'),
          structure: [B('「氣候軌道器彩色成像儀」（MARCI）的簡稱，是一台彩色相機。', 'Short for the Mars Color Imager (MARCI), a color camera.'), B('靠近火星時，它拍下了火星的小小影像。', 'On approach it took a small image of Mars.')],
          func: [B('設計用來每天拍攝火星的天氣，例如雲和沙塵。', 'It was designed to image Mars’s weather, such as clouds and dust, every day.'), B('氣候要靠長期觀察，所以需要每天拍。', 'Climate needs long-term observation, hence the daily pictures.')] },
        { id: 'engine', nodes: ['engine'], explode: [0, -0.32, 0], focus: 0.55, view: [0.7, -0.5, 1.0], pin: { anchor: [0, -0.02, 0] }, icon: '🔥', name: B('主引擎', 'Main engine'),
          structure: [B('一個大型噴嘴，用來產生較大的推力。', 'A large nozzle that gives a big push.')],
          func: [B('到達火星時要點火減速，才能被火星的重力抓住，成為火星的衛星。', 'On arrival it fires to slow down so Mars’s gravity can capture it as a satellite.'), B('飛得太低就會碰到大氣層——這就是它最後發生的事。', 'Fly too low and it meets the atmosphere: exactly what happened in the end.')] },
        { id: 'thrusters', nodes: ['thrusters'], explode: { out: 0.32 }, focus: 0.6, view: [0.9, -0.3, 1.0], pin: { anchor: [0.15, 0.05, 0.15] }, icon: '🧭', name: B('小型推進器', 'Small thrusters'),
          structure: [B('多個小噴嘴，分散在探測器各處。', 'Several small nozzles spread around the spacecraft.'), B('每次只噴出很小的力。', 'Each puff is very small.')],
          func: [B('太空船內部的反作用飛輪會逐漸累積轉動，小推進器定期噴氣，把累積的轉動釋放掉（稱為 AMD）。', 'Reaction wheels inside slowly build up spin; the small thrusters fire regularly to release it (called AMD).'),
                 B('每次推多少，就是那份「推力脈衝」資料——它的單位寫錯了，軌道預測就被「推」偏了。', 'How much each push gave is the “impulse” data: its unit was wrong, and the orbit prediction was “pushed” off.')] },
        { id: 'antenna', nodes: ['antenna'], explode: { up: 0.3 }, focus: 0.55, view: [0.7, 0.7, 1.0], pin: { anchor: [0, 0.03, 0] }, icon: '📡', name: B('天線與無線電', 'Antenna and radio'),
          structure: [B('一個碟形天線，朝向地球。', 'A dish antenna pointing at Earth.'), B('無線電設備在探測器內部（模型沒有畫出）。', 'The radio equipment sits inside the spacecraft (not drawn in this model).')],
          func: [B('探測器靠無線電把資料傳回地球。', 'The probe sends its data home by radio.'), B('進入火星背面時，訊號會被火星擋住——那是預測會「暫時」消失的時刻。這次訊號比預測早了 49 秒消失，是第一個警訊。', 'When it passed behind Mars the signal was blocked, a predicted “temporary” loss. This time it vanished 49 seconds early: the first warning.')] },
        { id: 'solar', nodes: ['solar'], explode: { out: 0.5 }, quiet: true },
        { id: 'bus', nodes: ['bus'], quiet: true }
      ]
    },
    challenges: {
      2: find(2, B('哪個零件負責？', 'Which part does the job?'),
        B('任務控制室遇到幾個狀況。轉一轉 3D 模型，點選你認為負責的零件！', 'Mission control faces some situations. Rotate the 3D model and tap the part you think is responsible!'),
        [Q(B('到達火星時，探測器要點火減速，讓火星的重力抓住它。靠哪個零件？', 'On arrival the probe must fire to slow down so Mars’s gravity can capture it. Which part?'), 'engine', B('主引擎點火減速，探測器才能成為火星的衛星。', 'The main engine slows it so it can become a satellite of Mars.')),
         Q(B('想每天拍下火星的雲和沙塵，觀察天氣。要靠哪個零件？', 'To photograph Mars’s clouds and dust every day and watch its weather, which part?'), 'camera', B('MARCI 相機設計用來每天拍攝火星的天氣。', 'The MARCI camera was designed to image Mars’s weather daily.')),
         Q(B('太空船內部會累積轉動，需要定期噴氣把它釋放掉。靠哪個零件？', 'Spin builds up inside the spacecraft and must be released with regular puffs. Which part?'), 'thrusters', B('小型推進器定期噴氣，把累積的轉動釋放掉（AMD）。', 'The small thrusters puff regularly to release the spin (AMD).')),
         Q(B('探測器要用無線電把資料傳回地球。它透過哪個零件把訊號送出去？', 'The probe sends data to Earth by radio. Which part sends the signal out?'), 'antenna', B('天線朝向地球，把訊號傳出去。', 'The antenna points at Earth and sends the signal.'))],
        B('你認識了氣候軌道器的主要零件！', 'You know the Climate Orbiter’s main parts now!')),
      3: find(3, B('從事故找零件', 'From the accident to the parts'),
        B('這是一次真實的失敗。調查人員要從事故線索找出相關的零件。轉動 3D 模型，想一想，再點選。', 'This was a real failure. Investigators follow clues to the parts involved. Rotate the model, think, then tap.'),
        [Q(B('線索：地面軟體算出的「推力脈衝」資料，單位是「磅力·秒」，導航軟體卻當成「牛頓·秒」。這份資料記錄的是哪個零件的動作？', 'Clue: the ground software’s “impulse” data was in pound-force seconds, but the navigation software treated it as newton-seconds. Which part’s actions does this data record?'), 'thrusters', B('「推力脈衝」就是小型推進器每次推了多少。單位錯了，軌道預測就被推偏了。', 'The “impulse” is how much each small-thruster push gave. With the unit wrong, the orbit prediction drifted.')),
         Q(B('線索：進入火星背面時，探測器要靠一個零件減速、進入軌道。如果軌道算錯、飛得太低，就會出大問題。是哪個零件？', 'Clue: to enter orbit the probe must slow down with one part. If the orbit is miscalculated and it flies too low, there is big trouble. Which part?'), 'engine', B('主引擎負責點火減速、進入軌道；飛得太低就會碰到大氣層。', 'The main engine slows the probe into orbit; fly too low and it meets the atmosphere.')),
         Q(B('線索：訊號比預測早 49 秒消失，這是第一個警訊。這個訊號是從哪個零件送出的？', 'Clue: the signal vanished 49 seconds early, the first warning. Which part sent that signal?'), 'antenna', B('訊號透過天線與無線電傳回地球；它早 49 秒被火星擋住，表示探測器飛得比預測更低。', 'The signal travels through the antenna and radio; being cut 49 seconds early means the probe flew lower than predicted.'))],
        B('你像調查人員一樣，從線索找到了零件！', 'Like an investigator, you traced clues to parts!'))
    }
  };

  /* ================= 金唱片（自製簡化模型） ================= */
  X.record = {
    model: {
      build: window.BUILD && window.BUILD.record, glb: 'record', scene: 'space', home: 1.9,
      credit: B('自製簡化模型：NASA 3D 資源庫沒有金唱片的官方模型。這是依公開描述用基本形狀搭出的示意；模型上的符號圖案只是示意，不是真實的唱片封套圖案。',
                'Simplified model made for this project: NASA’s 3D library has no official Golden Record model. It is a sketch from basic shapes; the symbols on it are only illustrative, not the real jacket diagram.'),
      parts: [
        { id: 'disc', nodes: ['disc'], explode: [0, 0.6, 0], focus: 1.0, view: [0.6, 0.9, 1.0], pin: { anchor: [-0.27, 0.03, 0.12] }, icon: '💿', name: B('鍍金唱片', 'Gold-plated record'),
          structure: [B('一張 12 吋的鍍金唱片，表面刻著螺旋的溝槽。', 'A 12-inch gold-plated record with spiral grooves.'), B('和黑膠唱片原理相同。', 'It works on the same principle as a vinyl record.')],
          func: [B('唱針沿著溝槽走，就能重新播放出聲音與圖像的訊號。', 'A needle following the grooves replays the sound and image signals.'),
                 B('溝槽裡有 115 張圖像（用類比方式編碼）、約 90 分鐘的音樂、地球的聲音，以及 55 種語言的問候。', 'The grooves hold 115 images (encoded in analog form), about 90 minutes of music, sounds of Earth and greetings in 55 languages.'),
                 B('以每分鐘 16⅔ 轉播放，比一般黑膠慢，才能放進更長的內容。', 'It plays at 16⅔ rpm, slower than ordinary vinyl, so more content fits.')] },
        { id: 'jacket', nodes: ['jacket'], explode: [0, -0.22, 0], focus: 1.0, view: [0.3, 1.0, 0.7], pin: { anchor: [-0.3, 0.02, -0.3] }, icon: '🧰', name: B('保護套與說明圖', 'Jacket and instructions'),
          structure: [B('每張唱片裝在鋁製保護套裡。', 'Each record sits in an aluminum protective jacket.'), B('套上用符號語言說明飛行器的來源與播放方法（模型上的圖案只是示意）。', 'The jacket carries a symbolic-language diagram of where the spacecraft came from and how to play the record (the pattern on the model is only illustrative).')],
          func: [B('讓收到的人知道怎麼播放：沒有說明書，再好的內容也打不開。', 'It tells the finder how to play it: without instructions, even great content cannot be opened.')] },
        { id: 'needle', nodes: ['needle'], explode: { out: 0.3, up: 0.12 }, focus: 0.8, view: [0.8, 0.7, 1.0], pin: { anchor: [0.12, 0.05, 0.08] }, icon: '🪡', name: B('唱針與卡匣', 'Cartridge and needle'),
          structure: [B('隨唱片附上的卡匣與唱針。', 'The cartridge and needle that come with the record.'), B('（模型把它畫成像唱機的唱臂，只是示意。）', '(The model draws it like a record-player arm, just as an illustration.)')],
          func: [B('唱針放進溝槽，把刻在唱片上的訊號讀出來。', 'The needle sits in the groove and reads out the signal engraved in it.'), B('用「老技術」，因為它簡單又耐久，不需要電。', 'It uses “old technology” because it is simple, durable and needs no electricity.')] }
      ]
    },
    challenges: {
      3: find(3, B('哪個零件負責？', 'Which part does the job?'),
        B('如果有一天，有人撿到金唱片，會怎麼打開它？轉一轉 3D 模型，點選你認為負責的零件！', 'If someone finds the Golden Record one day, how will they open it? Rotate the 3D model and tap the part you think is responsible!'),
        [Q(B('哪個零件的溝槽裡，刻著 115 張圖像、音樂、地球的聲音與問候？', 'Which part’s grooves hold the 115 images, the music, the sounds of Earth and the greetings?'), 'disc', B('這些內容全部刻在鍍金唱片的溝槽裡。', 'All of it is engraved in the grooves of the gold-plated record.')),
         Q(B('要讓完全不認識我們的人也知道怎麼播放，套子上畫了符號說明。是哪個零件？', 'So that someone who knows nothing about us can learn how to play it, symbols are drawn on a cover. Which part?'), 'jacket', B('保護套上的符號說明圖，就是給陌生人的「說明書」。', 'The symbol diagram on the jacket is the “instruction manual” for a stranger.')),
         Q(B('要把溝槽裡的訊號讀出來，需要哪個零件？', 'To read the signal out of the grooves, which part do you need?'), 'needle', B('唱針沿著溝槽走，就能重新播放出聲音與圖像的訊號。', 'The needle follows the grooves and replays the sound and image signals.'))],
        B('你認識了金唱片的主要零件，也知道了「說明書」有多重要！', 'You know the Golden Record’s main parts, and why the “manual” matters!'))
    }
  };

  var SRC = {
    opportunity: [{ label: 'NASA Science: Opportunity (MER) — instruments', url: 'https://science.nasa.gov/mission/mer-opportunity/', note: B('桅杆相機與機械手臂上的儀器', 'Mast cameras and the instruments on the arm') }],
    voyager: [
      { label: 'NASA: Basics of Space Flight, Ch. 12 Science Instruments', url: 'https://science.nasa.gov/learn/basics-of-space-flight/chapter12-1/', note: B('13 公尺磁場計吊桿；10 公尺天線與電漿波儀共用', '13-m magnetometer boom; 10-m antenna shared with the plasma wave instrument') },
      { label: 'NASA NTRS: Voyager Backgrounder (Aug 1981)', url: 'https://ntrs.nasa.gov/citations/19810023559', note: B('一對 10 公尺鞭狀天線，由行星無線電天文儀與電漿波儀共用', 'A pair of 10-m whip antennas shared by the radio astronomy and plasma wave instruments') },
      { label: 'NASA Image Library: PIA25782', url: 'https://images.nasa.gov/details/PIA25782', note: B('每艘航海家號有 3 組 RTG（鈈-238）', 'Three RTGs (plutonium-238) on each Voyager') }]
  };
  window.MISSIONS.forEach(function (m) {
    var x = X[m.id]; if (!x) return;
    if (SRC[m.id]) SRC[m.id].forEach(function (r) { m.sources.push(r); });
    if (x.model) m.model = x.model;
    if (x.challenges) for (var k in x.challenges) m.challenges[k] = x.challenges[k];
  });
})();
