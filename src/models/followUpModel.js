const sequelize = require("sequelize");
const db = require("../config/database");
var followUp = db.define(
  "seguimientos",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    emprendedor_id: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    asesor_id: {
      type: sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    negocio_id: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    categoria_proyecto: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: sequelize.ENUM("pendiente", "cancelado", "aceptado", "finalizado"),
      allowNull: false,
    },
    fecha_inicio: {
      type: sequelize.DATEONLY,
      allowNull: true,
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

module.exports = followUp;
