const express = require('express');

const secretController = require('../controller/secret');

const router = express.Router();

router.get('/api/secret/:secret', secretController.getSecret);

router.get('/api/all-status', secretController.getAllStatus);

router.post('/api/secret', secretController.postSecret);

module.exports = router;