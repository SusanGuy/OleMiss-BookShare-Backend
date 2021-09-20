const express = require("express");
const connectDB = require("./src/database/mongoose");
const cors = require("cors");
const userRouter = require("./src/routes/user");

connectDB();

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

//routes
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
