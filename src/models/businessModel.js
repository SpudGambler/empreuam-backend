const sequelize = require("sequelize");
const db = require("../config/database");
var business = db.define(
  "negocios",
  {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: sequelize.STRING },
    sector: { type: sequelize.STRING },
    descripcion: { type: sequelize.STRING },
    created_at: { type: sequelize.DATE },
    updated_at: { type: sequelize.DATE },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = business;