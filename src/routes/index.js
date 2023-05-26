const express = require("express");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const entrepreneurRouter = require("./entrepreneurRouter");
const adviserRouter = require("./adviserRouter");
const adminRouter = require("./adminRouter");
const businessRouter = require("./businessRouter");
const followUpRouter = require("./followUpRouter");
const sesionRouter = require("./sesionRouter");
const taskRouter = require("./taskRouter");
const commentRouter = require("./commentRouter");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/users", userRouter);
  router.use("/entrepreneurs", entrepreneurRouter);
  router.use("/advisers", adviserRouter);
  router.use("/admins", adminRouter);
  router.use("/businesses", businessRouter);
  router.use("/followUps", followUpRouter);
  router.use("/sesions", sesionRouter);
  router.use("/tasks", taskRouter);
  router.use("/comments", commentRouter);
}

module.exports = routerApi;
