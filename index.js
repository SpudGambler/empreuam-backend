const express = require("express");
const app = express();
const routerApi = require("./src/routes");
const port = 3000;

app.listen(port, () => console.log("Active port", port));

app.get("/", (req, res) => {
  res.status(200).send("Deployment");
});

app.use(express.json());

routerApi(app);
