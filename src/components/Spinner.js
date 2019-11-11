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

const pickWinner = ( kids, classroom, spinner, setRoster, setStudentStatus, setWinner ) => {

  const lastWinner = kids.find(kid => kid.winner)
  if (lastWinner) {
    setStudentStatus(classroom.id, spinner.id, lastWinner.name, "Picked")
    lastWinner.status = "Picked";
  }

  const winnableKids = kids.filter( kid => kid.status === "Available" )

  const winnerIndex = Math.floor(Math.random() * winnableKids.length)
  const winner = winnableKids[winnerIndex]
  const kidIndex = kids.findIndex(kid => kid === winner)
  setWinner(winner.name)

  if (kidIndex > 0) {
    const movableKids = kids.splice(0, kidIndex)
    kids.push(...movableKids)
  }

  setRoster(classroom.id, kids.map(row => row.name))
  setStudentStatus(classroom.id, spinner.id, winner.name, "Picked")
}

const heightForAngle = (angle, outerRadius) => {
  const radians = angle / 360 * 2 * Math.PI

  return outerRadius * Math.tan(radians)
}

export default props => {

  const { classroom, spinner, setRoster, setStudentStatus } = props

  const [spin, setSpin] = useState(false);
  const [winner, setWinner] = useState("nobody-at-all")

  const spinnerStatus = classroom.spinners[spinner.id] || {}

  const kids = classroom.roster.map( (kid, i) => {
    const row = { name : kid, color : i }
    if (spinnerStatus[kid] !== undefined) {
      row.status = spinnerStatus[kid]
    }
    else {
      row.status = "Available"
    }

    return row
  })

  const { outerRadius = 400, innerRadius = 20, margin = 20 } = props

  const textOffset = outerRadius - innerRadius - 10

  const colors = availableSchemes[spinner.scheme || "Set1"]
  const pointerPadding = 20

  // take the number of kids and divide by 360. That's what'll cover a kid.
  // half of that will be the +/0 angle
  const wedgeAngle = 360 / kids.length / 2

  return (
    <div className="spinner-container">
      <svg
        style={{width : "70vmin", height : "70vmin"}}
        viewBox={`0 0 ${outerRadius * 2 + margin + pointerPadding} ${outerRadius * 2 + margin}`}>
        <g className={`spinner ${ spin ? "spinning" : ""}`} style={{transformOrigin : `${outerRadius + margin / 2}px ${outerRadius + margin / 2}px`}}>
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
                    fill={ kid.status !== "Picked" || kid.name === winner ? colors[kid.color % colors.length] : "#444444"}
                    stroke={ kid.name === winner ? "gold" : "black"}
                    strokeWidth={ kid.name === winner ? "10" : "2"} />

                  <text textAnchor="end" alignmentBaseline="middle" fill={kid.status !== "Picked" || kid.name === winner  ? "black" : "#666666"}>{kid.name}</text>
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
            if (spin === false) {
              setSpin(true);
              //const newKids = [...kids]
              //const lastKid = newKids.shift();
              //newKids.push(lastKid)
              setTimeout( () => pickWinner([...kids], classroom, spinner, setRoster, setStudentStatus, setWinner), 2000)
              setTimeout( () => setSpin(false), 4000)
            }
          }} />
      </div> }
    </div>
  )
}
