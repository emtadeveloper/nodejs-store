const Application = require("./app/server");
const DB_URL = "mongodb://127.0.0.1:27017/storeDB";
require("dotenv").config();

new Application(process.env.APPLICATION_PORT, DB_URL);
