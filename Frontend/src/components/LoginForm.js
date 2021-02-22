import '../css/LoginForm.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function LoginForm() {

    //useEffect(() => {
    //  if (cookies.get('email')) {
    //    history.push("/todo-list");
    //}
    //})

    const adminUser = {
        name: 'admin',
        email: 'admin@admin.com',
        password: 'adminmaster'
    }

    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        login(user);
    }

    const login = (User) => {

        if (User.email === adminUser.email && User.password === adminUser.password) {

            setUser({
                name: User.name,
                email: User.email,
                password: User.password
            });
            cookies.set('userId', 1, { path: "/" });
            cookies.set('userName', User.email, { path: "/" });
            cookies.set('userEmail', User.email, { path: "/" });
            history.push("/todo-list")
        } else {
            fetch(`http://localhost:8080/login/`, {
                method: 'POST',
                body: JSON.stringify({
                    email: User.email,
                    password: User.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.token) {
                        cookies.set('userId', res._id, { path: "/" });
                        cookies.set('userName', res.name, { path: "/" });
                        cookies.set('userEmail', res.email, { path: "/" });
                        setUser({
                            name: User.name,
                            email: User.email
                        })
                        history.push("/todo-list");
                    } else if (res.msg) {
                        window.alert(res.msg);
                    }
                }, (error) => {
                    console.log(error)
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className='form-inner'>
                    <h2>Login</h2>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' id='email' onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email || ''} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' name='password' id='password' onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password || ''} />
                    </div>
                    <input type='submit' value='Login' />
                    <input type="button" onClick={() => { history.push("/signup") }} value="Go to Signup" />
                </div>
            </form>
        </div>
    )
}

export default LoginForm;