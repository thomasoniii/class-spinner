import React, {useState} from "react"
import colorbrewer from "colorbrewer"
import {Fab} from "@rmwc/fab"

import "styles/spinner.css"

const availableSchemes = Object.entries(colorbrewer).reduce( (available, [key, set]) => {
  if (key !== "schemeGroups") {
    available[key] = set[Object.keys(set).sort().pop()]
  }
  return available
}, {} )

console.log("AVAILABLE : ", colorbrewer)

const pickWinner = ( kids ) => {

  const lastWinner = kids.find(kid => kid.winner)
  if (lastWinner) {
    lastWinner.winner = false;
    lastWinner.canWin = false;
  }

  const winnableKids = kids.filter( kid => kid.canWin )

  const winnerIndex = Math.floor(Math.random() * winnableKids.length)
  const winner = winnableKids[winnerIndex]
  const kidIndex = kids.findIndex(kid => kid === winner)
  winner.winner = true;

  if (kidIndex > 0) {
    const movableKids = kids.splice(0, kidIndex)
    kids.push(...movableKids)
  }
  return kids
}

const defaultKids = [
  "Jim Thomason",
  "Carolyn Thomason",
  "Alex Thomason",
  "Anakin Berry",
  "Sally Thomason",
  "Tucker Thomason",
  "Grandma Thomason",
  "Grandpa Thomason",
  "Kirk",
  "Spock",
  "McCoy",
  "Scotty",
  "Uhura",
  "Chekov",
  "Sulu",
  "Picard",
  "Riker",
  "Troi",
  "Data",
  "LaForge",
  "Worf",
  "Crusher",
  "O'Brien",
  "Wesley",
  "Janeway",
  "Tuvok",
  "Paris",
  "James Augustus Thomason III"
]

const kidsWithColors = defaultKids.map( (kid, i) => ( { name : kid, color : i, canWin : true } ) )

console.log("COLORS : ", colorbrewer)

const heightForAngle = (angle, outerRadius) => {
  const radians = angle / 360 * 2 * Math.PI

  return outerRadius * Math.tan(radians)
}

export default props => {
console.log("SPINNER : ", props)
  const [spin, setSpin] = useState(false);
  //const [kids, setKids] = useState(kidsWithColors);
  const [kids, setKids] = useState(props.kids.map( (kid, i) => ( { name : kid, color : i, canWin : true } ) ));

  const { outerRadius = 400, innerRadius = 20, margin = 20 } = props

  const textOffset = outerRadius - innerRadius - 10

  const colors = availableSchemes[props.scheme]
  const pointerPadding = 20

  // take the number of kids and divide by 360. That's what'll cover a kid.
  // half of that will be the +/0 angle
  const wedgeAngle = 360 / kids.length / 2
console.log("KIDS : ",kids)
  return (
    <div className="spinner-container">
      <svg style={{width : `${outerRadius * 2 + margin + pointerPadding}px`, height : `${outerRadius * 2 + margin}px`}}>
        <g className={`spinner ${ spin ? "spinning" : ""}`}>
          <clipPath id = "circle">
            <circle cx={outerRadius + margin / 2} cy={outerRadius + margin / 2} r={outerRadius} fill = 'blue'/>
          </clipPath>
          <circle cx={outerRadius + margin / 2} cy={outerRadius + margin / 2} r={outerRadius} fill = 'blue'/>
          { kids.map((kid, i, kids) => {
            const angle = i / kids.length * 360
            return (
              <g clipPath="url(#circle)" key={kid.name + i}>
                <g transform={`translate(${outerRadius + innerRadius + textOffset + margin / 2}, ${outerRadius + margin / 2}) rotate(${angle}, -${innerRadius + textOffset}, 0)`}>
                  <path className="wedge" d={`M${-innerRadius - textOffset},0 l${outerRadius}, ${heightForAngle(wedgeAngle, outerRadius)} l0, ${-2 * heightForAngle(wedgeAngle, outerRadius)} Z`}
                    fill={ kid.canWin ? colors[kid.color % colors.length] : "#444444"}
                    stroke={ kid.winner ? "gold" : "black"}
                    strokeWidth={ kid.winner ? "10" : "2"} />

                  <text textAnchor="end" alignmentBaseline="middle" fill={kid.canWin ? "black" : "#666666"}>{kid.name}</text>
                </g>
              </g>
            )
          })}
          <circle cx={outerRadius + margin / 2} cy={outerRadius + margin / 2} r={innerRadius} fill = 'black'/>
          <circle cx={outerRadius + margin / 2} cy={outerRadius + margin / 2} r={outerRadius} stroke = 'black' fill="none" strokeWidth="4"/>
        </g>
        { props.canSpin && <path d={`M${outerRadius * 2 + margin + pointerPadding - 2},${outerRadius + margin / 2} l0,-10 l-40,10 l40,10 Z`} className="spinner-pointer" /> }
      </svg>
      { props.canSpin && <div>
        <Fab
          label="Spin the wheel"
          theme={['primaryBg']}
          onClick={() => {
            setSpin(true);
            //const newKids = [...kids]
            //const lastKid = newKids.shift();
            //newKids.push(lastKid)
            setTimeout( () => setKids(pickWinner([...kids])), 2000)
            setTimeout( () => setSpin(false), 4000)
          }} />
      </div> }
    </div>
  )
}
