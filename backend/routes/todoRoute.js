const express = require("express");
const router = express.Router();
const {allTodos,createTodo,updateTodo,markTodo,deleteTodo} = require("../controllers/todoController")

router.get("/todo", allTodos);
router.post("/todo", createTodo);
router.put("/todo/update/:id", updateTodo);
router.patch("/todo/mark/:id", markTodo);
router.delete("/todo/delete/:id", deleteTodo);

module.exports = router