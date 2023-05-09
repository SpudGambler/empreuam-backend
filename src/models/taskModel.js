const sequelize = require("sequelize");
const db = require("../config/database");
var task = db.define(
  "tareas",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sesion_id: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "sesiones",
        key: "id",
      },
    },
    estado: {
      type: sequelize.ENUM("pendiente", "entregado", "retrasado"),
      allowNull: false,
    },
    descripcion: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    data: {
      type: sequelize.BLOB,
      allowNull: false,
    },
    fecha_entrega: {
      type: sequelize.DATE,
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

module.exports = task;
