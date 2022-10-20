import TodoList from "./TodoList.js";

export default class Lists {
  static from(data) {
    /* data = [{ 
      name: "nameList", 
      id: idList, 
      todoList: [{ 
        name: "nameTodo", 
        id: idTodo 
      }] 
    }] */
    const lists = new Lists();
    data.forEach((list) => {
      lists.lists.push(TodoList.from(list));
    });
    return lists;
  }

  constructor() {
    this.lists = [];
  }

  find(listId) {
    return this.lists.find((list) => list.id === listId);
  }

  addList(listName, listId) {
    const newList = new TodoList(listName, listId);
    this.lists.push(newList);
  }

  removeList(listId) {
    this.lists = this.lists.filter((list) => list.id !== listId);
  }

  addTodo(listId, todoName, todoId) {
    this.find(listId).addTodo(todoName, todoId);
  }

  removeTodo(listId, todoId) {
    this.find(listId).removeTodo(todoId);
  }

  toggleCompleteTodo(listId, todoId) {
    this.find(listId).toggleCompleteTodo(todoId);
  }

  countIncomplete(listId) {
    return this.find(listId).countIncomplete();
  }

  deleteCompleted(listId) {
    this.find(listId).deleteCompleted();
  }

  getData() {
    return this.lists.map((todoList) => todoList.getData());
  }
}
