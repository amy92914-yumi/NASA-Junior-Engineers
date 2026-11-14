/* 任務 1 機智號：4 位角色（對應原本 4 個難度）與各自的專屬任務。
   人物職稱已查證：MiMi Aung＝專案經理、Bob Balaram＝總工程師、Håvard Grip＝首席飛行員（NASA/JPL 報導與 NASA.gov）；
   Teddy Tzanetos＝專案經理（JPL 影像 PIA26316：Ingenuity Project Manager Says Goodbye）。
   專屬任務的數字：標「遊戲設定」者是為了簡化的數字，不是 NASA 規格。 */
(function () {
  var B = window.B;
  window.ROLES = window.ROLES || {};
  window.ROLES.ingenuity = [
    { level: 1, icon: '🧑‍✈️', name: B('尼爾斯·伯格', 'Nils Berg'), job: B('機智號首席飛行員', 'Ingenuity Chief Pilot'),
      bio: B('飛行員的工作，是規劃並檢查每一次飛行。機智號在 2 億公里外的火星上，沒有人能用搖桿控制，每一步都要事先想好。',
             'A pilot plans and checks every flight. Ingenuity flew on Mars, millions of kilometres away, where nobody could use a joystick, so every step had to be thought through in advance.'),
      stars: 1, tip: B('看圖、動手試試看', 'Look, tap and try'),
      quest: { type: 'order', title: B('專屬任務：寫出飛行劇本', 'Role mission: write the flight plan'),
        scenario: B('身為首席飛行員，你要把一次飛行的步驟排成「飛行劇本」，傳給火星上的機智號。順序錯了，它就飛不起來！',
                    'As chief pilot you must put a flight into a script and send it to Ingenuity on Mars. Wrong order and it cannot fly!'),
        items: [
          { id: 'a', t: B('用太陽能板把電池充飽電', 'Charge the battery with the solar panel') },
          { id: 'b', t: B('旋翼加速，轉到約每分鐘 2,400 圈', 'Spin the rotors up to about 2,400 rpm') },
          { id: 'c', t: B('垂直升空，爬升到約 3 公尺', 'Lift off and climb to about 3 meters') },
          { id: 'd', t: B('在空中懸停，用相機拍照', 'Hover in the air and take pictures') },
          { id: 'e', t: B('慢慢降落，回到火星地面', 'Descend slowly back to the Martian ground') }
        ],
        hint: B('想想：沒有電、沒有轉速，就不可能升空；降落一定是最後一步。', 'Think: without power or rotor speed it cannot lift off; landing must be the last step.'),
        explain: B('先有電、再加速、然後升空、懸停，最後降落。機智號首飛（2021/4/19）就是這樣的流程。', 'Power first, then spin-up, lift-off, hover, and finally landing. Ingenuity’s first flight (Apr 19, 2021) followed this pattern.'),
        success: B('飛行劇本完成！機智號按照你的步驟飛起來了。', 'Flight plan done! Ingenuity flew by following your steps.') } },

    { level: 2, icon: '🧑‍🔧', name: B('西奧·馬洛', 'Theo Marlow'), job: B('機智號專案經理（飛行團隊負責人）', 'Ingenuity Project Manager (team lead)'),
      bio: B('帶領團隊完成機智號最後的任務，並在團隊最後一次輪班時向大家致詞。團隊負責人要能算出：地球的命令多久才到得了火星？',
             'Led the team through Ingenuity’s final operations and addressed everyone during the last shift. A team lead must know: how long does a command from Earth take to reach Mars?'),
      stars: 2, tip: B('做決定、簡單計算', 'Make decisions, simple maths'),
      quest: { type: 'calc', title: B('專屬任務：命令要等多久？', 'Role mission: how long does a command take?'),
        scenario: B('無線電訊號的速度是光速：每秒約 30 萬公里。下面是「遊戲設定」：假設地球和火星相距 2 億公里（真實距離會在約 5,500 萬到 4 億公里之間變動）。',
                    'Radio travels at the speed of light: about 300,000 km per second. Game setting: assume Earth and Mars are 200 million km apart (the real distance varies from about 55 million to 400 million km).'),
        questions: [
          { q: B('命令從地球傳到火星，單程要幾分鐘？（距離 ÷ 速度，再把秒換成分鐘，答案取到小數點 1 位）', 'How many minutes does a command take one way from Earth to Mars? (distance ÷ speed, then seconds → minutes; one decimal)'),
            answer: 11.1, tol: 0.3, hint: B('200,000,000 ÷ 300,000 ≈ 667 秒；再除以 60。', '200,000,000 ÷ 300,000 ≈ 667 s; then divide by 60.'),
            explain: B('約 667 秒，也就是約 11 分鐘。所以機智號不能被遙控，必須自己判斷。', 'About 667 seconds, roughly 11 minutes. That is why Ingenuity could not be remote-controlled and had to decide by itself.') },
          { q: B('你送出命令，還要等機智號回報「收到了」。一來一回總共要幾分鐘？', 'You send a command and wait for Ingenuity to answer “received”. How many minutes for the round trip?'),
            answer: 22.2, tol: 0.6, hint: B('來回就是單程的 2 倍。', 'Round trip = twice the one-way time.'),
            explain: B('來回約 22 分鐘。團隊必須把整段飛行事先寫成劇本，再一次送過去。', 'About 22 minutes round trip. The team has to write the whole flight in advance and send it in one go.') }
        ],
        success: B('你算出了通訊延遲，這就是機智號必須「自己飛」的原因！', 'You worked out the delay. That is why Ingenuity had to fly by itself!') } },

    { level: 3, icon: '🧑‍🔬', name: B('羅翰·梅塔', 'Rohan Mehta'), job: B('機智號總工程師（火星直升機的發明者）', 'Ingenuity Chief Engineer (inventor of the Mars Helicopter)'),
      bio: B('總工程師是機智號的設計靈魂：從構想出這個設計，一路把它做成。總工程師最重要的工作之一，是把「重量」和「升力」算清楚。',
             'The chief engineer is the heart of the helicopter’s design: from first idea to finished machine. A chief engineer must work out weight and lift.'),
      stars: 3, tip: B('用公式推理', 'Reason with formulas'),
      quest: { type: 'calc', title: B('專屬任務：重量與升力的帳', 'Role mission: the weight and lift ledger'),
        scenario: B('機智號的質量是 1.8 公斤。重量＝質量 × 重力加速度。火星重力 3.73 m/s²，地球 9.81 m/s²（NASA 行星資料表）。最後一題是「簡化物理模型」：升力與「空氣密度 × 轉速的平方」成正比。',
                    'Ingenuity’s mass is 1.8 kg. Weight = mass × gravity. Mars gravity is 3.73 m/s², Earth’s is 9.81 m/s² (NASA planetary fact sheet). The last question uses a simplified physics model: lift is proportional to air density × rotor speed squared.'),
        questions: [
          { q: B('機智號在火星上的重量是多少牛頓（N）？（1.8 × 3.73）', 'What does Ingenuity weigh on Mars, in newtons? (1.8 × 3.73)'),
            answer: 6.7, tol: 0.1, hint: B('1.8 × 3.73 ≈ 6.7。', '1.8 × 3.73 ≈ 6.7.'),
            explain: B('約 6.7 牛頓。', 'About 6.7 N.') },
          { q: B('同一架機智號在地球上的重量是多少牛頓？（1.8 × 9.81）', 'What would the same Ingenuity weigh on Earth, in newtons? (1.8 × 9.81)'),
            answer: 17.7, tol: 0.2, hint: B('1.8 × 9.81 ≈ 17.7。', '1.8 × 9.81 ≈ 17.7.'),
            explain: B('約 17.7 牛頓。火星重力小，機智號比較「輕」，這是它的優點。', 'About 17.7 N. Mars’s gravity is weaker so Ingenuity is “lighter”, which helps.') },
          { q: B('簡化模型：火星空氣密度只有地球的 1%（0.01 倍）。要托住 6.7 牛頓，火星的旋翼轉速是「在地球托住 17.7 牛頓」時的幾倍？（提示：轉速倍數 ＝ √〔(6.7÷17.7) ÷ 0.01〕，答案取到小數點 1 位）', 'Simplified model: Mars’s air is only 1% (0.01×) as dense as Earth’s. To hold up 6.7 N, how many times faster must the rotors spin than when holding 17.7 N on Earth? (Hint: ratio = √[(6.7 ÷ 17.7) ÷ 0.01]; one decimal)'),
            answer: 6.2, tol: 0.3, hint: B('(6.7÷17.7)＝0.379；再除以 0.01 ＝ 37.9；開根號 ≈ 6.2。', '(6.7 ÷ 17.7) = 0.379; ÷ 0.01 = 37.9; square root ≈ 6.2.'),
            explain: B('簡化模型算出約 6 倍。NASA 說真實的機智號比地球直升機快約 8 倍：真實的直升機還有葉片形狀等因素，簡化模型不會完全準，但方向一樣——空氣越稀薄，轉得越快。',
                       'The simple model gives about 6×. NASA says the real Ingenuity spins about 8× faster than a normal helicopter. Real rotors involve blade shape and more, so the simple model is not exact, but the direction is right: thinner air means faster spin.') }
        ],
        note: B('這題的「簡化模型」是用來練習推理的遊戲設定，不是 NASA 的設計公式。', 'The simplified model is a practice exercise, not NASA’s design formula.'),
        success: B('你像總工程師一樣把重量與升力算清楚了！', 'You worked out weight and lift like a chief engineer!') } },

    { level: 4, icon: '🧑‍💼', name: B('梅琳·哈特', 'Mei Lin Hart'), job: B('機智號專案經理（JPL）', 'Ingenuity Project Manager (JPL)'),
      bio: B('擔任機智號專案經理，帶領團隊在有限的重量、電力與時間裡做取捨。專案經理要判斷風險，並且說得出為什麼這樣決定。',
             'As Ingenuity’s project manager, led the team in making trade-offs among weight, power and time. A project manager judges risk and can explain why.'),
      stars: 4, tip: B('整合條件、判斷風險', 'Combine constraints, judge risk'),
      quest: { type: 'choice', title: B('專屬任務：專案經理的三個決定', 'Role mission: the project manager’s three decisions'),
        scenario: B('專案經理沒有標準答案，只有「最合理的取捨」。選出你認為最好的決定。', 'A project manager has no single right answer, only the most reasonable trade-off. Pick the best decision.'),
        questions: [
          { q: B('有人建議：「為了讓機智號飛得更穩，把毅力號的出發延後。」你怎麼決定？', 'Someone suggests: “Delay Perseverance’s launch so Ingenuity can fly more reliably.” What do you decide?'),
            options: [
              { t: B('同意延後一週，換取更多測試時間，畢竟機智號是史上第一次', 'Agree to a one-week delay for more testing; this is a historic first'), why: B('火星的發射窗口大約每 26 個月才開一次，不是想延就能延；而且機智號只是搭便車的技術實驗。', 'Mars launch windows open only about every 26 months, so a short delay is not simply available, and Ingenuity is a technology demonstration riding along.') },
              { t: B('不延後發射，請團隊在原本的時程內，用更多地面測試提高把握', 'Keep the launch date and ask the team to raise confidence with more ground testing'), correct: true, why: B('對！發射時間是固定的，機智號不能拖累毅力號的主要任務；能做的是在時程內把測試做足。', 'Right! The launch date is fixed and Ingenuity must not hold back Perseverance’s main mission; the way forward is more testing within the schedule.') },
              { t: B('取消機智號，把重量讓給毅力號，這樣最安全', 'Cancel Ingenuity and give its mass to Perseverance; that is safest'), why: B('取消不是唯一的辦法。技術展示的目的就是承擔可控的風險，只要不影響主任務就值得做。', 'Cancelling is not the only option. A technology demonstration accepts controlled risk and is worth doing as long as it does not affect the main mission.') },
              { t: B('先裝上去，發射後如果有問題再想辦法', 'Mount it now and deal with problems after launch'), why: B('火星上無法修理，要在出發前就把風險評估清楚。', 'Nothing can be repaired on Mars; the risk must be understood before launch.') }
            ] },
          { q: B('工程師想多加一台 100 公克的新儀器。你要怎麼回覆？', 'An engineer wants to add a 100-gram instrument. How do you reply?'),
            options: [
              { t: B('只要總重沒有超過上限，就可以加', 'Fine, as long as the total stays under the mass limit'), why: B('重量上限只是其中一個條件。多一克還會牽動升力、電力、電池和溫度。', 'The mass limit is only one constraint. Extra mass also affects lift, power, battery and temperature.') },
              { t: B('可以，但要拿掉另一台同樣 100 公克的東西來交換', 'Yes, but swap out another 100-gram item'), why: B('重量相同，不代表耗電、發熱與功能也相同，仍然要整體評估。', 'Equal mass does not mean equal power draw, heat or function; the whole system must still be assessed.') },
              { t: B('先評估它對升力、電力、電池與溫度的連鎖影響，再決定要不要加', 'First assess the knock-on effects on lift, power, battery and temperature, then decide'), correct: true, why: B('對！直升機的每一克都環環相扣，要先算清楚整體的代價。', 'Right! Every gram is linked to everything else; work out the full cost first.') },
              { t: B('這是科學家的需求，工程師只要照做', 'It is the scientists’ request; engineers just comply'), why: B('科學需求很重要，但專案經理要在需求與可行性之間取捨。', 'Science needs matter, but a project manager balances them against feasibility.') }
            ] },
          { q: B('第 72 次飛行後，旋翼受損、任務結束。你要如何向大眾說明？', 'After flight 72 the rotor was damaged and the mission ended. How do you explain it to the public?'),
            options: [
              { t: B('旋翼受損代表設計有缺陷，應該公開檢討並暫停類似計畫', 'The damage means the design was flawed; review it publicly and pause similar projects'), why: B('受損要認真檢討沒錯，但直接否定整個設計，忽略了它遠超目標的表現。', 'The damage deserves a serious review, but dismissing the whole design ignores how far it exceeded its goals.') },
              { t: B('強調 72 次的成功，受損的細節之後有空再說', 'Stress the 72 successes and mention the damage later'), why: B('避重就輕會傷害信任，誠實說明結果與教訓，才會讓下一個任務更好。', 'Playing it down hurts trust; honestly reporting results and lessons makes the next mission better.') },
              { t: B('它原本只計畫最多 5 次飛行，卻飛了 72 次；同時誠實說明受損原因與學到的教訓', 'It was planned for at most five flights and flew 72; also explain the damage and the lessons honestly'), correct: true, why: B('對！用「目標 vs 實際成果」說明，並且誠實面對受損，才是公平又負責的說法。', 'Right! Compare the goal with what was achieved and be honest about the damage: fair and responsible.') },
              { t: B('跟其他太空任務比較，說它是史上最成功的任務', 'Compare it with other missions and call it the most successful ever'), why: B('這樣的比較不公平，也無從驗證，而且沒有說明受損的事實。', 'That comparison is unfair, unverifiable, and ignores the damage.') }
            ] }
        ],
        success: B('三個決定都很合理，你有專案經理的判斷力！', 'All three decisions were sound. You have a project manager’s judgement!') } }
  ];
  /* 新增的資料來源（附加在機智號任務的 sources） */
  var m = window.MISSIONS.filter(function (x) { return x.id === 'ingenuity'; })[0];
  if (m) m.sources.push(
    { label: 'NASA: The Man Who Wanted to Fly on Mars', url: 'https://www.nasa.gov/solar-system/the-man-who-wanted-to-fly-on-mars/', note: B('機智號的發明者與總工程師的故事', 'The story of Ingenuity’s inventor and chief engineer') },
    { label: 'JPL: Ingenuity Project Manager Says Goodbye (PIA26316)', url: 'https://www.jpl.nasa.gov/images/pia26316-ingenuity-project-manager-says-goodbye/', note: B('機智號專案經理向團隊道別', 'Ingenuity’s project manager says goodbye to the team') },
    { label: 'NASA Mars Fact Sheet (NSSDCA)', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html', note: B('重力 3.73 m/s²', 'Gravity 3.73 m/s²') }
  );
})();
