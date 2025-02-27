const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send("Lets, looks good!");
})

module.exports = router;