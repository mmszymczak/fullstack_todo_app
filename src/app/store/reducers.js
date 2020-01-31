import { defaultState } from '../../server/defaultState';
import * as mutations from './mutations';

export function sessionReducer(userSession = defaultState.session || {}, action) {
  let { type, authenticated, session } = action;
  switch (type) {
    case mutations.SET_STATE:
      return {...userSession, id: action.state.session.id};

    case mutations.REQUEST_AUTHENTICATE_USER:
      return {...userSession, authenticated: mutations.AUTHENTICATING};

    case mutations.PROCESSING_AUTHENTICATE_USER:
      return {...userSession, authenticated};

    default:
      return userSession;
  }
};

export function tasksReducer(tasks = [], action) {
  switch(action.type) {
    case mutations.SET_STATE:
      return action.state.tasks;

    case mutations.CREATE_TASK:
      return [...tasks, {
        id: action.taskId,
        name: 'New task ' + Date.now(),
        group: action.groupId,
        owner: action.ownerId,
        isComplete: false
      }];

    case mutations.SET_TASK_COMPLETE:
      return tasks.map(task => (task.id === action.taskId)
        ? {...task, isComplete: action.isComplete}
        : task);

    case mutations.SET_TASK_NAME:
      return tasks.map(task => (task.id === action.taskId)
        ? {...task, name: action.name}
        : task);

    case mutations.SET_TASK_GROUP:
      return tasks.map(task => (task.id === action.taskId)
        ? {...task, group: action.groupId}
        : task);

    default:
      return tasks;
  }
};

export function commentsReducer(comments = [], action) {
  return comments;
};

export function groupsReducer(groups = [], action) {
  switch (action.type) {
    case mutations.SET_STATE:
      return action.state.groups;

    default:
      return groups;
  }
};

export function usersReducer(users = [], action) {
  return users;
};
