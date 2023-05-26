const models = require("../models/index");
const service = {};

service.getAll = async function () {
  try {
    const taskData = await models.task.findAll();
    return taskData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (id) {
  try {
    const taskData = await models.task.findAll({
      where: { id: id },
    });
    if (taskData.length === 0) {
      return null;
    } else {
      return taskData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (
  sesion_id,
  estado,
  descripcion,
  data,
  fecha_entrega
) {
  try {
    const resultData = {};
    await models.task
      .create({
        sesion_id: sesion_id,
        estado: estado,
        descripcion: descripcion,
        data: data,
        fecha_entrega: fecha_entrega,
      })
      .then((taskResult) => {
        resultData.id = taskResult.dataValues.id;
        resultData.sesion_id = taskResult.dataValues.sesion_id;
        resultData.estado = taskResult.dataValues.estado;
        resultData.descripcion = taskResult.dataValues.descripcion;
        resultData.data = taskResult.dataValues.data;
        resultData.fecha_entrega = taskResult.dataValues.fecha_entrega;
      });
    return resultData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (
  id,
  sesion_id,
  estado,
  descripcion,
  data,
  fecha_entrega
) {
  try {
    let updateValue = false;
    await models.task
      .findAll({
        where: { id: id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.task
            .update(
              {
                sesion_id: sesion_id,
                estado: estado,
                descripcion: descripcion,
                data: data,
                fecha_entrega: fecha_entrega,
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
    await models.task.findAll({ where: { id: id } }).then(async (result) => {
      if (result.length > 0) {
        await models.task.destroy({ where: { id: id } });
        deleteValue = true;
      }
    });
    return deleteValue;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

module.exports = service;
