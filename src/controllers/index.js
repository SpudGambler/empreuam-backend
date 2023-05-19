const userController = require("./userController");
const entrepreneurController = require("./entrepreneurController");
const authController = require("./authController");
const businessController = require("./businessController");
let controllers = {};

controllers.user = userController;
controllers.entrepreneur = entrepreneurController;
controllers.auth = authController;
controllers.business = businessController;

module.exports = controllers;
