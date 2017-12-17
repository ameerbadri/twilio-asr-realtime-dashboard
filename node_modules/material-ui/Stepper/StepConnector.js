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

var babelPluginFlowReactPropTypes_proptype_Orientation = require('./Stepper').babelPluginFlowReactPropTypes_proptype_Orientation || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      flex: '1 1 auto'
    },
    line: {
      display: 'block',
      borderColor: theme.palette.line.stepper
    },
    rootVertical: {
      marginLeft: 12, // half icon
      padding: '0 0 ' + theme.spacing.unit + 'px'
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
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: require('prop-types').bool,

  /**
   * Useful to extend the style applied to the component.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * @ignore
   */
  orientation: typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation)
};


/**
 * @ignore - internal component.
 */
function StepConnector(props) {
  var _classNames, _classNames2;

  var alternativeLabel = props.alternativeLabel,
      classNameProp = props.className,
      classes = props.classes,
      orientation = props.orientation,
      other = (0, _objectWithoutProperties3.default)(props, ['alternativeLabel', 'className', 'classes', 'orientation']);


  var className = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.root, !alternativeLabel), (0, _defineProperty3.default)(_classNames, classes.rootVertical, orientation === 'vertical'), (0, _defineProperty3.default)(_classNames, classes.alternativeLabelRoot, alternativeLabel), _classNames), classNameProp);
  var lineClassName = (0, _classnames2.default)(classes.line, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.lineHorizontal, orientation === 'horizontal'), (0, _defineProperty3.default)(_classNames2, classes.lineVertical, orientation === 'vertical'), (0, _defineProperty3.default)(_classNames2, classes.alternativeLabelLine, alternativeLabel), _classNames2));

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    _react2.default.createElement('span', { className: lineClassName })
  );
}

StepConnector.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  alternativeLabel: require('prop-types').bool.isRequired,
  classes: require('prop-types').object.isRequired,
  orientation: typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation.isRequired ? babelPluginFlowReactPropTypes_proptype_Orientation.isRequired : babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation).isRequired
}, (0, _defineProperty3.default)(_ref, 'alternativeLabel', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'orientation', typeof babelPluginFlowReactPropTypes_proptype_Orientation === 'function' ? babelPluginFlowReactPropTypes_proptype_Orientation : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Orientation)), _ref) : {};
StepConnector.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal'
};

exports.default = (0, _withStyles2.default)(styles)(StepConnector);