const services = require("../services/index");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    const adviserData = await services.adviser.getAll();
    if (adviserData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: adviserData });
    } else {
      res.status(200).json({ message: "No Advisers Detected", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getById = async function (req, res) {
  const { user_id } = req.params;
  try {
    const adviserData = await services.adviser.getById(user_id);
    if (adviserData === null) {
      res.status(200).json({ message: "No Adviser Detected", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Connection successful", data: adviserData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.createNew = async function (req, res) {
  const { usuario_id, sector, titulo } = req.body;
  try {
    const resultData = await services.adviser.createOne(
      usuario_id,
      sector,
      titulo
    );
    if (resultData === null) {
      res.status(500).json({ message: "Adviser could not be created" });
    } else {
      res.status(201).json({
        message: "Adviser successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.editAt = async function (req, res) {
  const { user_id } = req.params;
  const { sector, titulo } = req.body;
  try {
    const adviserUpdated = await services.adviser.updateOne(
      user_id,
      sector,
      titulo
    );
    if (!adviserUpdated)
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
    const adviserDeleted = await services.adviser.deleteOne(user_id);
    if (!adviserDeleted)
      return res.status(500).json({ message: "Delete failed" });
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
