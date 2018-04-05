import React, { Component } from 'react';

class AddToDoContainer extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  updateNewToDo = (target) => {
    this.setState({
      newToDo: target.value,
    })
  }
  render() {
    return (
      <div>
        <h1>TO-DO:</h1>
        <input className={this.props.newToDo !== '' ? 'green-border' : 'red-border'} value={this.props.newToDo} onChange={(e) => this.props.updateNewToDo(e.target)} ></input>
        <button onClick={this.props.addNewToDo}>Add new To-do</button>
      </div>
    );
  }
}

export default AddToDoContainer;
