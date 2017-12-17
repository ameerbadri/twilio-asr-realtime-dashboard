var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';


export const styles = theme => ({
  root: {},
  horizontal: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: 0
    },
    '&:last-child': {
      paddingRight: 0
    }
  },
  alternativeLabel: {
    flex: 1,
    position: 'relative',
    marginLeft: 0
  }
});

function Step(props) {
  const {
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    connector,
    disabled,
    index,
    last,
    orientation,
    optional
  } = props,
        other = _objectWithoutProperties(props, ['active', 'alternativeLabel', 'children', 'classes', 'className', 'completed', 'connector', 'disabled', 'index', 'last', 'orientation', 'optional']);

  const className = classNames(classes.root, classes[orientation], {
    [classes.alternativeLabel]: alternativeLabel
  }, classNameProp);

  return React.createElement(
    'div',
    _extends({ className: className }, other),
    React.Children.map(children, child => React.cloneElement(child, _extends({
      active,
      alternativeLabel,
      completed,
      disabled,
      icon: index + 1,
      last,
      orientation,
      optional
    }, child.props))),
    connector && alternativeLabel && !last && React.cloneElement(connector, { orientation, alternativeLabel })
  );
}

Step.defaultProps = {
  active: false,
  completed: false,
  disabled: false,
  optional: false
};

export default withStyles(styles)(Step);