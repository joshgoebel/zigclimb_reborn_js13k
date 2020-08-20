const WIDTH = 40
const HEIGHT = 20

import { ClassicRender } from "./ui/classic_render"
import { Grid } from "./grid.js"
import { percentChance, rand, addVector } from "./lib/utils"


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


let level = 0

const newCave = () => {

  let items = ["@","<","!","%","("]

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

  return map;
}

import { animate, Wall } from "./game/entities"

class Game {
  constructor() {
    this.health = 10
    this.level = 0
    this.armor = 1
    this.weapon = 1
    this.gold = 0

    this.width = WIDTH
    this.height = HEIGHT
    this.newLevel()
  }
  newLevel() {
    this.cave = newCave();
  }
  tick() {

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


function start() {
  const game = new Game()
  window.game = game

  const renderer = new ClassicRender()
  window.renderer = renderer
  renderer.draw()
}

window.onload = () => {
  start()
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
  c: "se"
}

document.onkeyup = (event) =>  {
  if (KEY_to_DIR[event.key]) {
    let dir = KEY_to_DIR[event.key]
    let vector = DIRS[dir]
    game.movePlayer(vector)
    game.tick()

    renderer.draw()
  }
}


