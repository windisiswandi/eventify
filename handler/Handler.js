const conn = require('../db_config');

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
    if (err) throw err;
    res.status(201).json({ msg: 'Event berhasil dibuat' });
  });
};

const updateEvent = (req, res) => {
  const id = req.params.id
  conn.query('update events set ? where ?', [req.body, { id }], (err) => {
    if (err) throw err;
    res.status(200).json({msg: "event berhasil diupdate"})
  });
}

const delEvents = (req, res) => {
  const id = req.params.id
  conn.query(`delete from events where id=${id}`, (err) => {
    if (err) throw err;
    res.status(200).json({ msg: 'event berhasil dihapus' });
  });
}
/*========== END ==========*/

module.exports = { handler: {
  getUsers, 
  getUserById, 
  getEvents, 
  getEventById, 
  addEvent,
  updateEvent,
  delEvents
}};
