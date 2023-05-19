const express = require("express");
const routerEntrepreneur = express.Router();
const controller = require("../controllers/index");

routerEntrepreneur.get("/", controller.entrepreneur.getAll);

routerEntrepreneur.get("/:user_id", controller.entrepreneur.getById);

routerEntrepreneur.post("/entrepreneur", controller.entrepreneur.createNew);

module.exports = routerEntrepreneur;
