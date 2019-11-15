export const sortByClassroomName = (a,b) => {
  return a.name.localeCompare(b.name)
}

function decToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function hexToDec(c) {
  return parseInt(c, 16)
}

export const invertColor = (color) => {
  const rgb = color.match(/#(..)(..)(..)/)
  if (rgb) {
    rgb.shift()

    const [x,y,z] = rgb.map(c => hexToDec(c))

    console.log(x, 255 -x , y, 255 - y, z, 255 - z)

    const [r, g, b] = rgb
      .map(c => hexToDec(c))
      .map(c => decToHex(255 - c))
    console.log(r,g,b)
    return ["#", r,g,b].join("")
  }
  else {
    return "black"
  }

}
