import React from 'react';
import { observer } from 'mobx-react';
import { action as a } from 'mobx';
import { TodoItem } from 'components/TodoItem';
import { TodoListState, TCurrentView } from './TodoListState';
import { ViewMode } from './ViewMode';
import classes from './TodoList.module.scss';

export interface ITodoListProps {
  todoListState: TodoListState;
}

@observer
export class TodoList extends React.Component<ITodoListProps> {
  @a private setCurrentView = (value: TCurrentView) => {
    const { todoListState } = this.props;
    todoListState.currentView = value;
  };

  render() {
    const { todoListState } = this.props;
    const { todos, removeTodo, currentView } = todoListState;
    return (
      <div className={classes.root}>
        <div>
          {todos.map(t => (
            <TodoItem todo={t} key={t.value.id} onDelete={removeTodo} />
          ))}
        </div>
        <div className={classes.viewMode}>
          <ViewMode currentView={currentView} onChange={this.setCurrentView} />
        </div>
      </div>
    );
  }
}
