import React from "react"
import { useHistory } from "react-router"
import { sortByClassroomName } from "utils"

import {Card, CardPrimaryAction} from "@rmwc/card"

import Spinner from "components/spinner"

import '@material/card/dist/mdc.card.css'
import '@material/button/dist/mdc.button.css'
import '@material/icon-button/dist/mdc.icon-button.css'

import "styles/classroom-grid.css"

export default (props) => {

  const { classrooms, selectSpinner, selectClassroom } = props

  const history = useHistory()

  return (
    <div
      className="classroom-grid"
    >
      { Object.values(classrooms).sort(sortByClassroomName).map(classroom => (

          <Card outlined className="classroom-card">
            <CardPrimaryAction onClick={() => {
              selectSpinner(undefined)
              selectClassroom(classroom.id)
              history.push("/classroom")
            }}>
              <div className="spinner-card-content">
                <Spinner
                  spinner={ { scheme : "Set1" } }
                  classroom= {{
                    roster : ["","","","","","","","","","","","","","","","","",""],
                    spinners : {}
                  }}
                  canSpin={false}
                  outerRadius={100}
                />
                <span>{ classroom.name }</span>
              </div>
            </CardPrimaryAction>
          </Card>
      ))}
    </div>
  )
}
