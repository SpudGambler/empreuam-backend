const express = require("express");
const routerUser = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerUser.get(
  "/",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.user.getAll
);

routerUser.get(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.user.getById
);

routerUser.post(
  "/user",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.user.validateCreate,
  controllers.user.createNew
);

routerUser.put(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.user.validateUpdate,
  controllers.user.editAt
);

routerUser.delete(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.user.delete
);

module.exports = routerUser;
