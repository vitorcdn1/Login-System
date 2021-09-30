import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { loginAction } from '../actions/actions'


export default function Register() {

    const login = useSelector(state => state.login)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({registered: true})

    const dispatch = useDispatch()

    function handleChange(event) {
        const changeFunction = {
            username: () => { setUsername(event.target.value)},
            email: () => { setEmail(event.target.value)},
            password: () => { setPassword(event.target.value)}
        }

        changeFunction[event.target.name]()
    }

    function registerFunction(event) {
        event.preventDefault()

        fetch('/Register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email, password})
        }).then((responce) => responce.json()).then((data) => {
            console.log(data)
            if (data.registered) {
                dispatch(loginAction(true))
            } else {
                setError(data)
            }
        })
    }

    return (
        <div className="Register">
            {login ? (
                <Redirect to="/"></Redirect>
            ) : (
                <form>
                <input type="username" name="username" placeholder="username" onChange={handleChange} value={username}></input>
                <input type="email" name="email" placeholder="email" onChange={handleChange} value={email}></input>
                <input type="password" name="password" placeholder="password" onChange={handleChange} value={password}></input>

                <button onClick={registerFunction}>Register</button>
                
                <h1 className={error.registered ? "hidden" : "error"}>{error.error}</h1>
            </form>  
            )}
        </div>
    )
}