const sequelize = require("sequelize");
const db = require("../config/database");
var task = db.define(
  "tareas",
  {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    sesion_id: { type: sequelize.INTEGER },
    descripcion: { type: sequelize.STRING },
    estado: {
      type: sequelize.ENUM("pendiente", "entregado", "retrasado"),
    },
    data: { type: sequelize.BLOB },
    fecha_entrega: { type: sequelize.DATE },
    created_at: { type: sequelize.DATE },
    updated_at: { type: sequelize.DATE },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = task;
