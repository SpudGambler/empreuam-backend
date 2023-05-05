const sequelize = require("sequelize");
const db = require("../config/database");
const models = require("./index");
var admin = db.define(
  "administradores",
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

module.exports = admin;
