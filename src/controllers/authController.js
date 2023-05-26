require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const services = require("../services/index");
const controller = {};

controller.userSingIn = async function (req, res) {
  const { email, password } = req.body;
  const userData = await services.auth.singInUser(email, password);
  try {
    if (userData === null) {
      res.status(404).json({ message: "Username or password are incorrect" });
    } else {
      const isCorrectPassword = await bcryptjs.compare(
        password,
        userData.password
      );
      if (!isCorrectPassword) {
        res.status(404).json({ message: "Username or password are incorrect" });
      } else {
        const token = jwt.sign(
          { token_type: "access", id: userData.id, iat: Date.now() },
          process.env.SECRETKEY,
          {
            expiresIn: 10800000,
          }
        );
        res.status(200).json({ message: "Login successfully", token: token });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.entrepreneurRegister = async function (req, res) {
  const { nombre, apellido, documento, email, password, celular } = req.body;
  const numSaltRounds = 10;
  const hashPassword = await bcryptjs.hash(password, numSaltRounds);
  try {
    const resultData = await services.auth.createEntrepreneurUser(
      nombre,
      apellido,
      documento,
      email,
      hashPassword,
      celular
    );
    if (resultData === null) {
      res
        .status(500)
        .json({ message: "Username or document has already in use" });
    } else {
      res.status(201).json({
        message: "User successful created",
        data: resultData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getLoggedUser = async function (req, res) {
  const usuario_id = req.userId;
  try {
    const user = await services.user.getById(usuario_id);
    if (!user) res.status(404).json({ message: "No user found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
module.exports = controller;
