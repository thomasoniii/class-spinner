import React from "react"
import { connect } from "react-redux"
import colorbrewer from "colorbrewer"
import { Select } from "@rmwc/select"
import { TextField } from "@rmwc/textfield"

import { setScheme, renameSpinner } from "actions"
import Spinner from "./Spinner"

const EditSpinner = props => {

  const { spinner, setScheme, renameSpinner } = props

  return (
    <div>
      <Spinner
        scheme={spinner.scheme}
        canSpin={false}
        outerRadius={100}
        kids={["","","","","","","","","","","","","","","","","",""]}
      />
      <Select
        label="Color Scheme"
        outlined
        value={spinner.scheme}
        options={Object.keys(colorbrewer).filter(key => key !== "schemeGroups").sort()}
        onChange={ (e) => setScheme(spinner.id, e.target.value) }
      />
      <TextField
        outlined
        label="Spinner"
        value={spinner.name}
        onChange={ e => renameSpinner(spinner.id, e.target.value) }
      />
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    spinner : state.spinners[props.spinnerID]
  }
}

export default connect(mapStateToProps, { setScheme, renameSpinner })(EditSpinner)
