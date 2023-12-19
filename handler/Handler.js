const conn = require('../db_config');
const {generate_unikID} = require('../utils/generate_uuid')
const {promisify} = require('util')

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
  DELETE events,panitia,anggota_devisi,anggaran,ceklist,item_ceklist,item_anggaran,agenda,join_event 
  FROM events 
  LEFT JOIN panitia ON events.id=panitia.id_event 
  LEFT JOIN anggota_devisi ON panitia.id_devisi=anggota_devisi.id_devisi 
  LEFT JOIN anggaran ON events.id=anggaran.id_event 
  LEFT JOIN item_anggaran ON anggaran.id=item_anggaran.id_anggaran 
  LEFT JOIN ceklist ON events.id=ceklist.id_event 
  LEFT JOIN item_ceklist ON ceklist.id=item_ceklist.id_ceklist
  LEFT JOIN agenda ON events.id=agenda.id_event
  LEFT JOIN join_event ON events.kode=join_event.kode_event 
  where events.id=${id}`, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'event berhasil dihapus' });
  });
}

/*========== Handler Panitia ==========*/
const getPanitia = async (req, res) => {
  const id_event = req.params.id_event
  const queryAsync = promisify(conn.query).bind(conn);
  const panitias = await queryAsync(`select id as id_panitia, nama_devisi, id_devisi from panitia where id_event=${id_event}`)
  
  const promises = panitias.map(async panitia => {
    const result = await queryAsync(`
        SELECT anggota_devisi.id as id_anggota, nama_anggota
        FROM anggota_devisi
        where id_devisi='${panitia.id_devisi}'
    `)

    panitia.anggota = result
    return panitia
  });

  const data = await Promise.all(promises)
  res.status(200).json(data)

}

const addPanitia = (req, res) => {
  req.body.id_devisi = generate_unikID()
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
  const id = req.params.id
  conn.query('update panitia set ? where ?', [req.body, { id }], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({msg: "Devisi berhasil diupdate"})
  });
}

const deleteDevisi = (req, res) => {
  const id = req.params.id
  conn.query(`
  DELETE panitia, anggota_devisi 
  FROM panitia
  LEFT JOIN anggota_devisi ON panitia.id_devisi=anggota_devisi.id_devisi 
  where panitia.id=${id}`, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'Devisi berhasil dihapus' });
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


/*========== Handler anggaran ==========*/
const getAnggaran = async (req, res) => {
  const id_event = req.params.id_event
  const queryAsync = promisify(conn.query).bind(conn);
  const anggarans = await queryAsync(`select id as id_anggaran, nama_section from anggaran where id_event=${id_event}`)
  
  const promises = anggarans.map(async anggaran => {
    const result = await queryAsync(`
        SELECT id as id_item, uraian, volume, rincian, harga_satuan, total 
        FROM item_anggaran
        where id_anggaran='${anggaran.id_anggaran}'
    `)

    anggaran.items = result
    return anggaran
  });

  const data = await Promise.all(promises)
  res.status(200).json(data)
}

const addSectionAnggaran = (req, res) => {
  conn.query('insert into anggaran set ?', req.body, (err) => {
    if(err) return res.status(500).send(err)
    res.status(201).json({msg: "Section anggaran berhasil ditambahkan"})
  })
}

const updateSectionAnggaran = (req, res) => {
  const id = req.params.id
  conn.query('update anggaran set ? where ?', [req.body, {id}], (err) => {
    if(err) return res.status(500).send(err)
    res.status(200).json({msg: "Section anggaran berhasil diupdate"})
  })
}

const deleteSectionAnggaran = (req, res) => {
  const id = req.params.id
  conn.query(`
  DELETE anggaran, item_anggaran 
  FROM anggaran
  LEFT JOIN item_anggaran ON anggaran.id=item_anggaran.id_anggaran
  where anggaran.id=${id}`, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'Anggaran berhasil dihapus' });
  });
}

const addItemAnggaran = (req, res) => {
  conn.query('insert into item_anggaran set ?', req.body, (err) => {
    if(err) return res.status(500).send(err)
    res.status(201).json({msg: "item anggaran berhasil ditambahkan"})
  })
}

const deleteItemAnggaran = (req, res) => {
  const id = req.params.id
  conn.query(`delete from item_anggaran where id=${id}`, (err) => {
    if(err) return res.status(500).send(err)
    res.status(200).json({msg: "item anggaran berhasil dihapus"})
  })
}

/*========== Handler agenda ==========*/
const getAgenda = (req, res) => {
  const id_event = req.params.id_event
  conn.query(`select * from agenda where id_event=${id_event}`, (err, result) => {
    if(err) return res.status(500).send(err)
    res.status(200).json(result)
  })
}

const addAgenda = (req, res) => {
  conn.query(`insert into agenda set ?`, req.body, (err) => {
    if(err) return res.status(500).send(err)
    res.status(201).json({msg: "agenda berhasil ditambahkan"})
  })
}

const updateAgenda = (req, res) => {
  const id = req.params.id
  conn.query(`update agenda set ? where ?`, [req.body, {id}], (err) => {
    if(err) return res.status(500).send(err)
    res.status(200).json({msg: "agenda berhasil diupdate"})
  })
}

const deleteAgenda = (req, res) => {
  const id = req.params.id
  conn.query(`delete from agenda where id=${id}`, [req.body, {id}], (err) => {
    if(err) return res.status(500).send(err)
    res.status(200).json({msg: "agenda berhasil dihapus"})
  })
}


/*========== Handler ceklist ==========*/
const getCeklist = async (req, res) => {
  const id_event = req.params.id_event
  const queryAsync = promisify(conn.query).bind(conn);
  const ceklists = await queryAsync(`select id as id_ceklist, nama_ceklist from ceklist where id_event=${id_event}`)
  
  const promises = ceklists.map(async ceklist => {
    const result = await queryAsync(`
        SELECT id as id_item, nama_item, is_ceklist
        FROM item_ceklist
        where id_ceklist='${ceklist.id_ceklist}'
    `)

    ceklist.items = result
    return ceklist
  });

  const data = await Promise.all(promises)
  res.status(200).json(data)
}

const addCeklist = (req, res) => {
  conn.query(`insert into ceklist set ?`, req.body, (err) => {
    if(err) return res.status(500).send(err)
    res.status(201).json({msg: "ceklist berhasil ditambahkan"})
  })
}

const updateCeklist = (req, res) => {
  const id = req.params.id
  conn.query(`update ceklist set ? where ?`, [req.body, {id}], (err) => {
    if(err) return res.status(500).send(err)
    res.status(201).json({msg: "ceklist berhasil diupdate"})
  })
}

const deleteCeklist = (req, res) => {
  const id = req.params.id
  conn.query(`
  DELETE ceklist, item_ceklist 
  FROM ceklist
  LEFT JOIN item_ceklist ON ceklist.id=item_ceklist.id_ceklist
  where ceklist.id=${id}`, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'Ceklist berhasil dihapus' });
  });
}

const addItemCeklist = (req, res) => {
  conn.query(`insert into item_ceklist set ?`, req.body, (err) => {
    if(err) return res.status(500).send(err)
    res.status(201).json({msg: "item ceklist berhasil ditambahkan"})
  })
}

const updateItemCeklist = (req, res) => {
  const id = req.params.id
  conn.query(`update item_ceklist set ? where ?`, [req.body, {id}], (err) => {
    if(err) return res.status(500).send(err)
    res.status(201).json({msg: "item ceklist berhasil diupdate"})
  })
}

const deleteItemCeklist = (req, res) => {
  const id = req.params.id
  conn.query(`DELETE FROM item_ceklist where id=${id}`, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ msg: 'item ceklist berhasil dihapus' });
  });
}




module.exports = { handler: {
  getUsers, 
  getUserById, 
  getEvents, 
  getEventById, 
  getPanitia,
  getAnggaran,
  getAgenda,
  getCeklist,
  addEvent,
  addPanitia,
  addAnggotaDevisi,
  addSectionAnggaran,
  addItemAnggaran,
  addAgenda,
  addCeklist,
  addItemCeklist,
  updateUser,
  updateEvent,
  updateDevisi,
  updateSectionAnggaran,
  updateAgenda,
  updateCeklist,
  updateItemCeklist,
  delEvents,
  deleteDevisi,
  delAnggotaDevisi,
  deleteSectionAnggaran,
  deleteItemAnggaran,
  deleteAgenda,
  deleteCeklist,
  deleteItemCeklist,
  joinEvent
}};
