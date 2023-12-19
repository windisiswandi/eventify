const express = require('express');
const router = express.Router();
const BASE_URL = '/api/v1';
const { login, register } = require('../handler/Auth');
const { handler } = require('../handler/Handler');

// router.get(`${BASE_URL}/users`, handler.getUsers);
router.get(`${BASE_URL}/users/:id`, handler.getUserById);
router.post(`${BASE_URL}/auth/login`, login);
router.post(`${BASE_URL}/auth/register`, register);

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

// mengambil data panitia berdasarkan id_event
router.get(`${BASE_URL}/panitia/:id_event`, handler.getPanitia);
// menambah devisi
router.post(`${BASE_URL}/panitia`, handler.addPanitia);
// update nama devisi
router.put(`${BASE_URL}/panitia/:id`, handler.updateDevisi);
// menghapus devisi
router.delete(`${BASE_URL}/panitia/:id`, handler.deleteDevisi);
// menambah anggota devisi
router.post(`${BASE_URL}/devisi/anggota`, handler.addAnggotaDevisi);
// menghapus anggota devisi
router.delete(`${BASE_URL}/devisi/anggota/:id`, handler.delAnggotaDevisi);
// join event
router.post(`${BASE_URL}/join/event`, handler.joinEvent)

// mengambil data anggaran berdasarkan id_event
router.get(`${BASE_URL}/anggaran/:id_event`, handler.getAnggaran)
// tambah section baru anggaran
router.post(`${BASE_URL}/section_anggaran`, handler.addSectionAnggaran)
// update nama section anggaran
router.put(`${BASE_URL}/section_anggaran/:id`, handler.updateSectionAnggaran)
// hapus section anggaran
router.delete(`${BASE_URL}/section_anggaran/:id`, handler.deleteSectionAnggaran)
// tambah item anggaran
router.post(`${BASE_URL}/anggaran/item`, handler.addItemAnggaran)
// tambah item anggaran
router.delete(`${BASE_URL}/anggaran/item/:id`, handler.deleteItemAnggaran)

// mengambil data agenda berdasarkan id_Event
router.get(`${BASE_URL}/agenda_event/:id_event`, handler.getAgenda)
// tambah agenda
router.post(`${BASE_URL}/agenda`, handler.addAgenda)
// update agenda
router.put(`${BASE_URL}/agenda/:id`, handler.updateAgenda)
// hapus agenda
router.delete(`${BASE_URL}/agenda/:id`, handler.deleteAgenda)

// mengambil data ceklist berdasarkan id event
router.get(`${BASE_URL}/ceklist_event/:id_event`, handler.getCeklist)
// tambah ceklist
router.post(`${BASE_URL}/ceklist`, handler.addCeklist)
// update ceklist
router.put(`${BASE_URL}/ceklist/:id`, handler.updateCeklist)
// delete ceklist
router.delete(`${BASE_URL}/ceklist/:id`, handler.deleteCeklist)
// tambah item ceklist
router.post(`${BASE_URL}/ceklist/item`, handler.addItemCeklist)
// update item ceklist
router.put(`${BASE_URL}/ceklist/item`, handler.updateItemCeklist)
// delete item ceklist
router.delete(`${BASE_URL}/ceklist/item/:id`, handler.deleteItemCeklist)




module.exports = router;
