'use strict';

var Buffer = global.Buffer || require('buffer').Buffer;
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var Promise = global.Promise || require('es6-promise').Promise;

/**
 * Construct an {@link AccessManager} from an initial Access Token.
 * @class
 * @classdesc An {@link AccessManager} manages everything necessary for a
 *   Twilio Client to access Twilio. Namely, the {@link AccessManager} manages
 *   Access Tokens, and raises Access Token expiration events in the form of
 *   {@link AccessManager#event:tokenExpired}.
 * @param {string} initialToken - The initial Access Token
 * @property {?string} identity - The identity granted by the current Access
 *   Token; this value is populated asynchronously and is initially null
 * @property {string} token - The current Access Token
 * @property {boolean} isExpired - Whether or not the current Access Token is
 *   expired
 * @property {?Date} expires - The time at which he current Access Token
 *   expires; this value is populated asynchronously and is initially null
 * @fires AccessManager#error
 * @fires AccessManager#tokenExpired
 * @fires AccessManager#tokenWillExpire
 * @fires AccessManager#tokenUpdated
 */
function AccessManager(initialToken) {
  if (!(this instanceof AccessManager)) {
    return new AccessManager(initialToken);
  }
  EventEmitter.call(this);
  var expires = null;
  var identity = null;
  var isExpired = false;
  var pendingUpdate = null;
  var token = initialToken;
  var tokenWillExpireTimer = null;
  var tokenExpiredTimer = null;
  var tokenUpdatedTimer = null;
  var tokenPayload = null;
  Object.defineProperties(this, {
    _expires: {
      get: function() {
        return expires;
      },
      set: function(_expires) {
        expires = _expires;
      }
    },
    _identity: {
      get: function() {
        return identity;
      },
      set: function(_identity) {
        identity = _identity;
      }
    },
    _isExpired: {
      get: function() {
        return isExpired;
      },
      set: function(_isExpired) {
        isExpired = _isExpired;
      }
    },
    _pendingUpdate: {
      get: function() {
        return pendingUpdate;
      },
      set: function(_pendingUpdate) {
        pendingUpdate = _pendingUpdate;
      }
    },
    _token: {
      get: function() {
        return token;
      },
      set: function(_token) {
        token = _token;
      }
    },
    _tokenExpiredTimer: {
      get: function() {
        return tokenExpiredTimer;
      },
      set: function(_tokenExpiredTimer) {
        tokenExpiredTimer = _tokenExpiredTimer;
      }
    },
    _tokenWillExpireTimer: {
      get: function() {
        return tokenWillExpireTimer;
      },
      set: function(_tokenWillExpireTimer) {
        tokenWillExpireTimer = _tokenWillExpireTimer;
      }
    },
    _tokenUpdatedTimer: {
      get: function() {
        return tokenUpdatedTimer;
      },
      set: function(_tokenUpdatedTimer) {
        tokenUpdatedTimer = _tokenUpdatedTimer;
      }
    },
    _tokenPayload: {
      get: function() {
        return tokenPayload;
      },
      set: function(_tokenPayload) {
        tokenPayload = _tokenPayload;
      }
    },
    expires: {
      enumerable: true,
      get: function() {
        return expires;
      }
    },
    identity: {
      enumerable: true,
      get: function() {
        return identity;
      }
    },
    isExpired: {
      enumerable: true,
      get: function() {
        return isExpired;
      }
    },
    token: {
      enumerable: true,
      get: function() {
        return token;
      }
    }
  });
  var _pendingUpdate = this.updateToken(initialToken);
  _pendingUpdate.catch(function(error) {
    if (this._pendingUpdate === _pendingUpdate) {
      this.emit('error', error);
    }
  }.bind(this));
}

inherits(AccessManager, EventEmitter);

/**
 * Update the {@link AccessManager}'s current Access Token.
 * @param {string} newToken - A new Access Token
 * @returns {Promise<this>}
 * @fires AccessManager#tokenUpdated
 */
