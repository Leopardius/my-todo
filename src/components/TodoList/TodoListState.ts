import { action as a, observable as o, computed as c } from 'mobx';
import { ITodoItem, TodoItemState } from 'components/TodoItem';

export enum TCurrentView {
  completed,
  active,
  all,
}

export class TodoListState {
  @o public currentView: TCurrentView = TCurrentView.all;
  @o private _todos: TodoItemState[] = [];

  @c
  public get todos(): TodoItemState[] {
    switch (this.currentView) {
      case TCurrentView.active:
        return this.activeTodos;
      case TCurrentView.completed:
        return this.completedTodos;
      default:
        return this._todos;
    }
  }

  @c
  public get completedTodos() {
    return this._todos.filter(t => t.value.completed);
  }
  @c
  public get activeTodos() {
    return this._todos.filter(t => !t.value.completed);
  }

  @a public setTodos(todos: ITodoItem[]) {
    this._todos = todos.map(t => new TodoItemState(t));
  }

  @a
  public addTodo = (todo: ITodoItem) => {
    this._todos.push(new TodoItemState(todo));
  };
  @a
  public removeTodo = (id: string): boolean => {
    const index = this._todos.findIndex(todo => todo.value.id === id);
    if (index === -1) return false;
    this._todos.splice(index, 1);
    return true;
  };
}
