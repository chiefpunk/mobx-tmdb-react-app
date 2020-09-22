import { observable, action, reaction, autorun, computed } from 'mobx';
import Todo from './Todo';

export class TodoStore {
    @observable todos = [];
    @observable filter = "";

    @computed get filteredTodo(){
      var matchesFilter = new RegExp(this.filter, "i");
      return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
    }
    @computed get completedTodosCount() {
    	return this.todos.filter(
			todo => todo.completed === true
		  ).length;
    }
    @computed get allTodosCount() {
    	return this.todos.length;
    }
    createTodo(value){
      this.todos.push(new Todo(value));
    }
    clearCompleted = () => {
      return this.todos = this.todos.filter(
			     todo => !todo.completed
		  )
    }
}
var todoStore = window.store = new TodoStore;

export default new TodoStore();

autorun(() => {
  console.log(TodoStore);
})
