var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import warning from 'warning';
import classNames from 'classnames';
import Collapse from '../transitions/Collapse';

import withStyles from '../styles/withStyles';


export const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    marginLeft: 12, // half icon
    paddingLeft: theme.spacing.unit + 12, // margin + half icon
    paddingRight: theme.spacing.unit,
    borderLeft: `1px solid ${theme.palette.line.stepper}`
  },
  last: {
    borderLeft: 'none'
  },
  transition: {}
});

function StepContent(props) {
  const {
    active,
    alternativeLabel,
    children,
    className: classNameProp,
    classes,
    completed,
    last,
    transition: Transition,
    transitionDuration,
    orientation,
    optional
  } = props,
        other = _objectWithoutProperties(props, ['active', 'alternativeLabel', 'children', 'className', 'classes', 'completed', 'last', 'transition', 'transitionDuration', 'orientation', 'optional']);

  warning(orientation === 'vertical', 'Material-UI: <StepContent /> is only designed for use with the vertical stepper.');

  const className = classNames(classes.root, {
    [classes.last]: last
  }, classNameProp);

  return React.createElement(
    'div',
    _extends({ className: className }, other),
    React.createElement(
      Transition,
      {
        'in': active,
        className: classes.transition,
        transitionDuration: transitionDuration,
        unmountOnExit: true
      },
      children
    )
  );
}

StepContent.defaultProps = {
  transition: Collapse,
  transitionDuration: 'auto'
};

export default withStyles(styles)(StepContent);