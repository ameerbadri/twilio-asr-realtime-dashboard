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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Orientation = require('./Stepper').babelPluginFlowReactPropTypes_proptype_Orientation || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
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
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: require('prop-types').bool,

  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: require('prop-types').bool,

  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * @ignore
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: require('prop-types').bool,

  /**
   * @ignore
   * Passed down from Stepper if alternativeLabel is also set.
   */
  connector: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element),

  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: require('prop-types').bool,

  /**
   * @ignore
   * Used internally for numbering.
   */
  index: require('prop-types').number,

  /**
   * @ignore
   */
  last: require('prop-types').bool,

  /**
   * Define this step as optional.
   */
  optional: require('prop-types').bool,

  /**
   * @ignore
   */
  orientation: typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation)
};


function Step(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      connector = props.connector,
      disabled = props.disabled,
      index = props.index,
      last = props.last,
      orientation = props.orientation,
      optional = props.optional,
      other = (0, _objectWithoutProperties3.default)(props, ['active', 'alternativeLabel', 'children', 'classes', 'className', 'completed', 'connector', 'disabled', 'index', 'last', 'orientation', 'optional']);


  var className = (0, _classnames2.default)(classes.root, classes[orientation], (0, _defineProperty3.default)({}, classes.alternativeLabel, alternativeLabel), classNameProp);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    _react2.default.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, (0, _extends3.default)({
        active: active,
        alternativeLabel: alternativeLabel,
        completed: completed,
        disabled: disabled,
        icon: index + 1,
        last: last,
        orientation: orientation,
        optional: optional
      }, child.props));
    }),
    connector && alternativeLabel && !last && _react2.default.cloneElement(connector, { orientation: orientation, alternativeLabel: alternativeLabel })
  );
}

Step.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  active: require('prop-types').bool.isRequired,
  completed: require('prop-types').bool.isRequired,
  classes: require('prop-types').object.isRequired,
  disabled: require('prop-types').bool.isRequired,
  optional: require('prop-types').bool.isRequired
}, (0, _defineProperty3.default)(_ref, 'active', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'alternativeLabel', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'children', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)), (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'completed', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'connector', typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element)), (0, _defineProperty3.default)(_ref, 'disabled', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'index', require('prop-types').number), (0, _defineProperty3.default)(_ref, 'last', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'optional', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'orientation', typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation)), _ref) : {};
Step.defaultProps = {
  active: false,
  completed: false,
  disabled: false,
  optional: false
};

exports.default = (0, _withStyles2.default)(styles)(Step);