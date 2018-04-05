import axios from 'axios';
let initial_state = {
  toDoList: [],
  selectedTask: ''
};

const UPDATE = 'UPDATE';
const ADD = 'ADD';
const DELETE = 'DELETE';
const COMPLETE = 'COMPLETE';
const SAVE = 'SAVE';
const GET = 'GET';
const GET_TASK = 'GET_TASK'

export default function reducer( state = initial_state, action ) {
    switch( action.type ) {
        case GET + '_FULFILLED':
            return { ...state, toDoList: action.payload.toDoList};
        case GET_TASK + '_FULFILLED':
            return { ...state, toDoList: action.payload.toDoList, selectedTask: action.payload.selectedTask};
        case ADD + '_FULFILLED':
            return { ...state, toDoList: action.payload.toDoList};
        case UPDATE + '_FULFILLED':
            return { ...state, toDoList: action.payload.toDoList};
        case DELETE + '_FULFILLED':
            return { ...state, toDoList: action.payload.toDoList};
        case COMPLETE + '_FULFILLED':
            return { ...state, toDoList: action.payload.toDoList};
        case SAVE + '_FULFILLED':
            return { ...state, toDoList: action.payload.toDoList};
        default:
            return state;
    }
}

export function addNew(obj) {
    return {
        type: ADD,
        payload: axios.post('https://practiceapi.devmountain.com/api/tasks', obj).then( tasks => {
            let newState = {
              toDoList: tasks.data,
            }
            return newState;
        })
    }
}

export function save(id, obj) {
    return {
        type: SAVE,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, obj).then( tasks => {
            let newState = {
              toDoList: tasks.data,
            }
            return newState;
        })
    }
}
export function complete(id) {
    return {
        type: COMPLETE,
        payload: axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then( tasks => {
            let newState = {
              toDoList: tasks.data,
            }
            return newState;
        })
    }
}
export function deleteTask(id) {
    return {
        type: DELETE,
        payload: axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then( tasks => {
            let newState = {
              toDoList: tasks.data,
            }
            return newState;
        })
    }
}
export function get() {
    return {
        type: GET,
        payload: axios.get('https://practiceapi.devmountain.com/api/tasks').then( tasks => {
            let newState = {
              toDoList: tasks.data,
            }
            return newState;
        })
    }
}

export function getTask(id) {
  return {
      type: GET_TASK,
      payload: axios.get('https://practiceapi.devmountain.com/api/tasks').then( tasks => {
          let selectedTask = tasks.data.filter( item => item.id === parseInt(id));

          console.log('selected:', selectedTask)
          let newState = {
            toDoList: tasks.data,
            selectedTask: selectedTask
          }
          return newState;
      })
  }
}