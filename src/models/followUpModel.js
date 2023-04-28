const sequelize = require("sequelize");
const db = require("../config/database");
var followUp = db.define(
  "seguimientos",
  {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    emprendedor_id: { type: sequelize.INTEGER },
    asesor_id: { type: sequelize.INTEGER },
    negocio_id: { type: sequelize.INTEGER },
    categoria_proyecto: { type: sequelize.STRING },
    descripcion: { type: sequelize.STRING },
    status: {
      type: sequelize.ENUM("pendiente", "cancelado", "aceptado", "finalizado"),
    },
    fecha_inicio: { type: sequelize.DATE },
    created_at: { type: sequelize.DATE },
    updated_at: { type: sequelize.DATE },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = followUp;
