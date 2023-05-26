const authController = require("./authController");
const userController = require("./userController");
const entrepreneurController = require("./entrepreneurController");
const adviserController = require("./adviserController");
const adminController = require("./adminController");
const businessController = require("./businessController");
const followUpController = require("./followUpController");
const sesionController = require("./sesionController");
const taskController = require("./taskController");
const commentController = require("./commentController");

let controllers = {};

controllers.auth = authController;
controllers.user = userController;
controllers.entrepreneur = entrepreneurController;
controllers.adviser = adviserController;
controllers.admin = adminController;
controllers.business = businessController;
controllers.followUp = followUpController;
controllers.sesion = sesionController;
controllers.task = taskController;
controllers.comment = commentController;

module.exports = controllers;
