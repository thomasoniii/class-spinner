import pushid from "pushid"

export const ADD_SPINNER = "ADD_SPINNER"
export const SELECT_SPINNER = "SELECT_SPINNER"
export const RENAME_SPINNER = "RENAME_SPINNER"
export const DELETE_SPINNER = "DELETE_SPINNER"
export const SET_SCHEME = "SET_SCHEME"

export function addSpinner() {
  return dispatch => {
    const id = pushid()
    dispatch( { type : ADD_SPINNER, payload : { id } } )
    dispatch( selectSpinner(id) )
  }
}

export function selectSpinner(id) {
  return {
    type : SELECT_SPINNER,
    payload : { id }
  }
}

export function renameSpinner(id, name) {
  return {
    type : RENAME_SPINNER,
    payload : { id, name }
  }
}

export function setScheme(id, scheme) {
  return {
    type : SET_SCHEME,
    payload : { id, scheme }
  }
}

export function deleteSpinner(id) {
  return {
    type : DELETE_SPINNER,
    payload : { id }
  }
}
