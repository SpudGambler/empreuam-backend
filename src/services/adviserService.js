const models = require("../models/index");
const { Op } = require("sequelize");
const service = {};

service.getAll = async function () {
  try {
    const adviserData = await models.adviser.findAll();
    return adviserData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (usuario_id) {
  try {
    const adviserData = await models.adviser.findAll({
      where: { usuario_id: usuario_id },
    });
    if (adviserData.length === 0) {
      return null;
    } else {
      return adviserData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (usuario_id, sector, titulo) {
  try {
    const checkAdviserData = await models.adviser.findAll({
      where: { usuario_id: usuario_id },
    });
    if (checkAdviserData.length > 0) {
      return null;
    } else {
      const resultData = {};
      await models.adviser
        .create({
          usuario_id: usuario_id,
          sector: sector,
          titulo: titulo,
        })
        .then((adviserResult) => {
          resultData.usuario_id = adviserResult.dataValues.usuario_id;
          resultData.sector = adviserResult.dataValues.sector;
          resultData.titulo = adviserResult.dataValues.titulo;
        });
      return resultData;
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (usuario_id, sector, titulo) {
  try {
    let updateValue = false;
    await models.adviser
      .findAll({
        where: { usuario_id: usuario_id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.adviser
            .update(
              {
                sector: sector,
                titulo: titulo,
              },
              { where: { usuario_id: usuario_id } }
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

service.deleteOne = async function (usuario_id) {
  try {
    let deleteValue = false;
    await models.adviser
      .findAll({ where: { usuario_id: usuario_id } })
      .then(async (result) => {
        if (result.length > 0) {
          await models.adviser.destroy({
            where: { usuario_id: usuario_id },
          });
          deleteValue = true;
        }
      });
    return deleteValue;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

module.exports = service;
