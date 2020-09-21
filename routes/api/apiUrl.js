const express = require('express');
const router = express.Router();
const AppUrl = require('../../models/AppUrl');

// @route   GET api/appUrl
// @desc    Get all urls
// @access  Public
router.get('/', async (req, res) => {
  try {
    const urls = await AppUrl.find();
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.statusCode(500).json({ msg: 'Error from server' });
  }
});

// @route   POST api/appUrl
// @desc    Create / update url
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { url, updateEverySeconds, ignoreFrom, ignoreTo } = req.body;

    const urlInDatabase = await AppUrl.findOne({ url });
    if (urlInDatabase) {
      urlInDatabase.updateEverySeconds = updateEverySeconds;
      urlInDatabase.ignoreFrom = ignoreFrom;
      urlInDatabase.ignoreTo = ignoreTo;
      urlInDatabase.lastPing = Date.now();
      await urlInDatabase.save();
      return res.status(200).json({ msg: 'Update url successfully' });
    }

    const newUrl = new AppUrl({
      url,
      updateEverySeconds,
      ignoreFrom,
      ignoreTo,
    });
    await newUrl.save();

    res.status(200).json({ msg: 'Create url successully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error from server' });
  }
});

module.exports = router;
