const Todo = require("../models/todoModel")

const createTodo = async(req,res)=>{
    const { title } = req.body;
    console.log(title)
    if (!title) {
      res.status(400);
      throw new Error("Title field is required!");
    }
    const todo = new Todo({
      title
    });
    await todo.save().then((data) => {
        res.send({
          message: "Todo created successfully!!",
          todo: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating todo",
        });
      });
}

const allTodos = async(req,res)=>{
    try {
      const todo = await Todo.find();
      res.status(200).json(todo);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

const updateTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Title field is required!");
  }

  const id = req.params.id;

  await Todo.findByIdAndUpdate(id, {title}, {new:true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Todo not found.`,
        });
      } else {
        res.send({
             message: "Todo updated successfully.",
             todo:data
            });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const markTodo = async (req,res)=>{
    const id = req.params.id;

    await Todo.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Todo not found.`,
          });
        } else {
            Todo.findByIdAndUpdate(id, {completed:!data.completed}, {new:true })
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                    message: `Todo not found.`,
                    });
                } else {
                    res.send({ 
                      message: "Marked successfully.",
                      todo:data
                   });
                }
            })
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
}

const deleteTodo = async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Todo not found.`,
        });
      } else {
        res.send({
          message: "Todo deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = {createTodo,allTodos,updateTodo,markTodo,deleteTodo}