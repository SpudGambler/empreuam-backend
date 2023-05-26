const services = require("../services/index");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const entrepreneurData = await services.entrepreneur.getAll();
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
    const entrepreneurData = await services.entrepreneur.getById(user_id);
    if (entrepreneurData === null) {
      res.status(200).json({ message: "No Entrepreneur Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: entrepreneurData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const { usuario_id, celular } = req.body;
  try {
    const resultData = await services.entrepreneur.createOne(
      usuario_id,
      celular
    );
    if (resultData === null) {
      res.status(500).json({ message: "Entrepreneur could not be created" });
    } else {
      res.status(201).json({
        message: "Entrepreneur successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { user_id } = req.params;
  const { celular } = req.body;
  try {
    const entrepreneurUpdated = await services.entrepreneur.updateOne(
      user_id,
      celular
    );
    if (!entrepreneurUpdated)
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
    const entrepreneurDeleted = await services.entrepreneur.deleteOne(user_id);
    if (!entrepreneurDeleted)
      return res.status(500).json({ message: "Delete failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
