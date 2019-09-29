import React, {Fragment, useState} from "react"
import colorbrewer from "colorbrewer"

import "styles/spinner.css"

const shuffle = (array) => {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

}

const pickWinner = ( kids ) => {

  const lastWinner = kids.find(kid => kid.winner)
  if (lastWinner) {
    lastWinner.winner = false;
    lastWinner.color = "black";
  }

  const winnableKids = kids.filter( kid => kid.canWin )

  const winnerIndex = Math.floor(Math.random() * winnableKids.length)
  const winner = winnableKids[winnerIndex]
  const kidIndex = kids.findIndex(kid => kid === winner)
  winner.winner = true;
  winner.canWin = false;

  if (kidIndex > 0) {
    const movableKids = kids.splice(0, kidIndex)
    kids.push(...movableKids)
  }
  return kids
}

const colors = colorbrewer.Set1[9]

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
  "Wesley"
]

const NdefaultKids = [
  "Jim Thomason",
  "Carolyn Thomason",
  "Alex Thomason",
  "Anakin Berry",
  "Sally Thomason",
  "Tucker Thomason",
]

const kidsWithColors = defaultKids.map( (kid, i) => ( { name : kid, color : colors[i % colors.length], canWin : true } ) )

console.log("COLORS : ", colors)

const heightForAngle = (angle, outerRadius) => {
  const radians = angle / 360 * 2 * Math.PI

  return outerRadius * Math.tan(radians)
}

export default props => {

  const [spin, setSpin] = useState(false);
  const [kids, setKids] = useState(kidsWithColors);

  const outerRadius = 250
  const innerRadius = 20

  const textOffset = 200
  const margin = 20

  // take the number of kids and divide by 360. That's what'll cover a kid.
  // half of that will be the +/0 angle
  const wedgeAngle = 360 / kids.length / 2

  return (
    <Fragment>
      <svg style={{width : `${outerRadius * 2 + margin}px`, height : `${outerRadius * 2 + margin}px`}}>
        <g className={`spinner ${ spin ? "spinning" : ""}`}>
          <clipPath id = "circle">
            <circle cx={outerRadius + margin / 2} cy={outerRadius + margin / 2} r={outerRadius} fill = 'blue'/>
          </clipPath>
          <circle cx={outerRadius + margin / 2} cy={outerRadius + margin / 2} r={outerRadius} fill = 'blue'/>
          { kids.map((kid, i, kids) => {
            const angle = i / kids.length * 360
            return (
              <g clipPath="url(#circle)" key={kid.name}>
                <g transform={`translate(${outerRadius + innerRadius + textOffset + margin / 2}, ${outerRadius + margin / 2}) rotate(${angle}, -${innerRadius + textOffset}, 0)`}>
                  <path className="wedge" d={`M${-innerRadius - textOffset},0 l${outerRadius}, ${heightForAngle(wedgeAngle, outerRadius)} l0, ${-2 * heightForAngle(wedgeAngle, outerRadius)} Z`}
                    fill={kid.color}
                    stroke="black"
                    strokeWidth="2" />

                  <text textAnchor="end" alignmentBaseline="middle" fill={"black"}>{kid.name}</text>
                </g>
              </g>
            )
          })}
          <circle cx={outerRadius + margin / 2} cy={outerRadius + margin / 2} r={innerRadius} fill = 'black'/>
          <circle cx={outerRadius + margin / 2} cy={outerRadius + margin / 2} r={outerRadius} stroke = 'black' fill="none" strokeWidth="4"/>
        </g>
        <path d={`M${outerRadius * 2 + margin},${outerRadius + margin / 2} l0,-10 l-20,10 l20,10 Z`} fill="white" stroke="black" />
      </svg>
      <button onClick={() => {
        setSpin(true);
        //const newKids = [...kids]
        //const lastKid = newKids.shift();
        //newKids.push(lastKid)
        setTimeout( () => setKids(pickWinner([...kids])), 2000)
        setTimeout( () => setSpin(false), 4000)
      }} >Spin it</button>
    </Fragment>
  )
}
