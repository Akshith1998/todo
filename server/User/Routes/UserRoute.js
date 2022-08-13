const express = require("express");
const router = express.Router();
const UserModal = require("../Modals/UserModal");
const TodoListModal = require("../Modals/TodoListModal");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ExistingUser, generatepasswordhash } = require("../Utility");

router.post("/login", (req, res) => {
  UserModal.find({ username: req.body.username })
    .then((userdata) => {
      if (userdata.length) {
        bcrypt
          .compare(req.body.password, userdata[0].password)
          .then((val) => {
            if (val) {
              const authToken = jwt.sign(
                { username: userdata[0].username },
                process.env.SECRET_KEY
              );
              res.status(200).send({
                token: authToken,
              });
            } else {
              res.status(400).send("Invalid Password");
            }
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/signup", async (req, res) => {
  if (await ExistingUser(req.body.username)) {
    res.status(400).send("User already exists.");
  } else {
    if (req.body.password === req.body.confirmpassword) {
      generatepasswordhash(req.body.password).then((passwordHash) => {
        UserModal.create({
          username: req.body.username,
          password: passwordHash,
        })
          .then((data) => {
            TodoListModal.create({ user: data._id, username: data.username })
              .then(() => {
                res.status(200).send("user created successfully");
              })
              .catch((err) => {
                res.status(400).send(err);
              });
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      });
    } else {
      res.status(400).send("confirmpassword and password doesn't match");
    }
  }
});

module.exports = router;
