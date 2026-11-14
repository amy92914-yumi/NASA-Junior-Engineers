/* 任務 5 金唱片：4 位角色（NASA Science「Golden Record Contents」與《Murmurs of Earth》署名）：
   Carl Sagan＝委員會主席／執行主任；Frank Drake＝技術主任；Ann Druyan＝創意總監；Timothy Ferris＝製作人；
   Jon Lomberg＝設計師；Linda Salzman Sagan＝問候語統籌。
   專屬任務的數字：標「遊戲設定」者不是 NASA 資料；55 種語言為 NASA 公布。 */
(function () {
  var B = window.B;
  window.ROLES = window.ROLES || {};
  window.ROLES.record = [
    { level: 1, icon: '🧑‍🎤', name: B('莉拉·莫雷諾', 'Lila Moreno'), job: B('金唱片問候語統籌（greetings organizer）', 'Golden Record greetings organizer'),
      bio: B('她負責蒐集各種語言的問候，讓外星人（或未來的人）聽見：地球上有很多不同的語言，但大家都想說「你好」。',
             'She organized the greetings in many languages, so that listeners would hear that Earth has many languages and everyone wants to say hello.'),
      stars: 1, tip: B('簡單計算', 'Simple maths'),
      quest: { type: 'calc', title: B('專屬任務：問候要多長？', 'Role mission: how long are the greetings?'),
        scenario: B('金唱片收錄了 55 種語言的問候（NASA 資料）。假設每種語言平均 5 秒（遊戲設定）。', 'The record holds greetings in 55 languages (NASA). Assume 5 seconds per language on average (game setting).'),
        questions: [
          { q: B('全部問候加起來大約幾秒？', 'About how many seconds in total?'),
            answer: 275, tol: 2, hint: B('55 × 5。', '55 × 5.'), explain: B('55 × 5 = 275 秒。', '55 × 5 = 275 s.') },
          { q: B('換成分鐘約是幾分鐘？（取到小數點 1 位）', 'About how many minutes is that? (one decimal)'),
            answer: 4.6, tol: 0.1, hint: B('275 ÷ 60。', '275 ÷ 60.'), explain: B('約 4.6 分鐘，不到 5 分鐘，就把 55 種語言的「你好」放進去了。', 'About 4.6 minutes: under five minutes carry hellos in 55 languages.') }
        ],
        success: B('你算出了問候的長度！', 'You worked out the length of the greetings!') } },

    { level: 2, icon: '🧑‍🎨', name: B('朱爾斯·拉金', 'Jules Larkin'), job: B('金唱片設計師（designer）', 'Golden Record designer'),
      bio: B('設計師要把「圖像」變成外星人也看得懂的樣子。圖上用的尺寸要怎麼說明？不能靠公尺或英寸，因為對方根本不認識它們。',
             'The designer turns images into something aliens could understand. How do you explain sizes in a picture? Not with metres or inches: the finders do not know them.'),
      stars: 2, tip: B('用邏輯選擇', 'Choose by logic'),
      quest: { type: 'choice', title: B('專屬任務：怎麼讓外星人看懂尺寸？', 'Role mission: how can aliens read the sizes?'),
        scenario: B('唱片上的許多圖，標示了時間、大小或質量。', 'Many images on the record carry scales of time, size or mass.'),
        questions: [
          { q: B('要告訴外星人「這張圖有多大」，最合理的做法是？', 'To tell aliens how big something is in a picture, what is the most sensible way?'),
            options: [
              { t: B('在圖旁邊放一個人形剪影，用人的身高當比例尺', 'Put a human silhouette beside it as a height scale'), why: B('外星人不一定知道人類有多高，這個比例尺只對我們有意義。', 'Aliens may not know how tall humans are; the scale only means something to us.') },
              { t: B('直接寫上「5 公尺」', 'Write “5 metres”'), why: B('公尺是人類的約定，外星人不知道。', 'The metre is a human convention; aliens do not know it.') },
              { t: B('用全宇宙都一樣的物理常數來定義單位（前幾張圖就是在做這件事）', 'Define the unit with a physical constant that is the same everywhere (the first few images do exactly this)'), correct: true, why: B('對！物理常數在哪裡都一樣，所以可以當作「共通的尺」。', 'Right! A physical constant is the same everywhere, so it works as a shared ruler.') },
              { t: B('以地球的直徑當作 1 個單位', 'Use Earth’s diameter as one unit'), why: B('外星人要先知道地球有多大，才看得懂，等於繞了一圈。', 'Aliens would first need to know Earth’s size: a circular definition.') }
            ] },
          { q: B('這和「火星氣候軌道器」的故事有什麼共通點？', 'What does this share with the Mars Climate Orbiter story?'),
            options: [
              { t: B('兩個故事都是在說太空船的發射失敗', 'Both are about launch failures'), why: B('兩者都不是發射失敗。', 'Neither was a launch failure.') },
              { t: B('兩個故事都跟火星探測有直接關係', 'Both are directly about Mars exploration'), why: B('金唱片和火星沒有直接關係。', 'The Golden Record is not directly about Mars.') },
              { t: B('單位若沒有被共同定義清楚，同一個數字對不同人就有不同意思', 'If units are not defined in common, the same number means different things to different people'), correct: true, why: B('對！不論是給外星人看，還是兩個工程團隊交接，單位都是溝通的基礎。', 'Right! Whether for aliens or two engineering teams, units are the basis of communication.') },
              { t: B('兩個故事都是因為電腦程式寫錯造成的', 'Both were caused by a coding error'), why: B('金唱片的問題是「怎麼溝通」，不是程式錯誤。', 'The Golden Record’s challenge is communication, not a bug.') }
            ] }
        ],
        success: B('你想通了「單位」是共同語言的基礎！', 'You see that units are the basis of a common language!') } },

    { level: 3, icon: '🧑‍🔬', name: B('菲利克斯·德拉蒙德', 'Felix Drummond'), job: B('金唱片技術主任（technical director）', 'Golden Record technical director'),
      bio: B('技術主任要回答：這張唱片要怎麼做，才能撐過幾十億年的太空旅行？又要怎麼讓聰明的外星人「猜出」怎麼播放？',
             'The technical director asks how to build a record that can last through billions of years in space, and how a clever finder could work out how to play it.'),
      stars: 3, tip: B('用工程邏輯判斷', 'Use engineering logic'),
      quest: { type: 'choice', title: B('專屬任務：怎麼讓它撐得久、讀得懂？', 'Role mission: make it last, make it readable'),
        scenario: B('團隊決定用「金屬唱片」，而不是磁帶。再想想怎麼讓收到的人播放它。', 'The team chose a metal record rather than magnetic tape. Now think about how a finder could play it.'),
        questions: [
          { q: B('團隊選用金屬唱片而不是磁帶，最主要的原因是？', 'Why did the team choose a metal record rather than magnetic tape?'),
            options: [
              { t: B('唱片比磁帶便宜，也比較好看', 'Records are cheaper and prettier'), why: B('重點是耐久，不是價格或外觀。', 'Durability, not price or looks, was the point.') },
              { t: B('磁帶太大，放不進太空船', 'Tape was too big for the spacecraft'), why: B('主要的考量是耐久性。', 'The main concern was durability.') },
              { t: B('唱片放不進磁帶機，外星人比較不會誤用', 'A record cannot be put in a tape player, so it avoids misuse'), why: B('這不是設計的考量。', 'That was not a design consideration.') },
              { t: B('金屬唱片在太空環境中比磁帶更耐久', 'A metal record outlasts magnetic tape in the space environment'), correct: true, why: B('對！這正是團隊的考量：金屬唱片能比磁帶更久。', 'Right! That was the team’s reasoning: a metal record outlasts tape.') }
            ] },
          { q: B('要讓完全不認識唱片的文明播放它，最重要的設計是？', 'To let a civilization that has never seen a record play it, what is the key design?'),
            options: [
              { t: B('在保護套上用符號圖說明怎麼用唱針播放，並附上唱針與卡匣', 'Symbolic instructions on the jacket on how to play it, plus a needle and cartridge'), correct: true, why: B('對！有說明圖，加上附的唱針與卡匣，才有機會被播放。', 'Right! With instructions and a supplied cartridge and needle, the record can be played.') },
              { t: B('在保護套上用很多種語言寫下說明書', 'Write a manual in many languages on the jacket'), why: B('外星人不一定懂任何人類語言，要靠圖與符號。', 'Aliens may read no human language; use pictures and symbols.') },
              { t: B('把播放說明刻在唱片溝槽的最開頭', 'Cut the instructions at the start of the groove'), why: B('要先能播放才讀得到說明，這是循環。', 'You must play it to read it: a circular problem.') },
              { t: B('什麼都不說明，相信對方夠聰明', 'Explain nothing and trust that they are clever'), why: B('沒有說明，再好的內容也打不開。', 'Without instructions, even great content cannot be opened.') }
            ] }
        ],
        success: B('你像技術主任一樣，考慮到耐久與可讀性！', 'You considered durability and readability, like a technical director!') } },

    { level: 4, icon: '🧑‍🏫', name: B('賽勒斯·奧爾登', 'Cyrus Alden'), job: B('金唱片委員會主席、執行主任', 'Golden Record committee chair and executive director'),
      bio: B('主席帶領團隊在大約一年內決定：要用哪些圖、聲音和音樂來介紹地球？主席的難題是「公平」：要代表的是全人類，而不是某一種人。',
             'The chair led the team to choose within about a year the images, sounds and music that introduce Earth. The chair’s hard problem is fairness: to represent all of humanity, not one kind of people.'),
      stars: 4, tip: B('整合意見、公平取捨', 'Combine views, choose fairly'),
      quest: { type: 'choice', title: B('專屬任務：主席的兩個難題', 'Role mission: the chair’s two hard problems'),
        scenario: B('沒有標準答案，只有「最合理的取捨」。選出你認為最好的決定。', 'There is no single answer, only the most reasonable trade-off. Pick the best decision.'),
        questions: [
          { q: B('有人說：「搖滾樂太幼稚，不該放進唱片。」（歷史上真的有這樣的爭論，最後放進了〈Johnny B. Goode〉。）你怎麼決定？', 'Someone says: “Rock is too adolescent for the record.” (A real debate; “Johnny B. Goode” went on.) What do you decide?'),
            options: [
              { t: B('只放古典音樂，看起來最莊重', 'Only classical music; it looks the most dignified'), why: B('這樣只代表了一部分的人類。', 'That would represent only part of humanity.') },
              { t: B('投票決定，多數人喜歡什麼就放什麼', 'Vote and include whatever the majority likes'), why: B('多數決可能讓少數人的音樂完全被排除。', 'Majority rule may exclude minority music entirely.') },
              { t: B('由最懂音樂的專家決定，其他人不要干涉', 'Let the top music experts decide with no outside input'), why: B('專家的意見重要，但這是代表全人類的選擇，也需要多元的聲音。', 'Expert input matters, but this speaks for all of humanity and needs diverse voices.') },
              { t: B('放進不同風格、不同地區的音樂，因為要代表的是整個地球', 'Include different styles and regions, because the record speaks for the whole planet'), correct: true, why: B('對！主席的回應大意是：地球上本來就有很多年輕人。要公平，就要包含多樣性。', 'Right! The chair’s answer was in effect that there are plenty of young people on the planet. Fairness means including diversity.') }
            ] },
          { q: B('有人說：「也許永遠不會有人聽到，何必認真？」你怎麼回應？', 'Someone says: “Maybe no one will ever hear it, so why take it seriously?” How do you respond?'),
            options: [
              { t: B('也有道理，那就簡單做就好，省下時間做別的', 'Fair enough; keep it simple and save the time'), why: B('選擇的過程本身就有價值。', 'The act of choosing has its own value.') },
              { t: B('既然機率很低，就放最安全、不會有爭議的內容', 'The odds are low, so include only safe, uncontroversial content'), why: B('為了避免爭議而只放安全的內容，會讓它失去代表性。', 'Avoiding all controversy would strip it of representativeness.') },
              { t: B('就算沒人聽到，「選擇要說什麼」的過程，也讓我們重新思考自己是誰', 'Even if no one hears it, choosing what to say makes us rethink who we are'), correct: true, why: B('對！NASA 也坦白說，唱片只有在遇到有能力的太空文明時才可能被播放；但這個過程本身就是一次對人類的思考。', 'Right! NASA is honest that it will be played only if a capable space-faring civilization finds it; the process itself is a reflection on humanity.') },
              { t: B('把重心放在讓它「被找到」，內容反而不重要', 'Focus on making it findable; the content matters less'), why: B('內容才是唱片存在的意義。', 'The content is the point of the record.') }
            ] }
        ],
        success: B('你像主席一樣，兼顧公平與意義！', 'You balanced fairness and meaning, like a chair!') } }
  ];
  var m = window.MISSIONS.filter(function (x) { return x.id === 'record'; })[0];
  if (m) m.sources.push(
    { label: 'NASA Science: Golden Record Contents', url: 'https://science.nasa.gov/mission/voyager/golden-record-contents/', note: B('委員會成員與職稱', 'Committee members and roles') },
    { label: 'PBS The Farthest: World Beats in Space', url: 'https://www.pbs.org/the-farthest/mission/world-beats-space/', note: B('金唱片委員會的組成', 'Who made up the committee') }
  );
})();
