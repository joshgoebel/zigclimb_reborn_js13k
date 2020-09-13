export const rand = (x) => Math.floor(Math.random() * x);

export function oneOf(items) {
  return items[rand(items.length)]
}

export function addVector([x,y], [a,b]) {
  return [x+a, y+b];
}


export const percentChance = (x) => {
  if (x>=100) return true;

  return Math.random() < (x/100);
}
