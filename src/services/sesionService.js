const models = require("../models/index");
const service = {};

service.getAll = async function () {
  try {
    const sesionData = await models.sesion.findAll();
    return sesionData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (id) {
  try {
    const sesionData = await models.sesion.findAll({
      where: { id: id },
    });
    if (sesionData.length === 0) {
      return null;
    } else {
      return sesionData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (
  seguimiento_id,
  fecha_inicio,
  fecha_fin,
  descripcion
) {
  try {
    const resultData = {};
    await models.sesion
      .create({
        seguimiento_id: seguimiento_id,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        descripcion: descripcion,
      })
      .then((sesionResult) => {
        resultData.id = sesionResult.dataValues.id;
        resultData.seguimiento_id = sesionResult.dataValues.seguimiento_id;
        resultData.fecha_inicio = sesionResult.dataValues.fecha_inicio;
        resultData.fecha_fin = sesionResult.dataValues.fecha_fin;
        resultData.descripcion = sesionResult.dataValues.descripcion;
      });
    return resultData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (
  id,
  seguimiento_id,
  fecha_inicio,
  fecha_fin,
  descripcion
) {
  try {
    let updateValue = false;
    await models.sesion
      .findAll({
        where: { id: id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.sesion
            .update(
              {
                seguimiento_id: seguimiento_id,
                fecha_inicio: fecha_inicio,
                fecha_fin: fecha_fin,
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
    await models.sesion.findAll({ where: { id: id } }).then(async (result) => {
      if (result.length > 0) {
        await models.sesion.destroy({ where: { id: id } });
        deleteValue = true;
      }
    });
    return deleteValue;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

module.exports = service;
