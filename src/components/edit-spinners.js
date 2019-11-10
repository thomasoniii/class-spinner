import React from "react"
import { connect } from "react-redux"
import { List, SimpleListItem, ListDivider } from "@rmwc/list"
import { Button } from "@rmwc/button"
import { Fab } from "@rmwc/fab"

import EditSpinner from "./edit-spinner"

import { addSpinner, selectSpinner } from "actions"
import { getSelectedSpinner } from "selectors"

import "styles/edit-spinners.css"
import '@material/list/dist/mdc.list.css';

const EditSpinners = (props) => {

  const { spinners } = props

  return (
    <div className="edit-spinners-container">

      <div>
        <List>
          <SimpleListItem text="Spinners" disabled={true}/>
          <ListDivider />
          { Object.keys(spinners).sort().map( id => {
            const spinner = spinners[id]
            return <SimpleListItem
              key={id}
              text={spinner.name}
              activated={spinner.selected}
              onClick={ () => props.selectSpinner(id) }
            />
          })}
        </List>

        <Fab
          label="Add Spinner"
          theme={['primaryBg']}
          onClick={ props.addSpinner} />
      </div>

      { props.selectedSpinnerID && <EditSpinner spinnerID={props.selectedSpinnerID} /> }

    </div>
  )
}

const mapStateToProps = (state) => ({
  spinners : state.spinners,
  selectedSpinnerID : getSelectedSpinner(state)
})

export default connect(mapStateToProps, { addSpinner, selectSpinner })(EditSpinners)
