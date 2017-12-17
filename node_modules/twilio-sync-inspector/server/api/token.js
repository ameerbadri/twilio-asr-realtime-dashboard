const twilio = require('twilio');
const { AccessToken } = twilio.jwt;
const { SyncGrant } = AccessToken;

const { load } = require('../config');

function createToken(identity, serviceSid) {
  const config = load();

  const syncGrant = new SyncGrant({
    serviceSid: serviceSid
  });

  const token = new AccessToken(
    config.accountSid,
    config.apiKey,
    config.apiSecret
  );
  token.addGrant(syncGrant);
  token.identity = identity;
  return token.toJwt();
}

function handleTokenRequest(req, res) {
  const identity = 'twilio-sync-inspector';
  const serviceSid = req.query.sid;
  const token = createToken(identity, serviceSid);

  res.send({ token });
}

module.exports = handleTokenRequest;
