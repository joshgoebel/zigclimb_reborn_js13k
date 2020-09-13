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

}
