var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent ButtonBase

import React, { Children } from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import StepLabel from './StepLabel';


const isLabel = child => child && Children.count(child) === 1 && child.type && child.type.muiName && child.type.muiName === 'StepLabel';

export const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    background: 'none'
  },
  alternativeLabel: {
    margin: '0 auto'
  }
});

function StepButton(props) {
  const {
    active,
    alternativeLabel,
    children,
    className: classNameProp,
    completed,
    classes,
    disabled,
    icon,
    last,
    optional,
    orientation
  } = props,
        other = _objectWithoutProperties(props, ['active', 'alternativeLabel', 'children', 'className', 'completed', 'classes', 'disabled', 'icon', 'last', 'optional', 'orientation']);

  const className = classNames(classes.root, {
    [classes.alternativeLabel]: alternativeLabel
  }, classNameProp);
  const childProps = {
    active,
    alternativeLabel,
    completed,
    disabled,
    icon,
    optional,
    orientation
  };
  const child = isLabel(children) ? React.cloneElement(children, childProps) : React.createElement(
    StepLabel,
    childProps,
    children
  );

  return React.createElement(
    ButtonBase,
    _extends({ disabled: disabled, className: className }, other),
    child
  );
}

export default withStyles(styles)(StepButton);