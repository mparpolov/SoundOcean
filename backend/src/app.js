const express = require('express');
const cors = require('cors');

const setupDB = require('./database/setupDB'); 
setupDB();

const { errors } = require('celebrate');
const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;