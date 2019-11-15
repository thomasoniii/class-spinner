import React, {Fragment} from "react"
import { connect } from "react-redux"

import { Dialog, DialogTitle, DialogContent } from "@rmwc/dialog"

import * as actions from "actions"
import { getSelectedClassroom, getSelectedSpinner } from "selectors"

import ClassroomSelector from "./classroom-selector"
import SpinnerGrid from "./spinner-grid"
import Spinner from "./spinner"

import '@material/dialog/dist/mdc.dialog.css'
import '@material/button/dist/mdc.button.css'
import '@material/card/dist/mdc.card.css'

import "styles/classroom.css"

const Classroom = (props) => {
  const {
    classrooms,
    selectedClassroom,
    selectClassroom,
    spinners,
    selectedSpinner,
    selectSpinner,
    setRoster,
    setStudentStatus,
    resetSpinner
  } = props

  const [open, setOpen] = React.useState(selectedClassroom && selectedSpinner)

  return (
    <Fragment>
      <div className="classroom-container">

        <div className="classroom-selector">
          <ClassroomSelector
            classrooms={classrooms}
            selectClassroom={selectClassroom}
          />
        </div>

        <div className="spinner-selector">
          <SpinnerGrid
            selectedClassroom={selectedClassroom}
            spinners={spinners}
            selectSpinner={( spinnerId ) => {
              selectSpinner(spinnerId)
              setOpen(true)
            }}
          />
        </div>

      </div>
      { selectedSpinner && <Dialog
        open={open}
        onClose={evt => {
          setOpen(false);
        }}
        modal = {true}
        autoDetectWindowHeight={false}
        autoScrollBodyContent={false}
        className="spinner-dialog"
      >
        <DialogTitle className="spinner-dialog-title">
          { selectedSpinner.name }
        </DialogTitle>
        <DialogContent>

          <div className="active-spinner-card-content">
          <Spinner
            classroom={selectedClassroom}
            spinner={selectedSpinner}
            canSpin={true}
            setStudentStatus={setStudentStatus}
            setRoster={setRoster}
            outerRadius={600}
            resetSpinner={resetSpinner}
            setOpen={setOpen}
          />
          </div>

        </DialogContent>

      </Dialog> }
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {

  return {
    selectedClassroom : getSelectedClassroom(state),
    classrooms : state.classrooms,
    selectedSpinner : getSelectedSpinner(state),
    spinners : state.spinners
  }
}

export default connect(mapStateToProps, actions)(Classroom)
