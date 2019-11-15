import { createSelector } from 'reselect';
import { sortByClassroomName } from "utils"

export const getClassrooms = (state) => state.classrooms

export const getSelectedClassroom = createSelector(
  [getClassrooms],
  classrooms => {
    return Object.values(classrooms).find( room => room.selected )
  }
)

export const getSortedClassrooms = createSelector(
  [getClassrooms],
  classrooms => Object.values(classrooms).sort(sortByClassroomName)
)
