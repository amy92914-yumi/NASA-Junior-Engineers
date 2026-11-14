/* 任務 6：月球登陸——阿波羅登月艙（下降段）與月球車（LRV）。
   事實來源（皆為 NASA 官方頁面，見 sources）：
   - NSSDCA：Apollo 11 Lunar Module / EASEP（1969-059C）——登月艙構造、質量、降落與起飛時間、下降段被留下、上升段命運不明、EASEP 與其運作結束
   - NSSDCA：The Apollo Lunar Roving Vehicle——月球車規格、三次行駛距離、開發與成本
   - NSSDCA：Apollo 15 Lunar Module / ALSEP（1971-063C）——阿波羅 15 號的 ALSEP 運作時間與採樣量
   - NSSDCA Moon Fact Sheet——月球與地球的表面重力
   - NASA Earth Observatory／NASA SVS：LRO 拍到的 Apollo 11 登陸點
   「遊戲設定」標示的數字（電力格數等）是簡化用的，不是 NASA 規格。 */
(function () {
  var B = window.B, IM = window.IMAGES;
  function im(id, zh, en, credit, src) { IM[id] = { zh: zh, en: en, credit: credit, src: src }; }
  var NSSDCA = 'NASA NSSDCA';
  im('AS11-40-5927', '阿波羅 11 號的登月艙「老鷹號」在月面上（AS11-40-5927）', 'Apollo 11’s lunar module “Eagle” on the Moon (AS11-40-5927)', 'NASA');
  im('AS11-37-5458', '降落前不久，從登月艙窗口看到的寧靜海月面（AS11-37-5458）', 'The Sea of Tranquility seen from the lunar module window shortly before touchdown (AS11-37-5458)', 'NASA');
  im('AS11-40-5949', '艾德林在布置 EASEP 的被動式地震儀；左後方是雷射反射鏡（AS11-40-5949）', 'Aldrin setting up the EASEP passive seismometer; the laser retroreflector is back to the left (AS11-40-5949)', 'NASA');
  im('AS11-40-5878', '阿波羅 11 號太空人留在寧靜海的腳印（AS11-40-5878）', 'A footprint left by the Apollo 11 astronauts in the Sea of Tranquility (AS11-40-5878)', 'NASA');
  im('AS11-44-6574', '老鷹號與指令艙分離後，準備降落月面（AS11-44-6574，柯林斯拍攝）', 'Eagle after separating from the Command Module, preparing to descend (AS11-44-6574, taken by Michael Collins)', 'NASA');
  im('apollo11-lro', '月球偵察軌道器（LRO）在 2009 年拍到的老鷹號下降段（箭頭處）', 'The Eagle descent stage (arrow) photographed by the Lunar Reconnaissance Orbiter in 2009', 'NASA/GSFC/Arizona State University (LROC)', 'NASA Earth Observatory');
  im('apollo-lm-diagram', '登月艙構造圖：下方是下降段，上方是上升段（下降段的艙位裡標著 ROVER，就是月球車的位置）', 'Lunar module diagram: descent stage below, ascent stage above (the bay in the descent stage labeled ROVER is where the rover rode)', 'NASA History Office', NSSDCA);
  im('AS15-88-11901', '阿波羅 15 號的月球車（AS15-88-11901）', 'The Apollo 15 Lunar Roving Vehicle (AS15-88-11901)', 'NASA');
  im('AS17-146-22367', '阿波羅 17 號的月球車（AS17-146-22367）', 'The Apollo 17 Lunar Roving Vehicle (AS17-146-22367)', 'NASA');
  im('AS17-147-22526', '阿波羅 17 號在月面上的月球車（AS17-147-22526）', 'The Apollo 17 rover on the lunar surface (AS17-147-22526)', 'NASA');
  im('lrv-display', '月球車的控制與顯示面板示意圖：航向、速度、電力與溫度；上方中間是日影羅盤', 'Diagram of the rover’s control and display module: heading, speed, power and temperature, with the Sun-shadow device at top center', 'NASA', NSSDCA);
  im('lrv-deployment-art', '月球車從登月艙下降段展開的藝術示意圖（較早的規劃版本，與實際步驟略有不同）', 'Artist’s concept of the rover unfolding from the lunar module’s descent stage (an earlier plan; the final sequence differed slightly)', 'NASA', NSSDCA);

  /* 遊戲設定：月球車一趟的電力（不是真實用電） */
  var items = [
    { id: 'nav', icon: '🧭', name: B('導航（陀螺儀＋里程計）', 'Navigation (gyro + odometer)'), desc: B('記錄方向與距離，才知道怎麼回登月艙', 'Tracks heading and distance, so you can find the way back to the lunar module'), cost: 1, value: 0, must: true },
    { id: 'relay', icon: '📡', name: B('通訊中繼', 'Communications relay'), desc: B('把聲音與電視畫面傳回地球', 'Sends voice and TV pictures back to Earth'), cost: 1, value: 0, must: true },
    { id: 'tv', icon: '📺', name: B('電視攝影機', 'TV camera'), desc: B('讓地球上的人看見月面', 'Lets people on Earth see the Moon'), cost: 1, value: 2 },
    { id: 'near', icon: '🛞', name: B('開到近處的目標', 'Drive to a nearby site'), desc: B('走一小段路去採樣', 'A short drive to collect samples'), cost: 2, value: 2 },
    { id: 'far', icon: '🚙', name: B('開到遠處的目標', 'Drive to a far site'), desc: B('走到更遠的地方，看見更多', 'Go farther and see more'), cost: 3, value: 3 }
  ];

  window.MISSIONS.push({
    id: 'apollo', icon: '🌙', color: '#c9d3e8',
    title: B('月球登陸：留在月面的登月艙與月球車', 'Moon landing: the lunar module and rovers left behind'),
    tagline: B('把人送上月球的「發射台」和三輛電動車，至今停在那裡', 'The “launch pad” that carried humans off the Moon and three electric buggies, still parked there'),
    cover: 'AS11-40-5927',
    story: [
      { title: B('「老鷹降落了」', '“The Eagle has landed”'), img: 'AS11-37-5458',
        text: B('1969 年 7 月 20 日，阿波羅 11 號的登月艙「老鷹號」降落在月球的寧靜海。指揮官阿姆斯壯回報：「休士頓，這裡是寧靜基地，老鷹降落了。」這是第一艘把人送上月球的載人太空船。',
                'On July 20, 1969, Apollo 11’s lunar module “Eagle” landed in the Moon’s Sea of Tranquility. Commander Armstrong reported: “Houston, Tranquility Base here. The Eagle has landed.” It was the first crewed vehicle ever to land on the Moon.') },
      { title: B('一艘分成兩段的太空船', 'A spacecraft in two stages'), img: 'apollo-lm-diagram',
        text: B('登月艙分成上下兩段。下方的「下降段」裝著降落用的火箭、燃料、氧氣和水，還有四隻登陸腿；上方的「上升段」是太空人的座艙，也有自己的起飛引擎。兩段一起降落，但起飛時，只有上升段離開月球。',
                'The lunar module had two stages. The “descent stage” below carried the landing rocket, fuel, oxygen, water and four landing legs. The “ascent stage” above was the astronauts’ cabin, with its own engine for lifting off. They landed together, but only the ascent stage left the Moon.') },
      { title: B('發射台留在月球', 'The launch pad stays behind'), img: 'apollo11-lro',
        text: B('老鷹號在月面待了 21 小時 36 分。起飛時，上升段從下降段的上方升空，回到軌道和指令艙會合；下降段被留在月面，當作上升段的發射台。四十年後，月球偵察軌道器（LRO）從上空拍到了它。至於上升段，NASA 的紀錄寫著：命運不明，推測在 1 到 4 個月內撞上了月面。',
                'Eagle spent 21 hours 36 minutes on the surface. At liftoff the ascent stage rose from the top of the descent stage to meet the Command Module in orbit, while the descent stage was left on the Moon as its launch platform. Forty years later the Lunar Reconnaissance Orbiter photographed it from above. As for the ascent stage, NASA’s record says its fate is not known; it is assumed to have crashed into the Moon within one to four months.') },
      { title: B('留下來繼續做科學', 'Left behind to keep doing science'), img: 'AS11-40-5949',
        text: B('兩位太空人在月面布置了一套小實驗包 EASEP：地震儀、塵埃偵測器，還有雷射反射鏡，由太陽能板供電。他們也採集了 21.55 公斤的月岩和月壤。EASEP 留在月面工作：1969 年 8 月 3 日日落前，地面先讓它休息；下一個月晝再開機，8 月 27 日中午起，它不再回應指令。',
                'The two astronauts set up a small experiment package, EASEP: a seismometer, a dust detector and a laser reflector, powered by solar panels. They also collected 21.55 kg of lunar rock and soil. EASEP stayed to work: before sunset on August 3, 1969 ground controllers put it to rest; it was switched on again the next lunar day, and from noon on August 27 it no longer accepted commands.') },
      { title: B('為了走得更遠：月球車', 'To go farther: the rover'), img: 'lrv-deployment-art',
        text: B('阿波羅 11 號的太空人只走了大約 250 公尺。後來阿波羅 15、16、17 號，太空人把一輛折疊起來的電動車（月球車，LRV）帶上月球，收在登月艙下降段的一個艙位裡。到了月面，太空人用繩索和捲軸把它放下來、展開。它的質量是 210 公斤，還能多載 490 公斤。',
                'The Apollo 11 astronauts walked only about 250 meters in total. On Apollo 15, 16 and 17 the astronauts took a folded electric vehicle, the Lunar Roving Vehicle (LRV), to the Moon in a bay of the descent stage. On the surface they lowered it with ropes and reels and unfolded it. It had a mass of 210 kg and could carry another 490 kg.') },
      { title: B('三輛月球車，停在月面', 'Three rovers, parked on the Moon'), img: 'AS17-146-22367',
        text: B('阿波羅 15、16、17 號的月球車，分別行駛了 27.8、26.7 和 35.9 公里。阿波羅 17 號的月球車，離登月艙最遠到了 7.6 公里。三輛車用完後都留在月面。另外還造了第四輛，後來被拿來當零件，沒有去月球。',
                'The rovers of Apollo 15, 16 and 17 drove 27.8, 26.7 and 35.9 kilometers. Apollo 17’s rover went as far as 7.6 km from the lunar module. All three were left on the Moon when the missions ended. A fourth rover was built but used for spare parts and never flew.') }
    ],
    hardware: [
      { icon: '🏗️', name: B('下降段（發射台）', 'Descent stage (the launch pad)'), short: B('八角柱體，寬 4.2 公尺、厚 1.7 公尺', 'An octagonal block 4.2 m across and 1.7 m thick'),
        how: B('下降段是登月艙的下半部，裝著降落火箭、燃料與氧化劑槽、水、氧氣、氦氣，還有收納月面設備的空間。降落時它負責減速；降落後，它變成上升段起飛的平台。',
               'The descent stage is the lower half of the lunar module. It held the landing rocket, fuel and oxidizer tanks, water, oxygen, helium and storage for surface equipment. It slowed the craft down for landing; afterwards it became the platform for the ascent stage’s liftoff.'),
        why: B('起飛時只有上升段離開，下降段留下。下降段的乾質量就有 2,034 公斤，留下它，上升段就不必把這些質量再帶回軌道。',
               'Only the ascent stage lifted off. The descent stage alone had a dry mass of 2,034 kg, and leaving it behind meant the ascent stage did not have to carry that mass back to orbit.') },
      { icon: '🦿', name: B('登陸腿與腳墊', 'Landing legs and footpads'), short: B('四隻腿，腿端有圓形腳墊', 'Four legs with round footpads'),
        how: B('四隻登陸腿裝在下降段的側面，讓下降段底部離月面約 1.5 公尺；對面兩個腳墊的距離是 9.4 公尺。其中一隻腿有出入平台和梯子。',
               'Four landing legs on the sides of the descent stage held its bottom about 1.5 m above the surface; opposite footpads were 9.4 m apart. One leg had an egress platform and a ladder.'),
        why: B('下降段底部有一公尺長的引擎裙擺，腿讓它不會碰到地面。梯子後方的支柱上裝著紀念牌：「我們為全人類的和平而來。」',
               'A one-meter engine skirt hung below the stage, and the legs kept it off the ground. A plaque on the strut behind the ladder reads: “We came in peace for all mankind.”') },
      { icon: '🔥', name: B('下降引擎', 'Descent engine'), short: B('推力可以調整，最大約 45,000 牛頓', 'A throttleable rocket, up to about 45,000 newtons'),
        how: B('下降引擎能把推力調大調小，裝在可以擺動的環上。阿波羅 11 號的下降引擎點火 756.3 秒，登月艙就降落了。',
               'The descent engine could be throttled up and down and sat on a gimbal ring. Apollo 11’s descent engine fired for 756.3 seconds, and the lunar module landed.'),
        why: B('降落要慢慢減速、最後輕輕著地，所以需要能調整推力的引擎。',
               'Landing means slowing down gradually and touching down gently, which needs an engine whose thrust can be adjusted.') },
      { icon: '🔬', name: B('EASEP 實驗包', 'EASEP experiment package'), short: B('地震儀＋塵埃偵測器，主機總重 48 公斤', 'A seismometer and dust detector, 48 kg in all'),
        how: B('EASEP 靠兩片太陽能板供電，所以只能在月晝工作。被動式地震儀測月震與月殼性質，塵埃偵測器測灰塵堆積和輻射對太陽能電池的傷害。雷射反射鏡放在約 5 公尺外，不需要電力。',
               'EASEP ran on two solar panels, so it could only work in the lunar day. A passive seismometer measured moonquakes and the crust, and a dust detector measured dust build-up and radiation damage to solar cells. The laser reflector sat about 5 m away and needed no power.'),
        why: B('太空人只在月面待了幾個小時，儀器卻可以留下來繼續工作，直到 1969 年 8 月 27 日不再回應指令。',
               'The astronauts were on the surface for only hours, but the instruments stayed on, working until August 27, 1969, when they stopped accepting commands.') },
      { icon: '🛞', name: B('月球車：輪子與馬達', 'Rover: wheels and motors'), short: B('每顆輪子都有自己的馬達', 'Every wheel has its own motor'),
        how: B('輪子直徑 81.8 公分、寬 23 公分，用鍍鋅的鋼絲編成網狀；鈦合金的 V 形凸片蓋住一半的接觸面，增加抓地力。每顆輪子有自己的 0.25 馬力馬達，前後還各有一個轉向馬達。',
               'Each wheel was 81.8 cm across and 23 cm wide, woven from zinc-coated steel wire, with titanium chevrons covering half the contact area for traction. Every wheel had its own 0.25 hp motor, and there were steering motors at the front and rear.'),
        why: B('四輪各自驅動、前後都能轉向，轉彎半徑只有 3.1 公尺。',
               'Four driven wheels and steering at both ends gave a turning radius of only 3.1 meters.') },
      { icon: '🔋', name: B('月球車：電池與導航', 'Rover: batteries and navigation'), short: B('兩顆 36 伏、不能充電的電池', 'Two 36-volt, non-rechargeable batteries'),
        how: B('銀鋅電池供電給驅動與轉向馬達，也供電給電視攝影機或通訊中繼裝置。導航靠陀螺儀和里程計，電腦持續記錄方向與距離，隨時算出回登月艙的方向和路程；還有一個日影羅盤，可以用太陽的方向手動量航向。',
               'Silver-zinc batteries powered the drive and steering motors and also the TV camera or the communications relay. Navigation used a gyroscope and an odometer, with a computer that tracked heading and distance and always knew the way back to the lunar module. A Sun-shadow device gave a manual heading from the Sun’s direction.'),
        why: B('電池不能充電，用完就沒有了；月面沒有路標，導航系統隨時告訴太空人回登月艙的方向與距離。',
               'The batteries could not be recharged, so when they were empty they were empty; and with no road signs on the Moon, the navigation system always told the astronauts the direction and distance back to the lunar module.') }
    ],
    challenges: {
      1: { type: 'order', title: B('老鷹號的登月流程', 'Eagle’s moon-landing sequence'),
        scenario: B('你是登月艙駕駛員。請把老鷹號在月球上的五件事，依發生的先後順序排好。', 'You are the lunar module pilot. Put these five events of Eagle’s Moon mission in the order they happened.'),
        items: [
          { id: 'a', t: B('登月艙「老鷹號」與指令艙分離', 'The lunar module Eagle separates from the Command Module') },
          { id: 'b', t: B('下降引擎點火，開始往月面降落', 'The descent engine fires and the descent to the Moon begins') },
          { id: 'c', t: B('降落在寧靜海：「老鷹降落了」', 'Landing in the Sea of Tranquility: “The Eagle has landed”') },
          { id: 'd', t: B('太空人走出登月艙，踏上月面，布置 EASEP、採集月岩月壤', 'The astronauts step out onto the Moon, set up EASEP and collect rock and soil') },
          { id: 'e', t: B('回到登月艙，上升段從下降段上方起飛', 'Back inside, the ascent stage lifts off from the top of the descent stage') }
        ],
        hint: B('想想：要先分離才能下降；降落後才能走出去；做完工作，才準備起飛。', 'Think: separate before descending; land before going outside; finish the work before lifting off.'),
        explain: B('分離 → 下降 → 降落 → 踏上月面做實驗與採樣 → 起飛。老鷹號在月面待了 21 小時 36 分。', 'Separate → descend → land → step out for experiments and sampling → lift off. Eagle stayed on the surface for 21 hours 36 minutes.'),
        success: B('你排好了老鷹號的登月流程！', 'You put Eagle’s landing sequence in order!') },
      2: { type: 'budget', title: B('月球車的電池不能充電', 'The rover’s batteries cannot be recharged'),
        scenario: B('月球車的電池不能充電，用完就沒有了。這一趟只有 6 格電。導航和通訊一定要保留（鎖住了），其他的你想打開什麼？', 'The rover’s batteries cannot be recharged: when they are empty, they are empty. This trip has only 6 power cells. Navigation and the relay must stay on (locked). What else do you switch on?'),
        unit: B('格', 'cells'), items: items,
        rounds: [
          { label: B('這一趟：有 6 格電', 'This trip: 6 cells'), capacity: 6, minValue: 5, explain: B('兩個必須項目用掉 2 格，剩 4 格：電視（1 格）加上遠處目標（3 格），價值 5，最高。', 'The two must-keep items use 2 cells, leaving 4: the TV camera (1) plus the far site (3) gives value 5, the best.') },
          { label: B('走到一半：電池剩 4 格', 'Halfway: 4 cells left'), capacity: 4, minValue: 2, explain: B('剩 4 格時，遠處目標已經不可能。選電視（1 格）或近處目標（2 格）都能得到 2，記得省一點電。', 'With 4 cells the far site is out of reach. The TV camera (1) or the nearby site (2) each give 2; save some power.') },
          { label: B('準備回登月艙：只剩 2 格電', 'Heading back: only 2 cells left'), capacity: 2, minValue: 0, explain: B('剩下的電只夠導航與通訊。保住「找得到路回家」最重要。', 'The remaining power covers only navigation and the relay. Being able to find the way home matters most.') }
        ],
        note: B('遊戲設定：格數與價值是簡化示意，不是月球車的真實用電。', 'Game setting: the cells and values are illustrative, not the rover’s real power use.'),
        success: B('你學到：電力不能補充時，要先保住導航，才回得了登月艙。', 'You learned: when power cannot be refilled, protect navigation first so you can get back to the lunar module.') },
      3: { type: 'calc', title: B('月球車跑多快？', 'How fast did the rover go?'),
        scenario: B('NASA 的資料：阿波羅 15 號月球車行駛 27.8 公里，共 3 小時 2 分；16 號行駛 26.7 公里，共 3 小時 26 分；17 號行駛 35.9 公里，共 4 小時 26 分。平均速度＝距離 ÷ 時間。', 'NASA data: the Apollo 15 rover drove 27.8 km in 3 h 2 min; Apollo 16’s drove 26.7 km in 3 h 26 min; Apollo 17’s drove 35.9 km in 4 h 26 min. Average speed = distance ÷ time.'),
        questions: [
          { q: B('阿波羅 17 號：35.9 公里、4 小時 26 分，平均時速約幾公里？（取到小數點 1 位）', 'Apollo 17: 35.9 km in 4 h 26 min. About how many km/h on average? (one decimal)'), answer: 8.1, tol: 0.2, unit: B('公里／小時', 'km/h'),
            hint: B('4 小時 26 分 ≈ 4.43 小時，再用 35.9 ÷ 4.43。', '4 h 26 min ≈ 4.43 h; then 35.9 ÷ 4.43.'), explain: B('35.9 ÷ 4.43 ≈ 8.1 公里／小時。', '35.9 ÷ 4.43 ≈ 8.1 km/h.') },
          { q: B('阿波羅 15 號：27.8 公里、3 小時 2 分，平均時速約幾公里？（取到小數點 1 位）', 'Apollo 15: 27.8 km in 3 h 2 min. About how many km/h on average? (one decimal)'), answer: 9.2, tol: 0.2, unit: B('公里／小時', 'km/h'),
            hint: B('3 小時 2 分 ≈ 3.03 小時。', '3 h 2 min ≈ 3.03 h.'), explain: B('27.8 ÷ 3.03 ≈ 9.2 公里／小時。', '27.8 ÷ 3.03 ≈ 9.2 km/h.') },
          { q: B('阿波羅 17 號比 16 號多行駛了幾公里？', 'How many kilometers farther did Apollo 17’s rover drive than Apollo 16’s?'), answer: 9.2, tol: 0.1, unit: B('公里', 'km'),
            hint: B('35.9 − 26.7。', '35.9 − 26.7.'), explain: B('35.9 − 26.7 = 9.2 公里。', '35.9 − 26.7 = 9.2 km.') },
          { q: B('三輛月球車合計行駛了幾公里？', 'How many kilometers did the three rovers drive in total?'), answer: 90.4, tol: 0.2, unit: B('公里', 'km'),
            hint: B('27.8 + 26.7 + 35.9。', '27.8 + 26.7 + 35.9.'), explain: B('27.8 + 26.7 + 35.9 = 90.4 公里。', '27.8 + 26.7 + 35.9 = 90.4 km.') }
        ],
        note: B('這裡算的是平均速度，不是最高時速。', 'These are average speeds, not top speeds.'),
        success: B('你算出月球車的平均時速約 8 到 9 公里，在月面上開了好幾個小時。', 'You found the rovers averaged about 8 to 9 km/h, driving for hours on the Moon.') },
      4: { type: 'choice', title: B('留下，還是帶走？專案經理的三個判斷', 'Leave it or take it? A project manager’s three judgments'),
        scenario: B('專案經理沒有「完美答案」，只有最合理的取捨。選出你認為最好的判斷。', 'A project manager has no perfect answer, only the most reasonable trade-off. Pick the best judgment.'),
        questions: [
          { q: B('登月艙起飛時，下降段留在月面當發射台，只有上升段升空。這樣設計的好處是什麼？', 'At liftoff the descent stage stays on the Moon as a launch pad and only the ascent stage rises. What is the benefit of this design?'),
            options: [
              { t: B('讓登月艙看起來比較簡單', 'It makes the lunar module look simpler'), why: B('好處是工程上的，不是外觀。', 'The benefit is an engineering one, not about looks.') },
              { t: B('只有上升段需要再起飛；留下下降段，要推動的質量就少很多', 'Only the ascent stage needs to lift off again; leaving the descent stage behind means much less mass to push'), correct: true, why: B('對！下降段的乾質量就有 2,034 公斤。留下它，上升段用較小的引擎（約 15,000 牛頓）就能起飛；下降引擎最大推力約 45,000 牛頓。', 'Right! The descent stage alone has a dry mass of 2,034 kg. Without it, the ascent stage can lift off with a smaller engine (about 15,000 N); the descent engine’s maximum thrust was about 45,000 N.') },
              { t: B('因為下降段壞了，帶不走', 'Because the descent stage was broken and could not be taken'), why: B('NASA 的資料沒有這樣說；下降段本來就是被設計成「發射台」，起飛後留下。', 'NASA’s record does not say that: the descent stage was designed as a platform and left behind after liftoff.') },
              { t: B('為了在月面留下紀念品', 'To leave a souvenir on the Moon'), why: B('紀念牌是有留下，但留下下降段的主要原因是工程上的需要。', 'A plaque was left, but the main reason for leaving the descent stage was engineering.') }
            ] },
          { q: B('上升段在任務後被丟進月球軌道。NASA 的紀錄寫：命運不明，推測在 1 到 4 個月內撞上月面。你要怎麼向大眾說明？', 'The ascent stage was jettisoned into lunar orbit. NASA’s record says its fate is not known; it is assumed to have crashed into the Moon within one to four months. How do you explain this to the public?'),
            options: [
              { t: B('直接說它一定掉在寧靜海', 'Say it definitely fell in the Sea of Tranquility'), why: B('資料沒有確切位置，不能說得比證據更肯定。', 'The record gives no exact place, and you must not sound surer than the evidence.') },
              { t: B('誠實說明：沒有被追蹤，所以不知道它的下場，只能推測它撞上了月面', 'Say honestly that it was not tracked, so its fate is unknown and it is only assumed to have hit the Moon'), correct: true, why: B('對！科學與工程要分清楚「知道」和「推測」。', 'Right! Science and engineering separate what is known from what is assumed.') },
              { t: B('說它還在繞月飛行', 'Say it is still orbiting the Moon'), why: B('這也沒有證據。', 'There is no evidence for that either.') },
              { t: B('不要提這件事', 'Do not mention it'), why: B('隱瞞不確定的地方，會讓人以為所有硬體的下落都有紀錄。', 'Hiding what is uncertain makes people think the fate of every piece of hardware is on record.') }
            ] },
          { q: B('月球車只花 17 個月開發，成本從 1,900 萬美元漲到 3,800 萬美元，在月球上也沒有重大故障。要寫專案評語，哪一個最合理？', 'The rover was developed in only 17 months, its cost grew from $19 million to $38 million, and it had no major anomalies on the Moon. Which project review is most reasonable?'),
            options: [
              { t: B('成本多了一倍，所以是失敗的專案', 'The cost doubled, so the project failed'), why: B('它在月面完成了所有功能，也讓後三次任務走得更遠，不能只看成本。', 'It performed all its functions on the Moon and let three missions go farther; you cannot judge by cost alone.') },
              { t: B('成本增加要檢討原因；但月球車如期完成、讓探索範圍大增，這些價值也要一起評估', 'The cost increase needs a review, but delivering the rover and widening the exploration range must be weighed too'), correct: true, why: B('對！好的評語要同時看成本、進度與成果。', 'Right! A good review looks at cost, schedule and results together.') },
              { t: B('沒有故障，所以不用再檢討', 'No failures, so no review is needed'), why: B('沒有重大故障是結果，仍要整理經驗，傳給下一個任務。', 'No major failure is a result; the lessons still need to be collected for the next mission.') },
              { t: B('只要看它跑得多快', 'Only look at how fast it went'), why: B('速度只是其中一項，不能代表整個專案。', 'Speed is only one measure and cannot stand for the whole project.') }
            ] }
        ],
        success: B('你像專案經理一樣，把工程原因、證據和不確定性分清楚了。', 'Like a project manager, you kept the engineering reasons, the evidence and the uncertainty apart.') }
    },
    science: [
      { icon: '🌑', t: B('老鷹號是第一艘把人送上月球的載人太空船，兩位太空人在月面活動後，帶回 21.55 公斤月岩與月壤。', 'Eagle was the first crewed vehicle to land on the Moon; its two astronauts collected 21.55 kg of lunar rock and soil.') },
      { icon: '📉', t: B('EASEP 的被動式地震儀測量月震與月殼的性質，塵埃偵測器測量灰塵與輻射對太陽能電池的影響。', 'EASEP’s passive seismometer measured moonquakes and the crust, and its dust detector measured dust and radiation effects on solar cells.') },
      { icon: '🎯', t: B('雷射反射鏡放在月面，不需要電力，是 EASEP 的一部分。', 'The laser reflector, which needs no power, sat on the surface as part of EASEP.') },
      { icon: '🪨', t: B('阿波羅 15 號的太空人用月球車探索，在 3 次月面活動中採集了 77.31 公斤的岩石與土壤。', 'Using the rover, the Apollo 15 astronauts collected 77.31 kg of rock and soil over three moonwalks.') },
      { icon: '🚙', t: B('月球車讓太空人能開到離登月艙最遠 7.6 公里的地方。阿波羅 17 號的太空人說：沒有它，阿波羅 15、16、17 號的重大科學發現就不可能發生。', 'The rover took astronauts as far as 7.6 km from the lunar module. Apollo 17’s Harrison Schmitt said that without it the major discoveries of Apollo 15, 16 and 17 would not have been possible.') }
    ],
    ending: B('阿波羅 11 號的下降段留在寧靜海，兩位太空人的腳印，如果沒被隕石撞到，預計能保存數百萬年。三輛月球車停在阿波羅 15、16、17 號的登陸區。2009 年起，月球偵察軌道器從上空拍下這些遺留在月面的硬體。人類第一次離開地球去另一個世界，把「發射台」和「車子」都留在了那裡。',
              'Apollo 11’s descent stage rests in the Sea of Tranquility, and the astronauts’ footprints will probably last for millions of years unless a meteorite hits them. Three rovers are parked at the Apollo 15, 16 and 17 landing areas. Since 2009 the Lunar Reconnaissance Orbiter has photographed this hardware from above. The first time humans left Earth for another world, they left their launch pad and their cars behind.'),
    endImg: 'AS11-40-5878',
    sources: [
      { label: 'NSSDCA: Apollo 11 Lunar Module / EASEP (1969-059C)', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C', note: B('登月艙構造與質量、降落與起飛時間、下降段被留下、上升段命運不明、EASEP', 'Lunar module structure and mass, landing and liftoff times, descent stage left behind, ascent stage fate unknown, EASEP') },
      { label: 'NSSDCA: The Apollo Lunar Roving Vehicle', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html', note: B('月球車規格、展開方式、行駛距離、開發與成本', 'Rover specifications, deployment, distances driven, development and cost') },
      { label: 'NSSDCA: Apollo 15 Lunar Module / ALSEP (1971-063C)', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C', note: B('阿波羅 15 號的月面活動、採樣量與 ALSEP 運作時間', 'Apollo 15 moonwalks, sample mass and ALSEP operating dates') },
      { label: 'NSSDCA: Apollo 11 (25 years later)', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11.html', note: B('阿波羅 11 號照片與說明（AS11 系列）', 'Apollo 11 photographs and captions (AS11 series)') },
      { label: 'NASA Earth Observatory: Apollo 11 Landing Site', url: 'https://science.nasa.gov/earth/earth-observatory/apollo-11-landing-site-39408/', note: B('LRO 在 2009 年拍到的老鷹號下降段', 'The Eagle descent stage seen by LRO in 2009') },
      { label: 'NASA SVS: A New Look at the Apollo 11 Landing Site', url: 'https://svs.gsfc.nasa.gov/4185/', note: B('LRO 影像中仍看得見太空人的腳印軌跡', 'LRO images still show the astronauts’ boot trails') },
      { label: 'NSSDCA Moon Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html', note: B('月球表面重力 1.62 m/s²，地球 9.80 m/s²', 'Moon surface gravity 1.62 m/s², Earth 9.80 m/s²') }
    ]
  });
})();
