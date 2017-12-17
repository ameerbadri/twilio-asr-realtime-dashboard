var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';


export const styles = theme => ({
  root: {
    flex: '1 1 auto'
  },
  line: {
    display: 'block',
    borderColor: theme.palette.line.stepper
  },
  rootVertical: {
    marginLeft: 12, // half icon
    padding: `0 0 ${theme.spacing.unit}px`
  },
  lineHorizontal: {
    borderTopStyle: 'solid',
    borderTopWidth: 1
  },
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24
  },
  alternativeLabelRoot: {
    position: 'absolute',
    top: theme.spacing.unit + 4,
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)'
  },
  alternativeLabelLine: {
    marginLeft: 0
  }
});

/**
 * @ignore - internal component.
 */
function StepConnector(props) {
  const { alternativeLabel, className: classNameProp, classes, orientation } = props,
        other = _objectWithoutProperties(props, ['alternativeLabel', 'className', 'classes', 'orientation']);

  const className = classNames({
    [classes.root]: !alternativeLabel,
    [classes.rootVertical]: orientation === 'vertical',
    [classes.alternativeLabelRoot]: alternativeLabel
  }, classNameProp);
  const lineClassName = classNames(classes.line, {
    [classes.lineHorizontal]: orientation === 'horizontal',
    [classes.lineVertical]: orientation === 'vertical',
    [classes.alternativeLabelLine]: alternativeLabel
  });

  return React.createElement(
    'div',
    _extends({ className: className }, other),
    React.createElement('span', { className: lineClassName })
  );
}

StepConnector.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal'
};

export default withStyles(styles)(StepConnector);