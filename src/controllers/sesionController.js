const services = require("../services/index");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const sesionData = await services.sesion.getAll();
    if (sesionData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: sesionData });
    } else {
      res.status(200).json({ message: "No Sesions Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { id } = req.params;
  try {
    const sesionData = await services.sesion.getById(id);
    if (sesionData === null) {
      res.status(200).json({ message: "No Sesion Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: sesionData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const { seguimiento_id, fecha_inicio, fecha_fin, descripcion } = req.body;
  try {
    const resultData = await services.sesion.createOne(
      seguimiento_id,
      fecha_inicio,
      fecha_fin,
      descripcion
    );
    if (resultData === null) {
      res.status(500).json({ message: "Server Error" });
    } else {
      res.status(201).json({
        message: "Sesion successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { id } = req.params;
  const { seguimiento_id, fecha_inicio, fecha_fin, descripcion } = req.body;
  try {
    const sesionUpdated = await services.sesion.updateOne(
      id,
      seguimiento_id,
      fecha_inicio,
      fecha_fin,
      descripcion
    );
    if (!sesionUpdated)
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
    const sesionDeleted = await services.sesion.deleteOne(id);
    if (!sesionDeleted)
      return res.status(500).json({ message: "Delete failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
