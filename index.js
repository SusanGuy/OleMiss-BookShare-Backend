const express = require("express");
const connectDB = require("./src/database/mongoose");
const cors = require("cors");
const userRouter = require("./src/routes/user");
const bookRouter = require("./src/routes/book");
const bookForSaleRouter = require("./src/routes/bookForSale");
const bookRequestedRouter = require("./src/routes/bookRequested");

connectDB();

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

//routes
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/sales", bookForSaleRouter);
app.use("/requests", bookRequestedRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
