import React, { Fragment } from 'react';
import { connect } from 'react-redux';

export const TaskList = ({tasks, groupName}) => (
  <Fragment>
    <div>
      <h3>{groupName}</h3>
    </div>
    <div>
      { tasks.map(task => (<div key={task.id}>{task.name}</div>)) }
    </div>
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

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);
