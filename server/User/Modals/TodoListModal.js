const mongoose = require("mongoose");

const TodoListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
  },
  todolist: [
    {
      type: new mongoose.Schema(
        {
          activity: String,
          status: String,
          time: String,
          action: String,
        },
        { timestamps: true }
      ),
    },
  ],
});

const TodoListModal = mongoose.model("TodoList", TodoListSchema);
module.exports = TodoListModal;
