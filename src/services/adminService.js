const models = require("../models/index");
const { Op } = require("sequelize");
const service = {};

service.getAll = async function () {
  try {
    const adminData = await models.admin.findAll();
    return adminData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (usuario_id) {
  try {
    const adminData = await models.admin.findAll({
      where: { usuario_id: usuario_id },
    });
    if (adminData.length === 0) {
      return null;
    } else {
      return adminData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (usuario_id) {
  try {
    const checkAdminData = await models.admin.findAll({
      where: { usuario_id: usuario_id },
    });
    if (checkAdminData.length > 0) {
      return null;
    } else {
      const resultData = {};
      await models.admin
        .create({
          usuario_id: usuario_id,
        })
        .then((adminResult) => {
          resultData.usuario_id = adminResult.dataValues.usuario_id;
        });
      return resultData;
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (usuario_id) {
  try {
    let updateValue = false;
    await models.admin
      .findAll({
        where: { usuario_id: usuario_id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.admin
            .update(
              { usuario_id: usuario_id },
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
    await models.admin
      .findAll({ where: { usuario_id: usuario_id } })
      .then(async (result) => {
        if (result.length > 0) {
          await models.admin.destroy({
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
