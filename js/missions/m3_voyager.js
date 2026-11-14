/* 任務 3：航海家 1 號 Voyager 1。事實來源見 sources 與事實核對表。 */
(function () {
  var B = window.B;
  var items = [
    { id: 'life', icon: '🛰️', name: B('維生系統（暖氣＋無線電）', 'Life support (heater + radio)'), desc: B('沒有它，探測器就失去聯絡', 'Without it, contact is lost'), cost: 12, value: 0, must: true },
    { id: 'mag', icon: '🧲', name: B('磁場計', 'Magnetometer'), desc: B('測量太空裡的磁場', 'Measures magnetic fields'), cost: 3, value: 3 },
    { id: 'pws', icon: '🔊', name: B('電漿波儀', 'Plasma wave instrument'), desc: B('「聽」星際空間的電漿振動', 'Listens to plasma waves in space'), cost: 3, value: 3 },
    { id: 'crs', icon: '☄️', name: B('宇宙射線儀', 'Cosmic ray instrument'), desc: B('測量高能粒子', 'Measures high-energy particles'), cost: 5, value: 3 },
    { id: 'lecp', icon: '⚡', name: B('低能帶電粒子儀', 'Low-energy charged particle instrument'), desc: B('測量較低能量的粒子', 'Measures lower-energy particles'), cost: 5, value: 3 }
  ];
  window.MISSIONS.push({
    id: 'voyager', icon: '🌌', color: '#5fd0ff',
    title: B('航海家1號：飛向星際空間', 'Voyager 1: heading into interstellar space'),
    tagline: B('1977 年出發、至今仍在傳回訊號的探測器', 'Launched in 1977 and still sending signals'),
    cover: 'PIA14111',
    story: [
      { title: B('1977：大巡航出發', '1977: the Grand Tour begins'), img: 'PIA14111',
        text: B('1977 年夏天，兩艘航海家號探測器相隔不到一個月發射升空，趁著行星排列的好機會，一路拜訪外太陽系的行星。航海家1號在 9 月 5 日出發。',
                'In the summer of 1977 the two Voyager probes were launched less than a month apart, taking advantage of a good alignment of the planets to visit the outer solar system. Voyager 1 left on September 5.') },
      { title: B('第一次近看木星', 'A close look at Jupiter'), img: 'PIA00029',
        text: B('1979 年 1 月 6 日，航海家1號開始為期三個月的木星近距離觀測，拍下第一批木星的細節影像。1980 年 11 月 12 日，它飛過土星。',
                'On January 6, 1979, Voyager 1 began three months of close-up observations of Jupiter and returned the first detailed pictures. On November 12, 1980, it flew past Saturn.') },
      { title: B('淡藍色小點', 'The Pale Blue Dot'), img: 'PIA00452',
        text: B('1990 年 2 月 14 日，飛過海王星與冥王星的軌道之後，它的相機轉頭拍下太陽系的「全家福」。其中一張裡，地球只是一個不到一個像素的小點——「淡藍色小點」，距離約 40 億英里（60 億公里）。',
                'On February 14, 1990, after passing the orbits of Neptune and Pluto, its camera turned back to take a “family portrait” of the solar system. In one picture Earth is less than a single pixel: the “Pale Blue Dot”, about 4 billion miles (6 billion kilometers) away.') },
      { title: B('2012：走出太陽的泡泡', '2012: leaving the Sun’s bubble'), img: 'PIA17048',
        text: B('2012 年 8 月 25 日，航海家1號穿出太陽影響的範圍（日球層），成為第一個進入星際空間的人造物，也是距離地球最遠的人造物。',
                'On August 25, 2012, Voyager 1 passed beyond the Sun’s realm of plasma influence (the heliosphere), becoming the first human-made object to reach interstellar space and the most distant one.') },
      { title: B('越來越少的電', 'Less and less power'),
        text: B('它的電力來自核能電池，每年會少約 4 瓦。為了讓探測器活下去，工程師只好一個一個關掉科學儀器。2026 年 4 月 17 日，NASA 關掉了低能帶電粒子儀；現在只剩 2 個科學儀器還在工作：電漿波與磁場。',
                'Its power comes from a nuclear power source that loses about 4 watts every year. To keep it alive, engineers switch off science instruments one by one. On April 17, 2026, NASA turned off the low-energy charged particle instrument; only two science instruments still operate: plasma waves and magnetic fields.') },
      { title: B('一天的距離', 'One day away'),
        text: B('現在，航海家1號的訊號單程要走約 23 小時 58 分鐘，快要滿 1 光日（NASA 預計 2026 年 11 月 18 日）。你傳出一個指令，要等一天才會到，再等一天才能聽到回覆。',
                'Now a signal takes about 23 hours 58 minutes one way, almost one light-day (NASA expects this on November 18, 2026). Send a command and it arrives a day later; the reply takes another day.') }
    ],
    hardware: [
      { icon: '🔋', name: B('核能電池', 'Radioisotope power source'), short: B('用放射性物質的熱發電', 'Makes power from radioactive heat'),
        how: B('離太陽太遠，太陽能板用不上。探測器用放射性物質衰變產生的熱來發電；衰變慢慢減弱，所以每年少約 4 瓦。', 'Too far from the Sun for solar panels. The probe turns the heat from decaying radioactive material into electricity; the decay slowly fades, so it loses about 4 watts each year.'),
        why: B('這個數字決定了：每一年都要關掉更多東西。', 'That number decides it: every year something more must be switched off.') },
      { icon: '📡', name: B('大型天線', 'Big dish antenna'), short: B('與地球通訊的唯一管道', 'The only link to Earth'),
        how: B('圓盤形天線對準地球，把資料傳回；因為距離太遠，訊號非常微弱，地球要用大型天線才聽得到。', 'The dish points at Earth to send data back. The signal is extremely faint, so Earth needs big antennas to hear it.'),
        why: B('天線必須對準地球，否則就會失聯。', 'It must stay pointed at Earth or contact is lost.') },
      { icon: '🧲', name: B('磁場計', 'Magnetometer'), short: B('仍在工作', 'Still working'),
        how: B('測量探測器周圍的磁場，幫助科學家了解星際空間的環境。', 'Measures the magnetic field around the probe, helping scientists understand interstellar space.'),
        why: B('NASA 目前優先保留它與電漿波儀。', 'NASA is currently keeping it and the plasma wave instrument.') },
      { icon: '🔊', name: B('電漿波儀', 'Plasma wave instrument'), short: B('仍在工作', 'Still working'),
        how: B('偵測星際空間裡帶電氣體（電漿）的振動，科學家可以把它轉換成聲音來「聽」。', 'Detects vibrations in the charged gas (plasma) of interstellar space, which scientists can turn into sound.'),
        why: B('這是人類第一次直接「聽」到星際空間。', 'It lets us “hear” interstellar space directly for the first time.') },
      { icon: '💿', name: B('金唱片', 'Golden Record'), short: B('寫給宇宙的信（見任務 5）', 'A letter to the universe (see mission 5)'),
        how: B('一張 12 吋鍍金唱片，裝載地球的圖像、聲音與音樂。', 'A 12-inch gold-plated record carrying images, sounds and music of Earth.'),
        why: B('如果有朝一日被其他文明發現，它就是人類的自我介紹。', 'If another civilization ever finds it, it is humanity’s introduction.') }
    ],
    challenges: {
      1: { type: 'order', title: B('航海家1號的旅程', 'Voyager 1’s journey'),
        scenario: B('把航海家1號的重要事件，依發生的先後順序排好。', 'Put Voyager 1’s big moments in the order they happened.'),
        items: [
          { id: 'a', t: B('1977：從地球出發', '1977: leaves Earth') },
          { id: 'b', t: B('1979：近看木星', '1979: close to Jupiter') },
          { id: 'c', t: B('1980：飛過土星', '1980: passes Saturn') },
          { id: 'd', t: B('1990：回頭拍下「淡藍色小點」', '1990: looks back and photographs the Pale Blue Dot') },
          { id: 'e', t: B('2012：進入星際空間', '2012: enters interstellar space') }
        ],
        hint: B('想想：先到最近的行星，最後才離開太陽系。', 'Think: nearest planets first, leaving the solar system last.'),
        explain: B('航海家1號先拜訪木星與土星，再一路飛向太陽系外。回頭拍地球是在 1990 年，進入星際空間在 2012 年。', 'Voyager 1 visited Jupiter and Saturn, then flew outward. It looked back at Earth in 1990 and entered interstellar space in 2012.'),
        success: B('你把 35 年的旅程排好了！', 'You ordered 35 years of travel!') },
      2: { type: 'calc', title: B('等一天、再等一天', 'Wait a day, then wait again'),
        scenario: B('航海家1號的訊號單程要走大約 24 小時（NASA 數據：23 小時 58 分）。', 'A signal to Voyager 1 takes about 24 hours one way (NASA: 23 h 58 min).'),
        questions: [
          { q: B('你從地球傳出一個指令。要確認探測器「收到了、有照做」，至少要等多少天？（指令去 + 回覆回來）', 'You send a command from Earth. How many days at least until you can confirm it was received and carried out? (command out + reply back)'), answer: 2, tol: 0.1, unit: B('天', 'days'),
            hint: B('去 24 小時，回來也要 24 小時。', '24 hours there, 24 hours back.'), explain: B('1 天 + 1 天 = 2 天。所以航海家1號幾乎不能「即時」操作。', '1 day + 1 day = 2 days. So Voyager 1 can hardly be operated in real time.') },
          { q: B('光一秒走約 30 萬公里。「1 光日」就是光走 1 天的距離。1 天有幾秒？', 'Light travels about 300,000 km each second. A “light-day” is how far light goes in a day. How many seconds are in a day?'), answer: 86400, tol: 1, unit: B('秒', 'seconds'),
            hint: B('24 × 60 × 60。', '24 × 60 × 60.'), explain: B('24 × 3,600 = 86,400 秒。所以 1 光日 ≈ 86,400 光秒——航海家1號現在就差不多在這個距離上。', '24 × 3,600 = 86,400 seconds. So one light-day ≈ 86,400 light-seconds, about where Voyager 1 is now.') }
        ],
        success: B('你明白為什麼要等這麼久：太空太大，光也要走很久。', 'You see why the wait is so long: space is huge and even light takes time.') },
      3: { type: 'budget', title: B('誰先關機？', 'Who switches off first?'),
        scenario: B('你是任務工程師。核能電池每年少 4 個單位（遊戲設定，用來示意每年少約 4 瓦）。維生系統一定要保住；每一年，在剩下的電裡選擇要開哪些科學儀器。', 'You are the mission engineer. The power source loses 4 units a year (game setting inspired by the real ~4 W per year). Life support must stay; each year choose which science instruments to keep within the remaining power.'),
        unit: B('單位', 'units'), items: items,
        rounds: [
          { label: B('第 1 年：24 單位', 'Year 1: 24 units'), capacity: 24, minValue: 9, explain: B('電還夠時，三個儀器可以同時開。', 'While power lasts you can run three instruments.') },
          { label: B('第 2 年：20 單位', 'Year 2: 20 units'), capacity: 20, minValue: 6, explain: B('耗電少的儀器 CP 值最高。', 'The low-power instruments give the best value.') },
          { label: B('第 3 年：16 單位', 'Year 3: 16 units'), capacity: 16, minValue: 3, explain: B('只能留一個。NASA 真實的決定也是優先保留磁場與電漿波儀。', 'Only one fits. NASA’s real choice also prioritized the magnetometer and plasma wave instrument.') },
          { label: B('第 4 年：12 單位', 'Year 4: 12 units'), capacity: 12, minValue: 0, explain: B('只剩維生系統。探測器仍然「活著」，只是不再做科學——這是工程師最不想做、卻必須做的決定。', 'Only life support is left. The probe is still “alive”, just no longer doing science: the decision engineers least want to make, but must.') }
        ],
        note: B('遊戲設定：各儀器耗電與科學價值為簡化示意，不是 NASA 的實測數字。', 'Game setting: the power use and science value of each instrument are simplified, not NASA data.'),
        success: B('你體會到任務主管的難題：資源一直減少，要決定最後保留什麼。', 'You felt the mission director’s dilemma: with shrinking resources, what do you keep to the end?') },
      4: { type: 'calc', title: B('用數字看航海家1號', 'Voyager 1 by the numbers'),
        scenario: B('NASA 公布：航海家1號的單程光時間是 23:58:53（時:分:秒）。光速約 299,792 公里／秒。', 'NASA reports Voyager 1’s one-way light time as 23:58:53 (h:m:s). The speed of light is about 299,792 km/s.'),
        questions: [
          { q: B('先把光時間換成秒，再乘以光速。航海家1號離地球約多少十億公里？', 'Convert the light time to seconds and multiply by the speed of light. About how many billions of kilometers away is Voyager 1?'), answer: 25.9, tol: 0.3, unit: B('十億公里', 'billion km'),
            hint: B('23 × 3600 + 58 × 60 + 53 = 86,333 秒。再乘以 299,792。', '23 × 3600 + 58 × 60 + 53 = 86,333 s. Then × 299,792.'), explain: B('86,333 × 299,792 ≈ 2.59 × 10¹⁰ 公里，約 259 億公里。', '86,333 × 299,792 ≈ 2.59 × 10¹⁰ km, about 25.9 billion km.') },
          { q: B('1990 年「淡藍色小點」拍攝時，距離約 60 億公里。現在的距離大約是當時的幾倍？', 'When the Pale Blue Dot was taken in 1990, Voyager 1 was about 6 billion km away. About how many times farther is it now?'), answer: 4.3, tol: 0.3, unit: B('倍', 'times'),
            hint: B('25.9 ÷ 6。', '25.9 ÷ 6.'), explain: B('25.9 ÷ 6 ≈ 4.3 倍。', '25.9 ÷ 6 ≈ 4.3 times.') },
          { q: B('核能電池每年少 4 瓦。假設現在剩下的科學電力是 14 瓦，一個儀器要 5 瓦。第幾年起，剩餘電力會低於 5 瓦（連 1 個儀器都撐不住）？', 'The power source loses 4 W a year. Suppose 14 W remain for science and one instrument needs 5 W. From which year will the remaining power fall below 5 W (not even one instrument)?'), answer: 3, tol: 0.1, unit: B('第幾年', 'year'),
            hint: B('14 → 10 → 6 → ?', '14 → 10 → 6 → ?'), explain: B('14 → 10（第 1 年）→ 6（第 2 年）→ 2（第 3 年），第 3 年起低於 5 瓦。', '14 → 10 (year 1) → 6 (year 2) → 2 (year 3): below 5 W from year 3.') }
        ],
        note: B('遊戲設定：「剩餘 14 瓦、一個儀器 5 瓦」為示意數字。距離會隨時間變動，數字取自 NASA 當日公布資料。', 'Game setting: “14 W left, 5 W per instrument” is illustrative. The distance changes over time; the figure comes from NASA’s published value.'),
        success: B('你像任務主管一樣，從一個光時間推算出了距離，並預測了電力的終點。', 'Like a mission director, you derived the distance from a light time and predicted when the power runs out.') }
    },
    science: [
      { icon: '🪐', t: B('1979 年傳回木星的近距離影像，之後拜訪土星，開啟「外行星大巡航」。', 'Returned close-up images of Jupiter in 1979 and then visited Saturn, opening the “Grand Tour” of the outer planets.') },
      { icon: '🌍', t: B('1990 年拍下「淡藍色小點」，讓人看見地球在太空中有多小。', 'In 1990 it took the “Pale Blue Dot”, showing how small Earth looks from space.') },
      { icon: '🫧', t: B('2012 年成為第一個進入星際空間的人造物，直接量測太陽影響範圍之外的環境。', 'In 2012 it became the first human-made object in interstellar space, measuring the environment beyond the Sun’s influence.') },
      { icon: '🎧', t: B('電漿波儀讓科學家「聽」到了星際空間的電漿振動。', 'Its plasma wave instrument let scientists “hear” plasma vibrations in interstellar space.') }
    ],
    ending: B('航海家1號到今天仍在工作。工程師仍然一年一年地管理它的電力，讓它盡量久地繼續回報。它已接近 1 光日之外，也是人類離開地球最遠的使者。',
              'Voyager 1 is still working today. Engineers manage its power year by year so it can keep reporting as long as possible. It is nearly one light-day away, humanity’s farthest messenger.'),
    endImg: 'PIA17048',
    sources: [
      { label: 'NASA: Where Are Voyager 1 and 2 Now?', url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/', note: B('單程光時間 23:58:53', 'One-way light time 23:58:53') },
      { label: 'NASA: Shuts Off Instrument on Voyager 1 (2026/4/17)', url: 'https://science.nasa.gov/blogs/voyager/2026/04/17/nasa-shuts-off-instrument-on-voyager-1-to-keep-spacecraft-operating/', note: B('每年約少 4 瓦；剩 2 個儀器', '~4 W lost per year; two instruments left') },
      { label: 'JPL: NASA Turns Off 2 Voyager Science Instruments', url: 'https://www.jpl.nasa.gov/news/nasa-turns-off-two-voyager-science-instruments-to-extend-mission/', note: B('電力下降', 'Declining power') },
      { label: 'NASA Science: Voyager Spacecraft', url: 'https://science.nasa.gov/mission/voyager/spacecraft/', note: B('3 個核能電池（RTG）、3.7 公尺天線、相機 1990/2/14 關閉', 'Three RTGs, 3.7 m antenna, cameras off Feb 14, 1990') },
      { label: 'NASA History: Voyager 1 begins its journey', url: 'https://www.nasa.gov/history/45-years-ago-voyager-1-begins-its-epic-journey-to-the-outer-planets-and-beyond/', note: B('1977/9/5 發射', 'Launched Sept 5, 1977') },
      { label: 'NASA SVS: Voyager 1 trajectory', url: 'https://svs.gsfc.nasa.gov/4139', note: B('1980/11/12 土星飛掠', 'Saturn flyby Nov 12, 1980') },
      { label: 'NASA SVS: Revisiting the Pale Blue Dot at 30', url: 'https://svs.gsfc.nasa.gov/13544/', note: B('淡藍色小點 1990/2/14', 'Pale Blue Dot, Feb 14, 1990') },
      { label: 'NASA Voyager FAQ', url: 'https://science.nasa.gov/mission/voyager/frequently-asked-questions/', note: B('2012/8/25 進入星際空間', 'Interstellar space, Aug 25, 2012') },
      { label: 'EarthSky: Voyager 1 one light-day', url: 'https://earthsky.org/space/voyager-1-1-light-day-from-earth-november-17-18-2026/', note: B('預計 2026/11/18 達 1 光日', 'Expected one light-day on Nov 18, 2026') },
      { label: 'NASA Image Library: PIA00029', url: 'https://images.nasa.gov/details/PIA00029', note: B('木星近距離影像', 'Jupiter close-up') }
    ]
  });
})();
