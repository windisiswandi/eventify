const conn = require('../db_config');

/*========== Handler User ==========*/
const getUsers = (req, res) => {
  conn.query('select * from users', (err, result) => {
    res.statusCode = 200;
    res.json(result);
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  conn.query(`select * from users where id=${id}`, (err, result) => {
    // if (result.length == 0) return res.status(404).json({ msg;  'data '})
    res.statusCode = 200;
    res.json(result);
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  conn.query('update users set ? where ?', [req.body, { id }], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({msg: "user berhasil diupdate"})
  });
};

/*========== Handler Event ==========*/
const getEvents = (req, res) => {
  conn.query('select * from events', (err, result) => {
    res.status(200).json(result);
  });
};

const getEventById = (req, res) => {
  const id = req.params.id;
  conn.query(`select * from events where id=${id}`, (err, result) => {
    res.status(200).json(result);
  });
};

const addEvent = (req, res) => {
  conn.query('insert into events set ?', req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ msg: 'Event berhasil dibuat' });
  });
};

const updateEvent = (req, res) => {
  const id = req.params.id
  conn.query('update events set ? where ?', [req.body, { id }], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({msg: "event berhasil diupdate"})
  });
}

const delEvents = (req, res) => {
  const id = req.params.id
  conn.query(`
  DELETE events, panitia, anggota_devisi, join_event 
  FROM events 
  LEFT JOIN panitia ON events.kode=panitia.kode_event 
  LEFT JOIN anggota_devisi ON panitia.id_devisi=anggota_devisi.id_devisi 
  LEFT JOIN join_event ON events.kode=join_event.kode_event 
  where events.id=${id}`, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'event berhasil dihapus' });
  });
}

/*========== Handler Panitia ==========*/
const addPanitia = (req, res) => {
  conn.query('insert into panitia set ?', req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ msg: 'Panitia berhasil ditambahkan' });
  })
}

const addAnggotaDevisi = (req, res) => {
  conn.query('insert into anggota_devisi set ?', req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ msg: 'anggota berhasil ditambahkan' });
  })
}

const updateDevisi = (req, res) => {
  const id_devisi = req.params.id_devisi
  conn.query('update events set ? where ?', [req.body, { id_devisi }], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({msg: "Devisi berhasil diupdate"})
  });
}

const deleteDevisi = (req, res) => {
  const id_devisi = req.params.id_devisi
  conn.query(`
  DELETE panitia, anggota_devisi 
  FROM panitia
  LEFT JOIN anggota_devisi ON panitia.id_devisi=anggota_devisi.id_devisi 
  where panitia.id_devisi=${id_devisi}`, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'event berhasil dihapus' });
  });
}

const delAnggotaDevisi = (req, res) => {
  const id = req.params.id
  conn.query(`DELETE FROM anggota_devisi where id=${id}`, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'anggota berhasil dihapus' });
  });
}

/*========== Handler join event ==========*/
const joinEvent = (req, res) => {
  conn.query('insert into join_event set ?', req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'Berhasil Gabung Event' });
  })
}


module.exports = { handler: {
  getUsers, 
  getUserById, 
  getEvents, 
  getEventById, 
  addEvent,
  addPanitia,
  addAnggotaDevisi,
  updateUser,
  updateEvent,
  updateDevisi,
  delEvents,
  deleteDevisi,
  delAnggotaDevisi,
  joinEvent
}};
