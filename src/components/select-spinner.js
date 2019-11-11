import React from "react"
import { Select } from "@rmwc/select"

import '@material/select/dist/mdc.select.css';

const SelectSpinner = (props) => {
  return (<Select
    label="Select spinner"
    outlined
    options={ Object.values(props.spinners).map( spinner => ({ value : spinner.id, label : spinner.name }) ) }
    value = { props.selectedSpinner.id }
    onChange={ e => props.selectSpinner(e.target.value) }
  />)
}

export default SelectSpinner
