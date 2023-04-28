const sequelize = require("sequelize");
const db = require("../config/database");
var sesion = db.define(
  "sesiones",
  {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    seguimiento_id: { type: sequelize.INTEGER },
    descripcion: { type: sequelize.STRING },
    fecha_inicio: { type: sequelize.DATE },
    fecha_fin: { type: sequelize.DATE },
    created_at: { type: sequelize.DATE },
    updated_at: { type: sequelize.DATE },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = sesion;
