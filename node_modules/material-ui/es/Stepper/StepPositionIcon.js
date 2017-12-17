import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import SvgIcon from '../SvgIcon';


export const styles = theme => ({
  root: {
    fill: theme.palette.action.disabled
  },
  active: {
    fill: theme.palette.primary[500]
  },
  text: {
    fill: theme.palette.getContrastText(theme.palette.primary[500]),
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily
  }
});

/**
 * @ignore - internal component.
 */
function StepPositionIcon(props) {
  const { position, classes, className: classNameProp, active } = props;
  const className = classNames(classes.root, {
    [classes.active]: active
  }, classNameProp);

  return React.createElement(
    SvgIcon,
    { className: className },
    React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    React.createElement(
      'text',
      { className: classes.text, x: '12', y: '16', textAnchor: 'middle' },
      position
    )
  );
}

export default withStyles(styles)(StepPositionIcon);