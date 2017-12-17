'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERS_URI = 'https://ers.twilio.com';
var ERS_PATH = '/v1/registrations';

var NotificationConfig = function () {
  function NotificationConfig(token, options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, NotificationConfig);

    options = (options || {}).Notification || {};
    var uri = options.ersUri || ERS_URI;

    (0, _defineProperties2.default)(this, {
      _registrarUri: { value: uri + ERS_PATH },
      _token: { value: token, writable: true },

      registrarUri: { get: function get() {
          return _this._registrarUri;
        } },
      token: { get: function get() {
          return _this._token;
        } }
    });
  }

  (0, _createClass3.default)(NotificationConfig, [{
    key: 'updateToken',
    value: function updateToken(token) {
      this._token = token;
    }
  }]);
  return NotificationConfig;
}();

exports.default = NotificationConfig;
module.exports = exports['default'];