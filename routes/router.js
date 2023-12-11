const express = require('express');
const router = express.Router();
const BASE_URL = '/api/v1';
const { login, register } = require('../handler/Auth');
const { handler } = require('../handler/Handler');

// router.get(`${BASE_URL}/users`, handler.getUsers);
router.get(`${BASE_URL}/users/:id`, handler.getUserById);
router.post(`${BASE_URL}/login`, login);
router.post(`${BASE_URL}/register`, register);

// mengambil semua event
router.get(`${BASE_URL}/events`, handler.getEvents);
// get event by id
router.get(`${BASE_URL}/events/:id`, handler.getEventById);
// tambah event
router.post(`${BASE_URL}/events`, handler.addEvent);
// update event
router.put(`${BASE_URL}/events/:id`, handler.updateEvent);
// hapus event
router.delete(`${BASE_URL}/events/:id`, handler.delEvents);

// mengambil data panitia berdasarkan kode event
router.get(`${BASE_URL}/panitia/:kode`, handler.addPanitia);
// menambah devisi
router.post(`${BASE_URL}/panitia`, handler.addPanitia);
// update nama devisi
router.put(`${BASE_URL}/panitia/:id_devisi`, handler.addPanitia);
// menghapus devisi
router.delete(`${BASE_URL}/panitia/:id`, handler.deleteDevisi);
// menambah anggota devisi
router.post(`${BASE_URL}/devisi/anggota`, handler.addAnggotaDevisi);
// menghapus anggota devisi
router.delete(`${BASE_URL}/devisi/anggota/:id`, handler.delAnggotaDevisi);
// join event
router.post(`${BASE_URL}/join/event`, handler.joinEvent)

module.exports = router;
