import { Router } from 'express';
import { newTodo, getTodos, deleteTodo, updateTodo } from '../controllers/todo.controller'

const router = Router();

router.post('/add-todo', newTodo);
router.post('/get-todos', getTodos);
router.post('/delete-todo', deleteTodo);
router.post('/update-todo', updateTodo);

export default router;