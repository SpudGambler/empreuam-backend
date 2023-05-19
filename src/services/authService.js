const models = require("../models/index");
const { Op } = require("sequelize");
const service = {};

service.createEntrepreneurUser = async function (
  nombre,
  apellido,
  documento,
  email,
  password,
  celular
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
      let resultData = {};
      await models.user
        .create({
          nombre: nombre,
          apellido: apellido,
          documento: documento,
          password: password,
          email: email,
          rol: "e",
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
      await models.entrepreneur
        .create({
          usuario_id: resultData.id,
          celular: celular,
        })
        .then((entrepreneurResult) => {
          resultData.celular = entrepreneurResult.dataValues.celular;
        });
      return resultData;
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

service.singInUser = async function (email) {
  try {
    const userData = await models.user.findAll({
      where: { email: email },
    });
    if (userData.length !== 1) {
      return null;
    } else {
      return userData[0].dataValues;
    }
  } catch (error) {
    throw new Error("An error has ocurred: ", error);
  }
};

module.exports = service;
