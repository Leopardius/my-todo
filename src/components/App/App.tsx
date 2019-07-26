import React from 'react';
import { observer } from 'mobx-react';
import { TodoList, initialTodos } from 'components/TodoList';
import { AddTodo } from 'components/AddTodo';
import { AppState } from './AppState';
import classes from './App.module.scss';

export interface IAppProps {}

@observer
export class App extends React.Component<IAppProps> {
  private appState = new AppState();

  constructor(props: IAppProps) {
    super(props);
    this.appState.todoList.setTodos(initialTodos);
  }

  render() {
    const { addTodo, todoList } = this.appState;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <AddTodo onAdd={addTodo} />
          <TodoList todoListState={todoList} />
        </div>
      </div>
    );
  }
}
