/* eslint-disable no-console */

import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config()

const DB_URL = process.env.DB_URL
const DB_SETTINGS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.Promise = global.Promise;

try {
  mongoose.connect(DB_URL, DB_SETTINGS);
} catch (err) {
  mongoose.createConnection(DB_URL, DB_SETTINGS);
}

mongoose.connection
  .once('open', () => console.log('connected to mongodb'))
  .on('error', e => {
    console.log(`couldn't connect to mongodb`)
    throw e;
  });
