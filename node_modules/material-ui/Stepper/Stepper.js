'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;
// @inheritedComponent Paper

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _StepConnector = require('./StepConnector');

var _StepConnector2 = _interopRequireDefault(_StepConnector);

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_ChildrenArray = require('react').babelPluginFlowReactPropTypes_proptype_ChildrenArray || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
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
  };
};

var babelPluginFlowReactPropTypes_proptype_Orientation = require('prop-types').oneOf(['horizontal', 'vertical']);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Set the active step (zero based index).
   */
  activeStep: require('prop-types').number,

  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel: require('prop-types').bool,

  /**
   * Two or more `<Step />` components.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired : babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray).isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * A component to be placed between each step.
   */
  connector: require('prop-types').oneOfType([typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element), typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)]),

  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear: require('prop-types').bool,

  /**
   * The stepper orientation (layout flow direction).
   */
  orientation: require('prop-types').oneOf(['horizontal', 'vertical'])
};


function Stepper(props) {
  var activeStep = props.activeStep,
      alternativeLabel = props.alternativeLabel,
      classes = props.classes,
      classNameProp = props.className,
      children = props.children,
      connectorProp = props.connector,
      nonLinear = props.nonLinear,
      orientation = props.orientation,
      other = (0, _objectWithoutProperties3.default)(props, ['activeStep', 'alternativeLabel', 'classes', 'className', 'children', 'connector', 'nonLinear', 'orientation']);


  var className = (0, _classnames2.default)(classes.root, classNameProp, alternativeLabel ? null : classes[orientation]);

  var connector = connectorProp ? _react2.default.cloneElement(connectorProp, { orientation: orientation }) : null;
  var childrenArray = _react.Children.toArray(children);
  var steps = childrenArray.map(function (step, index) {
    var controlProps = {
      index: index,
      orientation: orientation,
      active: false,
      completed: false,
      disabled: false,
      last: index + 1 === childrenArray.length,
      alternativeLabel: alternativeLabel,
      connector: connectorProp
    };

    if (activeStep === index) {
      controlProps.active = true;
    } else if (!nonLinear && activeStep > index) {
      controlProps.completed = true;
    } else if (!nonLinear && activeStep < index) {
      controlProps.disabled = true;
    }

    return [!alternativeLabel && connector && index > 0 && _react2.default.cloneElement(connector, {
      key: 'connect-' + (index - 1) + '-to-' + index // eslint-disable-line react/no-array-index-key
    }), _react2.default.cloneElement(step, (0, _extends3.default)({}, controlProps, step.props))];
  });

  return _react2.default.createElement(
    _Paper2.default,
    (0, _extends3.default)({ square: true, elevation: 0, className: className }, other),
    steps
  );
}

Stepper.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  activeStep: require('prop-types').number.isRequired,
  alternativeLabel: require('prop-types').bool.isRequired,
  classes: require('prop-types').object.isRequired,
  connector: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired,
  nonLinear: require('prop-types').bool.isRequired,
  orientation: require('prop-types').oneOf(['horizontal', 'vertical']).isRequired
}, (0, _defineProperty3.default)(_ref, 'activeStep', require('prop-types').number), (0, _defineProperty3.default)(_ref, 'alternativeLabel', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'children', typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired : babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray).isRequired), (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'connector', require('prop-types').oneOfType([typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element), typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)])), (0, _defineProperty3.default)(_ref, 'nonLinear', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'orientation', require('prop-types').oneOf(['horizontal', 'vertical'])), _ref) : {};
Stepper.defaultProps = {
  activeStep: 0,
  alternativeLabel: false,
  connector: _react2.default.createElement(_StepConnector2.default, null),
  nonLinear: false,
  orientation: 'horizontal'
};

Stepper.muiName = 'Stepper';

exports.default = (0, _withStyles2.default)(styles)(Stepper);