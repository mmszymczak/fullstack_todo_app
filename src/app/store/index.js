import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {
  sessionReducer,
  tasksReducer,
  commentsReducer,
  groupsReducer,
  usersReducer
} from './reducers';

const sagaMiddleware = createSagaMiddleware();

import * as sagas from './sagas';

export const store = createStore(
  combineReducers({
    sessionReducer,
    tasksReducer,
    commentsReducer,
    groupsReducer,
    usersReducer
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
