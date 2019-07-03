import { combineReducers } from 'redux'

const init = {
    id: '',
    username: '',
    message: ''
}

const AuthReducer = (data = init, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...data,
                id: action.payload.id,
                username: action.payload.username
            }

        case "LOGOUT_SUCCESS":
            return {
                ...data,
                id: '',
                username: ''
            }
    
        default:
            return data
    }
}

export default combineReducers(
    {
        auth: AuthReducer // {id: 1, username: ''}
    }
)