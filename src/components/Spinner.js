import React, {useState} from "react"
import colorbrewer from "colorbrewer"
import {Fab} from "@rmwc/fab"

import { invertColor } from "utils"

import "styles/spinner.css"

const availableSchemes = Object.entries(colorbrewer).reduce( (available, [key, set]) => {
  if (key !== "schemeGroups") {
    available[key] = set[Object.keys(set).sort().pop()]
  }
  return available
}, {} )

const pickWinner = ( kids, classroom, spinner, setRoster, setStudentStatus, setWinner, resetSpinner ) => {

  const lastWinner = kids.find(kid => kid.winner)
  if (lastWinner) {
    setStudentStatus(classroom.id, spinner.id, lastWinner.name, "Picked")
    lastWinner.status = "Picked";
  }

  const winnableKids = kids.filter( kid => kid.status === "Available" )

  if (winnableKids.length === 0) {
    resetSpinner(classroom.id, spinner.id, false)
    return
  }

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

const renderKidName = (kid) => {
  return `${kid.name}${kid.status === "Suspended" ? "." : ""}`
}

const defaultWinner = "nobody-at-all"

export default props => {

  const {
    classroom,
    spinner,
    setRoster,
    setStudentStatus = () => {},
    resetSpinner = () => {},
    setOpen
  } = props

  const [spin, setSpin] = useState(false);
  const [winner, setWinner] = useState(defaultWinner)

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

  const { innerRadius = 20 } = props

  const colors = availableSchemes[spinner.scheme || "Set1"]

  // take the number of kids and divide by 360. That's what'll cover a kid.
  // half of that will be the +/0 angle
  const wedgeAngle = 360 / kids.length / 2

  return (
    <div className="spinner-container">
      <svg
        viewBox={`0 0 550 500`}
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id = "circle">
            <circle cx = "250" cy = "250" r = "245" />
          </clipPath>
        </defs>
        <g className={`spinner ${ spin ? "spinning" : ""}`} style={{transformOrigin : `250px 250px`}}>

          <circle cx="250" cy="250" r="245" fill = 'blue'/>
          { kids.map((kid, i, kids) => {
            const angle = i / kids.length * 360
            return (
              <g clipPath="url(#circle)" key={kid.name + i}>
                <g transform={`rotate(${angle}, 250, 250)`}>
                  <path className="wedge" d={`M250,250 l250,${heightForAngle(wedgeAngle, 250)} l0,${-2 * heightForAngle(wedgeAngle, 250)} Z`}
                    fill={ kid.status !== "Picked" || kid.name === winner ? colors[kid.color % colors.length] : "#444444"}
                    stroke={ kid.name === winner ? "gold" : "black"}
                    strokeWidth={ kid.name === winner ? "10" : "2"}
                    onClick= {
                      () => {
                        if (kid.name === winner) {
                          setWinner(defaultWinner)
                          setStudentStatus(classroom.id, spinner.id, kid.name, "Available")
                        }
                        else {
                          setStudentStatus(classroom.id, spinner.id, kid.name, kid.status === "Suspended" ? "Available" : "Suspended")
                        }
                      }
                    }/>

                  <text
                    x = "475"
                    y = "250"
                    textAnchor="end"
                    alignmentBaseline="middle"
                    fill={kid.status !== "Picked" || kid.name === winner  ? "#FFFFFF" : "#666666"}
                    stroke={kid.status !== "Picked" || kid.name === winner  ? "#333333" : "#000000"}
                    strokeWidth={1}>{renderKidName(kid)}</text>
                </g>
              </g>
            )
          })}
          <circle cx="250" cy="250" r={innerRadius} fill = 'black'/>
          <circle cx="250" cy="250" r="245" stroke = 'black' fill="none" strokeWidth="4"/>
        </g>
        { props.canSpin && <path d="M480,250 L548,240 L548,260 Z" className="spinner-pointer" /> }
      </svg>
      { props.canSpin && <div className='spinner-actions'>
        <Fab
          label="Reset spinner"
          style={{ backgroundColor: 'var(--mdc-theme-error)' }}
          onClick={() => {
            if (spin === false) {
              if (window.confirm("Really reset this spinner?")) {
                setWinner(defaultWinner)
                resetSpinner(classroom.id, spinner.id)
              }
            }
          }} />
        <Fab
          label="Spin the wheel"
          theme={['primaryBg']}
          onClick={() => {
            if (spin === false) {
              setSpin(true);
              //const newKids = [...kids]
              //const lastKid = newKids.shift();
              //newKids.push(lastKid)
              setTimeout( () => pickWinner([...kids], classroom, spinner, setRoster, setStudentStatus, setWinner, resetSpinner), 1000)
              setTimeout( () => setSpin(false), 1500)
            }
          }} />
      { setOpen && <Fab
          label="Close"
          onClick={() => {
            if (spin === false) {
              setOpen(false)
            }
          }} /> }
      </div> }
    </div>
  )
}
