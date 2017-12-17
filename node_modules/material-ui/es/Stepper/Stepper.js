var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Paper

import React, { Children } from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import StepConnector from './StepConnector';
import Step from './Step';

export const styles = theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing.unit * 3
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  vertical: {
    flexDirection: 'column'
  }
});

function Stepper(props) {
  const {
    activeStep,
    alternativeLabel,
    classes,
    className: classNameProp,
    children,
    connector: connectorProp,
    nonLinear,
    orientation
  } = props,
        other = _objectWithoutProperties(props, ['activeStep', 'alternativeLabel', 'classes', 'className', 'children', 'connector', 'nonLinear', 'orientation']);

  const className = classNames(classes.root, classNameProp, alternativeLabel ? null : classes[orientation]);

  const connector = connectorProp ? React.cloneElement(connectorProp, { orientation }) : null;
  const childrenArray = Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const controlProps = {
      index,
      orientation,
      active: false,
      completed: false,
      disabled: false,
      last: index + 1 === childrenArray.length,
      alternativeLabel,
      connector: connectorProp
    };

    if (activeStep === index) {
      controlProps.active = true;
    } else if (!nonLinear && activeStep > index) {
      controlProps.completed = true;
    } else if (!nonLinear && activeStep < index) {
      controlProps.disabled = true;
    }

    return [!alternativeLabel && connector && index > 0 && React.cloneElement(connector, {
      key: `connect-${index - 1}-to-${index}` // eslint-disable-line react/no-array-index-key
    }), React.cloneElement(step, _extends({}, controlProps, step.props))];
  });

  return React.createElement(
    Paper,
    _extends({ square: true, elevation: 0, className: className }, other),
    steps
  );
}

Stepper.defaultProps = {
  activeStep: 0,
  alternativeLabel: false,
  connector: React.createElement(StepConnector, null),
  nonLinear: false,
  orientation: 'horizontal'
};

Stepper.muiName = 'Stepper';

export default withStyles(styles)(Stepper);