var express = require('express');
var router = express.Router();
const user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    const users = user.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
