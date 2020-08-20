
const cardinals = [
  [0,1],
  [0,-1],
  [-1,0],
  [1,0],
]

class Grid {
  constructor(x,y) {
    this.width=x
    this.height=y
    this.data = new Array(y+1).fill(null).map(() => new Array(x+1).fill(0))
  }

  fill(item, left=0, top=0, w=this.width, h=this.height) {
    for (let x=left; x<left+w; x++) {
      for (let y=top; y<top+h; y++) {
        this.data[y][x] = item
      }
    }
    return this
  }
  carve(left,top,w,h) {
    this.fill(0,left,top,w,h)
  }
  set(x,y, data) {
    this.data[y][x] = data
  }
  getSurrounding(x,y) {
    let result=[]
    this.traverse((coords,data) => {
      result.push([coords, data])
    }, x-1, y-1, 3, 3)
    return result
  }
  getCardinals(x,y) {
    return cardinals.map(([xoff, yoff]) => [[x+xoff,y+yoff], this.get(x+xoff, y+yoff)])
  }
  get(x,y) {
    if (x<0 || y<0 || x>=this.width || y>=this.height)
      return undefined;

    return this.data[y][x]
  }
  flipV() {
    this.data = this.data.reverse()
  }
  flipH() {
    this.data = this.data.map(r => r.reverse())
  }
  traverse(fn, left=0, top=0, w=this.width, h=this.height) {
    for (let x=left; x<left+w; x++) {
      for (let y=top; y<top+h; y++) {
        fn([x,y], this.get(x,y))
      }
    }
  }
  find(data, left=0, top=0, w=this.width, h=this.height) {
    for (let x=left; x<left+w; x++) {
      for (let y=top; y<top+h; y++) {
        if (this.data[y][x] === data) {
          return [x,y]
        }
      }
    }
    return undefined;
  }
  count(data, left=0, top=0, w=this.width, h=this.height) {
    let count = 0;
    for (let x=left; x<left+w; x++) {
      for (let y=top; y<top+h; y++) {
        if (this.data[y][x] === data) {
          count++;
        }
      }
    }
    return count;
  }
}


export { Grid }
