const sequelize = require("sequelize");
const db = require("../config/database");
var business = db.define(
  "negocios",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    sector: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    created_at: {
      type: sequelize.DATE,
    },
    updated_at: {
      type: sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = business;
