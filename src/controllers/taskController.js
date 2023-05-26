const services = require("../services/index");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const taskData = await services.task.getAll();
    if (taskData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: taskData });
    } else {
      res.status(200).json({ message: "No Tasks Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { id } = req.params;
  try {
    const taskData = await services.task.getById(id);
    if (taskData === null) {
      res.status(200).json({ message: "No Task Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: taskData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const { sesion_id, estado, descripcion, data, fecha_entrega } = req.body;
  try {
    const resultData = await services.task.createOne(
      sesion_id,
      estado,
      descripcion,
      data,
      fecha_entrega
    );
    if (resultData === null) {
      res.status(500).json({ message: "Server Error" });
    } else {
      res.status(201).json({
        message: "Task successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { id } = req.params;
  const { sesion_id, estado, descripcion, data, fecha_entrega } = req.body;
  try {
    const taskUpdated = await services.task.updateOne(
      id,
      sesion_id,
      estado,
      descripcion,
      data,
      fecha_entrega
    );
    if (!taskUpdated) return res.status(500).json({ message: "Update failed" });
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
    const taskDeleted = await services.task.deleteOne(id);
    if (!taskDeleted) return res.status(500).json({ message: "Delete failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
