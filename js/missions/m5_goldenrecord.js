/* 任務 5：金唱片 Voyager Golden Record。事實來源：NASA Science「Golden Record Contents」。 */
(function () {
  var B = window.B;
  var cats = { img: B('圖像', 'Images'), snd: B('自然聲音', 'Natural sounds'), mus: B('音樂', 'Music'), hello: B('問候', 'Greetings') };
  var budgetItems = [
    { id: 'i1', cat: 'img', icon: '🌍', name: B('地球全景圖', 'Whole-Earth picture'), desc: B('告訴對方我們住在哪', 'Shows where we live'), cost: 3, value: 3 },
    { id: 'i2', cat: 'img', icon: '🧬', name: B('人體構造圖', 'Human anatomy'), desc: B('我們長什麼樣子', 'What we look like'), cost: 2, value: 2 },
    { id: 'i3', cat: 'img', icon: '➕', name: B('數學與科學符號', 'Math and science symbols'), desc: B('共同的「語言」', 'A shared “language”'), cost: 2, value: 3 },
    { id: 's1', cat: 'snd', icon: '🌊', name: B('海浪聲', 'Ocean surf'), desc: B('地球的自然環境', 'Earth’s natural world'), cost: 2, value: 2 },
    { id: 's2', cat: 'snd', icon: '🐋', name: B('鯨魚歌聲', 'Whale song'), desc: B('其他生物也會「說話」', 'Other creatures “talk” too'), cost: 2, value: 2 },
    { id: 's3', cat: 'snd', icon: '⛈️', name: B('雷聲', 'Thunder'), desc: B('地球的天氣', 'Earth’s weather'), cost: 1, value: 1 },
    { id: 'm1', cat: 'mus', icon: '🎻', name: B('經典名曲', 'A classical masterpiece'), desc: B('人類的藝術', 'Human art'), cost: 4, value: 4 },
    { id: 'm2', cat: 'mus', icon: '🪕', name: B('各地民謠', 'A folk song'), desc: B('不同地方的音樂', 'Music from another place'), cost: 3, value: 3 },
    { id: 'h1', cat: 'hello', icon: '👋', name: B('一句「你好」', 'One “hello”'), desc: B('最簡單的問候', 'The simplest greeting'), cost: 1, value: 1 },
    { id: 'h2', cat: 'hello', icon: '🗣️', name: B('多種語言的問候（真實唱片有 55 種）', 'Greetings in many languages (the real record has 55)'), desc: B('不只一種人', 'More than one kind of people'), cost: 3, value: 3 }
  ];
  window.MISSIONS.push({
    id: 'record', icon: '💿', color: '#f5c542',
    title: B('金唱片：寫給宇宙的一封信', 'The Golden Record: a letter to the universe'),
    tagline: B('兩張隨航海家號離開太陽系的地球名片', 'Two calling cards of Earth leaving the solar system'),
    cover: 'PIA14113',
    story: [
      { title: B('一張不是用來聽的唱片', 'A record that is not for us'), img: 'PIA21741',
        text: B('1977 年，每一艘航海家號都帶著一張 12 吋的鍍金唱片。它不是給我們聽的：它是寫給也許存在的外星文明、或遙遠未來的人的一封信。',
                'In 1977 each Voyager spacecraft carried a 12-inch gold-plated phonograph record. It was not for us to listen to: it was a letter to possible alien civilizations, or people in the far future.') },
      { title: B('誰決定放什麼？', 'Who decided what goes on it?'),
        text: B('天文學家薩根（Carl Sagan）和他的同事們，要在有限的空間裡，決定怎麼介紹地球。他們選了 115 張圖像、大自然的聲音（海浪、風、雷、鳥、鯨魚等）、約 90 分鐘跨文化與年代的音樂，以及 55 種語言的問候。',
                'Astronomer Carl Sagan and his colleagues had to decide how to introduce Earth in very limited space. They chose 115 images, sounds of nature (surf, wind, thunder, birds, whales and more) about 90 minutes of music from different cultures and eras, and greetings in 55 languages.') },
      { title: B('怎麼播放？', 'How do you play it?'), img: 'PIA14113',
        text: B('唱片的音訊部分設計以每分鐘 16⅔ 轉播放；圖像則用類比方式編碼在唱片上。每張唱片裝在鋁製保護套裡，附有唱針與卡匣，套上用符號語言說明飛行器的來源與播放方法。',
                'The audio is designed to play at 16⅔ revolutions per minute, and the 115 images are encoded in analog form. Each record is encased in a protective aluminum jacket with a cartridge and a needle, and symbolic instructions explain the spacecraft\u2019s origin and how to play it.') },
      { title: B('有人會聽到嗎？', 'Will anyone hear it?'),
        text: B('NASA 說得很誠實：只有在星際空間裡遇到有能力的太空文明，唱片才可能被找到並播放。也許永遠不會有人聽到。但是，「選擇要說什麼」的過程，本身就是一次關於人類是誰的思考。',
                'NASA is honest about it: the record will be found and played only if advanced space-faring civilizations exist in interstellar space. Maybe no one ever will. But choosing what to say is itself a way of thinking about who we are.') },
      { title: B('一起出發', 'Setting off together'), img: 'PIA17035',
        text: B('金唱片和一面小國旗，一起放在航海家號上，成為「地球的紀念品」。航海家1號後來在 2012 年進入星際空間——唱片也跟著它，成為離我們最遠的人類訊息。',
                'The Golden Record and a small flag ride together on the Voyagers as “mementos of Earth”. Voyager 1 entered interstellar space in 2012, carrying the record with it as our farthest human message.') }
    ],
    hardware: [
      { icon: '💿', name: B('鍍金唱片', 'Gold-plated record'), short: B('12 吋，一艘航海家號帶一張', '12 inches, one on each Voyager'),
        how: B('和黑膠唱片原理相同：唱針沿著溝槽走，就能重新播放出聲音與圖像的訊號。', 'It works like a vinyl record: a stylus follows the groove to reproduce the sound and image signals.'),
        why: B('用「老技術」，因為它簡單又耐久，不需要電。', 'It uses “old technology” because it is simple and durable, and needs no power.') },
      { icon: '🖼️', name: B('115 張圖像', '115 images'), short: B('用類比方式編碼', 'Encoded in analog form'),
        how: B('把圖像變成訊號，刻進唱片溝槽裡；收到的人要設法把訊號還原成圖。', 'Images are turned into signals and cut into the grooves; the receiver must turn them back into pictures.'),
        why: B('用圖片介紹地球，比語言更容易跨越文化。', 'Pictures cross cultures more easily than language.') },
      { icon: '🎶', name: B('約 90 分鐘的音樂', 'About 90 minutes of music'), short: B('東西方經典與各地民族音樂', 'Classics East and West, plus world music'),
        how: B('以每分鐘 16⅔ 轉播放，比一般黑膠慢，才能在一張唱片上放進更長的內容。', 'Played at 16⅔ rpm, slower than normal vinyl, to fit longer content on one record.'),
        why: B('音樂可能是人類共通的表達方式。', 'Music may be a shared human way of expressing ourselves.') },
      { icon: '🌊', name: B('地球的聲音', 'Sounds of Earth'), short: B('海浪、風、雷、鳥、鯨魚…', 'Surf, wind, thunder, birds, whales…'),
        how: B('不用翻譯，就能讓對方知道地球是什麼樣的地方。', 'No translation needed to hear what kind of place Earth is.'),
        why: B('大自然的聲音是最「通用」的訊息。', 'Nature’s sounds are the most “universal” message.') },
      { icon: '🧰', name: B('保護套、唱針與說明圖', 'Jacket, needle and instructions'), short: B('讓收到的人知道怎麼播放', 'So a finder knows how to play it'),
        how: B('每張唱片裝在鋁製保護套裡，附有卡匣與唱針；套上用符號語言說明飛行器的來源與播放方法。', 'Each record is in a protective aluminum jacket with a cartridge and needle; symbolic instructions explain the spacecraft\u2019s origin and how to play it.'),
        why: B('沒有說明書，再好的內容也打不開。', 'Without instructions, even great content cannot be opened.') },
      { icon: '🛰️', name: B('航海家號', 'Voyager spacecraft'), short: B('唱片的「運送者」', 'The record’s carrier'),
        how: B('唱片被固定在探測器上，一起飛進星際空間。', 'The record is mounted on the spacecraft and travels with it into interstellar space.'),
        why: B('航海家號是目前飛得最遠的人造物之一。', 'Voyager is one of the farthest-travelled human-made objects.') }
    ],
    challenges: {
      1: { type: 'pick', title: B('你要寄什麼給外星人？', 'What would you send to aliens?'),
        scenario: B('唱片只有一點點空間。從下面的候選清單裡，選出你想寄的 3 樣（沒有標準答案）。', 'The record has only a little room. From this list, choose 3 things you would send (there is no single right answer).'),
        count: 3, rules: [],
        items: [
          { id: 'a', icon: '🌊', t: B('海浪聲', 'The sound of ocean waves'), tells: B('地球有水，而且有會動的海洋。', 'Earth has water, and a moving ocean.') },
          { id: 'b', icon: '😄', t: B('小朋友的笑聲', 'Children laughing'), tells: B('我們會開心，也會照顧下一代。', 'We feel joy and care for the next generation.') },
          { id: 'c', icon: '🎵', t: B('一首好聽的音樂', 'A beautiful piece of music'), tells: B('我們會創作，並且喜歡美的事物。', 'We create, and we love beautiful things.') },
          { id: 'd', icon: '👨‍👩‍👧', t: B('一張家人的照片', 'A photo of a family'), tells: B('我們有家庭，彼此相愛。', 'We have families and love each other.') },
          { id: 'e', icon: '➕', t: B('簡單的數學圖', 'A simple math diagram'), tells: B('我們懂得數學——也許是你和我之間共通的語言。', 'We understand maths, perhaps a language we share.') },
          { id: 'f', icon: '🗣️', t: B('一句「你好」', 'A friendly “hello”'), tells: B('我們想和你打招呼。', 'We want to say hello to you.') }
        ],
        explain: B('真正的金唱片也做了類似的選擇：自然的聲音、各地的音樂、圖像與問候，都是想告訴對方「我們是誰」。', 'The real Golden Record made similar choices: sounds of nature, music from many places, images and greetings, all saying “who we are”.'),
        success: B('你做了和真正的團隊一樣的事：用有限的空間，介紹地球。', 'You did what the real team did: introduce Earth within limited space.') },
      2: { type: 'budget', title: B('空間不夠用', 'Not enough room'),
        scenario: B('唱片只有 10 格空間。你要確保 4 種類型（圖像、自然聲音、音樂、問候）都至少有一項，而且總價值要夠高。', 'The record has just 10 storage cells. Make sure all 4 types (images, natural sounds, music, greetings) have at least one item and the total value is high enough.'),
        unit: B('格', 'cells'), items: budgetItems, cats: cats,
        rounds: [{ label: B('10 格空間，4 種類型都要有', '10 cells, all 4 types needed'), capacity: 10, minValue: 8, needCats: ['img', 'snd', 'mus', 'hello'],
          explain: B('好的選擇在「多樣」與「價值」之間取得平衡。真正的編輯小組也是這樣做決定的。', 'A good selection balances variety and value. The real editing team made decisions the same way.') }],
        note: B('遊戲設定：格數與價值分數是示意用的數字，不是真正金唱片的容量。', 'Game setting: cells and value scores are illustrative, not the real record’s capacity.'),
        success: B('你學到了：有限空間下，「涵蓋面」和「價值」都很重要。', 'You learned that with limited space both coverage and value matter.') },
      3: { type: 'calc', title: B('唱片轉一圈有多久？', 'How long does one turn take?'),
        scenario: B('金唱片的音訊設計以每分鐘 16⅔ 轉播放，約有 90 分鐘的音樂（NASA 資料）。', 'The Golden Record’s audio is designed to play at 16⅔ revolutions per minute, with about 90 minutes of music (NASA).'),
        questions: [
          { q: B('播完 90 分鐘的音樂，唱片大約轉了幾圈？（16⅔ ≈ 16.67 轉／分）', 'Playing 90 minutes of music, about how many revolutions does the record make? (16⅔ ≈ 16.67 rpm)'), answer: 1500, tol: 5, unit: B('圈', 'turns'),
            hint: B('16.67 × 90。', '16.67 × 90.'), explain: B('16.67 × 90 ≈ 1,500 圈。', '16.67 × 90 ≈ 1,500 turns.') },
          { q: B('一般黑膠唱片是每分鐘 33⅓ 轉，剛好是金唱片的 2 倍。如果用 33⅓ 轉播放同一段 90 分鐘的音樂，會在幾分鐘內播完？', 'Normal vinyl runs at 33⅓ rpm, exactly 2× the Golden Record’s speed. Playing the same 90 minutes of music at 33⅓ rpm, how many minutes would it take?'), answer: 45, tol: 0.5, unit: B('分鐘', 'minutes'),
            hint: B('轉速變 2 倍，時間變一半。', 'Twice the speed means half the time.'), explain: B('90 ÷ 2 = 45 分鐘。金唱片刻意慢轉，才能在一張唱片上放進更長的內容；也因此，播放速度一旦錯了，音樂就會變調、變快。', '90 ÷ 2 = 45 minutes. The record deliberately turns slowly to fit more content on one disc, and that is also why playing it at the wrong speed makes the music too fast and high.') }
        ],
        success: B('你用兩個數字，理解了為什麼金唱片需要「說明書」：播放速度錯了，聲音就全錯了。', 'With two numbers you saw why the record needs instructions: the wrong speed ruins the sound.') },
      4: { type: 'pick', title: B('公平地代表全人類', 'Fairly representing humanity'),
        scenario: B('你是編輯小組的成員，只能選 6 項。規則：至少要有 3 種「類型」（音樂／自然／圖像／問候），並且音樂要來自至少 2 個不同的地區，這樣才不會只代表一小部分的人。', 'You are on the editing team and can choose only 6 items. Rules: at least 3 different types (music / nature / images / greetings), and the music must come from at least 2 different regions, so you do not represent only a small part of humanity.'),
        count: 6,
        rules: [
          { type: 'cats', min: 3, fail: B('類型不夠多。請至少包含 3 種類型。', 'Not enough variety. Include at least 3 types.') },
          { type: 'regions', min: 2, fail: B('音樂的地區不夠多元。請讓音樂來自至少 2 個不同地區。', 'Music is not diverse enough. Use music from at least 2 different regions.') }
        ],
        items: [
          { id: 'm1', icon: '🎻', cat: 'mus', region: 'europe', t: B('歐洲的古典樂', 'European classical music'), tells: B('歐洲的藝術傳統。', 'A European art tradition.') },
          { id: 'm2', icon: '🎋', cat: 'mus', region: 'asia', t: B('亞洲傳統樂器', 'Traditional Asian instruments'), tells: B('亞洲的音樂與樂器。', 'Asian music and instruments.') },
          { id: 'm3', icon: '🥁', cat: 'mus', region: 'africa', t: B('非洲的鼓樂', 'African drumming'), tells: B('非洲的節奏與傳統。', 'African rhythm and tradition.') },
          { id: 'm4', icon: '🪈', cat: 'mus', region: 'americas', t: B('美洲的排笛', 'Pan flute from the Americas'), tells: B('美洲原住民的音樂傳統。', 'Indigenous music traditions of the Americas.') },
          { id: 'n1', icon: '🌊', cat: 'nat', region: 'global', t: B('海浪與風聲', 'Surf and wind'), tells: B('地球的自然環境。', 'Earth’s natural environment.') },
          { id: 'n2', icon: '🐦', cat: 'nat', region: 'global', t: B('鳥鳴', 'Birdsong'), tells: B('地球上有許多會發聲的生物。', 'Earth has many creatures that make sound.') },
          { id: 'g1', icon: '📸', cat: 'img', region: 'global', t: B('世界各地人們生活的照片', 'Photos of people’s lives worldwide'), tells: B('我們生活的樣子。', 'How we live.') },
          { id: 'g2', icon: '🧬', cat: 'img', region: 'global', t: B('DNA 與人體構造圖', 'DNA and human anatomy'), tells: B('我們的身體與生命的基礎。', 'Our bodies and the basis of life.') },
          { id: 'g3', icon: '➕', cat: 'img', region: 'global', t: B('數學與物理示意圖', 'Math and physics diagrams'), tells: B('一種可能共通的語言。', 'A possibly shared language.') },
          { id: 'h1', icon: '🗣️', cat: 'hello', region: 'global', t: B('多種語言的問候', 'Greetings in many languages'), tells: B('我們說很多不同的語言。', 'We speak many languages.') }
        ],
        explain: B('你的組合同時兼顧了「類型」與「地區」。真實的編輯小組也面臨同樣的難題：誰的聲音被放進去？誰沒有？這是科學，也是倫理。', 'Your set balances type and region. The real team faced the same question: whose voices are included, and whose are not? That is science and ethics.'),
        note: B('遊戲設定：候選項目是教學用的範例，不一定都在真正的金唱片上。', 'Game setting: these candidates are teaching examples and are not necessarily on the real Golden Record.'),
        success: B('你體驗了「代表性」的難題：在有限空間裡，要怎麼公平地說出全人類的故事？', 'You faced the problem of representation: how do you fairly tell humanity’s story in limited space?') }
    },
    science: [
      { icon: '🖼️', t: B('把 115 張圖像編碼在唱片上，讓不懂我們語言的對象，仍可能「看懂」地球。', 'Encoded 115 images on the record so a receiver who does not know our language might still “understand” Earth.') },
      { icon: '🎶', t: B('用自然的聲音與約 90 分鐘的音樂，介紹地球的環境與文化。', 'Used sounds of nature and about 90 minutes of music to introduce Earth’s environment and cultures.') },
      { icon: '🧠', t: B('這是一次「如何跟完全不認識的對象溝通」的科學與設計實驗。', 'It was a science-and-design experiment in how to communicate with someone who knows nothing about you.') },
      { icon: '🚀', t: B('跟著航海家號進入星際空間，成為人類離開地球最遠的訊息之一。', 'It travelled with Voyager into interstellar space and became one of humanity’s farthest messages.') }
    ],
    ending: B('金唱片仍然跟著航海家號在星際空間裡飛行。也許永遠不會有人聽見，但它讓我們學到：要介紹自己，並不容易，必須選擇、取捨，也要思考「我們到底是誰」。',
              'The Golden Record still flies with Voyager through interstellar space. Perhaps no one will ever hear it, but it taught us that introducing yourself is not easy: you must choose, make trade-offs, and think about who you really are.'),
    endImg: 'PIA17035',
    sources: [
      { label: 'NASA Science: Golden Record Contents', url: 'https://science.nasa.gov/mission/voyager/golden-record-contents/', note: B('115 張圖像、聲音、90 分鐘音樂、16⅔ 轉', '115 images, sounds, 90 minutes of music, 16⅔ rpm') },
      { label: 'NASA Science: Golden Record Images', url: 'https://science.nasa.gov/mission/voyager/golden-record-contents/images/', note: B('圖像說明', 'Image details') },
      { label: 'NASA Voyager FAQ', url: 'https://science.nasa.gov/mission/voyager/frequently-asked-questions/', note: B('2012 年進入星際空間', 'Interstellar space in 2012') },
      { label: 'NASA Image Library: PIA14113', url: 'https://images.nasa.gov/details/PIA14113', note: B('12 吋鍍金唱片', '12-inch gold-plated record') },
      { label: 'NASA Image Library: PIA17035', url: 'https://images.nasa.gov/details/PIA17035', note: B('地球的紀念品', 'Mementos of Earth') }
    ]
  });
})();
