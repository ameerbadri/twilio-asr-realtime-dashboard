const twilio = require('twilio');

const config = require('../config').load();
const client = twilio(config.apiKey, config.apiSecret, {
  accountSid: config.accountSid
});

async function getServices(req, res) {
  try {
    const serviceEntries = await client.sync.services.list();

    const services = serviceEntries.map(({ friendlyName, sid }) => ({
      uniqueName: friendlyName,
      sid
    }));

    res.send({ services });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to get list of services');
  }
}

async function getDataStructures(req, res) {
  const serviceSid = req.params.sid;
  const service = client.sync.services(serviceSid);
  try {
    const documentEntries = await service.documents.list();
    const documents = documentEntries.map(adjustData);
    const mapEntries = await service.syncMaps.list();
    const maps = mapEntries.map(adjustData);
    const listEntries = await service.syncLists.list();
    const lists = listEntries.map(adjustData);

    res.send({ documents, lists, maps });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to get list of data structures');
  }
}

function adjustData({ uniqueName, sid }) {
  return { uniqueName, sid };
}

module.exports = { getServices, getDataStructures };
