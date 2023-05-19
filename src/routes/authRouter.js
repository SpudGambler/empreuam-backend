const express = require("express");
const authRouter = express.Router();
const controllers = require("../controllers/index");

authRouter.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRouter.post(
  "/register/entrepreneur",
  controllers.auth.entrepreneurRegister
);

authRouter.post("/login", controllers.auth.userSingIn);

module.exports = authRouter;
