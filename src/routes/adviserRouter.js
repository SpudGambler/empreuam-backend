const express = require("express");
const routerAdviser = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerAdviser.get(
  "/",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.adviser.getAll
);

routerAdviser.get(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.adviser.getById
);

routerAdviser.post(
  "/adviser",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.adviser.validateCreate,
  controllers.adviser.createNew
);

routerAdviser.put(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.adviser.validateUpdate,
  controllers.adviser.editAt
);

routerAdviser.delete(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.adviser.delete
);

module.exports = routerAdviser;
