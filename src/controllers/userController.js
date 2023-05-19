const models = require("../models/index");
const services = require("../services/index");
const bcryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const userData = await services.user.getAll();
    if (userData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: userData });
    } else {
      res.status(200).json({ message: "No Users Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { id } = req.params;
  try {
    const userData = await services.user.getById(id);
    if (userData === null) {
      res.status(200).json({ message: "No Users Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: userData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const { nombre, apellido, documento, email, password, rol } = req.body;
  const numSaltRounds = 10;
  const hashPassword = await bcryptjs.hash(password, numSaltRounds);
  try {
    const resultData = await services.user.createOne(
      nombre,
      apellido,
      documento,
      email,
      hashPassword,
      rol
    );
    if (resultData === null) {
      res
        .status(500)
        .json({ message: "Username or document has already in use" });
    } else {
      res.status(201).json({
        message: "User successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { id } = req.params;
  try {
    await models.user
      .findAll({
        where: { id: id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.user.update(
            {
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              documento: req.body.documento,
              email: req.body.email,
              password: req.body.password,
              rol: req.body.rol,
            },
            { where: { id: id } }
          );
          res.status(200).json({
            message: "update successful",
            data: {
              id: req.body.id,
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              documento: req.body.documento,
              email: req.body.email,
              password: req.body.password,
              rol: req.body.rol,
            },
          });
        } else {
          res.status(500).json({ message: "Update failed" });
        }
      });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.delete = async function (req, res) {
  const { id } = req.params;
  try {
    await models.user.findAll({ where: { id: id } }).then(async (result) => {
      if (result.length > 0) {
        await models.user.destroy({ where: { id: id } });
        res.status(200).json({ message: "Delete user successfully" });
      } else {
        res.status(404).json({ message: "Id user not found" });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
