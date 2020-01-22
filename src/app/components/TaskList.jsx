import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';
import { Link } from 'react-router-dom';

export const TaskList = ({tasks, groupName, id, createNewTask}) => (
  <Fragment>
    <div>
      <h3>{groupName}</h3>
    </div>
    <div>
      { tasks.map(task => (
        <Link to={`/task/${task.id}`} key={task.id}>
          <div>{task.name}</div>
        </Link>
      )) }
    </div>
    <button onClick={() => createNewTask(id)}>Create new</button>
  </Fragment>
);

function mapStateToProps(state, ownProps) {
  let groupId = ownProps.id;

  return {
    groupName: ownProps.groupName,
    id: groupId,
    tasks: state.tasks.filter(t => t.group === groupId)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    createNewTask(id) {
      console.log('create new task...');
      dispatch(requestTaskCreation(id));
    }
  }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);
