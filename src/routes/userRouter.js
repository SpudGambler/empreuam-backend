const express = require("express");
const routerUser = express.Router();

routerUser.post("/user", (req, res) => {
  res.status(200).send("Post Working");
});

routerUser.get("/", (req, res) => {
  res.status(200).send("Get Working");
});

routerUser.get("/:userId", (req, res) => {
  const { userId } = req.params;
  res.status(200).send("Get By Id Working: " + userId);
});

routerUser.put("/:userId", (req, res) => {
  const { userId } = req.params;
  res.status(200).send("Put Working: " + userId);
});

routerUser.delete("/:userId", (req, res) => {
  const { userId } = req.params;
  res.status(200).send("Delete Working: " + userId);
});

module.exports = routerUser;
