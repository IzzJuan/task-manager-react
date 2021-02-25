import '../css/Todo.css';
import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function TodoList() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://35.237.174.137:8080/get-todos', {
            method: 'POST',
            body: JSON.stringify({
                userId: cookies.get('userId'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                setTodos(res.reverse());
            })
    }, [])

    const addTodo = (todo) => {
        if (!todo.todoName || /^\s*$/.test(todo.todoName)) {
            return;
        }
        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    }

    const updateTodo = (todoId, editedTodo) => {
        if (!editedTodo.todoName || /^\s*$/.test(editedTodo.todoName)) {
            return;
        }
        setTodos(prev => prev.map(item => (item._id === todoId ? editedTodo : item)))
        fetch(`http://35.237.174.137:8080/update-todo`, {
            method: 'POST',
            body: JSON.stringify({
                _id: editedTodo._id,
                todoName: editedTodo.todoName,
                todoPriority: editedTodo.todoPriority,
                todoImg: editedTodo.todoImg
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const removeTodo = _id => {
        fetch(`http://35.237.174.137:8080/delete-todo`, {
            method: 'POST',
            body: JSON.stringify({
                _id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const removeArr = [...todos].filter(todo => todo._id !== _id);
        setTodos(removeArr);
    }


    const completeTodo = _id => {
        let updatedTodos = todos.map(todo => {
            if (todo._id === _id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };


    return (
        <div>
            <div className="todo-app">
                <div>
                    <h1>Hola {cookies.get('userName')}! ¿Que haremos hoy?</h1>
                    <TodoForm onSubmit={addTodo} />
                    <Todo todos={todos}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                    />
                </div>
            </div>
        </div>
    )
}

export default TodoList
