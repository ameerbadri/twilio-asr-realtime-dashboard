'use strict';

var AccessManager = require('../lib/accessmanager');
var assert = require('assert');
var twilio = require('twilio');

var config1 = {
  accountSid: 'AC123',
  configurationProfileSid: 'VS123',
  identity: 'アイデンティティ',
  signingKeySid: 'SK123',
  signingKeySecret: 'abc123'
};

var config2 = {
  accountSid: 'AC456',
  configurationProfileSid: 'VS456',
  identity: 'new_identity',
  signingKeySid: 'SK456',
  signingKeySecret: 'xyz456'
};

var config3 = {
  accountSid: 'AC789',
  configurationProfileSid: 'VS789',
  identity: ':-)',
  signingKeySid: 'SK789',
  signingKeySecret: ':-('
};

function generateAccessToken(config, ttl) {
  config = config || config1;
  var accessTokenGenerator = new twilio.AccessToken(
    config.accountSid, config.signingKeySid, config.signingKeySecret, { ttl: ttl });
  accessTokenGenerator.identity = config.identity;
  accessTokenGenerator.addGrant(
    new twilio.AccessToken.ConversationsGrant({
      configurationProfileSid: config.configurationProfileSid
    })
  );
  return accessTokenGenerator.toJwt();
}

