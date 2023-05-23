const userValidator = require("./userValidator");
const authValidator = require("./authValidator");
const validators = {};

validators.user = userValidator;
validators.auth = authValidator;

module.exports = validators;
