const sequelize = require("sequelize");
const db = require("../config/database");
var entreprenaur = db.define(
  "emprendedores",
  {
    usuario_id: { type: sequelize.INTEGER, primaryKey: true},
    celular: { type: sequelize.STRING },
    created_at: { type: sequelize.DATE },
    updated_at: { type: sequelize.DATE },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = entreprenaur;
