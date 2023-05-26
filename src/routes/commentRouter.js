const express = require("express");
const routerComment = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerComment.get(
  "/",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.comment.getAll
);

routerComment.get(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.comment.getById
);

routerComment.post(
  "/comment",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.comment.validateCreate,
  controllers.comment.createNew
);

routerComment.put(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.comment.validateUpdate,
  controllers.comment.editAt
);

routerComment.delete(
  "/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.comment.delete
);

module.exports = routerComment;
