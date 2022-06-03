const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const vars = require('./variables');
const path = require('path');

const db = knex({
  client: 'pg',
  connection: {
    host : vars.dbHost,
    user : vars.dbUser,
    password : vars.dbPassword,
    database : vars.dbName
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

//sign in
app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).send('Unable to get user'))
      }
      else {
        res.status(400).send('Invalid credentials');
      }
    })
    .catch(err => res.status(400).json('Invalid credentials'))
});

//register
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  db.transaction(trx => {
    trx.insert({
      hash,
      email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({
        email: loginEmail[0],
        name: name,
        joined: new Date()
      })
      .then(user => res.json(user[0]))
      .catch(err => res.status(400).json('Invalid request'));
    })
  .then(trx.commit)
  .catch(trx.rollback)
  })
});

//read profile
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id: id })
  .then(profile => {
      if (profile.length) {
        res.json(profile[0]);
      }
      else {
        res.status(404).json('User not found!');
      }
  })
  .catch(err => res.status(400).json('Something went wrong'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entr => res.json(entr[0]))
  .catch(err => res.status(400).json('Unable to get count'));
});

app.listen(port, () => {
  console.log('Running on ' + port);
});
