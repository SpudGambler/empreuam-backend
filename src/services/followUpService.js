const models = require("../models/index");
const service = {};

service.getMine = async function (usuario_id) {
  try {
    const followUpData = await models.followUp.findAll({
      where: { emprendedor_id: usuario_id },
    });
    return followUpData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getAll = async function () {
  try {
    const followUpData = await models.followUp.findAll();
    return followUpData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (id) {
  try {
    const followUpData = await models.followUp.findAll({
      where: { id: id },
    });
    if (followUpData.length === 0) {
      return null;
    } else {
      return followUpData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (
  emprendedor_id,
  asesor_id,
  negocio_id,
  categoria_proyecto,
  descripcion,
  status,
  fecha_inicio
) {
  try {
    const resultData = {};
    await models.followUp
      .create({
        emprendedor_id: emprendedor_id,
        asesor_id: asesor_id,
        negocio_id: negocio_id,
        categoria_proyecto: categoria_proyecto,
        descripcion: descripcion,
        status: status,
        fecha_inicio: fecha_inicio,
      })
      .then((followUpResult) => {
        resultData.id = followUpResult.dataValues.id;
        resultData.emprendedor_id = followUpResult.dataValues.emprendedor_id;
        resultData.asesor_id = followUpResult.dataValues.asesor_id;
        resultData.negocio_id = followUpResult.dataValues.negocio_id;
        resultData.categoria_proyecto =
          followUpResult.dataValues.categoria_proyecto;
        resultData.descripcion = followUpResult.dataValues.descripcion;
        resultData.status = followUpResult.dataValues.status;
        resultData.fecha_inicio = followUpResult.dataValues.fecha_inicio;
      });
    return resultData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (
  id,
  emprendedor_id,
  asesor_id,
  negocio_id,
  categoria_proyecto,
  descripcion,
  status,
  fecha_inicio
) {
  try {
    let updateValue = false;
    await models.followUp
      .findAll({
        where: { id: id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.followUp
            .update(
              {
                emprendedor_id: emprendedor_id,
                asesor_id: asesor_id,
                negocio_id: negocio_id,
                categoria_proyecto: categoria_proyecto,
                descripcion: descripcion,
                status: status,
                fecha_inicio: fecha_inicio,
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
    await models.followUp
      .findAll({ where: { id: id } })
      .then(async (result) => {
        if (result.length > 0) {
          await models.followUp.destroy({ where: { id: id } });
          deleteValue = true;
        }
      });
    return deleteValue;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

module.exports = service;
