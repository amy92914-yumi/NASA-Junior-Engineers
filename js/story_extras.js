/* 故事加值：每頁的「任務控制室日誌」（情境描寫）與補上的圖片／示意圖。
   日誌是為了讓讀者「身歷其境」而寫的場景，不是真實紀錄或真實對話；事實部分仍以各頁正文與資料來源為準。
   結構：EXTRAS[任務 id] = { story: [ {img?, log} × 每個故事頁 ], banners: {hardware, challenge, science} } */
(function () {
  'use strict';
  var B = window.B;
  var EXTRAS = {

    ingenuity: {
      story: [
        { log: B('【毅力號降落之後・火星】毅力號的肚子底下，掛著一件小行李。它只有 1.8 公斤，從來沒有在別的星球上飛過。控制室裡的人盯著螢幕，安靜得像在等一個很重要的答案。',
                 '[After Perseverance landed · Mars] Under Perseverance’s belly hangs a small piece of luggage. It weighs just 1.8 kg and has never flown on another planet. In the control room everyone watches the screens in a hush, as if waiting for an important answer.') },
        { img: 'ing_air', log: B('【工程師的筆記本】「空氣不夠，就把旋翼轉得更快。」聽起來很簡單，但旋翼必須又輕又堅固，才承受得了這麼快的轉速。',
                 '[An engineer’s notebook] “If the air is too thin, spin the rotors faster.” It sounds simple, but the blades must be both light and strong to survive such a high speed.') },
        { log: B('【一件特別的紀念品】團隊帶了一小塊萊特兄弟飛機的布料同行。一百多年前的那次飛行，和這一次，被一小塊布連在一起。',
                 '[A special keepsake] The team brought along a small piece of fabric from the Wright brothers’ aircraft. A flight more than a century ago and this one are joined by a scrap of cloth.') },
        { log: B('【2021/4/19・火星】起飛的時候，地球上的人沒辦法用搖桿即時控制。他們把指令事先送出去，然後等——等資料和影像，從火星一路傳回來。',
                 '[Apr 19, 2021 · Mars] Nobody on Earth can steer with a joystick in real time. The team sends commands ahead of time, then waits for the data and pictures to travel all the way back from Mars.') },
        { log: B('【空中的眼睛】從高處往下看，地面不再只是一堆擋路的石頭，而是一張地圖。探測車的駕駛員，第一次能「先看看前面有什麼」。',
                 '[An eye in the sky] From above, the ground is no longer a scatter of obstacles but a map. For the first time, the rover’s drivers can “look ahead” before they roll.') },
        { log: B('【2024/1・火星】最後一次降落之後，影像傳回來了：旋翼的影子，有一片不一樣。團隊看了很久。他們知道，這位小夥伴已經遠遠超額完成任務了。',
                 '[Jan 2024 · Mars] After the last landing the pictures come back: the shadow of one rotor blade looks different. The team looks at it for a long time. They know their little friend has gone far beyond its mission.') }
      ],
      banners: { challenge: 'PIA24584', science: 'PIA24593' }
    },

    opportunity: {
      story: [
        { log: B('【2004/1・火星】兩輛雙胞胎火星車，各自在一個陌生的世界醒來。它們的任務單上，只寫著一個問題：這裡，曾經有過水嗎？',
                 '[Jan 2004 · Mars] Two twin rovers wake up in two strange worlds. Their mission sheet holds a single question: was there ever water here?') },
        { img: 'PIA08812', log: B('【計畫表上寫著 90 天】工程師為 90 個火星日做好了準備。但是每過一天，機會號都還在往前走。日子一天一天累積，變成了好幾年，又變成十多年。',
                 '[The plan said 90 days] Engineers prepared for 90 Martian days. But every day Opportunity was still rolling. The days piled up into years, and then more than a decade.') },
        { log: B('【一塊石頭裡的線索】岩石裡的礦物，對你我來說只是石頭；對科學家來說，那是一頁寫著「這裡曾經有水」的證據。',
                 '[A clue in a rock] To you and me a mineral is just a stone. To a scientist it is a page that reads “there was water here”.') },
        { img: 'PIA12131', log: B('【輪子陷進沙裡的那一天】沙很軟，輪子越陷越深。地球上的團隊沒有辦法伸手拉它一把，只能一步一步想辦法：先倒車退出來，再換一條路。',
                 '[The day the wheels sank] The sand was soft and the wheels dug in deeper. The team on Earth could not reach out and pull it free. They worked it out step by step: back out first, then try another route.') },
        { log: B('【2018/6・天空變暗】白天的天空一點一點變暗，太陽能板收到的光，一天比一天少。對一輛靠陽光活著的火星車來說，這是最大的難關。',
                 '[Jun 2018 · the sky darkens] The daytime sky dims little by little and the solar panels catch less light every day. For a rover that lives on sunshine, this is the hardest test of all.') },
        { img: 'PIA22909', log: B('【一遍又一遍的呼喚】團隊一道指令接著一道指令，朝著沉默的火星呼喚。這張全景，是機會號在沉默之前，最後環顧四周的樣子。',
                 '[Calling again and again] The team sends command after command toward a silent Mars. This panorama shows the last look around Opportunity took before it fell silent.') }
      ],
      banners: { challenge: 'PIA22521', science: 'PIA22222' }
    },

    voyager: {
      story: [
        { log: B('【1977 年夏天・佛羅里達】兩艘探測器，相隔不到一個月先後出發。沒有人知道，它們會走多遠、走多久。',
                 '[Summer 1977 · Florida] Two probes lift off less than a month apart. Nobody knows how far they will go, or for how long.') },
        { log: B('【1979/1・木星】木星的雲帶一層一層展開。在那之前，沒有人這麼近看過它。螢幕前的人們，不自覺地湊得更近。',
                 '[Jan 1979 · Jupiter] Jupiter’s cloud bands unfold layer by layer. Nobody had ever seen it this close. People in front of the screens lean in without noticing.') },
        { log: B('【1990/2/14】相機轉了回去。在無盡的黑暗裡，有一個小到幾乎看不見的亮點。那就是我們所有人的家。',
                 '[Feb 14, 1990] The camera turns back. In endless darkness there is a speck almost too small to see. It is home, for all of us.') },
        { log: B('【2012/8/25】穿過太陽影響範圍的那一刻，儀器的數據改變了。那是人類第一次，用自己造的東西，量到太陽系以外的環境。',
                 '[Aug 25, 2012] The moment it crossed the edge of the Sun’s influence, the instrument readings changed. For the first time, something humans built measured the space beyond our solar bubble.') },
        { img: 'PIA25782', log: B('【一個一個關掉】每一年，電少一點。工程師坐在桌前，問的不是「還能再加什麼」，而是「要先關掉哪一個，它才能活得更久」。',
                 '[Switching off, one by one] Each year there is a little less power. The engineers no longer ask “what else can we add?” but “which one do we turn off so it can live longer?”') },
        { img: 'voy_lightday', log: B('【地面天線】指令從天線出發，走一整天才到。要聽到回覆，還要再等一天。對航海家1號的團隊來說，「耐心」就是工作的一部分。',
                 '[At the ground antenna] A command leaves the antenna and takes a whole day to arrive. The reply takes another day. For the Voyager 1 team, patience is part of the job.') }
      ],
      banners: { challenge: 'PIA23214', science: 'PIA17045' }
    },

    mco: {
      story: [
        { log: B('【1998/12/11・佛羅里達】火箭點火，探測器離開地面。控制室裡的人們知道：接下來的九個多月，要靠計算，也要靠彼此的信任。',
                 '[Dec 11, 1998 · Florida] The rocket ignites and the probe leaves the ground. In the control room everyone knows the next nine-plus months will depend on calculation and on trust.') },
        { img: 'mco_trip', log: B('【漫長的航行】飛行途中，團隊要一次又一次確認「現在的位置對不對」，再用推進器輕輕修正方向。每一次修正，都建立在地面算出來的數字上。',
                 '[A long voyage] On the way, the team checks again and again whether the position is right, then nudges the course with small thrusters. Every correction rests on numbers calculated on the ground.') },
        { log: B('【1999/9・靠近火星】火星越來越大。團隊準備好迎接最關鍵的一刻：點火減速，進入軌道。',
                 '[Sep 1999 · nearing Mars] Mars grows larger. The team is ready for the key moment: fire the engine, slow down and enter orbit.') },
        { img: 'mco_signal', log: B('【1999/9/23】預測的時間到了，訊號卻比預測早 49 秒消失。螢幕上一片安靜。等了又等，那一端再也沒有回應。',
                 '[Sep 23, 1999] The predicted moment arrives, but the signal vanished 49 seconds early. The screens go quiet. They wait and wait, and nothing ever answers.') },
        { img: 'mco_units', log: B('【調查室】調查的人把每一個環節都攤開來看。最後，答案藏在兩份軟體交接的地方：一邊交出「磅力·秒」，另一邊以為是「牛頓·秒」。',
                 '[The investigation room] Investigators lay out every link in the chain. In the end the answer hides where two pieces of software hand off: one gives “pound-force seconds”, the other assumes “newton-seconds”.') },
        { img: 'KSC-98pc1733', log: B('【從那之後】調查報告提醒大家：資料交接要寫清楚單位，跨團隊要互相檢查。這是許多工程團隊現在都很重視的習慣。',
                 '[Ever since] The report reminded everyone: state the units clearly when handing off data, and check each other across teams. Many engineering teams treat this as a core habit today.') }
      ],
      banners: { challenge: 'KSC-98pc1046', science: 'PIA02330' }
    },

    record: {
      story: [
        { log: B('【1977 年・一間無塵室】工程師小心翼翼地把一張金色的唱片裝上探測器。它不是要給我們聽的，而是要給「某一個人」聽的。',
                 '[1977 · a clean room] Engineers carefully fit a golden record onto the probe. It is not meant for us to hear, but for “someone” out there.') },
        { img: 'NHQ201709050020', log: B('【一場很難的討論】115 張圖像、約 90 分鐘的音樂、55 種語言——要從地球上的一切裡選出這些，每一個選擇，都得有人說服別人。',
                 '[A hard discussion] 115 images, about 90 minutes of music, 55 languages: choosing these from everything on Earth means someone has to persuade someone else at every step.') },
        { log: B('【給陌生人的說明書】要讓完全不認識我們的人，自己學會播放這張唱片。所以封套上沒有文字，只有一個個符號。',
                 '[Instructions for a stranger] Someone who knows nothing about us has to work out how to play this record. So the cover has no words, only symbols.') },
        { img: '201309120010HQ', log: B('【2013】唱片還在飛。也許永遠不會有人聽到。但是每當我們問「該對宇宙說什麼」，其實也是在問「我們是誰」。',
                 '[2013] The record is still flying. Perhaps no one will ever hear it. But whenever we ask “what should we tell the universe?”, we are also asking “who are we?”') },
        { log: B('【出發之前】一張唱片，一面小國旗。它們一起登上航海家號，成為「來自地球的紀念品」。',
                 '[Before departure] One record and one small flag. They board Voyager together as “mementos of Earth”.') }
      ],
      banners: { challenge: 'PIA17035', science: 'PIA14113' }
    }
  };

  window.MISSIONS.forEach(function (m) {
    var ex = EXTRAS[m.id]; if (!ex) return;
    ex.story.forEach(function (e, i) {
      var s = m.story[i]; if (!s) return;
      if (e.img && !s.img) s.img = e.img;
      if (e.log) s.log = e.log;
    });
    m.banners = ex.banners || {};
  });
})();
