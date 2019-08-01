import React, { ChangeEventHandler } from 'react';
import { observer } from 'mobx-react';
import { TodoItemState } from './TodoItemState';
import { EditModal } from 'components/EditModal';
import classNames from 'classnames';
import classes from './TodoItem.module.scss';

export interface ITodoItemProps {
  todo: TodoItemState;
  onDelete: (id: string) => void;
}

@observer
export class TodoItem extends React.Component<ITodoItemProps> {
  private handleCompletedChange: ChangeEventHandler<HTMLInputElement> = e => {
    const {
      todo: { editCompleted },
    } = this.props;
    editCompleted(e.target.checked);
  };

  private handleDelete = () => {
    const { onDelete, todo } = this.props;
    onDelete(todo.value.id);
  };

  private get editModal() {
    const { todo } = this.props;
    if (!todo.isEditMode) return null;
    return (
      <EditModal
        name={todo.value.name}
        onSubmit={this.handleSubmitEditName}
        onClose={this.closeEditModal}
      />
    );
  }

  private handleSubmitEditName = (name: string) => {
    const { todo } = this.props;
    todo.editName(name);
    this.closeEditModal();
  };

  private closeEditModal = () => {
    const { todo } = this.props;
    todo.setIsEditMode(false);
  };
  private openEditModal = () => {
    const { todo } = this.props;
    todo.setIsEditMode();
  };

  render() {
    const { todo } = this.props;
    const { name, completed } = todo.value;
    return (
      <div className={classes.root}>
        <input
          className={classes.chackbox}
          type="checkbox"
          checked={completed}
          onChange={this.handleCompletedChange}
        />
        <div
          onClick={this.openEditModal}
          className={classNames(
            classes.name,
            completed && classes.completedName
          )}>
          {name}
        </div>
        <button onClick={this.handleDelete}>del</button>
        {this.editModal}
      </div>
    );
  }
}
