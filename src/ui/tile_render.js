import { Render } from "./render.js"


import CSSGrid from "../lib/css_grid"

const MONSTER = 52
const TILES = {
  "@": 6,
  "#": 13,
  ".": 0,
  "%": 21,
  "(": 20,
  "!": 35,
  "<": 18,
  "*": 19,
  "FOG": 9,

  // 16 monsters
  "a": MONSTER+1, // brown bat
  "b": MONSTER+7, // green thingy
  "c": MONSTER+4,  // ostrich?
  "d": MONSTER, // blue thingy?
  "e": MONSTER + 18, // green snake
  "f": MONSTER + 16, // grey horse?
  "g": MONSTER + 6, // griffin thingy
  "h": 5, // spikes chase you around
  "i": MONSTER + 14, // green ogre with purple shirt
  "j": MONSTER + 17, // brown snake
  "k": MONSTER + 9, // gold dragon thing
  "l": MONSTER + 19, // green hulk thingy
  "m": MONSTER + 25, // zombie
  "n": MONSTER + 3, // green dragon
  "o": MONSTER + 15, // purple outline
  "p": MONSTER + 22 // reaper/haunt in purple robe
}

class SpriteSheet {
  constructor(url, opts) {
    this.url = url
    this.opts = opts
    this.renderSize = 32

    let grid = document.querySelector("#grid")
    grid.style.gridAutoColumns=`${this.renderSize}px`
  }
  render(cell, icon) {
    let tile = TILES[icon]
    if (tile === undefined) return;

    if (icon === "FOG") {
      cell.style.backgroundImage=""
      return
    }

    cell.title = icon
    cell.innerHTML = ""
    cell.style.width=`${this.renderSize}px`
    cell.style.height=`${this.renderSize}px`

    cell.style.backgroundImage = this.url;
    // TODO: move to css
    cell.style.imageRendering = "pixelated";
    cell.style.backgroundSize = `auto calc(${this.opts.sheet[1]}px*${this.renderSize}/16)`

    let tx = tile % this.opts.width
    let ty = Math.floor(tile / this.opts.width)

    let x = tx * this.opts.tile[0]
    let y = ty * this.opts.tile[1] + this.opts.yOffset
    cell.style.backgroundPosition=`calc(-${x}px*${this.renderSize}/16) calc(-${y}px*${this.renderSize}/16)`;
  }
}

let SS = new SpriteSheet("url(loveable_rogue.png)",
  {
    sheet: [207,240],
    tile: [16,16],
    width:13,
    yOffset: 144
  })

const renderTile = (cell, icon) => {
  cell.innerHTML = icon
  cell.style.color=""
  cell.className = ""
  // cell.style.display="block"
  // cell.style.backgroundImage ="url(loveable_rogue.png)";
  // cell.style.backgroundPosition="0 0";

  if (icon == "~") {
    cell.style.backgroundColor = "#012"
    cell.style.color = "#069"
  }
  if (icon == ".") {
    // cell.style.backgroundColor = "#012"
    cell.style.color = "#333"
    // cell.className = "empty"
  }
  if (icon >= "a" && icon <="z") {
    cell.style.color = "#fc6"
    // cell.style.backgroundColor = "#1a1a00"
  }
  if (icon === "@") {
    // cell.innerHTML = "😀"
    // cell.style.backgroundColor = "#012"
    // cell.style.fontSize = "50px"
    // cell.style.overflow="visible"
    cell.style.color = "white"
  }
  if (icon === "!") {
    // cell.style.backgroundColor = "#012"
    cell.style.color = "#3c3"
  }
  if (icon === "<") {
    cell.style.backgroundColor = "";
  }
  if (icon === "(") {
    // cell.style.backgroundColor = "#012"
    cell.style.color = "#c00"
  }
  if (icon === "%") {
    // cell.style.backgroundColor = "#012"
    cell.style.color = "saddlebrown"
  }

  // let child = document.createElement("div")
  // cell.append(child)
  // cell.style.width="40px"
  // cell.style.imageRendering="pixelated";
  // cell.style.backgroundSize="auto calc(240px*40/16)"
  // cell.style.display="none"

  SS.render(cell, icon)

  // if (icon == "@") {
  //   // cell.cellNodes[0].remove()
  //   cell.style.backgroundImage ="url(loveable_rogue.png)";
  //   cell.style.backgroundPosition="calc(112px*40/16) calc(-144px*40/16)";

  // }
  // if (icon == "#") {
  //   // console.log(cell.innerHTML)
  //   // cell.cellNodes[0].remove()
  //   cell.innerHTML=""
  //   cell.style.backgroundImage ="url(loveable_rogue.png)";
  //   cell.style.backgroundPosition="0px calc(-160px*40/16)";
  //   // cell.style.backgroundColor="red";
  //   // cell.style.border="2px solid red"
  //   // cell.style.backgroundRepeat="no-repeat"
  //   // cell.style.transform ="scaleX(2.7)"
  //   // cell.style.color = "#666"
  //   // cell.style.opacity="0.5"
  // }
}

class TileRender extends Render {
  constructor() {
    super()
    this.grid = new CSSGrid("grid", game.width, game.height)
    // this.grid.colorize = colorize;
    window.grid = this.grid
  }

  dash() {
    let face = game.health === 0 ? ";(" : ""
    let dash = document.querySelector("#status")
    dash.innerHTML = `H: ${game.health} L: ${game.level} WA: ${game.weapon}/${game.armor}` +
      ` *: ${game.gold} ${face}${game.wonMessage}`;
  }

  draw() {
    this.clear()
    this.dash()
    game.cave.traverse((coord, tile) => {
      if (this.visible(coord))
        renderTile(this.grid.getCell(coord), tile)
      else
        SS.render(this.grid.getCell(coord), "FOG")
        // renderTile(this.grid.getCell(coord), " ")
    })
  }
}

export { TileRender }
