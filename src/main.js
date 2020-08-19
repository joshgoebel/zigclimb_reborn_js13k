const WIDTH = 40
const HEIGHT = 20

import CSSGrid from "./lib/css_grid"
import {Grid} from "./grid.js"

const render = (map) => {
  for (let x =0; x<WIDTH; x++) {
    for (let y =0; y<HEIGHT; y++) {
      window.grid.set([x,y], map.get(x,y))
    }
  }
}

const percentChance = (x) => {
  if (x>=100) return true;

  return Math.random() < (x/100);
}

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

const rand = (x) => Math.floor(Math.random() * x);

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
  while(baddies) {
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


window.onload = () => {
  let grid = new CSSGrid("grid", WIDTH, HEIGHT)
  window.grid = grid

  let cave = newCave();
  render(cave)
}


