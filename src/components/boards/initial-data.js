
const initialData ={
  tasks: {
    'task-1': {id: 'task-1' , content: 'qwrqwerqwrqwr'},
    'task-2': {id: 'task-2', content: 'qwrqwerqwsda24rqwr'},
    'task-3': {id: 'task-3', content: 'qwrqweddarqwrqwr'},
    'task-4': {id: 'task-4', content: 'qwrqaawerqwrqwr'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    },
  },
  columnOrder: ['column-1','column-2','column-3']
};

export default initialData


// state = {
//   columns: {},
//   columnOrder: [],
//   tasks: {},
//   tasksIds: []
// }

// componentDidMount() {
//   const token = localStorage.getItem("token")
    
//   let config = {
//     headers: {'Authorization': "bearer " + token}
//   };

//   axios.get('http://localhost:3000/api/lists', config)		
//   .then(response => {
//     const lists = response.data
//     this.setState({lists})
//     const columnsID = lists.map(list => {
//       return list.id
//     })
//     this.setState({columnOrder: columnsID})

//     const columns = lists.map(list => {
//       return list
//     })
//     this.setState({columns: columns})
//   })
//   .catch(error => console.log(error))

//   axios.get('http://localhost:3000/api/cards', config)		
//   .then(response => {
//     const tasks = response.data
//     this.setState({tasks})
//     const tasksIds = tasks.map(task => {
//       return task.id
//     })
//     this.setState({taskIds: tasksIds})
//   })
//   .catch(error => console.log(error))
// }
