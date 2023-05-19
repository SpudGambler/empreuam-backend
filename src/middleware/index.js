const authJwt = require("./authJwt");
let middlewares = {};

middlewares.authJwt = authJwt;

module.exports = middlewares;
