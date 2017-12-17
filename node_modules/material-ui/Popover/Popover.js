'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Grow = require('../transitions/Grow');

var _Grow2 = _interopRequireDefault(_Grow);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;
// @inheritedComponent Modal

var babelPluginFlowReactPropTypes_proptype_TransitionClasses = require('../internal/transition').babelPluginFlowReactPropTypes_proptype_TransitionClasses || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_TransitionCallback = require('../internal/transition').babelPluginFlowReactPropTypes_proptype_TransitionCallback || require('prop-types').any;

function getOffsetTop(rect, vertical) {
  var offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

function getOffsetLeft(rect, horizontal) {
  var offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map(function (n) {
    return typeof n === 'number' ? n + 'px' : n;
  }).join(' ');
}

// Sum the scrollTop between two elements.
function getScrollParent(parent, child) {
  var element = child;
  var scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentNode;
    scrollTop += element.scrollTop;
  }
  return scrollTop;
}

var styles = exports.styles = {
  paper: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 32px)',
    '&:focus': {
      outline: 'none'
    }
  }
};

var babelPluginFlowReactPropTypes_proptype_Origin = {
  horizontal: require('prop-types').oneOfType([require('prop-types').oneOf(['left']), require('prop-types').oneOf(['center']), require('prop-types').oneOf(['right']), require('prop-types').number]).isRequired,
  vertical: require('prop-types').oneOfType([require('prop-types').oneOf(['top']), require('prop-types').oneOf(['center']), require('prop-types').oneOf(['bottom']), require('prop-types').number]).isRequired
};
var babelPluginFlowReactPropTypes_proptype_Position = {
  top: require('prop-types').number.isRequired,
  left: require('prop-types').number.isRequired
};
var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * This is the DOM element that may be used
   * to set the position of the popover.
   */
  anchorEl: typeof HTMLElement === 'function' ? require('prop-types').instanceOf(HTMLElement) : require('prop-types').any,

  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition: require('prop-types').shape({
    top: require('prop-types').number.isRequired,
    left: require('prop-types').number.isRequired
  }),

  /*
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference: require('prop-types').oneOf(['anchorEl', 'anchorPosition']),

  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin: require('prop-types').shape({
    horizontal: require('prop-types').oneOfType([require('prop-types').oneOf(['left']), require('prop-types').oneOf(['center']), require('prop-types').oneOf(['right']), require('prop-types').number]).isRequired,
    vertical: require('prop-types').oneOfType([require('prop-types').oneOf(['top']), require('prop-types').oneOf(['center']), require('prop-types').oneOf(['bottom']), require('prop-types').number]).isRequired
  }),

  /**
   * The content of the component.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * The elevation of the popover.
   */
  elevation: require('prop-types').number,

  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` property.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl: require('prop-types').func,

  /**
   * Specifies how close to the edge of the window the popover can appear.
   */
  marginThreshold: require('prop-types').number,

  /**
   * Callback fired before the component is entering.
   */
  onEnter: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * Callback fired when the component is entering.
   */
  onEntering: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * Callback fired when the component has entered.
   */
  onEntered: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * Callback fired before the component is exiting.
   */
  onExit: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * Callback fired when the component is exiting.
   */
  onExiting: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * Callback fired when the component has exited.
   */
  onExited: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onRequestClose: require('prop-types').func,

  /**
   * If `true`, the popover is visible.
   */
  open: require('prop-types').bool.isRequired,

  /**
   * Properties applied to the `Paper` element.
   */
  PaperProps: require('prop-types').object,

  /**
   * @ignore
   */
  role: require('prop-types').string,

  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin: require('prop-types').shape({
    horizontal: require('prop-types').oneOfType([require('prop-types').oneOf(['left']), require('prop-types').oneOf(['center']), require('prop-types').oneOf(['right']), require('prop-types').number]).isRequired,
    vertical: require('prop-types').oneOfType([require('prop-types').oneOf(['top']), require('prop-types').oneOf(['center']), require('prop-types').oneOf(['bottom']), require('prop-types').number]).isRequired
  }),

  /**
   * The animation classNames applied to the component as it enters or exits.
   * This property is a direct binding to [`CSSTransition.classNames`](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames).
   */
  transitionClasses: typeof babelPluginFlowReactPropTypes_proptype_TransitionClasses === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionClasses : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionClasses),

  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: require('prop-types').oneOfType([require('prop-types').number, require('prop-types').shape({
    enter: require('prop-types').number,
    exit: require('prop-types').number
  }), require('prop-types').oneOf(['auto'])])
};

var Popover = function (_React$Component) {
  (0, _inherits3.default)(Popover, _React$Component);

  function Popover() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Popover);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Popover.__proto__ || (0, _getPrototypeOf2.default)(Popover)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillUnmount = function () {
      _this.handleResize.cancel();
    }, _this.setPositioningStyles = function (element) {
      if (element && element.style) {
        var positioning = _this.getPositioningStyle(element);

        element.style.top = positioning.top;
        element.style.left = positioning.left;
        element.style.transformOrigin = positioning.transformOrigin;
      }
    }, _this.getPositioningStyle = function (element) {
      var marginThreshold = _this.props.marginThreshold;

      // Check if the parent has requested anchoring on an inner content node

      var contentAnchorOffset = _this.getContentAnchorOffset(element);
      // Get the offset of of the anchoring element
      var anchorOffset = _this.getAnchorOffset(contentAnchorOffset);

      var elemRect = {
        width: element.clientWidth,
        height: element.clientHeight
      };
      // Get the transform origin point on the element itself
      var transformOrigin = _this.getTransformOrigin(elemRect, contentAnchorOffset);

      // Calculate element positioning
      var top = anchorOffset.top - transformOrigin.vertical;
      var left = anchorOffset.left - transformOrigin.horizontal;
      var bottom = top + elemRect.height;
      var right = left + elemRect.width;

      // Window thresholds taking required margin into account
      var heightThreshold = window.innerHeight - marginThreshold;
      var widthThreshold = window.innerWidth - marginThreshold;

      // Check if the vertical axis needs shifting
      if (top < marginThreshold) {
        var diff = top - marginThreshold;
        top -= diff;
        transformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        var _diff = bottom - heightThreshold;
        top -= _diff;
        transformOrigin.vertical += _diff;
      }

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(elemRect.height < heightThreshold || !elemRect.height || !heightThreshold, ['Material-UI: the popover component is too tall.', 'Some part of it can not be seen on the screen (' + (elemRect.height - heightThreshold) + 'px).', 'Please consider adding a `max-height` to improve the user-experience.'].join('\n')) : void 0;

      // Check if the horizontal axis needs shifting
      if (left < marginThreshold) {
        var _diff2 = left - marginThreshold;
        left -= _diff2;
        transformOrigin.horizontal += _diff2;
      } else if (right > widthThreshold) {
        var _diff3 = right - widthThreshold;
        left -= _diff3;
        transformOrigin.horizontal += _diff3;
      }

      return {
        top: top + 'px',
        left: left + 'px',
        transformOrigin: getTransformOriginValue(transformOrigin)
      };
    }, _this.transitionEl = undefined, _this.handleGetOffsetTop = getOffsetTop, _this.handleGetOffsetLeft = getOffsetLeft, _this.handleEnter = function (element) {
      if (_this.props.onEnter) {
        _this.props.onEnter(element);
      }

      _this.setPositioningStyles(element);
    }, _this.handleResize = (0, _debounce2.default)(function () {
      var element = _reactDom2.default.findDOMNode(_this.transitionEl);
      _this.setPositioningStyles(element);
    }, 166), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Popover, [{
    key: 'getAnchorOffset',


    // Returns the top/left offset of the position
    // to attach to on the anchor element (or body if none is provided)
    value: function getAnchorOffset(contentAnchorOffset) {
      // $FlowFixMe
      var _props = this.props,
          anchorEl = _props.anchorEl,
          anchorOrigin = _props.anchorOrigin,
          anchorReference = _props.anchorReference,
          anchorPosition = _props.anchorPosition;


      if (anchorReference === 'anchorPosition') {
        return anchorPosition;
      }

      var anchorElement = anchorEl || document.body;
      var anchorRect = anchorElement.getBoundingClientRect();
      var anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

      return {
        top: anchorRect.top + this.handleGetOffsetTop(anchorRect, anchorVertical),
        left: anchorRect.left + this.handleGetOffsetLeft(anchorRect, anchorOrigin.horizontal)
      };
    }

    // Returns the vertical offset of inner content to anchor the transform on if provided

  }, {
    key: 'getContentAnchorOffset',
    value: function getContentAnchorOffset(element) {
      var _props2 = this.props,
          getContentAnchorEl = _props2.getContentAnchorEl,
          anchorReference = _props2.anchorReference;

      var contentAnchorOffset = 0;

      if (getContentAnchorEl && anchorReference === 'anchorEl') {
        var contentAnchorEl = getContentAnchorEl(element);

        if (contentAnchorEl && (0, _contains2.default)(element, contentAnchorEl)) {
          var scrollTop = getScrollParent(element, contentAnchorEl);
          contentAnchorOffset = contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
        }

        // != the default value
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(this.props.anchorOrigin.vertical === 'top', ['Material-UI: you can not change the default `anchorOrigin.vertical` value when also ', 'providing the `getContentAnchorEl` property to the popover component.', 'Only use one of the two properties', 'Set `getContentAnchorEl` to null or left `anchorOrigin.vertical` unchanged'].join()) : void 0;
      }

      return contentAnchorOffset;
    }

    // Return the base transform origin using the element
    // and taking the content anchor offset into account if in use

  }, {
    key: 'getTransformOrigin',
    value: function getTransformOrigin(elemRect) {
      var contentAnchorOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var transformOrigin = this.props.transformOrigin;

      return {
        vertical: this.handleGetOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
        horizontal: this.handleGetOffsetLeft(elemRect, transformOrigin.horizontal)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          anchorEl = _props3.anchorEl,
          anchorReference = _props3.anchorReference,
          anchorPosition = _props3.anchorPosition,
          anchorOrigin = _props3.anchorOrigin,
          children = _props3.children,
          classes = _props3.classes,
          elevation = _props3.elevation,
          getContentAnchorEl = _props3.getContentAnchorEl,
          marginThreshold = _props3.marginThreshold,
          onEnter = _props3.onEnter,
          onEntering = _props3.onEntering,
          onEntered = _props3.onEntered,
          onExit = _props3.onExit,
          onExiting = _props3.onExiting,
          onExited = _props3.onExited,
          open = _props3.open,
          PaperProps = _props3.PaperProps,
          role = _props3.role,
          transformOrigin = _props3.transformOrigin,
          transitionClasses = _props3.transitionClasses,
          transitionDuration = _props3.transitionDuration,
          other = (0, _objectWithoutProperties3.default)(_props3, ['anchorEl', 'anchorReference', 'anchorPosition', 'anchorOrigin', 'children', 'classes', 'elevation', 'getContentAnchorEl', 'marginThreshold', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited', 'open', 'PaperProps', 'role', 'transformOrigin', 'transitionClasses', 'transitionDuration']);


      return _react2.default.createElement(
        _Modal2.default,
        (0, _extends3.default)({ show: open, BackdropInvisible: true }, other),
        _react2.default.createElement(
          _Grow2.default,
          {
            appear: true,
            'in': open,
            onEnter: this.handleEnter,
            onEntering: onEntering,
            onEntered: onEntered,
            onExit: onExit,
            onExiting: onExiting,
            onExited: onExited,
            role: role,
            transitionClasses: transitionClasses,
            timeout: transitionDuration,
            rootRef: function rootRef(node) {
              _this2.transitionEl = node;
            }
          },
          _react2.default.createElement(
            _Paper2.default,
            (0, _extends3.default)({
              className: classes.paper,
              elevation: elevation
            }, PaperProps),
            _react2.default.createElement(_reactEventListener2.default, { target: 'window', onResize: this.handleResize }),
            children
          )
        )
      );
    }
  }]);
  return Popover;
}(_react2.default.Component);

Popover.defaultProps = {
  anchorReference: 'anchorEl',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  transitionDuration: 'auto',
  elevation: 8,
  marginThreshold: 16
};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPopover' })(Popover);