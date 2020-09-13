const WIDTH = 40
const HEIGHT = 20

import { ClassicRender } from "./ui/classic_render"
import { TileRender } from "./ui/tile_render"
import { Grid } from "./grid.js"
import { percentChance, rand, addVector } from "./lib/utils"
import { zzfx } from "./lib/zzfx"

const dig = (map, x,  y) => {
  // console.log("dig",x,y)
  if (x < 1 || y < 1 || x >= WIDTH-1 || y >= HEIGHT-1 ) return;
  if (map.get(x,y) === ".") return;

  map.set(x,y, ".")

  for(let dx=0; dx<3; dx++) {
    for(let dy=0; dy<3; dy++) {
      if (percentChance(20)) {
        dig(map,x+dx-1, y+dy-1)
      }
    }
  }
}


const newCave = (level) => {

  let items = "@<!%(****".split("")

  let map = new Grid(WIDTH, HEIGHT)

  let clear = 0
  let i = 0;

  while (clear < 0.25) {
    map.fill("#")

    i++;
    dig(map,20,10)

    let floor = map.count(".")
    clear = floor / (WIDTH*HEIGHT)
  }

  // items
  items.forEach((el) => {
    for(;;) {
      let x = rand(WIDTH);
      let y = rand(HEIGHT);
      console.log(x,y)
      if (map.get(x,y) === ".") {
        map.set(x,y,el)
        break;
      }
    }
  })

  // baddies
  let baddies = level*2 + rand(9)
  while (baddies) {
    for (;;) {
      let monster = String.fromCharCode("a".charCodeAt(0) + rand(7) + level)
      let x = rand(WIDTH);
      let y = rand(HEIGHT);
      console.log(x,y)
      if (map.get(x,y) === ".") {
        map.set(x,y,monster)
        baddies--;
        break;
      }
    }
  }

  // clean up map
  let coords = []
  map.traverse(([x,y]) => {
    let icons = map.getSurrounding(x,y).map(([_, icon]) => icon )
    if (icons.every((el) => el === "#" || el === undefined)) {
      coords.push([x,y])
    }
  })
  coords.forEach((coords) => map.set(...coords, ""))

  return map;
}

import { animate, Wall } from "./game/entities"

function newWinMap() {
  let map = new Grid(WIDTH, HEIGHT)
  map.fill(".")
  map.set(0,0,"@")
  return map
}

class Game {
  constructor() {
    this.level = 0
    this.health = 10
    this.armor = 1
    this.weapon = 1
    this.gold = 0

    this.width = WIDTH
    this.height = HEIGHT
    this.newLevel()
    this.sight()
  }
  newLevel() {
    if (this.level===10) {
      this.cave = newWinMap()
      return
    }
    this.fog = new Grid(WIDTH, HEIGHT)
    this.fog.fill("*")

    this.cave = newCave(this.level);
  }
  tick() {
    this.sight()

  }
  sight() {
    let [px, py] = this.cave.find("@")
    this.cave.traverse(([x,y], tile) => {
      let diff = (px-x)*(px-x)+(py-y)*(py-y)
      if (diff<=25)
        this.fog.set(x,y, " ")
    })
  }
  movePlayer(vector) {
    let playerLocation = this.cave.find("@")
    let newLoc = addVector(playerLocation, vector)
    let icon = this.cave.get(...newLoc)
    let entity = animate(icon)
    if (!entity.isSolid) {
      entity.interact()
      this.cave.set(...playerLocation, ".")
      this.cave.set(...newLoc, "@")
    }
    if (entity instanceof Wall) {
      entity.interact()
    }
    // attack monsters
    if (entity.isAlive) {
      // do attack
      let atk = this.weapon + rand(5)
      if (atk >= entity.level) {
        this.cave.set(...newLoc, "*")
      } else {

      }
    }
  }
  get wonMessage() {
    return ""
  }
}

let DIRS = {
  n: [0, -1],
  s: [0, 1],
  e: [1, 0],
  w: [-1, 0],
  nw: [-1, -1],
  ne: [1, -1],
  se: [1, 1],
  sw: [-1, 1]
}

const KEY_to_DIR = {
  ArrowLeft: "w",
  ArrowRight: "e",
  ArrowDown: "s",
  ArrowUp: "n",

  q: "nw",
  w: "n",
  e: "ne",
  a: "w",
  s: "s",
  d: "e",
  z: "sw",
  x: "s",
  c: "se",

  '7': "nw",
  '8': "n",
  '9': "ne",
  '4': "w",
  '5': "s",
  '6': "e",
  '1': "sw",
  '2': "s",
  '3': "se",
}


let renderer;


const changeRenderer = () => {
  if (renderer instanceof ClassicRender) {
    renderer = new TileRender()
  } else {
    renderer = new ClassicRender()
  }
  window.renderer = renderer
  renderer.draw()
}

KEY_HANDLERS = {
  't': changeRenderer
}

document.onkeydown = (event) =>  {
  if (KEY_to_DIR[event.key]) {
    event.preventDefault()
    if (event.repeat)
      return true;

    let dir = KEY_to_DIR[event.key]
    let vector = DIRS[dir]
    game.movePlayer(vector)
    game.tick()

    renderer.draw()
    return;
  }
  // handle other keyboard actions
  let handler = KEY_HANDLERS[event.key]
  if (handler) {
    event.preventDefault();
    if (event.repeat) return true;

    handler();
  }
}

let grid = document.querySelector("#grid")


let scroller = (ev) => {
  let height = document.body.scrollHeight;
  // console.log(ev)
  // console.log(window.scrollY);
  let page = height/4;

  let diff = page*3 - window.scrollY

  if (window.scrollY > page*2) {
    let op = 1 - diff/page
    grid.style.opacity = op
  } else {
    grid.style.opacity = 0
  }


  if (window.scrollY > page*3) {
    gameMode()
  }

}

function gameMode() {
  document.body.className="play";
  grid.style.opacity=1
  window.onscroll=null
}

function start() {
  const game = new Game()
  window.game = game

  renderer = new TileRender()
  // renderer = new ClassicRender()
  window.renderer = renderer
  renderer.draw()
}

OS = new Proxy({},{get: () => () => {} })

window.onload = () => {
  OS.setTitle("Zigclimb Reborn")
  window.onscroll = scroller
  start()

  gameMode()
}
