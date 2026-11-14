/* 任務 6 月球登陸：4 位角色（對應 4 個難度）與各自的專屬任務。
   角色姓名皆為虛構；職稱對應真實的任務職務（登月艙駕駛員 LM pilot、月球車工程師、計畫科學家、專案經理，見 NSSDCA 頁面的 Personnel）。
   專屬任務的數字來自 NSSDCA（登月艙質量、月球車質量）與 NSSDCA Moon Fact Sheet（月球／地球表面重力）。 */
(function () {
  var B = window.B;
  window.ROLES = window.ROLES || {};
  window.ROLES.apollo = [
    { level: 1, icon: '🧑‍🚀', name: B('艾蜜莉亞·克勞', 'Amelia Crowe'), job: B('登月艙駕駛員（lunar module pilot）', 'Lunar module pilot'),
      bio: B('登月艙駕駛員和指揮官一起操作登月艙：降落、在月面工作、再起飛回到軌道。老鷹號在月面只待了 21 小時 36 分，每一步都要照順序做。',
             'The lunar module pilot works with the commander to fly the lander: touch down, work on the surface, then lift off back to orbit. Eagle spent only 21 hours 36 minutes on the Moon, so every step had to be done in order.'),
      stars: 1, tip: B('看圖、排出步驟', 'Read pictures, plan the steps'),
      quest: { type: 'calc', title: B('專屬任務：登月艙的質量帳', 'Role mission: the lunar module’s mass ledger'),
        scenario: B('登月艙總質量是 15,103 公斤。NASA 的資料：上升段乾質量 2,445 公斤、推進劑 2,376 公斤；下降段乾質量 2,034 公斤、推進劑 8,248 公斤。', 'The lunar module’s total mass was 15,103 kg. NASA data: ascent stage dry mass 2,445 kg and propellant 2,376 kg; descent stage dry mass 2,034 kg and propellant 8,248 kg.'),
        questions: [
          { q: B('上升段（乾質量＋推進劑）一共多少公斤？', 'What is the ascent stage’s total mass (dry mass + propellant)?'), answer: 4821, tol: 1, unit: B('公斤', 'kg'),
            hint: B('2,445 + 2,376。', '2,445 + 2,376.'), explain: B('2,445 + 2,376 = 4,821 公斤。', '2,445 + 2,376 = 4,821 kg.') },
          { q: B('下降段（乾質量＋推進劑）一共多少公斤？', 'What is the descent stage’s total mass (dry mass + propellant)?'), answer: 10282, tol: 1, unit: B('公斤', 'kg'),
            hint: B('2,034 + 8,248。', '2,034 + 8,248.'), explain: B('2,034 + 8,248 = 10,282 公斤。兩段加起來剛好是 15,103 公斤。', '2,034 + 8,248 = 10,282 kg. The two stages add up to exactly 15,103 kg.') },
          { q: B('出發時，下降段占登月艙總質量的百分之幾？（取到整數）', 'At the start, what percent of the lunar module’s total mass was the descent stage? (nearest whole number)'), answer: 68, tol: 0.6, unit: '%',
            hint: B('10,282 ÷ 15,103，再乘 100。', '10,282 ÷ 15,103, then × 100.'), explain: B('10,282 ÷ 15,103 ≈ 0.68，約 68%。', '10,282 ÷ 15,103 ≈ 0.68, about 68%.') }
        ],
        success: B('你算出：出發時，登月艙約有 68% 的質量屬於下降段（含它的推進劑）。', 'You found that at the start about 68% of the lunar module’s mass was the descent stage (with its propellant).') } },

    { level: 2, icon: '🧑‍🔧', name: B('馬可·德爾加多', 'Marco Delgado'), job: B('月球車（LRV）工程師', 'Lunar Roving Vehicle (LRV) engineer'),
      bio: B('月球車工程師要讓一輛能折疊、靠電池、在低重力與真空中工作的電動車，在月球上可靠運作。月球車只花了 17 個月就完成開發。',
             'A rover engineer has to make a foldable, battery-powered electric vehicle work reliably in the Moon’s low gravity and vacuum. The rover was developed in only 17 months.'),
      stars: 2, tip: B('做取捨、簡單計算', 'Make trade-offs, simple maths'),
      quest: { type: 'choice', title: B('專屬任務：月球車工程師的兩個判斷', 'Role mission: the rover engineer’s two judgments'),
        scenario: B('工程師沒有「完美答案」，只有最合理的取捨。選出你認為最好的答案。', 'An engineer has no perfect answer, only the most reasonable trade-off. Pick the best answer.'),
        questions: [
          { q: B('月球車要先折疊起來，收在登月艙下降段的一個艙位裡，帶到月球。這個限制，對設計影響最大的是什麼？', 'The rover had to ride folded in a bay of the lunar module’s descent stage. What did this limit affect most in the design?'),
            options: [
              { t: B('車子越大越好，到了月球再想辦法', 'The bigger the better; sort it out on the Moon'), why: B('艙位的大小是固定的，車子太大就放不進去。', 'The bay has a fixed size; a vehicle that is too big would not fit.') },
              { t: B('車子要能折疊收進艙位，到月面後能展開並鎖定', 'The rover must fold into the bay and then unfold and lock into place on the Moon'), correct: true, why: B('對！月球車的車架是三段式、中間有鉸鏈，折起來掛在登月艙的第 1 艙；到了月面，太空人用繩索和捲軸把它放下、展開，各部分會鎖定。', 'Right! The frame was a three-part chassis hinged in the middle, folded and hung in the lunar module’s quad 1 bay. On the Moon the astronauts lowered it with ropes and reels and it locked into place as it opened.') },
              { t: B('只要電池夠大，其他都不重要', 'As long as the battery is big, nothing else matters'), why: B('電池再大，放不進艙位也沒有用。', 'A big battery is useless if the rover does not fit the bay.') },
              { t: B('車架一定要用最重的材料才耐用', 'The frame must use the heaviest material to be durable'), why: B('車架是鋁合金管焊成的，整輛車質量只有 210 公斤；重量也受到登月艙限制。', 'The frame was welded aluminum alloy tubing and the whole rover had a mass of only 210 kg; weight was limited by the lunar module too.') }
            ] },
          { q: B('月球車只花 17 個月開發，工程師卻做了靜態模型、1/6 重力展開測試模型、振動測試單元、訓練車等許多模型。為什麼？', 'The rover was developed in only 17 months, yet engineers built a static model, 1/6-gravity deployment models, a vibration test unit, a trainer and more. Why?'),
            options: [
              { t: B('因為模型越多，預算看起來越多', 'More models make the budget look bigger'), why: B('做模型是為了降低風險，不是為了預算。', 'Models were built to reduce risk, not to pad the budget.') },
              { t: B('在地面先試過展開、發射時的震動、對登月艙平衡的影響和操作訓練，到月球才不會出大問題', 'To test deployment, launch vibration, the effect on the lunar module’s balance and driver training on the ground, so there would be no big problems on the Moon'), correct: true, why: B('對！NASA 的資料說，月球車在月球上完成了所有功能，沒有重大異常。', 'Right! NASA’s record says the rover performed all its functions on the Moon with no major anomalies.') },
              { t: B('因為月球上可以把壞掉的地方現場修好很多次', 'Because anything that broke could be repaired many times on the Moon'), why: B('在月球上很難維修，所以要在地面先把問題找出來。', 'Repairs on the Moon are very hard, so problems must be found on the ground first.') },
              { t: B('這些模型只是用來展示，沒有真的測試', 'The models were only for display and were not really tested'), why: B('每種模型都有測試用途，例如展開機構、振動耐受度和訓練。', 'Each model had a test purpose, such as the deployment mechanism, vibration durability and training.') }
            ] }
        ],
        success: B('你做了和真正工程團隊一樣的判斷：先在地面把風險試完。', 'You made the same call a real engineering team would: test the risks on the ground first.') } },

    { level: 3, icon: '🧑‍🔬', name: B('亨利·歐斯曼', 'Henry Osman'), job: B('阿波羅月面實驗計畫科學家', 'Apollo lunar surface experiments program scientist'),
      bio: B('月面實驗科學家要決定：太空人離開後，哪些儀器可以留在月面繼續工作？再用數字說明它們傳回了什麼，以及月球車能把人帶多遠。',
             'A lunar surface experiments scientist decides which instruments can stay on the Moon to keep working after the astronauts leave, then uses numbers to show what they returned and how far a rover could take people.'),
      stars: 3, tip: B('用公式推理', 'Reason with formulas'),
      quest: { type: 'calc', title: B('專屬任務：月球車的重量', 'Role mission: how much does the rover weigh?'),
        scenario: B('重量＝質量 × 重力加速度。月球車質量 210 公斤，還能再載 490 公斤。月球表面重力 1.62 m/s²，地球約 9.8 m/s²（NASA 月球資料表）。', 'Weight = mass × gravitational acceleration. The rover had a mass of 210 kg and could carry another 490 kg. Moon surface gravity is 1.62 m/s² and Earth’s is about 9.8 m/s² (NASA Moon Fact Sheet).'),
        questions: [
          { q: B('月球車（210 公斤）在地球上的重量是多少牛頓？', 'What would the rover (210 kg) weigh on Earth, in newtons?'), answer: 2058, tol: 5, unit: B('牛頓', 'N'),
            hint: B('210 × 9.8。', '210 × 9.8.'), explain: B('210 × 9.8 = 2,058 牛頓。', '210 × 9.8 = 2,058 N.') },
          { q: B('同一輛車在月球上的重量是多少牛頓？', 'What does the same rover weigh on the Moon, in newtons?'), answer: 340.2, tol: 1, unit: B('牛頓', 'N'),
            hint: B('210 × 1.62。', '210 × 1.62.'), explain: B('210 × 1.62 = 340.2 牛頓。', '210 × 1.62 = 340.2 N.') },
          { q: B('載滿 490 公斤的東西，總質量 700 公斤，在月球上的重量是多少牛頓？', 'Loaded with 490 kg, the total mass is 700 kg. What does it weigh on the Moon, in newtons?'), answer: 1134, tol: 2, unit: B('牛頓', 'N'),
            hint: B('700 × 1.62。', '700 × 1.62.'), explain: B('700 × 1.62 = 1,134 牛頓。', '700 × 1.62 = 1,134 N.') },
          { q: B('月球的重力是地球的百分之幾？（1.62 ÷ 9.8，取到小數點 1 位）', 'What percent of Earth’s gravity is the Moon’s? (1.62 ÷ 9.8, one decimal)'), answer: 16.5, tol: 0.3, unit: '%',
            hint: B('大約是六分之一。', 'It is about one sixth.'), explain: B('1.62 ÷ 9.8 ≈ 0.165，約 16.5%，也就是大約 1/6。', '1.62 ÷ 9.8 ≈ 0.165, about 16.5%, roughly 1/6.') }
        ],
        note: B('質量不會因為去月球而改變，改變的是重量。', 'Mass does not change on the Moon; weight does.'),
        success: B('你算出：同一輛月球車在月球上的重量，只有在地球上的約 1/6。', 'You found the same rover weighs only about 1/6 as much on the Moon as on Earth.') } },

    { level: 4, icon: '🧑‍💼', name: B('諾拉·費爾班克斯', 'Nora Fairbanks'), job: B('登月艙專案經理（NASA 詹森太空中心）', 'Lunar module project manager (NASA Johnson Space Center)'),
      bio: B('專案經理要把工程原因、證據和不確定性分清楚，才能向大眾說明：哪些硬體留在月面、哪些下落不明，以及為什麼。',
             'A project manager keeps the engineering reasons, the evidence and the uncertainty apart, so the public can understand which hardware was left on the Moon, which is unaccounted for, and why.'),
      stars: 4, tip: B('整合條件、判斷風險', 'Combine constraints, judge risk'),
      quest: { type: 'choice', title: B('專屬任務：留在月面的實驗站', 'Role mission: the experiment stations left on the Moon'),
        scenario: B('專案經理沒有「完美答案」，只有最合理的說明。選出你認為最好的答案。', 'A project manager has no perfect answer, only the most reasonable explanation. Pick the best answer.'),
        questions: [
          { q: B('EASEP 在 1969 年 8 月 27 日不再回應指令。你要怎麼寫進任務報告？', 'EASEP stopped accepting commands on August 27, 1969. How do you write it in the mission report?'),
            options: [
              { t: B('失敗了，白放了', 'It failed, a waste'), why: B('它在兩個月晝期間傳回地震與塵埃的資料，運作正常，不能說白放。', 'It sent seismic and dust data over two lunar days and worked normally, so it was not wasted.') },
              { t: B('它在兩個月晝期間運作，之後不再接受指令而結束；它是後來 ALSEP 實驗包的先行版本', 'It worked through two lunar days and then stopped accepting commands; it was the forerunner of the later ALSEP packages'), correct: true, why: B('對！EASEP 是後來阿波羅各任務 ALSEP 的先行版本，阿波羅 15 號的 ALSEP 中央站就運作到 1977 年。', 'Right! EASEP was the forerunner of the ALSEP packages of later Apollo missions; Apollo 15’s ALSEP central station ran until 1977.') },
              { t: B('因為太空人沒有維修，是人為疏失', 'Because the astronauts did not repair it; human error'), why: B('資料沒有這樣說。EASEP 本來就是布置在月面、留在原地的實驗。', 'The record does not say that. EASEP was meant to be set up on the Moon and left there.') },
              { t: B('它到現在還在運作', 'It is still working today'), why: B('NASA 的資料寫明它在 1969 年 8 月 27 日之後不再回應指令。', 'NASA’s record says it stopped accepting commands after August 27, 1969.') }
            ] },
          { q: B('阿波羅 15 號的 ALSEP 中央站在 1971 年 7 月 31 日開機，1977 年 9 月 30 日與其他 ALSEP 站一起關機。這代表什麼？', 'Apollo 15’s ALSEP central station was switched on on July 31, 1971 and shut down with the other ALSEP stations on September 30, 1977. What does this show?'),
            options: [
              { t: B('太空人在月面待了 6 年', 'The astronauts stayed on the Moon for 6 years'), why: B('阿波羅 15 號的太空人在月面活動共約 18 小時 35 分，只待了幾天。', 'Apollo 15’s astronauts spent about 18 hours 35 minutes on moonwalks and stayed only a few days.') },
              { t: B('儀器留在月面，太空人離開後還能繼續工作約 6 年', 'The instruments stayed on the Moon and kept working for about six years after the astronauts left'), correct: true, why: B('對！這就是「把儀器留下」的價值：太空人只待幾天，儀器卻能長期傳回資料。', 'Right! That is the value of leaving instruments behind: the astronauts stayed days, but the instruments returned data for years.') },
              { t: B('儀器開機之後就不能關機', 'Once switched on, the instruments could never be switched off'), why: B('資料寫的是 1977 年 9 月 30 日全部 ALSEP 站台被關機。', 'The record says all ALSEP stations were shut down on September 30, 1977.') },
              { t: B('同一台儀器一直在月面移動', 'The same instrument kept moving around the Moon'), why: B('ALSEP 是放在固定位置的實驗站，不會移動。', 'ALSEP was a stationary experiment station and did not move.') }
            ] }
        ],
        success: B('你用證據向大眾說明：留在月面的儀器，讓短短幾天的任務變成長達數年的科學。', 'You used evidence to show that instruments left on the Moon turned a few days of mission into years of science.') } }
  ];
})();
