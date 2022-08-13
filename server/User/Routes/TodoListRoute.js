const express = require("express");
const router = express.Router();
const TodoListModal = require("../Modals/TodoListModal");
const UserModal = require("../Modals/UserModal");

router.post("/", (req, res) => {
  UserModal.find({ username: req.body.userdata.username })
    .then((user) => {
      TodoListModal.updateOne(
        { user: user[0]._id },
        { $push: { todolist: req.body.todolist } }
      )
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.put("/update", (req, res) => {
  console.log(req.body);
  UserModal.find({ username: req.body.username })
    .then((user) => {
      TodoListModal.updateMany(
        { user: user[0]._id, "todolist.activity": req.body.activity },
        {
          $set: {
            "todolist.$.action": req.body.action,
          },
        }
      )
        .then(() => {
          TodoListModal.find({ username: req.body.username }).then((data) => {
            var time;
            var array = data[0].todolist.filter(
              (item) => item.activity === req.body.activity
            );
            console.log(array[0].updatedAt + "", array[0].createdAt + "");
            let start = array[0].createdAt + "";
            start = start.split(" ")[4];
            start = start.split(":");
            let end = array[0].updatedAt + "";
            end = end.split(" ")[4];
            end = end.split(":");
            time =
              parseInt(end[0]) -
              parseInt(start[0]) +
              ":" +
              (parseInt(end[1]) - parseInt(start[1])) +
              ":" +
              (parseInt(end[2]) - parseInt(start[2]));
            time = time.split(":");
            if (parseInt(time[1]) < 0) {
              time[1] = 60 + parseInt(time[1]);
              time[0] = 0;
            }
            if (parseInt(time[2]) < 0) {
              time[2] = 60 + parseInt(time[2]);
              time[1] = parseInt(time[1]) - 1;
            }
            time = time.join(":");
            UserModal.find({ username: req.body.username })
              .then((user) => {
                TodoListModal.updateMany(
                  { user: user[0]._id, "todolist.activity": req.body.activity },
                  {
                    $set: {
                      "todolist.$.time": time,
                    },
                  }
                )
                  .then((data) => {
                    res.status(200).send(data);
                  })
                  .catch((err) => {
                    res.status(400).send(err);
                  });
              })
              .catch((err) => {
                res.status(400).send(err);
              });
          });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/", (req, res) => {
  UserModal.find({ username: req.body.userdata.username })
    .then((user) => {
      TodoListModal.find({ user: user[0]._id })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
