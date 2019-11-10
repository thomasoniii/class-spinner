import { createSelector } from 'reselect';

export const getClassrooms = (state) => state.classrooms

export const getSelectedClassroom = createSelector(
  [getClassrooms],
  classrooms => {
    return Object.values(classrooms).find( room => room.selected )
  }
)
