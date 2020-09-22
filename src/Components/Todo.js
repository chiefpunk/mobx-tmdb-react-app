import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ClearIcon from '../cancel.svg';

@inject('TodoStore')
@observer class Todo extends Component {
  state = {
   typeInput: 'Add',
 };
 handleDropDownChange = event => {
    this.setState({
       typeInput: event.target.value,
    });
  };

  createNew = e => {
    if(e.which === 13 && e.target.value.length > 0){
      this.props.TodoStore.createTodo(e.target.value);
      e.target.value = "";
    }
  }
  handleFilter(e){
    this.props.TodoStore.filter = e.target.value;
  }
  toggleComplete(todo){
    return todo.completed = !todo.completed;
  }
  render() {

    const {todos, filter, filteredTodo, clearCompleted, completedTodosCount, allTodosCount} = this.props.TodoStore;
    const { anchorEl } = this.state;

    const renderTodo = filteredTodo.map(todo => (
      <div>
      <FormControlLabel control={
            <Checkbox
              checked={todo.completed}
              onChange={() => this.toggleComplete(todo)}
              value={todo.value}
            />
          }
          label={todo.value}
        />
      </div>
    ))

    return (
      <div className="Todo">
          <h1>ReactJS Todo App using MobX</h1>
          <div className="Todo-form">
            {
              this.state.typeInput === 'Add' ?
              <TextField id="todo-box" variant="outlined" onKeyPress={this.createNew} placeholder={'Create a todo'} width={65}/> :
              <TextField id="todo-filter"  variant="outlined" value={filter} onChange={this.handleFilter.bind(this)}  placeholder={'Search for a todo'}/>
            }
            <FormControl variant="outlined" >
              <InputLabel ref={ref => {this.InputLabelRef = ref;}} htmlFor="outlined-type-input" width={80}>Type</InputLabel>
              <Select value={this.state.typeInput} onChange={this.handleDropDownChange} input={<OutlinedInput labelWidth={40} name="typeInput" id="outlined-type-input"/>}>
                <MenuItem value={'Add'}>Type : Add</MenuItem>
                <MenuItem value={'Search'}>Type : Search</MenuItem>
             </Select>
            </FormControl>
          </div>
          <ol>
            {renderTodo}
          </ol>
          <div className="Todo-actions">
            <div className="Todo-clear" onClick={clearCompleted}>
              <Button variant="contained" color="default">
                <img src={ClearIcon} />
              </Button>
              <p>Clear Completed tasks</p>
            </div>
            <p>Task status : {completedTodosCount} / {allTodosCount} </p>
          </div>
      </div>
    )
  }
}

export default Todo;
