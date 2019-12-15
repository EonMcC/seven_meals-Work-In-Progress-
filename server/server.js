const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('seven_meals');
    const mealsCollection = db.collection('meals');
    app.use('/api/meals', createRouter(mealsCollection));
  })
  .catch(console.error);

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('seven_meals');
    const weeksCollection = db.collection('weeks');
    app.use('/api/weeks', createRouter(weeksCollection));
  })
  .catch(console.error);

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('seven_meals');
    const inventoriesCollection = db.collection('inventories');
    app.use('/api/inventories', createRouter(inventoriesCollection));
  })
  .catch(console.error);

  app.listen(3000, function() {
    console.log(`Seven Meals server running on port ${this.address().port}`);
  });
