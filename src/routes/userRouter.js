const express = require("express");
const routerUser = express.Router();
const controller = require("../controllers/index");

routerUser.post("/user", controller.user.createNew);

routerUser.get("/", controller.user.getAll);

routerUser.get("/:id", controller.user.getById);

routerUser.put("/:id", controller.user.editAt);

routerUser.delete("/:id", controller.user.deleteUser);

routerUser.post(
  "/user/register/entrepreneur",
  controller.user.createNewEntrepreneurUser
);

routerUser.post("/user/register/adviser", controller.user.createNewAdviserUser);

routerUser.post("/user/register/admin", controller.user.createNewAdmin);

module.exports = routerUser;
