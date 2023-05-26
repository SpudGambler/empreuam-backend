const models = require("../models/index");
const service = {};

service.getAll = async function () {
  try {
    const commentData = await models.comment.findAll();
    return commentData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (id) {
  try {
    const commentData = await models.comment.findAll({
      where: { id: id },
    });
    if (commentData.length === 0) {
      return null;
    } else {
      return commentData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (
  sesion_id,
  tarea_id,
  seguimiento_id,
  descripcion,
  tipo
) {
  try {
    const resultData = {};
    await models.comment
      .create({
        sesion_id: sesion_id,
        tarea_id: tarea_id,
        seguimiento_id: seguimiento_id,
        descripcion: descripcion,
        tipo: tipo,
      })
      .then((commentResult) => {
        resultData.id = commentResult.dataValues.id;
        resultData.sesion_id = commentResult.dataValues.sesion_id;
        resultData.tarea_id = commentResult.dataValues.tarea_id;
        resultData.seguimiento_id = commentResult.dataValues.seguimiento_id;
        resultData.descripcion = commentResult.dataValues.descripcion;
        resultData.tipo = commentResult.dataValues.tipo;
      });
    return resultData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (id, descripcion) {
  try {
    let updateValue = false;
    await models.comment
      .findAll({
        where: { id: id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.comment
            .update({ descripcion: descripcion }, { where: { id: id } })
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
    await models.comment.findAll({ where: { id: id } }).then(async (result) => {
      if (result.length > 0) {
        await models.comment.destroy({ where: { id: id } });
        deleteValue = true;
      }
    });
    return deleteValue;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

module.exports = service;
