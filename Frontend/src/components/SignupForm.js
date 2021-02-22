import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function SignupForm() {

    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        signup(user);
    }

    const signup = (User) => {
        fetch(`http://localhost:8080/signup/`, {
            method: 'POST',
            body: JSON.stringify({
                name: User.name,
                email: User.email,
                password: User.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res.newUser) {
                    cookies.set('userId', res._id, { path: "/" });
                    cookies.set('userName', res.name, { path: "/" });
                    cookies.set('userEmail', res.email, { path: "/" });
                    console.log(cookies.get('userId'));
                    console.log(cookies.get('userName'));
                    console.log(cookies.get('userEmail'));
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

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className='form-inner'>
                    <h2>Signup</h2>
                    <div className='form-group'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' id='name' onChange={(e) => setUser({ ...user, name: e.target.value })} value={user.name || ''} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' id='email' onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email || ''} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' name='password' id='password' onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password || ''} />
                    </div>
                    <input type='submit' value='Signup' />
                    <input type="button" onClick={() => { history.push("/") }} value="Go to Login" />
                </div>
            </form>
        </div>
    )
}

export default SignupForm
