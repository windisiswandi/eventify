const express = require('express');
const router = express.Router();
const BASE_URL = '/api/v1';
const { login, register } = require('../handler/Auth');
const { getUsers,getUserById,addEvent } = require('../handler/Handler');

router.get(`${BASE_URL}/users`, getUsers);
router.get(`${BASE_URL}/users/:id`, getUserById);
router.post(`${BASE_URL}/login`, login);
router.post(`${BASE_URL}/register`, register);

router.post(`${BASE_URL}/events`, addEvent);

// router.post()

module.exports = router;
