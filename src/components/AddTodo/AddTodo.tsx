import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { observer } from 'mobx-react';
import { AddTodoState } from './AddTodoState';
import classes from './AddTodo.module.scss';

export interface IAddTodoProps {
  onAdd: (value: string) => void;
}

@observer
export class AddTodo extends React.Component<IAddTodoProps> {
  private addTodoState = new AddTodoState();

  private onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { name } = this.addTodoState;
    name.onChange(e.target.value);
  };

  private onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const name = await this.addTodoState.onSubmit();
    name && this.props.onAdd(name);
  };

  render() {
    const { name, form } = this.addTodoState;
    return (
      <form className={classes.root} onSubmit={this.onSubmit}>
        <div className={classes.inputBlock}>
          <input
            className={classes.input}
            type="text"
            value={name.value}
            onChange={this.onChange}
          />
          <button type="submit">add</button>
          <div className={classes.error}>{form.error}</div>
        </div>
      </form>
    );
  }
}
