import { action as a } from 'mobx';
import { TodoListState } from 'components/TodoList';
import { ITodoItem } from 'components/TodoItem';

export class AppState {
  public todoList = new TodoListState();

  @a public addTodo = (value: string) => {
    const newTodo: ITodoItem = {
      id: Date.now().toString(),
      name: value,
      completed: false,
    };
    this.todoList.addTodo(newTodo);
  };
}
