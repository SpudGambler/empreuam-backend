const models = require("../models/index");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const userData = await models.user.findAll();
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
    var userData = await models.user.findAll({
      where: { id: id },
    });
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

controller.createNew = async function (req, res) {
  try {
    console.log("Stamp 1");
    const checkData = await models.user.findAll({
      where: {
        [Op.or]: {
          email: req.body.email,
          documento: req.body.documento,
        },
      },
    });
    if (checkData.length > 0) {
      res
        .status(500)
        .json({ message: "Username or document has already in use" });
    } else {
      const password = (await bcrypt.hash(req.body.password, 10)).toString();
      await models.user
        .create({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          documento: req.body.documento,
          password: password,
          email: req.body.email,
          rol: req.body.rol,
        })
        .then((result) => {
          res.status(201).json({
            message: "User successful created",
            data: {
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              documento: req.body.documento,
              email: req.body.email,
              password: req.body.password,
              rol: req.body.rol,
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

controller.deleteUser = async function (req, res) {
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

controller.createNewEntrepreneurUser = async function (req, res) {
  try {
    const checkUserData = await models.user.findAll({
      where: {
        [Op.or]: {
          email: req.body.email,
          documento: req.body.documento,
        },
      },
    });
    if (checkUserData.length > 0) {
      res
        .status(500)
        .json({ message: "Username or document has already in use" });
    } else {
      const password = (await bcrypt.hash(req.body.password, 10)).toString();
      await models.user
        .create({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          documento: req.body.documento,
          password: password,
          email: req.body.email,
          rol: "e",
        })
        .then((result) => {
          models.entrepreneur
            .create({
              usuario_id: result.id,
              celular: req.body.celular,
            })
            .then((result) => {
              res.status(201).json({
                message: "User successful created",
                data: {
                  nombre: req.body.nombre,
                  apellido: req.body.apellido,
                  documento: req.body.documento,
                  email: req.body.email,
                  password: req.body.password,
                  celular: req.body.celular,
                  rol: req.body.rol,
                },
              });
            });
        });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNewAdviserUser = async function (req, res) {
  try {
    const checkUserData = await models.user.findAll({
      where: {
        [Op.or]: {
          email: req.body.email,
          documento: req.body.documento,
        },
      },
    });
    if (checkUserData.length > 0) {
      res
        .status(500)
        .json({ message: "Username or document has already in use" });
    } else {
      const password = (await bcrypt.hash(req.body.password, 10)).toString();
      await models.user
        .create({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          documento: req.body.documento,
          password: password,
          email: req.body.email,
          rol: "ad",
        })
        .then((result) => {
          models.adviser
            .create({
              usuario_id: result.id,
              celular: req.body.celular,
              sector: req.body.sector,
              titulo: req.body.titulo,
            })
            .then((result) => {
              res.status(201).json({
                message: "User successful created",
                data: {
                  nombre: req.body.nombre,
                  apellido: req.body.apellido,
                  documento: req.body.documento,
                  email: req.body.email,
                  password: req.body.password,
                  celular: req.body.celular,
                  rol: req.body.rol,
                  celular: req.body.celular,
                  sector: req.body.sector,
                  titulo: req.body.titulo,
                },
              });
            });
        });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNewAdmin = async function (req, res) {
  try {
    const checkUserData = await models.user.findAll({
      where: {
        [Op.or]: {
          email: req.body.email,
          documento: req.body.documento,
        },
      },
    });
    if (checkUserData.length > 0) {
      res
        .status(500)
        .json({ message: "Username or document has already in use" });
    } else {
      const password = (await bcrypt.hash(req.body.password, 10)).toString();
      await models.user
        .create({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          documento: req.body.documento,
          password: password,
          email: req.body.email,
          rol: "ad",
        })
        .then((result) => {
          models.admin
            .create({
              usuario_id: result.id,
            })
            .then((result) => {
              res.status(201).json({
                message: "User successful created",
                data: {
                  nombre: req.body.nombre,
                  apellido: req.body.apellido,
                  documento: req.body.documento,
                  email: req.body.email,
                  password: req.body.password,
                  rol: req.body.rol,
                },
              });
            });
        });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
