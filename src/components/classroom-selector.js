import React from "react"
import { connect } from "react-redux"
import { Select } from "@rmwc/select"

import '@material/select/dist/mdc.select.css';

import * as actions from "actions"

const ClassroomSelector = (props) => {
  console.log("PROPS : ", props)

  const options = Object.values(props.classrooms).map( classroom => ({ value : classroom.id, label : classroom.name }) )
  const selectedClassroomId = Object.keys(props.classrooms).find( classroomId => props.classrooms[classroomId].selected === true)

console.log("ID : ", selectedClassroomId)
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
