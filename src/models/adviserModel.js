const sequelize = require("sequelize");
const db = require("../config/database");
var adviser = db.define(
  "asesores",
  {
    usuario_id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    sector: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    titulo: {
      type: sequelize.STRING(50),
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

module.exports = adviser;
