const debug = require('debug')('twilio-sync-inspector:config');
const defaultConfig = require('./config.default');

let _config;

function updateConfig(userConfig) {
  debug('Passed config: %O', userConfig);
  _config = { ...defaultConfig, ...userConfig };
  debug('New config %0', _config);
}

function load() {
  return _config;
}

module.exports = { load, updateConfig };
