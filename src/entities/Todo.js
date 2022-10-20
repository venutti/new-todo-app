export default class Todo {
  static from(data) {
    const todo = new Todo(data.name, data.id);
    todo.completed = data.completed;
    return todo;
  }

  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.completed = false;
  }

  isCompleted() {
    return this.completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  getData() {
    return {
      name: this.name,
      id: this.id,
      completed: this.completed,
    };
  }
}
