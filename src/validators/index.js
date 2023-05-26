const authValidator = require("./authValidator");
const userValidator = require("./userValidator");
const entrepreneurValidator = require("./entrepreneurValidator");
const adviserValidator = require("./adviserValidator");
const adminValidator = require("./adminValidator");
const businessValidator = require("./businessValidator");
const followUpValidator = require("./followUpValidator");
const sesionValidator = require("./sesionValidator");
const taskValidator = require("./taskValidator");
const commentValidator = require("./commentValidator");

const validators = {};

validators.auth = authValidator;
validators.user = userValidator;
validators.entrepreneur = entrepreneurValidator;
validators.adviser = adviserValidator;
validators.admin = adminValidator;
validators.business = businessValidator;
validators.followUp = followUpValidator;
validators.sesion = sesionValidator;
validators.task = taskValidator;
validators.comment = commentValidator;

module.exports = validators;
