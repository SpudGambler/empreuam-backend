const sequelize = require("sequelize");
const db = require("../config/database");
const models = require("./index");
var entreprenaur = db.define(
  "emprendedores",
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
    celular: {
      type: sequelize.STRING(10),
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

module.exports = entreprenaur;
