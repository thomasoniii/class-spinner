import React from "react"
import { Select } from "@rmwc/select"

import '@material/select/dist/mdc.select.css';

const ClassroomSelector = (props) => {

  const options = Object.values(props.classrooms).map( classroom => ({ value : classroom.id, label : classroom.name }) )
  const selectedClassroomId = Object.keys(props.classrooms).find( classroomId => props.classrooms[classroomId].selected === true)

  return (<Select
    label="Select classroom"
    outlined
    options={ options }
    value = { selectedClassroomId }
    onChange={ e => {
      props.selectClassroom(e.target.value)
    }}
  />)
}

export default ClassroomSelector
