# NASA Junior Engineers

**Ghost Rovers 遺落的探險家 · NASA 任務控制室**

A bilingual (繁體中文 / English) interactive e-book for school-age explorers.
Players act as NASA engineers and solve real mission problems from seven pieces of space hardware.
一個雙語互動電子書：孩子化身 NASA 見習工程師，用 7 個真實硬體的故事學習它們的目的、運作方式與科學成果。

> Built for the NASA hackathon challenge on hardware left on the Moon, Mars and in deep space.
> Not affiliated with or endorsed by NASA. 與 NASA 無隸屬關係，也未獲 NASA 背書。

## Missions 任務

| Mission | Hardware story | Real problem the player solves |
|---|---|---|
| 1 | Ingenuity helicopter 機智號 | Thin air: spin the rotors fast enough to hover |
| 2 | Opportunity rover 機會號 | Dust storm: budget scarce solar power |
| 3 | Voyager 1 航海家1號 | Shrinking power and 24-hour light delay |
| 4 | Mars Climate Orbiter 火星氣候軌道器 | Find the unit mix-up (lbf·s vs N·s) |
| 5 | Golden Record 金唱片 | Choose what to tell the universe within limited space |
| 6 | Apollo Lunar Module & Rover 登月艙與月球車 | Landing, surviving the lunar day, and driving the rover (with 3D models) |
| 7 | Kepler / K2 space telescope Kepler 與 K2 太空望遠鏡 | Spot a planet’s transit in a light curve, rescue a telescope with sunlight pressure (with a 3D model) |

Every mission has **4 levels**: ages 6–8 (Junior Explorer), 9–12 (Mission Technician), 13–15 (Systems Engineer), 16–18 (Flight Director).
Each mission follows: Story → Meet the hardware → Challenge → Science results → Real ending (with sources).

## Run it 執行方式

No build step and no dependencies. Just open `index.html` in a browser,
or serve the folder: `python -m http.server 8000` and visit http://localhost:8000.
可直接雙擊 `index.html`，或用上面的指令開啟本機伺服器。

## Publish with GitHub Pages 發布

Repository → Settings → Pages → Deploy from branch → `main` / root.

## Structure 結構

```
index.html            page shell
css/style.css         styles (dark theme, responsive, reduced-motion friendly)
js/common.js          bilingual helper B(zh,en) and the NASA image registry (credits)
js/engines.js         challenge engines: slider, calc, choice, budget, order, detective, pick, find3d, transit
js/app.js             router, e-book pages, progress (localStorage), language toggle
js/missions/*.js      one content file per mission (story, hardware, 4 challenges, science, sources)
assets/img/           NASA images (file name = NASA image ID)
```

To add or edit content, change only `js/missions/*.js`; text is stored as `B('中文', 'English')`.

## Data honesty 資料誠實

* Real facts cite official sources (NASA, JPL, NASA Image Library) in each mission's *Sources* section.
* Numbers marked **"Game setting / 遊戲設定"** (power cells, scores, baseline rpm, etc.) are simplified for gameplay and are **not NASA measurements**.
* Voyager distances and instrument status change over time; values reflect NASA pages as of 2026-11-10.

## Credits 圖片來源

Images are from the [NASA Image and Video Library](https://images.nasa.gov/) (NASA/JPL-Caltech and others, credited in each caption with the NASA ID).
The Wright brothers photograph is from the Library of Congress. See NASA's media usage guidelines: https://www.nasa.gov/nasa-brand-center/images-and-media/

## Characters 角色插畫
The character illustrations are AI-generated, supplied by the project author. They are fictional (names and faces are invented, not real people); this project only recolors the jacket for each mission.
角色插畫為 AI 生成，由作者提供，皆為虛構人物（名字與長相都是虛構的）；本專案只依任務更換外套顏色。

## License 授權

Code: MIT (see LICENSE). Content text: CC BY 4.0. NASA images remain subject to their original credits and NASA's media guidelines.

## 3D model credits 3D 模型來源
- Lunar module: NASA 3D Resources, Michael D. Carbajal (Apollo Lunar Module, glTF); Draco compression removed and parts grouped by this project. A generic Apollo lunar module, not specifically Eagle.
- Lunar Roving Vehicle: a simplified illustrative model built by this project from NASA NSSDCA specifications. **Not an official NASA model.**
- 登月艙為 NASA 官方模型；月球車為本專案依 NASA 公布規格自製的示意模型，不是 NASA 官方模型。
- Kepler: NASA 3D Resources, “Kepler (A)” (NASA/Kepler Mission); Draco compression removed and parts named by this project. The model is simplified and does not show the real interior (reaction wheels etc. are inside the spacecraft body).
- Kepler 為 NASA 官方模型（Kepler (A)）；已解除 Draco 壓縮並為零件命名。模型是簡化版，看不到真實的內部構造（反作用輪等在太空船本體裡面）。
