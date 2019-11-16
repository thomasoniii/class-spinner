import pushid from "pushid"

export const ADD_CLASSROOM = "ADD_CLASSROOM"
export const DELETE_CLASSROOM = "DELETE_CLASSROOM"
export const SELECT_CLASSROOM = "SELECT_CLASSROOM"
export const RENAME_CLASSROOM = "RENAME_CLASSROOM"
export const SET_ROSTER = "SET_ROSTER"
export const SET_STUDENT_STATUS = "SET_STUDENT_STATUS"
export const RESET_SPINNER = "RESET_SPINNER"

export const addClassroom = ( id = pushid() ) => {
  return async dispatch => {
    await dispatch( { type : ADD_CLASSROOM, payload : { id } } )
    await dispatch( selectClassroom(id) )
  }
}

export const deleteClassroom = (id) => {
  return {
    type : DELETE_CLASSROOM,
    payload : {id}
  }
}

export const selectClassroom = (id) => {
  return {
    type : SELECT_CLASSROOM,
    payload : { id }
  }
}

export const renameClassroom = (id, name) => {
  return {
    type : RENAME_CLASSROOM,
    payload : { id, name }
  }
}

export const setRoster = (id, roster) => {
  return {
    type : SET_ROSTER,
    payload : { id, roster }
  }
}

export const setStudentStatus = (id, spinnerId, studentName, status) => {
  return {
    type : SET_STUDENT_STATUS,
    payload : { id, spinnerId, studentName, status }
  }
}

export const resetSpinner = (id, spinnerId, resetSuspensions = true) => {
  return {
    type : RESET_SPINNER,
    payload : { id, spinnerId, resetSuspensions }
  }
}
