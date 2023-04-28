const sequelize = require("sequelize");
const db = require("../config/database");
var comment = db.define(
  "comentarios",
  {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    sesion_id: { type: sequelize.INTEGER },
    tarea_id: { type: sequelize.INTEGER },
    seguimiento_id: { type: sequelize.INTEGER },
    descripcion: { type: sequelize.STRING },
    tipo: { type: sequelize.ENUM("t", "seg", "ses") },
    created_at: { type: sequelize.DATE },
    updated_at: { type: sequelize.DATE },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = comment;
