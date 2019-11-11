import React from "react"
import { Select } from "@rmwc/select"

import '@material/select/dist/mdc.select.css';

const SelectSpinner = (props) => {

  const selectedSpinnerId = Object.keys(props.spinners).find( spinnerId => props.spinners[spinnerId].selected === true)

  return (<Select
    label="Select spinner"
    outlined
    options={ Object.values(props.spinners).map( spinner => ({ value : spinner.id, label : spinner.name }) ) }
    value = { selectedSpinnerId }
    onChange={ e => props.selectSpinner(e.target.value) }
  />)
}

export default SelectSpinner
