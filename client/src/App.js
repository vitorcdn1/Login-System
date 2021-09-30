import './style.css'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from './Components/Header'
import Register from './Components/Register'
import Login from './Components/Login'
import { useEffect } from 'react'
import { loginAction } from './actions/actions'
import Home from './Components/Home'

export default function App() {

    const dispatch = useDispatch()
    const login = useSelector(state => state.login)

    useEffect(() => {
        const token = localStorage.getItem('authorization-token')

        if (token === 'null' || token === null) {
            console.log('logout')
        } else {
            dispatch(loginAction(true))
        }
    }, [dispatch])

    return (
        <div className="App">
                <Router>
                    <Header></Header>
                    
                    <Route path="/Home">
                        {login ? <Home /> : <Redirect to="/Login"></Redirect>}
                    </Route>

                    <Route path="/Register">
                        {login ? <Redirect to="/home"></Redirect> : <Register />}
                    </Route>

                    <Route path="/Login">
                        {login ? <Redirect to="/home"></Redirect> : <Login />}
                    </Route>
                </Router>
        </div>
    )
}