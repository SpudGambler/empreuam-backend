const { validationResult } = require("express-validator");
const helper = {};

helper.validateResult = function (req, res, next) {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = helper;
