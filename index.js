const app = require("./app");
const routerApi = require("./src/routes");
require("dotenv").config();
const port = 3000 || process.env.port;

app.listen(port, () => console.log("Active port", port));

app.get("/", (req, res) => {
  res.status(200).send("Deployment");
});

routerApi(app);
