import React, { Fragment, useState } from "react"
import { connect } from "react-redux"
import colorbrewer from "colorbrewer"
import { Select } from "@rmwc/select"
import { TextField } from "@rmwc/textfield"
import { IconButton } from "@rmwc/icon-button"
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog"

import { setScheme, renameSpinner } from "actions"
import Spinner from "./Spinner"
import "styles/edit-spinner.css"

import * as actions from "actions"

import '@material/dialog/dist/mdc.dialog.css'
import '@material/button/dist/mdc.button.css'

const INITIAL = {}

const EditSpinner = props => {
  const [open, setOpen] = React.useState(false)

  const { spinner, setScheme, renameSpinner, deleteSpinner } = props
console.log("EDIT SPINNER : ", spinner)
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={evt => {
          setOpen(false)
          if (evt.detail.action === "accept") {
            deleteSpinner(spinner.id)
          }
        }}
      >
        <DialogTitle>Delet spinner?</DialogTitle>
        <DialogContent>Really delete {spinner.name}?</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept" isDefaultAction>
            Delete
          </DialogButton>
        </DialogActions>
      </Dialog>
      <div className="spinner-editor">
        <div className="spinner">
          <Spinner
            scheme={spinner.scheme}
            canSpin={false}
            outerRadius={100}
            kids={["","","","","","","","","","","","","","","","","",""]}
          />
        </div>
        <div className="spinner-editor-inputs">
          <TextField
            outlined
            label="Spinner"
            value={spinner.name}
            onChange={ e => renameSpinner(spinner.id, e.target.value) }
          />
          <Select
            label="Color Scheme"
            outlined
            value={spinner.scheme}
            options={Object.keys(colorbrewer).filter(key => key !== "schemeGroups").sort()}
            onChange={ (e) => setScheme(spinner.id, e.target.value) }
          />
        <IconButton icon="delete" onClick={() => setOpen(true)}/>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {
  return {
    spinner : state.spinners[props.spinnerID]
  }
}

export default connect(mapStateToProps, actions)(EditSpinner)
