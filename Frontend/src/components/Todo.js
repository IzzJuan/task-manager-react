import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import Modal from './Modal'

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {

    const [editTodo, setEditTodo] = useState({
        _id: null,
        todoName: '',
        userId: '',
        todoPriority: '',
        todoImg: '',
        modal: false
    });

    const submitUpdate = (editedTodo) => {
        updateTodo(editTodo._id, editedTodo);
        setEditTodo({
            _id: null,
            todoName: '',
            userId: '',
            todoPriority: '',
            todoImg: '',
            modal: false
        })
    }

    return <>
        {editTodo.modal ? (<Modal edit={editTodo} onClose={() => setEditTodo({ modal: false })} onSubmit={submitUpdate} />) : null}
        {todos.map((todo, index) => (
            <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>

                <div key={index} onClick={() => completeTodo(todo._id)}>
                    {todo.todoName}
                </div>
                <div className='icons'>
                    <RiCloseCircleLine onClick={() => removeTodo(todo._id)}
                        className='delete-icon' />
                    <TiEdit onClick={() => setEditTodo({ _id: todo._id, todoName: todo.todoName, userId: todo.userId, todoPriority: todo.todoPriority, todoImg: todo.todoImg, modal: true })}
                        className='edit-icon' />
                </div>

            </div>
        ))}
    </>
}


export default Todo;