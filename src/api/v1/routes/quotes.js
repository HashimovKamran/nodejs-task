const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotesController');
const isAuthenticatedUser = require('../middlewares/auth');

router.route('/list').post(isAuthenticatedUser, quotesController);

module.exports = router;