import { action as a, observable as o } from 'mobx';

export interface ITodoItem {
  id: string;
  name: string;
  completed: boolean;
}

export class TodoItemState {
  @o public value: ITodoItem;
  @o public isEditMode: boolean = false;

  constructor(value: ITodoItem) {
    this.value = value;
  }

  @a public editName = (name: string) => {
    this.value.name = name;
  };
  @a public editCompleted = (completed: boolean) => {
    this.value.completed = completed;
  };
}
