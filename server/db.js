const { Pool } = require('pg')

const pool = new Pool({
  user: 'jadilorenzo',
  host: 'localhost',
  database: 'jadilorenzo',
  password: '',
  post: 5432
})

module.exports = pool
