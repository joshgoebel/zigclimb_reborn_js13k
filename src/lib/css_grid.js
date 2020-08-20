

export default class CSSGrid {
  constructor(id, width, height) {
    this.el = document.getElementById(id)
    this.width = width
    this.height = height
    this.build()
  }
  build() {
    this.el.innerHTML = "<span></span>".repeat(this.size)
    let last = this.el.childNodes[this.el.childNodes.length-1]
    last.style.gridColumn = `${this.width} / ${this.width+1}`
    // last.style.gridRow = `${this.height} / ${this.height+1}`
    this.cells = this.el.childNodes;
  }
  get size() {
    return this.width*(this.height)
  }
  offset(x,y) {
    return y * this.width + x
  }
  getCell([x,y]) {
    return this.cells[this.offset(x,y)]
  }
  set([x,y], icon) {
    let cell = this.cells[this.offset(x,y)]
    cell.innerHTML = icon
    if (this.colorize) {
      this.colorize(icon, cell)
    }
  }
}
