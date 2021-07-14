const express = require('express');
const ApiRouter = express.Router();

const fetch = require('node-fetch');
const url = 'https://api-pub.bitfinex.com/v2/';

// eslint-disable-next-line consistent-return
async function request(path) {
  try {
    const req = await fetch(`${url}/${path}`);
    const response = await req.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

ApiRouter.get('/:request(*)', async function(req, res) {
  const data = await request(req.params.request);
  res.json(data);
});

module.exports = ApiRouter;
