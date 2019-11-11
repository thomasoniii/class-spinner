import React, {Fragment} from "react"
import { connect } from "react-redux"
import { TextField } from "@rmwc/textfield"
import { IconButton } from "@rmwc/icon-button"
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog"

import * as actions from "actions"
import { getSelectedClassroom, getSelectedSpinner } from "selectors"

import SelectSpinner from "./select-spinner"
import ClassroomSelector from "./classroom-selector"
import SpinnerDetails from "./spinner-details"

import "styles/edit-classroom.css"
import '@material/dialog/dist/mdc.dialog.css'
import '@material/button/dist/mdc.button.css'
import '@material/icon-button/dist/mdc.icon-button.css';

const EditClassroom = (props) => {
  const {
    classroom,
    renameClassroom,
    setRoster,
    classrooms,
    addClassroom,
    deleteClassroom,
    selectClassroom,
    selectedClassroom = {},
    spinners,
    selectedSpinner,
    selectSpinner,

    setStudentStatus
  } = props

  const [open, setOpen] = React.useState(false)

  console.log("EDIT CLASS : ", classroom, renameClassroom, setRoster, props, selectedClassroom)
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={evt => {
          setOpen(false)
          if (evt.detail.action === "accept") {
            deleteClassroom(selectedClassroom.id)
          }
        }}
      >
        <DialogTitle>Import/Export Data</DialogTitle>
        <DialogContent>Really delete {selectedClassroom.name}?</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept" isDefaultAction>
            Delete
          </DialogButton>
        </DialogActions>
      </Dialog>
      <div className="edit-classroom-container">

        <div className="classroom-selector">
          <span className='dropdown'><ClassroomSelector
            classrooms={classrooms}
            addClassroom={addClassroom}
            selectClassroom={selectClassroom}
          />
          </span>
          <span className='buttons'>
            <IconButton
              icon="remove_circle"
              disabled={ selectedClassroom.id === undefined }
              onClick={() => setOpen(true)}
            />
            <IconButton icon="add_circle" onClick={() => addClassroom()} />
          </span>

      </div>

        <TextField
          fullWidth
          className="classroom-name"
          outlined
          label="Classroom"
          value={selectedClassroom.name || ""}
          onChange={ e => renameClassroom(selectedClassroom.id, e.target.value) }
        />

        <TextField
          className="classroom-list"
          textarea
          outlined
          fullwidth
          label="Students"
          rows={8}
          value={(selectedClassroom.roster || []).join("\n")}
          onChange={ e => setRoster(selectedClassroom.id, e.target.value.split(/\r?\n/)) }
        />

        <div className="spinner-selector">
          <SelectSpinner
            spinners={spinners}
            selectedSpinner={selectedSpinner}
            selectSpinner={selectSpinner}/>
        </div>
        <div className="spinner-details">
          { selectedClassroom.id && selectedSpinner && <SpinnerDetails
            classroom={selectedClassroom}
            spinner={selectedSpinner}
            updateStatus={setStudentStatus}
          /> }
        </div>

      </div>
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {
  console.log("SP : ", state, props, getSelectedSpinner(state));
  return {
    selectedClassroom : getSelectedClassroom(state),
    classrooms : state.classrooms,
    selectedSpinner : getSelectedSpinner(state),
    spinners : state.spinners
  }
}

export default connect(mapStateToProps, actions)(EditClassroom)
