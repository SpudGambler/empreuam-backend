const models = require("../models/index");
const { Op } = require("sequelize");
const service = {};

service.getAll = async function () {
  try {
    const entrepreneurData = await models.entrepreneur.findAll();
    return entrepreneurData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (usuario_id) {
  try {
    const entrepreneurData = await models.entrepreneur.findAll({
      where: { usuario_id: usuario_id },
    });
    if (entrepreneurData.length === 0) {
      return null;
    } else {
      return entrepreneurData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (usuario_id, celular) {
  try {
    const checkEntrepreneurData = await models.entrepreneur.findAll({
      where: { usuario_id: usuario_id },
    });
    if (checkEntrepreneurData.length > 0) {
      return null;
    } else {
      const resultData = {};
      await models.entrepreneur
        .create({
          usuario_id: usuario_id,
          celular: celular,
        })
        .then((entrepreneurResult) => {
          resultData.usuario_id = entrepreneurResult.dataValues.usuario_id;
          resultData.celular = entrepreneurResult.dataValues.celular;
        });
      return resultData;
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (usuario_id, celular) {
  try {
    let updateValue = false;
    await models.entrepreneur
      .findAll({
        where: { usuario_id: usuario_id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.entrepreneur
            .update(
              {
                celular: celular,
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
    await models.entrepreneur
      .findAll({ where: { usuario_id: usuario_id } })
      .then(async (result) => {
        if (result.length > 0) {
          await models.entrepreneur.destroy({
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
