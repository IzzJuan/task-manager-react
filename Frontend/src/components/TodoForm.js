import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    })

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo();
    };

    const addTodo = () => {

        fetch(`http://localhost:8080/add-todo/`, {
            method: 'POST',
            body: JSON.stringify({
                todoName: input,
                userId: cookies.get('userId'),
                todoPriority: 'Baja',
                todoImg: ''
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    props.onSubmit({
                        _id: res._id,
                        todoName: res.todoName,
                        userId: cookies.get('userId'),
                        todoPriority: 'Baja',
                        todoImg: ''
                    });
                } else {
                    console.log('error');
                }
            })
        setInput('')
    }


    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            <>
                <input
                    type='text'
                    placeholder='Agregar una tarea'
                    value={input} name='text'
                    className='todo-input'
                    onChange={handleChange}
                    ref={inputRef}
                />
                <button className='todo-button'>Agregar tarea</button>
            </>
        </form>
    )
}

export default TodoForm;