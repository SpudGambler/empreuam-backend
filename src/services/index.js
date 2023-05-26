const authService = require("./authService");
const userService = require("./userService");
const entrepreneurService = require("./entrepreneurServices");
const adviserService = require("./adviserService");
const adminService = require("./adminService");
const businessService = require("./businessService");
const followUpService = require("./followUpService");
const sesionService = require("./sesionService");
const taskService = require("./taskService");
const commentService = require("./commentService");
let services = {};

services.auth = authService;
services.user = userService;
services.business = businessService;
services.adviser = adviserService;
services.admin = adminService;
services.entrepreneur = entrepreneurService;
services.followUp = followUpService;
services.sesion = sesionService;
services.task = taskService;
services.comment = commentService;

module.exports = services;
