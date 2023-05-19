const express = require("express");
const routerBusiness = express.Router();
const controller = require("../controllers/index");
const middlewares = require("../middleware/index");

routerBusiness.post(
  "/business",
  [middlewares.authJwt.verifyToken],
  controller.business.createNew
);

module.exports = routerBusiness;
