/* 金唱片「唱片裡有什麼？」跨頁的資料。
   來源（皆為 NASA 官方頁面，網站只放文字與連結，不複製受著作權保護的圖像或音樂）：
   - 內容總覽 https://science.nasa.gov/mission/voyager/golden-record-contents/
   - 圖像清單 https://science.nasa.gov/mission/voyager/golden-record-contents/images/
   - 聲音與音樂 https://science.nasa.gov/mission/voyager/golden-record-contents/sounds/
   - 問候語 https://science.nasa.gov/mission/voyager/golden-record-contents/greetings/
   - 唱片封面與位置 https://science.nasa.gov/mission/voyager/golden-record-cover/
   中文翻譯、主題圖示為本專案自行製作。 */
(function () {
  var NASA = 'https://science.nasa.gov/mission/voyager/golden-record-contents/';
  window.RECORD_DATA = {
    links: {
      images: NASA + 'images/', sounds: NASA + 'sounds/', music: NASA + 'sounds/#music', greetings: NASA + 'greetings/',
      overview: NASA, cover: 'https://science.nasa.gov/mission/voyager/golden-record-cover/'
    },
    /* 圖像主題：出自 NASA 圖像清單的標題；圖示為本專案自選的 emoji，非原圖。credit＝NASA 清單上列的攝影／出處（沒有列出的留空）。
       為了適合兒童閱讀，人類生殖與出生相關的條目不列入卡片（NASA 清單中仍有，可到官方頁面查看）。 */
    cards: [
      { i: '⭕', zh: '校準圓', en: 'Calibration circle' },
      { i: '🏛️', zh: '夜晚的聯合國大樓', en: 'UN building at night' },
      { i: '📏', zh: '物理單位定義', en: 'Physical unit definitions' },
      { i: '🏠', zh: '新墨西哥州的現代住宅', en: 'Modern house, Cloudcroft, New Mexico' },
      { i: '🪸', zh: '澳洲大堡礁赫倫島', en: 'Heron Island, Great Barrier Reef of Australia' },
      { i: '🛖', zh: '非洲的房屋建造', en: 'House construction, African' },
      { i: '🏜️', zh: '埃及、紅海、西奈半島與尼羅河', en: 'Egypt, Red Sea, Sinai Peninsula and the Nile' },
      { i: '🛒', zh: '超級市場', en: 'Supermarket' },
      { i: '🌍', zh: '抱著地球儀的孩子', en: 'Children with globe' },
      { i: '🏃', zh: '奧運短跑（波爾佐夫領先）', en: 'Sprinters, Valeri Borzov of the USSR in lead' },
      { i: '☀️', zh: '太陽', en: 'The Sun', credit: 'Hale Observatories' },
      { i: '🔬', zh: '細胞與細胞分裂', en: 'Cells and cell division', credit: 'Turtox / Cambosco' },
      { i: '🫀', zh: '人體構造（共 8 張）', en: 'Human anatomy (8 images)', credit: 'World Book' },
      { i: '👨‍👧', zh: '父女（馬來西亞）', en: 'Father and daughter (Malaysia)', credit: 'David Harvey' },
      { i: '🧒', zh: '一群孩子', en: 'Group of children', credit: 'Ruby Mera, UNICEF' },
      { i: '👪', zh: '家庭合照', en: 'Family portrait', credit: 'Nina Leen, Time, Inc.' },
      { i: '🌊', zh: '海岸', en: 'Seashore', credit: 'Dick Smith' },
      { i: '🏔️', zh: '蛇河與大提頓山', en: 'Snake River and Grand Tetons', credit: 'Ansel Adams' },
      { i: '🏖️', zh: '沙丘', en: 'Sand dunes', credit: 'George Mobley' },
      { i: '🪨', zh: '紀念碑谷', en: 'Monument Valley', credit: 'Shostal Associates, Inc.' },
      { i: '🍄', zh: '長著蘑菇的森林', en: 'Forest scene with mushrooms', credit: 'Bruce Dale' },
      { i: '🍃', zh: '一片葉子', en: 'Leaf', credit: 'Arthur Herrick' },
      { i: '🍂', zh: '落葉', en: 'Fallen leaves', credit: 'Jodi Cobb' },
      { i: '❄️', zh: '雪花與紅杉', en: 'Snowflake over Sequoia', credit: 'Josef Muench, R. Sisson' },
      { i: '🌼', zh: '開滿水仙的樹', en: 'Tree with daffodils', credit: 'Gardens Winterthur, Winterthur Museum' },
      { i: '🦋', zh: '停在花上的飛行昆蟲', en: 'Flying insect with flowers', credit: 'Stephen Dalton' },
      { i: '🐚', zh: '貝殼', en: 'Seashell (Xancidae)', credit: 'Harry N. Abrams, Inc.' },
      { i: '🐬', zh: '海豚', en: 'Dolphins', credit: 'Thomas Nebbia' },
      { i: '🐟', zh: '魚群', en: 'School of fish', credit: 'David Doubilet' },
      { i: '🐸', zh: '樹蛙', en: 'Tree toad', credit: 'Dave Wickstrom' },
      { i: '🐊', zh: '鱷魚', en: 'Crocodile', credit: 'Peter Beard' }
    ],
    /* NASA〈Howdy, Strangers〉文章提到的唱片聲音範例（音檔直連網址無法驗證，所以不放連結，只連到 NASA 播放清單頁） */
    sounds: [
      { i: '⛈️', zh: '暴風雨', en: 'Rainstorm' },
      { i: '🐵', zh: '黑猩猩', en: 'Chimpanzee' },
      { i: '🚂', zh: '火車', en: 'Train' },
      { i: '💋', zh: '親吻', en: 'Kiss' }
    ],
    soundNote: ['唱片還收錄了海浪、風、雷、鳥鳴、鯨魚等許多自然與人類活動的聲音。完整播放清單在 NASA 官方頁面。',
      'The record also carries surf, wind, thunder, birds, whales and many other natural and human sounds. The full playlist is on NASA\'s page.'],
    /* 55 種語言問候：[英文名, 中文名, NASA 頁面的英文翻譯, 中文翻譯, 直接音檔(有查證的才放)] */
    greetings: [
      ['Akkadian', '阿卡德語', 'May all be very well.', '願一切都很好。'],
      ['Amoy (Min dialect)', '閩南語（廈門話）', 'Friends from space, how are you all? Have you eaten yet? Come visit us if you have time.', '太空來的朋友，你們好嗎？吃飽了沒？有空來找我們玩。'],
      ['Arabic', '阿拉伯語', 'Greetings to our friends in the stars. We wish that we will meet you someday.', '向星星上的朋友問好。我們希望有一天能和你們見面。'],
      ['Aramaic', '亞蘭語', 'Peace', '平安。'],
      ['Armenian', '亞美尼亞語', 'To all those who exist in the universe, greetings.', '向宇宙中所有存在的生命問好。'],
      ['Bengali', '孟加拉語', 'Hello! Let there be peace everywhere.', '哈囉！願各地都平安。'],
      ['Burmese', '緬甸語', 'Are you well?', '你們好嗎？'],
      ['Cantonese', '粵語', 'Hi. How are you? Wish you peace, health and happiness.', '嗨，你好嗎？祝你們平安、健康、快樂。'],
      ['Czech', '捷克語', 'Dear Friends, we wish you the best.', '親愛的朋友，祝你們一切都好。'],
      ['Dutch', '荷蘭語', 'Dear/sincere greetings to everyone', '向大家致上誠摯的問候。'],
      ['English', '英語', 'Hello from the children of planet Earth.', '來自地球小朋友的問候。'],
      ['French', '法語', 'Hello everybody.', '大家好。'],
      ['German', '德語', 'Heartfelt greetings to all.', '向大家獻上衷心的問候。'],
      ['Greek', '希臘語', 'Greetings to you, whoever you are. We come in friendship to those who are friends.', '不論你是誰，向你問好。我們懷著友誼，來找願意成為朋友的人。'],
      ['Gujarati', '古吉拉特語', 'Greetings from a human being of the Earth. Please contact.', '來自地球人類的問候。請與我們聯絡。'],
      ['Hebrew', '希伯來語', 'Peace.', '平安。'],
      ['Hindi', '印地語', 'Greetings from the inhabitants of this world.', '來自這個世界居民的問候。'],
      ['Hittite', '赫梯語', 'Hail.', '致敬。'],
      ['Hungarian (Magyar)', '匈牙利語', 'We are sending greetings in the Hungarian language to all peace-loving beings in the Universe.', '我們用匈牙利語，向宇宙中所有愛好和平的生命問好。'],
      ['Ila (Zambia)', '伊拉語（尚比亞）', 'We wish all of you well.', '祝你們大家都好。'],
      ['Indonesian', '印尼語', 'Good night, ladies and gentlemen. Goodbye and see you next time.', '各位晚安，再見，下次見。'],
      ['Italian', '義大利語', 'Many greetings and wishes.', '獻上許多問候與祝福。'],
      ['Japanese', '日語', 'Hello? How are you?', '哈囉？你好嗎？'],
      ['Kannada (Kanarese)', '卡納達語', 'Greetings. On behalf of Kannada-speaking people, "good wishes."', '問好。代表說卡納達語的人，致上「美好的祝福」。'],
      ['Kechua (Quechua)', '克丘亞語', 'Hello to everybody from this Earth, in Kechua language.', '用克丘亞語，向所有人問好，來自這個地球。'],
      ['Korean', '韓語', 'How are you?', '你好嗎？'],
      ['Latin', '拉丁語', 'Greetings to you, whoever you are; we have good will towards you and bring peace across space.', '不論你是誰，向你問好；我們對你懷著善意，並把和平帶過太空。'],
      ['Luganda (Ganda)', '盧干達語', 'Greetings to all peoples of the universe. God give you peace always.', '向宇宙中所有的人民問好。願上帝永遠賜給你們平安。'],
      ['Mandarin Chinese', '華語（普通話）', "Hope everyone's well. We are thinking about you all. Please come here to visit when you have time.", '希望大家都好。我們很想念你們。有空請到這裡來玩。'],
      ['Marathi', '馬拉地語', 'Greetings. The people of the Earth send their good wishes.', '問好。地球上的人們送上美好的祝福。'],
      ['Nepali', '尼泊爾語', 'Wishing you a peaceful future from the earthlings.', '地球人祝你們有一個平安的未來。'],
      ['Nguni (Zulu)', '恩古尼語（祖魯語）', 'We greet you, great ones. We wish you longevity.', '偉大的朋友，我們向你們問好，祝你們長壽。'],
      ['Nyanja', '尼揚賈語', 'How are all you people of other planets?', '其他星球上的大家，你們好嗎？'],
      ['Oriya', '奧里亞語', 'Greetings to the inhabitants of the universe from the third planet Earth of the star Sun.', '來自太陽系第三顆行星地球，向宇宙的居民問好。'],
      ['Persian', '波斯語', 'Greetings to the residents of far skies.', '向遙遠天空的居民問好。'],
      ['Polish', '波蘭語', 'Welcome, creatures from beyond the outer world.', '歡迎，來自世界之外的生命。'],
      ['Portuguese', '葡萄牙語', 'Peace and happiness to all.', '願大家和平快樂。'],
      ['Punjabi', '旁遮普語', 'Welcome home. It is a pleasure to receive you.', '歡迎回家。很高興迎接你們。'],
      ['Rajasthani', '拉賈斯坦語', 'Hello to everyone. We are happy here and you be happy there.', '大家好。我們在這裡很快樂，也祝你們在那裡快樂。'],
      ['Romanian', '羅馬尼亞語', 'Greetings to everybody.', '向大家問好。'],
      ['Russian', '俄語', 'Greetings! I Welcome You!', '問好！我歡迎你們！'],
      ['Serbian', '塞爾維亞語', 'We wish you everything good from our planet.', '我們從這顆行星，祝你們一切都好。'],
      ['Sinhalese', '僧伽羅語', 'Wish You a Long Life.', '祝你們長壽。'],
      ['Sotho (Sesotho)', '索托語', 'We greet you, O great ones.', '偉大的朋友，我們向你們問好。'],
      ['Spanish', '西班牙語', 'Hello and greetings to all.', '大家好，向所有人問好。'],
      ['Sumerian', '蘇美語', 'May all be well.', '願一切安好。'],
      ['Swedish', '瑞典語', 'Greetings from a computer programmer in the little university town of Ithaca on the planet Earth', '來自地球上小小大學城綺色佳的一位程式設計師，向你們問好。'],
      ['Telugu', '泰盧固語', 'Greetings. Best wishes from Telugu-speaking people.', '問好。說泰盧固語的人們送上最好的祝福。'],
      ['Thai', '泰語', 'We in this world send you our good will', '這個世界的我們，向你們送上善意。'],
      ['Turkish', '土耳其語', 'Dear Turkish-speaking friends, may the honors of the morning be upon your heads.', '親愛的說土耳其語的朋友，願早晨的榮光降臨在你們身上。'],
      ['Ukrainian', '烏克蘭語', 'We are sending greetings from our world, wishing you happiness, goodness, good health and many years.', '我們從我們的世界送上問候，祝你們幸福、美好、健康、長壽。'],
      ['Urdu', '烏爾都語', 'Peace on you. We the inhabitants of this earth send our greetings to you.', '願你們平安。我們這個地球的居民向你們問好。'],
      ['Vietnamese', '越南語', 'Sincerely send you our friendly greetings.', '誠摯地向你們送上友好的問候。'],
      ['Welsh', '威爾斯語', 'Good health to you now and forever.', '願你們現在與永遠都健康。'],
      ['Wu', '吳語', 'Best wishes to you all.', '祝你們大家一切都好。']
    ],
    chinese: ['Amoy (Min dialect)', 'Cantonese', 'Mandarin Chinese', 'Wu'],
    /* NASA「Music from Earth」表列的曲目（頁面上列出的部分）：[地區中文, 地區英文, 曲目, 演出／錄音] */
    music: [
      ['德國', 'Germany', 'Bach: Brandenburg Concerto No. 2, 1st movement', 'Munich Bach Orchestra, Karl Richter'],
      ['爪哇', 'Java', 'Court gamelan, “Kinds of Flowers”', 'recorded by Robert Brown'],
      ['薩伊（今剛果民主共和國）', 'Zaire', 'Pygmy girls\' initiation song', 'recorded by Colin Turnbull'],
      ['新幾內亞', 'New Guinea', 'Men\'s house song', 'recorded by Robert MacLennan'],
      ['德國', 'Germany', 'Bach: Gavotte en rondeaux, Partita No. 3 for Violin', 'Arthur Grumiaux'],
      ['奧地利', 'Austria', 'Mozart: The Magic Flute, Queen of the Night aria', 'Edda Moser'],
      ['美國', 'United States', '“Melancholy Blues”', 'Louis Armstrong and his Hot Seven'],
      ['亞塞拜然', 'Azerbaijan', 'Bagpipes', 'recorded by Radio Moscow'],
      ['德國', 'Germany', 'Bach: The Well-Tempered Clavier, Book 2, Prelude and Fugue in C', 'Glenn Gould'],
      ['德國', 'Germany', 'Beethoven: Fifth Symphony, 1st movement', 'Philharmonia Orchestra, Otto Klemperer'],
      ['保加利亞', 'Bulgaria', '“Izlel je Delyo Hagdutin”', 'sung by Valya Balkanska'],
      ['美國', 'United States', 'Navajo Indians, Night Chant', 'recorded by Willard Rhodes'],
      ['印度', 'India', 'Raga, “Jaat Kahan Ho”', 'sung by Surshri Kesar Bai Kerkar'],
      ['德國', 'Germany', 'Beethoven: String Quartet No. 13, Cavatina', 'Budapest String Quartet']
    ]
  };
})();
