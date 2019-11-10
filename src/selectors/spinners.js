import { createSelector } from 'reselect';

export const getSpinners = (state) => state.spinners

export const getSelectedSpinner = createSelector(
  [getSpinners],
  spinners => {
    return Object.values(spinners).find( spinner => spinner.selected )
  }
)
