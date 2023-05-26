const express = require("express");
const routerAdmin = express.Router();
const controllers = require("../controllers/index");
const middlewares = require("../middleware/index");
const validators = require("../validators/index");

routerAdmin.get(
  "/",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.admin.getAll
);

routerAdmin.get(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.admin.getById
);

routerAdmin.post(
  "/admin",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.admin.validateCreate,
  controllers.admin.createNew
);

routerAdmin.put(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.admin.editAt
);

routerAdmin.delete(
  "/:user_id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controllers.admin.delete
);

module.exports = routerAdmin;
