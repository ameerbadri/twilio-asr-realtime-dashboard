const express = require('express');
const path = require('path');
const debug = require('debug')('twilio-sync-inspector:server');

const { updateConfig, load: getConfig } = require('./config');

function startServer(userConfig) {
  return new Promise((resolve, reject) => {
    debug('Passed config: %O', userConfig);
    updateConfig(userConfig);
    const config = getConfig();
    debug('Working with config: %O', config);

    debug('Create server');
    const app = express();

    app.use('/api', require('./api'));

    if (!config.dev) {
      const buildFiles = path.join(__dirname, '..', 'build');
      debug('Serving files from %s', buildFiles);
      app.use(express.static(buildFiles));
      app.get('*', (req, res) => {
        res.sendFile(path.join(buildFiles, 'index.html'));
      });
    }

    app.listen(config.port, () => {
      debug('Server listening on port %d', config.port);
      resolve(config);
    });
  });
}

module.exports = startServer;
