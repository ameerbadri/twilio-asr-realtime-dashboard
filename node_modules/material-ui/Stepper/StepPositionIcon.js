'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _SvgIcon = require('../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Icon = require('./StepButton').babelPluginFlowReactPropTypes_proptype_Icon || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
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
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Whether this step is active.
   */
  active: require('prop-types').bool,

  /**
   * Classses for component style customizations.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * The step position as a number.
   */
  position: typeof babelPluginFlowReactPropTypes_proptype_Icon === 'function' ? babelPluginFlowReactPropTypes_proptype_Icon : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Icon)
};

var _ref = _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' });

/**
 * @ignore - internal component.
 */
function StepPositionIcon(props) {
  var position = props.position,
      classes = props.classes,
      classNameProp = props.className,
      active = props.active;

  var className = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.active, active), classNameProp);

  return _react2.default.createElement(
    _SvgIcon2.default,
    { className: className },
    _ref,
    _react2.default.createElement(
      'text',
      { className: classes.text, x: '12', y: '16', textAnchor: 'middle' },
      position
    )
  );
}

StepPositionIcon.propTypes = process.env.NODE_ENV !== "production" ? (_ref2 = {
  classes: require('prop-types').object.isRequired,
  active: require('prop-types').bool
}, (0, _defineProperty3.default)(_ref2, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref2, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref2, 'position', typeof babelPluginFlowReactPropTypes_proptype_Icon === 'function' ? babelPluginFlowReactPropTypes_proptype_Icon : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Icon)), _ref2) : {};
exports.default = (0, _withStyles2.default)(styles)(StepPositionIcon);