const express = require("express");
const routerSesion = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerSesion.get(
  "/",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.sesion.getAll
);

routerSesion.get(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.sesion.getById
);

routerSesion.post(
  "/sesion",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.sesion.validateCreate,
  controllers.sesion.createNew
);

routerSesion.put(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.sesion.validateUpdate,
  controllers.sesion.editAt
);

routerSesion.delete(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.sesion.delete
);

module.exports = routerSesion;
