import {
  ADD_CLASSROOM,
  SELECT_CLASSROOM,
  DELETE_CLASSROOM,
  RENAME_CLASSROOM,
  SET_ROSTER
} from "actions"

const INITIAL = {}

export default (state = INITIAL, action) => {
  console.log("RED HERE : ", action)
  switch(action.type) {
    case ADD_CLASSROOM : {
      const { id } = action.payload
      return {
        ...state,
        [id] : {
          id,
          name : "New Classroom",
          scheme : "Set1",
          selected : true
        }
      }
    }
    case SELECT_CLASSROOM : {
      const { id : selectedID } = action.payload

      return Object.entries(state).reduce( (newState, [id, classroom]) => {
        console.log("MAPPING : ", id, classroom, selectedID)
        if (selectedID === id && classroom.selected === false) {
          newState[id] = { ...state[id], selected : true }
        }
        else if (selectedID !== id  && classroom.selected === true) {
          newState[id] = { ...state[id], selected : false }
        }
        else {
          newState[id] = classroom
        }
        return newState
      }, {})
    }
    case RENAME_CLASSROOM : {
      const { id, name } = action.payload
      console.log("RENAMES RED : ", id, name)
      return {
        ...state,
        [id] : { ...state[id], name }
      }
    }
    case DELETE_CLASSROOM : {
      console.log("DELETE CLASSROOM")
      const {id} = action.payload
      const newState = { ...state }
      delete newState[id]
      return newState
    }
    case SET_ROSTER : {
      const { id, roster } = action.payload
      return {
        ...state,
        [id] : { ...state[id], roster }
      }
    }
    default :
      return state
  }
}
