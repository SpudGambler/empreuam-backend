const sequelize = require("sequelize");
const db = require("../config/database");
var user = db.define(
  "usuarios",
  {
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    documento: {
      type: sequelize.STRING(20),
      allowNull: false,
    },
    email: {
      type: sequelize.STRING(150),
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: sequelize.STRING(100),
      allowNull: false,
    },
    rol: {
      type: sequelize.ENUM("e", "as", "ad"),
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

module.exports = user;
