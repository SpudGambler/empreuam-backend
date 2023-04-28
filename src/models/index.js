const userModel = require("./userModel");
const entreprenaurModel = require("./entreprenaurModel");
const businessModel = require("./businessModel");
const commentModel = require("./commentModel");
const followUpModel = require("./followUpModel");
const sesionModel = require("./sesionModel");
const taskModel = require("./taskModel");

const models = {};
models.user = userModel;
models.entreprenaur = entreprenaurModel;
models.business = businessModel;
models.comment = commentModel;
models.followUp = followUpModel;
models.sesion = sesionModel;
models.task = taskModel;
module.exports = models;
