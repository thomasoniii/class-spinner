import pushid from "pushid"

export const ADD_CLASSROOM = "ADD_CLASSROOM"
export const SELECT_CLASSROOM = "SELECT_CLASSROOM"
export const RENAME_CLASSROOM = "RENAME_CLASSROOM"
export const SET_ROSTER = "SET_ROSTER"

export const addClassroom = () => {
  return dispatch => {
    const id = pushid()
    dispatch( { type : ADD_CLASSROOM, payload : { id } } )
    dispatch( selectClassroom(id) )
  }
}

export const selectClassroom = (id) => {
  return {
    type : SELECT_CLASSROOM,
    payload : { id }
  }
}

export const renameClassroom = (id, name) => {
  console.log("RENAMES : ", id, name)
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
