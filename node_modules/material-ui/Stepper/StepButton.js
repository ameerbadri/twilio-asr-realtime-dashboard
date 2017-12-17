'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;
// @inheritedComponent ButtonBase

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ButtonBase = require('../ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

var _StepLabel = require('./StepLabel');

var _StepLabel2 = _interopRequireDefault(_StepLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Orientation = require('./Stepper').babelPluginFlowReactPropTypes_proptype_Orientation || require('prop-types').any;

var isLabel = function isLabel(child) {
  return child && _react.Children.count(child) === 1 && child.type && child.type.muiName && child.type.muiName === 'StepLabel';
};

var styles = exports.styles = function styles() {
  return {
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
  };
};

var babelPluginFlowReactPropTypes_proptype_Icon = require('prop-types').oneOfType([typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element), require('prop-types').string, require('prop-types').number]);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * @ignore
   * Passed in via `Step` - passed through to `StepLabel`.
   */
  active: require('prop-types').bool,

  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: require('prop-types').bool,

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired,

  /**
   * @ignore
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * @ignore
   * Sets completed styling. Is passed to StepLabel.
   */
  completed: require('prop-types').bool,

  /**
   * @ignore
   * Disables the button and sets disabled styling. Is passed to StepLabel.
   */
  disabled: require('prop-types').bool,

  /**
   * The icon displayed by the step label.
   */
  icon: require('prop-types').oneOfType([typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element), require('prop-types').string, require('prop-types').number]),

  /**
   * @ignore
   */
  last: require('prop-types').bool,

  /**
   * @ignore
   */
  optional: require('prop-types').bool,

  /**
   * @ignore
   */
  orientation: typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation.isRequired ? babelPluginFlowReactPropTypes_proptype_Orientation.isRequired : babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation).isRequired
};


function StepButton(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classNameProp = props.className,
      completed = props.completed,
      classes = props.classes,
      disabled = props.disabled,
      icon = props.icon,
      last = props.last,
      optional = props.optional,
      orientation = props.orientation,
      other = (0, _objectWithoutProperties3.default)(props, ['active', 'alternativeLabel', 'children', 'className', 'completed', 'classes', 'disabled', 'icon', 'last', 'optional', 'orientation']);


  var className = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.alternativeLabel, alternativeLabel), classNameProp);
  var childProps = {
    active: active,
    alternativeLabel: alternativeLabel,
    completed: completed,
    disabled: disabled,
    icon: icon,
    optional: optional,
    orientation: orientation
  };
  var child = isLabel(children) ? _react2.default.cloneElement(children, childProps) : _react2.default.createElement(
    _StepLabel2.default,
    childProps,
    children
  );

  return _react2.default.createElement(
    _ButtonBase2.default,
    (0, _extends3.default)({ disabled: disabled, className: className }, other),
    child
  );
}

StepButton.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  active: require('prop-types').bool,
  alternativeLabel: require('prop-types').bool,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'completed', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'disabled', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'icon', require('prop-types').oneOfType([typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element), require('prop-types').string, require('prop-types').number])), (0, _defineProperty3.default)(_ref, 'last', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'optional', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'orientation', typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation.isRequired ? babelPluginFlowReactPropTypes_proptype_Orientation.isRequired : babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation).isRequired), _ref) : {};
exports.default = (0, _withStyles2.default)(styles)(StepButton);