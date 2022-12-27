const express = require('express');

const router = express.Router();
const { user } = require('../store/user');

router.get('/login', (req, res) => {
  res.status(201);
  res.json(user);
});

module.exports = {
  userRouter: router,
};
