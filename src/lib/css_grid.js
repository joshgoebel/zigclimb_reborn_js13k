export default class CSSGrid {
  constructor(id, width, height) {
    this.el = document.getElementById(id)
    this.width = width
    this.height = height
    this.build()
  }
  build() {
    this.el.style.gridAutoColumns=""
    this.el.innerHTML = "<span/></span>".repeat(this.size)
    let last = this.el.lastChild
    last.style.gridColumn = `${this.width} / ${this.width+1}`
    // last.style.gridRow = `${this.height} / ${this.height+1}`
    this.cells = this.el.childNodes;
  }
  get size() {
    return this.width*(this.height)
  }
  offset([x,y]) {
    return y * this.width + x
  }
  getCell(coords) {
    return this.cells[this.offset(coords)]
  }
  renderCell(coords, fn) {
    let cell = getCell(coords)
    fn(cell)
  }
  set(coords, icon) {
    let cell = getCell(coords)
    cell.innerHTML = icon
  }
}
