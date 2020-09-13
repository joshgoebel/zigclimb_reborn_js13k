export class Render {
  constructor() {

  }
  visible([x,y]) {
    let fog = game.fog.get(x,y)
    return (fog !== "*")
  }
  clear() {
    game.cave.traverse((coord, tile) => {
      let cell = this.grid.getCell(coord)
      cell.innerHTML = ""
    })
  }

}
