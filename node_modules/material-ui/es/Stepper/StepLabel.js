var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from './StepIcon';


export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  horizontal: {},
  vertical: {},
  active: {
    fontWeight: 500
  },
  completed: {
    fontWeight: 500
  },
  disabled: {
    cursor: 'default'
  },
  iconContainer: {},
  iconContainerNoAlternative: {
    paddingRight: theme.spacing.unit
  },
  alternativeLabelRoot: {
    flexDirection: 'column'
  },
  alternativeLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
  }
});

function StepLabel(props) {
  const {
    active,
    children,
    classes,
    className: classNameProp,
    completed,
    disabled,
    icon,
    orientation,
    alternativeLabel,
    last,
    optional
  } = props,
        other = _objectWithoutProperties(props, ['active', 'children', 'classes', 'className', 'completed', 'disabled', 'icon', 'orientation', 'alternativeLabel', 'last', 'optional']);

  const className = classNames(classes.root, classes[orientation], {
    [classes.disabled]: disabled,
    [classes.completed]: completed,
    [classes.alternativeLabelRoot]: alternativeLabel,
    classNameProp
  });
  const labelClassName = classNames({
    [classes.alternativeLabel]: alternativeLabel,
    [classes.completed]: completed,
    [classes.active]: active
  });

  return React.createElement(
    'div',
    _extends({ className: className }, other),
    icon && React.createElement(
      'div',
      {
        className: classNames(classes.iconContainer, {
          [classes.iconContainerNoAlternative]: !alternativeLabel
        })
      },
      React.createElement(StepIcon, {
        completed: completed,
        active: active,
        icon: icon,
        alternativeLabel: alternativeLabel
      })
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        Typography,
        { type: 'body1', className: labelClassName },
        children
      ),
      optional && React.createElement(
        Typography,
        { type: 'caption', className: classes.optional },
        'Optional'
      )
    )
  );
}

StepLabel.defaultProps = {
  active: false,
  alternativeLabel: false,
  completed: false,
  disabled: false,
  last: false,
  optional: false,
  orientation: 'horizontal'
};

StepLabel.muiName = 'StepLabel';

export default withStyles(styles)(StepLabel);