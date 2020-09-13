import CSSGrid from "../lib/css_grid"
import { Render } from "./render.js"


const renderTile = (cell, icon) => {
  cell.style.color=""
  cell.style.backgroundColor=""
  cell.className = ""

  cell.innerHTML = icon

  if (icon === "~") {
    cell.style.backgroundColor = "#012"
    cell.style.color = "#069"
  }
  if (icon === ".") {
    cell.style.color = "#333"
    cell.className = "empty"
  }
  if (icon >= "a" && icon <="z") {
    cell.style.color = "#fc6"
    cell.style.backgroundColor = "#1a1a00"
  }
  if (icon === "*") {
    cell.style.color = "rgb(58,150,221)"
  }
  if (icon === "@") {
    cell.style.color = "white"
  }
  if (icon === "!") {
    cell.style.color = "#3c3"
  }
  if (icon === "<") {
    cell.style.backgroundColor = "";
  }
  if (icon === "(") {
    cell.style.color = "#c00"
  }
  if (icon === "%") {
    cell.style.color = "saddlebrown"
  }
  if (icon === "#") {
    cell.style.fontSize = "0.65em"
    cell.style.color = "#777"
    cell.style.backgroundColor = "#222"
  }
}

class ClassicRender extends Render {
  constructor() {
    super()
    this.grid = new CSSGrid("grid", game.width, game.height)
    window.grid = this.grid
    this.boot()
  }

  boot() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    // w -= 20;
    let cellSize = w/game.width
    document.querySelector("#status").style.fontSize = `${cellSize*0.60}px`
    this.grid.el.style.fontSize=`${cellSize*0.80}px`
    this.grid.el.style.setProperty("grid-auto-rows", `${cellSize}px`)
    this.grid.el.style.setProperty("grid-auto-columns", `calc(100%/${game.width})`)
  }

  dash() {
    let face = game.health === 0 ? ";(" : ""
    let dash = document.querySelector("#status")
    let classic = `H: ${game.health} L: ${game.level} WA: ${game.weapon}/${game.armor}` +
    ` *: ${game.gold} ${face}${game.wonMessage}`;
    let newer = `HP=${game.health} ` +
     `&middot; Level ${game.level} ` +
     `&middot; W/A= ${game.weapon}/${game.armor} ` +
     `&middot; ${game.gold} gems ${face}${game.wonMessage}`;
    dash.innerHTML = newer
  }

  draw() {
    this.clear()
    this.dash()
    game.cave.traverse((coord, tile) => {
      if (this.visible(coord))
        renderTile(this.grid.getCell(coord), tile)
    })

  }
}

export { ClassicRender }
