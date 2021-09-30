import { createStore, combineReducers } from 'redux'
import { loginReducer } from '../Reducers/reducers'

const store = createStore(combineReducers({
    login: loginReducer
}))

export {store};