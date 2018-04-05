import React, { Component } from 'react';
import './../App.css'
import AddToDoContainer from './AddToDoContainer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNew, save, complete, deleteTask, get } from './../redux/reducer';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      toDoList: [],
      newToDo: '',
      nextId: 0,
      selectedToDo: '',
    }
  }
  componentDidMount() {
    this.props.get();
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
        <div key={item.id} className={`list-item ${item.completed ? 'completed-task' : 'incomplete-task'}`}>
          <Link to={`/task/${item.id}`}>
            <div className='item-title'>{item.title}</div>
            <button disabled >{item.completed ? 'Completed' : 'Incomplete'}</button>
          </Link>
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

    this.props.save(selectedItem.id, selectedItem);
    this.setState({
      selectedToDo: {title: '', description: ''},
    })

  }

  completeSelectedToDo = () => {
    // PUT - https://practiceapi.devmountain.com/api/tasks/:id
    this.props.complete(this.state.selectedToDo.id);
    this.setState({
      selectedToDo: {title: '', description: ''},
    })
  }

  deleteSelectedToDo = () => {
    this.props.deleteTask(this.state.selectedToDo.id);
    this.setState({
      selectedToDo: {title: '', description: ''},
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
      <div className="App">
        <AddToDoContainer newToDo={this.state.newToDo} updateNewToDo={this.updateNewToDo} addNewToDo={this.addNewToDo}/>
        <div className='to-do-list'>
          <h1>List</h1>
          {list}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ state: state });

export default connect( mapStateToProps, { addNew, save, complete, deleteTask, get })(Home);
