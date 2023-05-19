const express = require("express");
const userRouter = require("./userRouter");
const entrepreneurRouter = require("./entreprenenurRouter");
const businessRouter = require("./businessRouter");
const authRouter = require("./authRouter");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", userRouter);
  router.use("/entrepreneurs", entrepreneurRouter);
  router.use("/auth", authRouter);
  router.use("/businesses", businessRouter);
}

module.exports = routerApi;
