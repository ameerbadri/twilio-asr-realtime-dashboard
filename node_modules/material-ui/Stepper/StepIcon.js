'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CheckCircle = require('../svg-icons/CheckCircle');

var _CheckCircle2 = _interopRequireDefault(_CheckCircle);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _StepPositionIcon = require('./StepPositionIcon');

var _StepPositionIcon2 = _interopRequireDefault(_StepPositionIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Icon = require('./StepButton').babelPluginFlowReactPropTypes_proptype_Icon || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'block'
    },
    completed: {
      fill: theme.palette.primary[500]
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: require('prop-types').bool,

  /**
   * The icon displayed by the step label.
   */
  icon: typeof babelPluginFlowReactPropTypes_proptype_Icon === 'function' ? babelPluginFlowReactPropTypes_proptype_Icon : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Icon)
};


/**
 * @ignore - internal component.
 */
function StepIcon(props) {
  var completed = props.completed,
      icon = props.icon,
      active = props.active,
      classes = props.classes;


  if (typeof icon === 'number' || typeof icon === 'string') {
    if (completed) {
      return _react2.default.createElement(_CheckCircle2.default, { className: (0, _classnames2.default)(classes.root, classes.completed) });
    }
    return _react2.default.createElement(_StepPositionIcon2.default, { className: classes.root, position: icon, active: active });
  }

  return icon;
}

StepIcon.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  active: require('prop-types').bool
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'completed', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'icon', typeof babelPluginFlowReactPropTypes_proptype_Icon === 'function' ? babelPluginFlowReactPropTypes_proptype_Icon : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Icon)), _ref) : {};
exports.default = (0, _withStyles2.default)(styles)(StepIcon);