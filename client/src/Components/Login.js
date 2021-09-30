import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginAction } from "../actions/actions"

export default function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false)      // Aqui caso tenha que aparecer um erro, como por exemplo, usuario não encontrado

    const dispatch = useDispatch()

    function handleChange(event) {
        const changeFunctions = {
            username: () => { setUsername(event.target.value)},
            password: () => { setPassword(event.target.value)}
        }

        changeFunctions[event.target.name]()
    }

    function loginFunction(event) {
        event.preventDefault()

        fetch('/Login', {
            method: "POST",
            body: JSON.stringify({username, password}),
            redirect: "follow",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(responce => responce.text()).then((data) => {
            
            if (data === "false") {
                setError(true)
            } else {
                let token = data
                localStorage.setItem('authorization-token', token)
                dispatch(loginAction(true))
            }
        })
    }

    return (
        <div className="Login">
                <form>
                <input type="username" name="username" placeholder="Username" onChange={handleChange} required></input>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required></input>
                <button onClick={loginFunction}>Login</button>

                <div className={error ? "error" : "hidden"}>
                    <h1>Erro usuario não encrontrado</h1>
                </div>
            </form>
        </div>
    )
    
}