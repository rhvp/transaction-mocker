const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware');
const trans = require('../controllers/transactionController');

router.post('/send-funds', middleware.userAuth, trans.sendMoney)

router.post('/deposit-funds', middleware.userAuth, trans.deposit)

router.get('/', middleware.userAuth, trans.getTransactions)

router.get('/balance', middleware.userAuth, trans.getBalance)

module.exports = router;

