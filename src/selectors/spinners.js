import { createSelector } from 'reselect';

export const getSpinners = (state) => state.spinners

export const getSelectedSpinner = createSelector(
  [getSpinners],
  spinners => {
    return Object.keys(spinners).find( id => spinners[id].selected )
  }
)
