import { rand } from "../lib/utils"

const MAX_HEALTH = 10

const powerup = () => {
  zzfx(...[,0,300,.15,.15,.5,,.5,,,50,,.3,,,,.1,.5,.1]); // Powerup 115
}

const FIGHT_FX = [

]

class Entity {
  constructor() {}
  get isSolid() { return false }
  get isAlive() { return false }
  interact() {}
}

export class Monster {
  constructor(letter) {
    this.level = letter.charCodeAt(0) - "a".charCodeAt(0)
  }
  get isAlive() { return true }
  get isSolid() { return true }
  interact() {

  }
  attack(foe) {
    let hit = this.level + rand(5)
    if (hit >= foe.level) {
      foe.dead = true
    }
  }
  attackPlayer() {
    let hit = this.level + rand(5) - game.armor
    if (hit>=3) {
      game.health -= 1
    }
  }
}

export class Wall extends Entity {
  get isSolid() { return true }
  interact() {
    zzfx(...[,,308,.03,.01,.05,,2.15,,-29,,.01,,-0.1,.1,,,,.03]); // Blip 50 - Mutation 2
  }
}

export class Stairs extends Entity {
  interact() {
    zzfx(...[.7,0,300,.06,.5,.25,2,5,,,-50,-0.1,.25,,,,,,.15]); // Sound Default - Copy 1
    game.advanceLevel()
  }
}
export class Armor extends Entity {
  constructor() {
    super()
    this.defense = game.level + rand(7)
  }
  interact() {
    powerup();
    game.armor = this.defense
  }
}

export class Weapon extends Entity {
  constructor() {
    super()
    this.attack = game.level + rand(5)
  }
  interact() {
    powerup();
    game.weapon = this.attack
  }
}

export class Potion extends Entity {
  interact() {
    game.health = MAX_HEALTH
    zzfx(...[,,1062,,.01,.29,,,,,704,.01,.1,.1,,,.1,.81,.03]); // Pickup 69
  }
}

export class Floor extends Entity {
  interact() {
    // zzfx(...[,,23,.03,,.09,1,.43,,,-46,.2,,,,,,.5,.04]); // Blip 40
  }
}

export class Gold extends Entity {
  constructor() {
    super()
    // NOTE: This does not match the original, but what did the monster
    // drop if it was 0 gems?
    this.value = (game.level + rand(3)) || 1
  }
  interact() {
    zzfx(...[,,909,,.08,,1,1.94,,,239,.1,,,,,,.58,.09]); // Pickup 110
    game.gold += this.value
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
