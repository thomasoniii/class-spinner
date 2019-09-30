import { createSelector } from 'reselect';

export const getClassrooms = (state) => state.classrooms

export const getSelectedClassroom = createSelector(
  [getClassrooms],
  classrooms => {
    return Object.keys(classrooms).find( id => classrooms[id].selected )
  }
)
