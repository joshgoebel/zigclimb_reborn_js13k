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
    let last = this.grid.childNodes[this.grid.childNodes.length-1]
    last.style.gridColumn = `${this.width} / ${this.width+1}`
    last.style.gridRow = `${this.height} / ${this.height+1}`
    this.cells = this.grid.childNodes;
    this.el.innerHTML += "<span class=status>last</span>"
  }
  get grid() { return this.el }
  set([x,y], icon) {
    let pos = y*this.width + x;
    let cell = this.cells[pos]
    cell.innerHTML = icon
    if (this.colorize) {
      this.colorize(icon, cell)
    }
  }
}
