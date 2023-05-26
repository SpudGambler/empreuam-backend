const services = require("../services/index");
const controller = {};

controller.getMine = async function (req, res) {
  try {
    const usuario_id = req.userId;
    const followUpData = await services.followUp.getMine(usuario_id);
    if (followUpData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: followUpData });
    } else {
      res.status(200).json({ message: "No Businesses Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getAll = async function (req, res) {
  try {
    const followUpData = await services.followUp.getAll();
    if (followUpData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: followUpData });
    } else {
      res.status(200).json({ message: "No Follow-Ups Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { id } = req.params;
  try {
    const followUpData = await services.followUp.getById(id);
    if (followUpData === null) {
      res.status(200).json({ message: "No FollowUp Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: followUpData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const {
    asesor_id,
    negocio_id,
    categoria_proyecto,
    descripcion,
    status,
    fecha_inicio,
  } = req.body;
  const usuario_id = req.userId;
  try {
    const resultData = await services.followUp.createOne(
      usuario_id,
      asesor_id,
      negocio_id,
      categoria_proyecto,
      descripcion,
      status,
      fecha_inicio
    );
    if (resultData === null) {
      res.status(500).json({ message: "Server Error" });
    } else {
      res.status(201).json({
        message: "FollowUp successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { id } = req.params;
  const {
    emprendedor_id,
    asesor_id,
    negocio_id,
    categoria_proyecto,
    descripcion,
    status,
    fecha_inicio,
  } = req.body;
  try {
    const followUpUpdated = await services.followUp.updateOne(
      id,
      emprendedor_id,
      asesor_id,
      negocio_id,
      categoria_proyecto,
      descripcion,
      status,
      fecha_inicio
    );
    if (!followUpUpdated)
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
    const followUpDeleted = await services.followUp.deleteOne(id);
    if (!followUpDeleted)
      return res.status(500).json({ message: "Delete failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
