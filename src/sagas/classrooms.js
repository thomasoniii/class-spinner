import { call, all, put, takeLatest } from 'redux-saga/effects';

import {
  ADD_CLASSROOM,
  SELECT_CLASSROOM
} from 'actions';

import { selectClassroom } from 'actions';

export default function* transactionSaga() {
  yield all([
    takeLatest( ADD_CLASSROOM, addClassroom),
  ])
}

function* addClassroom(action) {
}
