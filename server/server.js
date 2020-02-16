const express = require('express')
const writeJSONFile = require('write-json-file');
const loadJsonFile = require('load-json-file');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
console.log('App is running...')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pool = require('./db')

app.get('/api/get/messages', async (req, res) => {
  const result = pool.query(`SELECT * FROM messages;`, (q_err, q_res) => {
    res.json({db: (q_res === undefined) ? [] : q_res.rows})
  })
})

app.get('/api/get/rooms', async (req, res) => {
  const result = pool.query(`SELECT * FROM rooms;`, (q_err, q_res) => {
    res.json({rooms: q_res.rows})
  })
})

app.get('/api/get/users', async (req, res) => {
  const result = pool.query(`SELECT * FROM users;`, (q_err, q_res) => {
    res.json({users: q_res.rows})
  })
})

app.post('/api/post/messages', async (req, res) => {
  console.log('')
  console.log(req.body.db);
  pool.query(`INSERT INTO messages (mid, uid, rid, message) VALUES ($1, $2, $3, $4);`, [req.body.db.mid, req.body.db.uid, req.body.db.rid, req.body.db.message])
  res.json({db: 'Yay'})
  console.log('/api/post/messages')
})

app.post('/api/post/rooms', async (req, res) => {
  console.log('')
  console.log(req.body.db);
  pool.query(`INSERT INTO rooms (rid, name) VALUES ($1, $2);`, [req.body.db.rid, req.body.db.name])
  res.json({db: 'Yay'})
  console.log('/api/post/rooms')
})

app.listen(3333)
