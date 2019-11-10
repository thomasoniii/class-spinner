import {
  ADD_CLASSROOM,
  SELECT_CLASSROOM,
  DELETE_CLASSROOM,
  RENAME_CLASSROOM,
  SET_ROSTER,
  SET_STUDENT_STATUS,
  DELETE_SPINNER
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
          selected : true,
          spinners : {},
          roster : []
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
    case SET_STUDENT_STATUS : {
      const { id, spinnerId, studentName, status } = action.payload

      return {
        ...state,
        [id] : {
          ...state[id],
          spinners : {
            ...state[id].spinners,
            [studentName] : status
          }
        }
      }

    }
    case DELETE_SPINNER : {
      const { id } = action.payload
      return Object.keys(state).reduce( (newState, classroomId) => {
        const classroom = state[classroomId]
        newState[classroomId] = classroom
        if (classroom.spinners[id] !== undefined) {
          newState[classroomId] = {
            ...classroom,
            spinners : {
              ...classroom.spinners
            }
          }
          delete newState[classroomId].spinners[id]
        }
        return newState
      }, {})
    }
    default :
      return state
  }
}
