const express = require('express');
const router = express.Router();
const AppUrl = require('../../models/AppUrl');

// @route   GET api/appUrl/count
// @desc    Get urls count
// @access  Public
router.get('/count', async (req, res) => {
  try {
    const count = await AppUrl.count();
    res.json(count);
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

// @route   DELETE api/appUrl
// @desc    Remove url
// @access  Public
router.delete('/:url', async (req, res) => {
  try {
    console.log(req.params);
    await AppUrl.deleteOne({ url: req.params.url });
    res.status(200).json({ msg: 'Delete url successully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error from server' });
  }
});

module.exports = router;
