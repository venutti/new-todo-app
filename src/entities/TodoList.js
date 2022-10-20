import Todo from "./Todo.js";

export default class TodoList {
  static from(data) {
    const todoList = new TodoList(data.name, data.id);
    data.todoList.forEach((todoData) => {
      todoList.todoList.push(Todo.from(todoData));
    });
    return todoList;
  }

  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.todoList = [];
  }

  addTodo(todoName, todoId) {
    const newTodo = new Todo(todoName, todoId);
    this.todoList.push(newTodo);
  }

  removeTodo(todoId) {
    this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
  }

  find(todoId) {
    return this.todoList.find((todo) => todo.id === todoId);
  }

  toggleCompleteTodo(todoId) {
    this.find(todoId).toggleComplete();
  }

  getData() {
    return {
      name: this.name,
      id: this.id,
      todoList: this.todoList.map((todo) => todo.getData()),
    };
  }
}
