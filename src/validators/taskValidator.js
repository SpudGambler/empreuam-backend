const { check } = require("express-validator");
const helpers = require("../helpers/index");
const validator = {};

validator.validateCreate = [
  check("sesion_id").exists().notEmpty(),
  check("estado").exists().notEmpty(),
  check("descripcion").exists().notEmpty(),
  check("data").exists().notEmpty(),
  check("fecha_entrega").exists().isDate().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateUpdate = [
  check("sesion_id").optional().notEmpty(),
  check("estado").optional().notEmpty(),
  check("descripcion").optional().notEmpty(),
  check("data").optional().notEmpty(),
  check("fecha_entrega").optional().isDate().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

module.exports = validator;
