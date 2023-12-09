const express = require('express');
const router = express.Router();
const BASE_URL = '/api/v1';
const { login, register } = require('../handler/Auth');
const { handler } = require('../handler/Handler');

router.get(`${BASE_URL}/users`, handler.getUsers);
router.get(`${BASE_URL}/users/:id`, handler.getUserById);
router.post(`${BASE_URL}/login`, login);
router.post(`${BASE_URL}/register`, register);

router.get(`${BASE_URL}/events`, handler.getEvents);
router.get(`${BASE_URL}/events/:id`, handler.getEventById);
router.post(`${BASE_URL}/events`, handler.addEvent);
router.put(`${BASE_URL}/events/:id`, addEvent);
router.delete(`${BASE_URL}/events/:id`, addEvent);

// router.post()

module.exports = router;
