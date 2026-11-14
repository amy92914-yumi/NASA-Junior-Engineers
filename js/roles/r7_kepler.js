/* 任務 7 Kepler / K2：4 位角色（對應 4 個難度）與各自的專屬任務。
   角色姓名皆為虛構；職稱對應真實的任務職務（光變曲線分析、姿態控制、觀測計畫、計畫科學家）。
   專屬任務的數字來自 NASA Science 的 Kepler / K2 任務頁（Kepler-4b 到 8b、Kepler-11、19 個觀測季、150,000 與 50 萬顆星、20–50%）。 */
(function () {
  var B = window.B;
  window.ROLES = window.ROLES || {};
  window.ROLES.kepler = [
    { level: 1, icon: '🧑‍💻', name: B('莉娜·費雪', 'Lena Fischer'), job: B('光變曲線分析員（light-curve analyst）', 'Light-curve analyst'),
      bio: B('光變曲線分析員每天看星星的亮度變化圖，找出那些規律出現的小凹陷。每發現一個可能的行星，都要再仔細檢查，確定不是雜訊。',
             'A light-curve analyst looks at charts of star brightness every day, searching for small dips that come on a regular schedule. Each possible planet gets checked carefully to make sure it is not just noise.'),
      stars: 1, tip: B('看圖、數一數', 'Read charts, count things'),
      quest: { type: 'calc', title: B('專屬任務：數一數 Kepler 的發現', 'Role mission: count Kepler’s discoveries'),
        scenario: B('NASA 的資料：Kepler 上線的頭六週，找到 5 顆行星（Kepler-4b、5b、6b、7b、8b）。2011 年公布的 Kepler-11 有 6 顆行星，離地球約 2,000 光年。', 'NASA data: in its first six weeks Kepler found five planets (Kepler-4b, 5b, 6b, 7b and 8b). Kepler-11, announced in 2011, has six planets and lies about 2,000 light-years from Earth.'),
        questions: [
          { q: B('Kepler-4b、5b、6b、7b、8b 一共幾顆行星？', 'How many planets are Kepler-4b, 5b, 6b, 7b and 8b altogether?'), answer: 5, tol: 0.1, unit: B('顆', 'planets'),
            hint: B('名字後面的字母 b 代表「這顆星的第一顆行星」，這五個名字是五顆不同恆星的行星；數一數有幾個名字。', 'The b means each is the first planet found around its own star; these are five names, so count the names.'), explain: B('4b、5b、6b、7b、8b：5 顆。', '4b, 5b, 6b, 7b, 8b: five planets.') },
          { q: B('再加上 Kepler-11 的 6 顆行星，一共幾顆？', 'Add the six planets of Kepler-11. How many planets in all?'), answer: 11, tol: 0.1, unit: B('顆', 'planets'),
            hint: B('5 + 6。', '5 + 6.'), explain: B('5 + 6 = 11 顆。', '5 + 6 = 11 planets.') },
          { q: B('Kepler-11 約 2,000 光年遠。光一年走一光年，所以現在看到的 Kepler-11 星光，大約在幾年前出發？', 'Kepler-11 is about 2,000 light-years away. Light travels one light-year per year, so about how many years ago did the Kepler-11 starlight we see set out?'), answer: 2000, tol: 1, unit: B('年', 'years'),
            hint: B('1 光年就是光走 1 年的距離。', 'One light-year is the distance light travels in one year.'), explain: B('約 2,000 年前。我們看到的是很久以前出發的星光。', 'About 2,000 years ago. We see starlight that left long ago.') }
        ],
        success: B('你數出來了：頭六週的 5 顆，加上 Kepler-11 的 6 顆，是 11 顆行星。', 'You counted it: five from the first six weeks plus six at Kepler-11 makes 11 planets.') } },

    { level: 2, icon: '🧑‍🔧', name: B('托馬斯·里維拉', 'Tomás Rivera'), job: B('姿態控制工程師（attitude-control engineer）', 'Attitude-control engineer'),
      bio: B('姿態控制工程師負責讓太空船「對準」：用反作用輪和星追蹤器，把望遠鏡穩穩對著目標。反作用輪壞掉時，就要想別的辦法。',
             'An attitude-control engineer makes sure the spacecraft is aimed right: reaction wheels and star trackers hold the telescope on its target. When a wheel breaks, you need another way.'),
      stars: 2, tip: B('做判斷、說出原因', 'Make a call, give a reason'),
      quest: { type: 'choice', title: B('專屬任務：姿態控制工程師的兩個判斷', 'Role mission: the attitude-control engineer’s two judgments'),
        scenario: B('工程師沒有「完美答案」，只有最合理的取捨。選出你認為最好的答案。', 'An engineer has no perfect answer, only the most reasonable trade-off. Pick the best answer.'),
        questions: [
          { q: B('2013 年第二顆反作用輪壞了，Kepler 只剩兩顆能用的輪子。後來 K2 靠什麼辦法繼續維持指向？', 'In 2013 the second reaction wheel failed, leaving Kepler two working wheels. What did K2 use to keep its pointing afterwards?'),
            options: [
              { t: B('把望遠鏡送回地球修理', 'Bring the telescope back to Earth for repair'), why: B('Kepler 在遠離地球的軌道上，沒有被帶回來。', 'Kepler was in an orbit far from Earth and was never brought back.') },
              { t: B('用陽光的壓力幫忙維持指向，像獨木舟順著水流調整方向', 'Use the pressure of sunlight to help hold the pointing, like a kayak steering into the current'), correct: true, why: B('對！陽光原本是干擾（會推動太空船），工程師把它變成幫手。', 'Right! Sunlight had been a disturbance pushing the spacecraft, and the engineers turned it into a helper.') },
              { t: B('等太陽停止發光', 'Wait for the Sun to stop shining'), why: B('太陽不會停，Kepler 的電力還要靠它。', 'The Sun does not stop, and Kepler needs it for power.') },
              { t: B('把所有的燃料一次噴完', 'Burn all the fuel at once'), why: B('那樣反而會讓任務提早結束。', 'That would only end the mission early.') }
            ] },
          { q: B('K2 這個新任務，需要團隊定期做什麼事？', 'What did the new K2 mission require the team to do regularly?'),
            options: [
              { t: B('一直盯著同一片天區，永遠不換', 'Stare at the same patch of sky forever'), why: B('這是原本任務的做法，故障後做不到了。', 'That was the original mission’s way, and it could no longer be done after the failure.') },
              { t: B('大約每三個月，就把視野移到天空的新區域（一個「觀測季」）', 'Shift the field of view to a new part of the sky roughly every three months (a “campaign”)'), correct: true, why: B('對！K2 沿著黃道面掃描更大的範圍，每個觀測季看一片新天區。', 'Right! K2 scanned a larger swath along the ecliptic plane, observing a new field in each campaign.') },
              { t: B('每天把太空船轉一圈', 'Spin the spacecraft once a day'), why: B('NASA 的說明沒有這樣的做法。', 'NASA’s description does not include that.') },
              { t: B('只觀測太陽系裡的行星', 'Observe only planets inside our own solar system'), why: B('K2 還是找系外行星，並增加了太陽系內天體、爆炸恆星等研究。', 'K2 still hunted exoplanets, and added studies of solar system objects, exploded stars and more.') }
            ] }
        ],
        success: B('你做了和真正工程團隊一樣的判斷：把干擾變成幫手。', 'You made the same call a real engineering team would: turn the disturbance into a helper.') } },

    { level: 3, icon: '🧑‍🔬', name: B('葛蕾絲·奧科羅', 'Grace Okoro'), job: B('觀測計畫規劃師（observation planner）', 'Observation planner'),
      bio: B('觀測計畫規劃師要決定：望遠鏡接下來看哪一片天、看多久，燃料夠不夠。K2 的規劃要算清楚每一個觀測季。',
             'An observation planner decides which patch of sky the telescope looks at next, for how long, and whether the fuel is enough. K2’s planning meant counting every campaign carefully.'),
      stars: 3, tip: B('用數字比較', 'Compare with numbers'),
      quest: { type: 'calc', title: B('專屬任務：K2 的觀測季', 'Role mission: K2’s campaigns'),
        scenario: B('NASA 的資料：K2 大約每三個月換一片天區（一個觀測季）。團隊原本估計剩下的燃料能做 10 個觀測季，最後做了 19 個。原本任務盯著約 150,000 顆星，K2 讓調查過的星星總數增加到 50 萬顆以上。', 'NASA data: K2 shifted to a new field roughly every three months (a campaign). The team first estimated the remaining fuel for 10 campaigns and ended up with 19. The original mission watched about 150,000 stars, and K2 raised the number of stars surveyed to more than 500,000.'),
        questions: [
          { q: B('K2 實際做的觀測季，比原本估計的多幾個？', 'How many more campaigns did K2 complete than first estimated?'), answer: 9, tol: 0.1, unit: B('個', 'campaigns'),
            hint: B('19 − 10。', '19 − 10.'), explain: B('19 − 10 = 9 個。', '19 − 10 = 9 campaigns.') },
          { q: B('19 個觀測季是原本估計的幾倍？（取到小數點 1 位）', 'The 19 campaigns are how many times the first estimate? (one decimal)'), answer: 1.9, tol: 0.05, unit: B('倍', '×'),
            hint: B('19 ÷ 10。', '19 ÷ 10.'), explain: B('19 ÷ 10 = 1.9 倍。', '19 ÷ 10 = 1.9 times.') },
          { q: B('每個觀測季約 3 個月，19 個觀測季大約是幾年？（取到小數點 1 位）', 'At about 3 months per campaign, roughly how many years are 19 campaigns? (one decimal)'), answer: 4.8, tol: 0.2, unit: B('年', 'years'),
            hint: B('19 × 3 = 57 個月，再除以 12。', '19 × 3 = 57 months, then ÷ 12.'), explain: B('57 ÷ 12 ≈ 4.8 年，和 NASA 說的「K2 和第一階段一樣長」差不多。', '57 ÷ 12 ≈ 4.8 years, close to NASA’s statement that K2 lasted as long as the first mission.') },
          { q: B('調查過的星星總數（超過 50 萬顆），大約是原本盯著的 150,000 顆的幾倍？（取到小數點 1 位）', 'The total of stars surveyed (more than 500,000) is about how many times the original 150,000? (one decimal)'), answer: 3.3, tol: 0.1, unit: B('倍', '×'),
            hint: B('500,000 ÷ 150,000。', '500,000 ÷ 150,000.'), explain: B('500,000 ÷ 150,000 ≈ 3.3 倍。NASA 說的是「超過 50 萬」，所以實際上更多。', '500,000 ÷ 150,000 ≈ 3.3 times. NASA says “more than 500,000”, so the real ratio is a bit higher.') }
        ],
        note: B('「約 3 個月」是 NASA 的概略說法，所以這裡的年數是估算。', '“About 3 months” is NASA’s rough description, so the years here are an estimate.'),
        success: B('你算出：K2 多做了 9 個觀測季，調查的星星多了超過 3 倍。', 'You found that K2 did nine more campaigns and surveyed more than three times as many stars.') } },

    { level: 4, icon: '🧑‍🏫', name: B('華特·布蘭特', 'Walter Brandt'), job: B('計畫科學家（project scientist）', 'Project scientist'),
      bio: B('計畫科學家要把任務的結果，變成能被大家理解、又不誇大的說法，還要決定怎麼分享資料，讓更多人一起發現。',
             'A project scientist turns a mission’s results into statements people can understand without overclaiming, and decides how to share the data so more people can make discoveries.'),
      stars: 4, tip: B('分清楚證據與推論', 'Separate evidence from inference'),
      quest: { type: 'choice', title: B('專屬任務：計畫科學家的兩個判斷', 'Role mission: the project scientist’s two judgments'),
        scenario: B('科學家要把「知道」和「推測」說清楚。選出最合理的說法。', 'A scientist must keep what is known apart from what is inferred. Pick the most reasonable statement.'),
        questions: [
          { q: B('分析 Kepler 的發現後，NASA 的結論是：夜空中可見恆星的 20% 到 50%，可能有和地球差不多大、可能是岩石的小行星，位在適居帶。你要怎麼對大眾說明？', 'After analyzing Kepler’s discoveries, NASA concluded that 20 to 50 percent of the stars visible in the night sky are likely to have small, possibly rocky, planets similar in size to Earth, in the habitable zone. How do you explain this to the public?'),
            options: [
              { t: B('「每顆星星旁邊都有一個住著外星人的地球。」', '“Every star has an Earth with aliens living on it.”'), why: B('這說得比證據多太多：證據只說「可能有」、而且是 20% 到 50%，沒有說有生命。', 'This claims far more than the evidence: it says “likely to have”, only 20 to 50 percent, and nothing about life.') },
              { t: B('說明這是分析 Kepler 發現後的推論，說「可能有」、範圍是 20% 到 50%；適居帶是液態水「有可能」存在的距離，不代表有生命', 'Say it is an inference from Kepler’s discoveries: “likely”, in a 20–50% range, and that the habitable zone is where liquid water might exist, which does not mean there is life'), correct: true, why: B('對！科學家要把「推論」和「確定」分清楚。', 'Right! Scientists keep inference and certainty apart.') },
              { t: B('「已經證實有 50% 的星星有地球。」', '“It is proven that 50% of stars have an Earth.”'), why: B('數字是一個範圍，而且是「可能」，不是證實。', 'The figure is a range, and it is “likely”, not proven.') },
              { t: B('不要發表，因為還不確定', 'Do not publish because it is not certain'), why: B('不確定的結果可以說明，只要把不確定性說清楚。', 'Uncertain results can be shared, as long as the uncertainty is stated clearly.') }
            ] },
          { q: B('K2 階段的資料，一取得就公開給科學界和大眾。這樣做最重要的好處是什麼？', 'The data from the extended K2 mission were made public immediately. What is the most important benefit?'),
            options: [
              { t: B('讓更多人可以一起分析，發現的速度更快', 'More people can analyze it together, so discoveries come faster'), correct: true, why: B('對！NASA 說，資料立即公開，讓發現以驚人的速度出現，也為其他任務樹立高標準。', 'Right! NASA says immediate release allowed discoveries at an incredible pace and set a high bar for other missions.') },
              { t: B('讓資料變得比較不重要', 'It makes the data less important'), why: B('公開不會降低資料的價值。', 'Sharing does not lower the data’s value.') },
              { t: B('讓團隊不用再檢查資料', 'The team no longer has to check the data'), why: B('公開之後，仍需要仔細檢查；更多人檢查反而更好。', 'Careful checking is still needed after release; more people checking is better.') },
              { t: B('只是為了節省儲存空間', 'It only saves storage space'), why: B('目的是讓更多人使用資料。', 'The aim is for more people to use the data.') }
            ] }
        ],
        success: B('你像計畫科學家一樣，把證據、推論與資料分享的好處說清楚了。', 'Like a project scientist, you stated the evidence, the inference and the benefit of sharing data clearly.') } }
  ];
})();
