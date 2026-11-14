/* 任務 2 機會號：4 位角色。
   已查證：Steve Squyres＝MER 首席科學家（principal investigator，康乃爾大學）、John Callas＝MER 專案經理（JPL）
   （NASA 新聞稿、行星學會 MER 頁面）；Scott Maxwell＝MER 探測車駕駛員（rover driver，其「Mars and Me」部落格）。
   「電力系統工程師」是代表性職稱，不是具名人物。專屬任務的數字標「遊戲設定」者不是 NASA 規格。 */
(function () {
  var B = window.B;
  window.ROLES = window.ROLES || {};
  window.ROLES.opportunity = [
    { level: 1, icon: '🧑‍🚀', name: B('山姆·奧爾特加', 'Sam Ortega'), job: B('機會號探測車駕駛員（rover driver）', 'Opportunity rover driver'),
      bio: B('探測車駕駛員每天要看昨天傳回的照片，規劃今天的路線，再把指令送到火星。火星車不能即時遙控，每個步驟都要想清楚。',
             'A rover driver studies yesterday’s pictures, plans today’s drive and sends the commands to Mars. The rover cannot be steered live, so every step is planned.'),
      stars: 1, tip: B('看圖、排出步驟', 'Read pictures, plan the steps'),
      quest: { type: 'order', title: B('專屬任務：規劃火星車的一天', 'Role mission: plan the rover’s day'),
        scenario: B('這是簡化後的流程（遊戲設定）。請把駕駛員一天的工作，依先後順序排好。', 'A simplified flow (game setting). Put the driver’s day in the right order.'),
        items: [
          { id: 'a', t: B('接收火星車傳回來的照片與資料', 'Receive the pictures and data the rover sent back') },
          { id: 'b', t: B('判斷地形，規劃今天要走的路線', 'Judge the terrain and plan today’s route') },
          { id: 'c', t: B('把指令檢查一遍，再傳給火星車', 'Check the commands, then send them to the rover') },
          { id: 'd', t: B('火星車在火星上自己執行指令', 'The rover carries out the commands on Mars by itself') },
          { id: 'e', t: B('下一個火星日，再收回新的照片，檢查結果', 'Next Martian day: get new pictures and check the result') }
        ],
        hint: B('想想：沒收到資料就無法規劃；指令要先檢查才能送出；執行後才有新的結果。', 'Think: no data, no plan; commands are checked before sending; results come after execution.'),
        explain: B('先看資料、再規劃、檢查後送出、火星車自己執行、隔天檢查結果。因為訊號要花時間，駕駛員只能「寫好劇本再送出」。', 'Look at the data, plan, check and send, let the rover execute, then check the result next day. Because signals take time, a driver must write the script first and send it.'),
        success: B('火星車的一天排好了！', 'The rover’s day is planned!') } },

    { level: 2, icon: '🧑‍💼', name: B('喬納斯·雷耶斯', 'Jonas Reyes'), job: B('火星探測車（MER）專案經理（JPL）', 'Mars Exploration Rover (MER) Project Manager (JPL)'),
      bio: B('專案經理要在預算、時間與風險之間做取捨，並且說明「為什麼這樣決定」。機會號原本只設計 90 個火星日，卻工作了約 15 年。',
             'A project manager balances budget, time and risk, and explains why. Opportunity was designed for 90 Martian days but worked for about 15 years.'),
      stars: 2, tip: B('做決定、說明理由', 'Decide and explain why'),
      quest: { type: 'choice', title: B('專屬任務：專案經理的兩個決定', 'Role mission: the project manager’s two decisions'),
        scenario: B('專案經理沒有「完美答案」，只有最合理的取捨。選出你認為最好的決定。', 'A project manager has no perfect answer, only the most reasonable trade-off. Pick the best decision.'),
        questions: [
          { q: B('機會號已經超過原本設計的 90 個火星日，還在工作。你怎麼決定？', 'Opportunity is far beyond its planned 90 Martian days and still working. What do you decide?'),
            options: [
              { t: B('目標早就達成了，應該把預算轉給新任務，讓它結束運作', 'The goal was met long ago; move the budget to new missions and end it'), why: B('資源有限沒錯，但探測車還健康、還能做科學時，繼續工作是額外的收穫。', 'Resources are limited, but while the rover is healthy and productive, continuing is a bonus.') },
              { t: B('只要還能動，就一直延長下去，不必再評估', 'Keep extending as long as it moves, with no further reviews'), why: B('不評估就延長，可能讓探測車在不安全的狀態下硬撐。', 'Extending without review may push the rover on in an unsafe state.') },
              { t: B('定期評估健康狀態與科學價值，符合條件就申請延長，同時準備好風險與退場計畫', 'Review its health and science value regularly, extend while it qualifies, and keep risk and wind-down plans ready'), correct: true, why: B('對！機會號就是這樣一次次延長，走了約 15 年。條件是「安全」和「科學價值」。', 'Right! That is how Opportunity was extended again and again for about 15 years. The conditions: safety and science value.') },
              { t: B('降低運作頻率省預算，但不再做科學觀測，只保持待機', 'Cut activity to save budget and stop science, just stay on standby'), why: B('只待機不做科學，等於浪費了這台探測車最有價值的能力。', 'Standing by without science wastes the rover’s most valuable ability.') }
            ] },
          { q: B('2018 年全球沙塵暴讓機會號失去聯絡。你怎麼處理？', 'In 2018 a global dust storm silenced Opportunity. What do you do?'),
            options: [
              { t: B('立刻宣布任務結束，把團隊轉去支援其他任務', 'Declare the mission over and reassign the team'), why: B('還沒確定探測車的狀態前，太早放棄；太陽能板有機會在沙塵散去後恢復發電。', 'Too early to give up before its state is known; the panels may recover once the dust clears.') },
              { t: B('持續用多種方式呼叫，等沙塵暴散去，並先訂好「什麼時候做最後決定」', 'Keep calling in several ways, wait for the storm to clear, and set when the final decision will be made'), correct: true, why: B('對！團隊嘗試聯絡了好幾個月，直到 2019 年 2 月才宣布任務結束；有明確的決策時間，才不會無止境地等下去。', 'Right! The team tried for months and declared the mission complete only in February 2019; a clear decision point prevents waiting forever.') },
              { t: B('每天重複送出同一個喚醒指令，其他什麼都不調整', 'Send the same wake-up command every day and change nothing else'), why: B('只用單一做法，風險是萬一那個做法不適用，就永遠聯絡不上。', 'Using a single approach risks never reaching the rover if that approach does not fit the fault.') },
              { t: B('等沙塵暴一結束就停止呼叫，因為那時候還沒回應就代表壞了', 'Stop calling when the storm ends, since silence then means it is dead'), why: B('沙塵暴結束後仍可能因為電力或時鐘問題需要更多時間，不能只看一個時間點。', 'Even after the storm, power or clock problems may need more time; one moment is not enough to decide.') }
            ] }
        ],
        success: B('兩個決定都很合理，你有專案經理的判斷力！', 'Both decisions were sound. You have a project manager’s judgement!') } },

    { level: 3, icon: '🧑‍🔧', name: B('電力系統工程師', 'Power Systems Engineer'), job: B('代表性職稱：火星車電力系統工程師', 'Representative role: rover power-systems engineer'),
      bio: B('這是代表性的職稱，不是某位具名人物。電力工程師要算出：太陽能板被灰塵蓋住後，到底還剩多少光能？',
             'A representative role, not one named person. A power engineer works out how much light is left once dust covers the solar panels.'),
      stars: 3, tip: B('用公式推理', 'Reason with formulas'),
      quest: { type: 'calc', title: B('專屬任務：灰塵擋掉多少光？', 'Role mission: how much light does the dust block?'),
        scenario: B('光穿過塵埃後，剩下的比例＝e^(−τ)，e 約等於 2.718，τ 是光學厚度。（這是物理關係式；τ 的數值是遊戲設定。）', 'Light remaining after dust = e^(−τ), where e ≈ 2.718 and τ is the optical depth. (The relation is real physics; the τ values are game settings.)'),
        questions: [
          { q: B('τ = 1 時，剩下幾 %（取到小數點 1 位）？', 'When τ = 1, what percent of the light remains (one decimal)?'),
            answer: 36.8, tol: 0.4, hint: B('1 ÷ 2.718 ≈ 0.368。', '1 ÷ 2.718 ≈ 0.368.'),
            explain: B('e⁻¹ ≈ 0.368，約 36.8%。', 'e⁻¹ ≈ 0.368, about 36.8%.') },
          { q: B('τ = 3 時，剩下幾 %（取到小數點 1 位）？', 'When τ = 3, what percent remains (one decimal)?'),
            answer: 5.0, tol: 0.3, hint: B('e³ ≈ 20.1，所以 1 ÷ 20.1 ≈ 0.050。', 'e³ ≈ 20.1, so 1 ÷ 20.1 ≈ 0.050.'),
            explain: B('e⁻³ ≈ 0.050，只剩約 5%。塵埃稍微變厚，光就大幅減少，所以沙塵暴對太陽能探測車很危險。', 'e⁻³ ≈ 0.050, only about 5% is left. A bit more dust cuts the light sharply, which is why dust storms endanger a solar-powered rover.') }
        ],
        success: B('你算出了灰塵對太陽能的影響！', 'You worked out how dust affects solar power!') } },

    { level: 4, icon: '🧑‍🔬', name: B('史黛拉·布蘭特', 'Stella Brandt'), job: B('火星探測車（MER）首席科學家（康乃爾大學）', 'Mars Exploration Rover (MER) Principal Investigator (Cornell University)'),
      bio: B('首席科學家要決定「去哪裡看」和「證據說明了什麼」。機會號在子午線平原等地找到水曾經存在的證據，而且要小心：有水的證據，不等於有生命。',
             'The principal investigator decides where to look and what the evidence means. Opportunity found evidence of past water at Meridiani Planum and elsewhere, and a scientist stays careful: evidence of water is not evidence of life.'),
      stars: 4, tip: B('整合證據、小心下結論', 'Combine evidence, conclude carefully'),
      quest: { type: 'choice', title: B('專屬任務：證據說明了什麼？', 'Role mission: what does the evidence say?'),
        scenario: B('科學家要用證據說話，不多說、也不少說。選出最合理的結論。', 'Scientists speak from evidence: no more, no less. Pick the most reasonable conclusion.'),
        questions: [
          { q: B('機會號發現岩石裡有許多含赤鐵礦的小球。在地球上，這類礦物常在有水的環境形成。你的結論是？', 'Opportunity found many hematite-bearing spherules in rock. On Earth such minerals often form where water is present. What is your conclusion?'),
            options: [
              { t: B('這證明火星曾有大面積的湖泊與河流', 'This proves Mars once had large lakes and rivers'), why: B('單一證據不足以斷定「規模」，要和其他證據一起看。', 'One piece of evidence cannot settle the scale; it must be read with other evidence.') },
              { t: B('赤鐵礦也可能由別的過程形成，所以和水沒有關係', 'Hematite can form in other ways, so it has nothing to do with water'), why: B('「可能有別的原因」不等於「沒有關係」；要看是否有其他礦物與地形的證據支持。', '“Could have other causes” is not “unrelated”; look for supporting mineral and landform evidence.') },
              { t: B('這是過去有液態水的線索之一，但要搭配其他礦物與地層證據一起判斷', 'It is one clue to past liquid water, to be judged together with other mineral and layering evidence'), correct: true, why: B('對！科學家就是把多種證據拼在一起，才得出火星過去有液態水的結論。', 'Right! Scientists combine several lines of evidence to conclude that liquid water existed on Mars.') },
              { t: B('這代表火星當時一定有適合居住的環境', 'This means Mars must have been habitable then'), why: B('有水的線索不等於「一定適合居住」，還要看水的性質與持續時間。', 'A clue to water does not guarantee habitability; the water’s chemistry and duration matter.') }
            ] },
          { q: B('同事說：「既然有水，火星曾經有生命就是事實！」你怎麼回應？', 'A colleague says: “With water, life on Mars is a fact!” How do you respond?'),
            options: [
              { t: B('同意，水是生命的必要條件，所以可以對外這樣說', 'Agree: water is essential for life, so we can say so publicly'), why: B('必要條件不等於充分條件。有水，不代表真的出現過生命。', 'A necessary condition is not a sufficient one. Water does not mean life existed.') },
              { t: B('先對外說「可能有生命」吸引關注，之後有更多證據再更正', 'Say “there may have been life” for attention and correct it later'), why: B('為了關注而超前下結論，會傷害科學的可信度。', 'Jumping ahead for attention damages scientific credibility.') },
              { t: B('否定這個發現，因為我們沒有找到任何化石', 'Reject the finding because no fossils were found'), why: B('沒找到化石不代表水的證據不重要；水本身就是重要成果。', 'No fossils does not make the water evidence unimportant; it is a major result in itself.') },
              { t: B('水是生命需要的條件之一，但是否有生命要靠其他證據；我們能說的是「曾經適合居住」', 'Water is one condition life needs, but life needs other evidence; what we can say is “once habitable”'), correct: true, why: B('對！「適合居住的環境」和「真的有生命」是兩件事，科學家要說得剛剛好。', 'Right! A habitable environment and actual life are different things; scientists must say exactly what the evidence supports.') }
            ] }
        ],
        success: B('你像首席科學家一樣，讓證據決定結論！', 'You let the evidence decide, like a principal investigator!') } }
  ];
  var m = window.MISSIONS.filter(function (x) { return x.id === 'opportunity'; })[0];
  if (m) m.sources.push(
    { label: 'The Planetary Society: Mars Exploration Rovers', url: 'https://www.planetary.org/space-missions/mars-exploration-rovers', note: B('任務團隊的職務與分工', 'Roles on the mission team') },
    { label: 'NASA: Results of effort to recover Opportunity', url: 'https://www.nasa.gov/news-release/nasa-to-share-results-of-effort-to-recover-mars-opportunity-rover/', note: B('任務團隊的職務', 'Roles on the mission team') }
  );
})();
