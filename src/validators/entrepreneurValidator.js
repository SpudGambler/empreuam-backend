const { check } = require("express-validator");
const helpers = require("../helpers/index");
const validator = {};

validator.validateCreate = [
  check("usuario_id").exists().notEmpty(),
  check("celular").exists().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateUpdate = [
  check("celular").optional().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

module.exports = validator;