AccessManager.prototype.updateToken = function updateToken(newToken) {
  var self = this;

  var pendingUpdate = new Promise(function(resolve) {

    var payload = parsePayload(newToken);

    // Set the identity.
    self._identity = getIdentity(payload);

    // Emit the tokenUpdated event after the Promise resolves.
    clearTimeout(self._tokenUpdatedTimer);
    self._tokenUpdatedTimer = setTimeout(function tokenUpdated() {
      self._tokenUpdatedTimer = null;
      self.emit('tokenUpdated', self);
    });

    // Set expires, isExpired, tokenExpired and tokenWillExpire timers.
    self._expires = new Date(payload.exp * 1000);
    self._isExpired = Date.now() >= self.expires;

    clearTimeout(self._tokenWillExpireTimer);
    self._tokenWillExpireTimer = setTimeout(function tokenWillExpireTimer() {
      self._tokenWillExpireTimer = null;
      self.emit('tokenWillExpire', self);
    }, self.expires - Date.now() - 3 * 60 * 1000); // 3 minutes before expiration
    // Negative timeout for setTimeout is fine and means "almost now"

    clearTimeout(self._tokenExpiredTimer);
    self._tokenExpiredTimer = setTimeout(function tokenExpiredTimer() {
      self._isExpired = true;
      self._tokenExpiredTimer = null;
      self.emit('tokenExpired', self);
    }, self.expires - Date.now());

    // Update the token and tokenPayload.
    self._token = newToken;
    self._tokenPayload = payload;

    resolve(self);
  });

  this._pendingUpdate = pendingUpdate;

  return pendingUpdate;
};

/**
 * Parse the payload of a JSON Web Token (JWT).
 * @private
 * @param {string} jwt
 * @returns {object}
 */
function parsePayload(jwt) {
  var segments = jwt.split('.');
  if (segments.length !== 3) {
    throw new Error('Token is invalid or malformed');
  }
  var encodedPayloadString = segments[1];
  var payloadString = decodeBase64URL(encodedPayloadString);
  var payload = JSON.parse(payloadString);
  return payload;
}

/**
 * Decode a base64url-encoded string.
 * @private
 * @param {string} encoded
 * @returns {string}
 */
function decodeBase64URL(encoded) {
  var remainder = encoded.length % 4;
  if (remainder > 0) {
    var padlen = 4 - remainder;
    encoded += new Array(padlen + 1).join('=');
  }
  encoded = encoded.replace(/-/g, '+')
                   .replace(/_/g, '/');
  return decodeBase64(encoded);
}

/**
 * Decode a base64-encoded string.
 * @private
 * @param {string} encoded
 * @returns {string}
 */
function decodeBase64(encoded) {
  return new Buffer(encoded, 'base64').toString();
}

/**
 * Get the identity from the payload of an Access Token.
 * @private
 * @param {object} payload
 * @returns {?string}
 */
function getIdentity(payload) {
  var identity = null;
  if (!payload.grants && payload.scope) {
    identity = getIdentityFromCapabilityTokenScope(payload.scope);
  } else if (payload.grants instanceof Array) {
    identity = getIdentityFromSATGrants(payload.grants);
  } else if (typeof payload.grants === 'object') {
    identity = getIdentityFromFPAGrants(payload.grants);
  }
  return identity;
}

/**
 * Get the identity from a Capability Token's Scope.
 * @private
 * @param {String} scope
 * @returns {?string}
 */
// TODO(rrowland): Remove this function as soon as we move to FPA.
function getIdentityFromCapabilityTokenScope(scope) {
  var match = decodeURIComponent(scope).match(/identity=(.*?)(&|$)/i);
  return match && decodeURIComponent(match[1]);
}

/**
 * Get the identity from Scoped Access Token (SAT) grants.
 * @private
 * @param {Array<Object>} grants
 * @returns {?string}
 */
// TODO(mroberts): Remove this function as soon as we move to FPA.
function getIdentityFromSATGrants(grants) {
  var identity = null;
  for (var i = 0; i < grants.length; i++) {
    var grant = grants[i];
    if (grant && typeof grant.res === 'string') {
      var match = grant.res.match(/^sip:(.*)@/);
      if (match) {
        identity = decodeURIComponent(match[1]);
        break;
      }
    }
  }
  return identity;
}

/**
 * Get the identity from First-Person Access Token (FPA) grants.
 * @private
 * @param {object} grants
 * @returns {?string}
 */
function getIdentityFromFPAGrants(grants) {
  return grants.identity || null;
}

/**
 * An error occurred.
 * @param {Error} error
 * @event AccessManager#error
 */

/**
 * The Access Token expired.
 * @param {AccessManager} manager
 * @event AccessManager#tokenExpired
 */

/**
 * The Access Token will expire in 3 minutes
 * (or less if token TTL is less then 3 minutes).
 * @param {AccessManager} manager
 * @event AccessManager#tokenWillExpire
 */

/**
 * The Access Token was updated.
 * @param {AccessManager} manager
 * @event AccessManager#tokenUpdated
 */

module.exports = AccessManager;
