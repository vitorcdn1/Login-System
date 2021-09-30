import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../actions/actions'

export default function Header() {

    const login = useSelector(state => state.login)
    const dispatch = useDispatch()

    function logoutFunction() {
        dispatch(loginAction(false))
        localStorage.setItem('authorization-token', null)
    }

    return (
        <header>
            <h1>Login System</h1>

            <nav>
                {login ? (
                    <ul className="menu">
                        <li><button onClick={logoutFunction}>Logout</button></li>
                    </ul>
                ) : (
                    <ul className="menu">
                        <li><Link to="/Register">Register</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </ul>
                )}
            </nav>
        </header>
    )
}