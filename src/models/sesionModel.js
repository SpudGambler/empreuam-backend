const sequelize = require("sequelize");
const db = require("../config/database");
var sesion = db.define(
  "sesiones",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    seguimiento_id: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "seguimientos",
        key: "id",
      },
    },
    descripcion: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    fecha_inicio: {
      type: sequelize.DATEONLY,
      allowNull: false,
    },
    fecha_fin: {
      type: sequelize.DATEONLY,
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

module.exports = sesion;
