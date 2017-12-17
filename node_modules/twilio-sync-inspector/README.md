# Twilio Sync Inspector

🔄 Easy to use inspector tool for [Twilio Sync](https://www.twilio.com/sync) services

[![npm](https://img.shields.io/npm/v/twilio-sync-inspector.svg?style=flat-square)](https://npmjs.com/packages/twilio-sync-inspector) [![npm](https://img.shields.io/npm/dt/twilio-sync-inspector.svg?style=flat-square)](https://npmjs.com/packages/twilio-sync-inspector) [![npm](https://img.shields.io/npm/l/twilio-sync-inspector.svg?style=flat-square)](/LICENSE)

This tool allows you to inspect the data stored in the different sync services. It will automatically update when the data in Sync changes.

## Features

- View list of available [Sync services](https://www.twilio.com/console/sync/services)
- View list of available resources of type
  - [Documents](https://www.twilio.com/docs/api/sync/sync-documents)
  - [Maps](https://www.twilio.com/docs/api/sync/sync-maps)
  - [Lists](https://www.twilio.com/docs/api/sync/sync-lists)
- Inspect contents of resource
- Pick number of items fetched for a resource and the order
- Auto update inspector view on remote changes
- Edit data of existing resources

## Installation

```bash
npm install -g twilio-sync-inspector
```

## Usage

```
 Usage: twilio-sync-inspector [options]


  Options:

    -V, --version                output the version number
    -k, --key [api key]          Twilio API Key
    -s, --secret [api secret]    Twilio API Secret
    -a, --account [account sid]  Twilio Account SID
    -p, --port [port]            Port to run tool on
    --dev                        PURELY FOR DEVELOPMENT
    -h, --help                   output usage information
```

## Common Issues

### Fails to load objects

This tool is designed to be used during the development process and not for production apps. Therefore it requires to have [ACL](https://www.twilio.com/docs/api/sync/permissions-and-access-control) disabled to have the right permissions. 

## Contributors

- [Dominik Kundel](https://github.com/dkundel)

## License

MIT
