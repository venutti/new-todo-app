const LOCAL_STORAGE_LISTS_KEY = "tasks.list";
const LOCAL_STORAGE_SELECTED_LIST_KEY = "tasks.selected";

export default class Storage {
  static saveList(data) {
    localStorage.setItem(LOCAL_STORAGE_LISTS_KEY, JSON.stringify(data));
  }

  static saveSelected(id) {
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_KEY, JSON.stringify(id));
  }

  static loadList() {
    const data = localStorage.getItem(LOCAL_STORAGE_LISTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static loadSelected() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_KEY));
  }
}
