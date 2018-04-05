import React, { Component } from 'react';
import './../App.css'
import AddToDoContainer from './AddToDoContainer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { addNew, save, complete, deleteTask, getTask } from './../redux/reducer';

class Detailed extends Component {
  constructor() {
    super();
    this.state = {
      toDoList: [],
      selectedToDo: {},
    }
  }
  componentDidMount() {
    this.props.getTask(this.props.match.params.id).then( tasks => {
      console.log('tasks: ', tasks)
      this.setState({
        selectedToDo: tasks.value.selectedTask[0]
      })
    });
  }

  updateNewToDo = (target) => {
    this.setState({
      newToDo: target.value,
    })
  }

  addNewToDo = () => {
    if(this.state.newToDo) {
      this.props.addNew({title: this.state.newToDo});
      this.setState({
        newToDo: ''
      })
    }
  }

  getToDoList = () => {
    let list = this.props.state.toDoList.map( item => {
      return (
        <div key={item.id} className={`list-item ${item.completed ? 'completed-task' : 'incomplete-task'}`} onClick={() => this.selectToDo(item.id)}>
          <div className='item-title'>{item.title}</div>
          <button disabled >{item.completed ? 'Completed' : 'Incomplete'}</button>
        </div>
      )
    })
    return list;
  }

  selectToDo = (id) => {
    let listCopy = this.props.state.toDoList;
    let selectedItem = listCopy.find( item => item.id === id);
    this.setState({
      selectedToDo: selectedItem
    })
  }

  updateSelectedToDo = (val, prop) => {
    let selectedItem = Object.assign({}, this.state.selectedToDo);
    selectedItem[prop] = val;
    this.setState({
      selectedToDo: selectedItem,
    })
  }

  saveSelectedToDo = () => {
    const selectedItem = Object.assign({}, this.state.selectedToDo);

    this.props.save(selectedItem.id, selectedItem).then( response => {
      window.location = '/';
    });
  }

  completeSelectedToDo = () => {
    // PUT - https://practiceapi.devmountain.com/api/tasks/:id
    this.props.complete(this.state.selectedToDo.id).then( response => {
      window.location = '/';
    })
  }

  deleteSelectedToDo = () => {
    this.props.deleteTask(this.state.selectedToDo.id).then( repsonse => {
      window.location = '/';
    })
  }
  
  cancelSelectedToDo = () => {
    this.setState({
      selectedToDo: {title: '', description: ''},
    })
  }

  render() {
    const list = this.getToDoList();
    return (
      <div>
        <Link to='/'>{'<-Back to home'}</Link>
        <div>
          <h3>Task</h3>
          <input value={this.state.selectedToDo.title} onChange={(e) => this.updateSelectedToDo(e.target.value, 'title')}></input>
          <button onClick={this.completeSelectedToDo}>Complete</button>
        </div>
        <div>
          <h3>Description</h3>
          <input value={this.state.selectedToDo.description} onChange={(e) => this.updateSelectedToDo(e.target.value, 'description')}></input>
        </div>
        <div>
          <button onClick={this.saveSelectedToDo}>Save</button>
          <button onClick={this.cancelSelectedToDo}>Cancel</button>
          <button onClick={this.deleteSelectedToDo}>Delete</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ state: state });

export default connect( mapStateToProps, { addNew, save, complete, deleteTask, getTask })(Detailed);
