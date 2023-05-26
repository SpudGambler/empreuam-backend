const { check } = require("express-validator");
const helpers = require("../helpers/index");
const validator = {};

validator.validateCreate = [
  check("sesion_id").exists(),
  check("tarea_id").exists(),
  check("seguimiento_id").exists(),
  check("descripcion").exists().notEmpty(),
  check("tipo").exists().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateUpdate = [
  check("descripcion").optional().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

module.exports = validator;
