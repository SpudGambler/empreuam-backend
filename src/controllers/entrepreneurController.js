const models = require("../models/index");
const { Op } = require("sequelize");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const entrepreneurData = await models.entrepreneur.findAll();
    if (entrepreneurData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: entrepreneurData });
    } else {
      res.status(200).json({ message: "No Entrepreneurs Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { user_id } = req.params;
  try {
    var entrepreneurData = await models.entrepreneur.findAll({
      where: { usuario_id: user_id },
    });
    if (entrepreneurData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: entrepreneurData });
    } else {
      res.status(200).json({ message: "No Entrepreneurs Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  try {
    const checkEntrepreneurData = await models.entrepreneur.findAll({
      where: {
        [Op.or]: {
          usuario_id: req.body.usuario_id,
        },
      },
    });
    const checkUserData = await models.user.findAll({
      where: { id: req.body.usuario_id },
    });
    if (checkEntrepreneurData.length > 0 || checkUserData.length !== 1) {
      if (checkEntrepreneurData.length > 0) {
        res
          .status(500)
          .json({ message: "An entrepreneur with that user already exist" });
      } else if (checkUserData.length !== 1) {
        res.status(500).json({ message: "User do not exists" });
      }
    } else {
      await models.entrepreneur
        .create({
          usuario_id: req.body.usuario_id,
          celular: req.body.celular,
        })
        .then((result) => {
          res.status(201).json({
            message: "Entrepreneur successful created",
            data: {
              usuario_id: req.body.usuario_id,
              celular: req.body.celular,
            },
          });
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
        where: { id: 1 },
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
