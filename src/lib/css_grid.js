export default class CSSGrid {
  constructor(id, width, height) {
    this.el = document.getElementById(id)
    this.width = width
    this.height = height
    this.build()
  }
  build() {
    const size = this.width*(this.height)
    this.el.innerHTML = "<span></span>".repeat(size)
    let last = grid.childNodes[grid.childNodes.length-1]
    // this.el.childNodes.forEach((el) => {
      // el.innerHTML = String.fromCharCode(Math.floor(Math.random()*26)+65+30)
    // })
    last.style.gridColumn = `${this.width} / ${this.width+1}`
    last.style.gridRow = `${this.height} / ${this.height+1}`
    this.cells = grid.childNodes;
    this.el.innerHTML += "<span>last</span>"
  }
  set([x,y], icon) {
    let pos = y*this.width + x;
    let cell = this.cells[pos]
    cell.innerHTML = icon
    if (icon == "~") {
      cell.style.backgroundColor = "#012"
      cell.style.color = "#069"
    }
    if (icon == ".") {
      // cell.style.backgroundColor = "#012"
      cell.style.color = "#333"
    }
    if (icon >= "a" && icon <="z") {
      cell.style.color = "yellow"
    }
    if (icon === "@") {
      // cell.style.backgroundColor = "#012"
      cell.style.color = "white"
    }
    if (icon === "!") {
      // cell.style.backgroundColor = "#012"
      cell.style.color = "#3c3"
    }
    if (icon === "<") {
      cell.style.backgroundColor = "#000";
    }
    if (icon === "(") {
      // cell.style.backgroundColor = "#012"
      cell.style.color = "#c00"
    }
    if (icon === "%") {
      // cell.style.backgroundColor = "#012"
      cell.style.color = "saddlebrown"
    }
    if (icon == "#") {
      cell.style.backgroundColor = "#222"
      cell.style.color = "#999"
    }
  }
}
