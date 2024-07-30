const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello, FitTrack365!');
});

module.exports = router;
