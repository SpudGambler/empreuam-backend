const express = require("express");
const routerBusiness = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerBusiness.get(
  "/me",
  [middlewares.authJwt.verifyToken],
  controllers.business.getMine
);

routerBusiness.get(
  "/",
  [middlewares.authJwt.verifyToken /* , middlewares.authJwt.isAdmin */],
  controllers.business.getAll
);

routerBusiness.get(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.business.getById
);

routerBusiness.post(
  "/business",
  [middlewares.authJwt.verifyToken],
  validators.business.validateCreate,
  controllers.business.createNew
);

routerBusiness.put(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.business.validateUpdate,
  controllers.business.editAt
);

routerBusiness.delete(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.business.delete
);

module.exports = routerBusiness;
