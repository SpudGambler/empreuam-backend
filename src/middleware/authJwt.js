require("dotenv").config();
const jwt = require("jsonwebtoken");
const services = require("../services/index");
const middleware = {};

middleware.verifyToken = async function (req, res, next) {
  const { authorization } = req.headers;
  if (authorization === null || authorization.startsWith("Bearer ") === false) {
    return res.status(403).send({ message: "No token provided" });
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.userId = decoded.id;
    const user = await services.user.getById(req.userId);
    if (!user) return res.status(404).json({ message: "No user found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

middleware.isAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === null || authorization.startsWith("Bearer ") === false) {
    return res.status(403).send({ message: "No token provided" });
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.userId = decoded.id;
    const userData = await services.user.getById(decoded.id);
    if (userData === null) {
      return res.status(403).json({ message: "Not user found" });
    } else {
      if (userData.rol == "ad") {
        next();
        return;
      } else {
        return res.status(403).json({ message: "Require Admin Role!" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

module.exports = middleware;
