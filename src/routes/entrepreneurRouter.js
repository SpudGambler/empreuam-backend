const express = require("express");
const routerEntrepreneur = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerEntrepreneur.get(
  "/",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.entrepreneur.getAll
);

routerEntrepreneur.get(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.entrepreneur.getById
);

routerEntrepreneur.post(
  "/entrepreneur",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.entrepreneur.validateCreate,
  controllers.entrepreneur.createNew
);

routerEntrepreneur.put(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.entrepreneur.validateUpdate,
  controllers.entrepreneur.editAt
);

routerEntrepreneur.delete(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.entrepreneur.delete
);

module.exports = routerEntrepreneur;
