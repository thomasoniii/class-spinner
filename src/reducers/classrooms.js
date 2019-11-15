import {
  ADD_CLASSROOM,
  SELECT_CLASSROOM,
  DELETE_CLASSROOM,
  RENAME_CLASSROOM,
  SET_ROSTER,
  SET_STUDENT_STATUS,
  DELETE_SPINNER,
  RESET_SPINNER
} from "actions"

const INITIAL = {}

export default (state = INITIAL, action) => {

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
      return {
        ...state,
        [id] : { ...state[id], name }
      }
    }
    case DELETE_CLASSROOM : {
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

      const newState = {
        ...state,
        [id] : {
          ...state[id],
          spinners : {
            ...state[id].spinners,
            [spinnerId] : {
              ...state[id].spinners[spinnerId],
              [studentName] : status
            }
          }
        }
      }

      const anyoneAvailable = Object.entries(newState[id].spinners[spinnerId]).some(([kid, status]) => status === "Available" && newState[id].roster.includes(kid))
        || Object.values(newState[id].spinners[spinnerId]).length !== newState[id].roster.length
      if (!anyoneAvailable) {
        const oldStatuses = newState[id].spinners[spinnerId]
        newState[id].spinners[spinnerId] = newState[id].roster.reduce( (newStatuses, studentName) => {
          newStatuses[studentName] = oldStatuses[studentName] === "Picked"
            ? "Available"
            : oldStatuses[studentName]
          return newStatuses
        }, {})
        newState[id].spinners[spinnerId][studentName] = status
      }

      return newState

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
    case RESET_SPINNER : {
      const { id, spinnerId } = action.payload

      const newState = {
        ...state,
        [id] : {
          ...state[id],
          spinners : {
            ...state[id].spinners,
            [spinnerId] : state[id].roster.reduce( (newSpinners, studentName) => {
              newSpinners[studentName] = "Available"
              return newSpinners
            }, {})
          }
        }
      }

      return newState

    }
    default :
      return state
  }
}
