const sequelize = require("sequelize");
const db = require("../config/database");
var user = db.define(
  "usuarios",
  {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: sequelize.STRING },
    apellido: { type: sequelize.STRING },
    documento: { type: sequelize.STRING },
    email: { type: sequelize.STRING },
    password: { type: sequelize.STRING },
    rol: { type: sequelize.ENUM("e", "as", "ad") },
    created_at: { type: sequelize.DATE },
    updated_at: { type: sequelize.DATE },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = user;