describe('AccessManager', function() {

  describe('constructor', function() {

    /**
     * Check the properties of the {@link AccessManager} at construction time.
     * This function allows you to skip some of the tests for functionality
     * that we currently fake synchronously.
     * @param {string} accessToken - An Access Token string
     * @param {boolean} [skip=false] - Whether or not to skip tests
     */
    function constructorTests(accessToken, skip) {

      (skip ? it.skip : it)('should have set ._tokenPayload to null', function() {
        var accessManager = new AccessManager(accessToken);
        assert.equal(null, accessManager._tokenPayload);
      });

      (skip ? it.skip : it)('should have set .expires to null', function() {
        var accessManager = new AccessManager(accessToken);
        assert.equal(null, accessManager.expires);
      });

      (skip ? it.skip : it)('should have set .isExpired to false', function() {
        var accessManager = new AccessManager(accessToken);
        assert.equal(false, accessManager.isExpired);
      });

      (skip ? it.skip : it)('should have set .identity to null', function() {
        var accessManager = new AccessManager(accessToken);
        assert.equal(null, accessManager.identity);
      });

      it('should have set .token to the Access Token', function() {
        var accessManager = new AccessManager(accessToken);
        assert.equal(accessToken, accessManager.token);
      });

    }

    context('when passed an invalid Access Token', function() {

      constructorTests('foo', false);

      it('should emit an "error" event with an instance of Error', function(done) {
        var accessToken = 'foo';
        var accessManager = new AccessManager(accessToken);
        accessManager.on('error', function(error) {
          try {
            assert(error instanceof Error);
          } catch (error) {
            done(error);
            return;
          }
          done();
        });
      });

      context('after emitting the "error" event', function() {

        it('._tokenPayload should still be null', function(done) {
          var accessToken = 'foo';
          var accessManager = new AccessManager(accessToken);
          accessManager.on('error', function() {
            try {
              assert.equal(null, accessManager._tokenPayload);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

        it('.expires should still be null', function(done) {
          var accessToken = 'foo';
          var accessManager = new AccessManager(accessToken);
          accessManager.on('error', function() {
            try {
              assert.equal(null, accessManager.expires);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

        it('.identity should still be null', function(done) {
          var accessToken = 'foo';
          var accessManager = new AccessManager(accessToken);
          accessManager.on('error', function() {
            try {
              assert.equal(null, accessManager.identity);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

        it('.isExpired should still be false', function(done) {
          var accessToken = 'foo';
          var accessManager = new AccessManager(accessToken);
          accessManager.on('error', function() {
            try {
              assert.equal(false, accessManager.isExpired);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

        it('.token should still be the invalid Access Token', function(done) {
          var accessToken = 'foo';
          var accessManager = new AccessManager(accessToken);
          accessManager.on('error', function() {
            try {
              assert.equal(accessToken, accessManager.token);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

      });

    });

    context('when passed a valid, unexpired Access Token', function() {

      constructorTests(generateAccessToken(), true);

      constructorWhenPassedAValidAccessTokenTests(false);

    });

    /**
     * Check the properties of the {@link AccessManager} once the
     * "tokenUpdated" (and optionally "tokenExpired") event(s) have fired
     * at construction time.
     * @param {boolean} [expired=False] - Whether or not to test "tokenExpired"
     */
    function constructorWhenPassedAValidAccessTokenTests(expired) {

      it('should emit a "tokenUpdated" event with the AccessManager', function(done) {
        var accessToken = generateAccessToken(config1, expired ? -1 : undefined);
        var accessManager = new AccessManager(accessToken);
        accessManager.on('tokenUpdated', function(_accessManager) {
          try {
            assert.equal(accessManager, _accessManager);
          } catch (error) {
            done(error);
            return;
          }
          done();
        });
      });

      context('after emitting the "tokenUpdated" event', function() {

        it('should have set ._tokenPayload to an Object', function(done) {
          var accessToken = generateAccessToken(config1, expired ? -1 : undefined);
          var accessManager = new AccessManager(accessToken);
          accessManager.on('tokenUpdated', function() {
            try {
              assert(accessManager._tokenPayload instanceof Object);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

        it('should have set .identity to the identity string', function(done) {
          var accessToken = generateAccessToken(config1, expired ? -1 : undefined);
          var accessManager = new AccessManager(accessToken);
          accessManager.on('tokenUpdated', function() {
            try {
              assert.equal(config1.identity, accessManager.identity);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

        it('should have set .isExpired to ' + expired, function(done) {
          var accessToken = generateAccessToken(config1, expired ? -1 : undefined);
          var accessManager = new AccessManager(accessToken);
          accessManager.on('tokenUpdated', function() {
            try {
              assert.equal(expired, accessManager.isExpired);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

        it('should have set .expires to a Date', function(done) {
          var accessToken = generateAccessToken(config1, expired ? -1 : undefined);
          var accessManager = new AccessManager(accessToken);
          accessManager.on('tokenUpdated', function() {
            try {
              assert(accessManager.expires instanceof Date);
            } catch (error) {
              done(error);
              return;
            }
            done();
          });
        });

        if (expired) {

          it('should emit a "tokenExpired" event with the AccessManager', function(done) {
            var accessToken = generateAccessToken(config1, expired ? -1 : undefined);
            var accessManager = new AccessManager(accessToken);
            accessManager.on('tokenUpdated', function() {
              accessManager.on('tokenExpired', function(_accessManager) {
                try {
                  assert.equal(accessManager, _accessManager);
                } catch (error) {
                  done(error);
                  return;
                }
                done();
              });
            });
          });

          it('should emit a "tokenWillExpire" event with the AccessManager', function(done) {
            var accessToken = generateAccessToken(config1, expired ? -1 : undefined);
            var accessManager = new AccessManager(accessToken);
            accessManager.on('tokenUpdated', function() {
              accessManager.on('tokenWillExpire', function(_accessManager) {
                try {
                  assert.equal(accessManager, _accessManager);
                } catch (error) {
                  done(error);
                  return;
                }
                done();
              });
            });
          })
        }

      });

    }

    context('when passed a valid, expired Access Token', function() {

      constructorTests(generateAccessToken(config1, -1), true);

      constructorWhenPassedAValidAccessTokenTests(true);

    });

  });

  describe('#updateToken', function() {
    context('when passed an invalid Access Token', function() {

      it('should return a Promise that rejects with an Error', function(done) {
        var accessToken = generateAccessToken(config1);
        var accessManager = new AccessManager(accessToken);
        var newToken = 'bar';
        accessManager.updateToken(newToken).catch(function(error) {
          assert(error instanceof Error);
        }).then(done, done);
      });

      context('once rejected', function() {

        it('._tokenPayload should remain unchanged', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = 'bar';
          accessManager.on('tokenUpdated', function() {
            var oldTokenPayload = accessManager._tokenPayload;
            accessManager.updateToken(newToken).catch(function() {
              assert.equal(oldTokenPayload, accessManager._tokenPayload);
            }).then(done, done);
          });
        });

        it('.expires should remain unchanged', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = 'bar';
          accessManager.on('tokenUpdated', function() {
            var oldExpires = accessManager.expires;
            accessManager.updateToken(newToken).catch(function() {
              assert.equal(oldExpires, accessManager.expires);
            }).then(done, done);
          });
        });

        it('.identity should remain unchanged', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = 'bar';
          accessManager.on('tokenUpdated', function() {
            var oldIdentity = accessManager.identity;
            accessManager.updateToken(newToken).catch(function() {
              assert.equal(oldIdentity, accessManager.identity);
            }).then(done, done);
          });
        });

        it('.isExpired should remain unchanged', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = 'bar';
          accessManager.on('tokenUpdated', function() {
            var oldIsExpired = accessManager.isExpired;
            accessManager.updateToken(newToken).catch(function() {
              assert.equal(oldIsExpired, accessManager.isExpired);
            }).then(done, done);
          });
        });

        it('.token should remain unchanged', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = 'bar';
          accessManager.on('tokenUpdated', function() {
            var oldToken = accessManager.token;
            accessManager.updateToken(newToken).catch(function() {
              assert.equal(oldToken, accessManager.token);
            }).then(done, done);
          });
        });

      });

    });

    context('when passed a valid, unexpired Access Token', function() {

      updateTokenWhenPassedAValidAccessToken(false);

    });

    /**
     * Check the properties of the {@link AccessManager} once the
     * {@link AccessManager#updateToken} method has been invoked.
     * @param {boolean} [expired=False] - Whether or not to test "tokenExpired"
     */
    function updateTokenWhenPassedAValidAccessToken(expired) {

      it('should return a Promise that resolves with the AccessManager', function(done) {
        var accessToken = generateAccessToken(config1);
        var accessManager = new AccessManager(accessToken);
        var newToken = generateAccessToken(config2, expired ? -1 : undefined);
        accessManager.updateToken(newToken).then(function(_accessManager) {
          assert.equal(accessManager, _accessManager);
        }).then(done, done);
      });

      context('once resolved', function() {

        it('should have set ._tokenPayload to a new Object', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = generateAccessToken(config2, expired ? -1 : undefined);
          accessManager.once('tokenUpdated', function() {
            var oldTokenPayload = accessManager._tokenPayload;
            accessManager.updateToken(newToken).then(function() {
              assert(accessManager._tokenPayload instanceof Object);
              assert.notEqual(oldTokenPayload, accessManager._tokenPayload);
            }).then(done, done);
          });
        });

        it('should have set .expires to a new Date', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = generateAccessToken(config2, expired ? -1 : undefined);
          accessManager.once('tokenUpdated', function() {
            var oldExpires = accessManager.expires;
            accessManager.updateToken(newToken).then(function() {
              assert(accessManager.expires instanceof Date);
              assert.notEqual(oldExpires, accessManager.expires);
            }).then(done, done);
          });
        });

        it('should have set .identity to the new identity string', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = generateAccessToken(config2, expired ? -1 : undefined);
          accessManager.once('tokenUpdated', function() {
            accessManager.updateToken(newToken).then(function() {
              assert.equal(config2.identity, accessManager.identity);
            }).then(done, done);
          });
        });

        it('should have set .isExpired to ' + expired, function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = generateAccessToken(config2, expired ? -1 : undefined);
          accessManager.once('tokenUpdated', function() {
            accessManager.updateToken(newToken).then(function() {
              assert.equal(expired, accessManager.isExpired);
            }).then(done, done);
          });
        });

        it('should have set .token to the new Access Token', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = generateAccessToken(config2, expired ? -1 : undefined);
          accessManager.once('tokenUpdated', function() {
            accessManager.updateToken(newToken).then(function() {
              assert.equal(newToken, accessManager.token);
            }).then(done, done);
          });
        });

        it('should emit a "tokenUpdated" event with the AccessManager', function(done) {
          var accessToken = generateAccessToken(config1);
          var accessManager = new AccessManager(accessToken);
          var newToken = generateAccessToken(config2, expired ? -1 : undefined);
          accessManager.updateToken(newToken).then(function() {
            accessManager.on('tokenUpdated', function(_accessManager) {
              try {
                assert.equal(accessManager, _accessManager);
              } catch (error) {
                done(error);
                return;
              }
              done();
            });
          }, done);
        });

        if (expired) {

          context('after emitting the "tokenUpdated" event', function() {

            it('should emit a "tokenExpired" event with the AccessManager', function(done) {
              var accessToken = generateAccessToken(config1);
              var accessManager = new AccessManager(accessToken);
              var newToken = generateAccessToken(config2, expired ? -1 : undefined);
              accessManager.updateToken(newToken).then(function() {
                accessManager.on('tokenUpdated', function() {
                  accessManager.on('tokenExpired', function(_accessManager) {
                    try {
                      assert.equal(accessManager, _accessManager);
                    } catch (error) {
                      done(error);
                      return;
                    }
                    done();
                  });
                });
              }, done);
            });
            it('should emit a "tokenWillExpire" event with the AccessManager', function(done) {
              var accessToken = generateAccessToken(config1);
              var accessManager = new AccessManager(accessToken);
              var newToken = generateAccessToken(config2, expired ? -1 : undefined);
              accessManager.updateToken(newToken).then(function() {
                accessManager.on('tokenUpdated', function() {
                  accessManager.on('tokenWillExpire', function(_accessManager) {
                    try {
                      assert.equal(accessManager, _accessManager);
                    } catch (error) {
                      done(error);
                      return;
                    }
                    done();
                  });
                });
              }, done);
            });
          });

        }

      });

    }

    context('when passed a valid, expired Access Token', function() {

      updateTokenWhenPassedAValidAccessToken(true);

    });

    context('when called multiple times in the same execution', function() {

      it('should emit a "tokenUpdated" event once', function(done) {
        var accessToken1 = generateAccessToken(config1);
        var accessToken2 = generateAccessToken(config2);
        var accessToken3 = generateAccessToken(config3);
        var accessManager = new AccessManager(accessToken1);
        accessManager.updateToken(accessToken2);
        accessManager.updateToken(accessToken3);
        accessManager.on('tokenUpdated', function() {
          try {
            assert.equal(accessToken3, accessManager.token);
          } catch (error) {
            done(error);
            return;
          }
          done();
        });
      });

    });

    context('when called immediately after construction with an invalid Access Token', function() {

      it('should not emit an "error" event', function(done) {
        var accessToken1 = 'foo';
        var accessToken2 = generateAccessToken(config1);
        var accessManager = new AccessManager(accessToken1);
        accessManager.updateToken(accessToken2);
        accessManager.on('error', done);
        accessManager.on('tokenUpdated', function() {
          try {
            assert.equal(accessToken2, accessManager.token);
          } catch (errr) {
            done(error);
            return;
          }
          done();
        });
      });

    });

  });

});
