const services = require("../services/index");
const controller = {};

controller.getMine = async function (req, res) {
  try {
    const usuario_id = req.userId;
    const businessData = await services.business.getMine(usuario_id);
    if (businessData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: businessData });
    } else {
      res.status(200).json({ message: "No Businesses Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getAll = async function (req, res) {
  try {
    const businessData = await services.business.getAll();
    if (businessData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: businessData });
    } else {
      res.status(200).json({ message: "No Businesses Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { id } = req.params;
  try {
    const businessData = await services.business.getById(id);
    if (businessData === null) {
      res.status(200).json({ message: "No Business Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: businessData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const { nombre, sector, descripcion } = req.body;
  const usuario_id = req.userId;
  try {
    const resultData = await services.business.createOne(
      usuario_id,
      nombre,
      sector,
      descripcion
    );
    if (resultData === null) {
      res.status(500).json({ message: "Business could not be created" });
    } else {
      res.status(201).json({
        message: "Business successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { id } = req.params;
  const { usuario_id, nombre, sector, descripcion } = req.body;
  try {
    const businessUpdated = await services.business.updateOne(
      id,
      usuario_id,
      nombre,
      sector,
      descripcion
    );
    if (!businessUpdated)
      return res.status(500).json({ message: "Update failed" });
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
    const businessDeleted = await services.business.deleteOne(id);
    if (!businessDeleted)
      return res.status(500).json({ message: "Update failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
