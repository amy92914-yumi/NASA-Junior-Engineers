/* 任務 4 火星氣候軌道器：4 位「代表性職稱」角色（不放具名個人，避免把失誤歸給特定的人）。
   事實依據：NASA 調查委員會的結論——地面軟體的推進器資料用了英制單位（磅力·秒），
   而導航模型預期公制（牛頓·秒），加上檢查與溝通不足。專屬任務的情境與數字為遊戲設定。 */
(function () {
  var B = window.B;
  window.ROLES = window.ROLES || {};
  window.ROLES.mco = [
    { level: 1, icon: '🧑‍💻', name: B('任務操作員', 'Mission Operator'), job: B('代表性職稱：任務操作員', 'Representative role: mission operator'),
      bio: B('任務操作員每天處理大量的數字與檔案。看到數字不對勁時，第一件事不是亂改，而是「回頭查規格」。',
             'A mission operator handles piles of numbers and files. When a number looks wrong, the first step is not to tweak it, but to check the specification.'),
      stars: 1, tip: B('排出正確流程', 'Put the process in order'),
      quest: { type: 'order', title: B('專屬任務：發現數字不對勁', 'Role mission: a number looks wrong'),
        scenario: B('你發現兩份資料的數字對不上。請把正確的處理流程排好。（簡化流程，遊戲設定）', 'Two files do not agree. Put the right response in order. (A simplified flow, game setting.)'),
        items: [
          { id: 'a', t: B('發現兩份資料的數字對不上', 'Notice that two files disagree') },
          { id: 'b', t: B('回頭查規格文件，看每個數字的單位', 'Check the specification for each number’s unit') },
          { id: 'c', t: B('和對方確認：你們用的是哪一種單位？', 'Confirm with the other side which unit they use') },
          { id: 'd', t: B('修正並把單位清楚寫在資料旁邊', 'Fix it and write the unit beside the data') },
          { id: 'e', t: B('重新測試，確認結果一致', 'Re-test and confirm the results agree') }
        ],
        hint: B('想想：要先知道問題在哪，才能修；修好之後一定要重新測試。', 'Think: find the problem first, then fix it; always re-test after fixing.'),
        explain: B('先發現、查規格、跟對方確認單位、修正並標示單位，最後重新測試。「單位」寫清楚，是避免這類錯誤最簡單的方法。', 'Notice, check the spec, confirm units with the other side, fix and label the unit, then re-test. Writing the unit clearly is the simplest way to avoid this kind of error.'),
        success: B('你用正確的流程處理了數字不一致！', 'You handled the mismatch with a sound process!') } },

    { level: 2, icon: '🧑‍🔧', name: B('導航工程師', 'Navigation Engineer'), job: B('代表性職稱：導航工程師', 'Representative role: navigation engineer'),
      bio: B('導航工程師負責預測太空船「現在在哪、會飛到哪」。每一個輸入的數字都要有單位，換算一錯，預測就會偏掉。',
             'A navigation engineer predicts where the spacecraft is and where it will go. Every input needs a unit, and a wrong conversion throws the prediction off.'),
      stars: 2, tip: B('換算單位', 'Convert units'),
      quest: { type: 'calc', title: B('專屬任務：英尺與公尺', 'Role mission: feet and metres'),
        scenario: B('1 英尺 ＝ 0.3048 公尺（國際標準定義）。請做兩個換算。', '1 foot = 0.3048 metres (the international definition). Make two conversions.'),
        questions: [
          { q: B('10 英尺是幾公尺？（取到小數點 2 位）', 'How many metres is 10 feet? (two decimals)'),
            answer: 3.05, tol: 0.02, hint: B('10 × 0.3048。', '10 × 0.3048.'), explain: B('10 × 0.3048 ≈ 3.05 公尺。', '10 × 0.3048 ≈ 3.05 m.') },
          { q: B('10 公尺是幾英尺？（取到小數點 1 位）', 'How many feet is 10 metres? (one decimal)'),
            answer: 32.8, tol: 0.2, hint: B('10 ÷ 0.3048。', '10 ÷ 0.3048.'), explain: B('10 ÷ 0.3048 ≈ 32.8 英尺。同一個「10」，在兩種單位下差了三倍多，這就是單位錯誤的威力。', '10 ÷ 0.3048 ≈ 32.8 ft. The same “10” differs by more than three times between the units. That is the power of a unit error.') }
        ],
        success: B('你換算得很準確！', 'Your conversions are accurate!') } },

    { level: 3, icon: '🧑‍🔬', name: B('軌道分析員', 'Orbit Analyst'), job: B('代表性職稱：軌道分析員', 'Representative role: orbit analyst'),
      bio: B('軌道分析員要判斷太空船飛得夠不夠高。NASA 調查報告指出：探測器能存活的最低高度約 80 公里，而實際的近火點約 57 公里。',
             'An orbit analyst judges whether the spacecraft flies high enough. NASA’s report says the lowest survivable altitude was about 80 km, while the actual closest point was about 57 km.'),
      stars: 3, tip: B('用比例推理', 'Reason with ratios'),
      quest: { type: 'calc', title: B('專屬任務：差了百分之幾？', 'Role mission: how far off, in percent?'),
        scenario: B('用調查報告的兩個數字：最低安全高度 80 公里、實際近火點約 57 公里。', 'Use the report’s two numbers: minimum safe altitude 80 km, actual closest point about 57 km.'),
        questions: [
          { q: B('實際高度是最低安全高度的百分之幾？（57 ÷ 80，取到小數點 1 位）', 'The actual altitude is what percent of the minimum safe altitude? (57 ÷ 80, one decimal)'),
            answer: 71.3, tol: 0.4, hint: B('57 ÷ 80 ≈ 0.7125。', '57 ÷ 80 ≈ 0.7125.'), explain: B('約 71.3%。', 'About 71.3%.') },
          { q: B('所以實際高度比最低安全高度「低了」百分之幾？（取到小數點 1 位）', 'So the actual altitude was how many percent below the minimum? (one decimal)'),
            answer: 28.7, tol: 0.4, hint: B('100% − 71.3%。', '100% − 71.3%.'), explain: B('約 28.7%，也就是低了 23 公里。在大氣層邊緣，這個差距足以讓探測器失去控制。', 'About 28.7%, or 23 km too low. Near the atmosphere, that gap was enough to doom the spacecraft.') }
        ],
        success: B('你算出了高度的差距！', 'You worked out the altitude gap!') } },

    { level: 4, icon: '🧑‍⚖️', name: B('調查委員會成員', 'Investigation Board Member'), job: B('代表性職稱：事故調查委員會成員', 'Representative role: mishap investigation board member'),
      bio: B('調查委員會的工作不是找人負責，而是找出「制度哪裡出了縫」，讓下一個任務不再重蹈覆轍。',
             'An investigation board’s job is not to blame a person but to find the gaps in the system, so the next mission does not repeat the failure.'),
      stars: 4, tip: B('找根本原因、提出改善', 'Find the root cause and improve'),
      quest: { type: 'choice', title: B('專屬任務：找出根本原因', 'Role mission: find the root cause'),
        scenario: B('NASA 的調查委員會認為，直接原因是地面軟體的推進器資料用了英制單位，導航模型卻預期公制單位。請判斷兩個問題。', 'NASA’s board found that ground software gave thruster data in English units while the navigation model expected metric. Judge the two questions.'),
        questions: [
          { q: B('這件事的「根本原因」最接近哪一種說法？', 'Which best describes the root cause?'),
            options: [
              { t: B('負責那份軟體的人太粗心，換掉他就能避免再發生', 'The person who wrote that software was careless; replace them'), why: B('把問題推給個人，制度的縫隙還在，下次還會發生。', 'Blaming one person leaves the gaps in the system in place.') },
              { t: B('推進器本身發生故障，提供了錯誤的推力', 'The thrusters malfunctioned and gave the wrong thrust'), why: B('推進器的表現並沒有錯，錯在資料的單位被誤用。', 'The thrusters did not malfunction; the data’s units were misused.') },
              { t: B('單位沒有被清楚標示與檢查，團隊之間的驗證與溝通也不足', 'Units were not clearly labelled and checked, and verification and communication between teams were weak'), correct: true, why: B('對！調查結論指出：除了單位錯誤，還有驗證與溝通不足，這些是制度層面的問題。', 'Right! The findings point to the unit error plus insufficient verification and communication: system-level problems.') },
              { t: B('火星大氣的變化太難預測，任何團隊都會遇到', 'Mars’s atmosphere is too unpredictable for any team'), why: B('大氣確實難預測，但這次的關鍵是資料本身的單位問題，不是大氣。', 'The atmosphere is hard to predict, but the key problem here was the data’s units.') }
            ] },
          { q: B('以下哪一項改善，最能避免「同類型」的錯誤再次發生？', 'Which improvement best prevents the same kind of error?'),
            options: [
              { t: B('在重要會議上提醒大家，下次交接資料要更小心', 'Remind everyone at a big meeting to be more careful with handoffs'), why: B('只靠提醒，沒有改變流程，效果有限。', 'A reminder alone, with no process change, has limited effect.') },
              { t: B('規定每份資料都要標明單位，並且在每個交接處加上自動檢查', 'Require units on every file and add automatic checks at every handoff'), correct: true, why: B('對！把檢查做進流程裡，不依賴某個人記得。', 'Right! Build the check into the process instead of relying on someone remembering.') },
              { t: B('只讓最資深的一位工程師負責所有資料交接', 'Let one senior engineer handle every handoff'), why: B('把所有檢查集中在一個人身上，反而成為單一失誤點。', 'Putting all checking on one person creates a single point of failure.') },
              { t: B('減少團隊之間的溝通，避免資料混亂', 'Reduce communication between teams to avoid confusion'), why: B('溝通不足正是問題之一。', 'Weak communication was part of the problem.') }
            ] }
        ],
        success: B('你找出了制度裡的縫隙，也提出了好的改善！', 'You found the gaps in the system and a good fix!') } }
  ];
})();
