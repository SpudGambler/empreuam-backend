const express = require("express");
const routerFollowUp = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerFollowUp.get(
  "/me",
  [middlewares.authJwt.verifyToken],
  controllers.followUp.getMine
);

routerFollowUp.get(
  "/",
  [middlewares.authJwt.verifyToken /* middlewares.authJwt.isAdmin */],
  controllers.followUp.getAll
);

routerFollowUp.get(
  "/:id",
  [middlewares.authJwt.verifyToken /* middlewares.authJwt.isAdmin */],
  controllers.followUp.getById
);

routerFollowUp.post(
  "/followUp",
  [middlewares.authJwt.verifyToken],
  validators.followUp.validateCreate,
  controllers.followUp.createNew
);

routerFollowUp.put(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.followUp.validateUpdate,
  controllers.followUp.editAt
);

routerFollowUp.delete(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.followUp.delete
);

module.exports = routerFollowUp;
