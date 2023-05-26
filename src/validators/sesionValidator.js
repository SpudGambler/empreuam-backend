const { check } = require("express-validator");
const helpers = require("../helpers/index");
const validator = {};

validator.validateCreate = [
  check("seguimiento_id").exists().notEmpty(),
  check("fecha_inicio").exists().isDate().notEmpty(),
  check("fecha_fin").exists().isDate().notEmpty(),
  check("descripcion").exists().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateUpdate = [
  check("seguimiento_id").optional().notEmpty(),
  check("fecha_inicio").optional().isDate().notEmpty(),
  check("fecha_fin").optional().isDate().notEmpty(),
  check("descripcion").optional().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

module.exports = validator;
