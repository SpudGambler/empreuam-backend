const express = require("express");
const routerTask = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerTask.get(
  "/",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.task.getAll
);

routerTask.get(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.task.getById
);

routerTask.post(
  "/task",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.task.validateCreate,
  controllers.task.createNew
);

routerTask.put(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.task.validateUpdate,
  controllers.task.editAt
);

routerTask.delete(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.task.delete
);

module.exports = routerTask;
