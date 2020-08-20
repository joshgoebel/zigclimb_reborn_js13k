import CSSGrid from "../lib/css_grid"


const renderTile = (cell, icon) => {
  cell.style.color=""
  cell.style.backgroundColor=""
  cell.className = ""

  cell.innerHTML = icon

  if (icon == "~") {
    cell.style.backgroundColor = "#012"
    cell.style.color = "#069"
  }
  if (icon == ".") {
    // cell.style.backgroundColor = "#012"
    cell.style.color = "#333"
    cell.className = "empty"
  }
  if (icon >= "a" && icon <="z") {
    cell.style.color = "#fc6"
    cell.style.backgroundColor = "#1a1a00"
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
  // let child = cell
  // child.style.width="40px"
  // child.style.height="40px"
  // child.style.imageRendering="pixelated";
  // child.style.backgroundSize="auto calc(240px*40/16)"
  // // child.style.display="none"

  // if (icon == "@") {
  //   // cell.childNodes[0].remove()
  //   child.style.display="block"
  //   child.style.backgroundImage ="url(loveable_rogue.png)";
  //   child.style.backgroundPosition="calc(112px*40/16) calc(-144px*40/16)";

  // }
  if (icon == "#") {
    cell.style.color = "#777"
    cell.style.backgroundColor = "#222"
  }
}

class ClassicRender {
  constructor() {
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
    let map = game.cave
    this.dash()
    for (let x =0; x<game.width; x++) {
      for (let y =0; y<game.height; y++) {
        // this.grid.set([x,y], map.get(x,y))
        renderTile(this.grid.getCell([x,y]), map.get(x,y))
      }
    }
  }

}

export { ClassicRender }
