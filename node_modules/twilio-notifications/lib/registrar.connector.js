'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set2 = require('babel-runtime/core-js/set');

var _set3 = _interopRequireDefault(_set2);

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

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

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _javascriptStateMachine = require('javascript-state-machine');

var _javascriptStateMachine2 = _interopRequireDefault(_javascriptStateMachine);

var _backoff = require('backoff');

var _backoff2 = _interopRequireDefault(_backoff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toArray(_set) {
  var arr = [];
  _set.forEach(function (v) {
    return arr.push(v);
  });
  return arr;
}

/**
 * Creates new instance of the ERS registrar
 *
 * @class RegistrarConnector
 * @classdesc Manages the registrations on ERS service.
 * It deduplicates registrations and manages them automatically
 *
 * @param Object configuration
 * @param string notificationId
 * @param string channelType
 * @param Array messageTypes
 */

var RegistrarConnector = function (_EventEmitter) {
  (0, _inherits3.default)(RegistrarConnector, _EventEmitter);

  function RegistrarConnector(context, transport, config, channelType) {
    (0, _classCallCheck3.default)(this, RegistrarConnector);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RegistrarConnector.__proto__ || (0, _getPrototypeOf2.default)(RegistrarConnector)).call(this));

    var fsm = _javascriptStateMachine2.default.create({
      initial: { state: 'unregistered', event: 'init', defer: true },
      events: [{ name: 'userUpdate', from: ['unregistered'], to: 'registering' }, { name: 'userUpdate', from: ['registered'], to: 'unregistering' }, { name: 'registered', from: ['registering', 'retrying'], to: 'registered' }, { name: 'unregistered', from: ['unregistering'], to: 'unregistered' }, { name: 'retry', from: ['retrying'], to: 'retrying' }, { name: 'failure', from: ['registering'], to: 'retrying' }, { name: 'failure', from: ['retrying'], to: 'retrying' }, { name: 'failure', from: ['unregistering'], to: 'unregistered' }],
      callbacks: {
        onregistering: function onregistering(event, from, to, arg) {
          return _this._register(arg);
        },
        onunregistering: function onunregistering() {
          return _this._unregister();
        },
        onregistered: function onregistered() {
          return _this._onRegistered();
        },
        onunregistered: function onunregistered() {
          return _this._onUnregistered();
        },
        onretrying: function onretrying(event, from, to, arg) {
          return _this._initRetry(arg);
        },
        onfailure: function onfailure(event, from, to, arg) {
          if (from === 'retrying') {
            _this._initRetry(arg);
          }
        }
      }
    });

    var backoff = _backoff2.default.exponential({
      randomisationFactor: 0.2,
      initialDelay: 2 * 1000,
      maxDelay: 2 * 60 * 1000
    });

    backoff.on('ready', function () {
      _this._retry();
    });

    (0, _defineProperties2.default)(_this, {
      _transport: { value: transport },
      _context: { value: context },
      _url: { value: config.registrarUri, writable: false },
      _config: { value: config },
      _fsm: { value: fsm },
      _backoff: { value: backoff },
      _channelType: { value: channelType },
      _registrationId: { value: false, writable: true },
      _notificationId: { value: false, writable: true },
      _messageTypes: { value: new _set3.default(), writable: true },
      _pendingUpdate: { value: null, writable: true }
    });

    fsm.init();
    return _this;
  }

  (0, _createClass3.default)(RegistrarConnector, [{
    key: 'setNotificationId',
    value: function setNotificationId(notificationId) {
      if (this._notificationId === notificationId) {
        return;
      }

      this._notificationId = notificationId;
      this._updateRegistration();
    }
  }, {
    key: 'updateToken',
    value: function updateToken() {
      return this._updateRegistration();
    }
  }, {
    key: 'has',
    value: function has(messageType) {
      return this._messageTypes.has(messageType);
    }
  }, {
    key: 'subscribe',
    value: function subscribe(messageType) {
      if (this._messageTypes.has(messageType)) {
        _logger2.default.debug('Message type already registered ', messageType);
        return false;
      }

      this._messageTypes.add(messageType);
      this._updateRegistration();
      return true;
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(messageType) {
      if (!this._messageTypes.has(messageType)) {
        return false;
      }

      this._messageTypes.delete(messageType);

      if (this._messageTypes.size > 0) {
        this._updateRegistration();
      } else {
        this._removeRegistration();
      }
      return true;
    }
  }, {
    key: '_updateRegistration',
    value: function _updateRegistration() {
      if (this._notificationId) {
        this._update(this._notificationId, toArray(this._messageTypes));
      }
    }
  }, {
    key: '_removeRegistration',
    value: function _removeRegistration() {
      if (this._notificationId) {
        this._update(this._notificationId, toArray(this._messageTypes));
      }
    }

    /**
     * Update service registration
     * @param {Array} messageTypes Array of message type names
     * @private
     */

  }, {
    key: '_update',
    value: function _update(notificationId, messageTypes) {
      var regData = { notificationId: notificationId, messageTypes: messageTypes };

      if (this._fsm.is('unregistered')) {
        if (regData.notificationId && regData.messageTypes.length > 0) {
          this._fsm.userUpdate(regData);
        }
      } else if (this._fsm.is('registered')) {
        this._fsm.userUpdate(regData);
        this._setPendingUpdate(regData);
      } else {
        this._setPendingUpdate(regData);
      }
    }
  }, {
    key: '_setPendingUpdate',
    value: function _setPendingUpdate(regData) {
      this._pendingUpdate = regData;
    }
  }, {
    key: '_checkPendingUpdate',
    value: function _checkPendingUpdate() {
      if (!this._pendingUpdate) {
        return;
      }

      var pendingUpdate = this._pendingUpdate;
      this._pendingUpdate = null;

      this._updateRegistration(pendingUpdate.notificationId, pendingUpdate.messageTypes);
    }
  }, {
    key: '_initRetry',
    value: function _initRetry(regData) {
      if (!this._pendingUpdate) {
        this._setPendingUpdate(regData);
      }

      this._backoff.backoff();
    }
  }, {
    key: '_retry',
    value: function _retry() {
      if (!this._pendingUpdate) {
        return;
      }

      var pendingUpdate = this._pendingUpdate;
      this._pendingUpdate = null;

      this._register(pendingUpdate);
    }
  }, {
    key: '_onRegistered',
    value: function _onRegistered() {
      this._backoff.reset();
      this.emit('stateChanged', 'registered');
      this._checkPendingUpdate();
    }
  }, {
    key: '_onUnregistered',
    value: function _onUnregistered() {
      this._backoff.reset();
      this.emit('stateChanged', 'unregistered');
      this._checkPendingUpdate();
    }
  }, {
    key: '_register',
    value: function _register(regData) {
      var _this2 = this;

      /* eslint-disable camelcase */
      var registrarRequest = {
        endpoint_platform: this._context.platform,
        channel_type: this._channelType,
        version: '2',
        message_types: regData.messageTypes,
        data: {},
        ttl: 'PT24H'
      };

      if (this._channelType === 'twilsock') {
        registrarRequest.data.url = regData.notificationId;
      } else {
        registrarRequest.data.registration_id = regData.notificationId;
      }

      var uri = this._url + '?productId=' + this._context.productId;
      var headers = {
        'Content-Type': 'application/json',
        'X-Twilio-Token': this._config.token
      };
      /* eslint-enable camelcase */

      _logger2.default.trace('Creating registration for channel ', this._channelType);
      return this._transport.post(uri, headers, registrarRequest).then(function (response) {
        _this2._registrationId = response.body.id;
        _this2._registrationData = regData;

        _logger2.default.debug('Registration created: ', response);
        _this2._fsm.registered();
      }).catch(function (error) {
        _logger2.default.error('Registration failed: ', error);
        _this2._fsm.failure(regData);
        return error;
      });
    }
  }, {
    key: '_unregister',
    value: function _unregister() {
      var _this3 = this;

      if (!this._registrationId) {
        return _promise2.default.resolve();
      }

      var uri = this._url + '/' + this._registrationId + '?productId=' + this._context.productId;
      var headers = {
        'Content-Type': 'application/json',
        'X-Twilio-Token': this._config.token
      };

      _logger2.default.trace('Removing registration for ', this._channelType);
      return this._transport.delete(uri, headers).then(function () {
        _logger2.default.debug('Registration removed for ', _this3._channelType);
        _this3._registrationId = false;
        _this3._fsm.unregistered();
      }).catch(function (reason) {
        // failure to remove registration since being treated as "unregistered" state
        // because it is indicates that something wrong with server/connection
        _logger2.default.error('Failed to remove of registration ', _this3.channelType, reason);
        _this3._fsm.failure();
        return reason;
      });
    }
  }]);
  return RegistrarConnector;
}(_events2.default);

exports.default = RegistrarConnector;


(0, _freeze2.default)(RegistrarConnector);
module.exports = exports['default'];