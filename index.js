const express = require("express");
const connectDB = require("./src/database/mongoose");
const cors = require("cors");

connectDB();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
