const axios = require('axios');
const AppUrl = require('./models/AppUrl');
const moment = require('moment-timezone');

const sendPing = async () => {
  const appUrls = await AppUrl.find();
  appUrls.forEach((appUrl) => {
    if (isTimeToPing(appUrl)) {
      pingAndResetLastPing(appUrl.url);
    }
  });
};

const isTimeToPing = (appUrl) => {
  const now = moment(Date.now());
  const lastPing = moment(appUrl.lastPing);
  const diffSeconds = now.diff(lastPing) / 1000;
  now.tz('GMT');
  const isBedTime =
    now.hour() >= appUrl.ignoreFrom && now.hour() <= appUrl.ignoreTo;
  return !isBedTime && diffSeconds >= appUrl.updateEverySeconds;
};

const pingAndResetLastPing = async (url) => {
  try {
    const urlInDatabase = await AppUrl.findOne({ url });
    if (urlInDatabase) {
      urlInDatabase.lastPing = Date.now();
      await urlInDatabase.save();
    }
    console.log('Ping', url);
    await axios.get(url); // Ping
  } catch (err) {
    /* Do nothing */
  }
};

module.exports = sendPing;
