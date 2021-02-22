import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import Modal from './Modal'

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {

    const [edit, setEdit] = useState({
        _id: null,
        todoName: '',
        userId: '',
        todoPriority: '',
        todoImg: '',
        modal: false
    });

    const submitUpdate = (value) => {
        console.log(value);
        updateTodo(edit._id, value);
        setEdit({
            _id: null,
            value: ''
        })
    }

    return <>
        {edit._id ? (<Modal edit={edit} onClose={() => setEdit({ modal: false })} onSubmit={submitUpdate} />) : null}
        {todos.map((todo, index) => (
            <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>

                <div key={index} onClick={() => completeTodo(todo._id)}>
                    {todo.todoName}
                </div>
                <div className='icons'>
                    <RiCloseCircleLine onClick={() => removeTodo(todo._id)}
                        className='delete-icon' />
                    <TiEdit onClick={() => setEdit({ _id: todo._id, todoName: todo.todoName, userId: todo.userId, todoPriority: todo.todoPriority, todoImg: todo.todoImg, modal: true })}
                        className='edit-icon' />
                </div>

            </div>
        ))}
    </>
}


export default Todo;