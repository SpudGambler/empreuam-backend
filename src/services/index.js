const userService = require("./userService");
const authService = require("./authService");
const businessService = require("./businessService");
let services = {};

services.user = userService;
services.auth = authService;
services.business = businessService;

module.exports = services;
