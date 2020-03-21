const express = require('express')
const writeJSONFile = require('write-json-file');
const loadJsonFile = require('load-json-file');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const {v4} = require('uuid')
const hostValidation = require('host-validation')
console.log('App is running...')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(hostValidation({
  hosts: [
    '127.0.0.1:3333',
    '10.0.1.39:3333',
    'localhost:3333'
  ]
}))

var pool = require('./db')
app.get('/', (req, res) => {
  res.json("Hello World")
})

app.get('/api/get/messages', async (req, res) => {
  const result = pool.query(`SELECT * FROM messages;`, (q_err, q_res) => {
    res.json({db: (q_res === undefined) ? [] : q_res.rows})
    console.log(q_res.rows);
    console.log('');
  })
})

app.get('/api/get/reactions', async (req, res) => {
  pool.query(`SELECT * FROM reactions;`, (q_err, q_res) => {
    res.json({db: q_res.rows})
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
  console.log(req.body.db);
  pool.query(`INSERT INTO messages (mid, uid, rid, message) VALUES ($1, $2, $3, $4);`, [req.body.db.mid, req.body.db.uid, req.body.db.rid, req.body.db.message])
  res.json({db: 'Yay'})
})

app.post('/api/post/rooms', async (req, res) => {
  pool.query(`INSERT INTO rooms (rid, name, users) VALUES ($1, $2, $3);`, [req.body.db.rid, req.body.db.name, req.body.db.users])
  // pool.query(`INSERT INTO messages (mid, uid, rid, message, reaction) VALUES ($1, $2, $3, $4, $5)`, [v4(), req.body.db.users[0], req.body.db.rid, `Hello ${req.body.db.name}, __`])
  res.json({db: 'Yay'})
})

app.post('/api/post/users', async (req, res) => {
  pool.query(`INSERT INTO users (uid, name, passcode) VALUES ($1, $2, $3);`, [req.body.db.uid, req.body.db.name, req.body.db.passcode])
  res.json({db: 'Yay'})
})

app.post('/api/post/roomAddPerson', async (req, res) => {
  pool.query(`UPDATE rooms SET users = $1 WHERE rid = $2;`, [req.body.db.users, req.body.db.rid])
  res.json({db: 'Yay'})
})

app.post('/api/post/reactions', async (req, res) => {
  pool.query(`INSERT INTO reactions (reactid, mid, value, uid) VALUES ($1, $2, $3, $4);`, [req.body.db.reactid, req.body.db.mid, req.body.db.value, req.body.db.uid], (q_err, q_res) => {
    res.json({q_err, q_res})
  })
})

app.listen(3333)
