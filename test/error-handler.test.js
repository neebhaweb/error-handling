const debugSpy = require('./doubles/debug-spy');
const errorHandler = require('../src/basic');
const rollbar = require('../src/rollbar');
const Supertest = require('supertest');
const test = require('ava');
const express = require('express');

const app = express();
const errorMessage = Date.now().toString();
const statusCode = 400;
const supertest = Supertest(app);

app.get('/error/internal', () => {
  throw new Error(errorMessage);
});
app.get('/error/code', () => {
  const error = new Error(errorMessage);
  error.code = statusCode;
  throw error;
});

app.get('/error/status', () => {
  const error = new Error(errorMessage);
  error.status = statusCode;
  throw error;
});

const errMessage = '{"message":"' + errorMessage + '"}'

app.use(errorHandler());

test('internal server error', async (t) => {
  const { error } = await supertest.get('/error/internal');
  t.is(error.status, 500);
  t.is(error.text, errMessage);
  t.truthy(debugSpy.called);
});

test('internal with code', async (t) => {
  const { error } = await supertest.get('/error/status');
  t.is(error.status, statusCode);
  t.is(error.text, errMessage);
});

test('internal with status', async (t) => {
  const { error } = await supertest.get('/error/code');
  t.is(error.status, statusCode);
  t.is(error.text, errMessage);
});
