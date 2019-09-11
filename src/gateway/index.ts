import * as http from "http";
import * as express from "express";
import * as httpProxy from 'express-http-proxy';
import * as dotenv from 'dotenv';
import * as basicAuth from "express-basic-auth";

const app = express()
dotenv.config();

const testServiceProxy = httpProxy(`${process.env.HOST || 'http://localhost'}:${process.env.TEST_PORT || 3001}`);
const productServiceProxy = httpProxy(`${process.env.HOST || 'http://localhost'}:${process.env.PRODUCT_PORT || 3002}`);
const userServiceProxy = httpProxy(`${process.env.HOST || 'http://localhost'}:${process.env.USER_PORT || 3003}`);
const stockServiceProxy = httpProxy(`${process.env.HOST || 'http://localhost'}:${process.env.STOCK_PORT || 3004}`);
const orderServiceProxy = httpProxy(`${process.env.HOST || 'http://localhost'}:${process.env.ORDER_PORT || 3005}`);

const auth = require('../middlewares/auth');
const basicAuthMiddleware = require('../middlewares/basicAuth');

// Apidoc
app.use(`/apidoc`, express.static('dist/apidoc'));

app.all([`/user`, `/test`], basicAuth({ authorizer: basicAuthMiddleware.defaultAuth, authorizeAsync: true }));
// Proxy request
app.all('/text', (req, res, next) => {
    testServiceProxy(req, res, next);
  })

app.all(['/user', '/user/login'], (req, res, next) => {
  userServiceProxy(req, res, next);
})

app.all(['/product', '/product/*'], auth.verifyJWT, (req, res, next) => {
  productServiceProxy(req, res, next);
})

app.all(['/stock','/stock/*'], auth.verifyJWT, (req, res, next) => {
  stockServiceProxy(req, res, next);
})

app.all(['/order','/order/*'], auth.verifyJWT, (req, res, next) => {
  orderServiceProxy(req, res, next);
})

var server = http.createServer(app);
server.listen(3000);