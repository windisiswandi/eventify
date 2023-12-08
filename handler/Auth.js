const conn = require('../db_config');
const { encrypt, decrypt } = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, password } = req.body;

  conn.query(`select * from users where email='${email}'`, (err, result) => {
      if (result.length == 0) return res.status(404).json({ msg: 'email tidak ditemukan' });
      
      decrypt(password, result[0].password, (response) => {
          if (!response) return res.status(403).json({ msg: 'password salah' });

          const { id, email, nama } = result[0];
          const access_token = jwt.sign({ id, email, nama }, process.env.KEY_ACCESS_TOKEN, { expiresIn: '2d' });
      
          res.status(200).json({ msg: 'login berhasil', access_token });
      })

  });
};

const register = (req, res) => {
  let { nama, email, password } = req.body;
  password = encrypt(password);

  conn.query('insert into users set ?', { nama, email, password }, (err) => {
    if (err) throw err;
    res.status(201).json({ msg: 'data user berhasil ditambahkan' });
  });
};

module.exports = { login, register };
