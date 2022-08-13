const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const UserController = require("./User/Routes/UserRoute");
const TodoListController = require("./User/Routes/TodoListRoute");
const routes = ["/user/login", "/user/signup", "/todolist/update"];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  if (routes.includes(req.url)) {
    next();
  } else {
    const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    req.body.userdata = user;
    next();
  }
});

mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    console.log(`Database is connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", UserController);
app.use("/todolist", TodoListController);

app.listen(process.env.PORT || 3001, (err) => {
  if (!err) {
    console.log(`server is running at port ${process.env.PORT}`);
  } else {
    console.log(err);
  }
});
