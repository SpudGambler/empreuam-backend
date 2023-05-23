const { check } = require("express-validator");
const helpers = require("../helpers/index");
const validator = {};

validator.validateCreate = [
  check("nombre").exists().notEmpty(),
  check("apellido").exists().notEmpty(),
  check("documento").exists().isNumeric().notEmpty(),
  check("email").exists().isEmail().notEmpty(),
  check("password").exists().isLength({ min: 8 }).notEmpty(),
  check("rol").exists().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateUpdate = [
  check("nombre").optional().notEmpty(),
  check("apellido").optional().notEmpty(),
  check("documento").optional().isNumeric().notEmpty(),
  check("email").optional().isEmail().notEmpty(),
  check("password").optional().isLength({ min: 8 }).notEmpty(),
  check("rol").optional().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

module.exports = validator;
