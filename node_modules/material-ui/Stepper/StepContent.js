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

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Collapse = require('../transitions/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_TransitionDuration = require('../transitions/Collapse').babelPluginFlowReactPropTypes_proptype_TransitionDuration || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Orientation = require('./Stepper').babelPluginFlowReactPropTypes_proptype_Orientation || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      marginTop: theme.spacing.unit,
      marginLeft: 12, // half icon
      paddingLeft: theme.spacing.unit + 12, // margin + half icon
      paddingRight: theme.spacing.unit,
      borderLeft: '1px solid ' + theme.palette.line.stepper
    },
    last: {
      borderLeft: 'none'
    },
    transition: {}
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * @ignore
   * Expands the content.
   */
  active: require('prop-types').bool,

  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: require('prop-types').bool,

  /**
   * Step content.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired,

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
   */
  completed: require('prop-types').bool,

  /**
   * @ignore
   */
  last: require('prop-types').bool,

  /**
   * @ignore
   * Set internally by Step when it's supplied with the optional property.
   */
  optional: require('prop-types').bool,

  /**
   * @ignore
   */
  orientation: typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation),

  /**
   * Collapse component.
   */
  transition: require('prop-types').func,

  /**
   * Adjust the duration of the content expand transition.
   * Passed as a property to the transition component.
   */
  transitionDuration: typeof babelPluginFlowReactPropTypes_proptype_TransitionDuration === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionDuration.isRequired ? babelPluginFlowReactPropTypes_proptype_TransitionDuration.isRequired : babelPluginFlowReactPropTypes_proptype_TransitionDuration : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionDuration).isRequired
};


function StepContent(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classNameProp = props.className,
      classes = props.classes,
      completed = props.completed,
      last = props.last,
      Transition = props.transition,
      transitionDuration = props.transitionDuration,
      orientation = props.orientation,
      optional = props.optional,
      other = (0, _objectWithoutProperties3.default)(props, ['active', 'alternativeLabel', 'children', 'className', 'classes', 'completed', 'last', 'transition', 'transitionDuration', 'orientation', 'optional']);


  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(orientation === 'vertical', 'Material-UI: <StepContent /> is only designed for use with the vertical stepper.') : void 0;

  var className = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.last, last), classNameProp);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    _react2.default.createElement(
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

StepContent.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  transition: require('prop-types').func.isRequired,
  transitionDuration: typeof babelPluginFlowReactPropTypes_proptype_TransitionDuration === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionDuration.isRequired ? babelPluginFlowReactPropTypes_proptype_TransitionDuration.isRequired : babelPluginFlowReactPropTypes_proptype_TransitionDuration : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionDuration).isRequired,
  active: require('prop-types').bool,
  alternativeLabel: require('prop-types').bool,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'completed', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'last', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'optional', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'orientation', typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation)), (0, _defineProperty3.default)(_ref, 'transition', require('prop-types').func), (0, _defineProperty3.default)(_ref, 'transitionDuration', typeof babelPluginFlowReactPropTypes_proptype_TransitionDuration === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionDuration.isRequired ? babelPluginFlowReactPropTypes_proptype_TransitionDuration.isRequired : babelPluginFlowReactPropTypes_proptype_TransitionDuration : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionDuration).isRequired), _ref) : {};
StepContent.defaultProps = {
  transition: _Collapse2.default,
  transitionDuration: 'auto'
};

exports.default = (0, _withStyles2.default)(styles)(StepContent);