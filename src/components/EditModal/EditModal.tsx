import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';
import { computed as c } from 'mobx';
import { EditModalState } from './EditModalState';
import classes from './EditModal.module.scss';

export interface IEditModalProps {
  name: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

@observer
export class EditModal extends React.Component<IEditModalProps> {
  private editModalState = new EditModalState(this.props.name);

  private onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { name } = this.editModalState;
    name.onChange(e.target.value);
  };

  private onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const name = await this.editModalState.onSubmit();
    name && onSubmit(name);
  };

  @c private get form() {
    const { onClose } = this.props;
    const { name, form } = this.editModalState;
    return (
      <div className={classes.root}>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <h3 className={classes.title}>Edit todo name</h3>
          <div className={classes.inputBlock}>
            <textarea
              className={classes.textarea}
              value={name.value}
              onChange={this.onChange}
            />
            <div className={classes.error}>{form.error}</div>
          </div>
          <div className={classes.buttonsBlock}>
            <button type="submit">Ok</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return createPortal(this.form, document.body);
  }
}
