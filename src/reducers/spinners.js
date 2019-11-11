import {
  ADD_SPINNER,
  SELECT_SPINNER,
  RENAME_SPINNER,
  SET_SCHEME,
  DELETE_SPINNER
} from "actions"

const INITIAL = {}

export default (state = INITIAL, action) => {
  switch(action.type) {
    case ADD_SPINNER : {
      const { id } = action.payload
      return {
        ...state,
        [id] : {
          id,
          name : "New Spinner",
          scheme : "Set1",
          selected : true
        }
      }
    }
    case SELECT_SPINNER : {
      const { id : selectedID } = action.payload

      return Object.entries(state).reduce( (newState, [id, spinner]) => {
        if (selectedID === id && spinner.selected === false) {
          newState[id] = { ...state[id], selected : true }
        }
        else if (selectedID !== id  && spinner.selected === true) {
          newState[id] = { ...state[id], selected : false }
        }
        else {
          newState[id] = spinner
        }
        return newState
      }, {})
    }
    case RENAME_SPINNER : {
      const { id, name } = action.payload
      return {
        ...state,
        [id] : { ...state[id], name }
      }
    }
    case SET_SCHEME : {
      const { id, scheme } = action.payload
      return {
        ...state,
        [id] : { ...state[id], scheme }
      }
    }
    case DELETE_SPINNER : {
      const {id} = action.payload
      const nextSelectionIdx = Object.keys(state).sort().findIndex(spinnerId => spinnerId === id) - 1
      const nextSelectionId = nextSelectionIdx > -1
        ? Object.keys(state).sort()[nextSelectionIdx]
        : Object.keys(state).sort()[1]
      const newState = { ...state }
      delete newState[id]
      if (Object.keys(newState).length) {
        newState[nextSelectionId] = { ...newState[nextSelectionId], selected : true }
      }
      return newState
    }
    default :
      return state
  }
}
