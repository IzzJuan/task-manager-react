import React, { useState, useEffect, useRef } from 'react'
import { v1 as uuid } from "uuid";

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

        props.onSubmit({
            id: uuid(),
            text: input
        });
        setInput('')
    };

    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            {props.edit ? (
                <>
                    <input
                        type='text'
                        placeholder='Editar una tarea'
                        value={input} name='text'
                        className='todo-input'
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className='todo-button'>Actualizar</button>
                </>
            ) : (
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
                )}
        </form>
    )
}

export default TodoForm;