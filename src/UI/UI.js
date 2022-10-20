import Lists from "../entities/Lists.js";
import Storage from "../storage/Storage.js";

const listContainer = document.querySelector("[data-lists]");
const tasksContainer = document.querySelector("[data-tasks]");

const todoListContainer = document.querySelector("[data-todo-list]");
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");

const addListForm = document.querySelector("[data-add-list-form]");
const addListInput = document.querySelector("[data-add-list-input]");
const addTodoForm = document.querySelector("[data-add-todo-form]");
const addTodoInput = document.querySelector("[data-add-todo-input]");

const deleteListButton = document.querySelector("[data-delete-list-button]");
const deleteCompletedButton = document.querySelector(
  "[data-delete-completed-button]"
);

let lists;
let selectedListId;

export default class UI {
  static renderPage() {
    UI.load();
    UI.addEventListeners();
    UI.render();
  }

  static renderAndSave() {
    UI.render();
    UI.save();
  }

  static addEventListeners() {
    addListForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const listName = addListInput.value;
      if (!listName) return;
      addListInput.value = null;
      const listId = Date.now().toString();
      lists.addList(listName, listId);
      UI.renderAndSave();
    });

    listContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "li") {
        selectedListId = e.target.dataset.id;
        UI.renderAndSave();
      }
    });

    deleteListButton.addEventListener("click", () => {
      if (!selectedListId) return;
      lists.removeList(selectedListId);
      selectedListId = "";
      this.renderAndSave();
    });

    addTodoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const todoName = addTodoInput.value;
      if (!todoName) return;
      addTodoInput.value = null;
      const todoId = Date.now().toString();
      lists.addTodo(selectedListId, todoName, todoId);
      UI.renderAndSave();
    });

    tasksContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "input") {
        lists.toggleCompleteTodo(selectedListId, e.target.id);
        UI.renderAndSave();
      }
    });

    deleteCompletedButton.addEventListener("click", () => {
      lists.deleteCompleted(selectedListId);
      UI.renderAndSave();
    });
  }

  static load() {
    lists = Lists.from(Storage.loadList());
    selectedListId = Storage.loadSelected();
  }

  static save() {
    Storage.saveList(lists.getData());
    Storage.saveSelected(selectedListId);
  }

  static render() {
    UI.clearElement(listContainer);
    lists.lists.forEach((listData) => {
      UI.renderList(listData);
    });
    if (!selectedListId) {
      todoListContainer.style.display = "none";
    } else {
      todoListContainer.style.display = "";
      UI.renderTasks(lists.find(selectedListId));
    }
  }

  static clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  static renderList(list) {
    const listElement = document.createElement("li");
    listElement.classList.add("list-name");
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listElement.innerText = list.name;
    listElement.dataset.id = list.id;
    listContainer.appendChild(listElement);
  }

  static renderTasks(list) {
    listTitleElement.innerText = list.name;
    listCountElement.innerText = UI.formatCount(list);
    UI.clearElement(tasksContainer);
    list.todoList.forEach((todo) => UI.renderTask(todo));
  }

  static renderTask(todo) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `<input type="checkbox" id="${todo.id}">
    <label for="${todo.id}">
    <span class="custom-checkbox"></span>
    ${todo.name}
    </label>`;
    if (todo.isCompleted()) taskElement.querySelector("input").checked = true;
    tasksContainer.appendChild(taskElement);
  }

  static formatCount(list) {
    const taskCount = list.countIncomplete();
    const taskString = taskCount === 1 ? "tarea" : "tareas";
    const taskRemainingString = taskCount === 1 ? "restante" : "restantes";
    return `${taskCount} ${taskString} ${taskRemainingString}`;
  }
}
