const express = require("express");
const routerUser = express.Router();
const controller = require("../controllers/index");
const middlewares = require("../middleware/index");

routerUser.get("/", controller.user.getAll);

routerUser.get("/:id", controller.user.getById);

routerUser.post(
  "/user",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  controller.user.createNew
);

routerUser.put("/:id", controller.user.editAt);

routerUser.delete("/:id", controller.user.delete);

module.exports = routerUser;
