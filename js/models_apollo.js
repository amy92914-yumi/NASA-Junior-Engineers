/* 月球登陸任務的兩個 3D 模型：登月艙（NASA 官方模型）與月球車（本專案依 NASA 規格自製的示意模型）。
   structure／func 的事實皆來自 NSSDCA：Apollo 11 Lunar Module / EASEP（1969-059C）、The Apollo Lunar Roving Vehicle。 */
(function () {
  'use strict';
  var B = window.B;

  var LM = {
    glb: 'apollo_lm', scene: 'moon', home: 1.95,
    title: B('認識登月艙：3D 展示', 'Meet the lunar module: 3D view'),
    credit: B('3D 模型：NASA/Michael D. Carbajal（Apollo Lunar Module, glTF）。已解除 Draco 壓縮；零件分組、材質與拆解動畫為本作品加工。這是通用的阿波羅登月艙模型，不是專指老鷹號。',
              '3D model: NASA/Michael D. Carbajal (Apollo Lunar Module, glTF). Draco compression removed; part grouping, materials and exploded view added by this project. A generic Apollo lunar module, not specifically Eagle.'),
    parts: [
      { id: 'lm_descent', nodes: ['lm_descent'], explode: [0, 0, 0], focus: 0.85, view: [0.9, 0.35, 1.1], pin: { anchor: [0, 0.02, 0.3] }, icon: '🏗️', name: B('下降段（發射台）', 'Descent stage (the launch pad)'),
        structure: [B('八角柱體，寬 4.2 公尺、厚 1.7 公尺。', 'An octagonal block 4.2 m across and 1.7 m thick.'),
                    B('裡面有降落用的火箭、2 個燃料槽、2 個氧化劑槽，還有水、氧氣、氦氣槽，以及收納月面設備的空間。', 'Inside: the landing rocket, two fuel tanks, two oxidizer tanks, water, oxygen and helium tanks, and storage for surface equipment.')],
        func: [B('降落時它負責把登月艙減速；降落後，它變成上升段起飛的平台。', 'It slows the lunar module for landing; afterwards it becomes the platform for the ascent stage’s liftoff.'),
               B('起飛時只有上升段離開，下降段被留在月面。它的乾質量是 2,034 公斤（含收納的月面設備）。', 'Only the ascent stage lifts off; the descent stage is left on the Moon. Its dry mass is 2,034 kg (including stowed surface equipment).'),
               B('阿波羅 15、16、17 號的月球車，折疊收在下降段的一個艙位裡。', 'On Apollo 15, 16 and 17 the folded rover rode in a bay of the descent stage.')] },
      { id: 'lm_legs', nodes: ['lm_legs'], explode: [0, -0.1, 0], focus: 0.9, view: [0.9, 0.2, 1.2], pin: { anchor: [0.27, -0.12, 0.27] }, icon: '🦿', name: B('登陸腿與腳墊', 'Landing legs and footpads'),
        structure: [B('四隻登陸腿裝在下降段的側面，腿端有圓形腳墊。', 'Four landing legs on the sides of the descent stage, each ending in a round footpad.'),
                    B('讓下降段底部離月面約 1.5 公尺；對面兩個腳墊的距離是 9.4 公尺。', 'They hold the bottom of the stage about 1.5 m above the surface; opposite footpads are 9.4 m apart.'),
                    B('其中一隻腿有出入平台和梯子。', 'One leg has an egress platform and a ladder.')],
        func: [B('支撐登月艙站在月面，也讓下降段底部約 1 公尺長的引擎裙擺不碰到地面。', 'They hold the lander up and keep the roughly one-meter engine skirt under the stage off the ground.'),
               B('太空人從出入平台沿梯子走下月面。紀念牌裝在梯子後方的支柱上：「我們為全人類的和平而來。」', 'The astronauts climbed down the ladder from the platform. A plaque on the strut behind the ladder reads: “We came in peace for all mankind.”')] },
      { id: 'lm_engine', nodes: ['lm_engine'], explode: [0, -0.2, 0], focus: 0.7, view: [0.9, -0.1, 1.1], pin: { anchor: [0.0, -0.06, 0.0] }, icon: '🔥', name: B('下降引擎', 'Descent engine'),
        structure: [B('裝在下降段中央底部，約 1 公尺長的圓錐形引擎裙擺突出在底部。', 'Mounted at the center of the descent stage, with a one-meter conical skirt sticking out of the bottom.'),
                    B('推力可以調整，最大約 45,000 牛頓；裝在可以擺動的環上。', 'Its thrust can be throttled, up to about 45,000 newtons, and it sits on a gimbal ring.')],
        func: [B('降落時把推力調大調小，讓登月艙慢慢減速、輕輕著地。', 'During landing the thrust is turned up and down so the lander slows gradually and touches down gently.'),
               B('阿波羅 11 號的下降引擎點火 756.3 秒，登月艙就降落在寧靜海。', 'Apollo 11’s descent engine fired for 756.3 seconds, and the lander touched down in the Sea of Tranquility.')] },
      { id: 'lm_ascent', nodes: ['lm_ascent'], explode: [0, 0.22, 0], focus: 0.9, view: [0.8, 0.4, 1.2], pin: { anchor: [0, 0.12, 0.2] }, icon: '🧑‍🚀', name: B('上升段座艙', 'Ascent stage cabin'),
        structure: [B('形狀不規則，約 2.8 公尺高、寬約 4.0 × 4.3 公尺。', 'Irregular in shape, about 2.8 m high and 4.0 × 4.3 m wide.'),
                    B('裡面是加壓座艙（容積 6.65 立方公尺），沒有座椅；一側有出入艙門，頂部有對接艙門，還有兩個三角形窗戶。', 'Inside is a pressurized cabin (6.65 cubic meters) with no seats; there is a hatch on one side, a docking hatch on top and two triangular windows.')],
        func: [B('太空人在這裡操作登月艙、休息、等待起飛。', 'The astronauts operated the lander, rested and waited here.'),
               B('起飛引擎的推力約 15,000 牛頓，把太空人送回軌道，和指令艙會合。', 'The ascent engine, about 15,000 N, carried them back to orbit to meet the Command Module.'),
               B('它不是留在月面的部分：任務後被丟進月球軌道，NASA 的紀錄是「命運不明，推測在 1～4 個月內撞上月面」。', 'It is not the part left on the Moon: after the mission it was jettisoned into lunar orbit, and NASA’s record says its fate is not known, assumed to have crashed within one to four months.')] },
      { id: 'lm_antenna', nodes: ['lm_antenna'], explode: [0, 0.4, 0], focus: 0.8, view: [0.9, 0.6, 1.0], pin: { anchor: [0, 0.08, 0] }, icon: '📡', name: B('天線', 'Antennas'),
        structure: [B('頂部有一個拋物面的會合雷達天線、一個可以轉動的 S 波段拋物面天線，和 2 支飛行用的 VHF 天線。', 'On top: a parabolic rendezvous radar antenna, a steerable parabolic S-band antenna and two in-flight VHF antennas.')],
        func: [B('S 波段天線負責和地球通訊：遙測、電視、語音與測距。', 'The S-band antenna handled communication with Earth: telemetry, TV, voice and ranging.'),
               B('VHF 用在太空人與登月艙之間，以及登月艙與指令艙之間的通話。', 'VHF linked the astronauts with the lander and the lander with the Command Module.'),
               B('會合雷達用來測距，是導航系統的一部分。', 'The rendezvous radar measured range and was part of the guidance system.')] },
      { id: 'lm_rcs', nodes: ['lm_rcs'], explode: [0, 0.1, 0], focus: 0.9, view: [1.0, 0.4, 1.0], pin: { anchor: [0.2, 0.0, 0.22] }, icon: '🚀', name: B('姿態控制推進器（RCS）', 'Reaction control thrusters (RCS)'),
        structure: [B('4 組推進器模組，每組有 4 個朝不同方向的小噴嘴，每個推力 450 牛頓。', 'Four thruster modules, each with four small nozzles pointing in different directions, 450 N each.')],
        func: [B('這套「反應控制系統」負責在太空中調整登月艙的方向，並做小幅度的移動。', 'This reaction control system turns the lander and makes small maneuvers in space.'),
               B('NASA 的資料寫明：登月艙的操縱，是靠這 4 組模組完成的。', 'NASA’s record states that the lander’s maneuvering was done with these four modules.')] }
    ]
  };

  var LRV = {
    build: window.BUILD && window.BUILD.lrv, scene: 'moon', home: 2.15,
    title: B('認識月球車：3D 展示', 'Meet the Lunar Roving Vehicle: 3D view'),
    credit: B('3D 模型：NASA 沒有提供月球車的 3D 模型，這是本專案依 NASA NSSDCA 公布的尺寸與規格自製的簡化示意模型，不是 NASA 官方模型。車長 3.1 公尺、軸距 2.3 公尺、最高 1.14 公尺、輪徑 81.8 公分、輪寬 23 公分；軌距、座椅與電池的位置只是示意。',
              '3D model: NASA offers no 3D model of the rover, so this is a simplified illustrative model made by this project from the sizes and specifications published by NASA’s NSSDCA. It is not an official NASA model. Length 3.1 m, wheelbase 2.3 m, height 1.14 m, wheel diameter 81.8 cm, width 23 cm; track width and the positions of seats and batteries are only illustrative.'),
    parts: [
      { id: 'lrv_frame', nodes: ['lrv_frame'], explode: [0, 0, 0], focus: 1.5, view: [0.7, 0.6, 1.0], pin: { anchor: [-0.3, 0.0, -0.22] }, icon: '🔩', name: B('車身與懸吊', 'Frame and suspension'),
        structure: [B('鋁合金 2219 管焊成的三段式車架，中間有鉸鏈，可以折起來。', 'A three-part chassis welded from aluminum alloy 2219 tubing, hinged in the middle so it can fold.'),
                    B('車長 3.1 公尺、軸距 2.3 公尺、最高 1.14 公尺；雙橫向叉臂懸吊，滿載時離地 36 公分。', 'Length 3.1 m, wheelbase 2.3 m, height 1.14 m; double horizontal wishbone suspension; 36 cm of ground clearance when fully loaded.')],
        func: [B('折疊起來掛在登月艙下降段的第 1 艙，帶上月球；到了月面，太空人用繩索和捲軸把它放下、展開，各部分會鎖定。', 'Folded and hung in the lunar module’s quad 1 bay for the trip; on the Moon the astronauts lowered it with ropes and reels and it locked into place as it opened.'),
               B('質量 210 公斤，還能多載 490 公斤。', 'Mass 210 kg, with a payload of another 490 kg.')] },
      { id: 'lrv_wheels', nodes: ['lrv_wheels'], explode: [0, -0.16, 0], focus: 1.7, view: [0.9, 0.2, 1.0], pin: { anchor: [0.37, -0.1, 0.3] }, icon: '🛞', name: B('輪子與馬達', 'Wheels and motors'),
        structure: [B('輪子直徑 81.8 公分、寬 23 公分，用鍍鋅鋼絲編成網狀；鈦合金的 V 形凸片蓋住一半的接觸面。', 'Each wheel is 81.8 cm across and 23 cm wide, woven from zinc-coated steel wire, with titanium chevrons covering half the contact area.'),
                    B('每顆輪子有自己的 0.25 馬力馬達和機械煞車；前後各有一個轉向馬達。', 'Every wheel has its own 0.25 hp motor and a mechanical brake; there are steering motors at the front and rear.')],
        func: [B('四輪各自驅動，前後輪都能轉向，轉彎半徑 3.1 公尺。', 'Four driven wheels and steering at both ends give a turning radius of 3.1 m.'),
               B('也可以把前後輪分開，只用一組輪子轉向。', 'The two sets can also be decoupled so only one set steers.')] },
      { id: 'lrv_battery', nodes: ['lrv_battery'], explode: [0, 0.14, 0.3], focus: 1.3, view: [0.9, 0.5, 0.9], pin: { anchor: [-0.04, -0.1, 0.2] }, icon: '🔋', name: B('電池', 'Batteries'),
        structure: [B('兩顆 36 伏的銀鋅（氫氧化鉀）電池，不能充電，容量 121 安培小時。', 'Two 36-volt silver-zinc (potassium hydroxide) batteries that cannot be recharged, 121 amp-hours.'),
                    B('用被動式熱控制，讓電池維持在合適的溫度範圍。', 'Passive thermal control keeps them in a good temperature range.')],
        func: [B('供電給驅動與轉向馬達，也供電給車前的 36 伏插座。', 'They power the drive and steering motors and a 36-volt utility outlet on the front.'),
               B('插座可以接通訊中繼裝置或電視攝影機。電池不能充電，用完就沒有了。', 'The outlet powers the communications relay unit or the TV camera. They cannot be recharged: when empty, they are empty.')] },
      { id: 'lrv_control', nodes: ['lrv_control'], explode: [0, 0.34, 0], focus: 1.3, view: [-0.5, 0.7, 0.9], pin: { anchor: [-0.06, 0.08, -0.16] }, icon: '🧭', name: B('導航與控制', 'Navigation and controls'),
        structure: [B('兩個座椅之間有一支 T 形手把；前方的控制與顯示面板顯示速度、航向、俯仰、電力與溫度。', 'A T-shaped hand controller sits between the seats; the control and display module in front shows speed, heading, pitch, power and temperature.'),
                    B('導航靠陀螺儀和里程計，電腦持續記錄方向與距離；還有一個日影羅盤，可以用太陽的方向手動量航向。', 'Navigation used a gyroscope and odometer feeding a computer that tracked heading and distance, plus a Sun-shadow device for a manual heading.')],
        func: [B('手把往前＝前進，左右＝轉彎，往後拉＝煞車；先按開關再往後拉＝倒車，拉到底＝停車煞車。', 'Forward drives, left and right turn, pulling back brakes; flip a switch first and pull back for reverse, pull all the way back for the parking brake.'),
               B('電腦隨時算出回登月艙的方向與距離，月面沒有路標也不會迷路。', 'The computer always knew the direction and distance back to the lunar module, so the crew could not get lost with no road signs.')] },
      { id: 'lrv_seats', nodes: ['lrv_seats'], explode: [0, 0.26, 0], focus: 1.4, view: [-0.6, 0.5, 1.0], pin: { anchor: [-0.04, 0.08, 0.1] }, icon: '💺', name: B('座椅', 'Seats'),
        structure: [B('兩張並排、可折疊的座椅，用鋁管加尼龍織帶做成；中間有扶手。', 'Two folding side-by-side seats of aluminum tubing and nylon webbing, with an armrest between them.'),
                    B('每張座椅有可調整的腳踏板和魔鬼氈安全帶。', 'Each seat has adjustable footrests and a Velcro seatbelt.')],
        func: [B('讓兩位穿著太空衣的太空人坐著開車。', 'Lets two astronauts in spacesuits drive seated.'),
               B('座椅折疊起來，月球車才能收進登月艙。', 'Folding the seats is part of how the rover fits into the lunar module.')] },
      { id: 'lrv_antenna', nodes: ['lrv_antenna'], explode: [0, 0.4, 0], focus: 1.3, view: [0.7, 0.5, 1.0], pin: { anchor: [0.04, 0.1, 0] }, icon: '📡', name: B('天線', 'Antenna'),
        structure: [B('車子前方中央的桅杆上，架著一個大型網狀碟形天線。', 'A large mesh dish antenna is mounted on a mast at the front center of the rover.')],
        func: [B('讓車子和地球保持聯絡；車前的 36 伏插座可以接通訊中繼裝置，把聲音和電視畫面傳回地球。', 'It keeps the rover in touch with Earth; the 36-volt outlet on the front can power a communications relay unit that sends voice and TV back to Earth.')] }
    ]
  };

  window.MISSIONS.forEach(function (m) {
    if (m.id === 'apollo') { m.model = LM; m.model2 = LRV; }
  });
})();
