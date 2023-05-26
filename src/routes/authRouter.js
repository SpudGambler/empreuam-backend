const express = require("express");
const authRouter = express.Router();
const middlewares = require("../middleware/index");
const controllers = require("../controllers/index");
const validators = require("../validators/index");

authRouter.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRouter.post(
  "/register/entrepreneur",
  validators.auth.validateCreateEntrepreneur,
  controllers.auth.entrepreneurRegister
);

authRouter.post(
  "/register/adviser",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
  validators.auth.validateCreateAdviser,
  controllers.auth.adviserRegister
);

authRouter.post(
  "/login",
  validators.auth.validateLogin,
  controllers.auth.userSingIn
);

authRouter.get(
  "/",
  [middlewares.authJwt.verifyToken],
  controllers.auth.getLoggedUser
);

module.exports = authRouter;
