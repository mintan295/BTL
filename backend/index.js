const express = require("express");

require("dotenv").config();

const database = require("./config/database");
database.connect();

const app = express();
const port = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const apiAdmin = require("./api/v1/routes/admin/index.route");
const apiClient = require("./api/v1/routes/client/index.route");
apiAdmin(app);
apiClient(app);

app.listen(port, () => {
  console.log("Listen to " + port);
});
