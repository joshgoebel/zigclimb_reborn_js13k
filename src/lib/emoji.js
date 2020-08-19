const emojize = (icon, cell) => {
  if (icon === "@") {
    cell.innerHTML = "😀"
  }
  if (icon === "(") {
    cell.innerHTML = "🗡️"
  }
  if (icon === "%") {
    cell.innerHTML = "🛡️"
  }
  if (icon === "!") {
    cell.innerHTML = "🧪"
  }
  if (icon === "#") {
    cell.innerHTML = ""
  }
  if (icon === "<") {
    // cell.innerHTML = "⬇️"
  }
  let beasts = [
    "🐀", // 0
    "🦡", // 1
    "🐍", // 2
    "🐗", // 3
    "🦔", // 4
    "🦇", // 5
    "🐊", // 6
    "🦏", // 7
    "🐆", // 8
    "🦟", // 9
    "🦟", // 10
    "🦟", // 11
    "🦟", // 12
    "🦟", // 13
    "🦟", // 14
    "🦟", // 15
    "🦟", // 16
    "🐉", // 17

    // "🐀","🦊","🦁","🐗","🦔","🐲","🦟"
  ]
  if (icon >= "a" && icon <= "z") {
    cell.style.fontSize = "1.3em"
    let level = icon.charCodeAt(0) - "a".charCodeAt(0);
    cell.innerHTML = beasts[level] || icon;
  }

}
