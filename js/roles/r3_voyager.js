/* 任務 3 航海家1號：4 位角色。
   Suzanne Dodd＝航海家計畫經理；Ed Stone＝長年的計畫科學家（1972–2022）；Linda Spilker＝計畫科學家（接續 Stone）；
   Gary Flandro＝1964 年在 JPL 發現外行星特殊排列、促成「大巡航」的航太工程師。
   專屬任務的數字：標「遊戲設定」者不是 NASA 規格；每年少約 4 瓦為 NASA 公布的概略值。 */
(function () {
  var B = window.B;
  window.ROLES = window.ROLES || {};
  window.ROLES.voyager = [
    { level: 1, icon: '🧑‍🚀', name: B('吉迪恩·佛洛斯特', 'Gideon Frost'), job: B('航太工程師：發現「大巡航」的行星排列', 'Aerospace engineer: spotted the planetary alignment behind the Grand Tour'),
      bio: B('在 1960 年代，這位工程師算出：1970 年代末，外行星會排成一個難得的順序，一艘太空船可以靠重力一顆接一顆「借力」飛過去。這就是航海家號大巡航的起點。',
             'In the 1960s this engineer worked out that in the late 1970s the outer planets would line up so that one spacecraft could use each planet’s gravity to fly on to the next. That was the seed of Voyager’s Grand Tour.'),
      stars: 1, tip: B('看時間、做簡單計算', 'Read dates, simple maths'),
      quest: { type: 'calc', title: B('專屬任務：一個難得的排列', 'Role mission: a rare alignment'),
        scenario: B('這類外行星排列大約每 175 年才出現一次（概略值）。航海家2號 1977 年發射，1989 年飛過海王星。', 'This kind of outer-planet alignment comes about once every 175 years (approximate). Voyager 2 launched in 1977 and flew past Neptune in 1989.'),
        questions: [
          { q: B('如果錯過 1977 年這一次，下一次類似的排列大約在哪一年？（1977 ＋ 175）', 'If we missed the 1977 chance, about which year would the next one be? (1977 + 175)'),
            answer: 2152, tol: 3, hint: B('1977 + 175 = 2152。', '1977 + 175 = 2152.'),
            explain: B('約 2152 年。所以科學家們非常珍惜這個機會。', 'About 2152. That is why scientists treasured the chance.') },
          { q: B('航海家2號從發射到飛過海王星，花了幾年？（1989 − 1977）', 'How many years from Voyager 2’s launch to its Neptune flyby? (1989 − 1977)'),
            answer: 12, tol: 0.5, hint: B('1989 − 1977 = 12。', '1989 − 1977 = 12.'),
            explain: B('12 年。大巡航需要很長的耐心。', '12 years. The Grand Tour took great patience.') }
        ],
        success: B('你算出了這個難得的機會！', 'You worked out how rare that chance was!') } },

    { level: 2, icon: '🧑‍🔬', name: B('莉娜·沃斯', 'Lena Voss'), job: B('航海家計畫科學家', 'Voyager Project Scientist'),
      bio: B('計畫科學家負責「讓資料變成科學」：儀器傳回的訊號，到底說明了什麼？這個職務也常要和其他任務的科學家合作。',
             'A project scientist turns data into science: what do the instruments’ signals mean? The job often means working with scientists from other missions.'),
      stars: 2, tip: B('看證據、做選擇', 'Read evidence and choose'),
      quest: { type: 'choice', title: B('專屬任務：怎麼知道它出了太陽的泡泡？', 'Role mission: how do we know it left the Sun’s bubble?'),
        scenario: B('2012 年，航海家1號的儀器偵測到周圍的環境有了大變化。', 'In 2012 Voyager 1’s instruments detected a big change in its surroundings.'),
        questions: [
          { q: B('科學家判斷航海家1號進入了星際空間，最關鍵的證據是什麼？', 'What was the key evidence that Voyager 1 had entered interstellar space?'),
            options: [
              { t: B('周圍磁場的方向突然轉了 90 度', 'The magnetic field direction suddenly turned 90 degrees'), why: B('實際上磁場方向沒有如預期的改變，這也是當時讓科學家意外的地方，所以不能靠它判斷。', 'In fact the field direction did not change as expected, which surprised scientists, so it could not be the deciding evidence.') },
              { t: B('周圍的電漿（帶電粒子）密度明顯變高', 'The surrounding plasma density rose sharply'), correct: true, why: B('對！星際空間的電漿比太陽風泡泡內濃得多，電漿波儀「聽」到了這個變化。', 'Right! Interstellar plasma is much denser than inside the Sun’s bubble, and the plasma wave instrument “heard” the change.') },
              { t: B('太陽的亮度突然變暗了', 'The Sun suddenly looked dimmer'), why: B('距離再遠，太陽看起來也不會一下子明顯變暗，這不是判斷依據。', 'Even far away the Sun does not abruptly dim; this is not the evidence.') },
              { t: B('通訊訊號突然變得比較快', 'Its radio signals suddenly travelled faster'), why: B('無線電訊號的速度是固定的光速，不會因為進入星際空間而改變。', 'Radio signals always travel at light speed; entering interstellar space does not change that.') }
            ] },
          { q: B('1990 年，航海家1號回頭拍下「淡藍色小點」。這張照片最重要的意義是？', 'In 1990 Voyager 1 looked back and took the “Pale Blue Dot”. What is its main meaning?'),
            options: [
              { t: B('證明從太空看得到地球上的人類城市', 'It proves human cities can be seen from space'), why: B('從那麼遠的地方，地球只是不到一個像素的小點，看不到任何城市。', 'From that far away Earth is less than one pixel; no city can be seen.') },
              { t: B('提醒我們：從遠處看，地球是一個很小、很脆弱的家', 'It reminds us that, from far away, Earth is a small and fragile home'), correct: true, why: B('對！這張照片常被用來提醒人們地球的渺小與珍貴。', 'Right! The picture is often used to remind people how small and precious Earth is.') },
              { t: B('用來精確測量地球的大小與重量', 'It was used to measure Earth’s size and mass precisely'), why: B('照片的目的不是測量，那樣的解析度也做不到。', 'Measuring was not its purpose, and the resolution could not do it.') },
              { t: B('證明地球是太陽系中最亮的行星', 'It proves Earth is the brightest planet'), why: B('地球並不是最亮的行星，而且這張照片的重點不在亮度。', 'Earth is not the brightest planet, and brightness is not the point.') }
            ] }
        ],
        success: B('你讓證據說話了！', 'You let the evidence speak!') } },

    { level: 3, icon: '🧑‍💼', name: B('蘇菲亞·丹尼爾斯', 'Sofia Daniels'), job: B('航海家計畫經理（JPL）', 'Voyager Project Manager (JPL)'),
      bio: B('計畫經理要讓兩艘年紀超過 45 歲的太空船繼續工作。核能電池的電力每年都在減少，必須一年一年決定：哪一項儀器先關機？',
             'The project manager keeps two spacecraft, more than 45 years old, working. Their nuclear batteries produce less power every year, so each year she must decide which instrument goes off first.'),
      stars: 3, tip: B('算帳、做取捨', 'Do the accounts, make trade-offs'),
      quest: { type: 'calc', title: B('專屬任務：電力的減法', 'Role mission: the subtraction of power'),
        scenario: B('NASA 說，航海家號的核能電池發出的電力，每年大約減少 4 瓦。請用這個數字算算看。', 'NASA says Voyager’s nuclear batteries lose about 4 watts of power each year. Use that number.'),
        questions: [
          { q: B('10 年後，電力大約少了幾瓦？', 'After 10 years, about how many watts are lost?'),
            answer: 40, tol: 1, hint: B('4 瓦 × 10 年。', '4 W × 10 years.'), explain: B('4 × 10 = 40 瓦。', '4 × 10 = 40 W.') },
          { q: B('25 年後，電力大約少了幾瓦？', 'After 25 years, about how many watts are lost?'),
            answer: 100, tol: 2, hint: B('4 瓦 × 25 年。', '4 W × 25 years.'), explain: B('4 × 25 = 100 瓦。電力越來越少，所以儀器要一個一個關閉，保住最重要的。', '4 × 25 = 100 W. With less and less power, instruments are switched off one by one to protect the most important ones.') }
        ],
        success: B('你算出了電力一年年的流失！', 'You worked out the yearly loss of power!') } },

    { level: 4, icon: '🧑‍🏫', name: B('愛德溫·黑爾', 'Edwin Hale'), job: B('航海家資深計畫科學家', 'Voyager Senior Project Scientist'),
      bio: B('這位計畫科學家從任務規劃階段就加入，一做就是幾十年。計畫科學家要在儀器越來越少的時候，選出「最值得保留」的科學。',
             'This project scientist joined at the planning stage and stayed for decades. When instruments must be shut down, a project scientist chooses which science is most worth keeping.'),
      stars: 4, tip: B('整合條件、判斷價值', 'Combine constraints, judge value'),
      quest: { type: 'choice', title: B('專屬任務：先關哪一台？', 'Role mission: which one goes off first?'),
        scenario: B('電力不夠了，必須關掉儀器。沒有標準答案，只有「最合理」的取捨。（情境是遊戲設定）', 'Power is short and instruments must be switched off. There is no single answer, only the most reasonable trade-off. (The scenario is a game setting.)'),
        questions: [
          { q: B('電力不夠了，必須先關一台：A 測量星際空間的磁場與電漿（只有航海家號能直接測到）、B 在這個距離幾乎測不到東西的舊儀器、C 耗電最多、但資料已有許多備份的儀器。先關哪一台？', 'Power is short and one must go first: A measures interstellar magnetic field and plasma (only Voyager can), B is an old instrument detecting almost nothing at this distance, C draws the most power but its data are already well covered. Which goes first?'),
            options: [
              { t: B('先關 A：它的資料最特別，最需要保護，所以讓它「休息」', 'A first: its data are the most special, so let it “rest”'), why: B('關掉 A 就等於放棄「只有航海家號能做」的測量，這正是最該保住的科學。', 'Switching off A gives up the measurements only Voyager can make: the science most worth keeping.') },
              { t: B('先關 C：耗電最多，省電效果最大', 'C first: biggest saving'), why: B('省得多不等於最划算；C 有備份，但 B 貢獻更少，先關 B 損失最小。', 'Biggest saving is not best value; C is backed up, but B contributes even less, so B costs the least to lose.') },
              { t: B('先關 B：它能貢獻的科學最少，損失最小，其他再看電力狀況逐步調整', 'B first: least science lost; adjust the others step by step as power requires'), correct: true, why: B('對！保住「只有航海家號能做」的測量，再用貢獻最少的先關，是最合理的取捨。', 'Right! Protect what only Voyager can measure and shut down the lowest contributor first.') },
              { t: B('三台都降低功率，平均分擔', 'Reduce all three equally'), why: B('平均分擔可能讓每一台都低到不能用，反而什麼科學也做不了。', 'Equal cuts may leave every instrument unusable and produce no science at all.') }
            ] },
          { q: B('有人說：「反正以後總有一天會全部關機，何必這麼麻煩？」你怎麼回答？', 'Someone says: “Everything will be switched off one day anyway, so why bother?” How do you answer?'),
            options: [
              { t: B('有道理，與其花力氣取捨，不如把資源轉去規劃新任務', 'Fair point; spend the effort planning new missions instead'), why: B('每多撐一年，就多一年獨一無二的星際空間資料，取捨是值得的。', 'Each extra year brings another year of unique interstellar data; the trade-offs are worth it.') },
              { t: B('把所有儀器的功率一起調低，這樣大家都能撐久一點', 'Turn every instrument down together so all last longer'), why: B('功率低到某個程度，儀器就無法正常測量，這樣撐久也沒有資料。', 'Below some power level instruments cannot measure properly; lasting longer would yield no data.') },
              { t: B('等到真的沒電再關，現在不用煩惱', 'Wait until the power truly runs out'), why: B('突然沒電可能讓最重要的儀器來不及保存資料，要有計畫地逐步關閉。', 'A sudden blackout may take the most important instruments with no chance to save data; shut down in planned steps.') },
              { t: B('正因為終有一天會關機，才要把剩下的電力用在最有價值的科學上', 'Precisely because the end will come, spend the remaining power on the most valuable science'), correct: true, why: B('對！資源有限時，最重要的是把它用在刀口上。', 'Right! When resources are limited, spend them where they count.') }
            ] }
        ],
        success: B('你像計畫科學家一樣，把有限的電力用在刀口上！', 'You spent limited power where it counts, like a project scientist!') } }
  ];
  var m = window.MISSIONS.filter(function (x) { return x.id === 'voyager'; })[0];
  if (m) m.sources.push(
    { label: 'NASA Science: Voyager', url: 'https://science.nasa.gov/mission/voyager/', note: B('任務概況與團隊', 'Mission overview and team') }
  );
})();
