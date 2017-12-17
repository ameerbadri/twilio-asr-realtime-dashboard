import React from 'react';
import classNames from 'classnames';
import CheckCircle from '../svg-icons/CheckCircle';
import withStyles from '../styles/withStyles';
import StepPositionIcon from './StepPositionIcon';


export const styles = theme => ({
  root: {
    display: 'block'
  },
  completed: {
    fill: theme.palette.primary[500]
  }
});

/**
 * @ignore - internal component.
 */
function StepIcon(props) {
  const { completed, icon, active, classes } = props;

  if (typeof icon === 'number' || typeof icon === 'string') {
    if (completed) {
      return React.createElement(CheckCircle, { className: classNames(classes.root, classes.completed) });
    }
    return React.createElement(StepPositionIcon, { className: classes.root, position: icon, active: active });
  }

  return icon;
}

export default withStyles(styles)(StepIcon);