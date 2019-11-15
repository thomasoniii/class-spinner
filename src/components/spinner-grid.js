import React from "react"

import {Card, CardPrimaryAction} from "@rmwc/card"

import Spinner from "components/spinner"

import '@material/card/dist/mdc.card.css'
import '@material/button/dist/mdc.button.css'
import '@material/icon-button/dist/mdc.icon-button.css'

import "styles/spinner-grid.css"

export default (props) => {

  const { spinners, selectSpinner } = props

  return (
    <div
      className="classroom-grid"
    >
      { Object.values(spinners).map(spinner => (
        <Card outlined className="spinner-card" key={spinner.id} >
          <CardPrimaryAction onClick={() => {
            selectSpinner(spinner.id)
          }}>
            <div className="spinner-card-content">
              <Spinner
                spinner={ spinner }
                classroom= {{
                  roster : ["","","","","","","","","","","","","","","","","",""],
                  spinners : {}
                }}
                canSpin={false}
              />
            <span className="spinner-name">{ spinner.name }</span>
            </div>
          </CardPrimaryAction>
        </Card>
      ))}
    </div>
  )
}
