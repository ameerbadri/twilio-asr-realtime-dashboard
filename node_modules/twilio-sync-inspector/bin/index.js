#!/usr/bin/env node

const pkg = require('../package.json');
const { Command } = require('commander');
const { green, red } = require('chalk');
const opn = require('opn');

const server = require('../server');

const program = new Command(pkg.name)
  .version(pkg.version)
  .usage('[options]')
  .option('-k, --key [api key]', 'Twilio API Key')
  .option('-s, --secret [api secret]', 'Twilio API Secret')
  .option('-a, --account [account sid]', 'Twilio Account SID')
  .option('-p, --port [port]', 'Port to run tool on', parseInt, 8081)
  .option('--dev', 'PURELY FOR DEVELOPMENT')
  .parse(process.argv);

const apiKey = checkRequiredValue('key', 'TWILIO_API_KEY', 'Twilio API Key');
const apiSecret = checkRequiredValue(
  'secret',
  'TWILIO_API_SECRET',
  'Twilio API Secret'
);
const accountSid = checkRequiredValue(
  'account',
  'TWILIO_ACCOUNT_SID',
  'Twilio Account SID'
);

server({
  port: program.port,
  dev: program.dev,
  apiKey,
  apiSecret,
  accountSid
}).then(config => {
  console.log(
    `twilio-sync-inspector is running on: ${green(
      'http://localhost:' + config.port
    )}`
  );
  if (!program.dev) {
    opn('http://localhost:' + config.port);
  }
});

function checkRequiredValue(argKey, envKey, name) {
  const value = program[argKey] || process.env[envKey];
  if (!value) {
    console.error(`${red('ERROR')} Missing value for ${name}`);
    console.log(
      `Either pass the value via the command-line argument '--${key} [value]' or by saving it in you environment variables as '${envName}'.`
    );
    process.exit(1);
  }
  return value;
}
