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
  const { nombre, apellido, documento, email, password, rol } = req.body;
  try {
    let newPassword = password;
    if (password) {
      const numSaltRounds = 10;
      const hashPassword = await bcryptjs.hash(password, numSaltRounds);
      newPassword = hashPassword;
    }
    const userUpdated = await services.user.updateOne(
      id,
      nombre,
      apellido,
      documento,
      email,
      newPassword,
      rol
    );
    if (!userUpdated) return res.status(500).json({ message: "Update failed" });
    res.status(200).json({
      message: "Update successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.delete = async function (req, res) {
  const { id } = req.params;
  try {
    const userDeleted = await services.user.deleteOne(id);
    if (!userDeleted) return res.status(500).json({ message: "Update failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
