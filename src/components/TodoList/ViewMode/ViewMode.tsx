import React, { ChangeEventHandler } from 'react';
import { observer } from 'mobx-react';
import { TCurrentView } from '../TodoListState';
import classes from './ViewMode.module.scss';

const options = [
  {
    label: 'Completed',
    value: TCurrentView.completed,
  },
  {
    label: 'Active',
    value: TCurrentView.active,
  },
  {
    label: 'All',
    value: TCurrentView.all,
  },
];

export interface IViewModeProps {
  currentView: TCurrentView;
  onChange: (value: TCurrentView) => void;
}

@observer
export class ViewMode extends React.Component<IViewModeProps> {
  private handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { onChange } = this.props;
    onChange(parseInt(e.target.value));
  };

  render() {
    const { currentView } = this.props;
    return (
      <div>
        {options.map(o => (
          <label className={classes.label} key={o.value}>
            <input
              type="radio"
              checked={currentView === o.value}
              value={o.value}
              onChange={this.handleChange}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    );
  }
}
