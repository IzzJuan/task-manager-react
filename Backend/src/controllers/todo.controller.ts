import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/todo'

export const newTodo = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.todoName || !req.body.userId) {
        return res.status(400).json({ msg: 'Envia una tarea' });
    }

    const newTodo = new Todo(req.body);
    await newTodo.save();

    return res.status(201).json(newTodo);
}

export const getTodos = async (req: Request, res: Response): Promise<Response> => {
    const todos = await Todo.find({ userId: req.body.userId })

    return res.status(200).json(todos);
}

export const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const todos = await Todo.remove({ _id: req.body._id })

    return res.status(200).json(todos);
}

export const updateTodo = async (req: Request, res: Response): Promise<Response> => {

    const updatedtodo = await Todo.findOneAndUpdate({ _id: req.body._id }, { todoName: req.body.todoName, todoPriority: req.body.todoPriority, todoImg: req.body.todoImg }, {
        new: true
    });


    return res.status(200).json(updatedtodo);
}