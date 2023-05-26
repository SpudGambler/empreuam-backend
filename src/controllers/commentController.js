const services = require("../services/index");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const commentData = await services.comment.getAll();
    if (commentData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: commentData });
    } else {
      res.status(200).json({ message: "No Comments Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { id } = req.params;
  try {
    const commentData = await services.comment.getById(id);
    if (commentData === null) {
      res.status(200).json({ message: "No Comment Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: commentData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const { sesion_id, tarea_id, seguimiento_id, descripcion, tipo } = req.body;
  try {
    const resultData = await services.comment.createOne(
      sesion_id,
      tarea_id,
      seguimiento_id,
      descripcion,
      tipo
    );
    if (resultData === null) {
      res.status(500).json({ message: "Server Error" });
    } else {
      res.status(201).json({
        message: "Comment successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { id } = req.params;
  const { descripcion } = req.body;
  try {
    const commentUpdated = await services.comment.updateOne(id, descripcion);
    if (!commentUpdated)
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
    const commentDeleted = await services.comment.deleteOne(id);
    if (!commentDeleted)
      return res.status(500).json({ message: "Delete failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
