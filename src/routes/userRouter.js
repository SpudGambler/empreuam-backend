const express = require("express");
const routerUser = express.Router();
const controller = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerUser.get(
  "/",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controller.user.getAll
);

routerUser.get(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controller.user.getById
);

routerUser.post(
  "/user",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.user.validateCreate,
  controller.user.createNew
);

routerUser.put(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.user.validateUpdate,
  controller.user.editAt
);

routerUser.delete(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controller.user.delete
);

module.exports = routerUser;
