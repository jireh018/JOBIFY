import React, { useState, useReducer, useContext } from 'react'
import {
    DISPLAY_ALERT, CLEAR_ALERT,
    SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
} from './actions'
import reducer from './reducer'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token || null,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    showSidebar: false,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
            //console.log(response)
            const { user, token, location } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, location, alertText }
            })
            //localStorage
            addUserToLocalStorage({ user, token, location, alertText })
        } catch (error) {
            //console.log(error.response)
            dispatch({
                type: SETUP_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                }
            })
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    }

    const logoutUser = () => {
        dispatch({
            type: LOGOUT_USER
        })
        removeUserToLocalStorage()
    }

    const updateUser = async (currentUser) => {
        console.log(currentUser)
    }

    return <AppContext.Provider value={{ ...state, displayAlert, setupUser, toggleSidebar, logoutUser, updateUser }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }


// const registerUser = async (currentUser) => {
    //     dispatch({ type: REGISTER_USER_BEGIN })
    //     try {
    //         const response = await axios.post('/api/v1/auth/register', currentUser)
    //         //console.log(response)
    //         const { user, token, location } = response.data
    //         dispatch({
    //             type: REGISTER_USER_SUCCESS,
    //             payload: { user, token, location }
    //         })
    //         //localStorage
    //         addUserToLocalStorage({ user, token, location })
    //     } catch (error) {
    //         //console.log(error.response)
    //         dispatch({
    //             type: REGISTER_USER_ERROR,
    //             payload: {
    //                 msg: error.response.data.msg,
    //             }
    //         })
    //     }
    //     clearAlert()
    // }

    // const loginUser = async (currentUser) => {
    //     dispatch({ type: LOGIN_USER_BEGIN })
    //     try {
    //         const { data } = await axios.post('/api/v1/auth/login', currentUser)
    //         //console.log(response)
    //         const { user, token, location } = data
    //         dispatch({
    //             type: LOGIN_USER_SUCCESS,
    //             payload: { user, token, location }
    //         })
    //         //localStorage
    //         addUserToLocalStorage({ user, token, location })
    //     } catch (error) {
    //         //console.log(error.response)
    //         dispatch({
    //             type: LOGIN_USER_ERROR,
    //             payload: {
    //                 msg: error.response.data.msg,
    //             }
    //         })
    //     }
    //     clearAlert()
    // }