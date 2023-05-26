const services = require("../services/index");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const adminData = await services.admin.getAll();
    if (adminData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: adminData });
    } else {
      res.status(200).json({ message: "No Admin Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { user_id } = req.params;
  try {
    const adminData = await services.admin.getById(user_id);
    if (adminData === null) {
      res.status(200).json({ message: "No Admin Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: adminData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const { usuario_id } = req.body;
  try {
    const resultData = await services.admin.createOne(usuario_id);
    if (resultData === null) {
      res.status(500).json({ message: "Admin could not be created" });
    } else {
      res.status(201).json({
        message: "Admin successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { user_id } = req.params;
  try {
    const adminUpdated = await services.admin.updateOne(user_id);
    if (!adminUpdated)
      return res.status(500).json({ message: "Update failed" });
    res.status(200).json({
      message: "Update successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.delete = async function (req, res) {
  const { user_id } = req.params;
  try {
    const adminDeleted = await services.admin.deleteOne(user_id);
    if (!adminDeleted)
      return res.status(500).json({ message: "Delete failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
