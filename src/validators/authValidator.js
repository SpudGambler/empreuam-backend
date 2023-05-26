const { check } = require("express-validator");
const helpers = require("../helpers/index");
const validator = {};

validator.validateCreateEntrepreneur = [
  check("nombre").exists().notEmpty(),
  check("apellido").exists().notEmpty(),
  check("documento").exists().isNumeric().notEmpty(),
  check("email").exists().isEmail().notEmpty(),
  check("password").exists().isLength({ min: 8 }).notEmpty(),
  check("celular").exists().isNumeric().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateCreateAdviser = [
  check("nombre").exists().notEmpty(),
  check("apellido").exists().notEmpty(),
  check("documento").exists().isNumeric().notEmpty(),
  check("email").exists().isEmail().notEmpty(),
  check("password").exists().isLength({ min: 8 }).notEmpty(),
  check("sector").exists().notEmpty(),
  check("titulo").exists().notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

validator.validateLogin = [
  check("email").exists().isEmail().notEmpty(),
  check("password").exists().isLength({ min: 8 }).notEmpty(),
  (res, req, next) => {
    helpers.validate.validateResult(res, req, next);
  },
];

module.exports = validator;
