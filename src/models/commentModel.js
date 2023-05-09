const sequelize = require("sequelize");
const db = require("../config/database");
var comment = db.define(
  "comentarios",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sesion_id: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    tarea_id: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    seguimiento_id: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    descripcion: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    tipo: {
      type: sequelize.ENUM("t", "seg", "ses"),
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

module.exports = comment;
