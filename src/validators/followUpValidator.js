const { check } = require("express-validator");
const helpers = require("../helpers/index");
const validator = {};

validator.validateCreate = [
  check("asesor_id").exists(),
  check("negocio_id").exists().notEmpty(),
  check("categoria_proyecto").exists().notEmpty(),
  check("descripcion").exists().notEmpty(),
  check("status").exists().notEmpty(),
  check("fecha_inicio").exists() /* .isDate() */,
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateUpdate = [
  check("emprendedor_id").optional().notEmpty(),
  check("asesor_id").optional().notEmpty(),
  check("negocio_id").optional().notEmpty(),
  check("categoria_proyecto").optional().notEmpty(),
  check("descripcion").optional().notEmpty(),
  check("status").optional().notEmpty(),
  check("fecha_inicio").optional().isDate().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

module.exports = validator;
