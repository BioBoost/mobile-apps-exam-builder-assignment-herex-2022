import config from './config/config.js'
import express from 'express'
import api from './api/api.js'
import { connect as db_connect } from './database/database.js'
import morgan from 'morgan'
import { handle_error } from './helpers/error_handling.js'

const app = express();
app.use(express.json());        // JSON Body Parser
app.use(morgan("combined"));    // Request Logging

app.use('/', api);

db_connect();

///////////////////
// Error Handler //
///////////////////
app.use((err, req, res, next) => {
  handle_error(err, res);
});

app.listen(config.general.port, () => {
  console.log(`Example app listening on port ${config.general.port}`)
})