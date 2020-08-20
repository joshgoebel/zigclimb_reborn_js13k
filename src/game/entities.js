import { rand } from "../lib/utils"

const MAX_HEALTH = 10


class Entity {
  constructor() {}
  get isSolid() { return false }
  get isAlive() { return false }
  interact() {}
}

class Monster {
  constructor(letter) {
    this.level = letter.charCodeAt(0) - "a".charCodeAt(0)
  }
  get isAlive() { return true }
  get isSolid() { return true }
  interact() {

  }
}

export class Wall extends Entity {
  get isSolid() { return true }
}

export class Stairs extends Entity {
  interact() {
    game.level++
  }
}
export class Armor extends Entity {
  constructor() {
    super()
    this.defense = game.level + rand(7)
  }
  interact() {
    game.armor = this.defense
  }
}

export class Weapon extends Entity {
  constructor() {
    super()
    this.attack = game.level + rand(5)
  }
  interact() {
    game.weapon = this.attack
  }
}

export class Potion extends Entity {
  interact() {
    game.health = MAX_HEALTH
  }
}

export class Floor extends Entity {
}

export class Gold extends Entity {
  constructor() {
    super()
    this.value = game.level + rand(3)
  }
  interact() {
    this.gold += this.value
  }
}

const TILE_to_CLASS = {
  ".": Floor,
  "#": Wall,
  "*": Gold,
  "!": Potion,
  "%": Armor,
  "(": Weapon,
  "<": Stairs
}


export function animate(tile) {
  if (TILE_to_CLASS[tile])
    return new TILE_to_CLASS[tile]();

  if (tile >= "a" && tile <= "z") {
    return new Monster(tile)
  }
}
