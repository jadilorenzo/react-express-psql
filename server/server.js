const express = require('express')
const writeJSONFile = require('write-json-file');
const loadJsonFile = require('load-json-file');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const {v4} = require('uuid')
console.log('App is running...')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pool = require('./db')

app.get('/api/get/messages', async (req, res) => {
  const result = pool.query(`SELECT * FROM messages;`, (q_err, q_res) => {
    res.json({db: (q_res === undefined) ? [] : q_res.rows})
    console.log(q_res.rows);
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
  pool.query(`INSERT INTO messages (mid, uid, rid, message, reaction) VALUES ($1, $2, $3, $4, $5);`, [req.body.db.mid, req.body.db.uid, req.body.db.rid, req.body.db.message,  req.body.db.reaction])
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


app.listen(3333)
