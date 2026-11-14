/* 任務 4：火星氣候軌道器 Mars Climate Orbiter。事實來源：NASA 任務調查委員會第一階段報告（1999/11/10）。 */
(function () {
  var B = window.B;
  window.MISSIONS.push({
    id: 'mco', icon: '📏', color: '#b78cff',
    title: B('火星氣候軌道器：一個單位毀掉一艘太空船', 'Mars Climate Orbiter: one unit sank a spacecraft'),
    tagline: B('一次失敗，成為工程師最重要的教材', 'A failure that became engineering’s most important lesson'),
    cover: 'KSC-digitalmco',
    story: [
      { title: B('出發', 'Launch'), img: 'KSC-digitalmco',
        text: B('1998 年 12 月 11 日，一枚 Delta II 火箭載著「火星氣候軌道器」從佛羅里達升空。它的任務是繞著火星飛行，研究火星的天氣與氣候。',
                'On December 11, 1998, a Delta II rocket carried the Mars Climate Orbiter into the sky from Florida. Its job: circle Mars and study the weather and climate of the Red Planet.') },
      { title: B('九個多月的旅程', 'A nine-month trip'),
        text: B('火星很遠。探測器飛了九個多月，才靠近火星。要「停」在火星旁邊，它必須啟動引擎減速，讓火星的重力抓住它，才不會一飛而過。',
                'Mars is far away. The probe travelled for more than nine months. To stay near Mars it had to fire its engine and slow down so Mars’s gravity could catch it instead of letting it fly past.') },
      { title: B('靠近火星', 'Approaching Mars'), img: 'PIA02330',
        text: B('接近火星時，它的 MARCI 相機（氣候軌道器彩色成像儀）拍下了這張火星的小小影像。這是任務裡很重要的一刻——但接下來，事情出錯了。',
                'On approach, its MARCI camera took this small image of Mars. A big moment for the mission, but then things went wrong.') },
      { title: B('訊號提早消失', 'The signal vanished early'),
        text: B('1999 年 9 月 23 日，探測器進入火星背面時，訊號比預測早了 49 秒消失，之後再也沒有恢復。調查發現：它飛得太低了。原本預定的高度約 140–150 公里，實際只有約 57 公里，而探測器能存活的最低高度是 80 公里。',
                'On September 23, 1999, as it went behind Mars, the signal disappeared 49 seconds earlier than predicted and never returned. The investigation found it flew too low: it was meant to pass at about 140–150 kilometers, but its closest point was about 57 kilometers, while the lowest survivable altitude was 80 kilometers.') },
      { title: B('兇手是「單位」', 'The culprit was a unit'),
        text: B('原因不是引擎壞掉，而是單位：地面軟體產生的推進器檔案用「磅力·秒」，而導航軟體照規格以為是「牛頓·秒」。1 磅力等於 4.45 牛頓，所以每一次都少算了。這個小錯誤在九個多月的飛行中一直累積，把探測器帶偏了。',
                'It was not a broken engine but a unit. A ground-software file reported thruster data in pound-force seconds, while the navigation software expected newton-seconds, as specified. One pound-force is 4.45 newtons, so every number was wrong by that factor. The small error built up over nine months and steered the probe off course.') },
      { title: B('留下的教訓', 'The lesson left behind'),
        text: B('1999 年 11 月 10 日，NASA 公布調查報告。這件事讓全世界的工程團隊更重視：資料交接時要寫清楚單位、跨團隊要互相檢查，有疑問就要說出來。',
                'On November 10, 1999, NASA released the investigation report. It made engineering teams everywhere pay more attention to clear units in every handoff, checks between teams, and speaking up when something looks wrong.') }
    ],
    hardware: [
      { icon: '📷', name: B('MARCI 相機', 'MARCI camera'), short: B('氣候軌道器彩色成像儀', 'Mars Climate Orbiter Color Imager'),
        how: B('設計用來每天拍攝火星的天氣，例如雲和沙塵。靠近火星時，它拍下了火星的小小影像。', 'Designed to photograph Martian weather every day, such as clouds and dust. On approach it took a small image of Mars.'),
        why: B('氣候要靠長期觀察，所以需要每天拍。', 'Climate needs long-term observation, so it needed daily images.') },
      { icon: '🔥', name: B('主引擎', 'Main engine'), short: B('進入火星軌道要靠它減速', 'Slows it down to enter orbit'),
        how: B('到達火星時要點火減速，才能被火星重力抓住成為衛星。', 'On arrival it fires to slow down so that Mars’s gravity can capture it as a satellite.'),
        why: B('飛得太低就會碰到大氣層——這就是它最後發生的事。', 'Fly too low and you hit the atmosphere, which is what happened.') },
      { icon: '🧭', name: B('小型推進器', 'Small thrusters'), short: B('調整姿態、釋放累積的轉動', 'Adjust attitude and release built-up spin'),
        how: B('太空船內部的反作用飛輪會逐漸累積轉動。小推進器定期噴氣，把累積的轉動釋放掉（稱為 AMD）。每次推多少，就是那份「推力脈衝」資料。', 'Spin builds up in the spacecraft’s reaction wheels. Small thrusters fire from time to time to release it (called Angular Momentum Desaturation, AMD). How hard each push is gives that “impulse” data.'),
        why: B('這份資料的單位寫錯了，軌道預測就被「推」偏了。', 'The units on that data were mixed up, which pushed the orbit prediction off.') },
      { icon: '💻', name: B('地面導航軟體', 'Ground navigation software'), short: B('硬體不只在天上', 'Hardware is not only in space'),
        how: B('地球上的團隊用軟體預測探測器的位置，並決定何時修正航道。', 'Teams on Earth use software to predict where the probe is and when to correct its course.'),
        why: B('軟體吃進錯的單位，算出的軌道就是錯的。', 'If the software takes in the wrong units, the orbit it computes is wrong.') },
      { icon: '📡', name: B('天線與無線電', 'Antenna and radio'), short: B('與地球保持聯絡', 'Keeps contact with Earth'),
        how: B('探測器靠無線電把資料傳回地球。進入火星背面時，訊號會被火星擋住，那是預測會「暫時」消失的時刻。', 'The probe sends data to Earth by radio. When it goes behind Mars the signal is blocked, a predicted, temporary loss.'),
        why: B('這次，訊號比預測早了 49 秒消失，是第一個警訊。', 'This time the signal vanished 49 seconds early, the first warning sign.') }
    ],
    challenges: {
      1: { type: 'choice', title: B('兩個「10」', 'Two “10”s'),
        scenario: B('兩位工程師要合作。小明量長度用「公尺」，小華量長度用「英尺」。他們各自寫下「10」，交給電腦。', 'Two engineers work together. Ming measures lengths in meters and Hua in feet. Each writes down “10” and hands it to the computer.'),
        questions: [
          { q: B('電腦只看到數字 10。會發生什麼事？', 'The computer sees only the number 10. What can happen?'), options: [
            { t: B('沒問題，10 就是 10。', 'No problem, 10 is 10.'), correct: false, why: B('10 公尺和 10 英尺差很多（1 英尺只有約 0.3 公尺）。', '10 meters and 10 feet are very different (one foot is only about 0.3 meters).') },
            { t: B('電腦可能把兩個 10 當成同一個單位，結果算錯。', 'The computer may treat both 10s as the same unit and calculate wrongly.'), correct: true, why: B('沒錯！這就是火星氣候軌道器發生的事：數字一樣，單位不同。', 'Right! That is what happened to the Orbiter: same number, different unit.') },
            { t: B('電腦會自動知道哪個是公尺。', 'The computer will automatically know which is meters.'), correct: false, why: B('電腦不會猜。它只會照著吃進去的數字算。', 'Computers do not guess. They calculate with exactly what they are given.') }
          ] },
          { q: B('怎麼做可以避免這種錯誤？', 'How can this mistake be avoided?'), options: [
            { t: B('把數字寫得小一點。', 'Write the numbers smaller.'), correct: false, why: B('數字大小跟單位沒有關係。', 'The size of the number has nothing to do with the unit.') },
            { t: B('每個數字都寫上單位，並請對方檢查一次。', 'Write the unit with every number and have the other person check it.'), correct: true, why: B('正確！「寫單位」加上「互相檢查」，是工程師最重要的習慣。', 'Correct! “Write the unit” plus “cross-check” is one of an engineer’s best habits.') },
            { t: B('希望運氣好。', 'Hope for good luck.'), correct: false, why: B('太空任務不能靠運氣。', 'Space missions cannot rely on luck.') }
          ] }
        ],
        success: B('你學到了一個超重要的習慣：數字後面一定要有單位！', 'You learned a super-important habit: every number needs a unit!') },
      2: { type: 'calc', title: B('磅力·秒 與 牛頓·秒', 'Pound-force seconds and newton-seconds'),
        scenario: B('1 磅力＝4.45 牛頓。所以 1 磅力·秒＝4.45 牛頓·秒。', '1 pound-force = 4.45 newtons, so 1 lbf·s = 4.45 N·s.'),
        questions: [
          { q: B('報告上寫「100 磅力·秒」。換成牛頓·秒是多少？', 'A report says “100 pound-force seconds”. How many newton-seconds is that?'), answer: 445, tol: 1, unit: 'N·s',
            hint: B('100 × 4.45。', '100 × 4.45.'), explain: B('100 × 4.45 = 445 牛頓·秒。', '100 × 4.45 = 445 N·s.') },
          { q: B('軟體卻把「100」當成 100 牛頓·秒。真實的推力是軟體以為的幾倍？', 'The software treats “100” as 100 N·s. The real push is how many times what the software thinks?'), answer: 4.45, tol: 0.05, unit: B('倍', 'times'),
            hint: B('445 ÷ 100。', '445 ÷ 100.'), explain: B('445 ÷ 100 = 4.45。每一次，軟體都少算了 4.45 倍的推力，錯誤因此累積。', '445 ÷ 100 = 4.45. Each time the software underestimated the push by 4.45×, so the error built up.') }
        ],
        success: B('你找到了關鍵數字：4.45 倍。一個小換算，足以毀掉一個任務。', 'You found the key number: 4.45. One small conversion can sink a mission.') },
      3: { type: 'calc', title: B('飛得太低了多少？', 'How far too low?'),
        scenario: B('NASA 調查報告說：探測器能存活的最低高度是 80 公里，實際的近火點約 57 公里。', 'NASA’s investigation report says the lowest survivable altitude was 80 km, while the actual closest point was about 57 km.'),
        questions: [
          { q: B('低了多少公里？', 'How many kilometers too low?'), answer: 23, tol: 0.5, unit: 'km', explain: B('80 − 57 = 23 公里。', '80 − 57 = 23 km.') },
          { q: B('低了安全高度的百分之幾？（相對 80 公里）', 'What percent below the safe altitude is that (relative to 80 km)?'), answer: 28.75, tol: 0.5, unit: '%',
            hint: B('23 ÷ 80 × 100。', '23 ÷ 80 × 100.'), explain: B('23 ÷ 80 ≈ 28.75%。', '23 ÷ 80 ≈ 28.75%.') },
          { q: B('57 公里等於幾英里？（1 英里 ≈ 1.609 公里）', 'How many miles is 57 km? (1 mile ≈ 1.609 km)'), answer: 35.4, tol: 0.3, unit: B('英里', 'miles'),
            hint: B('57 ÷ 1.609。', '57 ÷ 1.609.'), explain: B('57 ÷ 1.609 ≈ 35.4 英里。同一個高度，用不同單位數字完全不同，這也是為什麼要寫清楚單位。', '57 ÷ 1.609 ≈ 35.4 miles. The same height gives a different number in a different unit, which is why units must be clear.') }
        ],
        success: B('你算出了「差一點點」到底差多少，也看到了單位換算的威力。', 'You measured how big “a little off” really was, and saw the power of unit conversion.') },
      4: { type: 'detective', title: B('在資料交接中找出問題', 'Find the problem in the data handoff'),
        scenario: B('以下是資料從規格到軌道預測的 4 個步驟。請點出「單位和規格不一致」的那一步。', 'Here are 4 steps of the data from specification to orbit prediction. Click the step where the unit does not match the specification.'),
        cols: [B('步驟', 'Step'), B('內容', 'What happens'), B('使用的單位', 'Unit used')],
        rows: [
          [B('① 規格文件', '1. Specification'), B('規定推進器推力脈衝資料的格式', 'Defines the format of thruster impulse data'), B('牛頓·秒（N·s）', 'newton-seconds (N·s)')],
          [B('② 地面軟體的輸出檔（AMD 檔）', '2. Ground-software output file (AMD file)'), B('產生每次推進器的推力脈衝資料', 'Produces the impulse data for each thruster push'), B('磅力·秒（lbf·s）', 'pound-force seconds (lbf·s)')],
          [B('③ 導航團隊的軟體', '3. Navigation team software'), B('讀入資料，預測探測器的位置', 'Reads the data and predicts the probe’s position'), B('以為是牛頓·秒（N·s）', 'assumes newton-seconds (N·s)')],
          [B('④ 軌道預測', '4. Orbit prediction'), B('根據結果預測近火點高度', 'Predicts the closest-approach altitude'), B('公里（km）', 'kilometers (km)')]
        ],
        wrongRow: 1,
        foundMsg: B('沒錯！是第②步：地面軟體產生的檔案實際用磅力·秒，但規格要求牛頓·秒。下一步（③）的導航軟體照規格相信資料，沒有人檢查。', 'Yes! Step 2: the ground-software file used pound-force seconds, but the specification required newton-seconds. The navigation software in step 3 trusted the specification, and nobody checked.'),
        wrongMsg: B('這一步的單位與規格是一致的。再看看哪一步和「規格文件」的單位不一樣？', 'This step’s unit matches the specification. Which step differs from the specification?'),
        after: { questions: [
          { q: B('哪一種做法，最能防止這類錯誤？', 'Which practice best prevents this kind of error?'), options: [
            { t: B('檔案裡附上單位標示，讀取時自動檢查是否符合規格。', 'Put the unit inside the file and have the reader automatically check it against the specification.'), correct: true, why: B('正確！把單位寫進資料，並讓程式自動比對，就不會依賴「大家都記得」。', 'Correct! Putting the unit in the data and letting the program compare it removes reliance on everyone remembering.') },
            { t: B('每個人更認真一點。', 'Everyone should just try harder.'), correct: false, why: B('人都會犯錯。好的系統要能「在人犯錯時」抓到問題。', 'People make mistakes. A good system catches problems when people slip.') },
            { t: B('把任務延後一年再檢查。', 'Delay the mission a year and check again.'), correct: false, why: B('延後不會自動找出錯誤，需要明確的檢查機制。', 'Delaying does not find errors by itself; you need a clear checking process.') }
          ] },
          { q: B('為什麼這麼「小」的錯誤，最後會變成這麼「大」的後果？', 'Why did such a “small” error cause such a big result?'), options: [
            { t: B('因為每一次都少算了 4.45 倍，而且在九個多月的旅程裡不斷累積。', 'Because every push was off by a factor of 4.45, and it kept accumulating over nine months.'), correct: true, why: B('對！小誤差 × 很多次 × 很長時間 ＝ 大偏差。', 'Right! Small error × many times × long time = big deviation.') },
            { t: B('因為火星太大了。', 'Because Mars is huge.'), correct: false, why: B('火星大小與這個錯誤無關。', 'Mars’s size has nothing to do with this error.') }
          ] }
        ] },
        success: B('你像真正的事故調查員一樣，找到了出錯的環節，也想出了預防的方法。', 'Like a real accident investigator, you found the faulty link and a way to prevent it.') }
    },
    science: [
      { icon: '🧾', t: B('這個任務沒有完成火星氣候的科學目標，但留下了極有價值的工程教訓。', 'The mission did not achieve its Mars climate science goals, but left a very valuable engineering lesson.') },
      { icon: '📏', t: B('調查報告指出根本原因：資料以磅力·秒交付，規格卻要求牛頓·秒（差 4.45 倍）。', 'The report named the root cause: data delivered in pound-force seconds while newton-seconds were required (a factor of 4.45).') },
      { icon: '🧗', t: B('探測器近火點高度約 57 公里，低於能存活的 80 公里。', 'Its closest point was about 57 km, below the 80 km needed to survive.') },
      { icon: '🤝', t: B('這個教訓提醒團隊：跨單位合作時，一定要清楚約定單位並相互檢查。', 'It reminds teams that when different groups work together, units must be clearly agreed and cross-checked.') }
    ],
    ending: B('火星氣候軌道器沒有成功進入軌道，但它的故事被許多工程學校當成教材。每次你在數字後面寫上單位，其實都在用這次失敗換來的教訓。',
              'The Mars Climate Orbiter never made it into orbit, but its story is taught in many engineering schools. Every time you write a unit after a number, you are using a lesson bought by this failure.'),
    endImg: 'PIA02330',
    sources: [
      { label: 'NASA Lessons Learned: MCO Mishap Investigation Board Phase I Report', url: 'https://llis.nasa.gov/lesson/641', note: B('根本原因、單位換算', 'Root cause, unit conversion') },
      { label: 'MCO Mishap Investigation Board Phase I Report (PDF, 1999/11/10)', url: 'https://llis.nasa.gov/llis_lib/pdf/1009464main1_0641-mr.pdf', note: B('57 公里、80 公里、4.45、提早 49 秒', '57 km, 80 km, 4.45, 49 seconds early') },
      { label: 'NASA NSSDCA: Mars Climate Orbiter', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1998-073A', note: B('發射、MARCI／PMIRR、預定高度 140–150 公里', 'Launch, MARCI/PMIRR, planned altitude 140–150 km') },
      { label: 'NASA Image Library: KSC-digitalmco', url: 'https://images.nasa.gov/details/KSC-digitalmco', note: B('1998/12/11 發射', 'Launch, Dec 11, 1998') },
      { label: 'NASA Image Library: PIA02330', url: 'https://images.nasa.gov/details/PIA02330', note: B('MARCI 靠近火星影像', 'MARCI approach image') }
    ]
  });
})();
