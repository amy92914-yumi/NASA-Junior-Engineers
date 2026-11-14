/* 任務 2：機會號 Opportunity。事實來源：JPL 新聞稿 2019/2/13（見 sources）。 */
(function () {
  var B = window.B;
  var items = [
    { id: 'heat', icon: '🔥', name: B('暖氣', 'Heater'), desc: B('保護電子零件不被凍壞', 'Keeps the electronics from freezing'), cost: 2, value: 0, must: true },
    { id: 'radio', icon: '📡', name: B('無線電', 'Radio'), desc: B('向地球報平安', 'Lets it call home'), cost: 1, value: 0, must: true },
    { id: 'cam', icon: '📷', name: B('相機', 'Camera'), desc: B('拍下沙塵暴的天空', 'Photographs the stormy sky'), cost: 1, value: 2 },
    { id: 'spec', icon: '🔬', name: B('光譜儀', 'Spectrometer'), desc: B('分析岩石成分', 'Analyzes rock minerals'), cost: 2, value: 3 },
    { id: 'brush', icon: '🧹', name: B('岩石研磨／刷子', 'Rock grinder / brush'), desc: B('清出新鮮的岩石表面', 'Clears a fresh rock surface'), cost: 2, value: 2 },
    { id: 'drive', icon: '🛞', name: B('開車', 'Driving'), desc: B('走到下一個目標', 'Drives to the next target'), cost: 3, value: 3 }
  ];
  window.MISSIONS.push({
    id: 'opportunity', icon: '🤖', color: '#e0623a',
    title: B('機會號：90 天的任務，走了 15 年', 'Opportunity: a 90-day mission that lasted 15 years'),
    tagline: B('一輛為了尋找水而出發的太陽能火星車', 'A solar-powered rover sent to look for water'),
    cover: 'PIA17759',
    story: [
      { title: B('雙胞胎火星車', 'Twin rovers'), img: 'PIA17759',
        text: B('2004 年 1 月，兩輛雙胞胎火星車先後降落火星：勇氣號落在古謝夫坑，20 天後，機會號落在子午線平原（Meridiani Planum）。它們有同一個任務：找出火星過去是否有水。',
                'In January 2004 two twin rovers landed on Mars: Spirit in Gusev Crater, then, 20 days later, Opportunity on Meridiani Planum. They shared one mission: find out whether Mars once had water.') },
      { title: B('90 天，還是 15 年？', '90 days, or 15 years?'),
        text: B('工程師只設計它工作 90 個火星日、走 1,000 公尺。結果它撐了將近 15 年，行駛超過 28 英里（45 公里），壽命是預期的 60 倍。',
                'Engineers designed it to work for 90 Martian days and drive 1,000 meters. It lasted almost 15 years and drove more than 28 miles (45 kilometers): 60 times its planned life.') },
      { title: B('找到水的線索', 'Clues about water'), img: 'PIA22222',
        text: B('機會號在降落點找到赤鐵礦，一種通常在水中形成的礦物。後來在 Endeavour 坑，又發現古代水的跡象，像地球上可以喝的池水或湖水。它傳回了超過 217,000 張照片。',
                'At its landing site Opportunity found hematite, a mineral that forms in water. Later, at Endeavour Crater, it found signs of ancient water like drinkable pond or lake water on Earth. It returned more than 217,000 images.') },
      { title: B('一次又一次的難關', 'Trouble after trouble'),
        text: B('旅途並不順利：2005 年，一個前輪失去轉向，暖氣卡住，還差點被沙丘困住；2015 年失去部分記憶體；2017 年另一個前輪也失去轉向。每次，地球上的團隊都想出辦法讓它繼續前進。',
                'The trip was rough. In 2005 a front wheel lost steering, a heater stuck on and a sand ripple nearly trapped it. In 2015 it lost use of its flash memory; in 2017 the other front wheel lost steering. Each time the team on Earth found a fix.') },
      { title: B('2018：全球沙塵暴', '2018: the global dust storm'), img: 'PIA22329',
        text: B('2018 年 6 月，一場巨大的沙塵暴蓋住了機會號所在的地方。機會號靠太陽能板發電，沙塵遮住了陽光。它最後一次與地球聯絡，是 2018 年 6 月 10 日。',
                'In June 2018 a huge dust storm covered the area where Opportunity worked. It runs on solar power, and the dust blocked the Sun. Its last communication with Earth was on June 10, 2018.') },
      { title: B('呼喚了八個月', 'Eight months of calling'),
        text: B('團隊用了超過 1,000 道指令呼喚它。2019 年 2 月 12 日傳出最後一次嘗試，13 日 NASA 宣布任務結束。它最後停在一個叫「毅力谷（Perseverance Valley）」的地方。',
                'The team sent more than a thousand commands. The last attempt went out on February 12, 2019, and on February 13 NASA declared the mission complete. Its final resting place was a spot called Perseverance Valley.') }
    ],
    hardware: [
      { icon: '☀️', name: B('太陽能板', 'Solar panels'), short: B('機會號唯一的發電來源', 'Its only source of power'),
        how: B('機會號是太陽能火星車：白天靠陽光發電，電能用來開車、做實驗、保暖。', 'Opportunity is solar-powered: sunlight makes the electricity for driving, experiments and keeping warm.'),
        why: B('沙塵會遮住陽光，所以沙塵暴對它來說特別危險。', 'Dust blocks sunlight, which is why dust storms are so dangerous for it.') },
      { icon: '🔋', name: B('電池', 'Battery'), short: B('把白天的電存起來', 'Stores daytime power'),
        how: B('白天多餘的電存在電池裡，晚上與陽光不足時使用。', 'Spare daytime power is stored for night and for low-sunlight days.'),
        why: B('沙塵暴期間發電變少，電池越用越少。', 'During a dust storm there is less power to refill it.') },
      { icon: '🛞', name: B('車輪', 'Wheels'), short: B('爬過岩石、沙地與 32 度斜坡', 'Crosses rocks, sand and 32-degree slopes'),
        how: B('機會號重 174 公斤，曾爬上 32 度斜坡（離開地球的紀錄），2005 年 3 月 20 日一天行駛 220 公尺。前輪可以轉向。', 'At 174 kg it climbed 32-degree slopes (an off-Earth record) and drove 220 meters in one day on March 20, 2005. The front wheels steer.'),
        why: B('輪子出問題時，團隊想出辦法讓它繼續走（見故事）。', 'When wheels failed, the team found ways to keep it moving (see the story).') },
      { icon: '📷', name: B('相機', 'Cameras'), short: B('傳回超過 217,000 張影像', 'More than 217,000 images'),
        how: B('包含 15 張 360 度的彩色全景。相機是地球上的人的「眼睛」。', 'These include 15 color 360-degree panoramas. The cameras are the eyes of the team on Earth.'),
        why: B('看得見，才知道往哪裡開、哪裡值得研究。', 'You must see to know where to drive and what to study.') },
      { icon: '🔬', name: B('光譜儀與顯微影像儀', 'Spectrometers and microscopic imager'), short: B('像地質學家的放大鏡', 'A geologist’s magnifier'),
        how: B('它們檢查岩石裡有什麼礦物，找出水留下的痕跡。', 'They check what minerals are in rocks and look for traces left by water.'),
        why: B('赤鐵礦就是這樣被找到的。', 'This is how hematite was found.') },
      { icon: '🧹', name: B('岩石研磨與刷子', 'Rock grinder and brush'), short: B('磨掉風化的外層', 'Removes the weathered surface'),
        how: B('機會號磨開了 52 塊岩石的表面，並刷乾淨另外 72 個目標，才能看到新鮮的礦物。', 'It exposed the surfaces of 52 rocks and brushed 72 more targets to reveal fresh minerals.'),
        why: B('岩石外面有灰塵，要磨開才看得到真正的成分。', 'Rocks are dusty outside; you must open them up to see what they are made of.') }
    ],
    challenges: {
      1: { type: 'budget', title: B('沙塵暴求生：只剩 4 格電', 'Storm survival: only 4 power cells'),
        scenario: B('沙塵暴遮住了太陽，電池只剩 4 格電。暖氣和無線電一定要保留（鎖住了）。其他的你想打開什麼？', 'The dust storm hides the Sun and only 4 power cells are left. The heater and radio must stay on (locked). What else do you switch on?'),
        unit: B('格', 'cells'), items: items,
        rounds: [{ label: B('電池只剩 4 格', 'Only 4 cells left'), capacity: 4, minValue: 2,
          explain: B('開車太耗電了！保住暖氣與無線電，再用最小的電量拍照，是最聰明的選擇。', 'Driving uses too much power! Keep the heater and radio, then use the least power to take pictures. That is the smartest choice.') }],
        success: B('你學會了第一個工程原則：能量有限時，先保住「活下去」的東西。', 'You learned the first engineering rule: when energy is short, protect what keeps you alive first.') },
      2: { type: 'budget', title: B('三天的沙塵暴', 'Three days of storm'),
        scenario: B('沙塵暴越來越嚴重，每天可用的電越來越少。每一輪都要重新決定要開哪些裝置。暖氣與無線電永遠要保留。', 'The storm gets worse each day, so less power is available. Each round you decide again what to switch on. Heater and radio always stay.'),
        unit: B('格', 'cells'), items: items,
        rounds: [
          { label: B('第 1 天：有 7 格電', 'Day 1: 7 cells'), capacity: 7, minValue: 5, explain: B('電還夠時，可以多做一些科學。', 'With enough power you can do some science.') },
          { label: B('第 2 天：只剩 5 格電', 'Day 2: only 5 cells'), capacity: 5, minValue: 3, explain: B('選價值最高、耗電最小的：光譜儀最划算。', 'Choose the best value per power: the spectrometer is the best deal.') },
          { label: B('第 3 天：只剩 3 格電', 'Day 3: only 3 cells'), capacity: 3, minValue: 0, explain: B('剩下的電只夠暖氣和無線電。什麼都不做、保命，也是一個好決定。', 'Only enough for the heater and radio. Doing nothing and staying alive is also a good decision.') }
        ],
        success: B('你做了三次困難的取捨。真正的工程師常常要在「做事」和「活下去」之間選擇。', 'You made three hard trade-offs. Real engineers often choose between “doing work” and “staying alive”.') },
      3: { type: 'calc', title: B('電池撐得了幾天？', 'How many days will the battery last?'),
        scenario: B('用「每日發電 − 每日用電」算出每天電量增減，再推算電池能撐多久。', 'Use “daily power made − daily power used” to find the change each day, then how long the battery lasts.'),
        questions: [
          { q: B('晴天時，太陽能板每天補 50 單位，機會號每天用 40 單位。沙塵暴時，太陽能板每天只能補 10 單位，用電還是 40。電量每天增減多少？（減少用負數）', 'On sunny days the panels add 50 units a day and the rover uses 40. In the storm the panels add only 10 units, but it still uses 40. How much does the battery change each day? (use a negative number for a loss)'), answer: -30, tol: 0.5, unit: B('單位／天', 'units/day'),
            hint: B('10 − 40 = ?', '10 − 40 = ?'), explain: B('10 − 40 = −30，電池每天少 30。', '10 − 40 = −30, so the battery loses 30 a day.') },
          { q: B('電池原本有 120 單位，這樣幾天會用完？', 'The battery starts with 120 units. In how many days will it run out?'), answer: 4, tol: 0.1, unit: B('天', 'days'),
            hint: B('120 ÷ 30。', '120 ÷ 30.'), explain: B('120 ÷ 30 = 4 天。', '120 ÷ 30 = 4 days.') },
          { q: B('如果改成「睡覺模式」，每天只用 25 單位（太陽能板仍補 10），電池可以撐幾天？', 'If it switches to “sleep mode” and uses only 25 units a day (panels still add 10), how many days will the battery last?'), answer: 8, tol: 0.1, unit: B('天', 'days'),
            hint: B('每天少 25 − 10 = 15，120 ÷ 15。', 'It loses 25 − 10 = 15 a day; 120 ÷ 15.'), explain: B('120 ÷ 15 = 8 天——睡覺讓它多撐一倍的時間，等風暴過去。', '120 ÷ 15 = 8 days. Sleeping doubles the time it can wait for the storm to pass.') }
        ],
        note: B('遊戲設定：電量單位與數字為簡化示意，不是機會號的真實規格。', 'Game setting: the units and numbers are illustrative, not Opportunity’s real specifications.'),
        success: B('你算出了「睡覺」能延長生存時間。這正是工程師在風暴中做的判斷。', 'You calculated that “sleeping” stretches survival time, the very judgment engineers make in a storm.') },
      4: { type: 'calc', title: B('沙塵有多厚？', 'How thick is the dust?'),
        scenario: B('光穿過塵埃會變弱：剩下的比例＝e^(−τ)，τ（讀作「套」）叫做光學厚度，塵埃越厚 τ 越大。e 約等於 2.718。', 'Light dims as it passes through dust: remaining fraction = e^(−τ). τ (tau) is the optical depth: the thicker the dust, the larger τ. e ≈ 2.718.'),
        questions: [
          { q: B('τ = 2.3 時，到達太陽能板的陽光剩下百分之幾？（e^−2.3 ≈ ?）', 'When τ = 2.3, what percent of sunlight reaches the panels? (e^−2.3 ≈ ?)'), answer: 10, tol: 0.5, unit: '%',
            hint: B('e^−2.3 ≈ 0.1。', 'e^−2.3 ≈ 0.1.'), explain: B('e^−2.3 ≈ 0.10，只剩約 10% 的陽光。', 'e^−2.3 ≈ 0.10: only about 10% of the light is left.') },
          { q: B('晴天時每天發電 100 單位。τ = 2.3 時每天發電多少單位？', 'On a clear day the panels make 100 units. How many units a day when τ = 2.3?'), answer: 10, tol: 0.5, unit: B('單位', 'units'),
            explain: B('100 × 10% = 10 單位。', '100 × 10% = 10 units.') },
          { q: B('機會號保命至少每天要用 30 單位，電池有 120。發電 10 單位時，幾天後電會用完？', 'To survive, Opportunity needs at least 30 units a day, and the battery holds 120. With 10 units made per day, in how many days is it empty?'), answer: 6, tol: 0.1, unit: B('天', 'days'),
            hint: B('每天少 30 − 10 = 20，120 ÷ 20。', 'It loses 30 − 10 = 20 a day; 120 ÷ 20.'), explain: B('120 ÷ 20 = 6 天。', '120 ÷ 20 = 6 days.') },
          { q: B('如果塵埃再變厚到 τ = 4.6，只剩約百分之幾的陽光？（e^−4.6 ≈ ?）', 'If the dust thickens to τ = 4.6, about what percent of sunlight remains? (e^−4.6 ≈ ?)'), answer: 1, tol: 0.3, unit: '%',
            hint: B('τ 加倍，剩下的比例是原本的平方。0.1 × 0.1 = ?', 'Doubling τ squares the fraction: 0.1 × 0.1 = ?'), explain: B('0.1 × 0.1 = 0.01，只剩 1%。這就是為什麼一場夠厚的沙塵暴，足以讓太陽能火星車「斷糧」。', '0.1 × 0.1 = 0.01, only 1%. That is why a thick enough storm can starve a solar rover.') }
        ],
        note: B('遊戲設定：τ 與發電量為示意數字，不是 2018 年沙塵暴的實測值。', 'Game setting: τ and power values are illustrative, not measurements from the 2018 storm.'),
        success: B('你用指數衰減，說明了為什麼沙塵暴對太陽能探測車是致命的。', 'You used exponential decay to explain why a dust storm is deadly for a solar rover.') }
    },
    science: [
      { icon: '💧', t: B('在降落點找到赤鐵礦，這是一種通常在水中形成的礦物。', 'Found hematite at its landing site, a mineral that forms in water.') },
      { icon: '🏞️', t: B('在 Endeavour 坑發現古代水的跡象，像地球上可以喝的池水或湖水。', 'At Endeavour Crater it found signs of ancient water like drinkable pond or lake water on Earth.') },
      { icon: '🌍', t: B('和勇氣號一起證明：古代火星曾經潮濕、可能適合生命居住，現在卻是冷而乾的世界。', 'Together with Spirit it showed that ancient Mars was wet and possibly habitable, unlike the cold, dry world of today.') },
      { icon: '🏁', t: B('創下紀錄：一天 220 公尺、爬 32 度斜坡、累計行駛 45 公里（地球以外的紀錄）。', 'Set records: 220 meters in one day, a 32-degree slope, and about 45 kilometers in total off Earth.') },
      { icon: '🧬', t: B('它的技術與經驗被傳給好奇號與毅力號。', 'Its technology and lessons were passed on to Curiosity and Perseverance.') }
    ],
    ending: B('2019 年 2 月 13 日，NASA 宣布機會號任務完成。它停在「毅力谷」，離開地球近 15 年。NASA 局長說：總有一天，太空人會踏上火星，他們的第一個腳印，有一部分屬於機會號的團隊。',
              'On February 13, 2019, NASA declared the Opportunity mission complete. It rests in Perseverance Valley after almost 15 years away from Earth. NASA’s administrator said that when astronauts first walk on Mars, part of that first footprint will belong to the Opportunity team.'),
    endImg: 'PIA22329',
    sources: [
      { label: 'JPL: NASA’s Opportunity Rover Mission on Mars Comes to End (2019/2/13)', url: 'https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/', note: B('90 天設計、45 公里、217,000 張影像、赤鐵礦、最後通訊', '90-day design, 45 km, 217,000 images, hematite, last contact') },
      { label: 'NASA Image Library: PIA22329', url: 'https://images.nasa.gov/details/PIA22329', note: B('2018/6/6 火星沙塵暴', 'Dust storm, June 6, 2018') },
      { label: 'NASA Image Library: PIA22222', url: 'https://images.nasa.gov/details/PIA22222', note: B('機會號自拍', 'Opportunity selfie') },
      { label: 'NASA Image Library: PIA17759', url: 'https://images.nasa.gov/details/PIA17759', note: B('機會號自拍（2014）', 'Opportunity selfie (2014)') }
    ]
  });
})();
