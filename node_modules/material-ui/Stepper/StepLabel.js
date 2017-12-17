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

var _Typography = require('../Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _StepIcon = require('./StepIcon');

var _StepIcon2 = _interopRequireDefault(_StepIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Orientation = require('./Stepper').babelPluginFlowReactPropTypes_proptype_Orientation || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Icon = require('./StepButton').babelPluginFlowReactPropTypes_proptype_Icon || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
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
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * @ignore
   * Sets the step as active. Is passed to child components.
   */
  active: require('prop-types').bool,

  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: require('prop-types').bool,

  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired,

  /**
   * Custom styles for component.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * @ignore
   * Mark the step as completed. Is passed to child components.
   */
  completed: require('prop-types').bool,

  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled: require('prop-types').bool,

  /**
   * The icon displayed by the step label - if not set will be set by Step component.
   */
  icon: typeof babelPluginFlowReactPropTypes_proptype_Icon === 'function' ? babelPluginFlowReactPropTypes_proptype_Icon : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Icon),

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
  orientation: typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation)
};


function StepLabel(props) {
  var _classNames, _classNames2;

  var active = props.active,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      disabled = props.disabled,
      icon = props.icon,
      orientation = props.orientation,
      alternativeLabel = props.alternativeLabel,
      last = props.last,
      optional = props.optional,
      other = (0, _objectWithoutProperties3.default)(props, ['active', 'children', 'classes', 'className', 'completed', 'disabled', 'icon', 'orientation', 'alternativeLabel', 'last', 'optional']);


  var className = (0, _classnames2.default)(classes.root, classes[orientation], (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.completed, completed), (0, _defineProperty3.default)(_classNames, classes.alternativeLabelRoot, alternativeLabel), (0, _defineProperty3.default)(_classNames, 'classNameProp', classNameProp), _classNames));
  var labelClassName = (0, _classnames2.default)((_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.alternativeLabel, alternativeLabel), (0, _defineProperty3.default)(_classNames2, classes.completed, completed), (0, _defineProperty3.default)(_classNames2, classes.active, active), _classNames2));

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    icon && _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(classes.iconContainer, (0, _defineProperty3.default)({}, classes.iconContainerNoAlternative, !alternativeLabel))
      },
      _react2.default.createElement(_StepIcon2.default, {
        completed: completed,
        active: active,
        icon: icon,
        alternativeLabel: alternativeLabel
      })
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _Typography2.default,
        { type: 'body1', className: labelClassName },
        children
      ),
      optional && _react2.default.createElement(
        _Typography2.default,
        { type: 'caption', className: classes.optional },
        'Optional'
      )
    )
  );
}

StepLabel.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  active: require('prop-types').bool.isRequired,
  alternativeLabel: require('prop-types').bool.isRequired,
  classes: require('prop-types').object.isRequired,
  completed: require('prop-types').bool.isRequired,
  disabled: require('prop-types').bool.isRequired,
  icon: typeof babelPluginFlowReactPropTypes_proptype_Icon === 'function' ? babelPluginFlowReactPropTypes_proptype_Icon.isRequired ? babelPluginFlowReactPropTypes_proptype_Icon.isRequired : babelPluginFlowReactPropTypes_proptype_Icon : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Icon).isRequired,
  last: require('prop-types').bool.isRequired,
  orientation: typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation.isRequired ? babelPluginFlowReactPropTypes_proptype_Orientation.isRequired : babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation).isRequired
}, (0, _defineProperty3.default)(_ref, 'active', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'alternativeLabel', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'children', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired), (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'completed', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'disabled', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'icon', typeof babelPluginFlowReactPropTypes_proptype_Icon === 'function' ? babelPluginFlowReactPropTypes_proptype_Icon : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Icon)), (0, _defineProperty3.default)(_ref, 'last', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'optional', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'orientation', typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation)), _ref) : {};
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

exports.default = (0, _withStyles2.default)(styles)(StepLabel);