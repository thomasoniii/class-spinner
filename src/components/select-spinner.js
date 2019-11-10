import React from "react"
import { connect } from "react-redux"
import { Select } from "@rmwc/select"

import '@material/select/dist/mdc.select.css';

import * as actions from "actions"

const SelectSpinner = (props) => {
  console.log("PROPS : ", props)
  return (<Select
    label="Select spinner"
    outlined
    options={ Object.values(props.spinners).map( spinner => ({ value : spinner.id, label : spinner.name }) ) }
    value = { props.selectedSpinner.id }
    onChange={ e => props.selectSpinner(e.target.value) }
  />)
}

export default SelectSpinner
