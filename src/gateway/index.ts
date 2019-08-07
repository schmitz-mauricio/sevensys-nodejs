import * as http from "http";
import * as express from "express";
import * as httpProxy from 'express-http-proxy';
import * as dotenv from 'dotenv';

const app = express()
dotenv.config();

const testServiceProxy = httpProxy(`http://localhost:${process.env.TEST_PORT || 3001}`);
const productServiceProxy = httpProxy(`http://localhost:${process.env.PRODUCT_PORT || 3002}`);
const userServiceProxy = httpProxy(`http://localhost:${process.env.USER_PORT || 3003}`);

const auth = require('../middlewares/auth');
// Proxy request
app.all('/text', (req, res, next) => {
    testServiceProxy(req, res, next);
  })

app.all('/user', (req, res, next) => {
  userServiceProxy(req, res, next);
})

app.all('/product', auth.verifyJWT, (req, res, next) => {
  productServiceProxy(req, res, next);
})

var server = http.createServer(app);
server.listen(3000);