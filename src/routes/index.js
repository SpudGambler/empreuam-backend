const express = require("express");
const userRouter = require("./userRouter");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/users", userRouter);
}

module.exports = routerApi;
