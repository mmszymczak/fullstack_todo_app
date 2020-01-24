import md5 from 'md5';

export const defaultState = {
  users: [
    {
      id: 'U1',
      name: 'dev',
      passwordHash: md5("Password1")
    },
    {
      id: 'U2',
      name: 'dev 2',
      passwordHash: md5("Password2")
    }
  ],
  groups: [
    {
      name: 'To do',
      id: 'G1',
      owner: 'U1'
    },
    {
      name: 'In progress',
      id: 'G2',
      owner: 'U1'
    },
    {
      name: 'Done',
      id: 'G3',
      owner: 'U1'
    }
  ],
  tasks: [
    {
      name: 'Do app',
      id: 'T1',
      group: 'G2',
      owner: 'U1',
      isComplete: false
    },
    {
      name: 'Learn something',
      id: 'T2',
      group: 'G1',
      owner: 'U1',
      isComplete: false
    },
    {
      name: 'Create server',
      id: 'T3',
      group: 'G1',
      owner: 'U2',
      isComplete: false
    },
    {
      name: 'Complete task',
      id: 'T4',
      group: 'G3',
      owner: 'U2',
      isComplete: true
    }
  ],
  comments: [
    {
      owner: 'U1',
      id: 'C1',
      task: 'T1',
      content: 'Great work!'
    }
  ]
}
