import React, { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'

import api from '../services/api'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)

    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    useEffect(() => {
        const loadStorage = () => {
            const storageUser = Cookies.get('@producerpoint:user')
            if (storageUser) {
                setUser(JSON.parse(storageUser))
            }
        }
        loadStorage()
    }, [])

    const signIn = async (email, password) => {

        setLoadingAuth(true)
        if (email.length === 0 || password.length === 0) {
            setLoadingAuth(false)
            return
        } else {
            const response = await api.onSignIn(email, password)

            if (response.data) {
                setUser(response.data)
                storageUser(response.data)
                window.location.href = '/home'
                setLoadingAuth(false)
                return
            } else {
                setLoadingAuth(false)
                setMessage('E-mail ou senha inválidos!')
                handleOpenWarningModal()
                return
            }
        }
    }

    //Função para adicionar o usuário no Async Storage
    const storageUser = async (data) => {
        Cookies.set('@producerpoint:user', data, { expires: 999 })
        //await AsyncStorage.setItem('@producerpoint:user', JSON.stringify(data))
    }

    return (

        <AuthContext.Provider value={{
            user, loadingAuth, warningModal, message,
            handleCloseWarningModal, signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
