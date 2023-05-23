const models = require("../models/index");
const { Op } = require("sequelize");
const service = {};

service.getAll = async function () {
  try {
    const userData = await models.user.findAll();
    return userData;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.getById = async function (id) {
  try {
    const userData = await models.user.findAll({
      where: { id: id },
    });
    if (userData.length === 0) {
      return null;
    } else {
      return userData[0];
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.createOne = async function (
  nombre,
  apellido,
  documento,
  email,
  password,
  rol
) {
  try {
    const checkUserData = await models.user.findAll({
      where: {
        [Op.or]: {
          email: email,
          documento: documento,
        },
      },
    });
    if (checkUserData.length > 0) {
      return null;
    } else {
      const resultData = {};
      await models.user
        .create({
          nombre: nombre,
          apellido: apellido,
          documento: documento,
          password: password,
          email: email,
          rol: rol,
        })
        .then((userResult) => {
          resultData.id = userResult.dataValues.id;
          resultData.nombre = userResult.dataValues.nombre;
          resultData.apellido = userResult.dataValues.apellido;
          resultData.documento = userResult.dataValues.documento;
          resultData.password = userResult.dataValues.password;
          resultData.email = userResult.dataValues.email;
          resultData.rol = userResult.dataValues.rol;
        });
      return resultData;
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.updateOne = async function (
  id,
  nombre,
  apellido,
  documento,
  email,
  password,
  rol
) {
  try {
    let updateValue = false;
    await models.user
      .findAll({
        where: { id: id },
      })
      .then(async (result) => {
        if (result.length > 0) {
          await models.user
            .update(
              {
                nombre: nombre,
                apellido: apellido,
                documento: documento,
                email: email,
                password: password,
                rol: rol,
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
    await models.user.findAll({ where: { id: id } }).then(async (result) => {
      if (result.length > 0) {
        await models.user.destroy({ where: { id: id } });
        deleteValue = true;
      }
    });
    return deleteValue;
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

module.exports = service;
