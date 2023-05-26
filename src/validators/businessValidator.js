const { check } = require("express-validator");
const helpers = require("../helpers/index");
const validator = {};

validator.validateCreate = [
  check("nombre").exists().notEmpty(),
  check("sector").exists().notEmpty(),
  check("descripcion").exists().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateUpdate = [
  check("usuario_id").optional().notEmpty(),
  check("nombre").optional().notEmpty(),
  check("sector").optional().notEmpty(),
  check("descripcion").optional().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

module.exports = validator;
