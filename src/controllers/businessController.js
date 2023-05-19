const services = require("../services/index");
const { Op } = require("sequelize");
const controller = {};

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

module.exports = controller;
