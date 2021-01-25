import { Response, Request } from "express";
import { Todo } from "../../types/Todo";
import { TodoModel } from "../../models/Todo";
import { Context } from "../../types/Context";

const getTodos = async (context: Context): Promise<void> => {
  try {
    const todos = await TodoModel.find();
    context.res.json({ todos });
  } catch (err) {
    throw err;
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body: Todo = req.body;

    const todo = new TodoModel({
      name: body.name,
      description: body.description,
      status: false,
    });

    const newTodo = await todo.save();
    const allTodos = await TodoModel.find();

    res.json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (err) {
    throw err;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo = await TodoModel.findByIdAndUpdate({ _id: id }, body);
    const allTodos = await TodoModel.find();
    res.json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (err) {
    throw err;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo = await TodoModel.findByIdAndRemove(req.params.id);
    const allTodos = await TodoModel.find();
    res.json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (err) {
    throw err;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
