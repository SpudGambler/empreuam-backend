const models = require("../models/index");
const { Op } = require("sequelize");
const service = {};

service.getMine = async function (usuario_id) {
  try {
    const businessData = await models.business.findAll({
      where: { usuario_id: usuario_id },
    });
    return businessData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getAll = async function () {
  try {
    const businessData = await models.business.findAll();
    return businessData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (id) {
  try {
    const businessData = await models.business.findAll({
      where: { id: id },
    });
    if (businessData.length === 0) {
      return null;
    } else {
      return businessData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (usuario_id, nombre, sector, descripcion) {
  try {
    const checkBusinessData = await models.business.findAll({
      where: {
        nombre: nombre,
      },
    });
    if (checkBusinessData.length > 0) {
      return null;
    } else {
      let resultData = {};
      await models.business
        .create({
          nombre: nombre,
          usuario_id: usuario_id,
          sector: sector,
          descripcion: descripcion,
        })
        .then((businessResult) => {
          resultData.id = businessResult.dataValues.id;
          resultData.usuario_id = businessResult.dataValues.usuario_id;
          resultData.nombre = businessResult.dataValues.nombre;
          resultData.sector = businessResult.dataValues.sector;
          resultData.descripcion = businessResult.dataValues.descripcion;
        });
      return resultData;
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (
  id,
  usuario_id,
  nombre,
  sector,
  descripcion
) {
  try {
    let updateValue = false;
    await models.business
      .findAll({
        where: { id: id },
      })
      .then(async (result) => {
        console.log(result.length);
        if (result.length > 0) {
          await models.business
            .update(
              {
                usuario_id: usuario_id,
                nombre: nombre,
                sector: sector,
                descripcion: descripcion,
              },
              { where: { id: id } }
            )
            .then(() => {
              updateValue = true;
            });
        }
      });
    return updateValue;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.deleteOne = async function (id) {
  try {
    let deleteValue = false;
    await models.business
      .findAll({ where: { id: id } })
      .then(async (result) => {
        if (result.length > 0) {
          await models.business.destroy({ where: { id: id } });
          deleteValue = true;
        }
      });
    return deleteValue;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

module.exports = service;
